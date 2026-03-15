import { useState } from "react";

const tabs = [
  "Overview",
  "Provoked VTE",
  "Unprovoked VTE",
  "Persistent Risk Factors",
  "Summary Table",
  "References",
];

const bleedingRiskFactors = [
  "Age > 65 years",
  "Prior bleeding event (especially GI or intracranial)",
  "Active GI disease (e.g., peptic ulcer, IBD, GI malignancy)",
  "Renal insufficiency (creatinine clearance < 30 mL/min)",
  "Liver disease",
  "Thrombocytopenia (platelets < 100 × 10⁹/L)",
  "Concurrent antiplatelet therapy",
  "Active cancer",
  "Recent surgery or trauma",
  "Frequent falls or high fall risk",
];

const transientRiskFactors = [
  { factor: "Major surgery (>30 min general anaesthesia)", risk: "Surgical / Major", recurrence: "~1% per year" },
  { factor: "Hip or knee replacement", risk: "Surgical / Major", recurrence: "~1% per year" },
  { factor: "Major trauma or fracture", risk: "Surgical / Major", recurrence: "~1% per year" },
  { factor: "Prolonged hospitalization (≥3 days)", risk: "Non-surgical / Minor", recurrence: "~3% per year" },
  { factor: "Estrogen-containing OCP or HRT", risk: "Non-surgical / Minor", recurrence: "~4% by 5 years*" },
  { factor: "Long-haul travel (≥8 hours)", risk: "Non-surgical / Minor", recurrence: "~3% per year" },
  { factor: "Plaster cast immobilization", risk: "Non-surgical / Minor", recurrence: "~3% per year" },
  { factor: "Pregnancy / postpartum", risk: "Non-surgical / Minor", recurrence: "Variable" },
];

const recurrenceTable = [
  { category: "Provoked by major surgical factor", year1: "~1%", year5: "~3%", year10: "~5%" },
  { category: "Provoked by non-surgical minor factor", year1: "~3%", year5: "~7%", year10: "~10%" },
  { category: "Unprovoked first event (male)", year1: "~10%", year5: "~30%", year10: "~45%" },
  { category: "Unprovoked first event (female)", year1: "~5%", year5: "~15%", year10: "~25%" },
  { category: "Second unprovoked VTE", year1: "~15%", year5: "~45%", year10: "~60%" },
];

const prognosticModels = [
  {
    name: "HERDOO2",
    population: "Women with first unprovoked VTE",
    criteria: [
      "Post-thrombotic symptoms (skin changes, leg pain)",
      "D-dimer ≥ 250 μg/L on VIDAS assay (while on VKA)",
      "Obesity (BMI ≥ 30)",
      "Older age (≥ 65 years)",
    ],
    interpretation: "Score < 2 = low recurrence risk → may stop anticoagulation. Score ≥ 2 = extended treatment. Note: validated in women only; VIDAS D-dimer assay required; limited data in women ≥ 50 years.",
    badge: "Women only",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    name: "DASH",
    population: "Both sexes, first unprovoked DVT or PE",
    criteria: [
      "D-dimer positive after stopping anticoagulation (+2 points)",
      "Age ≤ 50 years (+1 point)",
      "Male sex (+1 point)",
      "Hormone-related event in women (−2 points)",
    ],
    interpretation: "Score ≤ 1 = low risk (can consider stopping). Score ≥ 3 = high risk (continue indefinitely). Note: patients > 65 years had > 5% recurrence even at lowest score.",
    badge: "Both sexes",
    badgeClass: "asa-badge asa-badge-amber",
  },
  {
    name: "Vienna Prediction Model",
    population: "Both sexes, first unprovoked DVT or PE",
    criteria: [
      "Sex (male = higher risk)",
      "Site of index event (PE = higher risk than DVT)",
      "D-dimer level at anticoagulation discontinuation",
    ],
    interpretation: "Uses nomogram to calculate risk at 1 year and 12 years. Externally validated but no clinical impact study. Provides individualized risk estimate for shared decision making.",
    badge: "Nomogram",
    badgeClass: "asa-badge asa-badge-orange",
  },
];

const persistentFactors = [
  {
    factor: "Active cancer",
    recommendation: "Indefinite anticoagulation if bleeding risk acceptable",
    detail: "Risk highest with metastatic disease and patients on chemotherapy. See Cancer and Thrombosis guide.",
    badge: "Indefinite",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    factor: "Antiphospholipid antibody syndrome (APS)",
    recommendation: "Indefinite anticoagulation (warfarin preferred in high-risk APS)",
    detail: "Triple positivity or arterial thrombosis = high-risk APS. DOACs inferior in high-risk APS. Specialist consultation advised.",
    badge: "Indefinite",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    factor: "High-risk hereditary thrombophilia",
    recommendation: "May warrant indefinite anticoagulation — specialist input required",
    detail: "Includes antithrombin, protein C, protein S deficiency; homozygous FVL or double heterozygous FVL/PGM.",
    badge: "Consider indefinite",
    badgeClass: "asa-badge asa-badge-orange",
  },
  {
    factor: "Low-risk hereditary thrombophilia (heterozygous FVL or PGM)",
    recommendation: "Does NOT influence duration beyond standard recommendations",
    detail: "Heterozygosity for factor V Leiden or prothrombin G20210A is not a clinically important predictor of recurrence.",
    badge: "No effect on duration",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    factor: "IVC filter in situ",
    recommendation: "Does NOT alone extend anticoagulation duration",
    detail: "Filter presence alone should not extend anticoagulation beyond duration for the VTE that triggered insertion.",
    badge: "No effect on duration",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    factor: "Residual DVT on ultrasound",
    recommendation: "Does NOT alone determine duration of anticoagulation",
    detail: "Detected in ~⅓ of patients. May slightly increase recurrence likelihood, but not sufficient alone to drive decision.",
    badge: "Insufficient alone",
    badgeClass: "asa-badge asa-badge-blue",
  },
];

const summaryRows = [
  { scenario: "Provoked by major surgery (resolved)", duration: "3 months", extended: "Not recommended", notes: "Lowest recurrence risk" },
  { scenario: "Provoked by non-surgical minor factor (resolved)", duration: "3 months", extended: "Not recommended (consider if ≥2 minor factors)", notes: "*Estrogen-related ~4% by 5 years" },
  { scenario: "First unprovoked proximal DVT or PE (female, low recurrence score)", duration: "≥ 3 months", extended: "Consider stopping — use HERDOO2/DASH + patient preference", notes: "~5–15% by 5 years" },
  { scenario: "First unprovoked proximal DVT or PE (male)", duration: "≥ 3 months", extended: "Extended therapy usually recommended", notes: "~30% by 5 years" },
  { scenario: "Second unprovoked VTE", duration: "≥ 3 months", extended: "Indefinite strongly recommended (if bleeding risk acceptable)", notes: "~45% by 5 years" },
  { scenario: "Active cancer-associated VTE", duration: "While cancer active", extended: "Indefinite (continue as long as cancer active)", notes: "See Cancer and Thrombosis guide" },
  { scenario: "APS (high-risk: triple positive or arterial)", duration: "While APS present", extended: "Indefinite — warfarin preferred", notes: "DOACs inferior in high-risk APS" },
  { scenario: "High-risk hereditary thrombophilia", duration: "≥ 3 months", extended: "Consider indefinite — specialist input needed", notes: "AT/PC/PS deficiency; homo FVL; double heterozygote" },
  { scenario: "Isolated distal DVT (cancer)", duration: "≥ 3 months", extended: "Consider ≥ 12 months (ONCO DVT study)", notes: "Edoxaban 12 vs 3 months benefit" },
];

const references = [
  "Agnelli G, et al. Apixaban for extended treatment of VTE. N Engl J Med 2013;368(8):699-708.",
  "Carrier M, et al. Case-fatality rates of recurrent VTE and major bleeding. Ann Intern Med 2010;152(9):578-589.",
  "Eichinger S, et al. The Vienna prediction model. Circulation. 2010;121:1630-1636.",
  "Kearon C, et al. Antithrombotic therapy for VTE disease. Chest 2016;149(2):315-352.",
  "Khan F, et al. Long-term risk of recurrent VTE after discontinuation. BMJ 2019;366:14363.",
  "Khan F, et al. Long-term risk for major bleeding during extended therapy. Ann Intern Med 2021;174:1420-1429.",
  "Rodger MA, et al. Validating the HERDOO2 rule. BMJ 2017;356:j1065.",
  "Tosetto A, et al. External validation of the DASH prediction rule. J Thromb Haemost 2017;15:1-8.",
  "Weitz J, et al. Rivaroxaban or aspirin for extended treatment of VTE. N Engl J Med 2017;376(13):1211-1222.",
  "Wells et al. Predicting major bleeding during extended anticoagulation. Blood Adv 2022;6(15):4605-4616.",
  "Yamashita Y, et al. ONCO DVT Study. Circulation. 2023;148(21):1665-1676.",
];

export function VteDurationGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada · Clinical Guide</p>
        <h1 className="asa-guide-title">VTE: Duration of Treatment</h1>
        <p className="asa-guide-lead">
          Evidence-based guidance on how long to anticoagulate after DVT or PE — balancing recurrence risk, bleeding risk, and patient preference.
        </p>
      </div>

      <div className="asa-tab-bar">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`asa-tab-btn${activeTab === i ? " active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="asa-tab-body">
        {/* OVERVIEW */}
        {activeTab === 0 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              <strong>Core principle:</strong> Minimum 3 months for all proximal DVT or PE. After 3 months, reassess — decision to continue depends on recurrence risk, bleeding risk, and patient preference.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">The 3-Month Minimum</h3>
              <p className="asa-section-copy">
                Shortening anticoagulation from 3 months to 4–6 weeks doubles the frequency of recurrent VTE in the first 6 months. The risk of recurrence after stopping is similar whether treatment was given for 3 months or 6–24 months — so 3 months is sufficient to treat the acute episode if long-term therapy is not indicated.
              </p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Key Decision Framework</h3>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">1</div>
                  <div className="asa-timeline-content">
                    <strong>Treat acute VTE for minimum 3 months</strong>
                    <p>All proximal DVT or PE require at least 3 months of anticoagulation.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">2</div>
                  <div className="asa-timeline-content">
                    <strong>Classify provoking factors</strong>
                    <p>Was the VTE provoked by a transient factor (now resolved), unprovoked, or associated with a persistent risk factor?</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">3</div>
                  <div className="asa-timeline-content">
                    <strong>Estimate recurrence risk</strong>
                    <p>Use patient sex, provocation category, and prognostic models (HERDOO2, DASH, Vienna) in unprovoked cases.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">4</div>
                  <div className="asa-timeline-content">
                    <strong>Estimate bleeding risk</strong>
                    <p>No validated tool for VTE patients; use clinical risk factor assessment (age, prior bleed, renal function, etc.).</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">5</div>
                  <div className="asa-timeline-content">
                    <strong>Shared decision making</strong>
                    <p>Involve the patient — balance their preferences, values, and quality of life concerns with quantified risk estimates.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Bleeding Risk Factors</h3>
              <p className="asa-section-copy" style={{ marginBottom: "0.75rem" }}>
                ≥2 factors = at least moderate bleeding risk. Carefully weigh extended therapy against this risk.
              </p>
              <ul className="asa-ind-list">
                {bleedingRiskFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Extended therapy dose reduction:</strong> For patients continuing rivaroxaban or apixaban beyond 6 months, dose reduction can be considered — rivaroxaban 10 mg OD or apixaban 2.5 mg BID (EINSTEIN CHOICE and AMPLIFY EXT trials; as effective and safe as standard dosing).
            </div>
          </div>
        )}

        {/* PROVOKED VTE */}
        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              VTE provoked by a <strong>transient risk factor</strong> that has resolved → generally <strong>3 months only</strong>. Stronger the provoking factor, the lower the recurrence risk.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Transient Risk Factors and Estimated Recurrence</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Provoking Factor</th>
                      <th>Category</th>
                      <th>Annual Recurrence (off AC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transientRiskFactors.map((r) => (
                      <tr key={r.factor}>
                        <td>{r.factor}</td>
                        <td>{r.risk}</td>
                        <td>{r.recurrence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="asa-section-copy" style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                *Estrogen-related VTE: ~4% by 5 years, lower than other minor provoking factors.
              </p>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Recurrence Risk by Category</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>1-Year Risk</th>
                      <th>5-Year Risk</th>
                      <th>10-Year Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recurrenceTable.map((r) => (
                      <tr key={r.category}>
                        <td>{r.category}</td>
                        <td>{r.year1}</td>
                        <td>{r.year5}</td>
                        <td>{r.year10}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Special Cases in Provoked VTE</h3>
              <ul className="asa-ind-list">
                <li><strong>Two strong provoking factors (e.g. separate surgeries):</strong> 3 months is typically recommended.</li>
                <li><strong>Two weak provoking factors (e.g. travel + hospitalization):</strong> extended therapy may be more appropriate.</li>
                <li><strong>CVC-associated VTE:</strong> treat as provoked VTE; see Central Venous Catheter-Related Thrombosis guide.</li>
                <li><strong>Isolated distal DVT:</strong> lower recurrence risk than proximal DVT or PE; shorter duration may suffice.</li>
                <li><strong>Cancer-related VTE:</strong> treat as persistent risk factor — see Persistent Risk Factors tab.</li>
              </ul>
            </div>
          </div>
        )}

        {/* UNPROVOKED VTE */}
        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              First unprovoked proximal DVT or PE: average recurrence ~10% at 1 year, ~25% at 5 years, ~36% at 10 years after stopping anticoagulation. <strong>Patient sex substantially modifies risk.</strong>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Recommendations for Unprovoked VTE</h3>
              <ul className="asa-ind-list">
                <li>Minimum 3 months of anticoagulation for all cases</li>
                <li>After 3 months: reassess recurrence risk vs. bleeding risk — consider indefinite therapy in suitable patients</li>
                <li>In <strong>men</strong> with first unprovoked proximal DVT/PE: extended therapy generally recommended (high recurrence risk)</li>
                <li>In <strong>women</strong> with first unprovoked proximal DVT/PE: use prognostic models to stratify and individualize decision</li>
                <li>Second unprovoked VTE: indefinite anticoagulation strongly recommended</li>
                <li><strong>Patient preference is essential</strong> — stop anticoagulation when benefits no longer clearly outweigh risks, or when an informed patient chooses to stop</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Prognostic Models for Recurrence Risk</h3>
              {prognosticModels.map((m) => (
                <div key={m.name} style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid var(--primary)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <strong style={{ fontSize: "1rem" }}>{m.name}</strong>
                    <span className={m.badgeClass}>{m.badge}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "0.5rem" }}>Population: {m.population}</p>
                  <ul className="asa-ind-list" style={{ marginBottom: "0.5rem" }}>
                    {m.criteria.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <p style={{ fontSize: "0.85rem" }}>{m.interpretation}</p>
                </div>
              ))}
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Limitations of prognostic models:</strong> HERDOO2 requires VIDAS D-dimer assay (not interchangeable with other assays); limited data in women ≥ 50 years. DASH shows &gt;5% recurrence in patients &gt;65 years even at the lowest score. Vienna model lacks a clinical impact study. Use in conjunction with clinical judgment and patient preference.
            </div>
          </div>
        )}

        {/* PERSISTENT RISK FACTORS */}
        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-red">
              <strong>Strong persistent risk factors (active cancer, high-risk thrombophilia, APS):</strong> indefinite anticoagulation is generally recommended if bleeding risk is acceptable.
            </div>
            {persistentFactors.map((pf) => (
              <div key={pf.factor} className="asa-section-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="asa-section-title" style={{ margin: 0 }}>{pf.factor}</h3>
                  <span className={pf.badgeClass}>{pf.badge}</span>
                </div>
                <p className="asa-section-copy" style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{pf.recommendation}</p>
                <p className="asa-section-copy">{pf.detail}</p>
              </div>
            ))}
            <div className="asa-section-card">
              <h3 className="asa-section-title">Periodic Reassessment</h3>
              <p className="asa-section-copy">
                Patients recommended indefinite anticoagulation should be reassessed at least annually to re-estimate the VTE vs. bleeding risk balance and to review patient preferences. Active cancer remission, resolution of APS antibodies (if confirmed on repeat testing), or new bleeding complications may prompt reassessment.
              </p>
            </div>
          </div>
        )}

        {/* SUMMARY TABLE */}
        {activeTab === 4 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Summary Recommendations: Duration of Anticoagulation</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Clinical Scenario</th>
                      <th>Minimum Duration</th>
                      <th>Extended / Indefinite?</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryRows.map((r) => (
                      <tr key={r.scenario}>
                        <td>{r.scenario}</td>
                        <td>{r.duration}</td>
                        <td>{r.extended}</td>
                        <td style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-blue">
              <strong>Dose reduction after 6 months:</strong> Rivaroxaban 10 mg OD or apixaban 2.5 mg BID are as effective and safe as standard doses for extended VTE prevention (EINSTEIN CHOICE and AMPLIFY EXT trials).
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Special notes:</strong><br />
              • Isolated distal DVT + cancer: consider ≥ 12 months (ONCO DVT study: edoxaban 12 vs 3 months).<br />
              • Two strong provoking factors → 3 months typical. Two weak provoking factors → consider extended therapy.<br />
              • Residual DVT on USS and IVC filter alone do NOT influence duration decisions.
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === 5 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <p className="asa-section-copy" style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                Source: Thrombosis Canada Clinical Guides | Version 87 | Updated: 2026-02-05
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
