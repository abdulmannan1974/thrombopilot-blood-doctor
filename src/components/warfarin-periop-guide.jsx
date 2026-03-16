import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["bridging", "Bridging Options"],
  ["risk", "Risk Stratification"],
  ["algorithm", "Management Algorithm"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const bridgingTherapeuticDoses = [
  ["Enoxaparin", "1 mg/kg SC BID", "1.5 mg/kg SC OD"],
  ["Dalteparin", "100 IU/kg SC BID", "200 IU/kg SC OD"],
  ["Tinzaparin", "175 IU/kg SC OD", "\u2014"],
];

const bridgingProphylacticDoses = [
  ["Enoxaparin", "40 mg SC OD"],
  ["Dalteparin", "5000 IU SC OD"],
  ["Tinzaparin", "4500 IU SC OD"],
];

const bleedRiskProcedures = [
  {
    risk: "Minimal",
    tone: "green",
    procedures: [
      "Dental extractions (1\u20132 teeth), dental cleaning",
      "Cataract surgery (especially with topical anaesthesia)",
      "Minor dermatological procedures (skin biopsy, excision of small lesions)",
    ],
    note: "Generally do NOT need warfarin interruption unless patient-specific factors dictate otherwise.",
  },
  {
    risk: "Low / Moderate",
    tone: "blue",
    procedures: [
      "Endoscopy with biopsy",
      "Arthrocentesis",
      "Coronary angiography",
      "Most general surgical procedures",
    ],
    note: "Warfarin interruption typically required. Bridging based on thromboembolism risk.",
  },
  {
    risk: "High",
    tone: "red",
    procedures: [
      "Cardiac surgery",
      "Spinal / epidural procedures",
      "Intracranial surgery",
      "Kidney, liver, or prostate biopsy",
      "Major cancer surgery",
      "ERCP with sphincterotomy",
      "Pacemaker / ICD placement",
    ],
    note: "AVOID post-operative therapeutic bridging. Use prophylactic-dose LMWH, delay anticoagulation, or resume warfarin alone.",
  },
];

const thromboembolismRisk = [
  {
    level: "HIGH",
    tone: "red",
    recommendation: "Bridge with therapeutic-dose LMWH",
    criteria: [
      "Mechanical mitral valve",
      "Recent stroke or TIA within 3 months",
      "CHADS\u2082 score \u22655",
      "Recent VTE (<3 months)",
      "Severe thrombophilia (e.g., protein C/S deficiency, antiphospholipid syndrome)",
    ],
  },
  {
    level: "INTERMEDIATE",
    tone: "amber",
    recommendation: "Bridging is optional \u2014 individualize decision",
    criteria: [
      "Bileaflet aortic mechanical valve with additional risk factors (AF, prior stroke, hypertension, diabetes, heart failure, age >75)",
      "CHADS\u2082 score 3\u20134",
      "VTE within 3\u201312 months ago",
    ],
  },
  {
    level: "LOW",
    tone: "green",
    recommendation: "Do NOT bridge",
    criteria: [
      "Bileaflet aortic mechanical valve without additional risk factors",
      "CHADS\u2082 score \u22642",
      "VTE >12 months ago with no other risk factors",
    ],
  },
];

const timelineSteps = [
  {
    day: "Day \u22125",
    action: "Stop warfarin",
    detail: "Discontinue warfarin 5 days before the scheduled procedure.",
    tone: "red",
  },
  {
    day: "Day \u22123",
    action: "Start bridging LMWH (if indicated)",
    detail: "Begin therapeutic-dose LMWH approximately 3 days before surgery, based on thromboembolism risk stratification.",
    tone: "amber",
  },
  {
    day: "Day \u22121",
    action: "Last pre-op LMWH dose",
    detail: "Give last dose of LMWH at least 24 hours before surgery. Check INR if warranted; if INR >1.5, give vitamin K 1\u20132 mg PO.",
    tone: "amber",
  },
  {
    day: "Day 0",
    action: "Surgery",
    detail: "Proceed with procedure. Check INR if not done on Day \u22121. Confirm haemostasis plan.",
    tone: "blue",
  },
  {
    day: "Post-op",
    action: "Resume warfarin",
    detail: "Resume warfarin on the evening of surgery or the next day (when oral intake tolerated).",
    tone: "green",
  },
  {
    day: "Post-op bridging",
    action: "Resume LMWH based on bleed risk",
    detail: "Low bleed risk: therapeutic dose at 24 hrs. High bleed risk: prophylactic dose at 48\u201372 hrs, or delay therapeutic LMWH/UFH until 48\u201372 hrs post-op.",
    tone: "green",
  },
];

const references = [
  "Douketis JD, et al. Perioperative management of antithrombotic therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012;141(2 Suppl):e326S\u2013e350S.",
  "Douketis JD, et al. Perioperative bridging anticoagulation in patients with atrial fibrillation (BRIDGE trial). N Engl J Med. 2015;373:823-833.",
  "Siegal D, et al. Periprocedural heparin bridging in patients receiving vitamin K antagonists: systematic review and meta-analysis of bleeding and thromboembolic rates. Circulation. 2012;126:1630-1639.",
  "Spyropoulos AC, et al. Periprocedural bridging therapy with unfractionated heparin or low-molecular-weight heparin: a systematic review and meta-analysis. Arch Intern Med. 2012;172:1407-1416.",
  "Nishimura RA, et al. 2017 AHA/ACC focused update of the 2014 AHA/ACC guideline for the management of patients with valvular heart disease. Circulation. 2017;135:e1159-e1195.",
  "Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on Atrial Fibrillation. Chest. 2010;137:263-272.",
  "Keeling D, et al. Peri-operative management of anticoagulation and antiplatelet therapy. Br J Haematol. 2016;175:602-613.",
  "Monagle P, et al. Antithrombotic therapy in neonates and children: ACCP Evidence-Based Clinical Practice Guidelines, 9th ed. Chest. 2012;141:e737S-e801S.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function WarfarinPeriopGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Perioperative Management</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Warfarin</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Warfarin: Perioperative Management</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span>Elective and urgent surgical settings</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> Practical approach to the perioperative management of patients receiving warfarin who require elective or urgent surgery, including guidance on bridging anticoagulation.
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Warfarin perioperative guide sections">
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

        {/* -- Overview -- */}
        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Perioperative Management of Warfarin</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Patients on long-term warfarin who require elective or urgent surgery need careful perioperative planning. The key decision involves whether to provide <strong>bridging anticoagulation</strong> &mdash; using a short-acting parenteral anticoagulant (typically low-molecular-weight heparin) during the period when warfarin is interrupted.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="amber" />What Is Bridging?</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Bridging refers to the administration of a short-acting anticoagulant (subcutaneous LMWH or, rarely, intravenous unfractionated heparin) before and/or after surgery to minimise the time the patient spends without therapeutic anticoagulation.
              </p>
              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <div>
                  <strong>Important distinction:</strong> Bridging anticoagulation is different from routine thromboprophylaxis. Bridging uses therapeutic or near-therapeutic doses and targets patients whose underlying condition (e.g., mechanical valve, high-risk AF) warrants continued anticoagulation.
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Key Principles</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Assess both <strong>bleeding risk</strong> (procedure-related) and <strong>thromboembolism risk</strong> (patient-related).</li>
                <li>There is <strong>no strong evidence-based indication</strong> for bridging in most patients; it should be reserved for those at highest thrombotic risk.</li>
                <li>Bridging is associated with an approximately <strong>2% increase in major bleeding</strong> and <strong>10-15% risk of minor bleeding</strong>.</li>
                <li>Minimal bleed-risk procedures (dental extractions, cataract surgery, minor skin procedures) generally do not require warfarin interruption.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="default" />Monitoring</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>SC LMWH bridging:</strong> No routine laboratory monitoring required.</li>
                <li><strong>IV UFH bridging:</strong> Requires aPTT monitoring to maintain therapeutic range.</li>
                <li><strong>INR:</strong> Check on Day &minus;1 or Day 0 to ensure INR is adequate for safe surgery (target &le;1.5).</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* -- Bridging Options -- */}
        {tab === "bridging" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Bridging Recommendation Summary</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <div>
                  There are <strong>no strong evidence-based indications</strong> for bridging. The decision is based on estimated thromboembolism risk.
                </div>
              </div>
              <ul className="list-none p-0 space-y-1">
                <li><strong>HIGH thromboembolism risk:</strong> Bridging is suggested.</li>
                <li><strong>LOW thromboembolism risk:</strong> Bridging is NOT suggested.</li>
                <li><strong>INTERMEDIATE risk:</strong> Bridging is optional &mdash; individualize the decision based on patient and procedure factors.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Therapeutic-Dose LMWH for Bridging</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Pre-operative and post-operative (when therapeutic bridging is selected):</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Twice-daily dosing</th>
                    <th>Once-daily dosing</th>
                  </tr>
                </thead>
                <tbody>
                  {bridgingTherapeuticDoses.map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="font-bold text-foreground">{row[1]}</td>
                      <td className="font-bold text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.8 }}>
                IV unfractionated heparin (UFH) is rarely used and requires aPTT monitoring. See <GuideLink to="ufhLmwh">UFH, LMWH & Fondaparinux Guide</GuideLink> for full dosing details.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="amber" />Prophylactic-Dose LMWH (High Bleed-Risk Surgery)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                For high bleed-risk procedures, use <strong>prophylactic-dose</strong> LMWH post-operatively instead of therapeutic dose. All given at half dose the day before surgery.
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Prophylactic dose</th>
                  </tr>
                </thead>
                <tbody>
                  {bridgingProphylacticDoses.map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="font-bold text-foreground">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="red" />Cardiac, Spinal, and Intracranial Surgery</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <div>
                  <strong>AVOID post-operative therapeutic bridging</strong> for cardiac surgery, spinal/epidural procedures, and intracranial surgery.
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">Options for these high-risk procedures include:</p>
              <ul className="list-none p-0 space-y-1">
                <li>Low-dose prophylactic LMWH only.</li>
                <li>Delay resumption of anticoagulation entirely.</li>
                <li>Resume warfarin alone without bridging.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Adverse Effects of Bridging</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Major bleeding:</strong> approximately 2% increased risk compared to no bridging.</li>
                <li><strong>Minor bleeding:</strong> 10-15% risk (injection-site haematomas, wound oozing, epistaxis).</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* -- Risk Stratification -- */}
        {tab === "risk" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Table 1: Procedure Bleeding Risk</h3>
              <div className="grid gap-3.5">
                {bleedRiskProcedures.map((cat) => (
                  <div key={cat.risk} className="rounded-xl border bg-card shadow-sm p-5" style={{ borderLeft: `3px solid var(--asa-${cat.tone}, #888)` }}>
                    <h4 style={{ marginBottom: "0.5rem" }}>
                      <Dot tone={cat.tone} />
                      {cat.risk} Bleed Risk
                    </h4>
                    <ul className="list-none p-0 space-y-1">
                      {cat.procedures.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900" style={{ marginTop: "0.5rem" }}>
                      <div>{cat.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Table 2: Thromboembolism Risk and Bridging Decision</h3>
              <div className="grid gap-3.5">
                {thromboembolismRisk.map((tier) => (
                  <div key={tier.level} className="rounded-xl border bg-card shadow-sm p-5" style={{ borderLeft: `3px solid var(--asa-${tier.tone}, #888)` }}>
                    <h4 style={{ marginBottom: "0.25rem" }}>
                      <Dot tone={tier.tone} />
                      {tier.level} Risk
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed mb-4" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                      {tier.recommendation}
                    </p>
                    <ul className="list-none p-0 space-y-1">
                      {tier.criteria.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ) : null}

        {/* -- Management Algorithm -- */}
        {tab === "algorithm" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Perioperative Warfarin Management Timeline</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The following step-by-step timeline outlines the perioperative management approach for patients on warfarin requiring surgery with an indication for warfarin interruption.
              </p>

              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                {timelineSteps.map((step) => (
                  <div key={step.day} className="relative">
                    <div className={`asa-timeline-dot ${step.tone}`} />
                    <div className="text-sm font-semibold">{step.day}: {step.action}</div>
                    <div className="text-sm text-muted-foreground">{step.detail}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Post-operative Bridging Resumption Summary</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Surgical bleed risk</th>
                    <th>Post-op LMWH dose</th>
                    <th>Timing of resumption</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Low bleed risk</td>
                    <td className="font-bold text-foreground">Therapeutic dose</td>
                    <td>24 hours post-procedure</td>
                  </tr>
                  <tr>
                    <td>High bleed risk</td>
                    <td className="font-bold text-foreground">Prophylactic dose initially</td>
                    <td>48-72 hours post-procedure</td>
                  </tr>
                  <tr>
                    <td>Very high bleed risk (cardiac, spinal, intracranial)</td>
                    <td className="font-bold text-foreground">Prophylactic dose or none</td>
                    <td>Delay; resume warfarin alone</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Vitamin K rescue:</strong> If INR is &gt;1.5 on Day &minus;1, administer <strong>vitamin K 1-2 mg PO</strong> to normalise the INR by the morning of surgery. Recheck INR on Day 0.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Warfarin restart:</strong> Resume warfarin at the patient's usual maintenance dose on the evening of surgery or the next morning. Therapeutic INR typically takes 4-5 days to re-establish. Continue LMWH bridging until INR is &ge;2.0 for at least 24 hours.
              </div>
            </div>
          </div>
        ) : null}

        {/* -- Special Considerations -- */}
        {tab === "special" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Dental Procedures</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>1-2 tooth extractions or root canal:</strong> Continue warfarin without interruption.</li>
                <li>Use <strong>tranexamic acid mouthwash</strong>: 5 mL rinse pre-procedure, then 2-3 times daily for 3-5 days after.</li>
                <li>For extensive dental surgery (multiple extractions, implants), consider warfarin interruption on an individual basis.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Eye Surgery</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Cataract surgery</strong> (especially with topical anaesthesia): Continue warfarin.</li>
                <li>Other eye procedures (vitreoretinal surgery, glaucoma surgery): Generally interrupt warfarin. Consult ophthalmology for procedure-specific guidance.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Colonoscopy and Gastroscopy</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Usually interrupt warfarin due to the potential for polypectomy.</li>
                <li>Caution: bleeding may occur <strong>2-7 days</strong> after large polyp removal.</li>
                <li>Endoscopic clips may reduce post-polypectomy bleeding risk.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="amber" />Diagnostic Procedures Requiring Caution</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Kidney biopsy</li>
                <li>Liver biopsy</li>
                <li>Prostate biopsy</li>
                <li>ERCP with sphincterotomy</li>
                <li>Pacemaker or ICD placement</li>
              </ul>
              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <div>These procedures carry higher bleeding risk. Warfarin interruption is generally required, with bridging guided by thromboembolism risk.</div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Perioperative Antiplatelet Therapy</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>ASA:</strong> Continue perioperatively if patient is not at high bleeding risk, especially in the setting of recent ACS or coronary stent. See <GuideLink to="asa">ASA Guide</GuideLink>.</li>
                <li><strong>P2Y12 inhibitors</strong> (<GuideLink to="clopidogrel">clopidogrel</GuideLink>, ticagrelor, prasugrel): Stop <strong>5-7 days</strong> before surgery.</li>
                <li>Coordinate with cardiology if patient requires both anticoagulation and antiplatelet therapy perioperatively. See <GuideLink to="anticoagAntiplatelet">Anticoagulation in Patients Requiring Antiplatelet Therapy</GuideLink>.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Pediatric Considerations</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Adult perioperative guidelines are generally appropriate for children on warfarin.</li>
                <li><strong>Key difference:</strong> Hold warfarin for <strong>3 days</strong> (not 5 days as in adults) before surgery, due to shorter warfarin half-life in children.</li>
                <li>Consult <strong>pediatric hematology and/or pediatric cardiology</strong> for bridging decisions.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* -- References -- */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                <li><GuideLink to="warfarin">Warfarin: General Guide</GuideLink></li>
                <li><GuideLink to="warfarinInr">Warfarin: Management of Out-of-Range INRs</GuideLink></li>
                <li><GuideLink to="warfarinPoc">Warfarin: Point-of-Care INR Monitoring</GuideLink></li>
                <li><GuideLink to="doacsPeriop">DOACs: Perioperative Management</GuideLink></li>
                <li><GuideLink to="ufhLmwh">Unfractionated Heparin, LMWH & Fondaparinux</GuideLink></li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Warfarin: Perioperative Management</strong> | Clinical Guide</p>
        <p>Not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
