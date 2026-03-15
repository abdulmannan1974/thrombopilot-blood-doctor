import { useState } from "react";

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
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Acute Stroke</span>
            </div>
            <h2 className="asa-guide-title">Stroke: Thrombolysis and Endovascular Therapy</h2>
            <div className="asa-guide-meta">
              <span>Thrombosis Canada</span>
              <span>Acute ischemic stroke reperfusion strategies</span>
            </div>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide guidance on the use of intravenous thrombolysis and endovascular therapy for acute ischemic stroke, including patient selection, dosing, and system requirements.
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Stroke thrombolysis guide sections">
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
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot blue" />IV Thrombolysis for Acute Ischemic Stroke</h3>
              <ul className="asa-ind-list">
                <li>Thrombolytic therapy is highly effective in acute ischemic stroke (AIS). Alteplase has been studied in 9 randomized controlled trials enrolling more than 6,700 patients.</li>
                <li>IV alteplase improves functional outcomes despite a small increased risk of serious bleeding.</li>
                <li>Treatment is time-sensitive: greatest benefit is achieved within 3 hours of symptom onset, with favorable outcomes observed up to 4.5 hours.</li>
                <li>Benefits of IV thrombolysis are preserved across patient age, stroke etiology, and severity of neurological deficit.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot danger" />Risks of IV Thrombolysis</h3>
              <div className="asa-ae-grid">
                <div className="asa-ae-card serious">
                  <div className="asa-ae-card-label">Intracranial hemorrhage</div>
                  <div className="asa-ae-card-text">Approximately 6% of treated patients; roughly 2% of ICH cases are fatal.</div>
                </div>
                <div className="asa-ae-card serious">
                  <div className="asa-ae-card-label">Extracranial hemorrhage</div>
                  <div className="asa-ae-card-text">Major extracranial bleeding is an uncommon but recognized complication.</div>
                </div>
                <div className="asa-ae-card moderate">
                  <div className="asa-ae-card-label">Angioedema</div>
                  <div className="asa-ae-card-text">Occurs in approximately 5% of patients. Prompt airway management may be required.</div>
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot teal" />Tenecteplase</h3>
              <ul className="asa-ind-list">
                <li>Tenecteplase 0.25 mg/kg (maximum 25 mg): five independent RCTs demonstrate comparable safety and efficacy to alteplase.</li>
                <li>Administered as a single IV bolus, making it easier to administer than the alteplase infusion protocol.</li>
                <li>Many stroke centers now use tenecteplase as their first-choice thrombolytic agent.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot purple" />Advanced Imaging and Extended Window</h3>
              <p className="asa-section-copy">
                Advanced neuroimaging (CT perfusion, MRI with diffusion/perfusion mismatch) can identify patients who may benefit from thrombolysis beyond the 4.5-hour window or when symptom onset is unknown.
              </p>
            </article>

            <div className="asa-alert asa-alert-info">
              <div>
                <strong>Time is brain:</strong> Target a door-to-needle time of less than 30 minutes. Every minute of delay reduces the probability of a good functional outcome.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "selection" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot green" />Inclusion Criteria</h3>
              <ul className="asa-ind-list">
                <li>Age 18 years or older.</li>
                <li>Clinically disabling acute ischemic stroke.</li>
                <li>Symptom onset within 4.5 hours (or last known well within 4.5 hours).</li>
                <li>Beyond 4.5 hours: consult a stroke specialist; advanced imaging may identify eligible patients.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot danger" />Absolute Exclusions</h3>
              <ul className="asa-ind-list">
                {absoluteExclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot orange" />Relative Exclusions</h3>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">History</div>
                <ul className="asa-ind-list">
                  {relativeExclusionsHistory.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">Clinical</div>
                <ul className="asa-ind-list">
                  {relativeExclusionsClinical.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">Laboratory</div>
                <ul className="asa-ind-list">
                  {relativeExclusionsLab.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">Imaging</div>
                <ul className="asa-ind-list">
                  {relativeExclusionsImaging.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="asa-alert asa-alert-warn">
              <div>
                <strong>Clinical judgement required:</strong> Relative exclusions do not automatically preclude treatment. Weigh the expected benefit of thrombolysis against the individual patient's bleeding risk, and involve a stroke specialist when possible.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "dosing" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot blue" />Thrombolytic Dosing</h3>
              <table className="asa-dose-table">
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
                    <td className="dose-highlight">0.9 mg/kg (max 90 mg)</td>
                    <td>10% as IV bolus over 1 minute, remainder infused over 60 minutes</td>
                  </tr>
                  <tr>
                    <td>Tenecteplase</td>
                    <td className="dose-highlight">0.25 mg/kg (max 25 mg)</td>
                    <td>Single IV bolus over 5 seconds</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot orange" />Post-Thrombolysis Monitoring</h3>
              <ul className="asa-ind-list">
                <li>No anticoagulants or antiplatelet agents within 24 hours of thrombolysis.</li>
                <li>Monitored setting with frequent neurological assessments and vital signs.</li>
                <li>Continuous cardiac monitoring.</li>
                <li>Maintain blood pressure below 180/105 mmHg during and for 24 hours after treatment.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot danger" />Complications and Management</h3>
              <div className="asa-ae-grid">
                {complications.map((item) => (
                  <div key={item.label} className={`asa-ae-card ${item.tone}`}>
                    <div className="asa-ae-card-label">{item.label}</div>
                    <div className="asa-ae-card-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-danger">
              <div>
                <strong>Suspected ICH:</strong> If intracranial hemorrhage is suspected, stop the thrombolytic infusion immediately, obtain urgent CT head, and administer cryoprecipitate and tranexamic acid. Consult neurosurgery.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "evt" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot teal" />Endovascular Thrombectomy (EVT)</h3>
              <ul className="asa-ind-list">
                <li>EVT is indicated for proximal intracranial artery occlusion: internal carotid artery (ICA), proximal middle cerebral artery (MCA M1), and vertebral or basilar artery.</li>
                <li>Strong evidence from multiple randomized controlled trials supports EVT for patients with moderate-to-severe neurological deficits.</li>
                <li>Most pivotal trials enrolled patients treated within 6 hours of symptom onset, but benefit extends up to 24 hours in patients selected by advanced imaging.</li>
                <li>Recent trials demonstrate benefit even for patients with large established infarction on neuroimaging.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot orange" />Important Considerations</h3>
              <ul className="asa-ind-list">
                <li>Two randomized trials found NO benefit for EVT in smaller intracranial vessel occlusions (e.g., M2, M3 segments).</li>
                <li>IV thrombolysis SHOULD be administered before EVT in eligible patients. Non-inferiority of EVT alone (without prior IV thrombolysis) has NOT been established.</li>
                <li>Pregnancy is not a contraindication for EVT.</li>
                <li>Pediatric stroke: limited data available; consult a pediatric stroke specialist.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot purple" />System Requirements</h3>
              <ul className="asa-ind-list">
                <li>Coordinated pre-hospital and in-hospital systems for rapid patient identification and transfer.</li>
                <li>Rapid access to neurovascular imaging (CT angiography, CT perfusion, or MR angiography).</li>
                <li>Neurointerventional expertise available around the clock.</li>
                <li>Dedicated neuroscience critical care for post-procedural management.</li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <div>
                <strong>Do not delay IV thrombolysis for EVT:</strong> Eligible patients should receive IV thrombolysis as soon as possible. Thrombolysis should not be withheld or delayed while arranging endovascular therapy.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot gray" />References</h3>
              <ol className="asa-ref-list">
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="asa-guide-footer">
        <p><strong>Stroke: Thrombolysis and Endovascular Therapy</strong> | Thrombosis Canada</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
