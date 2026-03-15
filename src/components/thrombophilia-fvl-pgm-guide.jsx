import { useState } from "react";

const tabs = [
  "Overview",
  "Risk of Thrombosis",
  "When to Test",
  "Treatment & Prevention",
  "Special Populations",
  "References",
];

const mutationComparison = [
  {
    label: "Mutation",
    fvl: "G1691A in Factor V gene → FVL (APC-resistant)",
    pgm: "G20210A in prothrombin promoter → ↑ prothrombin levels",
  },
  {
    label: "Prevalence in Caucasians",
    fvl: "5–8% (heterozygous)",
    pgm: "1–4% (heterozygous)",
  },
  {
    label: "Prevalence in non-Caucasians",
    fvl: "0.45–2.2% depending on ethnicity",
    pgm: "Rare in Asian and African ancestry",
  },
  {
    label: "Homozygous / compound het.",
    fvl: "<1% of population — high risk",
    pgm: "<1% of population — high risk",
  },
  {
    label: "VTE risk (heterozygous)",
    fvl: "HR ~2–5 for first VTE; not a strong predictor of recurrence (HR <1.5)",
    pgm: "HR ~2–5 for first VTE; not a strong predictor of recurrence",
  },
  {
    label: "VTE risk (homozygous / compound het.)",
    fvl: "Much higher — significant recurrence risk",
    pgm: "Much higher — significant recurrence risk",
  },
  {
    label: "Arterial thrombosis risk",
    fvl: "Debated — overall small to insignificant",
    pgm: "Debated — overall small to insignificant",
  },
  {
    label: "Pregnancy complications",
    fvl: "NOT significantly increased in heterozygotes",
    pgm: "NOT significantly increased in heterozygotes",
  },
  {
    label: "Life expectancy",
    fvl: "Normal",
    pgm: "Normal",
  },
];

const absoluteRiskData = [
  { scenario: "No OCP, no known thrombophilia", risk: "~1 / 10,000 per year" },
  { scenario: "Combined OCP use (no thrombophilia)", risk: "~4 / 10,000 per year" },
  { scenario: "First-degree relative with VTE history (no thrombophilia found)", risk: "~8 / 10,000 per year" },
  { scenario: "Heterozygous FVL + combined OCP use", risk: "~35–40 / 10,000 per year (~0.5% per year)" },
];

const testingGuidance = [
  {
    verdict: "Test — only if result will change management",
    color: "asa-alert asa-alert-blue",
    items: [
      "Asymptomatic woman with first-degree relative with known FVL or PGM + VTE history, contemplating pregnancy or OCP use — only if result will change decision to use prophylaxis or OCP",
      "Patient with VTE where confirmation of homozygous or compound heterozygous mutation would change anticoagulation duration decision",
    ],
  },
  {
    verdict: "Do NOT test",
    color: "asa-alert asa-alert-red",
    items: [
      "Routine pre-OCP or pre-HRT screening in general population",
      "Provoked VTE where positive result would not change duration of anticoagulation",
      "Women with history of pregnancy complications (placental) — not indicated",
      "Patients with arterial vascular disease (stroke, MI) — not a risk factor",
      "Patients for whom indefinite anticoagulation is already planned regardless of result",
      "Asymptomatic children as newborn or prenatal screening",
    ],
  },
];

const preventionRows = [
  {
    population: "Heterozygous FVL or PGM — no prior VTE",
    antepartum: "No routine prophylaxis",
    postpartum: "No routine prophylaxis (unless other risk factors present)",
    ocp: "Can be considered case-by-case if no alternative contraception available — careful risk-benefit discussion",
  },
  {
    population: "Homozygous FVL or PGM — or compound heterozygote",
    antepartum: "Antepartum thromboprophylaxis usually suggested",
    postpartum: "Postpartum thromboprophylaxis usually suggested",
    ocp: "Estrogen-containing OCP generally avoided",
  },
  {
    population: "Heterozygous FVL or PGM — prior VTE",
    antepartum: "LMWH thromboprophylaxis (see Pregnancy guide)",
    postpartum: "Postpartum LMWH thromboprophylaxis",
    ocp: "Combined OCP contraindicated — use progestogen-only or non-hormonal methods",
  },
];

const references = [
  "Baglin T, et al. Clinical guidelines for testing for heritable thrombophilia. Br J Haematol. 2010;149(2):209-220.",
  "Federici EH, et al. High risk of thrombosis recurrence in homozygous and compound heterozygous FVL/PGM. Thromb Res. 2019;182:75-78.",
  "MacCallum P, et al. Diagnosis and management of heritable thrombophilia. BMJ 2014;349:g4387.",
  "Middeldorp S, et al. ASH 2023 guidelines for management of VTE: thrombophilia testing. Blood Adv. 2023;7(22):7101-7138.",
  "Rodger MA, et al. Is thrombophilia associated with placenta-mediated pregnancy complications? J Thromb Haemost. 2014;12(4):469-478.",
  "Segal JB, et al. Predictive value of FVL and prothrombin G20210A in adults with VTE. JAMA 2009;301(23):2472-2485.",
  "van Vlijmen EF, et al. Combined oral contraceptives, thrombophilias and the risk of VTE. J Thromb Haemostas 2016;14(7):1393-1403.",
  "Meijer K, Schulman S. Absence of minor risk factors for recurrent VTE. J Thromb Haemostasis 2009;7(10):1619-1628.",
];

export function ThrombophiliaFvlPgmGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada · Clinical Guide</p>
        <h1 className="asa-guide-title">Thrombophilia: Factor V Leiden & Prothrombin Gene Mutation</h1>
        <p className="asa-guide-lead">
          The two most common inherited thrombophilias — modest risk in heterozygotes, but high risk in homozygotes and compound heterozygotes. Testing is only warranted when the result will change management.
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
              FVL and PGM are the most common inherited thrombophilias but confer <strong>modest VTE risk in heterozygotes</strong>. They generally do NOT change treatment duration decisions. Heterozygous carriers have <strong>normal life expectancy</strong>.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">FVL vs. PGM — Side-by-Side</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Factor V Leiden (FVL)</th>
                      <th>Prothrombin Gene Mutation (PGM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mutationComparison.map((r) => (
                      <tr key={r.label}>
                        <td style={{ fontWeight: 600 }}>{r.label}</td>
                        <td>{r.fvl}</td>
                        <td>{r.pgm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Homozygous or compound heterozygous FVL/PGM:</strong> Much higher VTE and recurrence risk. These patients may be candidates for indefinite anticoagulation — specialist consultation warranted.
            </div>
          </div>
        )}

        {/* RISK OF THROMBOSIS */}
        {activeTab === 1 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Absolute Risk of VTE — Women of Childbearing Age</h3>
              <p className="asa-section-copy" style={{ marginBottom: "0.75rem" }}>
                Communicating absolute risk (not relative risk) is more meaningful for patient counseling.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Clinical Scenario</th>
                      <th>Annual VTE Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absoluteRiskData.map((r) => (
                      <tr key={r.scenario}>
                        <td>{r.scenario}</td>
                        <td style={{ fontWeight: 600 }}>{r.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Key Clinical Points</h3>
              <ul className="asa-ind-list">
                <li>Heterozygous FVL found in ~20% of unselected VTE patients; ~40% with strong family history</li>
                <li>Heterozygous FVL or PGM are NOT strong predictors of recurrence (HR &lt;1.5, often non-significant)</li>
                <li>Homozygous or compound heterozygous mutations: much higher recurrence risk — warrants specialist assessment for indefinite anticoagulation</li>
                <li>Risk is compounded by age, OCP use, menopausal hormone therapy, pregnancy, family history</li>
                <li>Arterial thrombosis risk from FVL and PGM: small to insignificant — testing in arterial disease is not recommended</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pregnancy Complications</h3>
              <p className="asa-section-copy">
                The majority of data suggest women heterozygous for FVL or PGM are <strong>NOT at significantly increased risk</strong> of placental complications — including pregnancy loss, small-for-gestational-age, pre-eclampsia, or placental abruption. Routine testing in women with prior pregnancy complications is therefore not recommended.
              </p>
            </div>
          </div>
        )}

        {/* WHEN TO TEST */}
        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-amber">
              <strong>Core principle:</strong> Test only if the result will directly influence a treatment or preventive decision. Widespread testing causes harm — anxiety, insurance implications, inappropriate anticoagulation, denial of effective contraception.
            </div>
            {testingGuidance.map((g) => (
              <div key={g.verdict} className={g.color} style={{ marginBottom: "1rem" }}>
                <strong>{g.verdict}</strong>
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  {g.items.map((item) => <li key={item} style={{ marginBottom: "0.25rem" }}>{item}</li>)}
                </ul>
              </div>
            ))}
            <div className="asa-section-card">
              <h3 className="asa-section-title">Diagnostic Methods</h3>
              <ul className="asa-ind-list">
                <li><strong>FVL detection:</strong> DNA testing (definitive) OR Activated Protein C Resistance (APC-R) ratio (functional screening test)</li>
                <li><strong>PGM detection:</strong> DNA testing only — no functional test exists</li>
                <li>Testing can be performed at any time (DNA-based — not affected by anticoagulants or acute thrombosis)</li>
              </ul>
            </div>
          </div>
        )}

        {/* TREATMENT & PREVENTION */}
        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Treatment of VTE in Heterozygous FVL or PGM</h3>
              <ul className="asa-ind-list">
                <li>Anticoagulant choice and duration are <strong>generally NOT affected</strong> by heterozygous FVL or PGM</li>
                <li>DOACs are appropriate — no evidence they are less effective in FVL or PGM</li>
                <li>Recurrence risk in heterozygotes is similar to the general VTE population</li>
                <li>Homozygous FVL/PGM or compound heterozygotes: higher recurrence risk — specialist consultation; consider indefinite anticoagulation</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Prevention — OCP, Pregnancy, and Prophylaxis</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Population</th>
                      <th>Antepartum</th>
                      <th>Postpartum</th>
                      <th>OCP / HRT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preventionRows.map((r) => (
                      <tr key={r.population}>
                        <td style={{ fontWeight: 600 }}>{r.population}</td>
                        <td>{r.antepartum}</td>
                        <td>{r.postpartum}</td>
                        <td>{r.ocp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-blue">
              <strong>OCP use in carriers:</strong> In asymptomatic heterozygous FVL/PGM carriers with no other VTE risk factors who cannot tolerate alternative contraception, combined OCP can be considered case-by-case after careful discussion of absolute risks and patient preferences.
            </div>
          </div>
        )}

        {/* SPECIAL POPULATIONS */}
        {activeTab === 4 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pediatrics</h3>
              <ul className="asa-ind-list">
                <li>Pediatric hematologist with thromboembolism expertise should manage where possible</li>
                <li>When unavailable: neonatologist/pediatrician + adult hematologist + pediatric hematology consultation</li>
                <li>Routine testing of asymptomatic children as newborn screening is not recommended</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Family History Counseling</h3>
              <ul className="asa-ind-list">
                <li>First-degree relatives of heterozygous carriers have 50% chance of carrying the mutation (autosomal dominant)</li>
                <li>A positive family history alone (without confirmed mutation in relative) increases VTE risk ~2-fold even without thrombophilia identified</li>
                <li>Testing relatives: consider only if the result would change a management decision (e.g. pre-OCP, pre-pregnancy)</li>
                <li>Pre-test counseling essential — a positive test result may cause anxiety and affect insurance eligibility</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Perioperative Management</h3>
              <ul className="asa-ind-list">
                <li>Heterozygous FVL/PGM carriers should receive standard perioperative thromboprophylaxis — no additional measures required over standard risk assessment</li>
                <li>Homozygous or compound heterozygous carriers: individualized thromboprophylaxis with specialist input</li>
              </ul>
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
                Source: Thrombosis Canada Clinical Guides | Version 32 | Updated: 2026-02-06
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
