import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Risk Assessment", "Dosing", "Special Considerations", "References"];

const lmwhDoses = [
  { drug: "Dalteparin", standard: "5,000 U SC daily", lowWeight: "—", highWeight100: "7,500 U SC daily", highWeight120: "7,500 U SC daily (max to 180 kg)", renal: "No dose adjustment" },
  { drug: "Enoxaparin", standard: "40 mg SC daily", lowWeight: "30 mg SC daily", highWeight100: "60 mg SC daily", highWeight120: "0.5 mg/kg SC daily–BID", renal: "30 mg SC daily" },
  { drug: "Tinzaparin", standard: "4,500 U SC daily", lowWeight: "—", highWeight100: "8,000 U SC daily", highWeight120: "75 U/kg SC daily", renal: "No dose adjustment" },
  { drug: "Fondaparinux", standard: "2.5 mg SC daily", lowWeight: "—", highWeight100: "2.5 mg SC daily", highWeight120: "2.5 mg SC daily", renal: "Contraindicated if CrCl <30" },
  { drug: "UFH", standard: "5,000 U SC BID", lowWeight: "2,500 U SC BID", highWeight100: "7,500 U SC BID–TID", highWeight120: "7,500 U SC BID–TID", renal: "No dose adjustment" },
];

const vteRiskFactors = [
  "Stroke with immobility",
  "ICU admission",
  "Active cancer",
  "Age > 60 years",
  "Reduced mobility",
  "History of congestive heart failure",
  "Previous VTE",
  "Known thrombophilia",
  "Fracture in past 3 months",
  "Sepsis",
  "Acute inflammatory conditions",
  "Acute infectious disease (including COVID-19)",
];

const bleedingRisk = [
  { factor: "Known gastroduodenal ulcer", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Major bleeding in past 3 months", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Platelet count < 50 × 10⁹/L", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Active bleeding / intracranial hemorrhage", risk: "Contraindication", action: "Absolute contraindication to pharmacologic prophylaxis" },
  { factor: "Planned surgery during admission", risk: "Moderate", action: "Hold prophylaxis 6–12 hours before surgery" },
];

const references = [
  "Barbar S, Prandoni P. Scoring systems for estimating VTE risk in hospitalized medical patients. Semin Thromb Hemost. 2017;43(5):460-468.",
  "CLOTS Trials Collaboration. IPC in reduction of DVT risk in stroke. Lancet 2013;382(9891):516-524.",
  "Dentali F, et al. Anticoagulant prophylaxis to prevent symptomatic VTE in hospitalized medical patients. Ann Intern Med 2007;146(4):278-288.",
  "Eck RJ, et al. Anticoagulants for thrombosis prophylaxis in acutely ill patients: systematic review and network meta-analysis. BMJ 2022;378:070022.",
  "Mottier D, et al. Enoxaparin vs placebo to prevent symptomatic VTE in hospitalized older adults. NEJM Evid 2023;2(8).",
  "Schünemann HJ, et al. ASH 2018 guidelines for VTE prophylaxis in hospitalized medical patients. Blood Adv 2018;2(22):3198-3225.",
];

export function ThromboprophylaxisMedicalGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Clinical Guide</p>
        <h1 className="asa-guide-title">Thromboprophylaxis: Hospitalized Medical Patients</h1>
        <p className="asa-guide-lead">
          LMWH prophylaxis for acutely ill medical inpatients at increased VTE risk — balanced against bleeding risk. Duration: until discharge only. DOACs NOT recommended in this setting.
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
              <strong>Core principle:</strong> Pharmacologic thromboprophylaxis with LMWH for hospitalized medical patients at increased VTE risk who are not bleeding. Duration: until discharge only (not extended). DOACs are NOT recommended in medical inpatients (higher bleeding risk vs LMWH).
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Key Decision Framework</h3>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">1</div>
                  <div className="asa-timeline-content">
                    <strong>Assess VTE risk</strong>
                    <p>Use IMPROVE-DD, Padua, or GENEVA scoring systems. Higher risk: stroke, ICU, active cancer, prior VTE.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">2</div>
                  <div className="asa-timeline-content">
                    <strong>Assess bleeding risk</strong>
                    <p>Active GI ulcer, recent major bleed, platelets &lt;50 → use mechanical prophylaxis (IPC) instead.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">3</div>
                  <div className="asa-timeline-content">
                    <strong>Choose prophylaxis</strong>
                    <p>High VTE risk + acceptable bleeding risk → LMWH. High bleeding risk → IPC, then start LMWH when safe.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">4</div>
                  <div className="asa-timeline-content">
                    <strong>Duration: until discharge</strong>
                    <p>Do NOT extend beyond hospitalization. A 2023 NEJM study found no benefit of LMWH beyond 30 days in medical elderly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="asa-alert asa-alert-red">
              <strong>DOACs (apixaban, rivaroxaban, etc.):</strong> Should NOT be used for prophylaxis in medically ill hospitalized patients — RCTs show higher bleeding risk compared to LMWH with no clear net benefit.
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">VTE Risk Factors in Medical Inpatients</h3>
              <ul className="asa-ind-list">
                {vteRiskFactors.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="asa-section-copy" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Scoring systems: IMPROVE-DD, Padua Prediction Score, GENEVA risk score. Computerized risk-assessment tools should be implemented where feasible.
              </p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Bleeding Risk Factors</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr><th>Factor</th><th>Risk Level</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {bleedingRisk.map((b) => (
                      <tr key={b.factor}>
                        <td>{b.factor}</td>
                        <td><span className={`asa-badge ${b.risk === "Contraindication" ? "asa-badge-red" : "asa-badge-orange"}`}>{b.risk}</span></td>
                        <td>{b.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pharmacologic Thromboprophylaxis Dosing</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>Standard (40–100 kg)</th>
                      <th>&lt;40 kg</th>
                      <th>100–120 kg</th>
                      <th>&gt;120 kg</th>
                      <th>CrCl &lt;30</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhDoses.map((d) => (
                      <tr key={d.drug}>
                        <td style={{ fontWeight: 600 }}>{d.drug}</td>
                        <td>{d.standard}</td>
                        <td>{d.lowWeight}</td>
                        <td>{d.highWeight100}</td>
                        <td>{d.highWeight120}</td>
                        <td>{d.renal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="asa-section-copy" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                LMWH is preferred over UFH (less frequent dosing, lower HIT risk). UFH 5,000 U SC BID is an alternative.
              </p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Ischemic Stroke</h3>
              <p className="asa-section-copy">LMWH prophylaxis as for other medical patients. If contraindicated, use IPC (more effective than elastic compression stockings in immobile stroke patients).</p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">HIT History</h3>
              <p className="asa-section-copy">Use fondaparinux 2.5 mg SC daily as alternative to UFH/LMWH.</p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Renal Impairment (CrCl &lt;30 mL/min)</h3>
              <ul className="asa-ind-list">
                <li>Enoxaparin: reduce to 30 mg SC daily</li>
                <li>Dalteparin / Tinzaparin: no dose adjustment needed</li>
                <li>Fondaparinux: contraindicated</li>
                <li>UFH: no dose adjustment</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Duration — Key Evidence</h3>
              <p className="asa-section-copy">
                Mottier et al. (NEJM Evidence 2023): Enoxaparin vs placebo in medically ill older adults — no benefit of LMWH in preventing symptomatic VTE beyond 30 days, and no difference in major or clinically relevant bleeding. <strong>Continue prophylaxis until discharge only.</strong>
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
                <p>Related: <GuideLink to="ufhLmwh">UFH, LMWH &amp; Fondaparinux</GuideLink> | <GuideLink to="hit">HIT</GuideLink> | <GuideLink to="covid">COVID-19 Thromboprophylaxis</GuideLink> | <GuideLink to="prophylaxisNonOrtho">Non-Ortho Surgical Prophylaxis</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
