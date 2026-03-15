import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "practical", label: "Practical Issues" },
  { id: "interactions", label: "Drug Interactions" },
  { id: "monitoring", label: "Monitoring" },
  { id: "emergencies", label: "Emergencies" },
  { id: "renal", label: "Renal Dosing" },
  { id: "references", label: "References" },
];

const doacProperties = [
  {
    property: "Renal elimination",
    dabigatran: "80%",
    apixaban: "27%",
    rivaroxaban: "35%",
    edoxaban: "50%",
  },
  {
    property: "Twice daily dosing",
    dabigatran: "Yes",
    apixaban: "Yes",
    rivaroxaban: "No (once daily for AF/VTE maintenance)",
    edoxaban: "No (once daily)",
  },
  {
    property: "Take with food",
    dabigatran: "Optional (reduces dyspepsia)",
    apixaban: "Optional",
    rivaroxaban: "MUST take 15/20 mg with meals",
    edoxaban: "Optional",
  },
  {
    property: "Can crush/open",
    dabigatran: "NO — capsules must not be opened, crushed, or chewed",
    apixaban: "Yes",
    rivaroxaban: "Yes",
    edoxaban: "Yes",
  },
  {
    property: "Dosette compatible",
    dabigatran: "NO — must stay in blister pack (moisture sensitive)",
    apixaban: "Yes",
    rivaroxaban: "Yes",
    edoxaban: "Yes",
  },
  {
    property: "Enteral feeding tube",
    dabigatran: "NO — cannot go through tubes",
    apixaban: "Yes (crushed in D5W)",
    rivaroxaban: "Yes (if tube in stomach)",
    edoxaban: "Yes (can be crushed)",
  },
  {
    property: "Specific reversal agent",
    dabigatran: "Idarucizumab",
    apixaban: "None (PCC for Xa inhibitors)",
    rivaroxaban: "None (PCC for Xa inhibitors)",
    edoxaban: "None (PCC for Xa inhibitors)",
  },
];

const interactionRows = [
  {
    drug: "NSAIDs",
    effect: "Increased bleeding risk",
    recommendation: "Avoid long-term use with all DOACs. Use acetaminophen instead.",
    severity: "red",
  },
  {
    drug: "St. John's Wort",
    effect: "Reduces DOAC levels (P-gp and CYP3A4 inducer)",
    recommendation: "AVOID with all DOACs.",
    severity: "red",
  },
  {
    drug: "PPIs / H2 blockers",
    effect: "Slightly reduced dabigatran bioavailability (no clinical effect)",
    recommendation: "Safe with all DOACs. No dose adjustment needed.",
    severity: "green",
  },
  {
    drug: "Antacids (Al/Mg/Ca)",
    effect: "May reduce dabigatran absorption",
    recommendation: "Avoid OTC antacids containing aluminum, magnesium, or calcium with dabigatran.",
    severity: "amber",
  },
  {
    drug: "Herbal supplements (garlic, curcumin)",
    effect: "Associated with increased bleeding",
    recommendation: "Should be avoided with all DOACs.",
    severity: "amber",
  },
  {
    drug: "Strong P-gp / CYP3A4 inhibitors",
    effect: "Increased DOAC levels",
    recommendation: "Drug-specific adjustments — consult product monograph. Varies by DOAC.",
    severity: "amber",
  },
  {
    drug: "Strong P-gp / CYP3A4 inducers",
    effect: "Reduced DOAC levels",
    recommendation: "Avoid with all DOACs (e.g., rifampin, phenytoin, carbamazepine).",
    severity: "red",
  },
];

const renalDosingAF = [
  {
    doac: "Dabigatran",
    standard: "150 mg BID",
    reduced: "110 mg BID if age ≥80 or concomitant verapamil",
    cutoff: "Contraindicated if CrCl <30 mL/min",
  },
  {
    doac: "Apixaban",
    standard: "5 mg BID",
    reduced: "2.5 mg BID if ≥2 of: age ≥80, weight ≤60 kg, Cr ≥133 µmol/L",
    cutoff: "Use with caution if CrCl <25 mL/min; limited data",
  },
  {
    doac: "Rivaroxaban",
    standard: "20 mg daily with food",
    reduced: "15 mg daily if CrCl 15–49 mL/min",
    cutoff: "Avoid if CrCl <15 mL/min",
  },
  {
    doac: "Edoxaban",
    standard: "60 mg daily",
    reduced: "30 mg daily if CrCl 15–50 mL/min, weight ≤60 kg, or concomitant P-gp inhibitor",
    cutoff: "Avoid if CrCl <15 mL/min or CrCl >95 mL/min (reduced efficacy)",
  },
];

const switchingRules = [
  { doac: "Dabigatran", rule: "Start when INR <2.0" },
  { doac: "Apixaban", rule: "Start when INR <2.0" },
  { doac: "Rivaroxaban", rule: "Start when INR ≤2.5" },
  { doac: "Edoxaban", rule: "Start when INR ≤2.5" },
  { doac: "If INR unavailable", rule: "Wait 2–3 days after last warfarin dose before starting any DOAC" },
];

const references = [
  "Agnelli G, et al. Oral apixaban for the treatment of acute venous thromboembolism. N Engl J Med. 2013;369:799-808.",
  "Connolly SJ, et al. Dabigatran versus warfarin in patients with atrial fibrillation. N Engl J Med. 2009;361:1139-1151.",
  "Granger CB, et al. Apixaban versus warfarin in patients with atrial fibrillation. N Engl J Med. 2011;365:981-992.",
  "Giugliano RP, et al. Edoxaban versus warfarin in patients with atrial fibrillation. N Engl J Med. 2013;369:2093-2104.",
  "Patel MR, et al. Rivaroxaban versus warfarin in nonvalvular atrial fibrillation. N Engl J Med. 2011;365:883-891.",
  "Schulman S, et al. Dabigatran versus warfarin in the treatment of acute venous thromboembolism. N Engl J Med. 2009;361:2342-2352.",
  "EINSTEIN Investigators. Oral rivaroxaban for symptomatic venous thromboembolism. N Engl J Med. 2010;363:2499-2510.",
  "Hokusai-VTE Investigators. Edoxaban versus warfarin for the treatment of symptomatic venous thromboembolism. N Engl J Med. 2013;369:1406-1415.",
  "Lip GYH, et al. Effectiveness and safety of oral anticoagulants among nonvalvular atrial fibrillation patients. Stroke. 2018;49:2933-2944.",
  "Steffel J, et al. 2021 European Heart Rhythm Association practical guide on the use of NOACs in patients with atrial fibrillation. Eur Heart J. 2021;42:3227-3335.",
  "Thrombosis Canada. DOACs: Comparison and Frequently-asked Questions. thrombosiscanada.ca. Accessed 2024.",
];

export function DoacsComparisonGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Clinical Guide</span>
            <span className="asa-badge">Thrombosis Canada</span>
          </div>
          <h1 className="asa-guide-title">DOACs: Comparison and Frequently-Asked Questions</h1>
          <p className="asa-guide-lead">
            Practical comparison of apixaban, dabigatran, edoxaban, and rivaroxaban — dosing, drug interactions, monitoring, renal adjustments, and emergency management.
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
            <div className="asa-section-card">
              <h2 className="asa-section-title">Background</h2>
              <p className="asa-section-copy">
                Direct oral anticoagulants (DOACs) — <strong>apixaban</strong>, <strong>dabigatran</strong>, <strong>edoxaban</strong>, and <strong>rivaroxaban</strong> — are used for prevention and treatment of venous thromboembolism (VTE) and stroke prevention in atrial fibrillation (AF).
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Advantages Over Warfarin</h2>
              <ul className="asa-ind-list">
                <li>Fixed dosing — no dose titration required</li>
                <li>No routine coagulation monitoring needed</li>
                <li>Fewer drug interactions than warfarin</li>
                <li>No dietary interactions</li>
                <li>Rapid onset and offset of action</li>
              </ul>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Important:</strong> Like warfarin, all DOACs increase bleeding risk and require close clinical monitoring. There are no head-to-head randomised controlled trials comparing one DOAC to another — all have been compared to warfarin.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Observational Data</h2>
              <p className="asa-section-copy">
                Large observational studies suggest lower rates of major bleeding with <strong>apixaban</strong> compared to <strong>rivaroxaban</strong>. However, this has not been confirmed in randomised controlled trials, and selection bias cannot be excluded.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">DOAC Properties Comparison</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Dabigatran</th>
                      <th>Apixaban</th>
                      <th>Rivaroxaban</th>
                      <th>Edoxaban</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doacProperties.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.property}</strong></td>
                        <td style={{ fontSize: "0.87em" }}>{row.dabigatran}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.apixaban}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.rivaroxaban}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.edoxaban}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRACTICAL ISSUES */}
        {activeTab === "practical" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Meals</h2>
              <p className="asa-section-copy">
                <strong>Rivaroxaban 15 mg and 20 mg MUST be taken with meals</strong> to ensure adequate absorption. All other DOACs can be taken with or without food. Taking dabigatran with meals may reduce dyspepsia.
              </p>
            </div>

            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>Dabigatran capsules:</strong> Must NOT be opened, crushed, or chewed. Dabigatran must remain in its original blister packaging (moisture sensitive) and CANNOT be placed in dosette boxes or administered through enteral feeding tubes.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Crushing and Administration</h2>
              <ul className="asa-ind-list">
                <li><strong>Apixaban:</strong> Can be crushed. Can be administered through enteral feeding tubes (crushed in D5W).</li>
                <li><strong>Rivaroxaban:</strong> Can be crushed. Can be administered through enteral feeding tubes (if tube tip is in the stomach).</li>
                <li><strong>Edoxaban:</strong> Can be crushed. Can be administered through enteral feeding tubes.</li>
                <li><strong>Dabigatran:</strong> CANNOT be crushed, opened, or administered through tubes.</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Dosette / Pill Organiser</h2>
              <ul className="asa-ind-list">
                <li>Apixaban, edoxaban, and rivaroxaban can be placed in a dosette box.</li>
                <li><strong>Dabigatran must stay in its original blister pack</strong> due to moisture sensitivity.</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Missed Doses</h2>
              <p className="asa-section-copy">
                <strong>General rule:</strong> Do not double the next dose. Take the missed dose as soon as remembered if there is enough time before the next scheduled dose.
              </p>
              <div className="asa-alert asa-alert-blue">
                <strong>Exception:</strong> For <strong>rivaroxaban 15 mg BID</strong> (first 3 weeks of VTE treatment) and <strong>apixaban 10 mg BID</strong> (first 7 days of VTE treatment), the missed dose may be taken the same day to maintain adequate initial anticoagulation intensity.
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Prosthetic Heart Valves</h2>
              <div className="asa-alert asa-alert-red">
                <strong>DOACs are CONTRAINDICATED with mechanical heart valves.</strong>
              </div>
              <p className="asa-section-copy" style={{ marginTop: "0.75rem" }}>
                DOACs may be used in patients with <strong>bioprosthetic heart valves</strong> who require anticoagulation for VTE or AF, once the high-risk period post-implantation has passed.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Dental Procedures</h2>
              <p className="asa-section-copy">
                For <strong>minor dental work</strong>, it is probably safe to continue the DOAC. Consider prescribing <strong>tranexamic acid mouthwash</strong> for local haemostasis. For major dental surgery or high bleeding-risk procedures, consult the perioperative DOAC management guide.
              </p>
            </div>
          </div>
        )}

        {/* DRUG INTERACTIONS */}
        {activeTab === "interactions" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Key Drug Interactions</h2>
              <p className="asa-section-copy">
                DOAC interactions vary by <strong>P-glycoprotein (P-gp)</strong> and <strong>CYP3A4</strong> metabolic pathways. Dabigatran is primarily a P-gp substrate. Apixaban and rivaroxaban are metabolised by both P-gp and CYP3A4. Edoxaban is primarily a P-gp substrate.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Interaction Summary</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Drug / Class</th>
                      <th>Effect</th>
                      <th>Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interactionRows.map((row, i) => (
                      <tr key={i}>
                        <td>
                          <strong>{row.drug}</strong>
                          {row.severity === "red" && (
                            <span className="asa-badge asa-badge-red" style={{ marginLeft: "0.5rem", fontSize: "0.7em" }}>Avoid</span>
                          )}
                          {row.severity === "amber" && (
                            <span className="asa-badge asa-badge-amber" style={{ marginLeft: "0.5rem", fontSize: "0.7em" }}>Caution</span>
                          )}
                          {row.severity === "green" && (
                            <span className="asa-badge asa-badge-blue" style={{ marginLeft: "0.5rem", fontSize: "0.7em" }}>Safe</span>
                          )}
                        </td>
                        <td style={{ fontSize: "0.87em" }}>{row.effect}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Always check:</strong> Before prescribing or modifying a DOAC, review the patient's full medication list for P-gp and CYP3A4 interactions. Consult the product monograph for drug-specific guidance.
            </div>
          </div>
        )}

        {/* MONITORING */}
        {activeTab === "monitoring" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Routine Follow-Up</h2>
              <p className="asa-section-copy">
                Patients on DOACs should be reviewed <strong>every 6 to 12 months</strong>. At each visit:
              </p>
              <ul className="asa-ind-list">
                <li>Confirm ongoing indication for anticoagulation</li>
                <li>Check for bleeding complications and assess bleeding risk</li>
                <li>Order CBC and creatinine (renal function may change DOAC dose requirements)</li>
                <li>Review concomitant medications for new interactions</li>
                <li>Assess and reinforce adherence</li>
              </ul>
            </div>

            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>No routine coagulation testing:</strong> DOACs do not require routine INR, aPTT, or anti-Xa monitoring. Coagulation tests are variably affected by DOACs and must be interpreted with caution.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Effect on Coagulation Tests</h2>
              <p className="asa-section-copy">
                DOACs variably affect PT/INR and aPTT. A <strong>normal PT/INR or aPTT does NOT reliably exclude therapeutic DOAC levels</strong>. Cautious interpretation is required — these tests should not be used to guide DOAC dosing.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Switching from Warfarin to a DOAC</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>DOAC</th>
                      <th>When to start after stopping warfarin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {switchingRules.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.doac}</strong></td>
                        <td style={{ fontSize: "0.87em" }}>{row.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* EMERGENCIES */}
        {activeTab === "emergencies" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>Emergency situations on DOACs require prompt multidisciplinary consultation.</strong> The clinical history of the last DOAC dose is the single most important piece of information.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute Ischaemic Stroke on a DOAC</h2>
              <ul className="asa-ind-list">
                <li>Assess compliance and timing of the last DOAC dose</li>
                <li>Consider thrombolysis if sufficient time has elapsed since the last dose</li>
                <li><strong>A normal aPTT or INR is NOT reliable</strong> to clear a patient for thrombolysis — clinical history of the last DOAC dose is the best tool</li>
                <li>Consult neurology urgently</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute Coronary Syndrome on a DOAC</h2>
              <ul className="asa-ind-list">
                <li>Manage as for other ACS patients</li>
                <li>Consult cardiology regarding anticoagulation management during ACS treatment</li>
                <li>Consider DOAC timing and bleeding risk when planning invasive procedures</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Major Trauma or Serious Bleeding</h2>
              <ul className="asa-ind-list">
                <li>Provide supportive care and treat the underlying cause of bleeding</li>
                <li><strong>Dabigatran:</strong> Idarucizumab (Praxbind) — specific reversal agent</li>
                <li><strong>Factor Xa inhibitors (apixaban, rivaroxaban, edoxaban):</strong> Prothrombin complex concentrate (PCC)</li>
                <li>Consult haematology for guidance on reversal and ongoing management</li>
              </ul>
              <div className="asa-alert asa-alert-amber" style={{ marginTop: "0.75rem" }}>
                <strong>Andexanet alfa:</strong> Approved for reversal of apixaban and rivaroxaban in some jurisdictions but not widely available. PCC remains the most accessible option for factor Xa inhibitor reversal.
              </div>
            </div>
          </div>
        )}

        {/* RENAL DOSING */}
        {activeTab === "renal" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Importance of Renal Function</h2>
              <p className="asa-section-copy">
                All DOACs have some degree of renal elimination. Dose adjustments are critical to avoid drug accumulation and increased bleeding risk. <strong>Renal function should be monitored at least annually</strong>, and more frequently in patients with CrCl 30-60 mL/min or declining renal function.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">AF Dosing by Creatinine Clearance</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>DOAC</th>
                      <th>Standard dose</th>
                      <th>Reduced dose criteria</th>
                      <th>Renal cutoff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renalDosingAF.map((row, i) => (
                      <tr key={i}>
                        <td><strong>{row.doac}</strong></td>
                        <td style={{ fontSize: "0.87em" }}>{row.standard}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.reduced}</td>
                        <td style={{ fontSize: "0.87em" }}>{row.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">VTE Treatment — Renal Considerations</h2>
              <ul className="asa-ind-list">
                <li><strong>Edoxaban:</strong> Reduce to 30 mg daily if CrCl 30–50 mL/min</li>
                <li><strong>Apixaban, rivaroxaban, dabigatran:</strong> No dose reduction for VTE treatment based on renal function alone (standard contraindication thresholds still apply)</li>
              </ul>
            </div>

            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>When uncertain:</strong> Consult a thrombosis specialist or clinical pharmacist for guidance on DOAC selection and dosing in patients with impaired or changing renal function.
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
              <p className="asa-section-copy" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Source: Thrombosis Canada Clinical Guides — thrombosiscanada.ca. Not a substitute for individual clinical judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
