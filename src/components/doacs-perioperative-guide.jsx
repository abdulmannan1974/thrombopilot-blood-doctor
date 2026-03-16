import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "bleed-risk", label: "Bleed Risk Categories" },
  { id: "dabigatran", label: "Dabigatran" },
  { id: "xa-inhibitors", label: "Xa Inhibitors" },
  { id: "postop", label: "Post-Op Management" },
  { id: "references", label: "References" },
];

const bleedRiskRows = [
  {
    category: "Minimal",
    procedures: "Dental cleaning, simple extraction; cataract surgery (topical anesthetic); minor skin procedures (biopsy, excision of small lesions)",
  },
  {
    category: "Low / Moderate",
    procedures: "Most general surgeries; endoscopy with biopsy; joint aspiration or injection; cardiac catheterization; pacemaker or ICD implantation",
  },
  {
    category: "High (includes neuraxial anesthesia)",
    procedures: "Intracranial surgery; cardiac surgery; spinal surgery; epidural catheter insertion or removal; major abdominal surgery; major orthopedic surgery",
  },
];

const dabigatranRows = [
  {
    risk: "Minimal bleed risk",
    crcl: "Any",
    timing: "Likely safe to continue, or hold on day of procedure, or delay dose 4\u20136 h post-procedure",
    halfLives: "\u2014",
    residual: "\u2014",
  },
  {
    risk: "Low / Moderate",
    crcl: "> 50 mL/min",
    timing: "Last dose 2 days before (skip 2 doses)",
    halfLives: "\u22483 half-lives",
    residual: "10\u201315%",
  },
  {
    risk: "High",
    crcl: "> 50 mL/min",
    timing: "Last dose 3\u20135 days before (skip 4\u20138 doses)",
    halfLives: "\u22484\u20135 half-lives",
    residual: "3\u20136%",
  },
  {
    risk: "Low / Moderate",
    crcl: "30\u201349 mL/min",
    timing: "Add 1\u20132 extra days of interruption beyond standard",
    halfLives: "Extended (renal)",
    residual: "Variable",
  },
  {
    risk: "High",
    crcl: "30\u201349 mL/min",
    timing: "Add 1\u20132 extra days of interruption beyond standard",
    halfLives: "Extended (renal)",
    residual: "Variable",
  },
];

const xaInhibitorRows = [
  {
    drug: "Rivaroxaban",
    lowMod: "Last dose 2 days before (skip 1 dose)",
    high: "Last dose 3 days before (skip 2 doses)",
    postop: "20 mg OD (or 15 mg if usual dose)",
  },
  {
    drug: "Apixaban",
    lowMod: "Last dose 2 days before (skip 2 doses)",
    high: "Last dose 3 days before (skip 4 doses)",
    postop: "5 mg BID",
  },
  {
    drug: "Edoxaban",
    lowMod: "Last dose 2 days before (skip 1 dose)",
    high: "Last dose 3 days before (skip 2 doses)",
    postop: "60 mg OD (or 30 mg if dose-reduced)",
  },
];

const references = [
  "Doherty JU, et al. 2017 ACC Expert consensus decision pathway for periprocedural management of anticoagulation in patients with nonvalvular atrial fibrillation. J Am Coll Cardiol. 2017;69(7):871-898.",
  "Douketis JD, et al. Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant (PAUSE study). JAMA Intern Med. 2019;179(11):1469-1478.",
  "Douketis JD, et al. Perioperative Management of Antithrombotic Therapy: An American College of Chest Physicians Clinical Practice Guideline. Chest. 2022;162(5):E207-E243.",
  "Douketis J, Spyropoulos A. Perioperative management of anticoagulant and antiplatelet therapy. NEJM Evid. 2023;2(6).",
  "Hrubesz G, et al. Perioperative management of apixaban in patients with advanced CKD undergoing a planned invasive procedure. Blood Adv. 2024;8(3):732-735.",
  "Macle L, et al. 2016 Focused Update of the Canadian Cardiovascular Society Guidelines for the Management of Atrial Fibrillation. Can J Cardiol. 2016;32:1170-1185.",
  "Schulman S, Crowther MA. How I treat with anticoagulants in 2012: new and old anticoagulants, and when and how to switch. Blood. 2012;119(13):3016-3023.",
  "Shaw JR, et al. Perioperative interruption of direct oral anticoagulants in patients with atrial fibrillation: a systematic review and meta-analysis. Res Pract Thromb Haemost. 2018;2:282-290.",
  "Shaw JR, et al. Periprocedural Management of Oral Anticoagulation. Med Clin North Am. 2020;104(4):709-726.",
  "Spyropoulos AC, et al. Periprocedural management of patients receiving a vitamin K antagonist or a direct oral anticoagulant requiring an elective procedure or surgery. J Thromb Haemost. 2016;14:875-885.",
];

export function DoacsPerioperativeGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h2 className="text-2xl font-bold leading-tight mt-1">DOACs: Perioperative Management</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Guidance for perioperative management of patients receiving a direct oral
          anticoagulant (DOAC) who require an elective surgery or procedure.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "asa-tab-btn active" : "asa-tab-btn"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {/* ───────── Overview ───────── */}
        {tab === "overview" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Objective</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                To provide guidance for the perioperative management of patients who are
                receiving a DOAC (apixaban, dabigatran, edoxaban, or rivaroxaban) and
                require an elective surgery or procedure. The goal is to minimise
                thromboembolic risk during anticoagulant interruption while ensuring no
                (or minimal) residual anticoagulant effect at the time of surgery, and to
                resume therapy carefully to avoid post-operative bleeding.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Three Key Considerations</h3>
              <ol className="text-sm text-foreground leading-relaxed mb-4">
                <li>
                  <strong>No reliable lab tests</strong> are widely available to confirm a
                  pre-operative minimal or absent residual DOAC effect.
                </li>
                <li>
                  <strong>Half-lives are approximately 10\u201312 hours</strong> for most
                  DOACs, informing when to stop before surgery. Dabigatran, which is 80%
                  renally cleared, has a longer half-life of 18\u201324 hours in patients
                  with impaired renal function.
                </li>
                <li>
                  <strong>Rapid onset of action:</strong> peak anticoagulant effect occurs
                  1\u20132 hours after oral intake, requiring caution with postoperative
                  resumption.
                </li>
              </ol>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">PAUSE Study</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The PAUSE study assessed a standardised perioperative management strategy
                in 3,007 DOAC-treated patients with atrial fibrillation. A simple
                perioperative DOAC management approach that did <strong>not</strong>{" "}
                involve perioperative heparin bridging or pre-operative coagulation
                function testing was associated with low rates of major bleeding (&lt;2%)
                and stroke/systemic embolism (&lt;1%).
              </p>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <strong>No heparin bridging needed for DOACs.</strong> The rapid offset and
              onset of action of DOACs obviates the need for heparin bridging as is done
              in selected <GuideLink to="warfarin">warfarin</GuideLink>-treated patients.
            </div>
          </div>
        )}

        {/* ───────── Bleed Risk Categories ───────── */}
        {tab === "bleed-risk" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Bleeding Risk for Invasive/Surgical Procedures
              </h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Risk Category</th>
                    <th>Example Procedures</th>
                  </tr>
                </thead>
                <tbody>
                  {bleedRiskRows.map((row) => (
                    <tr key={row.category}>
                      <td>
                        <strong>{row.category}</strong>
                      </td>
                      <td>{row.procedures}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Bleed risk stratification is empiric.</strong> Must account for
              patient-specific factors (e.g., concurrent antiplatelet therapy, prior
              history of major bleeding) as well as procedure-specific factors
              (proceduralist preferences, anticipated invasiveness). The classifications
              above are suggestions only. Factors that might otherwise increase or
              decrease the perceived bleeding risk should also be considered.
            </div>
          </div>
        )}

        {/* ───────── Dabigatran ───────── */}
        {tab === "dabigatran" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Dabigatran (Pradaxa) \u2014 Pre-Operative Management
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Dabigatran is a direct thrombin inhibitor with approximately 80% renal
                clearance. Pre-operative interruption is guided by both bleed risk and
                creatinine clearance (CrCl).
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Bleed Risk</th>
                    <th>CrCl</th>
                    <th>Pre-Op Timing</th>
                    <th>Half-Lives Elapsed</th>
                    <th>Residual Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {dabigatranRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.risk}</td>
                      <td>{row.crcl}</td>
                      <td>{row.timing}</td>
                      <td>{row.halfLives}</td>
                      <td>{row.residual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Renal Impairment (CrCl 30\u201349 mL/min)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Because 80% of dabigatran is cleared by the kidneys, patients with CrCl
                30\u201349 mL/min require 1\u20132 additional days of interruption beyond
                the standard intervals to ensure adequate elimination of any residual
                anticoagulant effect.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Post-Operative Resumption</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Resume dabigatran 150 mg or 110 mg twice daily cautiously after major
                surgery or in patients at increased bleeding risk. This is a{" "}
                <strong>therapeutic dose</strong>, which is higher than the dose used for
                routine post-operative VTE prophylaxis.
              </p>
            </article>
          </div>
        )}

        {/* ───────── Xa Inhibitors ───────── */}
        {tab === "xa-inhibitors" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Factor Xa Inhibitors \u2014 Pre-Operative Management
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Rivaroxaban, apixaban, and edoxaban share a similar perioperative
                approach. All have half-lives of approximately 10\u201312 hours with
                normal renal function.
              </p>

              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>
                  <strong>Minimal bleed risk:</strong> Likely safe to continue, or hold on
                  the day of the procedure, or delay dose 4\u20136 hours post-procedure.
                </li>
                <li>
                  <strong>Low/Moderate bleed risk:</strong> Last dose 2 days before
                  surgery (rivaroxaban/edoxaban = skip 1 dose; apixaban = skip 2 doses),
                  corresponding to approximately 2\u20133 half-lives.
                </li>
                <li>
                  <strong>High bleed risk:</strong> Last dose 3 days before surgery
                  (rivaroxaban/edoxaban = skip 2 doses; apixaban = skip 4 doses),
                  corresponding to approximately 4\u20135 half-lives.
                </li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Xa Inhibitor Pre-Op and Post-Op Summary
              </h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Drug</th>
                    <th>Low/Mod Pre-Op</th>
                    <th>High Pre-Op</th>
                    <th>Post-Op Resume Dose</th>
                  </tr>
                </thead>
                <tbody>
                  {xaInhibitorRows.map((row) => (
                    <tr key={row.drug}>
                      <td>
                        <strong>{row.drug}</strong>
                      </td>
                      <td>{row.lowMod}</td>
                      <td>{row.high}</td>
                      <td className="font-bold text-foreground">{row.postop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Severe Renal Impairment (CrCl &lt;30 mL/min)
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Limited data exist for Xa inhibitors in patients with CrCl &lt;30 mL/min.
                Some guidance recommends interrupting Xa inhibitors for an additional
                12\u201324 hours (depending on procedural bleed risk). A small
                retrospective study of apixaban-treated patients with advanced CKD (CrCl
                &lt;30) found that clinicians tended to hold apixaban 1\u20132 days longer
                than standard PAUSE management; the risk of major bleeding appeared
                similar to the PAUSE study.
              </p>
            </article>
          </div>
        )}

        {/* ───────── Post-Op Management ───────── */}
        {tab === "postop" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Post-Operative DOAC Resumption</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>
                  <strong>Low/Moderate bleed risk surgery:</strong> Resume DOAC
                  approximately <strong>24 hours</strong> after the procedure.
                </li>
                <li>
                  <strong>High bleed risk surgery:</strong> Resume DOAC{" "}
                  <strong>48\u201372 hours</strong> after the procedure.
                </li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>Caution:</strong> Resuming a DOAC post-operatively means giving a{" "}
              <strong>therapeutic dose</strong>, which is higher than the dose used for
              routine post-operative VTE prophylaxis. Exercise particular caution after
              major surgery or in patients at increased bleeding risk. For management of post-operative bleeding on a DOAC, see the <GuideLink to="doacsBleeding">DOACs: Management of Bleeding</GuideLink> guide.
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                High VTE Risk Patients \u2014 LMWH Bridging
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                In patients considered at high risk for venous thromboembolism, low-dose
                <GuideLink to="ufhLmwh">LMWH</GuideLink> can be administered during the initial 48{"\u2013"}72 hour post-operative
                period before the DOAC is resumed:
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>LMWH Agent</th>
                    <th>Prophylactic Dose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dalteparin (Fragmin)</td>
                    <td className="font-bold text-foreground">5,000 IU subcutaneous daily</td>
                  </tr>
                  <tr>
                    <td>Enoxaparin (Lovenox)</td>
                    <td className="font-bold text-foreground">40 mg subcutaneous daily</td>
                  </tr>
                  <tr>
                    <td>Tinzaparin (Innohep)</td>
                    <td className="font-bold text-foreground">4,500 IU subcutaneous daily</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Heparin Bridging</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                In general, the rapid offset and onset of action of DOACs obviates the
                need for heparin bridging. Bridging anticoagulation is not required and
                should not be routinely used in DOAC-treated patients.
              </p>
            </article>
          </div>
        )}

        {/* ───────── References ───────── */}
        {tab === "references" && (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
