import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["selection", "Patient Selection"],
  ["dosing", "Dosing & Monitoring"],
  ["evt", "Endovascular Therapy"],
  ["references", "References"],
];

const absoluteExclusions = [
  "Active hemorrhage at a non-compressible site.",
  "Intracranial hemorrhage or intracranial neoplasm on baseline imaging.",
];

const relativeExclusionsHistory = [
  "Prior intracranial hemorrhage.",
  "Recent stroke, ST-elevation MI, or significant head injury within the past 3 months.",
  "Major surgery within the past 14 days.",
  "Recent gastrointestinal or genitourinary hemorrhage within the past 21 days.",
  "Arterial puncture at a non-compressible site within the past 7 days.",
];

const relativeExclusionsClinical = [
  "Symptoms suggestive of subarachnoid hemorrhage.",
  "Stroke mimics: seizure with Todd's paresis, hypoglycemia, or hyperglycemia.",
  "Refractory hypertension (systolic >185 mmHg or diastolic >110 mmHg) despite treatment.",
  "Suspected arterial dissection or infective endocarditis.",
  "Currently taking a direct oral anticoagulant (DOAC).",
];

const relativeExclusionsLab = [
  "Blood glucose <2.7 mmol/L or >22.2 mmol/L.",
  "Platelet count <100,000/\u00B5L.",
  "INR >1.7.",
];

const relativeExclusionsImaging = [
  "Extensive established infarction on CT or MRI.",
];

const complications = [
  { label: "Intracranial hemorrhage", text: "Approximately 6% overall; roughly 2% of ICH cases are fatal. Treat with cryoprecipitate and tranexamic acid.", tone: "serious" },
  { label: "Extracranial bleeding", text: "Major extracranial hemorrhage may occur; monitor closely and manage per institutional protocol.", tone: "serious" },
  { label: "Angioedema", text: "Occurs in approximately 5% of patients receiving IV thrombolysis; manage airway promptly.", tone: "moderate" },
  { label: "Anaphylaxis", text: "Rare but potentially life-threatening; standard anaphylaxis management applies.", tone: "moderate" },
];

const references = [
  "National Institute of Neurological Disorders and Stroke rt-PA Stroke Study Group. Tissue plasminogen activator for acute ischemic stroke. N Engl J Med. 1995;333:1581-1587.",
  "Hacke W, et al. Thrombolysis with alteplase 3 to 4.5 hours after acute ischemic stroke (ECASS III). N Engl J Med. 2008;359:1317-1329.",
  "Campbell BCV, et al. Tenecteplase versus alteplase before thrombectomy for ischemic stroke (EXTEND-IA TNK). N Engl J Med. 2018;378:1573-1582.",
  "Menon BK, et al. Intravenous tenecteplase compared with alteplase for acute ischaemic stroke in Canada (AcT): a pragmatic, multicentre, open-label, registry-linked, randomised, controlled, non-inferiority trial. Lancet. 2022;400:161-169.",
  "Goyal M, et al. Endovascular thrombectomy after large-vessel ischaemic stroke: a meta-analysis of individual patient data from five randomised trials (HERMES). Lancet. 2016;387:1723-1731.",
  "Nogueira RG, et al. Thrombectomy 6 to 24 hours after stroke with a mismatch between deficit and infarct (DAWN). N Engl J Med. 2018;378:11-21.",
  "Albers GW, et al. Thrombectomy for stroke at 6 to 16 hours with selection by perfusion imaging (DEFUSE 3). N Engl J Med. 2018;378:708-718.",
  "Thomalla G, et al. MRI-guided thrombolysis for stroke with unknown time of onset (WAKE-UP). N Engl J Med. 2018;379:611-622.",
  "LeCouffe NE, et al. Intravenous alteplase before endovascular thrombectomy (MR CLEAN-NO IV). N Engl J Med. 2021;385:1833-1844.",
  "Yoshimura S, et al. Endovascular therapy for acute stroke with a large ischemic region (RESCUE-Japan LIMIT). N Engl J Med. 2022;386:1303-1313.",
];

export function StrokeThrombolysisGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Acute Stroke</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Stroke: Thrombolysis and Endovascular Therapy</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span>Acute ischemic stroke reperfusion strategies</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide guidance on the use of intravenous thrombolysis and endovascular therapy for acute ischemic stroke, including patient selection, dosing, and system requirements.
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Stroke thrombolysis guide sections">
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

        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />IV Thrombolysis for Acute Ischemic Stroke</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Thrombolytic therapy is highly effective in acute ischemic stroke (AIS). Alteplase has been studied in 9 randomized controlled trials enrolling more than 6,700 patients.</li>
                <li>IV alteplase improves functional outcomes despite a small increased risk of serious bleeding.</li>
                <li>Treatment is time-sensitive: greatest benefit is achieved within 3 hours of symptom onset, with favorable outcomes observed up to 4.5 hours.</li>
                <li>Benefits of IV thrombolysis are preserved across patient age, stroke etiology, and severity of neurological deficit.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />Risks of IV Thrombolysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Intracranial hemorrhage</div>
                  <div className="text-sm leading-relaxed">Approximately 6% of treated patients; roughly 2% of ICH cases are fatal.</div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Extracranial hemorrhage</div>
                  <div className="text-sm leading-relaxed">Major extracranial bleeding is an uncommon but recognized complication.</div>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Angioedema</div>
                  <div className="text-sm leading-relaxed">Occurs in approximately 5% of patients. Prompt airway management may be required.</div>
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />Tenecteplase</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Tenecteplase 0.25 mg/kg (maximum 25 mg): five independent RCTs demonstrate comparable safety and efficacy to alteplase.</li>
                <li>Administered as a single IV bolus, making it easier to administer than the alteplase infusion protocol.</li>
                <li>Many stroke centers now use tenecteplase as their first-choice thrombolytic agent.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />Advanced Imaging and Extended Window</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Advanced neuroimaging (CT perfusion, MRI with diffusion/perfusion mismatch) can identify patients who may benefit from thrombolysis beyond the 4.5-hour window or when symptom onset is unknown.
              </p>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Time is brain:</strong> Target a door-to-needle time of less than 30 minutes. Every minute of delay reduces the probability of a good functional outcome.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "selection" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />Inclusion Criteria</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Age 18 years or older.</li>
                <li>Clinically disabling acute ischemic stroke.</li>
                <li>Symptom onset within 4.5 hours (or last known well within 4.5 hours).</li>
                <li>Beyond 4.5 hours: consult a stroke specialist; advanced imaging may identify eligible patients.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />Absolute Exclusions</h3>
              <ul className="list-none p-0 space-y-1">
                {absoluteExclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />Relative Exclusions</h3>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">History</div>
                <ul className="list-none p-0 space-y-1">
                  {relativeExclusionsHistory.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Clinical</div>
                <ul className="list-none p-0 space-y-1">
                  {relativeExclusionsClinical.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Laboratory</div>
                <ul className="list-none p-0 space-y-1">
                  {relativeExclusionsLab.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Imaging</div>
                <ul className="list-none p-0 space-y-1">
                  {relativeExclusionsImaging.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Clinical judgement required:</strong> Relative exclusions do not automatically preclude treatment. Weigh the expected benefit of thrombolysis against the individual patient's bleeding risk, and involve a stroke specialist when possible.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "dosing" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />Thrombolytic Dosing</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Dose</th>
                    <th>Administration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alteplase</td>
                    <td className="font-bold text-foreground">0.9 mg/kg (max 90 mg)</td>
                    <td>10% as IV bolus over 1 minute, remainder infused over 60 minutes</td>
                  </tr>
                  <tr>
                    <td>Tenecteplase</td>
                    <td className="font-bold text-foreground">0.25 mg/kg (max 25 mg)</td>
                    <td>Single IV bolus over 5 seconds</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />Post-Thrombolysis Monitoring</h3>
              <ul className="list-none p-0 space-y-1">
                <li>No anticoagulants or antiplatelet agents within 24 hours of thrombolysis.</li>
                <li>Monitored setting with frequent neurological assessments and vital signs.</li>
                <li>Continuous cardiac monitoring.</li>
                <li>Maintain blood pressure below 180/105 mmHg during and for 24 hours after treatment.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />Complications and Management</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complications.map((item) => (
                  <div key={item.label} className={`asa-ae-card ${item.tone}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <div>
                <strong>Suspected ICH:</strong> If intracranial hemorrhage is suspected, stop the thrombolytic infusion immediately, obtain urgent CT head, and administer cryoprecipitate and tranexamic acid. Consult neurosurgery.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "evt" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />Endovascular Thrombectomy (EVT)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>EVT is indicated for proximal intracranial artery occlusion: internal carotid artery (ICA), proximal middle cerebral artery (MCA M1), and vertebral or basilar artery.</li>
                <li>Strong evidence from multiple randomized controlled trials supports EVT for patients with moderate-to-severe neurological deficits.</li>
                <li>Most pivotal trials enrolled patients treated within 6 hours of symptom onset, but benefit extends up to 24 hours in patients selected by advanced imaging.</li>
                <li>Recent trials demonstrate benefit even for patients with large established infarction on neuroimaging.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />Important Considerations</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Two randomized trials found NO benefit for EVT in smaller intracranial vessel occlusions (e.g., M2, M3 segments).</li>
                <li>IV thrombolysis SHOULD be administered before EVT in eligible patients. Non-inferiority of EVT alone (without prior IV thrombolysis) has NOT been established.</li>
                <li>Pregnancy is not a contraindication for EVT.</li>
                <li>Pediatric stroke: limited data available; consult a pediatric stroke specialist.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />System Requirements</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Coordinated pre-hospital and in-hospital systems for rapid patient identification and transfer.</li>
                <li>Rapid access to neurovascular imaging (CT angiography, CT perfusion, or MR angiography).</li>
                <li>Neurointerventional expertise available around the clock.</li>
                <li>Dedicated neuroscience critical care for post-procedural management.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Do not delay IV thrombolysis for EVT:</strong> Eligible patients should receive IV thrombolysis as soon as possible. Thrombolysis should not be withheld or delayed while arranging endovascular therapy.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />References</h3>
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
        <p><strong>Stroke: Thrombolysis and Endovascular Therapy</strong></p>
        <p>Related: <GuideLink to="strokeSecondary">Ischemic Stroke Secondary Prevention</GuideLink> | <GuideLink to="strokeAf">Stroke Prevention in AF</GuideLink> | <GuideLink to="doacsBleeding">DOACs Bleeding Management</GuideLink></p>
      </div>
    </section>
  );
}
