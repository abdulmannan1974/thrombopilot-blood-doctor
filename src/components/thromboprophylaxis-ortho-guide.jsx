import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Prophylaxis by Procedure", "Dosing & Duration", "ASA Evidence", "References"];

const procedures = [
  { procedure: "Hip Arthroplasty (THA)", vteRisk: "High", firstLine: "LMWH or rivaroxaban 10 mg OD (or DOAC alternative)", mechanical: "IPC ± GCS as adjunct", duration: "14–35 days (extended post-discharge)" },
  { procedure: "Knee Arthroplasty (TKA)", vteRisk: "High", firstLine: "LMWH or rivaroxaban 10 mg OD (or DOAC alternative)", mechanical: "IPC ± GCS as adjunct", duration: "14–35 days (extended post-discharge)" },
  { procedure: "Hip Fracture Surgery", vteRisk: "High", firstLine: "LMWH (start on admission if surgery delayed)", mechanical: "IPC if bleeding risk high", duration: "14–35 days" },
  { procedure: "Knee Arthroscopy (minor)", vteRisk: "Low", firstLine: "No routine pharmacologic prophylaxis", mechanical: "Early ambulation", duration: "N/A" },
  { procedure: "Spine Surgery (major)", vteRisk: "Moderate", firstLine: "LMWH or UFH (case-by-case)", mechanical: "IPC if high bleeding risk", duration: "Until discharge" },
  { procedure: "Lower Limb Amputation", vteRisk: "Moderate–High", firstLine: "LMWH", mechanical: "IPC where feasible", duration: "Until discharge / mobilized" },
  { procedure: "Lower Extremity Fracture (non-hip)", vteRisk: "Low–Moderate", firstLine: "Based on individual risk assessment", mechanical: "Early ambulation", duration: "Case-by-case" },
];

const doacOptions = [
  { drug: "Rivaroxaban", dose: "10 mg PO daily", approvedFor: "THA (35 days), TKA (14 days)", note: "Also evaluated as 5-day rivaroxaban → ASA 81 mg (see ASA Evidence tab)" },
  { drug: "Apixaban", dose: "2.5 mg PO BID", approvedFor: "THA (32–38 days), TKA (10–14 days)", note: "Well-studied in ADVANCE trials" },
  { drug: "Dabigatran", dose: "150 mg or 220 mg PO daily", approvedFor: "THA and TKA", note: "110 mg first dose (1–4h post-op), then 220 mg daily; 150 mg daily if CrCl 30–50 or age ≥75" },
];

const asaEvidence = [
  {
    trial: "PREVENT CLOT (O'Toole 2023, NEJM)",
    population: "Extremity fractures treated surgically (n=12,211, mean age 44.6)",
    comparison: "ASA 81 mg BID vs enoxaparin 30 mg BID",
    primaryOutcome: "Death from any cause at 90 days",
    result: "ASA noninferior for mortality; DVT rates low in both groups but slightly higher with ASA; similar major bleeding",
    conclusion: "ASA noninferior for mortality, but less effective for VTE prevention",
  },
  {
    trial: "CRISTAL (Sidhu 2022, JAMA)",
    population: "Hip or knee arthroplasty (n=9,711 of planned 15,562 — stopped early)",
    comparison: "ASA 100 mg daily vs enoxaparin 40 mg daily",
    primaryOutcome: "Symptomatic VTE within 90 days",
    result: "ASA did NOT meet noninferiority criteria",
    conclusion: "ASA alone is less effective than enoxaparin for VTE prevention in arthroplasty",
  },
];

const references = [
  "Anderson DR, et al. Aspirin or rivaroxaban for VTE prophylaxis after hip or knee arthroplasty. N Engl J Med 2018;378:699-707.",
  "Anderson DR, et al. ASH 2019 guidelines for VTE prevention in surgical patients. Blood Adv 2019;3:3898-3944.",
  "Falck-Ytter Y, et al. Prevention of VTE in orthopedic surgery patients. Chest 2012;141(2 Suppl):e278S-325S.",
  "O'Toole R, et al. Aspirin or LMWH for thromboprophylaxis after a fracture. N Engl J Med 2023;388(3):203-213.",
  "Sidhu V, et al. ASA vs enoxaparin in hip or knee arthroplasty (CRISTAL). JAMA 2022;328(8):719-727.",
];

export function ThromboprophylaxisOrthoGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Clinical Guide</p>
        <h1 className="asa-guide-title">Thromboprophylaxis: Orthopedic Surgery</h1>
        <p className="asa-guide-lead">
          Extended thromboprophylaxis (14–35 days) for hip/knee arthroplasty and hip fracture surgery. DOACs are well-evaluated in this setting. ASA alone is less effective than LMWH.
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
            <div className="asa-alert asa-alert-blue">
              <strong>Key difference from medical/non-ortho:</strong> Orthopedic surgery patients need <strong>extended prophylaxis (14–35 days post-op)</strong>, including post-discharge. Before prophylaxis was standard, DVT occurred in 40–60% and PE in 5–10%. DOACs (rivaroxaban, apixaban, dabigatran) are well-validated here, unlike in medical or non-ortho settings.
            </div>
            <div className="asa-ae-grid">
              <div className="asa-ae-card">
                <span className="asa-ae-label">Historic DVT rate (no prophylaxis)</span>
                <span className="asa-ae-value">40–60%</span>
              </div>
              <div className="asa-ae-card">
                <span className="asa-ae-label">Prophylaxis duration</span>
                <span className="asa-ae-value">14–35 days (extended post-discharge)</span>
              </div>
              <div className="asa-ae-card">
                <span className="asa-ae-label">DOACs approved</span>
                <span className="asa-ae-value">Yes — rivaroxaban, apixaban, dabigatran</span>
              </div>
              <div className="asa-ae-card">
                <span className="asa-ae-label">ASA alone?</span>
                <span className="asa-ae-value">Less effective than LMWH — avoid if additional VTE risk factors</span>
              </div>
              <div className="asa-ae-card">
                <span className="asa-ae-label">Start timing</span>
                <span className="asa-ae-value">~12 hours post-op (morning after surgery)</span>
              </div>
              <div className="asa-ae-card">
                <span className="asa-ae-label">Pre-discharge USS screening</span>
                <span className="asa-ae-value">NOT recommended (no benefit shown; bleeding with treatment of asymptomatic DVT)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Prophylaxis by Procedure Type</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Procedure</th>
                      <th>VTE Risk</th>
                      <th>First-Line Prophylaxis</th>
                      <th>Mechanical</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures.map((p) => (
                      <tr key={p.procedure}>
                        <td style={{ fontWeight: 600 }}>{p.procedure}</td>
                        <td><span className={`asa-badge ${p.vteRisk === "High" ? "asa-badge-red" : p.vteRisk === "Low" ? "asa-badge-blue" : "asa-badge-amber"}`}>{p.vteRisk}</span></td>
                        <td>{p.firstLine}</td>
                        <td>{p.mechanical}</td>
                        <td>{p.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Longer duration (up to 35 days)</strong> for: bilateral arthroplasty, previous VTE history, substantially impaired mobility at discharge, or rehabilitation patients (continue until discharge from rehab).
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">DOAC Options for Orthopedic Prophylaxis</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr><th>Drug</th><th>Dose</th><th>Approved For</th><th>Notes</th></tr>
                  </thead>
                  <tbody>
                    {doacOptions.map((d) => (
                      <tr key={d.drug}>
                        <td style={{ fontWeight: 600 }}>{d.drug}</td>
                        <td>{d.dose}</td>
                        <td>{d.approvedFor}</td>
                        <td style={{ fontSize: "0.85rem" }}>{d.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">LMWH Dosing — Same as Non-Ortho Guide</h3>
              <ul className="asa-ind-list">
                <li>Dalteparin 5,000 U SC daily (standard weight)</li>
                <li>Enoxaparin 40 mg SC daily (reduce to 30 mg if CrCl &lt;30)</li>
                <li>Tinzaparin 4,500 U SC daily</li>
                <li>Weight adjustments same as non-ortho guide</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Patients on Long-Term Anticoagulation</h3>
              <p className="asa-section-copy">
                Use prophylactic doses post-operatively until safe to restart full-dose anticoagulation (usually 48–72 hours). See <GuideLink to="doacsPeriop">DOACs Perioperative Management</GuideLink>.
              </p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-amber">
              <strong>Bottom line:</strong> ASA alone is less effective than enoxaparin for VTE prevention in orthopedic surgery. Mortality is similar, but VTE rates are higher with ASA. Avoid ASA alone in patients with additional VTE risk factors.
            </div>
            {asaEvidence.map((a) => (
              <div key={a.trial} className="asa-section-card">
                <h3 className="asa-section-title">{a.trial}</h3>
                <div className="asa-ae-grid">
                  <div className="asa-ae-card">
                    <span className="asa-ae-label">Population</span>
                    <span className="asa-ae-value">{a.population}</span>
                  </div>
                  <div className="asa-ae-card">
                    <span className="asa-ae-label">Comparison</span>
                    <span className="asa-ae-value">{a.comparison}</span>
                  </div>
                  <div className="asa-ae-card">
                    <span className="asa-ae-label">Primary outcome</span>
                    <span className="asa-ae-value">{a.primaryOutcome}</span>
                  </div>
                  <div className="asa-ae-card">
                    <span className="asa-ae-label">Result</span>
                    <span className="asa-ae-value">{a.result}</span>
                  </div>
                </div>
                <p className="asa-section-copy" style={{ marginTop: "0.75rem", fontWeight: 600 }}>
                  Conclusion: {a.conclusion}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 4 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((r) => <li key={r}>{r}</li>)}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="prophylaxisNonOrtho">Non-Ortho Prophylaxis</GuideLink> | <GuideLink to="doacsPeriop">DOACs Perioperative</GuideLink> | <GuideLink to="warfarinPeriop">Warfarin Perioperative</GuideLink> | <GuideLink to="asa">ASA</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
