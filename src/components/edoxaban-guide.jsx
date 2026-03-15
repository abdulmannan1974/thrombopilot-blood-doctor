import { useState } from "react";

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["monitoring", "Monitoring"],
  ["adverse", "Adverse Effects"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const afDosingReductions = [
  "CrCl 30\u201350 mL/min",
  "CrCl 15\u201329 mL/min",
  "Body weight \u226460 kg",
  "Concomitant use of potent P-gp inhibitors (erythromycin, cyclosporine, dronedarone, quinidine, ketoconazole)",
];

const drugInteractions = [
  { drug: "Strong P-gp inhibitors", action: "Reduce dose to 30 mg OD (erythromycin, cyclosporine, dronedarone, quinidine, ketoconazole)" },
  { drug: "Strong P-gp/CYP3A4 inducers", action: "Avoid concomitant use (e.g. rifampin, phenytoin, carbamazepine, St. John\u2019s wort)" },
  { drug: "Amiodarone, verapamil", action: "No dose adjustment required" },
  { drug: "Low-dose ASA", action: "Use with caution; increases bleeding risk" },
  { drug: "NSAIDs", action: "Avoid chronic concomitant use" },
  { drug: "Clopidogrel, SSRIs", action: "Increase bleeding risk; monitor clinically" },
];

const specialTopics = [
  {
    title: "Cancer-Associated VTE",
    tone: "danger",
    content: "Hokusai-VTE Cancer trial: edoxaban was non-inferior to dalteparin for VTE recurrence and overall survival. Fewer VTE recurrences but more major bleeding events, particularly in patients with gastrointestinal cancers.",
    alert: "Use with caution in patients with GI tract malignancies due to increased risk of major GI bleeding.",
  },
  {
    title: "Pregnancy and Breastfeeding",
    tone: "danger",
    content: "Edoxaban crosses the placenta and should be avoided in pregnancy. It is unknown whether edoxaban is excreted in breast milk; breastfeeding should be avoided during treatment.",
    alert: null,
  },
  {
    title: "Renal Impairment",
    tone: "orange",
    content: "Reduce to 30 mg OD if CrCl 30\u201350 mL/min or 15\u201329 mL/min. Avoid use if CrCl <15 mL/min. Full dose (60 mg OD) for CrCl >50 mL/min.",
    alert: null,
  },
  {
    title: "Hepatic Impairment",
    tone: "orange",
    content: "Full dose may be used in mild to moderate hepatic dysfunction. Avoid in severe hepatic disease (Child-Pugh C) or hepatic disease associated with coagulopathy.",
    alert: null,
  },
  {
    title: "Bioprosthetic Heart Valves",
    tone: "blue",
    content: "ENGAGE AF-TIMI 48 subgroup analysis suggests edoxaban may be a safe alternative to warfarin in patients with atrial fibrillation and bioprosthetic heart valves.",
    alert: null,
  },
  {
    title: "Post-TAVI (ENVISAGE-TAVI AF)",
    tone: "blue",
    content: "Edoxaban was non-inferior to VKA for the composite of net adverse clinical events after TAVI. However, edoxaban was associated with higher rates of major bleeding, especially GI bleeding.",
    alert: "VKA may be preferable post-TAVI in patients with GI bleed risk factors. Edoxaban may be reasonable in selected patients without GI bleeding risk.",
  },
  {
    title: "Elderly AF (ELDERCARE-AF)",
    tone: "teal",
    content: "Edoxaban 15 mg OD vs placebo in elderly or frail patients with AF deemed unsuitable for standard-dose OAC: approximately two-thirds reduction in stroke and systemic embolism with a non-significant increase in major bleeding.",
    alert: "Edoxaban 15 mg OD may be considered for elderly or frail AF patients who are not candidates for standard oral anticoagulation.",
  },
  {
    title: "AF + PCI (ENTRUST-AF PCI)",
    tone: "blue",
    content: "Edoxaban 60 mg (or 30 mg with dose-reduction criteria) plus clopidogrel was non-inferior to VKA plus clopidogrel plus ASA for ischaemic and bleeding events in AF patients undergoing PCI.",
    alert: null,
  },
  {
    title: "AF Ablation (ELIMINATE-AF)",
    tone: "blue",
    content: "Uninterrupted edoxaban is a reasonable alternative to uninterrupted VKA peri-procedurally for catheter ablation of atrial fibrillation.",
    alert: null,
  },
  {
    title: "AF + Stable CAD (EPIC-CAD)",
    tone: "teal",
    content: "Edoxaban monotherapy was safer than edoxaban plus single antiplatelet therapy in patients with AF and stable coronary artery disease. The lower composite endpoint was driven by reduced bleeding, with similar ischaemic event rates.",
    alert: null,
  },
  {
    title: "Bleeding Reversal",
    tone: "danger",
    content: "Andexanet alfa is indicated for reversal of rivaroxaban and apixaban but is not specifically approved for edoxaban. Prothrombin complex concentrate (PCC) may be used as an alternative for life-threatening bleeding.",
    alert: "No specific reversal agent is approved for edoxaban. Use PCC as the primary option for emergent reversal.",
  },
  {
    title: "Pediatrics",
    tone: "gray",
    content: "Edoxaban is not recommended for use in children until further studies establish safety and efficacy in the pediatric population.",
    alert: null,
  },
];

const references = [
  "Giugliano RP, et al. Edoxaban versus warfarin in patients with atrial fibrillation. N Engl J Med. 2013;369:2093-2104. (ENGAGE AF-TIMI 48)",
  "Hokusai-VTE Investigators. Edoxaban versus warfarin for the treatment of symptomatic venous thromboembolism. N Engl J Med. 2013;369:1406-1415.",
  "Raskob GE, et al. Edoxaban for the treatment of cancer-associated venous thromboembolism. N Engl J Med. 2018;378:615-624. (Hokusai-VTE Cancer)",
  "Van Mieghem NM, et al. Edoxaban versus vitamin K antagonist for atrial fibrillation after TAVI. N Engl J Med. 2021;385:2150-2160. (ENVISAGE-TAVI AF)",
  "Okumura K, et al. Low-dose edoxaban in very elderly patients with atrial fibrillation. N Engl J Med. 2020;383:1735-1745. (ELDERCARE-AF)",
  "Vranckx P, et al. Edoxaban-based versus vitamin K antagonist-based antithrombotic regimen after successful coronary stenting in patients with atrial fibrillation. Lancet. 2019;394:1335-1343. (ENTRUST-AF PCI)",
  "Hohnloser SH, et al. Uninterrupted edoxaban vs vitamin K antagonists for ablation of atrial fibrillation. Eur Heart J. 2019;40:3010-3021. (ELIMINATE-AF)",
  "Yasuda S, et al. Edoxaban monotherapy versus combination therapy with edoxaban and antiplatelet in atrial fibrillation with stable coronary artery disease. Circulation. 2024. (EPIC-CAD)",
  "Thrombosis Canada. Edoxaban (Lixiana). Clinical Guide. 2024.",
  "Product Monograph: Lixiana (edoxaban tosylate). Servier Canada Inc.",
];

const relatedGuides = [
  "DOACs: Comparison and Frequently-asked Questions",
  "DOACs: Management of Bleeding",
  "DOACs: Perioperative Management",
  "DOACs: Coagulation Tests",
  "DOACs in Patients with Obesity",
  "Stroke Prevention in Atrial Fibrillation",
  "Deep Vein Thrombosis (DVT): Treatment",
  "Pulmonary Embolism (PE): Treatment",
  "Cancer and Thrombosis",
];

export function EdoxabanGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Direct Oral Anticoagulant</span>
              <span className="asa-badge asa-badge-gray">Factor Xa Inhibitor</span>
            </div>
            <h2 className="asa-guide-title">Edoxaban (Lixiana&reg;)</h2>
            <div className="asa-guide-meta">
              <span>Thrombosis Canada</span>
              <span>Oral direct factor Xa inhibitor</span>
            </div>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide guidance on the use of edoxaban for stroke prevention in non-valvular atrial fibrillation and treatment/prevention of venous thromboembolism.
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div>
          <h3>Mechanism of Action</h3>
          <p>
            Edoxaban is an oral, reversible, direct factor Xa inhibitor. It binds to the active site
            of factor Xa, attenuating thrombin generation and clot formation. It does not require
            antithrombin for its activity.
          </p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tab-bar" role="tablist" aria-label="Edoxaban guide sections">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "asa-tab-btn active" : "asa-tab-btn"}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Pharmacology</h3>
              <p className="asa-section-copy">
                Edoxaban is a selective, reversible, direct factor Xa inhibitor that binds to the
                active site of factor Xa in both free and prothrombinase-bound forms. By inhibiting
                factor Xa, edoxaban reduces thrombin generation, thereby inhibiting thrombus formation.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Licensed Indications</h3>
              <ul className="asa-sections">
                <li>
                  <strong>Stroke and systemic embolism prevention</strong> in patients with
                  non-valvular atrial fibrillation (NVAF) with one or more risk factors.
                </li>
                <li>
                  <strong>Treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE)</strong>{" "}
                  following initial therapy with a parenteral anticoagulant for at least 5 days.
                </li>
                <li>
                  <strong>Prevention of recurrent VTE</strong> (DVT and PE).
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Key Pharmacokinetic Properties</h3>
              <table className="asa-dose-table">
                <tbody>
                  <tr><td>Bioavailability</td><td>~62%</td></tr>
                  <tr><td>Peak plasma level</td><td>1\u20132 hours</td></tr>
                  <tr><td>Half-life</td><td>10\u201314 hours</td></tr>
                  <tr><td>Renal elimination</td><td>~50%</td></tr>
                  <tr><td>Protein binding</td><td>~55%</td></tr>
                  <tr><td>Metabolism</td><td>Minimal CYP3A4; P-gp substrate</td></tr>
                </tbody>
              </table>
            </article>

            <div className="asa-alert">
              <strong>Important:</strong> Do not use in patients with CrCl &lt;15 mL/min, in
              pregnancy or breastfeeding, or in severe hepatic disease associated with coagulopathy.
            </div>
          </div>
        )}

        {/* ── Dosing ── */}
        {tab === "dosing" && (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Atrial Fibrillation</h3>
              <p className="asa-section-copy">
                Standard dose: <strong>60 mg once daily</strong>.
              </p>
              <p className="asa-section-copy">
                Reduce to <strong>30 mg once daily</strong> if any of the following are present:
              </p>
              <ul className="asa-sections">
                {afDosingReductions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="asa-section-copy">
                No dose adjustment is required for concomitant amiodarone or verapamil. Avoid
                concomitant use with strong CYP3A4 and P-gp inducers (e.g. rifampin, phenytoin,
                carbamazepine, St. John&rsquo;s wort).
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Venous Thromboembolism Treatment</h3>
              <p className="asa-section-copy">
                Initiate edoxaban <strong>after at least 5 days</strong> of parenteral anticoagulation
                (e.g. LMWH or unfractionated heparin).
              </p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Dose</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Acute treatment (after &ge;5 days parenteral)</td>
                    <td className="dose-highlight">60 mg OD</td>
                    <td>Reduce to 30 mg OD if dose-reduction criteria met</td>
                  </tr>
                  <tr>
                    <td>Extended prevention</td>
                    <td className="dose-highlight">60 mg OD</td>
                    <td>Same dose; same reduction criteria apply</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Dose Reduction Criteria (All Indications)</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Standard Dose</th>
                    <th>Reduced Dose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CrCl &gt;50 mL/min, weight &gt;60 kg, no P-gp inhibitors</td>
                    <td className="dose-highlight">60 mg OD</td>
                    <td>&mdash;</td>
                  </tr>
                  <tr>
                    <td>CrCl 30&ndash;50 mL/min</td>
                    <td>&mdash;</td>
                    <td className="dose-highlight">30 mg OD</td>
                  </tr>
                  <tr>
                    <td>CrCl 15&ndash;29 mL/min</td>
                    <td>&mdash;</td>
                    <td className="dose-highlight">30 mg OD</td>
                  </tr>
                  <tr>
                    <td>Weight &le;60 kg</td>
                    <td>&mdash;</td>
                    <td className="dose-highlight">30 mg OD</td>
                  </tr>
                  <tr>
                    <td>Potent P-gp inhibitors</td>
                    <td>&mdash;</td>
                    <td className="dose-highlight">30 mg OD</td>
                  </tr>
                  <tr>
                    <td>CrCl &lt;15 mL/min</td>
                    <td colSpan={2}>Do not use</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <div className="asa-alert">
              <strong>Contraindications:</strong> CrCl &lt;15 mL/min, pregnancy, breastfeeding,
              severe hepatic disease with coagulopathy.
            </div>
          </div>
        )}

        {/* ── Monitoring ── */}
        {tab === "monitoring" && (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Routine Monitoring</h3>
              <p className="asa-section-copy">
                Edoxaban does <strong>not require routine coagulation monitoring</strong>.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Coagulation Tests</h3>
              <p className="asa-section-copy">
                PT/INR and aPTT may be normal at therapeutic doses and are <strong>not reliable</strong>{" "}
                for assessing edoxaban activity. Anti-Xa assays calibrated with edoxaban-specific
                calibrators are available in some specialized laboratories but are not widely validated
                for clinical decision-making.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Recommended Follow-Up</h3>
              <ul className="asa-sections">
                <li>Periodic clinical assessment for bleeding and thromboembolic events.</li>
                <li>Annual renal function (CrCl) measurement, or more frequently if CrCl is borderline or declining.</li>
                <li>Assess hepatic function at baseline and as clinically indicated.</li>
                <li>Review concomitant medications for new drug interactions at each visit.</li>
                <li>Reassess indication and risk-benefit at least annually.</li>
              </ul>
            </article>

            <div className="asa-alert">
              <strong>Note:</strong> Standard coagulation tests (PT, aPTT) cannot be used to reliably
              measure edoxaban levels. Do not adjust doses based on these results.
            </div>
          </div>
        )}

        {/* ── Adverse Effects ── */}
        {tab === "adverse" && (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Bleeding</h3>
              <p className="asa-section-copy">
                Bleeding is the principal adverse effect of edoxaban, as with all anticoagulants.
                Risk is increased by concomitant antiplatelet agents, NSAIDs, SSRIs, and other
                drugs that affect haemostasis.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Neuraxial Anaesthesia / Epidural Catheters</h3>
              <p className="asa-section-copy">
                Avoid edoxaban in patients with indwelling epidural catheters. There is a risk of
                spinal or epidural haematoma that can result in long-term or permanent paralysis.
                Follow local guidelines for timing of catheter removal relative to dosing.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Drug-Level Effects</h3>
              <p className="asa-section-copy">
                Edoxaban plasma levels may be significantly affected by concomitant medications.
                P-gp inhibitors increase edoxaban exposure (dose reduction required for potent
                inhibitors). Strong P-gp and CYP3A4 inducers decrease exposure and should be avoided.
              </p>
            </article>

            <div className="asa-alert">
              <strong>Warning:</strong> Premature discontinuation of edoxaban increases the risk of
              thrombotic events. If anticoagulation must be stopped for reasons other than pathological
              bleeding, consider bridging with an alternative anticoagulant.
            </div>
          </div>
        )}

        {/* ── Special Considerations ── */}
        {tab === "special" && (
          <div className="asa-tab-body">
            {specialTopics.map((topic) => (
              <article key={topic.title} className="asa-section-card">
                <h3 className="asa-section-title">{topic.title}</h3>
                <p className="asa-section-copy">{topic.content}</p>
                {topic.alert && (
                  <div className="asa-alert">
                    <strong>Clinical Pearl:</strong> {topic.alert}
                  </div>
                )}
              </article>
            ))}

            <article className="asa-section-card">
              <h3 className="asa-section-title">Drug Interactions Summary</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Drug / Class</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {drugInteractions.map((row) => (
                    <tr key={row.drug}>
                      <td><strong>{row.drug}</strong></td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        )}

        {/* ── References ── */}
        {tab === "references" && (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Related Clinical Guides</h3>
              <ul className="asa-sections">
                {relatedGuides.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>

      <div className="asa-guide-footer">
        <p>
          <strong>Edoxaban (Lixiana&reg;)</strong> | Thrombosis Canada Clinical Guide
        </p>
        <p>
          This information is not a substitute for clinical judgement. Always seek appropriate
          specialist input when needed.
        </p>
      </div>
    </section>
  );
}
