import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["short", "DAPT <12 Months"],
  ["extended", "DAPT >12 Months"],
  ["elective", "Elective PCI"],
  ["anticoag", "With Anticoagulation"],
  ["references", "References"],
];

const references = [
  "Bainey KR, et al. Canadian Cardiovascular Society/Canadian Association of Interventional Cardiology 2023 Focused Update of the Guidelines for the Use of Antiplatelet Therapy. Can J Cardiol 2024;40:160-181.",
  "Bonaca MP, et al. Long-term use of ticagrelor in patients with prior myocardial infarction (PEGASUS-TIMI 54). N Engl J Med 2015;372:1791-1800.",
  "Eikelboom JW, et al. Rivaroxaban with or without aspirin in stable cardiovascular disease (COMPASS). N Engl J Med 2017;377:1319-1330.",
  "Mauri L, et al. Twelve or 30 months of dual antiplatelet therapy after drug-eluting stents (DAPT trial). N Engl J Med 2014;371:2155-2166.",
  "Mehran R, et al. Ticagrelor with or without aspirin in high-risk patients after PCI (TWILIGHT). N Engl J Med 2019;381:2032-2042.",
  "Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients with Acute Coronary Syndromes. J Am Coll Cardiol 2025;85(22):2135-2237.",
  "Wallentin L, et al. Ticagrelor versus clopidogrel in patients with acute coronary syndromes (PLATO). N Engl J Med 2009;361:1045-1057.",
  "Watanabe H, et al. Effect of 1-month dual antiplatelet therapy followed by clopidogrel vs 12-month dual antiplatelet therapy (STOPDAPT-2). JAMA 2019;321(24):2414-2427.",
  "Wiviott SD, et al. Prasugrel versus clopidogrel in patients with acute coronary syndromes (TRITON-TIMI 38). N Engl J Med 2007;357:2001-2015.",
  "Jang Y, et al. One-month dual antiplatelet therapy followed by prasugrel monotherapy at a reduced dose: the 4D-ACS randomised trial. EuroIntervention 2025. DOI: 10.4244/EIJ-D-25-00331.",
];

const relatedGuideKeys = [
  { to: "asa", label: "ASA" },
  { to: "clopidogrel", label: "Clopidogrel" },
  { to: "prasugrel", label: "Prasugrel" },
  { to: "ticagrelor", label: "Ticagrelor" },
  { to: "rivaroxaban", label: "Rivaroxaban" },
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function DaptDurationGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Antiplatelet Therapy</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">v16</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Duration of Dual Antiplatelet Therapy in Patients With Coronary Artery Disease</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span>Updated 6 February 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To review the optimal duration of dual antiplatelet therapy (DAPT) following elective and emergent percutaneous coronary intervention (PCI) for the treatment of chronic stable angina and acute coronary syndromes (ACS).
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="DAPT duration guide sections">
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
        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Background</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The optimal duration of DAPT following PCI is influenced by patient, clinical, and procedural characteristics. The benefit of DAPT for reduction in ischaemic risk must be weighed against the risk of bleeding from its extended use.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="cardiac" />Efficacy of DAPT</h3>
              <ul className="list-none p-0 space-y-1">
                <li>ASA combined with clopidogrel, ticagrelor, or prasugrel is indicated for ACS to prevent future major adverse cardiovascular events (MACE).</li>
                <li>ASA with clopidogrel is indicated following elective PCI for chronic stable angina.</li>
              </ul>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">ACS with Revascularisation</div>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>PCI-CURE:</strong> Established benefit of DAPT (clopidogrel + ASA) over ASA alone in NSTEACS patients undergoing PCI.</li>
                  <li><strong>PLATO:</strong> Ticagrelor demonstrated increased efficacy over clopidogrel following PCI for ACS. Also effective after CABG.</li>
                  <li><strong>TRITON-TIMI 38:</strong> Prasugrel demonstrated increased efficacy over clopidogrel following PCI for ACS.</li>
                  <li><strong>ISAR-REACT 5:</strong> Prasugrel showed a 26% relative risk reduction over ticagrelor in a composite CV outcome, driven by nonfatal MI.</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Medically Managed ACS</div>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>CURE:</strong> Clopidogrel + ASA resulted in a 20% reduction in the combined endpoint of death, MI, and stroke.</li>
                  <li><strong>PLATO:</strong> Ticagrelor demonstrated increased efficacy over clopidogrel in medically managed ACS.</li>
                  <li><strong>TRILOGY:</strong> Prasugrel did not show additional benefit over clopidogrel without revascularisation.</li>
                </ul>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>No mortality benefit:</strong> None of the major DAPT trials have shown an overall mortality benefit with dual antiplatelet therapy.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Bleeding Considerations</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                While second-generation P2Y12 inhibitors (prasugrel and ticagrelor) reduce MACE rates compared to clopidogrel, they are associated with increased rates of major bleeding. Caution is needed when selecting a second-generation P2Y12 inhibitor over clopidogrel, especially in patients at increased risk of bleeding.
              </p>
              <ul className="list-none p-0 space-y-1">
                <li><strong>PLATO:</strong> Ticagrelor was associated with increased non-CABG-related bleeding vs clopidogrel.</li>
                <li><strong>TRITON:</strong> Prasugrel was associated with increased major bleeding vs clopidogrel.</li>
                <li><strong>TRILOGY:</strong> Prasugrel had similar bleeding rates to clopidogrel in medically treated patients.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── DAPT <12 Months ── */}
        {tab === "short" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Shorter DAPT Strategies (1-6 Months)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Multiple trials in selected patients have demonstrated that shorter durations of DAPT (1-6 months) post PCI reduce clinically relevant and major bleeding compared with 12 months. De-escalation from potent P2Y12 inhibitors to clopidogrel at 30 days also reduces major bleeding.
              </p>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Key Trials</div>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>STOP-DAPT2:</strong> 1 month DAPT followed by clopidogrel monotherapy showed superiority in a composite of CV thrombotic and bleeding events vs 12-month DAPT. Non-inferior for CV endpoints, superior for bleeding reduction.</li>
                  <li><strong>SMART-CHOICE:</strong> 3 months DAPT followed by P2Y12 monotherapy (clopidogrel in ~75%) demonstrated non-inferiority for MACE vs 12-month DAPT. Consistent in ACS subgroup.</li>
                  <li><strong>TWILIGHT:</strong> 3 months DAPT with ticagrelor followed by ticagrelor monotherapy significantly reduced bleeding. Non-inferior for MACE. ~7000 patients with high-risk features.</li>
                  <li><strong>MASTER DAPT:</strong> 1 month abbreviated DAPT vs standard DAPT (3+ months) in 4579 high bleeding risk ACS patients. Comparable adverse outcomes and MACE. Significantly reduced major/clinically relevant bleeding.</li>
                  <li><strong>TICO:</strong> Ticagrelor monotherapy vs ticagrelor + ASA after 3 months DAPT in 3056 ACS patients. Reduced adverse outcomes and major bleeding. No significant difference in MACCE.</li>
                  <li><strong>SMART-DATE:</strong> 6-month vs 12-month DAPT in 2712 ACS patients. Non-inferior for composite of death, MI, or stroke. However, higher MI rate in the 6-month group.</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">De-escalation Strategies</div>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>TOPIC:</strong> De-escalation from potent P2Y12 to clopidogrel at 30 days: no difference in ischaemic outcomes but reduced major bleeding.</li>
                  <li><strong>TALOS-AMI:</strong> De-escalation to clopidogrel at 30 days significantly reduced the composite of ischaemic outcomes plus major bleeding.</li>
                  <li><strong>STOPDAPT-2 ACS:</strong> Clopidogrel monotherapy after 1 month of DAPT appeared to increase MI risk compared with 12 months DAPT.</li>
                  <li><strong>4D-ACS:</strong> 1 month DAPT (ASA + prasugrel 10 mg) followed by prasugrel 5 mg monotherapy: 49% reduction in net adverse clinical events (NACE), driven largely by a 77% reduction in bleeding events.</li>
                </ul>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Standard of care:</strong> 12-month DAPT remains the default recommendation for ACS patients who are not at high risk for bleeding.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Caution:</strong> Shorter DAPT strategies should NOT be universally adopted in the broader ACS population. They should be considered only when there is a specific rationale, such as high bleeding risk. De-escalation of antiplatelet therapy within the first 30 days is NOT recommended.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Clinical Approach</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Individuals experiencing significant bleeding after PCI face heightened mortality risk that may counterbalance the protective effects of DAPT. Clinicians should favour a shared decision-making approach, weighing bleeding versus ischaemic risks, when considering shorter duration or de-escalation strategies.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── DAPT >12 Months ── */}
        {tab === "extended" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Extended DAPT Beyond 12 Months</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Patients at high risk for MACE following PCI for ACS may derive benefit from extended DAPT beyond 1 year. However, extended DAPT consistently increases bleeding without clear mortality benefit. The decision requires individualisation based on thrombotic and bleeding risk factors.
              </p>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">DAPT Trial</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Compared 30 vs 12 months of DAPT (clopidogrel or prasugrel + ASA) following PCI for stable CAD or ACS.</li>
                  <li>30 months of DAPT was associated with lower rates of stent thrombosis and MACE.</li>
                  <li>Extended DAPT was associated with higher rates of moderate to severe bleeding.</li>
                  <li>No cardiovascular mortality difference was found.</li>
                  <li>Unexpected exploratory finding: higher rates of all-cause mortality associated with extended DAPT.</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">PEGASUS-TIMI 54 Trial</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Enrolled stable patients 1-3 years post-MI. Ticagrelor 90 mg BID or 60 mg BID + ASA vs ASA + placebo.</li>
                  <li>Both ticagrelor doses reduced the composite of CV death, MI, and stroke vs placebo.</li>
                  <li>Both doses increased TIMI major bleeding vs placebo.</li>
                  <li>No difference in mortality between groups.</li>
                </ul>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Key principle:</strong> Extended DAPT beyond 12 months reduces thrombotic outcomes at the expense of higher bleeding risk. There is no clear mortality benefit. Individualise the decision based on thrombotic versus bleeding risk factors.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Elective PCI ── */}
        {tab === "elective" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />DAPT After Elective PCI (Non-ACS)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Patients undergoing elective PCI for a non-ACS indication are at inherently lower risk for long-term MACE compared to those undergoing PCI for ACS. Newer-generation drug-eluting stents (DES) also carry inherently lower thrombotic risk than first-generation sirolimus and tacrolimus DES.
              </p>
              <ul className="list-none p-0 space-y-1">
                <li>DAPT is recommended for up to 1 year post elective PCI.</li>
                <li>DAPT duration may be shortened to a total of 6 months based on several trials demonstrating safety.</li>
                <li>DAPT beyond 1 year may be considered if clinical or angiographic variables suggest high thrombotic risk AND the patient is at low risk of bleeding.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />High Thrombotic Risk Variables Post PCI</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Age greater than 65 years</li>
                <li>Diabetes mellitus</li>
                <li>Prior myocardial infarction</li>
                <li>Chronic renal dysfunction (creatinine clearance less than 60 mL/min)</li>
                <li>Multi-vessel disease</li>
                <li>Multiple stents implanted</li>
                <li>Complex bifurcation lesions</li>
                <li>Total stent length greater than 60 mm</li>
                <li>Chronic total occlusion intervention</li>
                <li>Bioabsorbable vascular scaffold implantation</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── With Anticoagulation ── */}
        {tab === "anticoag" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />DAPT in Patients Requiring Anticoagulation</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Patients often have an indication for anticoagulation post ACS, such as atrial fibrillation, VTE, or mechanical valve. The challenge is balancing thrombotic protection from DAPT with the additional bleeding risk of triple antithrombotic therapy.
              </p>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Evidence on ASA Discontinuation</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Meta-analyses across randomised trials suggest no difference in mortality, stroke, or overall MACE when ASA is discontinued for patients on an oral anticoagulant (OAC).</li>
                  <li>There is a marginal apparent increase in MI and stent thrombosis when ASA is discontinued.</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">2025 ACC Guideline Recommendation</div>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>Class 1B recommendation:</strong> Discontinue ASA within 1-4 weeks of beginning triple antithrombotic therapy.</li>
                  <li>Switch to clopidogrel as the P2Y12 inhibitor (trials of more potent agents excluded these patients).</li>
                </ul>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Dual Pathway Inhibition (COMPASS)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The COMPASS trial (27,395 stable CAD patients, 62% with prior MI) evaluated a dual antithrombotic strategy for maintenance treatment beyond 12 months post-ACS.
              </p>
              <ul className="list-none p-0 space-y-1">
                <li>Rivaroxaban 2.5 mg BID + ASA is recommended for patients at high thrombotic risk without significantly increased bleeding risk.</li>
                <li>The combination showed significant reduction in combined ischaemic events, overall mortality, and CV mortality.</li>
                <li>Increased major bleeding was observed, but without a significant rise in fatal, intracranial, or critical organ bleeding events.</li>
              </ul>

              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <div>
                  <strong>COMPASS-PCI subgroup:</strong> In patients with prior PCI, dual pathway inhibition vs ASA alone produced significant reductions in MACE irrespective of time since previous PCI (from 1 year up to 10 years).
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                {relatedGuideKeys.map((item) => (
                  <li key={item.to}><GuideLink to={item.to}>{item.label}</GuideLink></li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Duration of Dual Antiplatelet Therapy in Patients With Coronary Artery Disease</strong> | Updated 6 February 2026 | Version 16</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
