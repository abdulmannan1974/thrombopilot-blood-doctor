const tone = {
  success: "success",
  warning: "warning",
  danger: "danger",
  neutral: "neutral",
};

const asNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const sum = (values) =>
  values.reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0);

export const calculateCrCl = ({
  age,
  weight,
  serumCreatinine,
  creatinineUnit,
  sex,
}) => {
  const patientAge = asNumber(age);
  const patientWeight = asNumber(weight);
  const creatinine = asNumber(serumCreatinine);

  if (patientAge === null || patientWeight === null || creatinine === null || creatinine <= 0) {
    return null;
  }

  const rawValue =
    creatinineUnit === "mgdl"
      ? ((140 - patientAge) * patientWeight) / (72 * creatinine)
      : ((140 - patientAge) * patientWeight) / (creatinine * 0.814);

  const adjusted = sex === "female" ? rawValue * 0.85 : rawValue;
  return Math.round(adjusted * 10) / 10;
};

const formatScore = (value) => {
  if (!Number.isFinite(value)) {
    return "Pending";
  }

  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
};

const buildMetrics = (entries) =>
  entries.filter((entry) => entry.value !== undefined && entry.value !== null && entry.value !== "");

const getChadsVascScore = (values) => {
  const age = asNumber(values.age) ?? 0;
  const female = Boolean(values.femaleSex);
  const agePoints = age >= 75 ? 2 : age >= 65 ? 1 : 0;

  return sum([
    values.chf ? 1 : 0,
    values.hypertension ? 1 : 0,
    values.diabetes ? 1 : 0,
    values.priorStroke ? 2 : 0,
    values.vascularDisease ? 1 : 0,
    female ? 1 : 0,
    agePoints,
  ]);
};

const getChadsRecommendation = (score, femaleOnly) => {
  if (femaleOnly) {
    return {
      headline: "No anticoagulation indicated by score alone",
      summary: "Female sex alone does not justify stroke prevention therapy.",
      preference: "No routine anticoagulation",
      tone: tone.success,
    };
  }

  if (score <= 0) {
    return {
      headline: "No anticoagulation indicated",
      summary: "Estimated thromboembolic risk is low by CHA2DS2-VASc.",
      preference: "No routine anticoagulation",
      tone: tone.success,
    };
  }

  if (score === 1) {
    return {
      headline: "Consider anticoagulation",
      summary: "Shared decision-making is appropriate for borderline stroke risk.",
      preference: "Consider DOAC if bleeding risk acceptable",
      tone: tone.warning,
    };
  }

  return {
    headline: "Anticoagulation recommended",
    summary: "Stroke prevention benefit generally outweighs bleeding risk.",
    preference: "DOAC preferred unless warfarin-only condition present",
    tone: tone.danger,
  };
};

const getAgeBucket = (age) => {
  const numericAge = asNumber(age) ?? 0;

  if (numericAge >= 80) {
    return "80plus";
  }

  if (numericAge >= 75) {
    return "75to79";
  }

  if (numericAge >= 65) {
    return "65to74";
  }

  return "under65";
};

const mapPerioperativeHold = (drug, bleedingRisk, crcl) => {
  if (!Number.isFinite(crcl)) {
    return null;
  }

  if (["apixaban", "rivaroxaban", "edoxaban"].includes(drug)) {
    if (bleedingRisk === "lowDental") {
      return "Hold the morning of the procedure";
    }

    if (crcl < 15) {
      return "Use specialist input; renal function is below standard dosing thresholds";
    }

    if (crcl < 30) {
      return bleedingRisk === "low"
        ? "Hold 48 hours before"
        : "Hold 72 hours before";
    }

    return bleedingRisk === "low" ? "Hold 24 hours before" : "Hold 48 hours before";
  }

  if (drug === "dabigatran") {
    if (bleedingRisk === "lowDental") {
      return "Hold the morning of the procedure";
    }

    if (crcl >= 80) {
      return bleedingRisk === "low" ? "Hold 24 hours before" : "Hold 48 hours before";
    }

    if (crcl >= 50) {
      return bleedingRisk === "low" ? "Hold 48 hours before" : "Hold 72 hours before";
    }

    if (crcl >= 30) {
      return bleedingRisk === "low" ? "Hold 48 hours before" : "Hold 96 hours before";
    }

    if (crcl >= 15) {
      return bleedingRisk === "low" ? "Hold 72 hours before" : "Hold 96 hours before";
    }

    return "Avoid standard dosing assumptions; seek specialist input";
  }

  return null;
};

const getRestartWindow = (bleedingRisk, anticoagulant) => {
  if (anticoagulant === "warfarin") {
    return "Restart the evening of the procedure if hemostasis is secure";
  }

  if (bleedingRisk === "low" || bleedingRisk === "lowDental") {
    return "Restart the evening of the procedure or the following day";
  }

  return "Restart after 48 to 72 hours once bleeding risk is controlled";
};

const formatMetricValue = (value, suffix = "") => {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  return `${Number.isInteger(value) ? value : value.toFixed(1)}${suffix}`;
};

const sentenceCase = (value) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const buildTable = (title, headers, rows) => ({ title, headers, rows });

const formatBleedingRiskLabel = (value) => {
  const labels = {
    low_non_dental: "Low non-dental",
    low_dental: "Low dental",
    moderate: "Moderate",
    high: "High",
  };

  return labels[value] ?? sentenceCase(value ?? "");
};

const getDoacRestartWindow = (bleedingRisk) => {
  if (bleedingRisk === "low_dental") {
    return "Resume later the same day or the following morning once local hemostasis is secure.";
  }

  if (bleedingRisk === "low_non_dental") {
    return "Resume about 24 hours after the procedure if hemostasis is secure.";
  }

  if (bleedingRisk === "moderate") {
    return "Resume after 48 hours if hemostasis is stable.";
  }

  return "Resume after 48 to 72 hours once bleeding risk is controlled and no active bleeding remains.";
};

const getElectiveDoacHoldPlan = (drug, bleedingRisk, crcl) => {
  if (!Number.isFinite(crcl)) {
    return {
      hold: "Renal function is required to determine the interruption interval.",
      leadDays: null,
      rationale: "Use Cockcroft-Gault creatinine clearance before finalizing DOAC timing.",
    };
  }

  if (bleedingRisk === "low_dental") {
    return {
      hold: "Usually omit the morning dose only; local hemostatic measures are often sufficient.",
      leadDays: 0,
      rationale: "Low-risk dental procedures usually need minimal interruption.",
    };
  }

  if (drug === "dabigatran") {
    if (crcl < 30) {
      return {
        hold: "Use specialist advice because dabigatran interruption becomes prolonged when CrCl is below 30 mL/min.",
        leadDays: 4,
        rationale: "Renal clearance strongly affects dabigatran persistence.",
      };
    }

    if (crcl >= 80) {
      return bleedingRisk === "low_non_dental"
        ? {
            hold: "Hold 24 hours before surgery.",
            leadDays: 1,
            rationale: "Good renal clearance allows a short interruption for low-risk procedures.",
          }
        : {
            hold: "Hold 48 hours before surgery.",
            leadDays: 2,
            rationale: "Higher bleeding-risk procedures need a longer washout.",
          };
    }

    if (crcl >= 50) {
      return bleedingRisk === "low_non_dental"
        ? {
            hold: "Hold 48 hours before surgery.",
            leadDays: 2,
            rationale: "Moderately reduced renal clearance prolongs dabigatran effect.",
          }
        : {
            hold: "Hold 72 hours before surgery.",
            leadDays: 3,
            rationale: "High or moderate bleeding-risk procedures need a longer interruption.",
          };
    }

    return bleedingRisk === "low_non_dental"
      ? {
          hold: "Hold 72 hours before surgery.",
          leadDays: 3,
          rationale: "Renal impairment prolongs dabigatran exposure.",
        }
      : {
          hold: "Hold 96 hours before surgery.",
          leadDays: 4,
          rationale: "This provides a safer washout for higher-risk procedures.",
        };
  }

  if (["apixaban", "rivaroxaban", "edoxaban"].includes(drug)) {
    if (crcl < 30) {
      return bleedingRisk === "low_non_dental"
        ? {
            hold: "Hold 48 hours before surgery.",
            leadDays: 2,
            rationale: "Reduced renal clearance supports a longer interruption.",
          }
        : {
            hold: "Hold 72 hours before surgery.",
            leadDays: 3,
            rationale: "Higher bleeding-risk procedures need a longer safety window when renal function is reduced.",
          };
    }

    return bleedingRisk === "low_non_dental"
      ? {
          hold: "Hold 24 hours before surgery.",
          leadDays: 1,
          rationale: "Standard interruption for low-bleeding-risk elective procedures.",
        }
      : {
          hold: "Hold 48 hours before surgery.",
          leadDays: 2,
          rationale: "Higher bleeding-risk procedures need a longer interruption.",
        };
  }

  return {
    hold: "Use specialist advice for this anticoagulant.",
    leadDays: null,
    rationale: "Standard interruption guidance is unavailable.",
  };
};

const getAfThromboembolicRisk = (values) => {
  const chads2 = asNumber(values.chads2) ?? 0;

  if (chads2 >= 5 || values.strokeTiaWithin3Months || values.rheumaticMitralStenosis) {
    return {
      level: "High",
      rationale: "AF thromboembolic risk is high because of CHADS2 5 to 6, very recent stroke/TIA, or rheumatic mitral stenosis.",
    };
  }

  if (chads2 >= 3) {
    return {
      level: "Moderate",
      rationale: "AF thromboembolic risk is moderate because CHADS2 is 3 to 4.",
    };
  }

  return {
    level: "Low",
    rationale: "AF thromboembolic risk is low because CHADS2 is 0 to 2 and no very high-risk feature was selected.",
  };
};

const getVteThromboembolicRisk = (values) => {
  if (values.vteTiming === "within_3_months" || values.severeThrombophilia) {
    return {
      level: "High",
      rationale: "VTE thromboembolic risk is high because the event was within 3 months or severe thrombophilia is present.",
    };
  }

  if (
    values.vteTiming === "between_3_and_12_months" ||
    values.recurrentVte ||
    values.activeCancer
  ) {
    return {
      level: "Moderate",
      rationale: "VTE thromboembolic risk is moderate because of event timing between 3 and 12 months, recurrent VTE, or active cancer.",
    };
  }

  return {
    level: "Low",
    rationale: "VTE thromboembolic risk is low because there was a single VTE more than 12 months ago.",
  };
};

const getMechanicalValveRisk = (values) => {
  if (
    values.valvePosition === "mitral" ||
    values.valveType === "caged_ball" ||
    values.valveType === "tilting_disc" ||
    values.strokeTiaWithin6Months
  ) {
    return {
      level: "High",
      rationale: "Mechanical valve thromboembolic risk is high because of mitral position, older high-risk prosthesis type, or stroke/TIA within 6 months.",
    };
  }

  if (values.valveAtrialFibrillation || values.valveChadsAtLeastOne) {
    return {
      level: "Moderate",
      rationale: "Mechanical valve thromboembolic risk is moderate because of bileaflet aortic valve plus AF or CHADS at least 1.",
    };
  }

  return {
    level: "Low",
    rationale: "Mechanical valve thromboembolic risk is low because this is a bileaflet aortic valve without AF and CHADS equals 0.",
  };
};

const getPerioperativeRiskProfile = (values) => {
  if (values.indication === "atrial_fibrillation") {
    return getAfThromboembolicRisk(values);
  }

  if (values.indication === "dvt_pe") {
    return getVteThromboembolicRisk(values);
  }

  return getMechanicalValveRisk(values);
};

const buildWarfarinElectiveSchedule = ({ bridging, bleedingRisk, inr }) => [
  ["Day -5", "Stop warfarin."],
  [
    "Day -3 to -1",
    bridging
      ? "Start therapeutic LMWH bridging once INR falls below the therapeutic range; continue until 24 hours before surgery."
      : "No routine bridging is required.",
  ],
  [
    "Day -1",
    Number.isFinite(inr) && inr > 1.5
      ? "Repeat INR before surgery; if still above 1.5, use local reversal policy."
      : "Check INR before surgery and confirm the target has been met.",
  ],
  [
    "Day 0",
    bleedingRisk === "high"
      ? "Proceed only when INR is 1.5 or lower and hemostatic planning is complete."
      : "Proceed when INR is 1.5 or lower.",
  ],
  ["Day 0 evening", "Restart warfarin if hemostasis is secure."],
  [
    "Day +1 onward",
    bridging
      ? "Restart LMWH 24 to 72 hours after surgery depending on bleeding risk, and continue until INR is therapeutic."
      : "Monitor hemostasis and resume routine anticoagulation follow-up.",
  ],
];

const buildDoacSchedule = ({ holdPlan, restartWindow, surgeryType }) => {
  if (surgeryType !== "elective") {
    return [
      ["Now", "Stop the DOAC, document the last dose time, and check coagulation support tests."],
      ["Before procedure", "Use calibrated assay if available; if significant drug effect is likely, follow the reversal pathway."],
      ["After hemostasis", restartWindow],
    ];
  }

  const rows = [];

  if (Number.isFinite(holdPlan.leadDays) && holdPlan.leadDays > 1) {
    rows.push([`Day -${holdPlan.leadDays}`, holdPlan.hold]);
  } else if (holdPlan.leadDays === 1) {
    rows.push(["Day -1", holdPlan.hold]);
  } else {
    rows.push(["Day 0 morning", holdPlan.hold]);
  }

  rows.push(["Day 0", "Proceed to surgery once the planned interruption interval has elapsed."]);
  rows.push(["Postoperative", restartWindow]);
  return rows;
};

const getStrokeRiskInterpretation = (cha2ds2Vasc, sex) => {
  if (sex === "female" && cha2ds2Vasc === 1) {
    return "Female sex alone does not justify anticoagulation.";
  }

  if ((sex === "male" && cha2ds2Vasc === 0) || (sex === "female" && cha2ds2Vasc <= 1)) {
    return "Low stroke risk: anticoagulation is not routinely indicated by score alone.";
  }

  if ((sex === "male" && cha2ds2Vasc === 1) || (sex === "female" && cha2ds2Vasc === 2)) {
    return "Intermediate stroke risk: shared decision-making is appropriate.";
  }

  return "Stroke prevention with anticoagulation is generally recommended.";
};

const getChads2Score = (values) => {
  const age = asNumber(values.age) ?? 0;
  return sum([
    values.chf ? 1 : 0,
    values.hypertension ? 1 : 0,
    age >= 75 ? 1 : 0,
    values.diabetes ? 1 : 0,
    values.priorStroke ? 2 : 0,
  ]);
};

const getPccDose = (inr, weight) => {
  const w = asNumber(weight);
  const i = asNumber(inr);
  if (!Number.isFinite(w) || !Number.isFinite(i)) return null;

  // Kcentra (Beriplex P/N / Octaplex) — 4-Factor PCC
  // Source: Kcentra Prescribing Information (CSL Behring)
  // Dosing is INR-tiered and weight-based
  let unitsPerKg;
  let approxVolumeMlPerKg; // reconstituted volume per kg
  if (i >= 6.0) {
    unitsPerKg = 50;
    approxVolumeMlPerKg = 2.0;
  } else if (i >= 4.0) {
    unitsPerKg = 35;
    approxVolumeMlPerKg = 1.4;
  } else if (i >= 2.0) {
    unitsPerKg = 25;
    approxVolumeMlPerKg = 1.0;
  } else {
    return {
      dose: 0, unitsPerKg: 0, targetInr: "Already near target",
      maxDose: 0, approxVolumeMl: 0, infusionRate: "N/A",
      note: "INR is below 2.0; PCC is generally not needed. Vitamin K alone may suffice.",
      vialsNeeded: 0,
    };
  }

  const rawDose = Math.round(unitsPerKg * w);
  const maxDose = 3000; // Kcentra: do not exceed 3000 units per single dose
  const dose = Math.min(rawDose, maxDose);
  const approxVolumeMl = Math.round(dose / 25); // ~25 units/mL reconstituted

  // Vial sizes: 500 units (20 mL) and 1000 units (40 mL)
  const vialsNeeded1000 = Math.floor(dose / 1000);
  const remainder = dose - vialsNeeded1000 * 1000;
  const vialsNeeded500 = remainder > 0 ? Math.ceil(remainder / 500) : 0;
  const vialText = vialsNeeded1000 > 0
    ? `${vialsNeeded1000}×1000 U${vialsNeeded500 > 0 ? ` + ${vialsNeeded500}×500 U` : ""}`
    : `${vialsNeeded500}×500 U`;

  return {
    dose,
    unitsPerKg,
    targetInr: "≤1.3",
    maxDose,
    weight: w,
    inr: i,
    approxVolumeMl,
    vialText,
    // Kcentra infusion rate: 0.12 mL/kg/min (~3 units/kg/min), max 8.4 mL/min
    infusionRate: `${Math.min(Math.round(0.12 * w * 10) / 10, 8.4)} mL/min (0.12 mL/kg/min)`,
    infusionTimeMins: Math.ceil(approxVolumeMl / Math.min(0.12 * w, 8.4)),
    note: dose === maxDose
      ? `Calculated ${rawDose} units → capped at maximum ${maxDose} units. Approx ${vialText} vials, ${approxVolumeMl} mL reconstituted.`
      : `${dose} units (${unitsPerKg} units/kg × ${w} kg). Approx ${vialText} vials, ${approxVolumeMl} mL reconstituted.`,
    redoseNote: "Do not repeat dose. If INR remains elevated after 15 min recheck, consider additional vitamin K, FFP, or specialist input.",
  };
};

export const toolCategories = [
  { id: "all", label: "All tools" },
  { id: "algorithm", label: "Algorithms" },
  { id: "score", label: "Scoring tools" },
  { id: "renal", label: "Renal dosing" },
];

export const tools = [
  {
    id: "perioperative",
    title: "Perioperative Anticoagulant Management Algorithm",
    shortTitle: "Perioperative",
    type: "algorithm",
    category: "algorithm",
    badge: "Pathway",
    blurb:
      "Multi-step perioperative anticoagulant interruption, reversal, bridging, and restart planning.",
    tags: ["DOAC", "warfarin", "surgery", "bleeding"],
    notes: [
      "Use with local reversal policy, anesthesia guidance, and procedure-specific hemostatic planning.",
      "Outputs are organized as a structured perioperative decision summary with stepwise day-by-day instructions.",
    ],
    inputs: [
      {
        id: "surgeryType",
        label: "Surgery type",
        type: "radio",
        options: [
          { value: "elective", label: "Elective" },
          { value: "urgent", label: "Urgent surgery or procedure within 12 to 24 hours" },
          { value: "emergency", label: "Emergency surgery or procedure within 12 hours" },
        ],
        defaultValue: "elective",
      },
      {
        id: "bleedingRisk",
        label: "Procedural bleeding risk",
        type: "select",
        options: [
          { value: "low_non_dental", label: "Low non-dental" },
          { value: "low_dental", label: "Low dental" },
          { value: "moderate", label: "Moderate" },
          { value: "high", label: "High" },
        ],
        defaultValue: "low_non_dental",
      },
      {
        id: "anticoagulant",
        label: "Anticoagulant used",
        type: "select",
        options: [
          { value: "apixaban", label: "Apixaban" },
          { value: "dabigatran", label: "Dabigatran" },
          { value: "edoxaban", label: "Edoxaban" },
          { value: "rivaroxaban", label: "Rivaroxaban" },
          { value: "warfarin", label: "Warfarin" },
        ],
        defaultValue: "apixaban",
      },
      { id: "inr", label: "INR value", type: "number", min: 0.8, step: 0.1, visibleWhen: (v) => v.anticoagulant === "warfarin" },
      {
        id: "drugLevelStatus",
        label: "Drug level availability",
        type: "radio",
        options: [
          { value: "available", label: "Drug level available" },
          { value: "not_available", label: "Drug level not available" },
        ],
        defaultValue: "not_available",
        visibleWhen: (v) => v.anticoagulant !== "warfarin",
      },
      { id: "drugLevel", label: "Drug level (ng/mL)", type: "number", min: 0, step: 1, visibleWhen: (v) => v.anticoagulant !== "warfarin" && v.drugLevelStatus === "available" },
      { id: "hoursSinceLastDose", label: "Hours since last dose", type: "number", min: 0, step: 1, visibleWhen: (v) => v.surgeryType !== "elective" },
      { id: "age", label: "Age", type: "number", min: 18, step: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", min: 20, step: 0.1 },
      {
        id: "serumCreatinine",
        label: "Serum creatinine",
        type: "number",
        min: 0.1,
        step: 0.1,
      },
      {
        id: "creatinineUnit",
        label: "Creatinine unit",
        type: "radio",
        options: [
          { value: "umol", label: "umol/L" },
          { value: "mgdl", label: "mg/dL" },
        ],
        defaultValue: "umol",
      },
      {
        id: "sex",
        label: "Sex",
        type: "radio",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        defaultValue: "male",
      },
      {
        id: "indication",
        label: "Indication for anticoagulation",
        type: "radio",
        options: [
          { value: "atrial_fibrillation", label: "Atrial fibrillation" },
          { value: "dvt_pe", label: "DVT or PE" },
          { value: "mechanical_valve", label: "Mechanical valve" },
        ],
        defaultValue: "atrial_fibrillation",
      },
      { id: "chads2", label: "CHADS2 score", type: "number", min: 0, max: 6, step: 1, visibleWhen: (v) => v.indication === "atrial_fibrillation" },
      { id: "strokeTiaWithin3Months", label: "Stroke or TIA within 3 months", type: "checkbox", visibleWhen: (v) => v.indication === "atrial_fibrillation" },
      { id: "rheumaticMitralStenosis", label: "Rheumatic mitral stenosis", type: "checkbox", visibleWhen: (v) => v.indication === "atrial_fibrillation" },
      {
        id: "vteTiming",
        label: "Most recent DVT or PE timing",
        type: "select",
        options: [
          { value: "within_3_months", label: "Within 3 months" },
          { value: "between_3_and_12_months", label: "Between 3 and 12 months" },
          { value: "over_12_months", label: "Single VTE more than 12 months ago" },
        ],
        defaultValue: "over_12_months",
        visibleWhen: (v) => v.indication === "dvt_pe",
      },
      { id: "recurrentVte", label: "Recurrent VTE", type: "checkbox", visibleWhen: (v) => v.indication === "dvt_pe" },
      { id: "activeCancer", label: "Active cancer", type: "checkbox", visibleWhen: (v) => v.indication === "dvt_pe" },
      { id: "severeThrombophilia", label: "Known severe thrombophilia", type: "checkbox", visibleWhen: (v) => v.indication === "dvt_pe" },
      {
        id: "valvePosition",
        label: "Mechanical valve position",
        type: "radio",
        options: [
          { value: "aortic", label: "Aortic" },
          { value: "mitral", label: "Mitral" },
        ],
        defaultValue: "aortic",
        visibleWhen: (v) => v.indication === "mechanical_valve",
      },
      {
        id: "valveType",
        label: "Mechanical valve prosthesis type",
        type: "select",
        options: [
          { value: "bileaflet", label: "Bileaflet" },
          { value: "caged_ball", label: "Caged ball" },
          { value: "tilting_disc", label: "Tilting disc" },
        ],
        defaultValue: "bileaflet",
        visibleWhen: (v) => v.indication === "mechanical_valve",
      },
      { id: "valveAtrialFibrillation", label: "Mechanical valve plus atrial fibrillation", type: "checkbox", visibleWhen: (v) => v.indication === "mechanical_valve" },
      { id: "valveChadsAtLeastOne", label: "Mechanical valve plus CHADS at least 1", type: "checkbox", visibleWhen: (v) => v.indication === "mechanical_valve" },
      { id: "strokeTiaWithin6Months", label: "Stroke or TIA within 6 months", type: "checkbox", visibleWhen: (v) => v.indication === "mechanical_valve" },
      {
        id: "immediateReversal",
        label: "Immediate reversal is needed now",
        type: "checkbox",
        visibleWhen: (v) => v.surgeryType !== "elective",
      },
    ],
    calculate: (values) => {
      const surgeryType = values.surgeryType ?? "elective";
      const drug = values.anticoagulant ?? "apixaban";
      const bleedingRisk = values.bleedingRisk ?? "low_non_dental";
      const inr = asNumber(values.inr);
      const drugLevel = asNumber(values.drugLevel);
      const crcl = calculateCrCl(values);
      const thromboembolicRisk = getPerioperativeRiskProfile(values);
      const bridgingNeeded = drug === "warfarin" && thromboembolicRisk.level === "High";
      const doacRestart = getDoacRestartWindow(bleedingRisk);
      const summaryRows = [
        ["Bleeding risk", formatBleedingRiskLabel(bleedingRisk)],
        ["Anticoagulant", sentenceCase(drug)],
        ["Creatinine clearance", formatMetricValue(crcl, " mL/min")],
        ["Indication for antithrombotic", sentenceCase(values.indication ?? "atrial_fibrillation")],
        ["Thromboembolic risk", thromboembolicRisk.level],
      ];

      if (surgeryType !== "elective") {
        const immediateActions = [
          "Refer urgently for procedural or surgical intervention.",
          "Check hemoglobin concentration and platelet count to guide transfusion support.",
          "Give red cell transfusion for symptomatic anemia.",
          "Give platelet transfusion for thrombocytopenia below 50 x10⁹/L or when antiplatelet therapy materially affects hemostasis.",
          "Discontinue the anticoagulant immediately.",
        ];

        if (drug === "warfarin") {
          const needsPcc = values.immediateReversal || (Number.isFinite(inr) && inr > 1.5);
          const pccResult = getPccDose(inr, values.weight);
          return {
            tone: tone.danger,
            headline: "Urgent or emergency warfarin reversal",
            summary:
              "Stabilize the patient, discontinue warfarin, and use INR-guided reversal before surgery whenever time allows.",
            action:
              "Give vitamin K 10 mg IV and repeat the INR. If the INR remains above 1.5, or if immediate reversal is required, proceed to PCC unless contraindicated.",
            metrics: buildMetrics([
              { label: "Surgery type", value: sentenceCase(surgeryType) },
              { label: "Anticoagulant", value: "Warfarin" },
              { label: "INR", value: Number.isFinite(inr) ? formatScore(inr) : "Enter INR" },
              { label: "Creatinine clearance", value: formatMetricValue(crcl, " mL/min") },
              { label: "PCC dose", value: pccResult ? `${pccResult.dose} units` : "Enter INR and weight" },
              { label: "Infusion rate", value: pccResult && pccResult.dose > 0 ? pccResult.infusionRate : "Calculate dose first" },
            ]),
            recommendations: [
              { label: "Immediate hold", value: "Stop warfarin now." },
              { label: "Vitamin K", value: "10 mg IV slow push. Onset 6–8 hours for partial effect; full effect at 24 hours. Always co-administer with PCC for sustained reversal." },
              {
                label: "PCC dose (Kcentra/Beriplex/Octaplex)",
                value: pccResult && pccResult.dose > 0
                  ? `${pccResult.note} Infuse at ${pccResult.infusionRate} (estimated ${pccResult.infusionTimeMins} min infusion). Target INR: ${pccResult.targetInr}.`
                  : "Enter INR and weight to calculate the PCC dose. If unavailable and reversal cannot be delayed, give fixed-dose PCC 2000 units IV.",
              },
              {
                label: "PCC strategy",
                value: needsPcc
                  ? "Use 4-factor PCC (Kcentra/Beriplex) based on INR and weight. Single dose only — do not repeat PCC."
                  : "No PCC is needed if INR is already 1.5 or lower.",
              },
              {
                label: "Vials needed",
                value: pccResult && pccResult.dose > 0
                  ? `${pccResult.vialText}. Available as 500 U (20 mL) and 1000 U (40 mL) vials. Reconstitute with provided diluent. Use within 4 hours.`
                  : "Calculate dose first.",
              },
              {
                label: "Fallback if PCC unavailable",
                value: "FFP 10–15 mL/kg (approximately 3–4 units). Slower onset, risk of volume overload. Consider cryoprecipitate if fibrinogen is also low.",
              },
              { label: "INR recheck", value: "Recheck INR 15–30 minutes after PCC infusion, then again at 6–8 hours. Target INR ≤1.5 before proceeding to surgery." },
              { label: "Re-dosing", value: pccResult?.redoseNote ?? "Do not repeat PCC. If INR remains elevated, consider additional vitamin K, FFP, or specialist input." },
            ],
            tables: [
              buildTable("Summary", ["Item", "Value"], summaryRows),
              buildTable("Immediate management", ["Step", "Recommendation"], immediateActions.map((item, index) => [`${index + 1}`, item])),
              buildTable("Kcentra/Beriplex PCC Dosing Calculator", ["INR range", "Dose (units/kg)", "Approx volume/kg", "Maximum single dose"], [
                ["INR 2.0–3.9", "25 units/kg", "~1.0 mL/kg", "3000 units"],
                ["INR 4.0–5.9", "35 units/kg", "~1.4 mL/kg", "3000 units"],
                ["INR ≥ 6.0", "50 units/kg", "~2.0 mL/kg", "3000 units"],
              ]),
              ...(pccResult && pccResult.dose > 0 ? [buildTable("Calculated dose for this patient", ["Parameter", "Value"], [
                ["Patient weight", `${pccResult.weight} kg`],
                ["Pre-treatment INR", `${pccResult.inr}`],
                ["Dosing tier", `${pccResult.unitsPerKg} units/kg`],
                ["Calculated dose", `${pccResult.dose} units${pccResult.dose === pccResult.maxDose ? " (capped at maximum)" : ""}`],
                ["Approximate volume", `${pccResult.approxVolumeMl} mL reconstituted`],
                ["Vials required", pccResult.vialText],
                ["Infusion rate", pccResult.infusionRate],
                ["Estimated infusion time", `${pccResult.infusionTimeMins} minutes`],
                ["Target INR", pccResult.targetInr],
              ])] : []),
              buildTable("Warfarin reversal pathway", ["Decision point", "Recommendation"], [
                ["Step 1: Vitamin K", "Give 10 mg IV slow push immediately."],
                ["Step 2: INR assessment", "If INR > 1.5 or immediate reversal needed, proceed to PCC."],
                ["Step 3: PCC infusion", "Kcentra: 0.12 mL/kg/min (max 8.4 mL/min). Beriplex: 1 mL/min then max 8 mL/min. Octaplex: 1 mL/min then max 2–3 mL/min."],
                ["Step 4: INR recheck", "15–30 min post-PCC infusion. If INR ≤ 1.5, proceed to surgery."],
                ["Step 5: If INR still elevated", "Consider additional vitamin K. Do NOT repeat PCC. FFP 10–15 mL/kg as fallback."],
                ["Step 6: Post-procedure", "Recheck INR at 6–8 hours. Plan anticoagulation restart timing."],
              ]),
            ],
            supporting: [
              "Kcentra (US) = Beriplex P/N (EU/Canada) = Octaplex (Canada). All are 4-factor PCC containing Factors II, VII, IX, X, and Proteins C and S.",
              "Dosing is per the Kcentra prescribing information (CSL Behring). Single dose only — do not repeat.",
              "PCC provides immediate INR correction (within 10–15 minutes). Vitamin K ensures sustained reversal beyond the 12–24 hour PCC effect window.",
              "PCC is contraindicated in: known anaphylaxis to PCC components, DIC, HIT (contains heparin traces in some formulations).",
              "Thrombotic risk: VTE, DIC, and MI have been reported. Risk is approximately 1–2%. Use lowest effective dose.",
              "Maximum single dose is 3000 units (approximately 120 mL) regardless of calculated dose.",
              "Reconstitute each vial with provided diluent using the Mix2Vial transfer set. Do not shake. Use within 4 hours of reconstitution.",
              thromboembolicRisk.rationale,
            ],
          };
        }

        if (drug === "dabigatran") {
          const significantLevel =
            values.drugLevelStatus === "available" && Number.isFinite(drugLevel) && drugLevel >= 30;
          return {
            tone: tone.danger,
            headline: "Urgent or emergency dabigatran reversal",
            summary:
              "Use a dilute thrombin time or Hemoclot assay if available. Reverse clinically significant dabigatran effect before surgery whenever possible.",
            action:
              significantLevel || values.drugLevelStatus === "not_available"
                ? "Give idarucizumab 2.5 g IV bolus, then repeat 2.5 g IV within 15 minutes for a total of 5 g."
                : "No reversal is needed if the dabigatran level is below 30 to 50 ng/mL and the clinical picture is reassuring.",
            metrics: buildMetrics([
              { label: "Urgency", value: sentenceCase(surgeryType) },
              { label: "Anticoagulant", value: "Dabigatran" },
              { label: "CrCl", value: formatMetricValue(crcl, " mL/min") },
              { label: "Drug level", value: Number.isFinite(drugLevel) ? `${drugLevel} ng/mL` : "Not available" },
            ]),
            recommendations: [
              { label: "Immediate hold", value: "Stop dabigatran now." },
              {
                label: "Primary reversal",
                value: "Idarucizumab 5 g IV total when level is 30 to 50 ng/mL or higher, or when assay data are unavailable but significant drug levels are suspected.",
              },
              { label: "Fallback", value: "If idarucizumab is unavailable, use PCC 50 units/kg with a maximum of 3000 units, or FEIBA 2000 units." },
              { label: "Adjunct", value: "Consider hemodialysis if feasible; about 65 percent of dabigatran can be removed over 4 hours." },
              { label: "Post-op restart", value: doacRestart },
            ],
            tables: [
              buildTable("Summary", ["Item", "Value"], summaryRows),
              buildTable("Immediate management", ["Step", "Recommendation"], immediateActions.map((item, index) => [`${index + 1}`, item])),
              buildTable("Dabigatran reversal", ["Situation", "Recommendation"], [
                ["Level below 30 to 50 ng/mL", "No reversal is usually required."],
                ["Level 30 to 50 ng/mL or higher", "Give idarucizumab 5 g IV total."],
                ["Assay unavailable", "Estimate from last dose, timing, and CrCl; reverse if significant residual drug is likely."],
              ]),
            ],
            supporting: [thromboembolicRisk.rationale],
          };
        }

        return {
          tone: tone.danger,
          headline: "Urgent or emergency factor Xa inhibitor reversal",
          summary:
            "Use a calibrated anti-Xa assay if available. If clinically significant apixaban, rivaroxaban, or edoxaban exposure is suspected, proceed with non-specific reversal.",
          action:
            "Stop the anticoagulant now. If clinically significant residual drug is suspected, use PCC 50 units/kg up to a maximum of 3000 units.",
          metrics: buildMetrics([
            { label: "Urgency", value: sentenceCase(surgeryType) },
            { label: "Anticoagulant", value: sentenceCase(drug) },
            { label: "CrCl", value: formatMetricValue(crcl, " mL/min") },
            { label: "Drug level", value: Number.isFinite(drugLevel) ? `${drugLevel} ng/mL` : "Not available" },
          ]),
          recommendations: [
            { label: "Immediate hold", value: `Stop ${sentenceCase(drug)} now.` },
            { label: "Assay", value: `Use a ${sentenceCase(drug)}-calibrated anti-Xa assay if it is available.` },
            { label: "Reversal", value: "Use PCC 50 units/kg up to 3000 units when significant residual drug is suspected." },
            { label: "Post-op restart", value: doacRestart },
          ],
          tables: [
            buildTable("Summary", ["Item", "Value"], summaryRows),
            buildTable("Immediate management", ["Step", "Recommendation"], immediateActions.map((item, index) => [`${index + 1}`, item])),
            buildTable("Factor Xa inhibitor reversal", ["Situation", "Recommendation"], [
              ["Assay available", "Use the calibrated anti-Xa result to estimate residual drug effect."],
              ["Assay unavailable", "Estimate from dose timing, regimen, and creatinine clearance."],
              ["Significant level suspected", "Use PCC 50 units/kg up to 3000 units."],
            ]),
          ],
          supporting: [
            "No specific reversal agent is included in this protocol for apixaban, rivaroxaban, or edoxaban.",
            thromboembolicRisk.rationale,
          ],
        };
      }

      if (drug === "warfarin") {
        const inrTargetMet = Number.isFinite(inr) && inr <= 1.5;
        const schedule = buildWarfarinElectiveSchedule({
          bridging: bridgingNeeded,
          bleedingRisk,
          inr,
        });

        return {
          tone: bleedingRisk === "high" || bridgingNeeded ? tone.warning : tone.success,
          headline: "Elective perioperative warfarin plan",
          summary:
            bleedingRisk === "high"
              ? "Use a full preoperative interruption plan and confirm INR is 1.5 or lower before surgery."
              : "Stop warfarin 5 to 6 days before surgery and check the INR before the procedure.",
          action: bridgingNeeded
            ? "Bridging anticoagulation is warranted because thromboembolic risk is high."
            : "Bridging is not routinely required for this warfarin interruption plan.",
          metrics: buildMetrics([
            { label: "Anticoagulant", value: "Warfarin" },
            { label: "Bleeding risk", value: formatBleedingRiskLabel(bleedingRisk) },
            { label: "Thromboembolic risk", value: thromboembolicRisk.level },
            { label: "INR", value: Number.isFinite(inr) ? formatScore(inr) : "Enter INR" },
            { label: "Creatinine clearance", value: formatMetricValue(crcl, " mL/min") },
          ]),
          recommendations: [
            { label: "Pre-op hold", value: "Stop warfarin 5 to 6 days before surgery." },
            {
              label: "Bridging",
              value: bridgingNeeded
                ? "Therapeutic LMWH bridging is recommended for high thromboembolic risk."
                : "No LMWH bridging is routinely recommended.",
            },
            {
              label: "INR checkpoint",
              value: inrTargetMet
                ? "INR is already 1.5 or lower and no additional reversal is usually required."
                : "Check INR the day before surgery. If INR remains above 1.4 to 1.5, administer vitamin K according to the perioperative protocol.",
            },
            { label: "Post-op restart", value: "Restart warfarin as soon as the patient is drinking fluids and if further operative intervention is not anticipated." },
          ],
          tables: [
            buildTable("Summary", ["Item", "Value"], summaryRows),
            buildTable("Day-by-day perioperative schedule", ["Day", "Instructions"], schedule),
          ],
          supporting: [
            thromboembolicRisk.rationale,
            bridgingNeeded
              ? "Resume therapeutic-dose LMWH 24 to 48 hours after surgery when hemostasis is secure, and discontinue LMWH once the INR is therapeutic."
              : "Resume the anticoagulant the following day after low-risk procedures if hemostasis is secure.",
          ],
        };
      }

      const holdPlan = getElectiveDoacHoldPlan(drug, bleedingRisk, crcl);
      const restartWindow = getDoacRestartWindow(bleedingRisk);

      return {
        tone: bleedingRisk === "high" ? tone.warning : tone.success,
        headline: "Elective perioperative DOAC plan",
        summary: holdPlan.rationale,
        action: `Hold ${sentenceCase(drug)} according to bleeding risk and renal function, then ${restartWindow.toLowerCase()}`,
        metrics: buildMetrics([
          { label: "Anticoagulant", value: sentenceCase(drug) },
          { label: "CrCl", value: formatMetricValue(crcl, " mL/min") },
          { label: "Bleeding risk", value: formatBleedingRiskLabel(bleedingRisk) },
          { label: "Thromboembolic risk", value: thromboembolicRisk.level },
        ]),
        recommendations: [
          { label: "Pre-op hold", value: holdPlan.hold },
          { label: "Bridging", value: "LMWH bridging is not routinely recommended for DOAC interruption." },
          { label: "Post-op restart", value: restartWindow },
        ],
        tables: [
          buildTable("Summary", ["Item", "Value"], summaryRows),
          buildTable("Day-by-day perioperative schedule", ["Day", "Instructions"], buildDoacSchedule({ holdPlan, restartWindow, surgeryType })),
        ],
        supporting: [
          "If assay data are unavailable, estimate residual DOAC effect from dosing schedule, timing of the last dose, and creatinine clearance.",
          "Stop DOAC on the day of intervention and restart the following day only for lower bleeding risk procedures with secure hemostasis.",
          thromboembolicRisk.rationale,
        ],
      };
    },
  },
  {
    id: "af-dosing",
    title: "Anticoagulant Dosing in Atrial Fibrillation",
    shortTitle: "AF Dosing",
    type: "algorithm",
    category: "algorithm",
    badge: "Dosing",
    blurb:
      "Estimate stroke risk, identify warfarin-only states, and review renal-adjusted oral anticoagulant options.",
    tags: ["AF", "DOAC", "stroke prevention", "renal"],
    notes: [
      "Designed for atrial fibrillation with explicit warfarin-only exceptions.",
      "Outputs focus on drug-specific renal notes, contraindications, and reassessment prompts.",
    ],
    inputs: [
      { id: "age", label: "Age", type: "number", min: 18, step: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", min: 20, step: 0.1 },
      {
        id: "serumCreatinine",
        label: "Serum creatinine",
        type: "number",
        min: 0.1,
        step: 0.1,
      },
      {
        id: "creatinineUnit",
        label: "Creatinine unit",
        type: "radio",
        options: [
          { value: "umol", label: "umol/L" },
          { value: "mgdl", label: "mg/dL" },
        ],
        defaultValue: "umol",
      },
      {
        id: "sex",
        label: "Sex",
        type: "radio",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        defaultValue: "male",
      },
      { id: "chf", label: "Congestive heart failure history", type: "checkbox" },
      { id: "hypertension", label: "Hypertension history", type: "checkbox" },
      { id: "diabetes", label: "Diabetes mellitus", type: "checkbox" },
      { id: "priorStroke", label: "Previous stroke or TIA", type: "checkbox" },
      { id: "vascularDisease", label: "Macrovascular disease: coronary, aortic, or peripheral", type: "checkbox" },
      { id: "warfarinOnlyIndication", label: "Patient has another indication for warfarin therapy", type: "checkbox" },
      { id: "pGpInhibitor", label: "Concomitant use of P-gp inhibitors except amiodarone and verapamil", type: "checkbox", visibleWhen: (v) => !v.warfarinOnlyIndication },
    ],
    calculate: (values) => {
      const mergedValues = { ...values, femaleSex: values.sex === "female" };
      const cha2ds2Vasc = getChadsVascScore(mergedValues);
      const chads2 = getChads2Score(values);
      const crcl = calculateCrCl(values);
      const age = asNumber(values.age) ?? 0;
      const serumCreatinine = asNumber(values.serumCreatinine) ?? 0;
      const weight = asNumber(values.weight) ?? 0;
      const strokeInterpretation = getStrokeRiskInterpretation(cha2ds2Vasc, values.sex);
      const warfarinOnly = Boolean(values.warfarinOnlyIndication);

      const apixabanReductionCount = sum([
        age >= 80 ? 1 : 0,
        weight > 0 && weight <= 60 ? 1 : 0,
        values.creatinineUnit === "umol"
          ? serumCreatinine >= 133
            ? 1
            : 0
          : serumCreatinine >= 1.5
            ? 1
            : 0,
      ]);

      const recommendedRows = [];
      const restrictedRows = [];

      const pushRecommended = (drugName, dose, note) => {
        recommendedRows.push([drugName, dose, note]);
      };

      const pushRestricted = (drugName, status, reason) => {
        restrictedRows.push([drugName, status, reason]);
      };

      if (warfarinOnly) {
        pushRecommended("Warfarin", "INR 2 to 3", "Use warfarin because another indication such as a mechanical valve or LV thrombus is present.");
        pushRestricted("Apixaban", "Generally not recommended", "Another indication for warfarin is present.");
        pushRestricted("Dabigatran", "Generally not recommended", "Another indication for warfarin is present.");
        pushRestricted("Rivaroxaban", "Generally not recommended", "Another indication for warfarin is present.");
        pushRestricted("Edoxaban", "Generally not recommended", "Another indication for warfarin is present.");
      } else if (crcl === null) {
        pushRestricted("All agents", "Cannot dose yet", "Age, weight, sex, and serum creatinine are required to calculate Cockcroft-Gault creatinine clearance.");
      } else if (crcl < 15) {
        pushRecommended("Warfarin", "INR 2 to 3", "Supported option when creatinine clearance is below 15 mL/min.");
        pushRestricted("Dabigatran", "Contraindicated", "CrCl is below 15 mL/min.");
        pushRestricted("Apixaban", "Not recommended", "Insufficient clinical data when CrCl is below 15 mL/min.");
        pushRestricted("Edoxaban", "Not recommended", "CrCl is below 15 mL/min.");
        pushRestricted("Rivaroxaban", "Not recommended", "CrCl is below 15 mL/min.");
      } else if (crcl <= 24) {
        pushRecommended("Warfarin", "INR 2 to 3", "Supported option for severe renal impairment.");
        pushRestricted("Dabigatran", "Contraindicated", "CrCl is 15 to 24 mL/min.");
        pushRestricted("Apixaban", "No dosing recommendation", "Insufficient clinical data at this creatinine clearance.");
        pushRestricted("Edoxaban", "Not recommended", "CrCl is 15 to 24 mL/min.");
        pushRestricted("Rivaroxaban", "Not recommended", "CrCl is 15 to 24 mL/min.");
      } else {
        pushRecommended(
          "Apixaban",
          apixabanReductionCount >= 2 ? "2.5 mg twice daily" : "5 mg twice daily",
          apixabanReductionCount >= 2
            ? "Dose reduction because at least two of the following are present: age 80 or more, weight 60 kg or less, serum creatinine 133 µmol/L or more."
            : "Standard dose."
        );

        if (crcl < 30) {
          pushRestricted("Dabigatran", "Contraindicated", "CrCl is below 30 mL/min.");
        } else {
          pushRecommended(
            "Dabigatran",
            age >= 80 || values.pGpInhibitor ? "110 mg twice daily" : "150 mg twice daily",
            age >= 80 || values.pGpInhibitor
              ? "Use 110 mg twice daily because age is at least 80 years or a relevant P-gp inhibitor is present."
              : "150 mg twice daily is standard; 110 mg twice daily can be considered if bleeding risk is higher."
          );
        }

        pushRecommended(
          "Rivaroxaban",
          crcl >= 50 ? "20 mg once daily" : "15 mg once daily",
          crcl >= 50 ? "Standard once-daily dose." : "Renal-adjusted dose."
        );

        const edoxabanReduced = crcl <= 50 || weight <= 60 || values.pGpInhibitor;
        pushRecommended(
          "Edoxaban",
          edoxabanReduced ? "30 mg once daily" : "60 mg once daily",
          edoxabanReduced
            ? "Dose reduction because of creatinine clearance 50 mL/min or lower, weight 60 kg or less, or P-gp inhibitor use."
            : "Standard once-daily dose."
        );

        pushRecommended("Warfarin", "INR 2 to 3", "Use when DOACs are unsuitable or patient preference favors INR-based therapy.");
      }

      return {
        tone: warfarinOnly ? tone.warning : cha2ds2Vasc >= 2 ? tone.warning : tone.success,
        headline: warfarinOnly ? "Warfarin-led strategy" : "Recommendations",
        summary: strokeInterpretation,
        action: warfarinOnly
          ? "Prescribe warfarin rather than a DOAC unless a specialist pathway says otherwise."
          : "Review all applicable anticoagulant options below, then balance stroke prevention against bleeding risk and patient preference.",
        metrics: buildMetrics([
          { label: "Creatinine clearance", value: formatMetricValue(crcl, " mL/min") },
          { label: "CHA2DS2-VASc", value: `${cha2ds2Vasc}` },
          { label: "CHADS Score", value: `${chads2}` },
          { label: "Preferred route", value: warfarinOnly ? "Warfarin" : "DOAC or warfarin" },
        ]),
        recommendations: [
          { label: "Stroke interpretation", value: strokeInterpretation },
          { label: "Primary recommendation", value: warfarinOnly ? "Warfarin" : recommendedRows[0]?.[0] ?? "Enter renal data" },
          {
            label: "Other recommendations",
            value:
              "Creatinine clearance should be checked yearly if creatinine clearance is 50 mL/min or more and every 6 months if below 50 mL/min, with drug selection and dose reassessed accordingly.",
          },
          {
            label: "Guideline preference",
            value:
              "A novel oral anticoagulant is generally preferred over warfarin when there is no separate indication for warfarin.",
          },
        ],
        tables: [
          buildTable("Recommended anticoagulants", ["Drug", "Dose", "Clinical note"], recommendedRows),
          buildTable("Contraindicated or not recommended", ["Drug", "Status", "Reason"], restrictedRows.length ? restrictedRows : [["None", "None", "No additional contraindication was triggered by the current inputs."]]),
        ],
        supporting: [
          "Creatinine clearance uses Cockcroft-Gault, which is the renal estimate used in major DOAC trials.",
          "If another warfarin indication exists, DOACs are generally not recommended in this tool.",
          "Concomitant use of potent P-gp or specific CYP inhibitors or inducers may impact anticoagulant levels. Consult the product monograph for specific recommendations.",
          "Including but not limited to carvedilol, clarithromycin, cyclosporin, erythromycin, itraconazole, ketoconazole, dronedarone, lapatinib, lopinavir, propafenone, quinidine, ranolazine, ritonavir, saquinavir, telaprevir, and tipranavir.",
          "Dose reduction of edoxaban is not required with concomitant use of verapamil or amiodarone.",
          "CHA2DS2-VASc may be relatively insensitive or unspecific to predict stroke risk.",
          "If age is the only risk factor, there is a graded increase in stroke risk from age 65 to 75.",
          "Females may not have a higher risk of stroke independent of other risk factors.",
          "The risk stratification does not incorporate the severity of risk factors such as poorly controlled versus well controlled hypertension.",
        ],
      };
    },
  },
  {
    id: "thrombophilia",
    title: "Thrombophilia Testing Algorithm",
    shortTitle: "Thrombophilia",
    type: "algorithm",
    category: "algorithm",
    badge: "Testing",
    blurb:
      "Decide when testing is worth doing, when it is low-value, and when timing makes results unreliable.",
    tags: ["VTE", "testing", "family history", "unusual site"],
    notes: [
      "Only consider thrombophilia testing if the result could change management.",
      "The output now emphasizes targeted testing, interruption timing, and acquired thrombophilia prompts.",
    ],
    inputs: [
      { id: "concomitantArterialDisease", label: "Concomitant arterial disease", type: "checkbox" },
      { id: "ageUnder50", label: "Young age under 50 years", type: "checkbox" },
      { id: "strongFamilyHistory", label: "Strong family history in first-degree relatives before 50 years", type: "checkbox" },
      { id: "cbcAbnormalities", label: "CBC abnormalities: anemia, thrombocytopenia, thrombocytosis, or polycythemia", type: "checkbox" },
      { id: "autoimmuneDisease", label: "Autoimmune disease", type: "checkbox" },
      {
        id: "firstVte",
        label: "Is this the first VTE?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        defaultValue: "yes",
      },
      {
        id: "vteSite",
        label: "VTE location",
        type: "radio",
        options: [
          { value: "usual", label: "Usual site (leg DVT or PE)" },
          { value: "unusual", label: "Unusual site (cerebral or splanchnic)" },
        ],
        defaultValue: "usual",
      },
      {
        id: "provocation",
        label: "Provoked or unprovoked?",
        type: "radio",
        options: [
          { value: "provoked", label: "Provoked" },
          { value: "unprovoked", label: "Unprovoked" },
        ],
        defaultValue: "unprovoked",
      },
      { id: "onAnticoagulation", label: "Currently on anticoagulants", type: "checkbox" },
      {
        id: "anticoagulantClass",
        label: "Current anticoagulant class",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "warfarin", label: "Warfarin" },
          { value: "doac", label: "DOAC" },
          { value: "ufh_lmwh", label: "UFH or LMWH" },
        ],
        defaultValue: "none",
        visibleWhen: (v) => v.onAnticoagulation,
      },
      { id: "recurrentUnprovokedVte", label: "Recurrent unprovoked VTE", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "recurrentDespiteAnticoagulation", label: "Recurrent VTE despite adequate anticoagulation", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "recurrentPregnancyLoss", label: "Recurrent pregnancy loss", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "hemolysis", label: "Evidence of hemolysis", type: "checkbox", visibleWhen: (v) => v.cbcAbnormalities || v.vteSite === "unusual" },
      { id: "leucopenia", label: "Leucopenia", type: "checkbox", visibleWhen: (v) => v.cbcAbnormalities || v.vteSite === "unusual" },
      { id: "recentHeparinExposure", label: "Recent heparin exposure within 5 to 10 days", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "plateletFallFiftyPercent", label: "Platelet count has fallen by more than 50 percent", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "confirmedThrombosis", label: "Confirmed thrombosis or high thrombosis risk", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "noAlternativeCause", label: "No alternative cause for thrombocytopenia", type: "checkbox", visibleWhen: (v) => v.managementWouldChange },
      { id: "managementWouldChange", label: "Testing would change management", type: "checkbox" },
    ],
    calculate: (values) => {
      const triggerCount = [
        values.concomitantArterialDisease,
        values.ageUnder50,
        values.strongFamilyHistory,
        values.cbcAbnormalities,
        values.autoimmuneDisease,
        values.vteSite === "unusual",
      ].filter(Boolean).length;

      const apsSuggested =
        values.recurrentUnprovokedVte ||
        values.recurrentDespiteAnticoagulation ||
        values.autoimmuneDisease ||
        values.recurrentPregnancyLoss;
      const mpnSuggested = values.cbcAbnormalities;
      const pnhSuggested =
        values.ageUnder50 && (values.vteSite === "unusual" || values.recurrentUnprovokedVte) &&
        (values.hemolysis || values.cbcAbnormalities || values.leucopenia);
      const hitSuggested =
        values.recentHeparinExposure &&
        values.plateletFallFiftyPercent &&
        values.confirmedThrombosis &&
        values.noAlternativeCause;

      const interruptionRows = [
        ["Warfarin", "Interrupt for at least 1 week before clot-based testing."],
        ["DOAC", "Interrupt for at least 2 days; use 4 days for dabigatran if CrCl is below 50 mL/min."],
        ["UFH or LMWH", "Interrupt for at least 24 hours before clot-based testing."],
      ];
      const patientSummaryRows = [
        ["Is this the patient's first VTE?", values.firstVte === "yes" ? "Yes" : "No"],
        ["Where is the VTE?", values.vteSite === "unusual" ? "Unusual site" : "Usual site"],
        ["Is the VTE provoked or unprovoked?", sentenceCase(values.provocation ?? "unprovoked")],
      ];

      if (!values.managementWouldChange) {
        return {
          tone: tone.success,
          headline: "Thrombophilia testing is not required for most patients",
          summary: "Only consider thrombophilia testing if the result will change management, counseling, family planning, or future pregnancy planning.",
          action: "Avoid ordering broad panels when the result would not change treatment decisions.",
          metrics: buildMetrics([
            { label: "Specialist triggers", value: `${triggerCount}` },
            { label: "On anticoagulation", value: values.onAnticoagulation ? "Yes" : "No" },
          ]),
          tables: [
            buildTable("Patient summary", ["Question", "Answer"], patientSummaryRows),
            buildTable("Tests that can be done during anticoagulation", ["Test", "Comment"], [
              ["Factor V Leiden mutation", "DNA-based test; anticoagulants do not interfere."],
              ["Prothrombin gene mutation", "DNA-based test; anticoagulants do not interfere."],
              ["JAK2 mutation", "Useful when MPN is suspected."],
              ["PNH flow cytometry", "Can be performed during anticoagulation."],
            ]),
            buildTable("Anticoagulant interruption rules", ["Anticoagulant", "Interruption"], interruptionRows),
          ],
          supporting: [
            "Consider testing if one or more of the following are present: concomitant arterial disease, age under 50 years, strong family history, CBC abnormalities, or autoimmune disease.",
            "Consider APS testing especially in arterial or recurrent events or recurrent pregnancy loss; if abnormal, repeat at 12 weeks and refer.",
            "Anticoagulants can interfere with many thrombophilia tests, so timing matters.",
          ],
        };
      }

      return {
        tone: tone.warning,
        headline: "Thrombophilia testing is not required for most patients",
        summary:
          triggerCount > 0
            ? "At least one specialist trigger is present. Consider thrombophilia testing with specialist input and focus on results that could alter management."
            : "The history is not strongly suggestive, so any testing should be tightly targeted to the clinical question.",
        action:
          values.onAnticoagulation && values.anticoagulantClass !== "none"
            ? `Pause clot-based testing until ${values.anticoagulantClass === "warfarin" ? "warfarin has been stopped for at least 1 week" : values.anticoagulantClass === "doac" ? "the DOAC has been stopped for at least 2 days" : "UFH or LMWH has been stopped for at least 24 hours"}.`
            : "Proceed only with tests that will change anticoagulant duration, counseling, pregnancy planning, or workup for an acquired thrombophilia.",
        metrics: buildMetrics([
          { label: "Specialist triggers", value: `${triggerCount}` },
          { label: "First VTE", value: values.firstVte === "yes" ? "Yes" : "No" },
          { label: "Site", value: values.vteSite === "unusual" ? "Unusual" : "Usual" },
          { label: "Provocation", value: sentenceCase(values.provocation) },
        ]),
        recommendations: [
          { label: "Testing stance", value: "Only consider thrombophilia testing if the results will change management." },
          { label: "APS testing", value: apsSuggested ? "Suggested" : "Not specifically triggered" },
          { label: "MPN testing", value: mpnSuggested ? "Suggested" : "Not specifically triggered" },
          { label: "PNH testing", value: pnhSuggested ? "Suggested" : "Not specifically triggered" },
          { label: "HIT testing", value: hitSuggested ? "Suggested" : "Not specifically triggered" },
        ],
        tables: [
          buildTable("Patient summary", ["Question", "Answer"], patientSummaryRows),
          buildTable("Tests that can be done during anticoagulation", ["Test", "Comment"], [
            ["Factor V Leiden mutation", "DNA-based test; anticoagulants do not interfere."],
            ["Prothrombin gene mutation", "DNA-based test; anticoagulants do not interfere."],
            ["JAK2 mutation", "Order when MPN is suspected from CBC or blood film findings."],
            ["PNH flow cytometry", "Can be performed during anticoagulation."],
          ]),
          buildTable("Anticoagulant interruption rules", ["Anticoagulant", "Interruption"], interruptionRows),
          buildTable("Condition-specific testing prompts", ["Condition", "When to think about testing"], [
            ["MPN", "Raised platelets, hematocrit, or white count; or blood film changes such as teardrop cells, nucleated red cells, or pancytopenia."],
            ["APS", "Recurrent unprovoked VTE, recurrent VTE despite anticoagulation, autoimmune disease, or recurrent pregnancy loss."],
            ["PNH", "Age under 50 with unusual or recurrent unprovoked thrombosis plus hemolysis, anemia, thrombocytopenia, or leucopenia."],
            ["HIT", "Recent heparin exposure, platelet fall greater than 50 percent, thrombosis, and no alternative cause for thrombocytopenia."],
          ]),
        ],
        supporting: [
          "Interpret clot-based assays only after the relevant anticoagulant interruption interval has been observed.",
          "Acquired thrombophilia pathways often matter more than inherited thrombophilia panels in atypical presentations.",
          values.firstVte === "no"
            ? "For recurrent VTE or PE management, follow the acute management algorithms as well as the testing pathway."
            : "This pathway is most useful when deciding whether a first VTE warrants further thrombophilia evaluation.",
        ],
      };
    },
  },
  {
    id: "vitt",
    title: "Diagnosing, Ruling Out and Managing VITT",
    shortTitle: "VITT",
    type: "algorithm",
    category: "algorithm",
    badge: "Acute care",
    blurb:
      "Rapidly classify possible vaccine-induced immune thrombotic thrombocytopenia and highlight immediate management priorities.",
    tags: ["VITT", "platelets", "PF4", "emergency"],
    notes: [
      "Use this only for suspected vaccine-induced immune thrombotic thrombocytopenia within the recognized post-vaccination window.",
      "The output emphasizes presumptive diagnosis, urgent hematology review, and non-heparin anticoagulation.",
    ],
    inputs: [
      { id: "daysSinceVaccination", label: "Days since vaccination", type: "number", min: 0, step: 1 },
      { id: "severeHeadache", label: "Persistent and severe headache", type: "checkbox" },
      { id: "focalNeurology", label: "Focal neurological symptoms, seizures, or blurred or double vision", type: "checkbox" },
      { id: "chestPainDyspnea", label: "Shortness of breath or chest pain", type: "checkbox" },
      { id: "abdominalPain", label: "Abdominal pain", type: "checkbox" },
      { id: "legPainSwelling", label: "Swelling and redness in a limb", type: "checkbox" },
      { id: "limbIschemia", label: "Pallor and coldness in a limb", type: "checkbox" },
      { id: "plateletCount", label: "Platelet count (x10^9/L)", type: "number", min: 1, step: 1 },
      { id: "dDimerMarked", label: "D-dimer markedly elevated", type: "checkbox" },
      { id: "fibrinogenLow", label: "Fibrinogen low or falling", type: "checkbox" },
      { id: "thrombosisConfirmed", label: "Imaging-confirmed arterial or venous thrombosis", type: "checkbox", visibleWhen: (v) => v.severeHeadache || v.focalNeurology || v.chestPainDyspnea || v.abdominalPain || v.legPainSwelling || v.limbIschemia },
      {
        id: "pf4Elisa",
        label: "Anti-PF4 ELISA result",
        type: "radio",
        options: [
          { value: "pending", label: "Pending / unavailable" },
          { value: "positive", label: "Positive" },
          { value: "negative", label: "Negative" },
        ],
        defaultValue: "pending",
        visibleWhen: (v) => (v.severeHeadache || v.focalNeurology || v.chestPainDyspnea || v.abdominalPain || v.legPainSwelling || v.limbIschemia) && (asNumber(v.plateletCount) !== null && asNumber(v.plateletCount) < 150),
      },
    ],
    calculate: (values) => {
      const days = asNumber(values.daysSinceVaccination);
      const platelets = asNumber(values.plateletCount);
      const symptomCount = [
        values.severeHeadache,
        values.focalNeurology,
        values.chestPainDyspnea,
        values.abdominalPain,
        values.legPainSwelling,
        values.limbIschemia,
      ].filter(Boolean).length;
      const inWindow = Number.isFinite(days) && days >= 4 && days <= 28;
      const thrombocytopenia = Number.isFinite(platelets) && platelets < 150;
      const probable =
        inWindow &&
        symptomCount > 0 &&
        thrombocytopenia &&
        (values.thrombosisConfirmed || values.dDimerMarked || values.fibrinogenLow);
      const definite = probable && values.pf4Elisa === "positive";

      if (symptomCount === 0) {
        return {
          tone: tone.success,
          headline: "No VITT work-up needed",
          summary: "No high-risk symptom cluster has been selected.",
          action: "Reassess promptly if severe headache, focal neurological symptoms, chest pain, dyspnea, abdominal pain, or limb ischemic symptoms develop after vaccination.",
          metrics: buildMetrics([{ label: "Symptoms selected", value: "0" }]),
        };
      }

      if (!inWindow) {
        return {
          tone: tone.success,
          headline: "VITT unlikely",
          summary: "The timing is outside the typical 4 to 28 day window after vaccination.",
          action: "Investigate alternative explanations for thrombosis, thrombocytopenia, or systemic symptoms.",
          metrics: buildMetrics([
            { label: "Timing", value: Number.isFinite(days) ? `${days} days` : "Not entered" },
            { label: "Symptoms selected", value: `${symptomCount}` },
          ]),
        };
      }

      if (!thrombocytopenia) {
        return {
          tone: tone.warning,
          headline: "VITT less likely",
          summary: "The symptom pattern is concerning, but thrombocytopenia below 150 x10^9/L has not yet been shown.",
          action: "Order CBC, D-dimer, fibrinogen, and targeted imaging based on symptoms. Repeat the CBC if symptoms continue to evolve.",
          metrics: buildMetrics([
            { label: "Timing", value: `${days} days` },
            { label: "Platelets", value: Number.isFinite(platelets) ? `${platelets}` : "Pending" },
          ]),
          tables: [
            buildTable("Urgent work-up", ["Investigation", "Purpose"], [
              ["CBC and platelet count", "Confirm whether thrombocytopenia is evolving."],
              ["D-dimer", "Marked elevation supports the diagnosis."],
              ["Fibrinogen", "Low or falling fibrinogen supports consumptive coagulopathy."],
              ["Targeted imaging", "Investigate cerebral, splanchnic, pulmonary, or limb thrombosis according to symptoms."],
              ["PF4 ELISA", "Preferred assay when VITT is suspected."],
            ]),
          ],
        };
      }

      return {
        tone: definite ? tone.danger : tone.warning,
        headline: definite ? "Presumptive or confirmed VITT" : probable ? "Presumptive diagnosis of VITT" : "Possible VITT: urgent work-up needed",
        summary: definite
          ? "Timing, thrombocytopenia, thrombosis, coagulation abnormalities, and PF4 positivity align strongly with VITT."
          : probable
            ? "Proceed to hematology for HIT-style PF4 testing and treat presumptive VITT without waiting for confirmatory results."
            : "There is enough concern to complete a VITT work-up urgently, but the syndrome is not yet fully established.",
        action:
          probable || definite
            ? "Avoid heparin, avoid platelet transfusion, start a direct oral anti-Xa inhibitor if safe, give IVIG 1 g/kg daily for at least 2 days, and involve hematology urgently."
            : "Order CBC, D-dimer, fibrinogen, PF4 ELISA, and symptom-directed imaging urgently.",
        metrics: buildMetrics([
          { label: "Timing", value: `${days} days` },
          { label: "Platelets", value: `${platelets}` },
          {
            label: "Supportive features",
            value: `${[values.thrombosisConfirmed, values.dDimerMarked, values.fibrinogenLow].filter(Boolean).length}/3`,
          },
        ]),
        recommendations: [
          { label: "PF4 ELISA", value: values.pf4Elisa === "positive" ? "Positive" : values.pf4Elisa === "negative" ? "Negative" : "Pending" },
          { label: "Heparin", value: probable || definite ? "Do not use heparin." : "Avoid heparin until VITT is reasonably excluded." },
          { label: "Platelet transfusion", value: "Do not give platelet transfusion unless bleeding is life-threatening." },
          { label: "First-line anticoagulants", value: "Direct oral anti-Xa inhibitors such as rivaroxaban, apixaban, or edoxaban." },
        ],
        tables: [
          buildTable("Urgent work-up", ["Investigation", "Purpose"], [
            ["CBC and platelet count", "Confirm thrombocytopenia."],
            ["D-dimer", "Marked elevation supports VITT."],
            ["Fibrinogen", "Low or falling fibrinogen supports consumptive coagulopathy."],
            ["Targeted imaging", "Look for cerebral, splanchnic, pulmonary, or limb thrombosis based on symptoms."],
            ["PF4 ELISA", "Preferred confirmatory assay; do not rely on rapid HIT tests."],
          ]),
          buildTable("Immediate treatment steps", ["Step", "Recommendation"], [
            ["Anticoagulation", "Use a non-heparin anticoagulant if bleeding risk allows; direct oral anti-Xa inhibitors are first line in this protocol."],
            ["Immune therapy", "Give IVIG 1 g/kg daily for at least 2 days, especially for severe or life-threatening thrombosis."],
            ["Transfusion", "Avoid platelet transfusion unless bleeding is life-threatening."],
            ["Specialist review", "Discuss urgently with hematology and the relevant acute specialty."],
          ]),
        ],
        supporting: [
          "Send PF4 ELISA testing before treatment if possible, but do not delay treatment while waiting for results.",
          "All suspected adverse events following immunization, including presumptive and confirmed VITT, should be reported through the provincial AEFI pathway.",
          "Pai M, Grill A, Ivers N, et al. Vaccine-induced prothrombotic immune thrombocytopenia VIPIT following AstraZeneca COVID-19 vaccination. Science Briefs of the Ontario COVID-19 Science Advisory Table. 2021;1(17).",
        ],
      };
    },
  },
  {
    id: "wells-pe",
    title: "Wells PE Score",
    shortTitle: "Wells PE",
    type: "calculator",
    category: "score",
    badge: "Score",
    blurb: "Estimate PE pre-test probability and decide whether D-dimer or imaging should come next.",
    tags: ["PE", "diagnosis", "D-dimer", "CTPA"],
    notes: ["Best used before imaging when PE is on the differential."],
    inputs: [
      { id: "dvtSigns", label: "Clinical signs of DVT", type: "checkbox" },
      { id: "peLikely", label: "PE is the most likely diagnosis or equally likely", type: "checkbox" },
      { id: "tachycardia", label: "Heart rate > 100 bpm", type: "checkbox" },
      { id: "immobilization", label: "Immobilization >= 3 days or surgery in previous 4 weeks", type: "checkbox" },
      { id: "previousVte", label: "Previous objectively diagnosed PE or DVT", type: "checkbox" },
      { id: "hemoptysis", label: "Hemoptysis", type: "checkbox" },
      { id: "malignancy", label: "Active malignancy or palliative cancer care", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.dvtSigns ? 3 : 0,
        values.peLikely ? 3 : 0,
        values.tachycardia ? 1.5 : 0,
        values.immobilization ? 1.5 : 0,
        values.previousVte ? 1.5 : 0,
        values.hemoptysis ? 1 : 0,
        values.malignancy ? 1 : 0,
      ]);

      const tier =
        score <= 1 ? "Low" : score <= 6 ? "Moderate" : "High";
      const likely = score > 4;

      return {
        tone: likely ? tone.warning : tone.success,
        headline: likely ? "PE likely" : "PE unlikely",
        summary: likely
          ? "Proceed to definitive imaging unless another pathway is clinically stronger."
          : "High-sensitivity D-dimer is the next step if no exclusion criteria apply.",
        action: likely ? "CTPA is usually indicated." : "A negative D-dimer can safely exclude PE in low-risk patients.",
        metrics: buildMetrics([
          { label: "Score", value: formatScore(score) },
          { label: "Two-tier result", value: likely ? "> 4" : "<= 4" },
          { label: "Three-tier risk", value: tier },
        ]),
        recommendations: likely
          ? [
              { label: "Imaging", value: "Proceed to CTPA. Consider empiric anticoagulation while awaiting imaging if high clinical suspicion." },
              { label: "If CTPA contraindicated", value: "Use V/Q scan or bilateral lower-extremity compression ultrasonography as an alternative." },
              { label: "Anticoagulation", value: "If PE is confirmed, initiate therapeutic anticoagulation promptly unless contraindicated." },
            ]
          : [
              { label: "D-dimer", value: "Use age-adjusted D-dimer (age \u00d7 10 \u00b5g/L for patients \u226550). If negative, PE can be safely excluded." },
              { label: "If D-dimer positive", value: "Proceed to CTPA even though clinical probability is low." },
              { label: "PERC rule", value: "If pre-test probability is very low (\u226415%), consider applying the PERC rule before ordering D-dimer." },
            ],
        supporting: [
          "Wells PS, Anderson DR, Rodger M, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging. Ann Intern Med. 2001;135(2):98-107.",
          "Age-adjusted D-dimer cutoff improves specificity in older patients without reducing sensitivity.",
          "The two-tier model (score >4 = PE likely) is recommended by current Thrombosis Canada guidelines.",
        ],
      };
    },
  },
  {
    id: "wells-dvt",
    title: "Wells DVT Score",
    shortTitle: "Wells DVT",
    type: "calculator",
    category: "score",
    badge: "Score",
    blurb: "Estimate DVT probability and guide whether D-dimer or compression ultrasound should come first.",
    tags: ["DVT", "ultrasound", "D-dimer"],
    notes: ["Use alongside focused examination and alternative diagnoses."],
    inputs: [
      { id: "activeCancer", label: "Active cancer", type: "checkbox" },
      { id: "bedridden", label: "Bedridden > 3 days or major surgery within 4 weeks", type: "checkbox" },
      { id: "calfSwelling", label: "Calf swelling > 3 cm vs the other leg", type: "checkbox" },
      { id: "collateralVeins", label: "Collateral superficial veins", type: "checkbox" },
      { id: "entireLegSwollen", label: "Entire leg swollen", type: "checkbox" },
      { id: "tenderness", label: "Localized tenderness along the deep venous system", type: "checkbox" },
      { id: "pittingEdema", label: "Pitting edema greater in symptomatic leg", type: "checkbox" },
      { id: "immobilizedLeg", label: "Paralysis, paresis, or recent plaster immobilization", type: "checkbox" },
      { id: "priorDvt", label: "Previously documented DVT", type: "checkbox" },
      { id: "alternativeDiagnosis", label: "Alternative diagnosis as likely or more likely", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.activeCancer ? 1 : 0,
        values.bedridden ? 1 : 0,
        values.calfSwelling ? 1 : 0,
        values.collateralVeins ? 1 : 0,
        values.entireLegSwollen ? 1 : 0,
        values.tenderness ? 1 : 0,
        values.pittingEdema ? 1 : 0,
        values.immobilizedLeg ? 1 : 0,
        values.priorDvt ? 1 : 0,
        values.alternativeDiagnosis ? -2 : 0,
      ]);

      const tier =
        score <= 0 ? "Low" : score <= 2 ? "Moderate" : "High";
      const likely = score >= 2;

      return {
        tone: likely ? tone.warning : tone.success,
        headline: likely ? "DVT likely" : "DVT unlikely",
        summary: likely
          ? "Compression ultrasonography is the preferred next test."
          : "A high-sensitivity D-dimer can safely exclude DVT when negative.",
        action: likely
          ? "If ultrasound is negative but suspicion remains, repeat imaging or combine with D-dimer."
          : "Escalate to imaging if D-dimer is positive.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Two-tier result", value: likely ? "Likely" : "Unlikely" },
          { label: "Three-tier risk", value: tier },
        ]),
        recommendations: likely
          ? [
              { label: "Ultrasound", value: "Proceed to compression ultrasonography. If negative and suspicion remains, repeat in 5\u20137 days." },
              { label: "D-dimer", value: "A negative D-dimer combined with a negative initial ultrasound can safely exclude DVT." },
              { label: "Treatment", value: "If DVT is confirmed, initiate therapeutic anticoagulation. DOAC is preferred for most patients without cancer." },
            ]
          : [
              { label: "D-dimer", value: "Check D-dimer. If negative, DVT can be safely excluded without ultrasound." },
              { label: "If D-dimer positive", value: "Proceed to compression ultrasonography." },
              { label: "Alternative diagnosis", value: "Actively consider and investigate other causes of leg swelling." },
            ],
        supporting: [
          "Wells PS, Anderson DR, Bormanis J, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997;350(9094):1795-8.",
          "A score of 2 or more defines DVT as likely in the two-tier model endorsed by current guidelines.",
          "Age-adjusted D-dimer (age \u00d7 10 \u00b5g/L for patients \u226550) may improve specificity in older patients.",
        ],
      };
    },
  },
  {
    id: "chads2",
    title: "CHADS2 Stroke Score",
    shortTitle: "CHADS2",
    type: "calculator",
    category: "score",
    badge: "Score",
    blurb: "Estimates stroke risk in patients with atrial fibrillation by the CHADS2 criteria.",
    tags: ["AF", "stroke prevention"],
    notes: ["Use this for classic CHADS2-based risk stratification in atrial fibrillation."],
    inputs: [
      { id: "congestiveHeardFailure", label: "Congestive Heart Failure history?", type: "checkbox" },
      { id: "hypertension", label: "Hypertension history?", type: "checkbox" },
      { id: "ageOver75", label: "Age ≥ 75?", type: "checkbox" },
      { id: "diabetese", label: "Diabetes Mellitus history?", type: "checkbox" },
      { id: "strokeOrTIA", label: "Previous stroke or TIA?", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.congestiveHeardFailure ? 1 : 0,
        values.hypertension ? 1 : 0,
        values.ageOver75 ? 1 : 0,
        values.diabetese ? 1 : 0,
        values.strokeOrTIA ? 2 : 0,
      ]);

      const scoreTextMap = {
        0: "Low risk of thromboembolic event. 1.9% risk of event per year if no anticoagulation.",
        1: "Intermediate risk of thromboembolic event. 2.8% risk of event per year if no anticoagulation.",
        2: "Intermediate risk of thromboembolic event. 4.0% risk of event per year if no anticoagulation.",
        3: "High risk of thromboembolic event. 5.9% risk of event per year if no anticoagulation.",
        4: "High risk of thromboembolic event. 8.5% risk of event per year if no anticoagulation.",
        5: "High risk of thromboembolic event. 12.5% risk of event per year if no anticoagulation.",
        6: "High risk of thromboembolic event. 18.2% risk of event per year if no anticoagulation.",
      };

      return {
        tone: score >= 3 ? tone.danger : score >= 1 ? tone.warning : tone.success,
        headline: `Score ${score}`,
        summary: scoreTextMap[score] ?? "Risk description not available.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Annual thromboembolic risk", value: scoreTextMap[score]?.match(/([0-9.]+%)/)?.[1] ?? "Not available" },
        ]),
        recommendations: score >= 2
          ? [
              { label: "Anticoagulation", value: "Oral anticoagulation is recommended. A DOAC is generally preferred over warfarin unless a warfarin-only indication exists." },
              { label: "Aspirin", value: "Aspirin alone is insufficient for stroke prevention in AF when the CHADS2 score is 2 or higher." },
              { label: "Footnote", value: "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken." },
            ]
          : score === 1
            ? [
                { label: "Anticoagulation", value: "Consider oral anticoagulation. A shared decision should account for bleeding risk, patient preference, and modifiable risk factors." },
                { label: "Footnote", value: "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken." },
              ]
            : [
                { label: "Anticoagulation", value: "Anticoagulation is generally not needed at this score. Reassess annually or if new risk factors develop." },
                { label: "Footnote", value: "The adjusted stroke rate was the expected stroke rate per 100 person-years derived from the multivariable model assuming that aspirin was not taken." },
              ],
        supporting: [
          "Gage BF, Waterman AD, Shannon W, et al. Validation of clinical classification schemes for predicting stroke. JAMA. 2001;285(22):2864-2870.",
          "CHA2DS2-VASc score may be relatively insensitive or unspecific to predict risk of stroke.",
          "If age is the only risk factor, there is a graded increase in stroke risk from age 65 to 75.",
          "Females may not have a higher risk of stroke, independent of risk factors.",
          "The risk stratification does not incorporate the severity of the risk factors, such as poorly controlled versus well controlled hypertension.",
        ],
      };
    },
  },
  {
    id: "cha2ds2-vasc",
    title: "CHA2DS2-VASc Stroke Score",
    shortTitle: "CHA2DS2-VASc",
    type: "calculator",
    category: "score",
    badge: "Score",
    blurb: "Calculates stroke risk for patients with atrial fibrillation, possibly better than the CHADS2 score.",
    tags: ["AF", "stroke prevention", "DOAC"],
    notes: ["Use the score together with clinical judgement rather than as a single treatment trigger."],
    inputs: [
      {
        id: "chads2vascAge",
        label: "Age",
        type: "radio",
        options: [
          { value: "under_65", label: "< 65" },
          { value: "65_74", label: "65-74" },
          { value: "75_plus", label: "≥ 75" },
        ],
        defaultValue: "under_65",
      },
      { id: "chads2vascHeart", label: "Congestive Heart Failure History", type: "checkbox" },
      { id: "chads2vascHyper", label: "Hypertension History", type: "checkbox" },
      { id: "chads2vascStroke", label: "Stroke/TIA/Thromboembolism History", type: "checkbox" },
      { id: "chads2vascVascHist", label: "Vascular Disease History? — previous MI, peripheral arterial disease or aortic plaque", type: "checkbox" },
      { id: "chads2vascDiabetes", label: "Diabetes Mellitus", type: "checkbox" },
      { id: "chads2vascFemale", label: "Female Patient", type: "checkbox" },
    ],
    calculate: (values) => {
      const agePoints =
        values.chads2vascAge === "75_plus" ? 2 : values.chads2vascAge === "65_74" ? 1 : 0;
      const score = sum([
        values.chads2vascHeart ? 1 : 0,
        values.chads2vascHyper ? 1 : 0,
        values.chads2vascStroke ? 2 : 0,
        values.chads2vascVascHist ? 1 : 0,
        values.chads2vascDiabetes ? 1 : 0,
        values.chads2vascFemale ? 1 : 0,
        agePoints,
      ]);

      const interpretation =
        score === 0 && !values.chads2vascFemale
          ? "Very low risk — anticoagulation generally not recommended."
          : score === 1 && values.chads2vascFemale && values.chads2vascAge === "under_65" &&
              !values.chads2vascHeart &&
              !values.chads2vascHyper &&
              !values.chads2vascStroke &&
              !values.chads2vascVascHist &&
              !values.chads2vascDiabetes
            ? "Low risk."
            : score === 1
              ? "Low to intermediate stroke risk."
              : score >= 2
                ? "Stroke prevention with anticoagulation is usually recommended."
                : "Risk interpretation requires clinical judgement.";

      return {
        tone: score >= 2 ? tone.warning : tone.success,
        headline: `Score ${score}`,
        summary: interpretation,
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          {
            label: "Age band",
            value:
              values.chads2vascAge === "75_plus"
                ? "≥ 75"
                : values.chads2vascAge === "65_74"
                  ? "65-74"
                  : "< 65",
          },
        ]),
        recommendations: score >= 2
          ? [
              { label: "Anticoagulation", value: "Oral anticoagulation is recommended. DOAC is preferred over warfarin in non-valvular AF." },
              { label: "DOAC preference", value: "Apixaban, dabigatran, edoxaban, or rivaroxaban are all reasonable first-line choices. Selection depends on renal function, drug interactions, and patient preference." },
              { label: "Bleeding risk", value: "Assess HAS-BLED to identify and correct modifiable bleeding risk factors. A high HAS-BLED score does not contraindicate anticoagulation." },
              { label: "Limitations", value: "Use this score with caution because it may be relatively insensitive or unspecific to predict stroke risk." },
            ]
          : score === 1
            ? [
                { label: "Anticoagulation", value: "Consider anticoagulation via shared decision-making. Balance stroke prevention benefit against bleeding risk and patient values." },
                { label: "DOAC preference", value: "If anticoagulation is chosen, a DOAC is generally preferred over warfarin." },
                { label: "Limitations", value: "Use this score with caution because it may be relatively insensitive or unspecific to predict stroke risk." },
              ]
            : [
                { label: "Anticoagulation", value: "No anticoagulation is routinely recommended. Reassess annually or when new risk factors develop." },
                { label: "Limitations", value: "Use this score with caution because it may be relatively insensitive or unspecific to predict stroke risk." },
              ],
        supporting: [
          "Lip GY, Nieuwlaat R, Pisters R, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation. Chest. 2010;137(2):263-272.",
          "If age is the only risk factor, there is a graded increase in stroke risk from age 65 to 75.",
          "Females may not have a higher risk of stroke, independent of risk factors.",
          "The risk stratification does not incorporate the severity of the risk factors, such as poorly controlled versus well controlled hypertension.",
        ],
      };
    },
  },
  {
    id: "has-bled",
    title: "HAS-BLED Bleeding Score",
    shortTitle: "HAS-BLED",
    type: "calculator",
    category: "score",
    badge: "Score",
    blurb: "Screen for bleeding risk factors that should be corrected or monitored before and during anticoagulation.",
    tags: ["bleeding", "AF", "risk review"],
    notes: ["A high HAS-BLED score should prompt action, not automatic denial of anticoagulation."],
    inputs: [
      { id: "hypertension", label: "Uncontrolled hypertension (systolic > 160)", type: "checkbox" },
      { id: "renal", label: "Abnormal renal function", type: "checkbox" },
      { id: "liver", label: "Abnormal liver function", type: "checkbox" },
      { id: "stroke", label: "Stroke history", type: "checkbox" },
      { id: "bleeding", label: "Prior major bleeding or predisposition", type: "checkbox" },
      { id: "labileInr", label: "Labile INR / TTR < 60%", type: "checkbox" },
      { id: "elderly", label: "Age >= 65", type: "checkbox" },
      { id: "drugs", label: "Drugs predisposing to bleeding", type: "checkbox" },
      { id: "alcohol", label: "Excess alcohol use", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.hypertension ? 1 : 0,
        values.renal ? 1 : 0,
        values.liver ? 1 : 0,
        values.stroke ? 1 : 0,
        values.bleeding ? 1 : 0,
        values.labileInr ? 1 : 0,
        values.elderly ? 1 : 0,
        values.drugs ? 1 : 0,
        values.alcohol ? 1 : 0,
      ]);

      const risk =
        score <= 1 ? "Low" : score === 2 ? "Moderate" : score === 3 ? "High" : "Very high";

      return {
        tone: score >= 3 ? tone.warning : tone.success,
        headline: score >= 3 ? "High bleeding risk - review modifiable factors" : "Bleeding risk acceptable for routine review",
        summary: `HAS-BLED ${score} corresponds to a ${risk.toLowerCase()} bleeding risk profile.`,
        action:
          "Correct blood pressure, unnecessary antiplatelet/NSAID use, alcohol excess, and warfarin instability before changing the stroke prevention plan.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Risk tier", value: risk },
        ]),
        recommendations: score >= 3
          ? [
              { label: "Key message", value: "HAS-BLED \u22653 indicates high bleeding risk \u2014 does NOT contraindicate anticoagulation but flags need for modifiable risk factor correction." },
              { label: "Blood pressure", value: "Target systolic BP below 160 mmHg with optimized antihypertensive therapy." },
              { label: "Medications", value: "Discontinue unnecessary antiplatelet agents and NSAIDs where possible." },
              { label: "Alcohol", value: "Address excess alcohol intake with counseling or referral." },
              { label: "INR control", value: "If on warfarin, target TTR above 65\u201370%. Consider switching to a DOAC if INR is persistently labile." },
              { label: "Review interval", value: "Reassess bleeding risk factors at each clinic visit." },
            ]
          : [
              { label: "Key message", value: "Bleeding risk is acceptable. Continue anticoagulation with standard monitoring." },
              { label: "Review", value: "Reassess HAS-BLED periodically as risk factors may change over time." },
            ],
        supporting: [
          "Pisters R, Lane DA, Nieuwlaat R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation. Chest. 2010;138(5):1093-1100.",
          "Modifiable risk factors: uncontrolled hypertension, labile INR, concomitant antiplatelet or NSAID use, and excess alcohol.",
          "A high HAS-BLED score should trigger risk factor correction, not automatic withholding of anticoagulation.",
        ],
      };
    },
  },
  {
    id: "perc",
    title: "PERC Rule",
    shortTitle: "PERC",
    type: "calculator",
    category: "score",
    badge: "Rule-out",
    blurb: "Rule out PE without D-dimer only when all criteria are satisfied and pre-test probability is very low.",
    tags: ["PE", "rule out", "ED"],
    notes: ["Apply only when gestalt pre-test probability is low, not when PE is already moderate or high on clinical grounds."],
    inputs: [
      { id: "lowPretest", label: "Clinical pre-test probability <= 15%", type: "checkbox" },
      { id: "age", label: "Age < 50 years", type: "checkbox" },
      { id: "heartRate", label: "Heart rate < 100 bpm", type: "checkbox" },
      { id: "oxygen", label: "Room-air oxygen saturation > 94%", type: "checkbox" },
      { id: "noPriorVte", label: "No prior DVT or PE", type: "checkbox" },
      { id: "noTrauma", label: "No recent trauma or surgery within 4 weeks", type: "checkbox" },
      { id: "noHemoptysis", label: "No hemoptysis", type: "checkbox" },
      { id: "noEstrogen", label: "No exogenous estrogen use", type: "checkbox" },
      { id: "noDvtSigns", label: "No clinical signs of DVT", type: "checkbox" },
    ],
    calculate: (values) => {
      const criteriaMet = [
        values.age,
        values.heartRate,
        values.oxygen,
        values.noPriorVte,
        values.noTrauma,
        values.noHemoptysis,
        values.noEstrogen,
        values.noDvtSigns,
      ].filter(Boolean).length;

      const allMet = criteriaMet === 8;

      return {
        tone: allMet && values.lowPretest ? tone.success : tone.warning,
        headline:
          allMet && values.lowPretest
            ? "PE can be ruled out clinically"
            : "PERC cannot exclude PE here",
        summary:
          allMet && values.lowPretest
            ? "No D-dimer is required when gestalt pre-test probability is low and every PERC criterion is satisfied."
            : "Move to D-dimer or imaging based on Wells score and clinical context.",
        action:
          values.lowPretest
            ? "If any single PERC criterion fails, continue the standard PE workup."
            : "Do not use PERC outside a clearly low-risk pre-test setting.",
        metrics: buildMetrics([
          { label: "Criteria met", value: `${criteriaMet}/8` },
          { label: "Low pre-test", value: values.lowPretest ? "Yes" : "No" },
        ]),
        recommendations: allMet && values.lowPretest
          ? [
              { label: "Conclusion", value: "PE can be safely excluded without further testing in low pre-test probability patients." },
              { label: "Follow-up", value: "No D-dimer or imaging is needed. Reassess if symptoms change or worsen." },
            ]
          : [
              { label: "Conclusion", value: "PERC rule cannot exclude PE. Proceed with D-dimer or clinical probability assessment." },
              { label: "Next step", value: "Use the Wells PE score to determine whether D-dimer or CTPA is the appropriate next investigation." },
              { label: "Caution", value: "PERC should only be applied when gestalt pre-test probability is truly low (\u226415%)." },
            ],
        supporting: [
          "Kline JA, Mitchell AM, Kabrhel C, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.",
          "PERC is a rule-out tool only; it should never be used to rule in PE.",
          "The miss rate when all 8 PERC criteria are met in a low pre-test probability population is below 2%.",
        ],
      };
    },
  },
  {
    id: "pesi",
    title: "PESI",
    shortTitle: "PESI",
    type: "calculator",
    category: "score",
    badge: "Severity",
    blurb: "Stratify 30-day PE mortality and support outpatient versus inpatient management planning.",
    tags: ["PE", "risk stratification", "outpatient"],
    notes: ["Risk class is only one part of discharge suitability."],
    inputs: [
      { id: "age", label: "Age", type: "number", min: 18, step: 1 },
      { id: "male", label: "Male sex", type: "checkbox" },
      { id: "cancer", label: "Cancer", type: "checkbox" },
      { id: "heartFailure", label: "Heart failure", type: "checkbox" },
      { id: "chronicLungDisease", label: "Chronic lung disease", type: "checkbox" },
      { id: "tachycardia", label: "Heart rate >= 110 bpm", type: "checkbox" },
      { id: "lowBp", label: "Systolic BP < 100 mmHg", type: "checkbox" },
      { id: "highRespRate", label: "Respiratory rate >= 30/min", type: "checkbox" },
      { id: "lowTemp", label: "Temperature < 36 C", type: "checkbox" },
      { id: "alteredMentalState", label: "Altered mental status", type: "checkbox" },
      { id: "lowSpo2", label: "SpO2 < 90% on room air", type: "checkbox" },
    ],
    calculate: (values) => {
      const age = asNumber(values.age) ?? 0;
      const score = sum([
        age,
        values.male ? 10 : 0,
        values.cancer ? 30 : 0,
        values.heartFailure ? 10 : 0,
        values.chronicLungDisease ? 10 : 0,
        values.tachycardia ? 20 : 0,
        values.lowBp ? 30 : 0,
        values.highRespRate ? 20 : 0,
        values.lowTemp ? 20 : 0,
        values.alteredMentalState ? 60 : 0,
        values.lowSpo2 ? 20 : 0,
      ]);

      let riskClass = "I";
      let mortality = "0 to 1.6%";
      let toneValue = tone.success;

      if (score > 125) {
        riskClass = "V";
        mortality = "10.0 to 24.5%";
        toneValue = tone.danger;
      } else if (score > 105) {
        riskClass = "IV";
        mortality = "4.0 to 11.4%";
        toneValue = tone.warning;
      } else if (score > 85) {
        riskClass = "III";
        mortality = "3.2 to 7.1%";
        toneValue = tone.warning;
      } else if (score > 65) {
        riskClass = "II";
        mortality = "1.7 to 3.5%";
      }

      return {
        tone: toneValue,
        headline:
          riskClass === "I" || riskClass === "II"
            ? "Low-risk PE phenotype"
            : riskClass === "III"
              ? "Intermediate-risk PE phenotype"
              : "High-risk PE phenotype",
        summary: `PESI class ${riskClass} with estimated 30-day mortality ${mortality}.`,
        action:
          riskClass === "I" || riskClass === "II"
            ? "Assess discharge suitability, home support, and follow-up access."
            : riskClass === "III"
              ? "Admit for monitoring and consider RV assessment."
              : "Escalate monitoring and review for reperfusion strategy if unstable.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Class", value: riskClass },
          { label: "30-day mortality", value: mortality },
        ]),
        recommendations:
          riskClass === "I" || riskClass === "II"
            ? [
                { label: "Disposition", value: "Consider early discharge or outpatient management if social circumstances, follow-up access, and clinical trajectory are favorable." },
                { label: "Treatment", value: "Initiate DOAC therapy. Apixaban or rivaroxaban single-drug regimens are preferred for most patients." },
                { label: "Follow-up", value: "Arrange clinical review within 1 to 2 weeks to reassess symptoms and anticoagulation plan." },
              ]
            : riskClass === "III"
              ? [
                  { label: "Admission", value: "Admit for observation and hemodynamic monitoring." },
                  { label: "RV assessment", value: "Obtain echocardiography or CT-derived RV/LV ratio and troponin to further stratify risk." },
                  { label: "Treatment", value: "Initiate anticoagulation. Monitor for hemodynamic deterioration that may warrant escalation." },
                ]
              : [
                  { label: "Admission", value: "Admit to a monitored or intensive care setting." },
                  { label: "Reperfusion", value: "Consider systemic thrombolysis or catheter-directed therapy if hemodynamically unstable or deteriorating." },
                  { label: "Hemodynamic support", value: "Use vasopressors and IV fluids cautiously. Avoid excessive volume loading in RV failure." },
                ],
        supporting: [
          "Aujesky D, Obrosky DS, Stone RA, et al. Derivation and validation of a prognostic model for pulmonary embolism. Am J Respir Crit Care Med. 2005;172(8):1041-1046.",
          "PESI class I\u2013II patients have a 30-day mortality below 3.5% and may be candidates for outpatient management.",
          "Intermediate-risk patients (class III) benefit from further risk stratification with troponin and RV imaging.",
        ],
      };
    },
  },
  {
    id: "spesi",
    title: "Simplified PESI",
    shortTitle: "sPESI",
    type: "calculator",
    category: "score",
    badge: "Severity",
    blurb: "Fast binary PE risk tool for early discharge and escalation decisions.",
    tags: ["PE", "risk stratification", "short form"],
    notes: ["Pairs well with troponin and RV assessment in borderline cases."],
    inputs: [
      { id: "age80", label: "Age > 80 years", type: "checkbox" },
      { id: "cancer", label: "History of cancer", type: "checkbox" },
      { id: "cardiopulmonary", label: "Chronic cardiopulmonary disease", type: "checkbox" },
      { id: "tachycardia", label: "Heart rate >= 110 bpm", type: "checkbox" },
      { id: "lowBp", label: "Systolic BP <= 100 mmHg", type: "checkbox" },
      { id: "lowSpo2", label: "SpO2 < 90% on room air", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.age80 ? 1 : 0,
        values.cancer ? 1 : 0,
        values.cardiopulmonary ? 1 : 0,
        values.tachycardia ? 1 : 0,
        values.lowBp ? 1 : 0,
        values.lowSpo2 ? 1 : 0,
      ]);

      return {
        tone: score === 0 ? tone.success : tone.warning,
        headline: score === 0 ? "Low-risk PE by sPESI" : "High-risk PE by sPESI",
        summary:
          score === 0
            ? "Estimated 30-day mortality is about 1.0%."
            : "Estimated 30-day mortality rises to roughly 10.9%.",
        action:
          score === 0
            ? "If social and clinical factors align, outpatient or early discharge may be reasonable."
            : "Admit and refine risk with troponin, BNP, and RV assessment.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Risk", value: score === 0 ? "Low" : "High" },
        ]),
        recommendations: score === 0
          ? [
              { label: "Disposition", value: "Consider outpatient management or early discharge if adequate follow-up and social support are available." },
              { label: "Anticoagulation", value: "Start DOAC therapy. Single-drug approach with apixaban or rivaroxaban is preferred." },
            ]
          : [
              { label: "Admission", value: "Inpatient monitoring is recommended. Further stratify with troponin, BNP, and echocardiography." },
              { label: "Escalation", value: "If hemodynamically unstable, consider reperfusion therapy and ICU transfer." },
            ],
        supporting: [
          "Jimenez D, Aujesky D, Moores L, et al. Simplification of the pulmonary embolism severity index for prognostication in patients with acute symptomatic pulmonary embolism. Arch Intern Med. 2010;170(15):1383-1389.",
          "sPESI score of 0 identifies patients with 30-day mortality of approximately 1%.",
        ],
      };
    },
  },
  {
    id: "timi-ua",
    title: "TIMI UA/NSTEMI",
    shortTitle: "TIMI UA",
    type: "calculator",
    category: "score",
    badge: "ACS",
    blurb: "Estimate 14-day ischemic event risk in unstable angina and NSTEMI.",
    tags: ["ACS", "NSTEMI", "coronary"],
    notes: ["Supports early invasive versus conservative strategy conversations."],
    inputs: [
      { id: "age65", label: "Age >= 65 years", type: "checkbox" },
      { id: "riskFactors", label: "Three or more CAD risk factors", type: "checkbox" },
      { id: "knownCad", label: "Known coronary stenosis >= 50%", type: "checkbox" },
      { id: "asaUse", label: "Aspirin use in the past 7 days", type: "checkbox" },
      { id: "severeAngina", label: "Two or more angina episodes in 24 hours", type: "checkbox" },
      { id: "stDeviation", label: "ST change >= 0.5 mm", type: "checkbox" },
      { id: "positiveMarker", label: "Positive cardiac biomarker", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.age65 ? 1 : 0,
        values.riskFactors ? 1 : 0,
        values.knownCad ? 1 : 0,
        values.asaUse ? 1 : 0,
        values.severeAngina ? 1 : 0,
        values.stDeviation ? 1 : 0,
        values.positiveMarker ? 1 : 0,
      ]);

      const riskMap = {
        0: "4.7%",
        1: "4.7%",
        2: "8.3%",
        3: "13.2%",
        4: "19.9%",
        5: "26.2%",
        6: "40.9%",
        7: "40.9%",
      };

      return {
        tone: score >= 5 ? tone.danger : score >= 3 ? tone.warning : tone.success,
        headline:
          score >= 5 ? "High ACS event risk" : score >= 3 ? "Moderate ACS event risk" : "Lower ACS event risk",
        summary: `Estimated 14-day event risk: ${riskMap[score]}.`,
        action:
          score >= 5
            ? "Early invasive management is usually appropriate."
            : score >= 3
              ? "Consider angiography within 24 to 72 hours."
              : "Conservative management and stress testing may be reasonable if stable.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "14-day risk", value: riskMap[score] },
        ]),
        recommendations: score >= 5
          ? [
              { label: "Strategy", value: "Early invasive strategy with coronary angiography is recommended, ideally within 24 hours." },
              { label: "Antithrombotic", value: "Dual antiplatelet therapy plus anticoagulation per local ACS protocol." },
            ]
          : score >= 3
            ? [
                { label: "Strategy", value: "Consider invasive strategy within 24 to 72 hours based on clinical trajectory." },
                { label: "Monitoring", value: "Telemetry monitoring with serial troponin and ECG assessment." },
              ]
            : [
                { label: "Strategy", value: "Conservative management with stress testing may be appropriate if stable." },
                { label: "Disposition", value: "If stress test is negative and patient is low risk, early discharge may be considered." },
              ],
        supporting: [
          "Antman EM, Cohen M, Bernink PJ, et al. The TIMI risk score for unstable angina/non-ST elevation MI. JAMA. 2000;284(7):835-842.",
          "Higher scores predict greater benefit from early invasive strategy and intensive antithrombotic therapy.",
        ],
      };
    },
  },
  {
    id: "timi-stemi",
    title: "TIMI STEMI",
    shortTitle: "TIMI STEMI",
    type: "calculator",
    category: "score",
    badge: "ACS",
    blurb: "Estimate 30-day mortality in ST-elevation myocardial infarction.",
    tags: ["STEMI", "mortality", "critical care"],
    notes: ["Supports level-of-care planning after reperfusion has been initiated."],
    inputs: [
      {
        id: "ageGroup",
        label: "Age group",
        type: "radio",
        options: [
          { value: "under65", label: "Under 65" },
          { value: "65to74", label: "65 to 74" },
          { value: "75plus", label: "75 or older" },
        ],
        defaultValue: "under65",
      },
      { id: "dmHtnAngina", label: "Diabetes, hypertension, or prior angina", type: "checkbox" },
      { id: "lowBp", label: "Systolic BP < 100 mmHg", type: "checkbox" },
      { id: "highHr", label: "Heart rate > 100 bpm", type: "checkbox" },
      { id: "killip", label: "Killip class II to IV", type: "checkbox" },
      { id: "lowWeight", label: "Weight < 67 kg", type: "checkbox" },
      { id: "anteriorMi", label: "Anterior ST elevation or LBBB", type: "checkbox" },
      { id: "lateTreatment", label: "Time to treatment > 4 hours", type: "checkbox" },
    ],
    calculate: (values) => {
      const agePoints =
        values.ageGroup === "75plus" ? 3 : values.ageGroup === "65to74" ? 2 : 0;
      const score = sum([
        agePoints,
        values.dmHtnAngina ? 1 : 0,
        values.lowBp ? 3 : 0,
        values.highHr ? 2 : 0,
        values.killip ? 2 : 0,
        values.lowWeight ? 1 : 0,
        values.anteriorMi ? 1 : 0,
        values.lateTreatment ? 1 : 0,
      ]);

      const riskMap = {
        0: "0.8%",
        1: "1.6%",
        2: "2.2%",
        3: "4.4%",
        4: "7.3%",
        5: "12.4%",
        6: "16.1%",
        7: "23.4%",
        8: "26.8%",
      };
      const mortality = score > 8 ? "35.9%" : riskMap[score];

      return {
        tone: score >= 6 ? tone.danger : score >= 4 ? tone.warning : tone.success,
        headline:
          score >= 6 ? "High 30-day STEMI mortality risk" : score >= 4 ? "Moderate STEMI mortality risk" : "Lower STEMI mortality risk",
        summary: `Estimated 30-day mortality: ${mortality}.`,
        action:
          score >= 6
            ? "Use ICU-level monitoring and consider mechanical support if shock develops."
            : score >= 4
              ? "Close hemodynamic monitoring is warranted."
              : "Standard post-reperfusion monitoring is reasonable if otherwise stable.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "30-day mortality", value: mortality },
        ]),
        recommendations: score >= 6
          ? [
              { label: "Level of care", value: "ICU admission with continuous hemodynamic monitoring." },
              { label: "Mechanical support", value: "Consider intra-aortic balloon pump or percutaneous ventricular assist device if cardiogenic shock develops." },
              { label: "Reperfusion", value: "Ensure primary PCI has been performed or is being urgently arranged." },
            ]
          : score >= 4
            ? [
                { label: "Monitoring", value: "Continuous telemetry and close hemodynamic surveillance." },
                { label: "Reperfusion", value: "Confirm timely reperfusion has been achieved." },
              ]
            : [
                { label: "Monitoring", value: "Standard post-reperfusion care with telemetry." },
                { label: "Recovery", value: "Early mobilization and secondary prevention planning are appropriate." },
              ],
        supporting: [
          "Morrow DA, Antman EM, Charlesworth A, et al. TIMI risk score for ST-elevation myocardial infarction. Circulation. 2000;102(17):2031-2037.",
          "The score was originally validated in patients receiving fibrinolytic therapy.",
        ],
      };
    },
  },
  {
    id: "vte-bleed",
    title: "VTE-BLEED Score",
    shortTitle: "VTE-BLEED",
    type: "calculator",
    category: "score",
    badge: "Bleeding",
    blurb: "Predict major bleeding risk during stable anticoagulation for VTE. Guides decision on extended vs. time-limited therapy.",
    tags: ["VTE", "bleeding", "anticoagulation", "duration"],
    notes: [
      "Validated for the chronic phase of anticoagulation (after day 30), not for the acute treatment period.",
      "Use alongside recurrence risk assessment to determine optimal treatment duration.",
    ],
    inputs: [
      { id: "activeCancer", label: "Active cancer", type: "checkbox" },
      { id: "maleSex", label: "Male sex with uncontrolled arterial hypertension", type: "checkbox" },
      { id: "anemia", label: "Anemia (Hb < 130 g/L men, < 120 g/L women)", type: "checkbox" },
      { id: "bleedingHistory", label: "History of bleeding", type: "checkbox" },
      { id: "ageOver60", label: "Age ≥ 60 years", type: "checkbox" },
      { id: "renalImpairment", label: "Renal impairment (eGFR 30–60 mL/min/1.73m²)", type: "checkbox" },
    ],
    calculate: (values) => {
      const score = sum([
        values.activeCancer ? 2 : 0,
        values.maleSex ? 1 : 0,
        values.anemia ? 1.5 : 0,
        values.bleedingHistory ? 1.5 : 0,
        values.ageOver60 ? 1.5 : 0,
        values.renalImpairment ? 1.5 : 0,
      ]);

      const isHighRisk = score >= 2;

      const breakdownParts = [];
      if (values.activeCancer) breakdownParts.push("Active cancer (+2)");
      if (values.maleSex) breakdownParts.push("Male + uncontrolled HTN (+1)");
      if (values.anemia) breakdownParts.push("Anemia (+1.5)");
      if (values.bleedingHistory) breakdownParts.push("Bleeding history (+1.5)");
      if (values.ageOver60) breakdownParts.push("Age ≥60 (+1.5)");
      if (values.renalImpairment) breakdownParts.push("Renal impairment (+1.5)");

      return {
        tone: isHighRisk ? tone.warning : tone.success,
        headline: isHighRisk
          ? "Elevated bleeding risk during extended anticoagulation"
          : "Low bleeding risk — extended anticoagulation may be safe",
        summary: isHighRisk
          ? `Score ${score} (≥2 points). Bleeding rate ~2.0% during stable anticoagulation. Patients had a 4-fold increased risk of major bleeding in Hokusai-VTE validation (OR 4.04; 95% CI 2.51–6.48).`
          : `Score ${score} (<2 points). Bleeding rate ~0.5% during stable anticoagulation. Low-risk patients can be reassured when considering extended therapy.`,
        action: isHighRisk
          ? "Consider time-limited anticoagulation (3–6 months). If extended therapy is needed, use reduced-dose regimens and monitor closely."
          : "Extended anticoagulation is likely safe from a bleeding standpoint. Weigh against recurrence risk to decide duration.",
        metrics: buildMetrics([
          { label: "Total score", value: score % 1 === 0 ? `${score}` : score.toFixed(1) },
          { label: "Risk group", value: isHighRisk ? "High (≥2)" : "Low (<2)" },
          { label: "Major bleeding rate", value: isHighRisk ? "~2.0% (stable phase)" : "~0.5% (stable phase)" },
          { label: "Score components", value: breakdownParts.length > 0 ? breakdownParts.join("; ") : "None selected" },
        ]),
        recommendations: isHighRisk
          ? [
              { label: "Duration strategy", value: "Favour time-limited anticoagulation (3–6 months) unless recurrence risk is very high (unprovoked PE, persistent risk factor)." },
              { label: "If extending therapy", value: "Consider reduced-intensity regimens: apixaban 2.5 mg BD or rivaroxaban 10 mg OD (AMPLIFY-EXT / EINSTEIN-CHOICE evidence)." },
              { label: "Monitoring", value: "Reassess bleeding risk factors at each clinic visit. Check renal function, haemoglobin, and blood pressure every 3–6 months." },
              { label: "Modifiable factors", value: "Optimise blood pressure control, treat anaemia, avoid concomitant antiplatelet agents where possible, gastroprotection if indicated." },
            ]
          : [
              { label: "Duration strategy", value: "If VTE was unprovoked or has persistent risk factors, extended anticoagulation is supported — the bleeding risk is acceptably low." },
              { label: "Standard dosing", value: "Full-dose or reduced-dose extended regimens are both appropriate depending on individual recurrence risk." },
              { label: "Monitoring", value: "Annual reassessment of bleeding risk factors. Repeat VTE-BLEED if clinical status changes (new renal impairment, anaemia, cancer diagnosis)." },
              { label: "Patient communication", value: "Inform the patient that their bleeding risk is low and that the benefit of preventing recurrent VTE likely outweighs the risk of bleeding." },
            ],
        supporting: [
          "Klok FA, et al. Prediction of bleeding events in patients with VTE on stable anticoagulation treatment. Eur Respir J. 2016;48(5):1369–1376. Derivation c-statistic 0.75 (dabigatran), 0.78 (warfarin). DOI: 10.1183/13993003.00280-2016",
          "Klok FA, et al. External validation of the VTE-BLEED score in the Hokusai-VTE study. Thromb Haemost. 2017;117(6):1164–1170. OR 4.04 (95% CI 2.51–6.48) for high vs low risk. DOI: 10.1160/TH16-10-0810",
          "Klok FA, et al. VTE-BLEED does not predict recurrent VTE — supporting its use for duration decisions. Res Pract Thromb Haemost. 2019;3(3):364–371. DOI: 10.1002/rth2.12214",
          "Badescu MC, et al. Prediction of bleeding events using VTE-BLEED (Review). Exp Ther Med. 2021;22(5):1344. Most validated bleeding risk score in VTE settings. DOI: 10.3892/etm.2021.10779",
          "Nopp S, Ay C. Bleeding risk assessment in VTE. Hamostaseologie. 2021;41(4):267–274. VTE-BLEED best identifies low-risk patients for safe extended anticoagulation. DOI: 10.1055/a-1339-9987",
        ],
      };
    },
  },
  {
    id: "khorana",
    title: "Khorana VTE Risk Score",
    shortTitle: "Khorana",
    type: "calculator",
    category: "score",
    badge: "Cancer",
    blurb: "Predict chemotherapy-associated VTE risk in ambulatory cancer patients. C-statistic 0.7 in derivation/validation cohorts. Guides primary thromboprophylaxis decisions.",
    tags: ["cancer", "VTE", "thromboprophylaxis", "CASSINI", "AVERT"],
    notes: [
      "Derived from 2,701 and validated in 1,365 cancer outpatients starting chemotherapy (Blood 2008).",
      "C-statistic: 0.7 in derivation and validation cohorts — moderate discrimination.",
      "Score performs best for solid tumours; weaker for lymphoid malignancies (C-statistic 0.51).",
      "RIETE registry (n=7,948): C-statistic only 0.53 for recurrent VTE in patients with established cancer-associated thrombosis — score is designed for PRIMARY prevention, not recurrence prediction.",
    ],
    inputs: [
      {
        id: "cancerSite",
        label: "Cancer site",
        type: "select",
        options: [
          { value: "other", label: "Other site (0 points)" },
          { value: "high", label: "High risk: lung, lymphoma, gynecologic, bladder, testicular (+1)" },
          { value: "veryHigh", label: "Very high risk: stomach or pancreas (+2)" },
        ],
        defaultValue: "other",
      },
      { id: "platelets", label: "Pre-chemotherapy platelet count (×10⁹/L)", type: "number", min: 1, step: 1 },
      { id: "hemoglobin", label: "Hemoglobin (g/L)", type: "number", min: 1, step: 1 },
      { id: "esa", label: "Receiving erythropoiesis-stimulating agent (ESA)", type: "checkbox" },
      { id: "leukocytes", label: "Leukocyte count (×10⁹/L)", type: "number", min: 0, step: 0.1 },
      { id: "bmi", label: "BMI (kg/m²)", type: "number", min: 1, step: 0.1 },
    ],
    calculate: (values) => {
      const platelets = asNumber(values.platelets) ?? 0;
      const hemoglobin = asNumber(values.hemoglobin) ?? Infinity;
      const leukocytes = asNumber(values.leukocytes) ?? 0;
      const bmi = asNumber(values.bmi) ?? 0;
      const siteScore =
        values.cancerSite === "veryHigh" ? 2 : values.cancerSite === "high" ? 1 : 0;

      const score = sum([
        siteScore,
        platelets >= 350 ? 1 : 0,
        hemoglobin < 100 || values.esa ? 1 : 0,
        leukocytes > 11 ? 1 : 0,
        bmi >= 35 ? 1 : 0,
      ]);

      const risk =
        score === 0 ? "Low" : score <= 2 ? "Intermediate" : "High";

      const breakdownParts = [];
      if (siteScore === 2) breakdownParts.push("Very high-risk site (+2)");
      else if (siteScore === 1) breakdownParts.push("High-risk site (+1)");
      if (platelets >= 350) breakdownParts.push(`Platelets ≥350 (+1): ${platelets}`);
      if (hemoglobin < 100) breakdownParts.push(`Hb <100 g/L (+1): ${hemoglobin}`);
      else if (values.esa) breakdownParts.push("ESA use (+1)");
      if (leukocytes > 11) breakdownParts.push(`WBC >11 (+1): ${leukocytes}`);
      if (bmi >= 35) breakdownParts.push(`BMI ≥35 (+1): ${bmi}`);

      return {
        tone: score >= 3 ? tone.warning : score >= 1 ? tone.neutral : tone.success,
        headline:
          score >= 3
            ? "High cancer-associated VTE risk — consider thromboprophylaxis"
            : score >= 1
              ? "Intermediate VTE risk — individualise prophylaxis"
              : "Low VTE risk — routine prophylaxis not indicated",
        summary:
          score === 0
            ? "2.5-month VTE rate: 0.3–0.8%. C-statistic 0.7 in original derivation (n=2,701) and validation (n=1,365) cohorts."
            : score <= 2
              ? "2.5-month VTE rate: 1.8–2.0%. Most cancer VTE events occur in this intermediate group. Novel EHR-based scores (c-statistic 0.71) may improve stratification."
              : "2.5-month VTE rate: 6.7–7.1%. CASSINI and AVERT trials enrolled patients at this risk level and demonstrated benefit of DOAC thromboprophylaxis.",
        action:
          score >= 3
            ? "Start thromboprophylaxis if bleeding risk is acceptable. CASSINI (rivaroxaban) and AVERT (apixaban) provide Grade 1B evidence."
            : score >= 1
              ? "Individualise: consider additional risk factors (prior VTE, immobility, cisplatin, central line). Newer scores may reclassify ~20% of intermediate patients to high-risk."
              : "Routine ambulatory prophylaxis is not recommended. Reassess if treatment or clinical status changes.",
        metrics: buildMetrics([
          { label: "Score", value: `${score} / 6` },
          { label: "Risk tier", value: risk },
          { label: "2.5-month VTE rate", value: score === 0 ? "0.3–0.8%" : score <= 2 ? "1.8–2.0%" : "6.7–7.1%" },
          { label: "C-statistic", value: "0.7 (derivation & validation)" },
          { label: "Score breakdown", value: breakdownParts.length > 0 ? breakdownParts.join("; ") : "No risk factors present" },
        ]),
        recommendations: score >= 3
          ? [
              { label: "Thromboprophylaxis", value: "Rivaroxaban 10 mg OD (CASSINI: HR 0.66, 95% CI 0.40–1.09 ITT; HR 0.40 on-treatment) or apixaban 2.5 mg BD (AVERT: HR 0.41, 95% CI 0.26–0.65; NNT ~14)." },
              { label: "Duration", value: "Continue for duration of chemotherapy or up to 6 months. Reassess at each cycle." },
              { label: "Bleeding check", value: "Weigh tumour-related bleeding risk — GI/GU primaries, thrombocytopenia <50, concurrent antiplatelet therapy, recent surgery." },
              { label: "LMWH alternative", value: "If DOAC unsuitable (drug interactions, GI absorption concerns): dalteparin or enoxaparin at prophylactic dose." },
            ]
          : score >= 1
            ? [
                { label: "Individualise", value: "Additional risk factors not captured by Khorana (prior VTE, central line, cisplatin, immunomodulatory drugs, prolonged immobility) may shift the balance toward prophylaxis." },
                { label: "Novel scores", value: "EHR-derived scores (Li et al., AJH 2023, c-statistic 0.71) reclassified 20% of Khorana-intermediate patients upward. Consider if available at your centre." },
                { label: "Patient education", value: "Counsel on VTE symptoms: leg swelling, chest pain, dyspnoea. Advise early presentation." },
              ]
            : [
                { label: "Routine prophylaxis", value: "Not recommended at this risk level in ambulatory patients. NNT would be prohibitively high." },
                { label: "Reassessment", value: "Re-score if cancer stage changes, new chemotherapy line, or hospitalisation." },
              ],
        supporting: [
          "Khorana AA, et al. Development and validation of a predictive model for chemotherapy-associated thrombosis. Blood. 2008;111(10):4902–4907. C-statistic 0.7. DOI: 10.1182/blood-2007-10-116327",
          "Tafur AJ, et al. RIETE experience: Khorana score in cancer-associated thrombosis (n=7,948). C-statistic 0.53 for recurrence — poor for secondary prediction. Thromb Haemost. 2017;117(6):1192–1198. DOI: 10.1160/TH16-11-0840",
          "Rupa-Matysek J, et al. Khorana validation in lymphoid malignancies: C-statistic 0.51 — score performs poorly in haematological cancers. Med Oncol. 2017;35(1):5. DOI: 10.1007/s12032-017-1065-4",
          "Li A, et al. Novel EHR VTE risk score: c-statistic 0.71 vs Khorana 0.64, reclassified 20% of patients. AJH. 2023;98(7):1052–1057. DOI: 10.1002/ajh.26928",
          "CASSINI trial: Khorana ≥2 patients randomised to rivaroxaban 10 mg OD vs placebo. On-treatment HR 0.40 for VTE.",
          "AVERT trial: Khorana ≥2 patients randomised to apixaban 2.5 mg BD vs placebo. HR 0.41 (95% CI 0.26–0.65); NNT ~14 over 6 months.",
        ],
      };
    },
  },
  {
    id: "creatinine-clearance",
    title: "Creatinine Clearance",
    shortTitle: "CrCl",
    type: "calculator",
    category: "renal",
    badge: "Renal",
    blurb: "Calculate Cockcroft-Gault clearance and review common anticoagulant dosing thresholds.",
    tags: ["renal", "DOAC", "Cockcroft-Gault"],
    notes: ["Use actual body weight unless a local policy specifically advises otherwise."],
    inputs: [
      { id: "age", label: "Age", type: "number", min: 18, step: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", min: 20, step: 0.1 },
      {
        id: "serumCreatinine",
        label: "Serum creatinine",
        type: "number",
        min: 0.1,
        step: 0.1,
      },
      {
        id: "creatinineUnit",
        label: "Creatinine unit",
        type: "radio",
        options: [
          { value: "umol", label: "umol/L" },
          { value: "mgdl", label: "mg/dL" },
        ],
        defaultValue: "umol",
      },
      {
        id: "sex",
        label: "Sex",
        type: "radio",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        defaultValue: "male",
      },
    ],
    calculate: (values) => {
      const crcl = calculateCrCl(values);

      if (!Number.isFinite(crcl)) {
        return {
          tone: tone.warning,
          headline: "Enter age, weight, creatinine, and sex",
          summary: "Cockcroft-Gault requires all four fields.",
          action: "Once calculated, use CrCl rather than eGFR when reviewing DOAC pathways.",
        };
      }

      return {
        tone: crcl < 30 ? tone.warning : tone.success,
        headline: `Estimated CrCl: ${crcl} mL/min`,
        summary:
          crcl < 15
            ? "Renal function is below usual DOAC prescribing thresholds."
            : crcl < 30
              ? "Renal impairment will affect several DOAC dosing and perioperative decisions."
              : "Renal function is within the range where standard dosing pathways often apply.",
        action: "Cross-check the specific anticoagulant and indication before prescribing.",
        metrics: buildMetrics([
          { label: "CrCl", value: `${crcl} mL/min` },
          { label: "Renal band", value: crcl < 15 ? "< 15" : crcl < 30 ? "15 to 29" : crcl < 50 ? "30 to 49" : ">= 50" },
        ]),
        recommendations: [
          { label: "Apixaban", value: crcl < 15 ? "Avoid; insufficient data below CrCl 15 mL/min" : crcl < 25 ? "No dosing recommendation; limited data in CrCl 15\u201324 mL/min" : "Dose reduction (2.5 mg twice daily) if \u22652 of: age \u226580, weight \u226460 kg, creatinine \u2265133 \u00b5mol/L. Otherwise 5 mg twice daily." },
          { label: "Dabigatran", value: crcl < 30 ? "Contraindicated below CrCl 30 mL/min" : crcl < 50 ? "110 mg twice daily preferred; 150 mg twice daily with caution. Recheck CrCl every 3\u20136 months." : "150 mg twice daily standard; 110 mg twice daily if age \u226580 or high bleeding risk." },
          { label: "Rivaroxaban", value: crcl < 15 ? "Avoid; insufficient data below CrCl 15 mL/min" : crcl < 50 ? "15 mg once daily (renal-adjusted dose). Recheck CrCl every 3\u20136 months." : "20 mg once daily with food." },
          { label: "Edoxaban", value: crcl < 15 ? "Avoid; insufficient data below CrCl 15 mL/min" : crcl > 95 ? "Reduced efficacy observed above CrCl 95 mL/min; consider alternative agent." : crcl <= 50 ? "30 mg once daily (renal-adjusted dose)." : "60 mg once daily." },
          { label: "Monitoring interval", value: crcl < 30 ? "Recheck CrCl every 3 months and after intercurrent illness." : crcl < 50 ? "Recheck CrCl every 6 months." : "Recheck CrCl annually and after intercurrent illness." },
        ],
        supporting: [
          "Cockcroft-Gault is the standard renal estimate used in DOAC pivotal trials; do not substitute eGFR.",
          "Use actual body weight unless a local protocol specifies otherwise.",
          "Renal function can change rapidly during acute illness, dehydration, or nephrotoxic drug exposure; reassess CrCl accordingly.",
        ],
      };
    },
  },
  {
    id: "abcd2",
    title: "ABCD2 TIA Score",
    shortTitle: "ABCD2",
    type: "calculator",
    category: "score",
    badge: "Neurology",
    blurb: "Estimate early stroke risk after TIA and guide urgency of investigation.",
    tags: ["TIA", "stroke", "urgency"],
    notes: ["Do not use this score to delay urgent assessment when high-risk features are present."],
    inputs: [
      { id: "age60", label: "Age >= 60", type: "checkbox" },
      { id: "highBp", label: "Initial BP >= 140/90 mmHg", type: "checkbox" },
      {
        id: "clinical",
        label: "Clinical features",
        type: "radio",
        options: [
          { value: "other", label: "Other symptoms" },
          { value: "speech", label: "Speech disturbance without weakness" },
          { value: "weakness", label: "Unilateral weakness" },
        ],
        defaultValue: "other",
      },
      {
        id: "duration",
        label: "Duration",
        type: "radio",
        options: [
          { value: "under10", label: "Under 10 minutes" },
          { value: "10to59", label: "10 to 59 minutes" },
          { value: "60plus", label: "60 minutes or more" },
        ],
        defaultValue: "under10",
      },
      { id: "diabetes", label: "Diabetes mellitus", type: "checkbox" },
    ],
    calculate: (values) => {
      const clinicalPoints =
        values.clinical === "weakness" ? 2 : values.clinical === "speech" ? 1 : 0;
      const durationPoints =
        values.duration === "60plus" ? 2 : values.duration === "10to59" ? 1 : 0;
      const score = sum([
        values.age60 ? 1 : 0,
        values.highBp ? 1 : 0,
        clinicalPoints,
        durationPoints,
        values.diabetes ? 1 : 0,
      ]);

      const risk =
        score <= 3
          ? { label: "Low", twoDay: "1.0%", sevenDay: "1.2%" }
          : score <= 5
            ? { label: "Moderate", twoDay: "4.1%", sevenDay: "5.9%" }
            : { label: "High", twoDay: "8.1%", sevenDay: "11.7%" };

      return {
        tone: score >= 4 ? tone.warning : tone.success,
        headline:
          score >= 6
            ? "High early stroke risk"
            : score >= 4
              ? "Moderate early stroke risk"
              : "Lower early stroke risk",
        summary: `Estimated 2-day stroke risk ${risk.twoDay}; 7-day risk ${risk.sevenDay}.`,
        action:
          score >= 6
            ? "Emergency admission and immediate imaging are usually appropriate."
            : score >= 4
              ? "Arrange urgent same-day or next-day assessment."
              : "Rapid outpatient TIA evaluation is still required.",
        metrics: buildMetrics([
          { label: "Score", value: `${score}` },
          { label: "Risk tier", value: risk.label },
        ]),
        recommendations: score >= 6
          ? [
              { label: "Urgency", value: "Emergency admission with immediate brain and vascular imaging (CT/CTA or MRI/MRA)." },
              { label: "Antiplatelet", value: "Start dual antiplatelet therapy (ASA plus clopidogrel) for 21 days, then single agent, unless anticoagulation is indicated." },
              { label: "Imaging", value: "CT head, CTA head and neck, or MRI with diffusion-weighted imaging. Echocardiography and Holter if AF suspected." },
              { label: "Secondary prevention", value: "Initiate statin, optimize blood pressure, and address all modifiable risk factors urgently." },
            ]
          : score >= 4
            ? [
                { label: "Urgency", value: "Same-day or next-day urgent TIA clinic assessment with neurovascular imaging." },
                { label: "Antiplatelet", value: "Start ASA immediately. Consider short-course dual antiplatelet therapy (ASA plus clopidogrel for 21 days)." },
                { label: "Imaging", value: "Urgent carotid imaging (CTA or ultrasound) and brain imaging within 24 hours." },
                { label: "Secondary prevention", value: "Start statin and blood pressure optimization without delay." },
              ]
            : [
                { label: "Urgency", value: "Rapid outpatient TIA evaluation within 24 to 48 hours. Do not dismiss based on low score alone." },
                { label: "Antiplatelet", value: "Start ASA promptly while awaiting assessment." },
                { label: "Imaging", value: "Brain and vascular imaging should be completed within 7 days, ideally sooner." },
                { label: "Caution", value: "Even low ABCD2 scores do not rule out significant stroke risk. Clinical judgement should prevail." },
              ],
        supporting: [
          "Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.",
          "The ABCD2 score should not be used in isolation to discharge patients without investigation.",
          "Current guidelines recommend urgent assessment for all TIA patients regardless of score, with higher scores prompting faster workup.",
        ],
      };
    },
  },
];
