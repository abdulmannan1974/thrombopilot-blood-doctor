import { useState } from "react";

const tabs = ["Overview", "Risk Stratification", "Anticoagulation", "Reperfusion Therapies", "Special Situations", "References"];

const riskTiers = [
  { tier: "Low risk", proportion: "40–60%", mortality: "1% (30-day)", features: "No hemodynamic instability, low PESI/sPESI, no RV dysfunction, no elevated troponin", management: "Outpatient anticoagulation (DOAC)" },
  { tier: "Intermediate-low risk", proportion: "Part of 35–55%", mortality: "~2% (30-day)", features: "Elevated troponin OR RV dilation (not both). PESI ≥ class III or sPESI ≥1", management: "LMWH → transition to oral AC within 48h if stable" },
  { tier: "Intermediate-high risk", proportion: "Part of 35–55%", mortality: "3–15% (90-day)", features: "BOTH elevated troponin AND RV dilation. Normotensive but compromised", management: "Anticoagulation (LMWH). Consider reperfusion if deteriorating. Full-dose ST NOT recommended (PEITHO)." },
  { tier: "High risk", proportion: "~5%", mortality: "30% (in-hospital)", features: "Hemodynamic instability: SBP <90 mmHg (after correcting hypovolemia), need for vasopressors", management: "MEDICAL EMERGENCY — systemic thrombolysis first-line + anticoagulation" },
  { tier: "Cardiac arrest (PE)", proportion: "Rare", mortality: "~80%", features: "PEA/asystole or VF from PE", management: "rt-PA 50 mg bolus or TNK weight-based bolus during CPR" },
];

const deteriorationSigns = [
  "Persistent tachycardia > 110 bpm",
  "Borderline hypotension (SBP 90–100 mmHg)",
  "Shock index (HR/SBP) > 1",
  "Large central clot burden",
  "Elevated lactate > 2.0 mmol/L",
  "Hypoxemia or rapidly escalating O₂ requirements (FiO₂ > 4L NP)",
  "Presentation with syncope or pre-syncope",
];

const thrombolysisRegimens = [
  { regimen: "rt-PA 100 mg", protocol: "10 mg bolus over 5–10 min, then 90 mg over 90–140 min", setting: "High-risk PE" },
  { regimen: "rt-PA 0.6 mg/kg (max 50 mg)", protocol: "Over 15 minutes", setting: "Reduced-dose (intermediate-high risk — selected cases)" },
  { regimen: "rt-PA 0.5 mg/kg (max 50 mg)", protocol: "10 mg bolus over 1 min, remainder over 2 hours", setting: "Reduced-dose alternative" },
  { regimen: "rt-PA 50 mg bolus", protocol: "Over 1 minute during CPR", setting: "Cardiac arrest from PE" },
  { regimen: "Tenecteplase (weight-based)", protocol: "Single bolus; max 50 mg", setting: "Cardiac arrest from PE; per PEITHO for intermediate-high (NOT recommended routinely)" },
];

const stContraindications = {
  absolute: [
    "Active internal bleeding (excluding menses)",
    "History of hemorrhagic stroke at any time",
    "Ischemic stroke within 3 months",
    "Intracranial neoplasm, AVM, or aneurysm",
    "Active intracranial or spinal bleeding",
    "Major surgery, trauma, or head injury within 3 weeks",
    "Structural cerebrovascular disease",
  ],
  relative: [
    "Recent major bleeding (non-intracranial)",
    "Recent surgery within 10 days",
    "Uncontrolled severe hypertension (SBP > 180)",
    "Traumatic CPR > 10 minutes",
    "Internal bleeding within 2–4 weeks",
    "Pregnancy or within 1 week postpartum",
    "Current anticoagulation (INR > 1.7 or therapeutic DOAC)",
    "Active peptic ulcer disease",
    "Puncture of non-compressible vessel",
  ],
};

const catheterOptions = [
  { method: "Catheter-Directed Thrombolysis (CDT)", description: "Low-dose lytic (0.5–1 mg/h/catheter for up to 24h) delivered directly to pulmonary arteries ± ultrasound/mechanical fragmentation", indication: "High-risk PE with ST contraindication or failure; intermediate-high risk with deterioration", evidence: "ESC 2019: Class IIC" },
  { method: "Mechanical Thrombectomy (MT)", description: "Percutaneous suction catheter (usually femoral access) to aspirate clot from pulmonary artery", indication: "High-risk PE with contraindication to ST/CDT", evidence: "ESC 2019: Class IIC. Large catheter → anticoagulate post-procedure" },
  { method: "Surgical Embolectomy", description: "Cardiopulmonary bypass → open removal of clot from pulmonary arteries. May require ECMO standby.", indication: "High-risk PE; failed ST and CDT/MT not feasible", evidence: "Reserve for surgical expertise available" },
  { method: "V-A ECMO", description: "Femoral vein/artery cannulation. Restores hemodynamics and organ perfusion. Bridge to definitive therapy.", indication: "Hemodynamic collapse; ST contraindicated/failed; too unstable for intervention", evidence: "No short-term mortality benefit overall; possible benefit age <60 or with surgical embolectomy" },
];

const references = [
  "Barco S, et al. RV dysfunction and biomarkers in low-risk PE. Eur Heart J 2019;40:902-910.",
  "Christiana K, et al. aPTT in PE patients during first 48h of UFH. Acad Emerg Med 2020;27:117-127.",
  "Costantino G, et al. Bleeding risk: SC LMWH vs IV UFH. PLoS One 2012;7(9):e44553.",
  "Goldberg JB, et al. Surgical management and MCS in high-risk PE. Circulation 2023;147(9):e628-e647.",
  "Konstantinides SV, et al. 2019 ESC Guidelines for acute PE. Eur Respir J 2019;54(3):1901647.",
  "Planer D, et al. CDT vs ST vs anticoagulation: network meta-analysis. CMAJ 2023;195:E833-843.",
  "Sadeghipour P, et al. CDT vs AC in intermediate-high risk PE (CANARY). JAMA Cardiol 2022;7(12):1189-1197.",
];

export function PeHighIntermediateRiskGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada · Clinical Guide</p>
        <h1 className="asa-guide-title">Pulmonary Embolism: High- & Intermediate-Risk</h1>
        <p className="asa-guide-lead">
          Risk stratification, systemic thrombolysis, catheter-directed therapies, and ECMO for the most dangerous spectrum of acute PE — from intermediate-high risk to cardiac arrest.
        </p>
      </div>

      <div className="asa-tab-bar">
        {tabs.map((t, i) => (
          <button key={t} className={`asa-tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      <div className="asa-tab-body">
        {activeTab === 0 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-red">
              <strong>High-risk PE is a medical emergency.</strong> Mortality ~30% in-hospital; ~80% if cardiac arrest. Systemic thrombolysis is first-line for high-risk PE. For intermediate-high risk PE, full-dose thrombolysis is NOT recommended (PEITHO: 10× ↑ ICH, no mortality benefit).
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">ESC Risk Stratification Overview</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr><th>Tier</th><th>Proportion</th><th>Mortality</th><th>Key Features</th><th>Management</th></tr>
                  </thead>
                  <tbody>
                    {riskTiers.map((r) => (
                      <tr key={r.tier}>
                        <td style={{ fontWeight: 600 }}>{r.tier}</td>
                        <td>{r.proportion}</td>
                        <td><span className={`asa-badge ${r.mortality.includes("30%") || r.mortality.includes("80%") ? "asa-badge-red" : r.mortality.includes("15%") ? "asa-badge-orange" : "asa-badge-blue"}`}>{r.mortality}</span></td>
                        <td style={{ fontSize: "0.8rem" }}>{r.features}</td>
                        <td style={{ fontSize: "0.8rem" }}>{r.management}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>PERT (PE Response Team):</strong> Multidisciplinary teams (ICU, thrombosis, IR, CT surgery, respirology, EM) are recommended for intermediate-high and high-risk PE to enable shared decision-making and rapid access to advanced therapies.
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">RV Assessment Methods</h3>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">CTPA signs of RV strain</span>
                  <span className="asa-ae-value">RV/LV ratio &gt;1.0, interventricular septum bowing, IVC reflux of contrast, pulmonary trunk dilation</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Echo signs</span>
                  <span className="asa-ae-value">RV dilation (RV:LV &gt;1), McConnell's sign, TAPSE &lt;16mm, TR velocity ↑, 60/60 sign</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Biomarkers</span>
                  <span className="asa-ae-value">Elevated troponin (myocardial injury); elevated BNP/NT-proBNP (RV strain)</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">RV dilation mortality impact</span>
                  <span className="asa-ae-value">OR 4.19 for all-cause death vs no RV dilation</span>
                </div>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Red Flags in Intermediate-High Risk PE — Signs of Imminent Deterioration</h3>
              <ul className="asa-ind-list">
                {deteriorationSigns.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <p className="asa-section-copy" style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
                If any of these are present along with RV dysfunction + elevated troponin, consider advanced reperfusion therapies in addition to anticoagulation.
              </p>
            </div>
            <div className="asa-alert asa-alert-blue">
              <strong>Timing:</strong> Most adverse events in intermediate-risk PE occur within 96 hours (4 days). Continuous reassessment is essential — categories are NOT static.
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              <strong>All PE patients should receive therapeutic anticoagulation upon diagnosis</strong> — regardless of other planned interventions. Do NOT delay anticoagulation for advanced therapies.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">LMWH Preferred Over UFH</h3>
              <ul className="asa-ind-list">
                <li>PERT analysis: only 26.3% of patients on UFH were therapeutic at 24 hours; 28.4% at 48 hours</li>
                <li>Observational study (n=2610): UFH associated with 5-fold increased risk of moderate-severe bleeding vs LMWH</li>
                <li>LMWH can be given BID for rapid onset (e.g., dalteparin 100 U/kg BID, enoxaparin 1 mg/kg BID, tinzaparin 175 U/kg split BID)</li>
                <li>UFH may still be preferred if urgent surgery or thrombolysis is planned (reversibility)</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Post-Thrombolysis Anticoagulation</h3>
              <ul className="asa-ind-list">
                <li>Stop heparin infusion during ST administration</li>
                <li>Check aPTT 2 hours after ST completion</li>
                <li>Resume IV heparin (without bolus) if aPTT &lt; 2× upper limit of normal</li>
                <li>If on LMWH: either switch to IV heparin for 24h or continue LMWH at next scheduled dose (&gt;2h after ST completion, if no bleeding)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Systemic Thrombolysis — Regimens</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr><th>Regimen</th><th>Protocol</th><th>Setting</th></tr>
                  </thead>
                  <tbody>
                    {thrombolysisRegimens.map((t) => (
                      <tr key={t.regimen}>
                        <td style={{ fontWeight: 600 }}>{t.regimen}</td>
                        <td>{t.protocol}</td>
                        <td>{t.setting}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="asa-section-copy" style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Major bleeding with ST: ~9.9%. Intracranial hemorrhage: ~1.7%. Both significantly higher than anticoagulation alone.
              </p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Contraindications to Systemic Thrombolysis</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ padding: "0.75rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid var(--danger)" }}>
                  <strong style={{ color: "var(--danger)" }}>Absolute</strong>
                  <ul className="asa-ind-list" style={{ marginTop: "0.5rem" }}>
                    {stContraindications.absolute.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div style={{ padding: "0.75rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid #f59e0b" }}>
                  <strong style={{ color: "#f59e0b" }}>Relative</strong>
                  <ul className="asa-ind-list" style={{ marginTop: "0.5rem" }}>
                    {stContraindications.relative.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Catheter-Based & Surgical Options</h3>
              {catheterOptions.map((c) => (
                <div key={c.method} style={{ marginBottom: "1rem", padding: "0.75rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid var(--primary)" }}>
                  <strong>{c.method}</strong>
                  <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>{c.description}</p>
                  <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}><strong>Indication:</strong> {c.indication}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{c.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">IVC Filters</h3>
              <ul className="asa-ind-list">
                <li>Indicated for PE + DVT with contraindication to anticoagulation</li>
                <li>PE without DVT: serial ultrasound may be appropriate instead</li>
                <li>Schedule removal as soon as anticoagulation is possible (within 4 weeks preferred; can remove up to 6–12 months)</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pregnancy</h3>
              <ul className="asa-ind-list">
                <li>LMWH is treatment of choice for all pregnant patients with PE, including intermediate risk</li>
                <li>ST is safe in pregnancy but carries increased risk of placental bleeding, peripartum bleeding, and fetal loss</li>
                <li>Catheter-based therapies can be considered — involve obstetrics and anesthesia</li>
                <li>Multidisciplinary team must include obstetrics if decompensation is possible</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 5 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((r) => <li key={r}>{r}</li>)}
              </ol>
              <p className="asa-section-copy" style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                Source: Thrombosis Canada Clinical Guides | Version 8 | Updated: 2026-02-06
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
