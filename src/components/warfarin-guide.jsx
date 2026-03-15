import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "dosing", label: "Dosing" },
  { id: "monitoring", label: "Monitoring & INR" },
  { id: "interactions", label: "Drug Interactions" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const indications = [
  { indication: "Atrial fibrillation (non-valvular)", notes: "DOACs preferred; warfarin acceptable alternative" },
  { indication: "Valvular AF / rheumatic mitral stenosis", notes: "Warfarin required — DOACs not approved" },
  { indication: "Mechanical heart valves", notes: "Warfarin required — DOACs contraindicated" },
  { indication: "Acute VTE treatment", notes: "Must overlap with parenteral agent ≥5 days until INR ≥2.0 × 2 consecutive days" },
  { indication: "Long-term secondary VTE prevention", notes: "DOACs preferred; warfarin acceptable" },
  { indication: "Antiphospholipid syndrome (thrombotic)", notes: "Warfarin preferred — DOACs not recommended" },
];

const inrTargets = [
  { indication: "Most VTE and AF indications", target: "INR 2.5", range: "2.0–3.0" },
  { indication: "Mechanical mitral valve", target: "INR 3.0", range: "2.5–3.5" },
  { indication: "On-X aortic valve (after 3 months)", target: "INR 1.75", range: "1.5–2.0 + ASA" },
  { indication: "Some bileaflet aortic valves (low thrombogenicity)", target: "INR 2.5", range: "2.0–3.0" },
];

const dosageFactors = [
  "Age (elderly require lower doses)",
  "Body weight",
  "Ancestry (Asian patients often need lower doses)",
  "Nutritional status and diet consistency",
  "VKOR genetic variation (warfarin action site)",
  "CYP450 genetic variation (warfarin metabolism)",
  "Concomitant drugs",
  "Alcohol intake",
  "Comorbidities (liver disease, heart failure)",
  "Activity level",
];

const drugInteractions = [
  { drug: "Antiplatelet agents (ASA, clopidogrel)", effect: "Doubled bleeding risk", management: "Avoid unless specific indication (ACS, recent stent, mechanical valve). Carefully reassess risk/benefit." },
  { drug: "NSAIDs", effect: "Increased GI bleeding; CYP2C9 interaction increases INR", management: "Use celecoxib (COX-2 inhibitor) or NSAID + PPI if must use. Monitor INR more frequently." },
  { drug: "Antibiotics (most classes)", effect: "↑ INR (reduce Vitamin K synthesis + CYP inhibition)", management: "Check INR 3–4 days after starting; adjust warfarin dose as needed" },
  { drug: "St. John's Wort", effect: "↓ INR (CYP3A4 induction — reduces warfarin levels)", management: "Avoid; or check INR frequently if used" },
  { drug: "Alcohol", effect: "Variable — acute ↑ INR; chronic use ↓ INR", management: "Advise consistent intake; monitor INR with changes" },
  { drug: "Amiodarone", effect: "Potent ↑ INR (CYP2C9 inhibition) — may persist weeks after stopping", management: "Reduce warfarin dose (often 30–50%) when starting; monitor INR closely" },
  { drug: "Azole antifungals (fluconazole)", effect: "↑ INR (CYP2C9 inhibition)", management: "Check INR 3–4 days after starting; may need significant dose reduction" },
  { drug: "SSRIs / SNRIs", effect: "Mild ↑ bleeding risk (platelet function impairment)", management: "Extra caution if combined with other bleed risk factors; monitor INR" },
];

const references = [
  "Witt DM, et al. Guidance for practical management of warfarin therapy in VTE. J Thromb Thrombolysis 2016;41(1):187-205.",
  "Witt DM, et al. ASH 2018 guidelines: optimal management of anticoagulation therapy. Blood Adv 2018;2(22):3257-3291.",
  "Monagle P, et al. ASH 2018 guidelines: treatment of pediatric VTE. Blood Adv 2018;2(22):3292-3316.",
  "Sconce E, et al. Patients with unstable control have poorer dietary Vitamin K intake. Thromb Haemost 2005;93:872-875.",
  "Capodanno D, et al. Management of antithrombotic therapy in AF patients undergoing PCI. J Am Coll Cardiol 2019;74(1):83-99.",
];

export function WarfarinGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Thrombosis Canada</span>
            <span className="asa-badge">Version 44 · May 2025</span>
          </div>
          <h1 className="asa-guide-title">Warfarin</h1>
          <p className="asa-guide-lead">
            Mechanism, dosing, INR monitoring, drug interactions, and special situations for warfarin (vitamin K antagonist) therapy.
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
              <h2 className="asa-section-title">Mechanism of Action</h2>
              <p className="asa-section-copy">
                Warfarin inhibits hepatic production of <strong>vitamin K-dependent clotting factors II, VII, IX, and X</strong>, and also inhibits the natural anticoagulants <strong>protein C and protein S</strong>. The onset is delayed (3–7 days) as it depends on depletion of pre-existing clotting factors.
              </p>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>DOACs are generally preferred over warfarin</strong> for most VTE and AF patients — require less monitoring, equally effective, similar or less bleeding. Warfarin remains indicated in specific circumstances (see Indications below).
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Indications</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Indication</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {indications.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.indication}</strong></td>
                      <td>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Adverse Effects</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Annual major bleeding</span>
                  <span className="asa-ae-value" style={{ color: "#dc2626" }}>1–2% of chronic warfarin users</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Annual minor bleeding</span>
                  <span className="asa-ae-value">10–20% of warfarin users</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Other side effects</span>
                  <span className="asa-ae-value">Hair loss, skin rash (uncommon)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOSING */}
        {activeTab === "dosing" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Starting Dose</h2>
              <ul className="asa-ind-list">
                <li><strong>Standard starting dose:</strong> 5 mg OD (for most adults)</li>
                <li><strong>Lower starting dose (1–2 mg OD):</strong> frail, underweight, or Asian descent patients</li>
                <li>Use standardised dosing nomograms to guide initial and subsequent dose adjustments</li>
                <li>Maintenance dose varies widely: &lt;1 mg/day to &gt;20 mg/day</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Factors Affecting Maintenance Dose</h2>
              <ul className="asa-ind-list">
                {dosageFactors.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">INR Targets</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Indication</th>
                    <th>Target INR</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {inrTargets.map((r, i) => (
                    <tr key={i}>
                      <td>{r.indication}</td>
                      <td style={{ fontWeight: 700 }}>{r.target}</td>
                      <td>{r.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute VTE Initiation</h2>
              <ul className="asa-ind-list">
                <li>Warfarin must be combined with a parenteral anticoagulant (LMWH or UFH) for <strong>≥5 days AND until INR ≥2.0 for 2 consecutive days</strong></li>
                <li>Warfarin monotherapy is not acceptable as initial VTE treatment</li>
              </ul>
            </div>
          </div>
        )}

        {/* MONITORING */}
        {activeTab === "monitoring" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">INR Monitoring Frequency</h2>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">1</div>
                  <div className="asa-timeline-content">
                    <strong>Initiation</strong>
                    <p>INR after 2–3 days of first dose. Do not monitor earlier — INR change takes 3–7 days to equilibrate.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">2</div>
                  <div className="asa-timeline-content">
                    <strong>Early phase</strong>
                    <p>Frequent monitoring until stable, therapeutic INR achieved.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">3</div>
                  <div className="asa-timeline-content">
                    <strong>Stable phase</strong>
                    <p>Every 2–6 weeks in most patients. Very stable patients may extend to every 12 weeks.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">⚠</div>
                  <div className="asa-timeline-content">
                    <strong>Increase monitoring when:</strong>
                    <p>New medication added or stopped, acute illness, diet change, travel, hospitalization, bleeding event</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Common Causes of Unstable INR</h2>
              <ul className="asa-ind-list">
                <li>Overly frequent monitoring with dose changes before INR equilibrates</li>
                <li>Excessively large dose adjustments</li>
                <li>Variable vitamin K intake (low intake → labile INR; encourage <em>consistent</em> diet)</li>
                <li>New drugs, antibiotics, or supplement changes</li>
                <li>Acute infection, diarrhoea, or vomiting</li>
              </ul>
            </div>

            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>Diet key message:</strong> Patients should NOT restrict foods high in vitamin K — they should maintain a <em>regular, consistent</em> diet. Dietary restriction causes more labile INR control.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Reversal of Warfarin</h2>
              <ul className="asa-ind-list">
                <li><strong>Emergency reversal:</strong> IV vitamin K + 4-factor prothrombin complex concentrate (Octaplex®, Beriplex®)</li>
                <li><strong>Very elevated INR without bleeding:</strong> Oral vitamin K — see Warfarin: Management of Out-of-Range INR guide</li>
                <li><strong>No role for subcutaneous vitamin K</strong> (erratic absorption)</li>
              </ul>
            </div>
          </div>
        )}

        {/* DRUG INTERACTIONS */}
        {activeTab === "interactions" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Simplest approach to new drug interactions:</strong> Check INR 3–4 days after adding a new drug and adjust dose as needed. Very few drugs need to be avoided using this approach.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Key Drug Interactions</h2>
              {drugInteractions.map((d, i) => (
                <div key={i} className="asa-section-card" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <strong>{d.drug}</strong>
                  <p style={{ margin: "0.2rem 0", fontSize: "0.88em" }}>
                    <span style={{ color: "#dc2626" }}>Effect: </span>{d.effect}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.88em" }}>
                    <span style={{ color: "#16a34a" }}>Management: </span>{d.management}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Pregnancy</h2>
              <p className="asa-section-copy">
                Warfarin crosses the placenta and is <strong>teratogenic</strong> — causes fetal bleeding and increased spontaneous abortion. <strong>Generally avoided in pregnancy.</strong> Exception: some women with high-risk mechanical heart valves under co-care of thrombosis specialist and high-risk obstetrics.
              </p>
              <p className="asa-section-copy"><strong>Breastfeeding:</strong> Warfarin is safe — does not pass to breast milk in significant amounts.</p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Pediatrics</h2>
              <ul className="asa-ind-list">
                <li>Warfarin can be used for treatment and prevention of thrombosis in children</li>
                <li>Regular blood work can be difficult in small children — point-of-care INR devices are helpful</li>
                <li>Paediatric thromboembolism expertise should be involved where possible</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acenocoumarol (Sintrom®)</h2>
              <p className="asa-section-copy">
                Alternative VKA — was occasionally used for patients with non-bleeding warfarin side effects. <strong>Currently no longer available in Canada</strong> (manufacturer discontinued) but available in some other countries.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Antiplatelet Combination Therapy</h2>
              <p className="asa-section-copy">
                Adding an antiplatelet agent to warfarin <strong>doubles bleeding risk</strong> and rarely adds thrombotic protection. Only combine when there is a specific indication (ACS, recent coronary stent, mechanical valve, stroke/TIA despite therapeutic anticoagulation). Re-assess and document the risk-benefit frequently.
              </p>
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
                Source: Thrombosis Canada Clinical Guides — thrombosiscanada.ca | Version 44, updated 2025-05-01. Not a substitute for individual clinical judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
