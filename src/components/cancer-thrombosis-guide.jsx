import { useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Baby,
  Calendar,
  CheckCircle2,
  FileText,
  FlaskConical,
  Info,
  Microscope,
  ShieldAlert,
  Syringe,
  Timer,
  TrendingDown,
  Users,
  XCircle,
  Zap,
} from "lucide-react";

const tabs = [
  ["overview",      "Overview"],
  ["lmwh",          "LMWH"],
  ["doacs",         "DOACs"],
  ["duration",      "Duration & Monitoring"],
  ["special",       "Special Situations"],
  ["prevention",    "Primary Prevention"],
  ["references",    "References"],
];

// ─── LMWH data ────────────────────────────────────────────────────────────────
const lmwhDoses = [
  {
    drug: "Dalteparin",
    dose: "200 U/kg once daily × 1 month → then ~150 U/kg once daily",
    note: "Only LMWH with regulatory indication in Canada specifically for extended CAT treatment",
    tone: "blue",
    cap: "90 kg single syringe limit → use twice-daily or multi-dose vial if heavier",
  },
  {
    drug: "Tinzaparin",
    dose: "175 IU/kg once daily",
    note: "No bioaccumulation demonstrated down to CrCl 20 mL/min — preferred in renal impairment",
    tone: "teal",
    cap: "103 kg single syringe limit → use twice-daily or multi-dose vial if heavier",
  },
  {
    drug: "Enoxaparin",
    dose: "1 mg/kg twice daily OR 1.5 mg/kg once daily",
    note: "Both regimens are accepted; evidence base for CAT is robust across oncology trials",
    tone: "green",
    cap: "100 kg single syringe limit → use twice-daily or multi-dose vial if heavier",
  },
];

const renalOptions = [
  {
    option: "1. Continue tinzaparin at standard dosing",
    detail: "Preferred option — systematic review shows no bioaccumulation even in CrCl <20 mL/min",
    tone: "green",
  },
  {
    option: "2. Continue LMWH + anti-Xa monitoring",
    detail: "Consider dose reduction if trough anti-Xa >0.5 IU/mL; evidence for correlation with outcomes is limited",
    tone: "orange",
  },
  {
    option: "3. Switch to warfarin",
    detail: "Reserve for patients where LMWH and DOACs are both not feasible; hematology/thrombosis consultation recommended",
    tone: "gray",
  },
];

const lmwhPreferRows = [
  ["GI/GU malignancy or active GI/GU bleeding", "Higher DOAC GI bleeding risk, especially edoxaban and rivaroxaban"],
  ["Significant thrombocytopenia (platelets 25–50 × 10⁹/L)", "DOACs studied only down to platelet threshold of 50–75 × 10⁹/L"],
  ["Pregnancy or breastfeeding", "DOACs contraindicated — LMWH is the only safe option"],
  ["Large clot burden (e.g. submassive PE)", "Parenteral route preferred for initial treatment escalation"],
  ["Significant nausea / impaired GI absorption", "LMWH bypasses GI tract entirely"],
];

// ─── DOAC trial data ──────────────────────────────────────────────────────────
const doacTrials = [
  {
    drug: "Apixaban",
    trial: "Caravaggio",
    n: "1170",
    duration: "6 months",
    vtePrimary: "Yes",
    vteRate: "5.6% vs 7.9% LMWH (HR 0.63)",
    majorBleed: "3.8% (similar to LMWH)",
    giBleed: "Similar to LMWH",
    tone: "green",
    highlight: true,
  },
  {
    drug: "Edoxaban",
    trial: "HOKUSAI-VTE Cancer",
    n: "1050",
    duration: "6–12 months",
    vtePrimary: "No (VTE + major bleed composite)",
    vteRate: "12.8% vs 13.5% LMWH (non-inferior composite)",
    majorBleed: "6.9% vs 4.0% LMWH (HR 1.77) ↑",
    giBleed: "GI bleeds higher with edoxaban in GI cancers",
    tone: "orange",
    highlight: false,
  },
  {
    drug: "Rivaroxaban",
    trial: "SELECT-D (pilot)",
    n: "406",
    duration: "6 months",
    vtePrimary: "Yes",
    vteRate: "4% vs 11% LMWH",
    majorBleed: "6% vs 4% LMWH (HR 1.83, NS)",
    giBleed: "More GI bleeds in upper GI cancers",
    tone: "orange",
    highlight: false,
  },
];

const doacDosingRows = [
  {
    drug: "Apixaban",
    loading: "None required",
    maintenance: "10 mg twice daily × 1 week → 5 mg twice daily",
    renal: "Standard DOAC renal rules apply",
    extended: "EVE trial: 2.5 mg twice daily after 6 months showed no increase in recurrence vs 5 mg twice daily",
    tone: "green",
  },
  {
    drug: "Edoxaban",
    loading: "5 days therapeutic LMWH first",
    maintenance: "60 mg once daily",
    renal: "Reduce to 30 mg once daily if CrCl 30–50 mL/min, weight ≤60 kg, or potent P-gp inhibitor",
    extended: "Not specifically studied for extended dose reduction in CAT",
    tone: "teal",
  },
  {
    drug: "Rivaroxaban",
    loading: "None required",
    maintenance: "15 mg twice daily × 3 weeks → 20 mg once daily",
    renal: "Avoid if CrCl <15 mL/min; caution 15–30 mL/min",
    extended: "10 mg once daily dose reduction not studied in CAT population",
    tone: "orange",
  },
];

const doacVsWarfarinPoints = [
  "Both LMWH and DOACs are superior to warfarin in efficacy, bleeding risk, and quality of life",
  "COSIMO study: patients switching from LMWH/fondaparinux/VKA to rivaroxaban reported improved treatment satisfaction",
  "Dabigatran has not been studied in randomised CAT trials — should not be used",
];

// ─── Duration / Monitoring ────────────────────────────────────────────────────
const durationCriteria = [
  { trigger: "Receiving systemic chemotherapy", note: "Continue indefinitely while on active treatment", tone: "blue" },
  { trigger: "Metastatic disease", note: "Ongoing anticoagulation while metastatic disease remains", tone: "orange" },
  { trigger: "Progressive or relapsed malignancy", note: "Continue reassessing every 3–6 months", tone: "orange" },
  { trigger: "Ongoing VTE risk factors (e.g. central venous catheter)", note: "Anticoagulate for as long as catheter is in situ", tone: "teal" },
  { trigger: "Bleeding risk remains low", note: "All of the above conditions should be met alongside low bleed risk", tone: "green" },
];

const monitoringRows = [
  ["Weight", "Every 3 months — LMWH is weight-based; dose may need recalculation"],
  ["CBC (platelets)", "Every 3 months — HIT rare (<0.5%) but platelet threshold guides LMWH dosing"],
  ["Renal function (eGFR/CrCl)", "Every 3 months — LMWH and DOAC dosing are renally dependent"],
  ["Drug-drug interactions", "At every medication change — P-gp and CYP3A4 inhibitors/inducers affect DOAC levels"],
  ["Anti-Xa levels", "Not routinely required; consider in renal impairment or obese patients on LMWH"],
];

// ─── Special situations ───────────────────────────────────────────────────────
const thrombocytopeniaRows = [
  ["Platelets ≥50 × 10⁹/L", "Full-dose anticoagulation", "Continue standard therapeutic LMWH"],
  ["Platelets 25–50 × 10⁹/L", "Half-dose LMWH", "For acute proximal VTE: consider platelet transfusion to keep >50 × 10⁹/L to allow full dose"],
  ["Platelets <20 × 10⁹/L", "Withhold anticoagulant until count rises", "Risk of fatal bleeding generally outweighs thrombotic risk at this threshold"],
];

const incidentalRows = [
  [
    "Incidental PE — segmental or more proximal",
    "Full anticoagulation (same as symptomatic)",
    "Meta-analysis: subsegmental cancer PE has recurrence risk comparable to more proximal clots — treat",
  ],
  [
    "Portal / splenic vein thrombosis",
    "Anticoagulation suggested for most patients",
    "May defer if thrombus is localised or chronic (cavernous transformation)",
  ],
  [
    "Mesenteric / renal / cerebral vein thrombosis",
    "Full-dose anticoagulation",
    "See Cerebral Venous Thrombosis guide for CVT-specific management",
  ],
];

const catheterRows = [
  ["Duration", "Minimum 3 months AND while catheter remains in place"],
  ["Anticoagulant choice", "LMWH or DOAC — limited direct evidence for DOACs in catheter-related thrombosis"],
  ["Catheter removal", "Keep if functional, well-positioned, not infected, and symptoms improve on anticoagulation"],
  ["Catheter removal (if indicated)", "Remove as per standard practice when no longer required"],
];

const recurrenceRows = [
  ["Recurrence on warfarin or DOAC", "Switch to therapeutic LMWH", "Vena cava filter NOT recommended — increases DVT risk, no PE or survival benefit"],
  ["Recurrence despite therapeutic LMWH", "Increase LMWH dose by ~25%", "First exclude HIT; specialist consultation recommended"],
];

// ─── Primary Prevention ───────────────────────────────────────────────────────
const primaryPrevention = [
  {
    setting: "High-risk ambulatory patients (Khorana score >2)",
    options: [
      "Apixaban 2.5 mg twice daily",
      "Rivaroxaban 10 mg once daily",
      "Daily LMWH prophylaxis (also reduces symptomatic VTE in meta-analyses)",
    ],
    note: "Best studied in locally advanced/metastatic pancreatic cancer. Weigh bleeding risk carefully.",
    tone: "blue",
  },
  {
    setting: "Cancer surgery patients (elective)",
    options: [
      "Prophylactic LMWH (if CrCl >30 mL/min) starting ~12h post-operatively",
      "Continue minimum 7–10 days or until hospital discharge",
      "Major abdominal/pelvic cancer surgery: extend to 4 weeks",
    ],
    note: "Insufficient data to support DOACs in the surgical prophylaxis setting for cancer patients.",
    tone: "teal",
  },
  {
    setting: "Paediatric cancer patients",
    options: [
      "Manage with paediatric haematology/thrombosis specialist where possible",
    ],
    note: "If specialist unavailable, paediatric/neonatologist + adult haematologist team approach",
    tone: "gray",
  },
];

// ─── References ───────────────────────────────────────────────────────────────
const references = [
  "Agnelli G, et al. Apixaban for the treatment of venous thromboembolism associated with cancer (Caravaggio). N Engl J Med. 2020;382:1599-1607.",
  "Becattini C, et al. Rivaroxaban vs placebo for extended antithrombotic prophylaxis after laparoscopic surgery for colorectal cancer. Blood. 2022;140:900-908.",
  "Cohen AT, et al. Patient-reported outcomes associated with changing to rivaroxaban for cancer-associated VTE — COSIMO study. Thromb Res. 2021;206:1-4.",
  "Farge D, et al. 2022 international clinical practice guidelines for VTE in patients with cancer, including COVID-19 patients. Lancet Oncol. 2022;23:e334-e347.",
  "Khorana AA, et al. Rivaroxaban for thromboprophylaxis in high-risk ambulatory patients with cancer (CASSINI). N Engl J Med. 2019;380:720-728.",
  "Key N, et al. VTE prophylaxis and treatment in patients with cancer: ASCO guideline update. J Clin Oncol. 2023;41:3063-3071.",
  "Knoll W, et al. Extended thromboprophylaxis after major abdominal/pelvic cancer surgery: systematic review and meta-analysis. Thromb Res. 2021;204:114-122.",
  "Lyman GH, et al. ASH 2021 guidelines for VTE: prevention and treatment in patients with cancer. Blood Adv. 2021;5:927-974.",
  "McBane RD, et al. Extending VTE secondary prevention with apixaban in cancer patients — EVE trial. J Thromb Haemost. 2024;1-11.",
  "Moik F, et al. Extended anticoagulation for cancer-associated thrombosis beyond 6 months: systematic review. J Thromb Haemost. 2022;20:619-634.",
  "Raskob G, et al. Edoxaban for the treatment of cancer-associated VTE (HOKUSAI-VTE Cancer). N Engl J Med. 2018;378:615-624.",
  "Samuelson B, et al. Management of cancer-associated thrombosis in patients with thrombocytopenia — SSC of ISTH guidance. J Thromb Haemost. 2018;16:1-4.",
  "Valeriani E, et al. Anticoagulant therapy for splanchnic vein thrombosis: systematic review and meta-analysis. Blood. 2021;137:1233-1240.",
  "Vathiotis IA, et al. Tinzaparin safety in cancer patients with renal impairment: systematic review. Clin Appl Thromb Hemost. 2021;27:1076029620979592.",
  "Yan M, et al. Clinical factors and outcomes of subsegmental PE in cancer patients. Blood Adv. 2021;5:1050-1058.",
  "Young AM, et al. Comparison of oral factor Xa inhibitor with LMWH in cancer-associated VTE (SELECT-D). J Clin Oncol. 2018;36:2017-2023.",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

function ToneChip({ label, tone }) {
  const bg = { green: "#f0fdf4", teal: "#f0fdfa", orange: "#fffbeb", danger: "#fef2f2", blue: "#eff6ff", gray: "#f9fafb" };
  const color = { green: "#15803d", teal: "#0f766e", orange: "#b45309", danger: "#b91c1c", blue: "#1d4ed8", gray: "#6b7280" };
  const border = { green: "#bbf7d0", teal: "#99f6e4", orange: "#fde68a", danger: "#fecaca", blue: "#bfdbfe", gray: "#e5e7eb" };
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "0.15rem 0.55rem",
      borderRadius: "999px",
      background: bg[tone] || bg.gray,
      color: color[tone] || color.gray,
      border: `1px solid ${border[tone] || border.gray}`,
      fontSize: "0.72rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function CancerThrombosisGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">

      {/* Header */}
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-green">Cancer-Associated Thrombosis</span>
              <span className="asa-badge asa-badge-teal">Thrombosis Canada</span>
            </div>
            <h2 className="asa-guide-title">Cancer and Thrombosis</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 10 September 2024</span>
              <span><FileText size={13} /> DVT · PE · LMWH · DOACs · Cancer-Associated Thrombosis</span>
            </div>
          </div>
          <div className="asa-guide-icon" style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#b91c1c" }}>
            <Activity size={24} />
          </div>
        </div>
        <div className="asa-objective-strip">
          <strong>Objective:</strong> To assist healthcare professionals in the management of cancer-associated thrombosis (CAT), including selection of anticoagulant, dosing, duration, monitoring, and management of special situations.
        </div>
      </div>

      {/* Background strip */}
      <div className="asa-mechanism-card">
        <div className="asa-mechanism-icon" style={{ background: "#fef2f2", color: "#b91c1c" }}>
          <FlaskConical size={18} />
        </div>
        <div>
          <h3>Clinical Background</h3>
          <p style={{ margin: 0, color: "#374151", lineHeight: 1.65, fontSize: "0.94rem" }}>
            LMWH and anti-Xa DOACs (apixaban, edoxaban, rivaroxaban) are the recommended treatments for CAT.
            Both are superior to warfarin in efficacy, bleeding risk, and quality of life. LMWH is preferred in specific high-risk scenarios (GI malignancy, thrombocytopenia, pregnancy). Dabigatran has not been studied in CAT randomised trials.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Cancer and Thrombosis guide sections">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "asa-tab-btn active" : "asa-tab-btn"}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="danger" />When to Prefer LMWH Over a DOAC</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Clinical scenario</th>
                    <th>Reason to prefer LMWH</th>
                  </tr>
                </thead>
                <tbody>
                  {lmwhPreferRows.map(([scenario, reason]) => (
                    <tr key={scenario}>
                      <td className="dose-highlight">{scenario}</td>
                      <td>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Key Principles of CAT Management</h3>
              <ul className="asa-ind-list">
                <li>Anticoagulation should start promptly; initial LMWH bridging is required for edoxaban but NOT for apixaban or rivaroxaban.</li>
                <li>LMWH doses should be based on actual body weight — do not cap in obese patients.</li>
                <li>Both LMWH and DOACs are superior to warfarin; warfarin is a fallback for rare contraindicated situations.</li>
                <li>Minimum anticoagulation duration is 3–6 months; extended therapy is warranted in most active cancer patients.</li>
                <li>Reassess every 3–6 months: continued anticoagulation is indicated while cancer is active, metastatic, or high-risk.</li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Apixaban is the preferred DOAC in most CAT patients</strong> based on comparable VTE recurrence, similar GI bleeding rates to LMWH, and the absence of a mandatory LMWH lead-in.
              </div>
            </div>

            <div className="asa-alert asa-alert-warn">
              <AlertTriangle size={16} />
              <div>
                Anticoagulation decisions near end of life must account for quality of life and patient preferences. Bleeding risk approaches 10% in this population. Discontinuation may be appropriate.
              </div>
            </div>
          </div>
        )}

        {/* LMWH */}
        {tab === "lmwh" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />LMWH Dosing in Cancer-Associated Thrombosis</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {lmwhDoses.map((lmwh) => {
                  const bg = { blue: "#eff6ff", teal: "#f0fdfa", green: "#f0fdf4" };
                  const bc = { blue: "#bfdbfe", teal: "#99f6e4", green: "#bbf7d0" };
                  const col = { blue: "#1e40af", teal: "#0f766e", green: "#166534" };
                  return (
                    <div
                      key={lmwh.drug}
                      style={{
                        border: `1px solid ${bc[lmwh.tone]}`,
                        background: bg[lmwh.tone],
                        borderRadius: "10px",
                        padding: "1rem 1.1rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ flex: "1 1 180px" }}>
                          <div style={{ fontWeight: 800, fontSize: "0.95rem", color: col[lmwh.tone], marginBottom: "0.25rem" }}>{lmwh.drug}</div>
                          <div style={{ fontWeight: 600, color: col[lmwh.tone], fontSize: "0.9rem", marginBottom: "0.3rem" }}>{lmwh.dose}</div>
                          <div style={{ fontSize: "0.82rem", color: col[lmwh.tone], opacity: 0.85 }}>{lmwh.note}</div>
                        </div>
                        <div style={{
                          background: "rgba(255,255,255,0.6)",
                          border: `1px solid ${bc[lmwh.tone]}`,
                          borderRadius: "8px",
                          padding: "0.4rem 0.7rem",
                          fontSize: "0.76rem",
                          color: col[lmwh.tone],
                          maxWidth: "240px",
                          fontStyle: "italic",
                        }}>
                          ⚖ {lmwh.cap}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Renal Impairment (CrCl &lt;30 mL/min) — LMWH Options</h3>
              <div style={{ display: "grid", gap: "0.65rem" }}>
                {renalOptions.map((opt) => {
                  const bg = { green: "#f0fdf4", orange: "#fffbeb", gray: "#f9fafb" };
                  const bc = { green: "#bbf7d0", orange: "#fde68a", gray: "#e5e7eb" };
                  const col = { green: "#166534", orange: "#92400e", gray: "#374151" };
                  return (
                    <div key={opt.option} style={{ border: `1px solid ${bc[opt.tone]}`, background: bg[opt.tone], borderRadius: "8px", padding: "0.75rem 1rem" }}>
                      <div style={{ fontWeight: 700, color: col[opt.tone], marginBottom: "0.2rem", fontSize: "0.88rem" }}>{opt.option}</div>
                      <div style={{ fontSize: "0.83rem", color: col[opt.tone], opacity: 0.85 }}>{opt.detail}</div>
                    </div>
                  );
                })}
              </div>
            </article>

            <div className="asa-alert asa-alert-teal">
              <CheckCircle2 size={16} />
              <div>
                <strong>Tinzaparin is the LMWH of choice in significant renal impairment.</strong> No dose adjustment is required and no bioaccumulation has been demonstrated down to CrCl 20 mL/min.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Obesity:</strong> Do not cap LMWH dose by body weight. Base dose on actual body weight. Above the single syringe weight limit, use twice-daily dosing or multi-dose vials (available for all three LMWHs).
              </div>
            </div>
          </div>
        )}

        {/* DOACs */}
        {tab === "doacs" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="green" />Head-to-Head DOAC vs LMWH Randomised Trial Summary</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table" style={{ minWidth: "600px" }}>
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>Trial (n)</th>
                      <th>VTE primary?</th>
                      <th>VTE recurrence</th>
                      <th>Major bleeding</th>
                      <th>GI bleeding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doacTrials.map((row) => (
                      <tr key={row.drug} style={{ background: row.highlight ? "#f0fdf4" : undefined }}>
                        <td className="dose-highlight" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          {row.highlight && <ToneChip label="Preferred" tone="green" />}
                          {row.drug}
                        </td>
                        <td>{row.trial} (n={row.n})</td>
                        <td>{row.vtePrimary}</td>
                        <td style={{ color: "#15803d", fontWeight: 600, fontSize: "0.85rem" }}>{row.vteRate}</td>
                        <td style={{ color: row.tone === "green" ? "#15803d" : "#b45309", fontSize: "0.85rem" }}>{row.majorBleed}</td>
                        <td style={{ color: row.tone === "green" ? "#6b7280" : "#b91c1c", fontSize: "0.83rem" }}>{row.giBleed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />DOAC Dosing in CAT</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {doacDosingRows.map((d) => {
                  const bg = { green: "#f0fdf4", teal: "#f0fdfa", orange: "#fffbeb" };
                  const bc = { green: "#bbf7d0", teal: "#99f6e4", orange: "#fde68a" };
                  const col = { green: "#166534", teal: "#0f766e", orange: "#92400e" };
                  return (
                    <div key={d.drug} style={{ border: `1px solid ${bc[d.tone]}`, background: bg[d.tone], borderRadius: "10px", padding: "1rem 1.1rem" }}>
                      <div style={{ fontWeight: 800, color: col[d.tone], marginBottom: "0.5rem" }}>{d.drug}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.5rem" }}>
                        {[
                          ["Loading", d.loading],
                          ["Maintenance", d.maintenance],
                          ["Renal adjustment", d.renal],
                          ["Extended therapy", d.extended],
                        ].map(([label, val]) => (
                          <div key={label} style={{ fontSize: "0.82rem" }}>
                            <div style={{ fontWeight: 700, color: col[d.tone], textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "0.68rem", marginBottom: "0.15rem" }}>{label}</div>
                            <div style={{ color: col[d.tone], opacity: 0.9 }}>{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />DOACs vs Warfarin</h3>
              <ul className="asa-ind-list">
                {doacVsWarfarinPoints.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="asa-alert asa-alert-danger">
              <XCircle size={16} />
              <div>
                <strong>Dabigatran is not recommended in CAT.</strong> No randomised trial data exist for dabigatran in cancer-associated VTE. Use only proven agents: LMWH, apixaban, edoxaban, or rivaroxaban.
              </div>
            </div>

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>GI malignancy caution:</strong> Edoxaban and rivaroxaban are associated with higher GI bleeding rates in upper GI cancers. Apixaban had similar GI bleeding rates to LMWH. Prefer apixaban or LMWH in upper GI tract malignancies.
              </div>
            </div>
          </div>
        )}

        {/* DURATION & MONITORING */}
        {tab === "duration" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Duration of Anticoagulation</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem" }}>
                Minimum duration is <strong>3–6 months</strong>. Continued anticoagulation is recommended when <em>any</em> of the following apply and bleeding risk remains low:
              </p>
              <div style={{ display: "grid", gap: "0.55rem" }}>
                {durationCriteria.map((item) => {
                  const bg = { blue: "#eff6ff", orange: "#fffbeb", teal: "#f0fdfa", green: "#f0fdf4" };
                  const bc = { blue: "#bfdbfe", orange: "#fde68a", teal: "#99f6e4", green: "#bbf7d0" };
                  const col = { blue: "#1e40af", orange: "#92400e", teal: "#0f766e", green: "#166534" };
                  return (
                    <div key={item.trigger} style={{ border: `1px solid ${bc[item.tone]}`, background: bg[item.tone], borderRadius: "8px", padding: "0.7rem 0.9rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <CheckCircle2 size={15} style={{ color: col[item.tone], marginTop: "0.1rem", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, color: col[item.tone], fontSize: "0.88rem" }}>{item.trigger}</div>
                        <div style={{ fontSize: "0.82rem", color: col[item.tone], opacity: 0.85, marginTop: "0.1rem" }}>{item.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Monitoring Parameters</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Frequency &amp; rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {monitoringRows.map(([param, detail]) => (
                    <tr key={param}>
                      <td className="dose-highlight">{param}</td>
                      <td>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-info">
              <Timer size={16} />
              <div>
                Reassess every <strong>3–6 months</strong>: review ongoing cancer activity, bleeding risk, patient preference, and quality of life — particularly near end of life where anticoagulation burden may outweigh benefit.
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {tab === "special" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Thrombocytopenia — Dose Adjustment Guide</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Platelet count</th>
                    <th>Anticoagulation approach</th>
                    <th>Additional note</th>
                  </tr>
                </thead>
                <tbody>
                  {thrombocytopeniaRows.map(([count, approach, note]) => (
                    <tr key={count}>
                      <td className="dose-highlight">{count}</td>
                      <td>{approach}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Catheter-Related Thrombosis</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Issue</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {catheterRows.map(([issue, rec]) => (
                    <tr key={issue}>
                      <td className="dose-highlight">{issue}</td>
                      <td>{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Incidental Thrombosis (Found on Imaging)</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Site / type</th>
                    <th>Management</th>
                    <th>Key evidence point</th>
                  </tr>
                </thead>
                <tbody>
                  {incidentalRows.map(([site, mgmt, evidence]) => (
                    <tr key={site}>
                      <td className="dose-highlight">{site}</td>
                      <td>{mgmt}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>{evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="danger" />Recurrent Thrombosis Despite Anticoagulation</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Recommended action</th>
                    <th>Important qualifier</th>
                  </tr>
                </thead>
                <tbody>
                  {recurrenceRows.map(([scenario, action, qualifier]) => (
                    <tr key={scenario}>
                      <td className="dose-highlight">{scenario}</td>
                      <td>{action}</td>
                      <td style={{ color: "#b91c1c", fontSize: "0.88rem" }}>{qualifier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Vena cava filter is NOT recommended</strong> for recurrent thrombosis in patients already receiving therapeutic anticoagulation. IVC filters increase DVT risk with no reduction in PE or survival benefit.
              </div>
            </div>

            <div className="asa-alert asa-alert-teal">
              <Microscope size={16} />
              <div>
                <strong>Medication absorption:</strong> LMWH is preferred in patients with significant nausea/vomiting, or those with an altered upper GI tract (e.g. bowel surgery for abdominal cancer) where DOAC absorption is unpredictable.
              </div>
            </div>
          </div>
        )}

        {/* PRIMARY PREVENTION */}
        {tab === "prevention" && (
          <div className="asa-tab-panel">
            {primaryPrevention.map((group) => {
              const bg = { blue: "#eff6ff", teal: "#f0fdfa", gray: "#f9fafb" };
              const bc = { blue: "#bfdbfe", teal: "#99f6e4", gray: "#e5e7eb" };
              const col = { blue: "#1e40af", teal: "#0f766e", gray: "#374151" };
              return (
                <article key={group.setting} className="asa-section-card">
                  <h3><Dot tone={group.tone === "gray" ? "gray" : group.tone} />{group.setting}</h3>
                  <ul className="asa-ind-list">
                    {group.options.map((opt) => <li key={opt}>{opt}</li>)}
                  </ul>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      padding: "0.65rem 0.9rem",
                      borderLeft: `3px solid ${bc[group.tone]}`,
                      background: bg[group.tone],
                      borderRadius: "0 8px 8px 0",
                      fontSize: "0.85rem",
                      color: col[group.tone],
                    }}
                  >
                    {group.note}
                  </div>
                </article>
              );
            })}

            <div className="asa-alert asa-alert-info">
              <Users size={16} />
              <div>
                The decision to start prophylactic anticoagulation in ambulatory cancer patients should be based on <strong>VTE risk (Khorana score)</strong>, <strong>bleeding risk</strong>, <strong>cancer type</strong>, and <strong>patient values and preferences</strong>.
              </div>
            </div>

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                DOACs for thromboprophylaxis after cancer surgery: insufficient evidence to recommend. LMWH remains the standard of care in the surgical prophylaxis setting for cancer patients.
              </div>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {tab === "references" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />References</h3>
              <ol style={{ paddingLeft: "1.2rem", listStyle: "decimal" }}>
                {references.map((item, i) => (
                  <li key={i} style={{ padding: "0.35rem 0", color: "#374151", lineHeight: 1.6, fontSize: "0.87rem" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="asa-guide-footer" style={{ padding: "1rem 1.35rem" }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#374151" }}>Cancer and Thrombosis</p>
        <p style={{ margin: "0.3rem 0 0", color: "#6b7280", fontSize: "0.85rem" }}>
          Thrombosis Canada Clinical Guide · Updated 10 September 2024 · Individualise anticoagulant choice based on cancer type, bleeding risk, renal function, and patient preference.
        </p>
      </div>
    </section>
  );
}
