import { createContext, useContext } from "react";

/* ── navigation context ───────────────────────────────── */
export const GuideNavContext = createContext(null);

/* ── canonical guide-ID map ────────────────────────────── */
export const GUIDE_IDS = {
  // Anticoagulant drugs
  warfarin:           "Warfarin",
  warfarinInr:        "Warfarin_Management_of_Out-of-Range_INRs",
  warfarinPoc:        "Warfarin_Point-of-Care_INR_Monitoring",
  warfarinPeriop:     "Warfarin_Perioperative_Management",
  apixaban:           "Apixaban_(Eliquis)",
  rivaroxaban:        "Rivaroxaban_(Xarelto)",
  dabigatran:         "Dabigatran_(Pradaxa)",
  edoxaban:           "Edoxaban_(Lixiana)",
  ufhLmwh:            "Unfractionated_Heparin_Low_Molecular_Weight_Heparin_and_Fondaparinux",

  // DOAC management
  doacsComparison:    "DOACs_Comparison_And_Frequently-asked_Questions",
  doacsCoagTests:     "DOACs_Coagulation_Tests",
  doacsBleeding:      "DOACs_Management_of_Bleeding",
  doacsPeriop:        "DOACs_Perioperative_Management",
  doacsObesity:       "DOACs_in_Patients_with_Obesity",

  // Antiplatelet drugs
  asa:                "Acetylsalicylic_Acid_(ASA)",
  clopidogrel:        "Clopidogrel_(Plavix)",
  prasugrel:          "Prasugrel",
  ticagrelor:         "Ticagrelor_(Brilinta)",

  // Antiplatelet / anticoag combinations
  anticoagAntiplatelet: "Anticoagulation_in_Patients_Requiring_Antiplatelet_Therapy",
  daptDuration:       "Duration_of_Dual_Antiplatelet_Therapy_in_Patients_With_Coronary_Artery_Disease",
  periopAntiplatelet: "Perioperative_Management_of_Antiplatelet_Therapy",

  // VTE
  dvtDiagnosis:       "Deep_Vein_Thrombosis_(DVT)_Diagnosis",
  dvtTreatment:       "Deep_Vein_Thrombosis_(DVT)_Treatment",
  peDiagnosis:        "Pulmonary_Embolism_(PE)_Diagnosis",
  peTreatment:        "Pulmonary_Embolism_(PE)_Treatment",
  peHighRisk:         "Pulmonary_Embolism_High-_and_Intermediate-Risk",
  vteDuration:        "Venous_Thromboembolism_Duration_of_Treatment",
  svt:                "Superficial_Thrombophlebitis_Superficial_Vein_Thrombosis",
  pvt:                "Portal_Vein_Thrombosis_(PVT)",
  pts:                "Post_Thrombotic_Syndrome_(PTS)",
  vcFilter:           "Vena_Cava_Filter",

  // Thrombophilia
  aps:                "Thrombophilia_Antiphospholipid_Syndrome",
  naturalAnticoag:    "Thrombophilia_Deficiencies_in_Protein_C_Protein_S_and_Antithrombin",
  fvlPgm:             "Thrombophilia_Factor_V_Leiden_and_Prothrombin_Gene_Mutation",
  homocysteine:       "Thrombophilia_Homocysteinemia_and_Methylene_Tetrahydrofolate_Reductase",

  // Thromboprophylaxis
  prophylaxisMedical: "Thromboprophylaxis_Hospitalized_Medical_Patients",
  prophylaxisNonOrtho:"Thromboprophylaxis_Non-Orthopedic_Surgery",
  prophylaxisOrtho:   "Thromboprophylaxis_Orthopedic_Surgery",
  covid:              "COVID-19_Primary_Thromboprophylaxis_for_Hospitalized_Patients",

  // Pregnancy
  pregProphylaxis:    "Pregnancy_Thromboprophylaxis",
  pregVte:            "Pregnancy_Venous_Thromboembolism_Treatment",
  pregDiagnosis:      "Pregnancy_Diagnosis_of_DVT_and_PE",

  // Stroke / neuro
  strokeAf:           "Stroke_Prevention_in_Atrial_Fibrillation",
  strokeSecondary:    "Ischemic_Stroke_or_TIA_Secondary_Prevention",
  strokeThrombolysis: "Stroke_Thrombolysis_and_Endovascular_Therapy",
  cvt:                "Cerebral_Venous_Thrombosis",

  // Other
  cancer:             "Cancer_and_Thrombosis",
  cvad:               "Central_Venous_Catheter-Related_Deep_Vein_Thrombosis",
  hit:                "Heparin-Induced_Thrombocytopenia_(HIT)",
  vipitVitt:          "Vaccine-Induced_Prothrombotic_Immune_Thrombocytopenia_(VIPITVITT)",
  pad:                "Peripheral_Arterial_Disease",
  hmb:                "Management_of_Heavy_Menstrual_Bleeding_for_Patients_on_Anticoagulation",
  heartValves:        "Bioprosthetic_and_Mechanical_Heart_Valves_Antithrombotic_Therapy",
  airTravel:          "Air_Travel-related_Thrombosis",
};

/* ── friendly labels (used when no custom children passed) ── */
const GUIDE_LABELS = {
  warfarin: "Warfarin",
  warfarinInr: "Warfarin: Out-of-Range INR Management",
  warfarinPoc: "Warfarin: Point-of-Care INR Monitoring",
  warfarinPeriop: "Warfarin: Perioperative Management",
  apixaban: "Apixaban (Eliquis)",
  rivaroxaban: "Rivaroxaban (Xarelto)",
  dabigatran: "Dabigatran (Pradaxa)",
  edoxaban: "Edoxaban (Lixiana)",
  ufhLmwh: "UFH, LMWH & Fondaparinux",
  doacsComparison: "DOACs: Comparison & FAQ",
  doacsCoagTests: "DOACs: Coagulation Tests",
  doacsBleeding: "DOACs: Bleeding Management",
  doacsPeriop: "DOACs: Perioperative Management",
  doacsObesity: "DOACs in Obesity",
  asa: "ASA (Acetylsalicylic Acid)",
  clopidogrel: "Clopidogrel (Plavix)",
  prasugrel: "Prasugrel (Effient)",
  ticagrelor: "Ticagrelor (Brilinta)",
  anticoagAntiplatelet: "Anticoagulation + Antiplatelet Therapy",
  daptDuration: "DAPT Duration in CAD",
  periopAntiplatelet: "Perioperative Antiplatelet Management",
  dvtDiagnosis: "DVT: Diagnosis",
  dvtTreatment: "DVT: Treatment",
  peDiagnosis: "PE: Diagnosis",
  peTreatment: "PE: Treatment",
  peHighRisk: "PE: High- & Intermediate-Risk",
  vteDuration: "VTE: Duration of Treatment",
  svt: "Superficial Vein Thrombosis",
  pvt: "Portal Vein Thrombosis",
  pts: "Post-Thrombotic Syndrome",
  vcFilter: "Vena Cava Filters",
  aps: "Antiphospholipid Syndrome",
  naturalAnticoag: "Thrombophilia: Protein C, S & Antithrombin",
  fvlPgm: "Factor V Leiden & Prothrombin Gene Mutation",
  homocysteine: "Homocysteinemia & MTHFR",
  prophylaxisMedical: "Thromboprophylaxis: Medical Patients",
  prophylaxisNonOrtho: "Thromboprophylaxis: Non-Orthopedic Surgery",
  prophylaxisOrtho: "Thromboprophylaxis: Orthopedic Surgery",
  covid: "COVID-19 Thromboprophylaxis",
  pregProphylaxis: "Pregnancy: Thromboprophylaxis",
  pregVte: "Pregnancy: VTE Treatment",
  pregDiagnosis: "Pregnancy: DVT & PE Diagnosis",
  strokeAf: "Stroke Prevention in AF",
  strokeSecondary: "Ischemic Stroke: Secondary Prevention",
  strokeThrombolysis: "Stroke: Thrombolysis & EVT",
  cvt: "Cerebral Venous Thrombosis",
  cancer: "Cancer & Thrombosis",
  cvad: "Catheter-Related DVT",
  hit: "Heparin-Induced Thrombocytopenia (HIT)",
  vipitVitt: "VIPIT / VITT",
  pad: "Peripheral Arterial Disease",
  hmb: "Heavy Menstrual Bleeding on Anticoagulation",
  heartValves: "Heart Valves: Antithrombotic Therapy",
  airTravel: "Air Travel-Related Thrombosis",
};

/* ── GuideLink component ──────────────────────────────── */
export function GuideLink({ to, children }) {
  const navigate = useContext(GuideNavContext);
  const guideId = GUIDE_IDS[to] ?? to;
  const label = children || GUIDE_LABELS[to] || to;

  const handleClick = (e) => {
    e.preventDefault();
    if (navigate) navigate(guideId);
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="text-blue-600 font-semibold no-underline border-b border-dashed border-blue-300 cursor-pointer hover:text-blue-700 hover:border-solid hover:border-blue-600"
      title={`Open: ${typeof label === "string" ? label : GUIDE_LABELS[to] || to}`}
    >
      {label}
    </a>
  );
}
