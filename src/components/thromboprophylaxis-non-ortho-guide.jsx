import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Site-Specific Approach", "Dosing", "Bariatric Surgery", "References"];

const surgicalSites = [
  { site: "Abdominal / Pelvic Surgery", vteRisk: "Moderate–High", prophylaxis: "Pharmacologic (LMWH/UFH) ± mechanical", duration: "Until discharge; extend up to 30 days for cancer surgery", note: "Extended prophylaxis order set available for abdomino-pelvic cancer surgery" },
  { site: "Cardiac Surgery", vteRisk: "Moderate", prophylaxis: "Pharmacologic (LMWH/UFH) or mechanical", duration: "Until discharge", note: "Assess bleeding risk carefully post-sternotomy" },
  { site: "Thoracic Surgery", vteRisk: "Moderate–High", prophylaxis: "Pharmacologic (LMWH/UFH)", duration: "Until discharge; extended for cancer", note: "" },
  { site: "Craniotomy / Intracranial Surgery", vteRisk: "High", prophylaxis: "Mechanical initially → pharmacologic when hemostasis achieved", duration: "Until discharge", note: "High bleeding risk — start mechanical immediately, reassess for pharmacologic frequently" },
  { site: "Spine Surgery (major)", vteRisk: "Moderate", prophylaxis: "Pharmacologic or mechanical", duration: "Until discharge", note: "Less evidence than for other surgical sites" },
  { site: "Vascular Surgery", vteRisk: "Variable", prophylaxis: "Based on individual risk assessment", duration: "Until discharge", note: "Consider Caprini score for individualized assessment" },
];

const lmwhDoses = [
  { weight: "Standard (40–100 kg)", dalteparin: "5,000 U SC daily", enoxaparin: "40 mg SC daily", tinzaparin: "4,500 U SC daily" },
  { weight: "< 40 kg", dalteparin: "2,500 U SC daily", enoxaparin: "30 mg SC daily", tinzaparin: "2,500 U SC daily (~75 U/kg)" },
  { weight: "100–120 kg", dalteparin: "7,500 U SC daily", enoxaparin: "60 mg SC daily", tinzaparin: "8,000 U SC daily" },
  { weight: "> 120 kg", dalteparin: "7,500 U SC daily (max to 180 kg)", enoxaparin: "0.5 mg/kg SC daily–BID", tinzaparin: "75 U/kg SC daily" },
  { weight: "CrCl < 30 mL/min", dalteparin: "No adjustment", enoxaparin: "30 mg SC daily", tinzaparin: "No adjustment (preferred)" },
];

const bariatricDoses = [
  { weight: "< 110 kg", tinzaparin: "75 U/kg SC daily or 4,500 U SC daily" },
  { weight: "110–159 kg", tinzaparin: "10,000 U SC daily" },
  { weight: "> 160 kg", tinzaparin: "14,000 U SC daily" },
];

const references = [
  "Anderson DR, et al. ASH 2019 guidelines for VTE prevention in surgical hospitalized patients. Blood Adv. 2019;3:3898-3944.",
  "Caprini JA. Thrombosis risk assessment as a guide to quality patient care. Dis Mon 2005;51(2-3):70-78.",
  "Gould MK, et al. Prevention of VTE in nonorthopedic surgical patients. Chest 2012;141(2 Suppl):e227S-277S.",
  "Tseng EK, et al. Weight adjusted tinzaparin for VTE prevention after bariatric surgery. J Thromb Haemost 2018;16:2008-2015.",
];

export function ThromboprophylaxisNonOrthoGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Clinical Guide</p>
        <h1 className="asa-guide-title">Thromboprophylaxis: Non-Orthopedic Surgery</h1>
        <p className="asa-guide-lead">
          VTE prevention in general, abdominal, cardiac, thoracic, neuro, and vascular surgery — using LMWH/UFH (not DOACs). Includes weight-based dosing and bariatric surgery protocols.
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
              <strong>Core principles:</strong> (1) Balance VTE risk against bleeding risk. (2) Use LMWH or UFH — DOACs not well evaluated in non-ortho surgery. (3) Start when hemostasis achieved (~12 hours post-op). (4) Continue at least until discharge; extend up to 30 days for selected cases (cancer surgery).
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Three Approaches to Prophylaxis</h3>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Group-based</span>
                  <span className="asa-ae-value">Standard prophylaxis for all patients in a defined surgical group (e.g. abdominal-pelvic) unless contraindicated</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Individualized (Caprini)</span>
                  <span className="asa-ae-value">Formal risk assessment model — validated for general, urologic, and gynecologic surgeries</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">ASH 2019 (blended)</span>
                  <span className="asa-ae-value">Combines group-based and individualized recommendations per surgical site</span>
                </div>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Key Timing Rules</h3>
              <ul className="asa-ind-list">
                <li>Start pharmacologic prophylaxis when hemostasis achieved (within 12 hours for low bleeding risk patients)</li>
                <li>Start mechanical prophylaxis at the beginning of the procedure</li>
                <li>For patients admitted pre-op: assess for pre-operative pharmacologic prophylaxis</li>
                <li>High bleeding risk → mechanical prophylaxis (IPC preferred) initially; reassess frequently for pharmacologic conversion</li>
              </ul>
            </div>
            <div className="asa-alert asa-alert-red">
              <strong>Contraindications to pharmacologic prophylaxis:</strong> Active clinically important bleeding, severe thrombocytopenia (&lt;25 × 10⁹/L), untreated major bleeding disorder, recent intracranial or paraspinal hemorrhage.
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Surgical Site-Specific Recommendations (ASH 2019)</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Surgical Site</th>
                      <th>VTE Risk</th>
                      <th>Prophylaxis</th>
                      <th>Duration</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surgicalSites.map((s) => (
                      <tr key={s.site}>
                        <td style={{ fontWeight: 600 }}>{s.site}</td>
                        <td><span className={`asa-badge ${s.vteRisk.includes("High") ? "asa-badge-red" : "asa-badge-amber"}`}>{s.vteRisk}</span></td>
                        <td>{s.prophylaxis}</td>
                        <td>{s.duration}</td>
                        <td style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Every institution should have a written policy for thromboprophylaxis</strong> — ideally embedded into electronic or paper order sets.
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">LMWH Dosing by Weight and Renal Function</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Weight / Renal</th>
                      <th>Dalteparin</th>
                      <th>Enoxaparin</th>
                      <th>Tinzaparin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhDoses.map((d) => (
                      <tr key={d.weight}>
                        <td style={{ fontWeight: 600 }}>{d.weight}</td>
                        <td>{d.dalteparin}</td>
                        <td>{d.enoxaparin}</td>
                        <td>{d.tinzaparin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">UFH Dosing</h3>
              <ul className="asa-ind-list">
                <li>Standard: 5,000 U SC BID or TID (TID for higher risk)</li>
                <li>&gt;100 kg: 7,500 U SC BID or TID</li>
                <li>&lt;40 kg: 2,500 U SC BID</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">HIT History</h3>
              <p className="asa-section-copy">Fondaparinux 2.5 mg SC daily as alternative to UFH/LMWH.</p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Bariatric Surgery — Tinzaparin Dosing (10 days)</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr><th>Patient Weight</th><th>Tinzaparin Dose</th></tr>
                  </thead>
                  <tbody>
                    {bariatricDoses.map((b) => (
                      <tr key={b.weight}>
                        <td style={{ fontWeight: 600 }}>{b.weight}</td>
                        <td>{b.tinzaparin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="asa-section-copy" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Based on retrospective data. Thromboprophylaxis in bariatric surgery has not been well studied in RCTs.
              </p>
            </div>
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
                <p>Related: <GuideLink to="prophylaxisMedical">Medical Prophylaxis</GuideLink> | <GuideLink to="prophylaxisOrtho">Ortho Prophylaxis</GuideLink> | <GuideLink to="hit">HIT</GuideLink> | <GuideLink to="cancer">Cancer &amp; Thrombosis</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
