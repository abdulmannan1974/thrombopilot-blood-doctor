import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "riskscores", label: "Risk Scores" },
  { id: "doacs", label: "DOACs" },
  { id: "recommendations", label: "Recommendations" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const chads2Items = [
  { letter: "C", criterion: "Congestive heart failure / LV dysfunction", points: 1 },
  { letter: "H", criterion: "Hypertension (treated or untreated)", points: 1 },
  { letter: "A", criterion: "Age ≥75 years", points: 1 },
  { letter: "D", criterion: "Diabetes mellitus", points: 1 },
  { letter: "S₂", criterion: "Prior Stroke, TIA, or thromboembolism", points: 2 },
];

const chadsvascExtra = [
  { letter: "V", criterion: "Vascular disease (prior MI, peripheral artery disease, or aortic plaque)", points: 1 },
  { letter: "A", criterion: "Age 65–74 years", points: 1 },
  { letter: "Sc", criterion: "Sex category (female sex)", points: 1 },
];

const doacRows = [
  {
    drug: "Apixaban (Eliquis®)",
    standardDose: "5 mg BID",
    reducedDose: "2.5 mg BID if ≥2 of: age ≥80, weight ≤60 kg, creatinine ≥133 µmol/L",
    dialysis: "2.5 mg BID (shared decision-making; some evidence)",
    reversal: "Andexanet alfa (licensed in US; limited Canada availability)",
    notes: "Preferred in most patients; good renal profile; twice daily",
  },
  {
    drug: "Dabigatran (Pradaxa®)",
    standardDose: "150 mg BID",
    reducedDose: "110 mg BID: age ≥80, concomitant verapamil, or high bleed risk",
    dialysis: "Contraindicated",
    reversal: "Idarucizumab (Praxbind®) — approved, widely available in Canada",
    notes: "Only DOAC with approved antidote readily available in Canada",
  },
  {
    drug: "Rivaroxaban (Xarelto®)",
    standardDose: "20 mg OD with evening meal",
    reducedDose: "15 mg OD if CrCl 15–50 mL/min",
    dialysis: "Not recommended",
    reversal: "Andexanet alfa (US license; limited Canada availability)",
    notes: "Once daily; take with food for absorption; avoid if CrCl <15",
  },
  {
    drug: "Edoxaban (Lixiana®)",
    standardDose: "60 mg OD",
    reducedDose: "30 mg OD if CrCl 15–50, weight ≤60 kg, or P-gp inhibitor",
    dialysis: "Not recommended",
    reversal: "No approved specific antidote",
    notes: "Paradoxical reduced efficacy if CrCl >95 mL/min — avoid in this group",
  },
];

const references = [
  "Andrade JG, et al. 2018 focused update of CCS Guidelines for management of AF. Can J Card 2018;34:1371-1392.",
  "Connolly SJ, et al. Dabigatran versus warfarin in AF (RE-LY). N Engl J Med 2009;361(12):1139-1151.",
  "Granger CB, et al. Apixaban versus warfarin in AF (ARISTOTLE). N Engl J Med 2011;365(11):981-993.",
  "Patel MR, et al. Rivaroxaban versus warfarin in non-valvular AF (ROCKET-AF). N Engl J Med 2011;365(10):883-891.",
  "Connolly SJ, et al. Rivaroxaban in rheumatic heart disease-associated AF. N Engl J Med 2022;387:978-988.",
  "Healey JS, et al. Apixaban for stroke prevention in subclinical AF (ARTESiA). N Engl J Med 2024;390:107-117.",
  "Kirchhof P, et al. Anticoagulation with edoxaban in atrial high-rate episodes (NOAH-AFNET). N Engl J Med 2023;389:1167-1179.",
  "Pokorney SD, et al. Apixaban for AF on haemodialysis (AXADIA/RENAL-AF). Circulation 2022;146(23):1735-1745.",
  "Lau WCY, et al. Comparative effectiveness of apixaban, dabigatran, edoxaban, and rivaroxaban. Ann Intern Med 2022;175(11):1515-1524.",
  "Gage BF, et al. Validation of CHADS2 score. JAMA 2001;285(22):2864-2870.",
  "Pisters R, et al. HAS-BLED score for 1-year major bleeding risk in AF. Chest 2010;138(5):1093-1100.",
];

export function StrokePreventionAfGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Clinical Guide</span>
            <span className="asa-badge">Version 68 · Jan 2024</span>
          </div>
          <h1 className="asa-guide-title">Stroke Prevention in Atrial Fibrillation</h1>
          <p className="asa-guide-lead">
            Antithrombotic therapy selection for prevention of ischaemic stroke and arterial thromboembolism in AF — CHADS2/CHADS-65 framework, DOAC dosing, and special considerations.
          </p>
        </div>
      </div>

      <div className="asa-tab-bar">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`asa-tab-btn${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="asa-tab-body">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>CCS recommendation:</strong> DOACs are preferred over warfarin for stroke prevention in non-valvular AF. No head-to-head trials comparing DOACs — no evidence one is superior to another.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Why AF Strokes Are Devastating</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">AF prevalence (age ≥80)</span>
                  <span className="asa-ae-value">10–15%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Stroke/embolism risk increase</span>
                  <span className="asa-ae-value" style={{ color: "#dc2626" }}>3–6 fold vs. non-AF</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">AF strokes vs non-AF strokes</span>
                  <span className="asa-ae-value">Larger, more frequently fatal/disabling</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Risk reduction with anticoagulation</span>
                  <span className="asa-ae-value" style={{ color: "#16a34a" }}>Significant — outweighs bleeding risk in most patients</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Key Principle: Bleeding Risk Rarely Precludes Anticoagulation</h2>
              <ul className="asa-ind-list">
                <li>In most cases, the risk-benefit ratio <strong>favours anticoagulation</strong> even when bleeding risk is elevated</li>
                <li>Patients at increased bleeding risk often have the highest stroke risk — they benefit most from anticoagulation</li>
                <li>Identify and modify reversible bleeding risk factors first:
                  <ul style={{ marginTop: "0.3rem", paddingLeft: "1.2rem" }}>
                    <li>Control blood pressure</li>
                    <li>Reduce NSAID and alcohol use</li>
                    <li>Review drugs affecting anticoagulant metabolism</li>
                    <li>Discontinue antiplatelet therapy if not specifically indicated</li>
                    <li>Assess fall risk</li>
                  </ul>
                </li>
                <li>HAS-BLED score: identifies modifiable bleeding risk factors — use to guide risk factor modification, not to withhold anticoagulation</li>
              </ul>
            </div>
          </div>
        )}

        {/* RISK SCORES */}
        {activeTab === "riskscores" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">CHADS₂ Score</h2>
              <p className="asa-section-copy">For non-valvular AF (excludes mechanical heart valves and rheumatic mitral stenosis/regurgitation).</p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Letter</th>
                    <th>Criterion</th>
                    <th style={{ textAlign: "center" }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {chads2Items.map((r, i) => (
                    <tr key={i}>
                      <td><strong style={{ fontSize: "1.1em", color: "var(--primary)" }}>{r.letter}</strong></td>
                      <td>{r.criterion}</td>
                      <td style={{ textAlign: "center", fontWeight: 700 }}>+{r.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">CHA₂DS₂-VASc Additional Items</h2>
              <p className="asa-section-copy">The CHA₂DS₂-VASc adds the following to the CHADS₂ structure (note: CHADS₂ age ≥75 = 1 pt; CHA₂DS₂-VASc age ≥75 = 2 pts):</p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Letter</th>
                    <th>Criterion</th>
                    <th style={{ textAlign: "center" }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {chadsvascExtra.map((r, i) => (
                    <tr key={i}>
                      <td><strong style={{ color: "var(--primary)" }}>{r.letter}</strong></td>
                      <td>{r.criterion}</td>
                      <td style={{ textAlign: "center", fontWeight: 700 }}>+{r.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">CHADS-65 Framework (CCS Preferred)</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Age &lt;65, CHADS₂ = 0, no additional risk factors</span>
                  <span className="asa-ae-value">No antithrombotic therapy needed</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Age &lt;65 with coronary/vascular disease (CHADS₂ = 0)</span>
                  <span className="asa-ae-value">ASA 81 mg/day only</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#dc2626" }}>Age ≥65 OR any CHADS₂ risk factor in age &lt;65</span>
                  <span className="asa-ae-value"><strong>DOAC or warfarin (INR 2–3) — DOAC preferred by CCS</strong></span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Unsuitable for or declines anticoagulation</span>
                  <span className="asa-ae-value">ASA 81 mg/day as alternative (less effective)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOACS */}
        {activeTab === "doacs" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">DOAC Dosing in AF</h2>
              {doacRows.map((d, i) => (
                <div key={i} className="asa-section-card" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <strong style={{ fontSize: "1.05em" }}>{d.drug}</strong>
                  <table className="asa-dose-table" style={{ marginTop: "0.4rem" }}>
                    <tbody>
                      <tr><td style={{ width: "35%" }}>Standard dose</td><td><strong>{d.standardDose}</strong></td></tr>
                      <tr><td>Reduced dose</td><td>{d.reducedDose}</td></tr>
                      <tr><td>Dialysis</td><td>{d.dialysis}</td></tr>
                      <tr><td>Reversal agent</td><td>{d.reversal}</td></tr>
                      <tr><td>Notes</td><td style={{ fontSize: "0.87em", fontStyle: "italic" }}>{d.notes}</td></tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">DOACs vs. Warfarin: Key Differences</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Efficacy</span>
                  <span className="asa-ae-value">Non-inferior or superior to warfarin in large phase 3 RCTs</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Intracranial bleeding</span>
                  <span className="asa-ae-value" style={{ color: "#16a34a" }}>Lower risk with all DOACs vs. warfarin</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">INR monitoring</span>
                  <span className="asa-ae-value">Not required for DOACs</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Food interactions</span>
                  <span className="asa-ae-value">None known for DOACs</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Renal monitoring</span>
                  <span className="asa-ae-value">Required periodically for all DOACs</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Valvular AF</span>
                  <span className="asa-ae-value">Warfarin required — DOACs not approved</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {activeTab === "recommendations" && (
          <div className="asa-sections">
            <div className="asa-timeline">
              <div className="asa-timeline-step">
                <div className="asa-timeline-marker">1</div>
                <div className="asa-timeline-content">
                  <strong>Assess stroke risk (CHADS-65 framework)</strong>
                  <p>Age ≥65 OR any CHADS₂ risk factor → anticoagulate</p>
                  <p>Age &lt;65, CHADS₂ = 0 → no anticoagulation needed</p>
                </div>
              </div>
              <div className="asa-timeline-step">
                <div className="asa-timeline-marker">2</div>
                <div className="asa-timeline-content">
                  <strong>Assess bleeding risk</strong>
                  <p>Use HAS-BLED score to identify modifiable risk factors. Rarely precludes anticoagulation.</p>
                </div>
              </div>
              <div className="asa-timeline-step">
                <div className="asa-timeline-marker">3</div>
                <div className="asa-timeline-content">
                  <strong>Identify contraindications to DOACs</strong>
                  <p>Mechanical heart valve → warfarin only</p>
                  <p>Severe mitral stenosis / rheumatic valvular AF → warfarin only</p>
                  <p>APLAS → warfarin only</p>
                </div>
              </div>
              <div className="asa-timeline-step">
                <div className="asa-timeline-marker">4</div>
                <div className="asa-timeline-content">
                  <strong>Select anticoagulant</strong>
                  <p><strong>Non-valvular AF:</strong> DOAC preferred (CCS recommendation). Choose based on renal function, dosing frequency preference, cost, and reversal agent availability.</p>
                  <p><strong>Valvular AF / mechanical valve:</strong> Warfarin (INR 2–3)</p>
                </div>
              </div>
              <div className="asa-timeline-step">
                <div className="asa-timeline-marker">5</div>
                <div className="asa-timeline-content">
                  <strong>Patient declines / unsuitable for anticoagulation</strong>
                  <p>ASA 81 mg/day as alternative — less effective than anticoagulation at stroke prevention</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Valvular AF</h2>
              <div className="asa-alert asa-alert-red" style={{ padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "0.75rem" }}>
                <strong>Mechanical heart valve or rheumatic mitral stenosis:</strong> DOACs not recommended — significantly increased stroke risk requires warfarin (INR 2–3).
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">AF with Coronary Artery Disease</h2>
              <ul className="asa-ind-list">
                <li>Antithrombotic management must be individualised</li>
                <li>Balance risk of AF-related stroke + ischaemic coronary events vs. clinically relevant bleeding from combination therapy</li>
                <li>Dual pathway therapy (anticoagulant + antiplatelet) significantly increases bleeding risk — limit duration and indications</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Subclinical AF (Device-Detected)</h2>
              <ul className="asa-ind-list">
                <li>Atrial high-rate episodes detected by pacemakers/loop recorders</li>
                <li>ARTESiA trial (apixaban): lower stroke/SE risk vs. aspirin but higher major bleeding — shared decision-making recommended (AHA)</li>
                <li>NOAH-AFNET trial (edoxaban): no reduction in stroke/SE vs. aspirin with increased bleeding</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">AF and Dialysis</h2>
              <ul className="asa-ind-list">
                <li>Dabigatran is contraindicated on dialysis</li>
                <li>Apixaban 2.5 mg BID: studied in RCTs (AXADIA/RENAL-AF); reasonable option with shared decision-making</li>
                <li>Rivaroxaban and edoxaban: insufficient safety data on dialysis</li>
              </ul>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">References</h2>
              <ol className="asa-ref-list">
                {references.map((ref, i) => <li key={i}>{ref}</li>)}
              </ol>
              <div style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                <p>Related: <GuideLink to="apixaban">Apixaban</GuideLink> | <GuideLink to="rivaroxaban">Rivaroxaban</GuideLink> | <GuideLink to="dabigatran">Dabigatran</GuideLink> | <GuideLink to="edoxaban">Edoxaban</GuideLink> | <GuideLink to="warfarin">Warfarin</GuideLink> | <GuideLink to="anticoagAntiplatelet">OAC + Antiplatelet</GuideLink> | <GuideLink to="heartValves">Heart Valves</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
