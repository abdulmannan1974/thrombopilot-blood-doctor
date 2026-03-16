import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  "Overview",
  "Diagnosis",
  "Antithrombotic Therapy",
  "Special Situations",
  "References",
];

const diagnosisCriteria = [
  {
    domain: "Entry Criterion",
    items: [
      "Positive antiphospholipid antibody test: lupus anticoagulant (LA), anticardiolipin IgG/IgM (aCL), or anti-\u03b22GPI IgG/IgM",
      "Must be confirmed on \u22652 occasions at least 12 weeks apart",
    ],
    note: "Required before applying the additive weighted criteria",
  },
  {
    domain: "Laboratory Domains",
    items: [
      "Lupus anticoagulant (LA) positivity: weighted +1 to +4 depending on test type",
      "aCL IgG/IgM: moderate (40\u201379 U) = +1 point; high (\u226580 U) = +3 points",
      "Anti-\u03b22GPI IgG/IgM: moderate = +1 point; high (\u226580 U) = +3 points",
      "Triple positivity (LA + aCL + anti-\u03b22GPI): higher weight",
    ],
    note: "Must achieve \u22653 points from laboratory domains",
  },
  {
    domain: "Clinical Domains",
    items: [
      "Macrovascular: VTE without a high-risk profile, arterial thrombosis without a high-risk profile, or microvascular thrombosis",
      "VTE with high-risk profile or unprovoked VTE",
      "Arterial thrombosis with high-risk profile",
      "Obstetric: recurrent miscarriage, unexplained fetal loss \u226510 weeks, preeclampsia/HELLP \u226434 weeks",
      "Non-criteria: cardiac valvulopathy, livedoid rash, thrombocytopenia, nephropathy, neurological manifestations",
    ],
    note: "Must achieve \u22653 points from clinical domains",
  },
];

const riskProfiles = [
  {
    profile: "High-Risk APS",
    definition: "Triple positivity (LA + aCL + anti-\u03b22GPI) and/or arterial thrombosis",
    treatment: "Warfarin (INR 2.0\u20133.0) \u2014 indefinite",
    doacs: "DOACs inferior \u2014 higher stroke and MI rates vs warfarin (RE-CIRCUIT, ASTRO-APS, TRAPS trials)",
    badge: "Warfarin required",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    profile: "Low-Risk APS (venous thrombosis only)",
    definition: "Single antibody positivity, venous thrombosis, no high-risk features",
    treatment: "Warfarin (INR 2.0\u20133.0) preferred; DOAC safety uncertain",
    doacs: "No robust RCTs; conflicting observational data. Specialist consultation recommended if considering DOAC.",
    badge: "Uncertain \u2014 specialist input",
    badgeClass: "asa-badge asa-badge-amber",
  },
];

const acuteManagement = [
  {
    phase: "Acute venous thrombosis",
    recommendation: "LMWH preferred over UFH if baseline aPTT is prolonged by lupus anticoagulant (LA interferes with aPTT monitoring of UFH). See the \u003CGuideLink to=\"ufhLmwh\"\u003EUFH, LMWH & Fondaparinux\u003C/GuideLink\u003E guide for dosing.",
    badge: "LMWH first-line",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    phase: "Acute arterial thrombosis",
    recommendation: "Anticoagulation with warfarin (INR 2.0\u20133.0) generally preferred. ASA 325 mg is an option if anticoagulation is not feasible, particularly in low-titer, single-measurement antibody settings.",
    badge: "Warfarin preferred",
    badgeClass: "asa-badge asa-badge-orange",
  },
  {
    phase: "Transition to long-term therapy",
    recommendation: "High-risk APS: warfarin long-term. INR target 2.0\u20133.0. Target INR 3.0\u20134.0 has not been shown to be superior and carries higher bleeding risk.",
    badge: "INR 2.0\u20133.0",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    phase: "Recurrent thrombosis on anticoagulation",
    recommendation: "Options: switch to warfarin (if on DOAC), escalate warfarin target (INR 3.0\u20134.0), therapeutic LMWH, or low-dose ASA + warfarin. Specialist consultation mandatory. Confirm recurrence objectively and assess anticoagulation adequacy before labelling as treatment failure.",
    badge: "Specialist required",
    badgeClass: "asa-badge asa-badge-red",
  },
];

const doaTrials = [
  { trial: "TRAPS", agent: "Rivaroxaban", n: 120, design: "RCT (stopped early)", result: "More strokes and MI in rivaroxaban vs warfarin; 12 vs 0 events", conclusion: "Rivaroxaban inferior in triple-positive APS" },
  { trial: "ASTRO-APS", agent: "Apixaban", n: 41, design: "RCT", result: "More strokes in apixaban arm vs warfarin", conclusion: "Apixaban inferior in high-risk APS" },
  { trial: "HIBISCUS", agent: "Rivaroxaban", n: 116, design: "Retrospective", result: "Higher rate of arterial events with rivaroxaban", conclusion: "Consistent with above; avoid in high-risk" },
  { trial: "Khairani 2023 meta-analysis", agent: "DOACs overall", n: "Pooled RCTs", design: "Meta-analysis", result: "DOACs associated with more arterial thrombotic events vs VKA", conclusion: "Warfarin remains standard for high-risk APS" },
];

const specialSituations = [
  {
    title: "Asymptomatic APS (no thrombosis, positive antibodies)",
    content: "No clear consensus on primary prophylaxis. Consider low-dose ASA in high-risk antibody profiles (especially with SLE or additional risk factors). Aggressive thromboprophylaxis mandatory in high-risk situations (surgery, hospitalization, pregnancy).",
    badge: "Low-dose ASA \u2014 consider",
    badgeClass: "asa-badge asa-badge-amber",
  },
  {
    title: "Obstetric APS (pregnancy complications without thrombosis)",
    content: "Prophylactic-dose LMWH/UFH + low-dose ASA throughout pregnancy. Efficacy not fully validated in well-designed RCTs. Low-dose ASA alone may reduce pre-eclampsia risk in women with persistent aPL and no prior thrombosis. Post-partum thromboprophylaxis is commonly used even without prior thrombosis history.",
    badge: "LMWH + ASA",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    title: "CAPS \u2014 Catastrophic Antiphospholipid Syndrome",
    content: "Rare, fulminant multiorgan microvascular thrombosis. Mortality > 30% despite treatment. Management: aggressive anticoagulation (IV UFH), plasmapheresis, high-dose corticosteroids, \u00b1 IVIG, \u00b1 rituximab. Anti-complement therapy (eculizumab) may benefit selected critically ill patients. Manage in expert centres.",
    badge: "Expert centre",
    badgeClass: "asa-badge asa-badge-red",
  },
  {
    title: "APS with SLE",
    content: "Secondary APS. All APS manifestations may occur. Hydroxychloroquine may provide additional benefit (thromboprophylactic and immunomodulatory effects). Specialist consultation strongly advised for combined management.",
    badge: "Add hydroxychloroquine",
    badgeClass: "asa-badge asa-badge-blue",
  },
  {
    title: "Laboratory monitoring \u2014 INR in APS",
    content: "Some APS patients have a prolonged baseline INR before anticoagulation (LA interference). Point-of-care INR devices are particularly prone to error in APS \u2014 calibrate with venous sample results periodically. Consider chromogenic factor X assay if standard INR is unreliable.",
    badge: "Monitor carefully",
    badgeClass: "asa-badge asa-badge-amber",
  },
  {
    title: "Pediatric APS",
    content: "Anticoagulate as per general VTE management in children. Pediatric hematologist with thromboembolism expertise should manage where possible. When unavailable: neonatologist/pediatrician + adult hematologist with pediatric consultation.",
    badge: "Pediatric specialist",
    badgeClass: "asa-badge asa-badge-blue",
  },
];

const references = [
  "Arachchillage DJ, et al. Guidelines on investigation and management of APS. Br J Haematol. 2024;205(3):855-880.",
  "Barbhaiya M, et al. The 2023 ACR/EULAR APS Classification Criteria. Arthritis Rheumatol. 2023;75(10):1687-1702.",
  "Cervera R, et al. 16th ICAPA Task Force Report on CAPS. Lupus 2020;29(12):1594-1600.",
  "Cohen H, et al. How I treat anticoagulant-refractory thrombotic APS. Blood. 2021;137(3):299-309.",
  "Crowther MA, et al. Two intensities of warfarin for APS. N Engl J Med 2003;349(26):1133-1138.",
  "Khairani CD, et al. DOACs vs VKA in APS: meta-analysis of RCTs. J Am Coll Cardiol. 2023;81(1):16-30.",
  "Ordi-Ros J, et al. Rivaroxaban versus VKA in APS. Ann Intern Med 2019;171:685-694.",
  "Pengo V, et al. Rivaroxaban vs warfarin in high-risk APS (TRAPS). Blood 2018;132(13):1365-1371.",
  "Tektonidou MG, et al. EULAR recommendations for management of APS. Ann Rheum Dis 2019;78:1296-1304.",
  "Woller SC, et al. Apixaban vs warfarin in thrombotic APS (ASTRO-APS). Blood Adv 2022;6(6):1661-1670.",
];

export function ApsThrombophiliaGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h1 className="text-2xl font-bold leading-tight mt-1">Thrombophilia: Antiphospholipid Syndrome</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          APS diagnosis, risk stratification, and antithrombotic therapy &mdash; including why DOACs are inferior to warfarin in high-risk APS.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
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

      <div className="grid gap-4">
        {/* OVERVIEW */}
        {activeTab === 0 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>Key point:</strong> In high-risk APS (triple positivity or arterial thrombosis), DOACs are inferior to warfarin &mdash; more strokes and MI. <GuideLink to="warfarin">Warfarin</GuideLink> with INR 2.0-3.0 is the standard of care.
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">What is APS?</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                APS is an acquired hypercoagulable state driven by autoantibodies against phospholipid-binding proteins. It causes venous thrombosis, arterial thrombosis, microvascular thrombosis, and/or pregnancy complications (recurrent miscarriage, fetal loss, severe preeclampsia). May be primary (isolated) or secondary (with SLE or other autoimmune disease).
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key antibodies</span>
                <span className="text-sm">LA, aCL (IgG/IgM), anti-\u03b22GPI (IgG/IgM)</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirmation</span>
                <span className="text-sm">\u22652 positive tests, \u226512 weeks apart</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">High-risk profile</span>
                <span className="text-sm">Triple positivity or arterial thrombosis</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DOAC evidence</span>
                <span className="text-sm">Inferior to warfarin in high-risk APS (TRAPS, ASTRO-APS)</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target INR</span>
                <span className="text-sm">2.0-3.0 (warfarin)</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</span>
                <span className="text-sm">Indefinite (high recurrence risk)</span>
              </div>
            </div>
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Specialist consultation:</strong> Diagnosis and management of APS should be undertaken in consultation with a hematologist or thrombosis specialist given complexity, treatment implications, and laboratory interpretation challenges.
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Related Guides</h3>
              <ul className="list-none p-0 space-y-1">
                <li><GuideLink to="warfarin">Warfarin</GuideLink></li>
                <li><GuideLink to="warfarinInr">Warfarin: Out-of-Range INR Management</GuideLink></li>
                <li><GuideLink to="warfarinPoc">Warfarin: Point-of-Care INR Monitoring</GuideLink></li>
                <li><GuideLink to="naturalAnticoag">Natural Anticoagulant Deficiencies (PC, PS, AT)</GuideLink></li>
                <li><GuideLink to="pregProphylaxis">Pregnancy: Thromboprophylaxis</GuideLink></li>
              </ul>
            </div>
          </div>
        )}

        {/* DIAGNOSIS */}
        {activeTab === 1 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <strong>2023 ACR/EULAR Criteria:</strong> Higher specificity than 2006 Sapporo criteria, but reduced sensitivity. The British Society of Haematology (2024) recommends the 2006 criteria for routine clinical use to avoid underdiagnosis.
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">How to Diagnose APS</h3>
              {diagnosisCriteria.map((d) => (
                <div key={d.domain} style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "var(--surface)", borderRadius: "8px", borderLeft: "3px solid var(--primary)" }}>
                  <strong style={{ display: "block", marginBottom: "0.5rem" }}>{d.domain}</strong>
                  <ul className="list-none p-0 space-y-1">
                    {d.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {d.note && <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.5rem" }}>{d.note}</p>}
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Key Laboratory Notes</h3>
              <ul className="list-none p-0 space-y-1">
                <li>ELISA results for aCL/anti-\u03b22GPI are not equivalent to chemiluminescent immunoassay (CLIA) results</li>
                <li>Moderate positive: 40-79 Units; High positive: \u226580 Units (ELISA)</li>
                <li>LA may prolong aPTT &mdash; do NOT use aPTT to monitor UFH in LA-positive patients (use anti-Xa instead)</li>
                <li>LA may cause falsely elevated point-of-care INR &mdash; calibrate with venous lab INR periodically (see <GuideLink to="warfarinPoc">POC INR Guide</GuideLink>)</li>
                <li>Single positive result: do not diagnose APS &mdash; retest in \u226512 weeks</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">APS Risk Stratification</h3>
              {riskProfiles.map((r) => (
                <div key={r.profile} style={{ marginBottom: "1rem", padding: "1rem", background: "var(--surface)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <strong>{r.profile}</strong>
                    <span className={r.badgeClass}>{r.badge}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}><strong>Definition:</strong> {r.definition}</p>
                  <p style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}><strong>Treatment:</strong> {r.treatment}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}><strong>DOACs:</strong> {r.doacs}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANTITHROMBOTIC THERAPY */}
        {activeTab === 2 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>DOACs are NOT recommended in high-risk APS.</strong> Multiple RCTs (TRAPS, ASTRO-APS) and a 2023 meta-analysis (Khairani et al.) consistently show more arterial events with DOACs vs. warfarin.
            </div>
            {acuteManagement.map((a) => (
              <div key={a.phase} className="rounded-xl border bg-card shadow-sm p-5">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="text-base font-semibold mb-2" style={{ margin: 0 }}>{a.phase}</h3>
                  <span className={a.badgeClass}>{a.badge}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {a.phase === "Acute venous thrombosis" ? (
                    <>LMWH preferred over UFH if baseline aPTT is prolonged by lupus anticoagulant (LA interferes with aPTT monitoring of UFH). See the <GuideLink to="ufhLmwh">UFH, LMWH &amp; Fondaparinux</GuideLink> guide for dosing.</>
                  ) : (
                    a.recommendation
                  )}
                </p>
              </div>
            ))}
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">DOAC vs. Warfarin &mdash; Key Trial Evidence</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Trial</th>
                      <th>Agent</th>
                      <th>N</th>
                      <th>Design</th>
                      <th>Result</th>
                      <th>Conclusion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doaTrials.map((t) => (
                      <tr key={t.trial}>
                        <td style={{ fontWeight: 600 }}>{t.trial}</td>
                        <td>{t.agent}</td>
                        <td>{t.n}</td>
                        <td>{t.design}</td>
                        <td style={{ fontSize: "0.8rem" }}>{t.result}</td>
                        <td style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t.conclusion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">When a Patient Declines Warfarin</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Inform patient about reduced benefit of DOACs relative to warfarin in high-risk APS</li>
                <li>Refer to hematologist or thrombosis specialist</li>
                <li>Document informed discussion in the medical record</li>
                <li>If DOAC used: <GuideLink to="rivaroxaban">rivaroxaban</GuideLink> or <GuideLink to="apixaban">apixaban</GuideLink>, with close monitoring</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Adjunctive Treatments</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Hydroxychloroquine:</strong> add in APS + SLE; possible thromboprophylactic effect</li>
                <li><strong>Low-dose ASA:</strong> may reduce arterial recurrence risk; role not well defined outside of obstetric APS or concurrent cardiovascular risk reduction</li>
                <li><strong>Cardiovascular risk factor reduction:</strong> essential for all APS patients (BP control, lipid management, smoking cessation)</li>
                <li><strong>Statins:</strong> may have immunomodulatory effects; not routinely recommended solely for APS</li>
              </ul>
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === 3 && (
          <div className="grid gap-3.5">
            {specialSituations.map((s) => (
              <div key={s.title} className="rounded-xl border bg-card shadow-sm p-5">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="text-base font-semibold mb-2" style={{ margin: 0 }}>{s.title}</h3>
                  <span className={s.badgeClass}>{s.badge}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">{s.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === 4 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
