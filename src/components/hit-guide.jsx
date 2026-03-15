import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "fourst", label: "4Ts Score" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "management", label: "Management" },
  { id: "agents", label: "HIT-safe Agents" },
  { id: "special", label: "Special Populations" },
  { id: "references", label: "References" },
];

const fourTsRows = [
  {
    criterion: "Thrombocytopenia",
    twoPoints: "Platelet fall >50% AND nadir ≥20 × 10⁹/L",
    onePoint: "Platelet fall 30–50% OR nadir 10–19 × 10⁹/L",
    zeroPoints: "Platelet fall <30% OR nadir <10 × 10⁹/L",
  },
  {
    criterion: "Timing of platelet fall",
    twoPoints: "Days 5–10; or ≤1 day if prior heparin within 30 days",
    onePoint: "Consistent with days 5–10 (not confirmed); onset after day 10; or ≤1 day if prior heparin 30–100 days ago",
    zeroPoints: "Platelet fall <4 days without recent heparin",
  },
  {
    criterion: "Thrombosis or other sequelae",
    twoPoints: "New proven thrombosis, skin necrosis, or acute systemic reaction after IV heparin bolus",
    onePoint: "Progressive or recurrent thrombosis; erythematous skin lesions; suspected thrombosis (not yet proven)",
    zeroPoints: "None",
  },
  {
    criterion: "oTher causes of thrombocytopenia",
    twoPoints: "No other cause evident",
    onePoint: "Possible other cause",
    zeroPoints: "Definite other cause present",
  },
];

const hitAgents = [
  {
    agent: "Fondaparinux",
    class: "Anti-Xa (synthetic pentasaccharide)",
    dose: "5–10 mg SC daily (weight-based for acute VTE)",
    notes: "Widely used; caution in severe renal impairment (CrCl <30); off-label for HIT but strong evidence",
    availability: "Widely available",
    badge: "first-line",
  },
  {
    agent: "Rivaroxaban",
    class: "Oral anti-Xa DOAC",
    dose: "Acute VTE regimen if HITT: 15 mg BID × 3 weeks → 20 mg OD",
    notes: "Largest DOAC evidence base in HIT; convenient oral option once patient stable",
    availability: "Widely available",
    badge: "first-line",
  },
  {
    agent: "Apixaban",
    class: "Oral anti-Xa DOAC",
    dose: "Acute VTE regimen if HITT: 10 mg BID × 7 days → 5 mg BID",
    notes: "Less data than rivaroxaban but used; convenient oral",
    availability: "Widely available",
    badge: "second-line",
  },
  {
    agent: "Dabigatran",
    class: "Oral direct thrombin inhibitor",
    dose: "Requires lead-in; 150 mg BID after parenteral anticoagulation",
    notes: "Less evidence than rivaroxaban/apixaban in HIT; requires initial parenteral agent",
    availability: "Widely available",
    badge: "second-line",
  },
  {
    agent: "Argatroban",
    class: "IV direct thrombin inhibitor",
    dose: "2 µg/kg/min IV continuous infusion (adjust to aPTT 1.5–3× baseline; lower dose in hepatic impairment)",
    notes: "Increases INR — caution when transitioning to warfarin. Used in ICU/procedural settings. Hepatically cleared.",
    availability: "Requires pharmacy preparation",
    badge: "specialist",
  },
  {
    agent: "Bivalirudin",
    class: "IV direct thrombin inhibitor",
    dose: "0.15–0.2 mg/kg/hr IV (renally adjusted)",
    notes: "Preferred for cardiac surgery, PCI, and patients with renal failure. Short half-life.",
    availability: "Specialist/procedural use",
    badge: "specialist",
  },
  {
    agent: "Danaparoid",
    class: "Heparinoid (anti-Xa)",
    dose: "Per product monograph (bolus + infusion or fixed SC dosing)",
    notes: "Not available in Canada. Preferred for pregnancy (does not cross placenta).",
    availability: "Not available in Canada",
    badge: "unavailable",
  },
];

const managementSteps = [
  {
    step: "Stop all heparin",
    detail: "Stop UFH and LMWH immediately. Discontinue prophylactic heparin, heparin locks/flushes. Remove heparin-coated catheters.",
    urgency: "Immediate",
  },
  {
    step: "Start non-heparin anticoagulant",
    detail: "Fondaparinux, DOAC, argatroban, bivalirudin, or danaparoid. If HITT (HIT + thrombosis), use acute VTE dosing regimen.",
    urgency: "Immediate",
  },
  {
    step: "Investigate for thrombosis",
    detail: "Patients with suspected VTE/ATE should have objective confirmation. Consider bilateral leg CUS even without clinical DVT suspicion, especially with additional VTE risk factors.",
    urgency: "Urgent",
  },
  {
    step: "Avoid platelet transfusion",
    detail: "Only if active bleeding or very high-risk procedure. Platelet transfusions may fuel the prothrombotic state.",
    urgency: "Ongoing",
  },
  {
    step: "Avoid early warfarin",
    detail: "Warfarin in acute HIT may worsen the prothrombotic state (depletes Protein C before thrombin generation is controlled). If already started, stop and give vitamin K to reverse. Warfarin alone insufficient while platelets <150 × 10⁹/L.",
    urgency: "Critical",
  },
  {
    step: "Transition to warfarin/DOAC",
    detail: "Only after platelet count ≥150 × 10⁹/L. Overlap warfarin with HIT-safe agent for ≥5 days and until INR therapeutic (note: argatroban also raises INR — careful timing).",
    urgency: "When platelet recovered",
  },
];

const references = [
  "Cuker A, et al. ASH 2018 guidelines for management of VTE: heparin-induced thrombocytopenia. Blood Adv 2018;2(22):3360-3392.",
  "Greinacher A. Heparin-induced thrombocytopenia. N Engl J Med 2015;373(3):252-261.",
  "Kelton JG, et al. Non-heparin anticoagulants for HIT. N Engl J Med 2013;368(8):737-744.",
  "Linkins LA, et al. Treatment and prevention of HIT: ACCP Evidence-Based Clinical Practice Guidelines 9th ed. Chest 2012;141(2 Suppl):e495S-530S.",
  "Linkins LA, et al. Combination of 4Ts score and PF4/H-PaGIA for diagnosis and management of HIT. Blood 2015;126(5):597-603.",
  "Linkins LA. Heparin induced thrombocytopenia. BMJ 2015;350:g7566.",
  "Linkins LA, et al. Systematic review of fondaparinux for HIT. Res Pract Thromb Haemost 2018;2(4):678-683.",
  "Warkentin TE, et al. Direct oral anticoagulants for treatment of HIT: update of Hamilton experience. Blood 2017;130:1104-1113.",
  "Davis KA, et al. DOACs for treatment of suspected HIT. Eur J Haematol 2017;99(4):332-335.",
  "McGowan KE, et al. Reducing hospital burden of HIT: impact of avoid-heparin program. Blood 2016;127(16):1954-1959.",
];

const badgeClass = (b) => {
  if (b === "first-line") return "asa-badge asa-badge-blue";
  if (b === "second-line") return "asa-badge asa-badge-amber";
  if (b === "specialist") return "asa-badge asa-badge-orange";
  if (b === "unavailable") return "asa-badge asa-badge-red";
  return "asa-badge";
};

export function HitGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-red">Urgent Consideration</span>
            <span className="asa-badge">Thrombosis Canada · Version 39</span>
          </div>
          <h1 className="asa-guide-title">Heparin-Induced Thrombocytopenia (HIT)</h1>
          <p className="asa-guide-lead">
            Immune-mediated prothrombotic adverse drug reaction to heparin — diagnosis using 4Ts score and HIT assays, urgent management with non-heparin anticoagulants.
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
            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>Clinical emergency:</strong> Suspected HIT requires immediate cessation of <em>all</em> heparin and commencement of a non-heparin anticoagulant — do not wait for lab results if intermediate or high pre-test probability.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Pathophysiology</h2>
              <p className="asa-section-copy">
                HIT is caused by IgG antibodies directed against <strong>platelet factor 4 (PF4) bound to heparin</strong>. These antibodies cause: intravascular platelet aggregation, intense activation of platelets, monocytes, and endothelial cells, and excessive thrombin generation — a highly prothrombotic state despite low platelet count.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Epidemiology & Clinical Features</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Incidence with UFH &gt;4 days</span>
                  <span className="asa-ae-value">Up to 5%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Incidence with LMWH</span>
                  <span className="asa-ae-value">&lt;1%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Platelet fall onset</span>
                  <span className="asa-ae-value">Days 5–10 after heparin start (or &lt;24h if prior heparin in last 3 months)</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Thrombosis risk</span>
                  <span className="asa-ae-value" style={{ color: "#dc2626" }}>30–50% — venous AND arterial</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Bleeding</span>
                  <span className="asa-ae-value">Very infrequent despite low platelet count</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Less Common HIT Manifestations</h2>
              <ul className="asa-ind-list">
                <li>Heparin-induced skin lesions (erythema, necrosis at injection sites)</li>
                <li>Adrenal haemorrhagic infarction (bilateral adrenal vein thrombosis → haemodynamic collapse)</li>
                <li>Transient global amnesia</li>
                <li>Acute systemic reaction after IV heparin bolus (chills, dyspnoea, cardiorespiratory arrest)</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4Ts SCORE */}
        {activeTab === "fourst" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">4Ts Pre-Test Probability Score</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th style={{ textAlign: "center" }}>2 points</th>
                    <th style={{ textAlign: "center" }}>1 point</th>
                    <th style={{ textAlign: "center" }}>0 points</th>
                  </tr>
                </thead>
                <tbody>
                  {fourTsRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.criterion}</strong></td>
                      <td style={{ fontSize: "0.87em" }}>{r.twoPoints}</td>
                      <td style={{ fontSize: "0.87em" }}>{r.onePoint}</td>
                      <td style={{ fontSize: "0.87em" }}>{r.zeroPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Score Interpretation</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#16a34a" }}>Low (0–3)</span>
                  <span className="asa-ae-value">HIT unlikely; lab testing often not required (high NPV); continue heparin cautiously</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#d97706" }}>Intermediate (4–5)</span>
                  <span className="asa-ae-value">HIT possible; stop heparin; start HIT-safe anticoagulant; send immunoassay</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#dc2626" }}>High (6–8)</span>
                  <span className="asa-ae-value">HIT likely; stop heparin immediately; start HIT-safe anticoagulant; send both immunoassay AND functional assay</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIAGNOSIS */}
        {activeTab === "diagnosis" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Diagnostic Criteria for HIT</h2>
              <ul className="asa-ind-list">
                <li>Patient is receiving or has had recent UFH or LMWH exposure (within the last 100 days)</li>
                <li>At least one clinical feature: significant platelet count fall <strong>AND/OR</strong> new venous/arterial thrombosis</li>
                <li>Laboratory evidence of HIT antibodies</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Laboratory Tests</h2>
              <div className="asa-sections" style={{ gap: "0.75rem" }}>
                {[
                  {
                    type: "Immunologic assay",
                    examples: "ELISA, particle gel immunoassay, latex particle agglutination",
                    sensitivity: ">90%",
                    specificity: "Low (many false positives)",
                    availability: "Usually available urgently at most centres",
                    use: "Initial test; high NPV but low PPV",
                  },
                  {
                    type: "Functional assay",
                    examples: "Serotonin Release Assay (SRA), Heparin-Induced Platelet Aggregation (HIPA)",
                    sensitivity: ">90%",
                    specificity: "High (gold standard)",
                    availability: "Often send-out to reference lab; not available urgently",
                    use: "Confirmatory; order if immunoassay positive or clinical/lab discordance",
                  },
                ].map((t, i) => (
                  <div key={i} className="asa-section-card" style={{ margin: 0, borderLeft: "3px solid var(--primary)" }}>
                    <strong>{t.type}</strong>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.87em" }}><strong>Examples:</strong> {t.examples}</p>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.87em" }}>
                      <span style={{ color: "#16a34a" }}>Sensitivity: {t.sensitivity}</span> |
                      <span style={{ color: "#dc2626" }}> Specificity: {t.specificity}</span>
                    </p>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.87em" }}><strong>Availability:</strong> {t.availability}</p>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.87em", fontStyle: "italic" }}>{t.use}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Positive immunoassay?</strong> Order a functional assay if available (locally or as send-out) — the majority of positive immunoassay patients do <em>not</em> have true HIT. If unavailable, diagnose based on 4Ts probability and immunoassay positivity degree. Consult thrombosis specialist.
            </div>
          </div>
        )}

        {/* MANAGEMENT */}
        {activeTab === "management" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Management Checklist</h2>
              <div className="asa-timeline">
                {managementSteps.map((s, i) => (
                  <div key={i} className="asa-timeline-step">
                    <div className="asa-timeline-marker" style={{ background: s.urgency === "Immediate" || s.urgency === "Critical" ? "#dc2626" : undefined }}>
                      {i + 1}
                    </div>
                    <div className="asa-timeline-content">
                      <strong>{s.step}</strong>
                      <span className={`asa-badge ${s.urgency === "Immediate" || s.urgency === "Critical" ? "asa-badge-red" : "asa-badge-amber"}`} style={{ marginLeft: "0.5rem" }}>{s.urgency}</span>
                      <p style={{ margin: "0.3rem 0 0", fontSize: "0.9em" }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Duration of Anticoagulation</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">HIT with thrombosis (HITT)</span>
                  <span className="asa-ae-value">Minimum <strong>3 months</strong> (similar to provoked VTE)</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">HIT without thrombosis</span>
                  <span className="asa-ae-value">Minimum <strong>4 weeks</strong> and until platelet count recovers to baseline</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HIT-SAFE AGENTS */}
        {activeTab === "agents" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Non-Heparin Anticoagulants for HIT</h2>
              {hitAgents.map((a, i) => (
                <div key={i} className="asa-section-card" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                    <strong>{a.agent}</strong>
                    <span className={badgeClass(a.badge)}>{a.badge.replace("-", " ")}</span>
                  </div>
                  <p style={{ margin: "0 0 0.2rem", fontSize: "0.87em", color: "#6b7280" }}>{a.class} | {a.availability}</p>
                  <p style={{ margin: "0 0 0.2rem", fontSize: "0.87em" }}><strong>Dose:</strong> {a.dose}</p>
                  <p style={{ margin: 0, fontSize: "0.87em" }}>{a.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIAL POPULATIONS */}
        {activeTab === "special" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Pediatrics</h2>
              <ul className="asa-ind-list">
                <li>HIT incidence is lower than in adults, but investigation and management approach is similar</li>
                <li>Paediatrician with thromboembolism expertise should manage where possible</li>
                <li>If unavailable: neonatologist/paediatrician + adult haematologist + remote consultation with paediatric haematology expert</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Pregnancy</h2>
              <ul className="asa-ind-list">
                <li>HIT is infrequent in pregnancy; investigate as outlined above</li>
                <li><strong>Danaparoid:</strong> Does not cross placenta — preferred in pregnancy where available (not available in Canada)</li>
                <li><strong>Fondaparinux:</strong> Option where danaparoid unavailable; crosses placenta in small amounts; very limited first-trimester data</li>
                <li><strong>Argatroban:</strong> Described in pregnant patients with HIT — specialist guidance required</li>
                <li><strong>DOACs:</strong> Contraindicated in pregnancy and breastfeeding</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Future Heparin Exposure</h2>
              <p className="asa-section-copy">
                <strong>Heparin or LMWH should not be given to any patient with previous HIT without prior consultation with a thrombosis specialist.</strong> In exceptional circumstances (e.g., cardiac surgery), short-term heparin may be considered — this requires specialist management.
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
                Source: Thrombosis Canada Clinical Guides — thrombosiscanada.ca | Version 39, updated 2024-09-10. Not a substitute for individual clinical judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
