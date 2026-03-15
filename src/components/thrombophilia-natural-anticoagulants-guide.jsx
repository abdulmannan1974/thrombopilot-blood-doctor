import { useState } from "react";

const tabs = [
  "Overview",
  "When to Test",
  "Acute VTE Management",
  "Perioperative Care",
  "Special Populations",
  "References",
];

const proteins = [
  {
    name: "Antithrombin (AT)",
    mechanism: "Inhibits thrombin, FXa, FIXa, and other serine proteases directly. Heparin, LMWH, and fondaparinux act by potentiating AT — so AT deficiency impairs response to these drugs.",
    thrombosisRisk: "Highest lifetime VTE risk of the three deficiencies",
    heparinEffect: "UFH and LMWH may fail to achieve therapeutic targets due to reduced AT effect — check aPTT/anti-Xa and escalate doses as needed. AT concentrate can restore heparinoid responsiveness.",
    doacNote: "DOACs act independently of AT — viable alternative, but evidence limited to case reports and small series. Expert oversight required. No dose reduction in chronic phase.",
    warfarinNote: "Standard warfarin use is acceptable",
    badge: "Highest risk",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    name: "Protein C",
    mechanism: "Vitamin K-dependent anticoagulant that inactivates FVa and FVIIIa. Warfarin suppresses protein C before other clotting factors, creating a transient hypercoagulable state — risk of warfarin-induced skin necrosis.",
    thrombosisRisk: "High — recurrent VTE common if anticoagulation stopped",
    heparinEffect: "No impaired heparin response. Standard LMWH/UFH dosing appropriate for acute therapy.",
    doacNote: "DOACs can generally be used safely. No dose reduction in chronic prevention phase.",
    warfarinNote: "Must bridge with therapeutic LMWH/UFH for ≥5 days AND until INR ≥2.0 for ≥48 hours before starting warfarin — to prevent skin necrosis. Severe deficiency may require protein C concentrate.",
    badge: "Warfarin necrosis risk",
    badgeClass: "asa-badge asa-badge-orange",
  },
  {
    name: "Protein S",
    mechanism: "Vitamin K-dependent cofactor that enhances protein C activity. Naturally lower during pregnancy, OCP use, and postpartum. No concentrate available.",
    thrombosisRisk: "Variable — higher in high-risk families",
    heparinEffect: "No impaired heparin response.",
    doacNote: "DOACs can generally be used safely. No dose reduction in chronic prevention phase.",
    warfarinNote: "Same bridging precautions as protein C deficiency. No protein S concentrate — management relies entirely on anticoagulants.",
    badge: "No concentrate available",
    badgeClass: "asa-badge asa-badge-amber",
  },
];

const testingIndications = [
  {
    scenario: "Test — only if result will change management",
    examples: [
      "Known family history of PC/PS/AT deficiency and first-degree relative with VTE, considering pregnancy or surgery",
      "Recurrent unprovoked VTE where high-risk thrombophilia would prompt indefinite anticoagulation",
      "Young patient with unprovoked VTE in unusual site (mesenteric, cerebral)",
    ],
    verdict: "Consider testing",
    color: "asa-alert asa-alert-blue",
  },
  {
    scenario: "Do NOT test — testing will not change management",
    examples: [
      "Provoked VTE (e.g. post-surgery) — positive result rarely changes anticoagulation duration",
      "Arterial thrombosis (ischemic stroke, MI) — these deficiencies are primarily venous",
      "General population screening or pre-natal/newborn screen",
      "Before starting OCP or HRT routinely",
      "Patient already committed to indefinite anticoagulation for other reasons",
    ],
    verdict: "Do not test",
    color: "asa-alert asa-alert-red",
  },
];

const testingInterference = [
  { factor: "Acute VTE / severe illness", effect: "Consumes PC/PS/AT — falsely low results. Retest when stable, weeks after acute event." },
  { factor: "Warfarin", effect: "Markedly reduces Protein C and S (vitamin K-dependent). Test only ≥3–6 weeks after stopping warfarin." },
  { factor: "DOACs", effect: "Interfere with functional assays for PC, PS, and AT. Results unreliable on DOACs." },
  { factor: "Heparin / LMWH", effect: "Can cause falsely low AT levels." },
  { factor: "Pregnancy / postpartum", effect: "PS levels physiologically lower — misleading in obstetric setting." },
  { factor: "Liver disease, DIC, nephrotic syndrome", effect: "Acquired deficiencies — must rule out before diagnosing inherited deficiency." },
  { factor: "L-asparaginase chemotherapy", effect: "Reduces AT — acquired deficiency, not inherited." },
];

const surgeryManagement = [
  {
    protein: "AT deficiency",
    plan: "AT concentrate perioperatively to restore activity levels and improve heparin efficacy. Also indicated in pregnancy (peripartum period) to prevent maternal DVT/PE and improve fetal outcomes.",
    badge: "AT concentrate",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    protein: "Protein C deficiency",
    plan: "Interrupt warfarin with LMWH/UFH bridging. For severe PC deficiency or prior warfarin-induced skin necrosis, administer protein C concentrate perioperatively.",
    badge: "Protein C concentrate if severe",
    badgeClass: "asa-badge asa-badge-orange",
  },
  {
    protein: "Protein S deficiency",
    plan: "Mirrors protein C deficiency management. No protein S concentrate available — rely on bridging anticoagulation and mechanical prophylaxis.",
    badge: "No concentrate",
    badgeClass: "asa-badge asa-badge-amber",
  },
];

const references = [
  "Chiasakul T, et al. Inherited thrombophilia and risk of arterial ischemic stroke. J Am Heart Assoc 2019;8(19):e012877.",
  "Cohoon KP, Heit JA. Inherited and secondary thrombophilia. Circulation 2014;129(2):254-257.",
  "Crowther MA, Kelton JG. Congenital thrombophilic states. Ann Intern Med 2003;138(2):128-134.",
  "James AH, et al. Management of hereditary antithrombin deficiency in pregnancy. Thromb Res 2017;157:41-45.",
  "Lipe B, Ornstein DL. Deficiencies of natural anticoagulants. Circulation 2011;124(14):e365-e368.",
  "Minford A, et al. Diagnosis and management of severe congenital protein C deficiency. J Thromb Haemostas. 2022;20(7):1735-1743.",
  "Pintao MC, et al. Protein S levels and the risk of venous thrombosis: MEGA case-control study. Blood 2013;122(18):3210-3219.",
  "Skelley JW, et al. Direct oral anticoagulants in inherited thrombophilia. J Thromb Thrombolysis 2017;43:24-30.",
  "Elena Campello, et al. DOACs in patients with inherited thrombophilia. JAHA 2020;9(23):e018917.",
];

export function ThrombophiliaNaturalAnticoagulantsGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada · Clinical Guide</p>
        <h1 className="asa-guide-title">Thrombophilia: Protein C, Protein S & Antithrombin Deficiency</h1>
        <p className="asa-guide-lead">
          Diagnosis, testing pitfalls, and anticoagulant management in deficiencies of the three natural anticoagulant proteins — including the heparin-resistance of AT deficiency and warfarin skin necrosis risk in protein C deficiency.
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
              <strong>Core principle:</strong> These deficiencies are rare (&lt;5% of unprovoked VTE). Consult a thrombosis specialist before testing. Treatment duration follows the same 3-month minimum rule as other VTE — but many patients warrant indefinite therapy.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Epidemiology</h3>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Prevalence</span>
                  <span className="asa-ae-value">~1 in 300 to 1 in 3000 (autosomal dominant)</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Found in unprovoked VTE</span>
                  <span className="asa-ae-value">&lt; 5% of cases</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Acquired deficiencies</span>
                  <span className="asa-ae-value">More common than inherited (pregnancy, liver disease, nephrotic syndrome, L-ASP)</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Arterial thrombosis link</span>
                  <span className="asa-ae-value">Not definitively established — primarily venous events</span>
                </div>
              </div>
            </div>
            {proteins.map((p) => (
              <div key={p.name} style={{ marginBottom: "1rem", padding: "1rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid var(--primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <strong style={{ fontSize: "1rem" }}>{p.name}</strong>
                  <span className={p.badgeClass}>{p.badge}</span>
                </div>
                <p style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}><strong>Mechanism:</strong> {p.mechanism}</p>
                <p style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}><strong>Thrombosis risk:</strong> {p.thrombosisRisk}</p>
                <p style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}><strong>Heparin/LMWH:</strong> {p.heparinEffect}</p>
                <p style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}><strong>DOACs:</strong> {p.doacNote}</p>
                <p style={{ fontSize: "0.85rem" }}><strong>Warfarin:</strong> {p.warfarinNote}</p>
              </div>
            ))}
          </div>
        )}

        {/* WHEN TO TEST */}
        {activeTab === 1 && (
          <div className="asa-sections">
            {testingIndications.map((t) => (
              <div key={t.scenario} className={t.color} style={{ marginBottom: "1rem" }}>
                <strong>{t.verdict}:</strong> {t.scenario}
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  {t.examples.map((e) => <li key={e} style={{ marginBottom: "0.25rem" }}>{e}</li>)}
                </ul>
              </div>
            ))}
            <div className="asa-section-card">
              <h3 className="asa-section-title">Factors That Interfere with Accurate Testing</h3>
              <p className="asa-section-copy" style={{ marginBottom: "0.75rem" }}>
                Ideally test ≥3–6 weeks after an acute event and after stopping anticoagulation. Repeat testing is required to confirm an inherited deficiency.
              </p>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Factor</th>
                      <th>Effect on Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testingInterference.map((t) => (
                      <tr key={t.factor}>
                        <td style={{ fontWeight: 600 }}>{t.factor}</td>
                        <td>{t.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>Asymptomatic family members:</strong> Diagnosis in clinically unaffected relatives can negatively impact their perception of health and may affect life and disability insurance. Careful pre-test counseling is essential.
            </div>
          </div>
        )}

        {/* ACUTE VTE MANAGEMENT */}
        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              Initial VTE treatment generally follows standard protocols. Duration: at least 3 months, and often indefinite. Specific caveats apply per protein — see below.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">AT Deficiency — Heparin Resistance</h3>
              <ul className="asa-ind-list">
                <li>UFH and LMWH act via AT — may need higher doses to achieve therapeutic aPTT or anti-Xa targets</li>
                <li>If subtherapeutic despite standard dosing: suspect AT deficiency → escalate dose guided by anti-Xa levels</li>
                <li>AT concentrate can restore AT activity and normalize heparin responsiveness — use in high-risk settings (major surgery, peripartum)</li>
                <li>DOACs act independently of AT — viable option, but data limited to case series. Use with expert oversight.</li>
                <li><strong>Do NOT use dose-reduced DOACs</strong> (e.g. 10 mg rivaroxaban or 2.5 mg apixaban BID) in chronic prevention phase of AT deficiency</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Protein C Deficiency — Warfarin Skin Necrosis Risk</h3>
              <ul className="asa-ind-list">
                <li>Warfarin suppresses protein C rapidly (short half-life), before other clotting factors → transient hypercoagulable state → risk of skin necrosis (limbs, breast, penis)</li>
                <li><strong>Mandatory bridging protocol:</strong> therapeutic LMWH/UFH for ≥5 days AND until INR ≥2.0 for ≥48 hours before stopping heparin</li>
                <li>DOACs are the preferred alternative — safer initiation profile; no skin necrosis risk</li>
                <li>Severe congenital PC deficiency: protein C concentrate for acute thrombotic events, surgery, or pregnancy</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Protein S Deficiency</h3>
              <ul className="asa-ind-list">
                <li>Acute management mirrors protein C deficiency</li>
                <li>No protein S concentrate — management relies entirely on anticoagulant therapy</li>
                <li>DOACs can be used safely; no dose reduction in chronic phase</li>
                <li>Warfarin bridging same precautions as PC deficiency</li>
              </ul>
            </div>
            <div className="asa-alert asa-alert-amber">
              <strong>DOAC evidence:</strong> Data on DOACs in PC/PS/AT deficiency is limited to case reports, small series, and post-hoc trial analyses. Expert opinion supports their use in PC and PS deficiency. Evidence for AT deficiency is more limited. Avoid dose-reduced extended dosing for all three deficiencies.
            </div>
          </div>
        )}

        {/* PERIOPERATIVE */}
        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-blue">
              All three deficiencies confer increased perioperative VTE risk. Individualized thromboprophylaxis planning with specialist input is essential.
            </div>
            {surgeryManagement.map((s) => (
              <div key={s.protein} className="asa-section-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="asa-section-title" style={{ margin: 0 }}>{s.protein}</h3>
                  <span className={s.badgeClass}>{s.badge}</span>
                </div>
                <p className="asa-section-copy">{s.plan}</p>
              </div>
            ))}
            <div className="asa-section-card">
              <h3 className="asa-section-title">AT Deficiency in Pregnancy</h3>
              <ul className="asa-ind-list">
                <li>AT concentrate recommended peripartum to prevent maternal DVT/PE and improve fetal outcomes</li>
                <li>Higher LMWH doses often required — monitor anti-Xa levels</li>
                <li>Specialist (thrombosis + obstetrics) co-management essential</li>
              </ul>
            </div>
          </div>
        )}

        {/* SPECIAL POPULATIONS */}
        {activeTab === 4 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">Asymptomatic Carriers (No Thrombosis)</h3>
              <ul className="asa-ind-list">
                <li>Counsel about VTE symptoms and high-risk situations (pregnancy, OCP, surgery)</li>
                <li>No prophylactic anticoagulation unless in a high-risk situation</li>
                <li>Seek specialist advice for thromboprophylaxis before surgery, trauma, or pregnancy</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pregnancy</h3>
              <ul className="asa-ind-list">
                <li>Protein S levels naturally lower in pregnancy — test is unreliable during pregnancy</li>
                <li>AT deficiency: peripartum AT concentrate + LMWH prophylaxis</li>
                <li>Protein C deficiency: LMWH thromboprophylaxis; severe cases may need protein C concentrate during delivery</li>
                <li>Protein S deficiency: LMWH-based thromboprophylaxis; no concentrate available</li>
                <li>See Thromboprophylaxis in Pregnancy guide for full details</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pediatrics</h3>
              <ul className="asa-ind-list">
                <li>Neonates have naturally low levels of all three proteins — misdiagnosis risk is high</li>
                <li>Genetic testing may be necessary for diagnosis in children</li>
                <li>Pediatric hematologist with thromboembolism experience should manage where possible</li>
              </ul>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Acquired Deficiencies — When to Suspect</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Condition</th>
                      <th>Which Protein(s) Affected</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Liver disease</td><td>PC, PS, AT (all reduced)</td></tr>
                    <tr><td>Nephrotic syndrome</td><td>AT (urinary losses)</td></tr>
                    <tr><td>L-asparaginase chemotherapy</td><td>AT</td></tr>
                    <tr><td>Vitamin K deficiency</td><td>PC and PS (vitamin K-dependent)</td></tr>
                    <tr><td>Pregnancy / postpartum / OCP use</td><td>PS (lower physiologically)</td></tr>
                    <tr><td>Acute thrombosis / sepsis / DIC</td><td>PC, PS, AT (consumption)</td></tr>
                  </tbody>
                </table>
              </div>
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
                Source: Thrombosis Canada Clinical Guides | Version 38 | Updated: 2026-02-06
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
