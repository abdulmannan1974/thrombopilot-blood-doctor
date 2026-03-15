import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "riskfactors", label: "Risk Factor Control" },
  { id: "antiplatelet", label: "Antiplatelet Therapy" },
  { id: "anticoag-af", label: "Anticoagulation for AF" },
  { id: "aetiology", label: "Aetiology-Specific" },
  { id: "references", label: "References" },
];

const references = [
  "Gladstone DJ, Lindsay MP, Bhatt DL, et al. Canadian Stroke Best Practice Recommendations: Secondary Prevention of Stroke, 7th ed. Can J Neurol Sci 2022;49(S3):S1-S73.",
  "Kleindorfer DO, Towfighi A, Chaturvedi S, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack: AHA/ASA. Stroke 2021;52:e364-e467.",
  "Johnston SC, Easton JD, Farrant M, et al. Clopidogrel and aspirin in acute ischemic stroke and high-risk TIA (CHANCE-2/POINT). N Engl J Med 2018;379:215-225.",
  "Johnston SC, Amarenco P, Denison H, et al. Ticagrelor and aspirin or aspirin alone in acute ischemic stroke or TIA (THALES). N Engl J Med 2020;383:207-217.",
  "Eikelboom JW, Connolly SJ, Bosch J, et al. Rivaroxaban with or without aspirin in stable cardiovascular disease (COMPASS). N Engl J Med 2017;377:1319-1330.",
  "Hart RG, Sharma M, Mundl H, et al. Rivaroxaban for stroke prevention after embolic stroke of undetermined source (NAVIGATE ESUS). N Engl J Med 2018;378:2191-2201.",
  "Hao Q, Tampi M, O'Donnell M, et al. Clopidogrel plus aspirin versus aspirin alone for acute minor ischaemic stroke or high risk TIA: systematic review and meta-analysis. BMJ 2018;363:k5108.",
  "Kasner SE, Swaminathan B, Engel S, et al. Anticoagulation timing after acute ischemic stroke with atrial fibrillation (ELAN). N Engl J Med 2023;389:1-11.",
  "Mas JL, Derumeaux G, Guillon B, et al. Patent foramen ovale closure or anticoagulation vs. antiplatelets after stroke (CLOSE). N Engl J Med 2017;377:1011-1021.",
  "Markus HS, Levi C, King A, et al. Antiplatelet therapy vs anticoagulation therapy in cervical artery dissection (CADISS). Lancet Neurol 2015;14:361-367.",
];

export function IschemicStrokeSecondaryPreventionGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Thrombosis Canada</span>
            <span className="asa-badge">Version 60 · May 2025</span>
          </div>
          <h1 className="asa-guide-title">
            Ischemic Stroke or TIA: Secondary Prevention
          </h1>
          <p className="asa-guide-lead">
            Evidence-based strategies to reduce recurrent vascular events after
            ischemic stroke or transient ischemic attack — integrating risk
            factor control, antithrombotic therapy, and aetiology-specific
            interventions aligned with Canadian Stroke Best Practices.
          </p>
        </div>
      </div>

      <div className="asa-tab-bar">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`asa-tab-btn${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="asa-tab-body">
        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Principles of Secondary Prevention
              </h2>
              <div className="asa-section-copy">
                <p>
                  Secondary prevention after ischemic stroke or TIA aims to
                  reduce the risk of recurrent stroke, myocardial infarction,
                  and other vascular events. Recurrence risk is highest in the
                  first days to weeks after the index event, making early
                  intervention critical.
                </p>
                <p>The three pillars of secondary prevention are:</p>
                <ul>
                  <li>
                    <strong>Modifiable risk factor control</strong> —
                    hypertension, dyslipidemia, diabetes, lifestyle
                  </li>
                  <li>
                    <strong>Antithrombotic therapy</strong> — antiplatelet agents
                    or anticoagulation depending on stroke mechanism
                  </li>
                  <li>
                    <strong>Aetiology-specific interventions</strong> — carotid
                    revascularization, PFO closure, dissection management
                  </li>
                </ul>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Canadian Stroke Best Practices Alignment
              </h2>
              <div className="asa-section-copy">
                <p>
                  Recommendations in this guide are aligned with the Canadian
                  Stroke Best Practice Recommendations for Secondary Prevention
                  of Stroke. An individualized approach incorporating patient
                  education, counselling, and shared decision-making is essential
                  at every stage.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Patient Education</h2>
              <div className="asa-section-copy">
                <p>
                  All patients and their families should receive individualized
                  education regarding stroke warning signs, modifiable risk
                  factors, medication adherence, and when to seek emergency care.
                  Shared decision-making should guide antithrombotic selection,
                  surgical interventions, and long-term management plans.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── RISK FACTOR CONTROL ── */}
        {activeTab === "riskfactors" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Lifestyle Modifications</h2>
              <div className="asa-section-copy">
                <ul>
                  <li>
                    <strong>Diet:</strong> Mediterranean or DASH dietary pattern;
                    sodium intake &lt;2000 mg/day
                  </li>
                  <li>
                    <strong>Exercise:</strong> ≥150 minutes of
                    moderate-intensity aerobic exercise per week
                  </li>
                  <li>
                    <strong>Weight:</strong> Target BMI 18.5–24.9 kg/m²
                  </li>
                  <li>
                    <strong>Smoking cessation:</strong> Strongly recommended.
                    Pharmacotherapy options include nicotine replacement therapy
                    (NRT), varenicline, and bupropion
                  </li>
                  <li>
                    <strong>Contraception:</strong> Avoid estrogen-containing
                    oral contraceptives in patients with a history of ischemic
                    stroke or TIA
                  </li>
                  <li>
                    <strong>Alcohol:</strong> "Drinking less is better" — no
                    safe threshold established; encourage reduction or
                    abstinence
                  </li>
                </ul>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Hypertension</h2>
              <div className="asa-section-copy">
                <div className="asa-alert asa-alert-red">
                  Hypertension is the single most important modifiable risk
                  factor for recurrent stroke.
                </div>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Population</th>
                      <th>Blood Pressure Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Most patients with ischemic stroke/TIA</td>
                      <td>&lt;140/90 mmHg</td>
                    </tr>
                    <tr>
                      <td>Patients with diabetes</td>
                      <td>&lt;130/80 mmHg</td>
                    </tr>
                    <tr>
                      <td>Lacunar strokes (small-vessel disease)</td>
                      <td>SBP &lt;130 mmHg</td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ marginTop: "0.75rem" }}>
                  An ACE inhibitor combined with a thiazide diuretic is the
                  recommended first-line combination for blood pressure lowering
                  in stroke secondary prevention.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Dyslipidemia</h2>
              <div className="asa-section-copy">
                <p>
                  Initiate high-intensity statin therapy to achieve{" "}
                  <strong>LDL ≤1.8 mmol/L</strong>.
                </p>
                <p>If maximum tolerated statin is insufficient:</p>
                <ol>
                  <li>Add ezetimibe</li>
                  <li>
                    If still not at target, add a PCSK9 inhibitor (evolocumab or
                    alirocumab)
                  </li>
                </ol>
                <p>
                  <strong>Icosapent ethyl 2 g BID</strong> should be considered
                  in patients with triglycerides ≥1.5 mmol/L and established
                  cardiovascular disease despite statin therapy.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Diabetes</h2>
              <div className="asa-section-copy">
                <p>
                  Target <strong>A1C ≤7.0%</strong> for most patients.
                </p>
                <p>
                  If standard antidiabetic therapy is insufficient, consider
                  agents with proven cardiovascular benefit:
                </p>
                <ul>
                  <li>
                    <strong>SGLT-2 inhibitors</strong> (empagliflozin,
                    dapagliflozin)
                  </li>
                  <li>
                    <strong>GLP-1 receptor agonists</strong> (semaglutide,
                    liraglutide, dulaglutide)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── ANTIPLATELET THERAPY ── */}
        {activeTab === "antiplatelet" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute Phase</h2>
              <div className="asa-section-copy">
                <p>
                  Start antiplatelet therapy as soon as possible after ischemic
                  stroke or TIA, once intracerebral hemorrhage has been excluded
                  on brain imaging.
                </p>
                <ul>
                  <li>
                    <strong>Loading dose:</strong> ASA 160 mg, then 80 mg daily
                  </li>
                  <li>
                    <strong>Post-thrombolysis (tPA):</strong> Delay
                    antiplatelets for 24 hours. Repeat brain imaging before
                    initiation to exclude hemorrhagic transformation
                  </li>
                </ul>

                <div className="asa-alert asa-alert-blue">
                  <strong>Short-course DAPT for minor stroke or TIA:</strong>
                  <br />
                  For non-cardioembolic minor non-disabling stroke (NIHSS &lt;4)
                  or high-risk TIA in patients who are NOT at high bleeding
                  risk:
                  <br />
                  <br />
                  <strong>Option 1 (21 days):</strong> Clopidogrel 300–600 mg
                  load + 75 mg daily PLUS ASA 160 mg load + 80 mg daily for 21
                  days, then switch to single antiplatelet monotherapy.
                  <br />
                  <br />
                  <strong>Option 2 (30 days):</strong> Ticagrelor 180 mg load +
                  90 mg BID PLUS ASA for up to 30 days, then ticagrelor
                  monotherapy or switch to clopidogrel/ASA.
                  <br />
                  <br />
                  DAPT can be initiated up to 72 hours after the index event.
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Long-term Antiplatelet Therapy</h2>
              <div className="asa-section-copy">
                <p>
                  After the acute phase, long-term single antiplatelet therapy is
                  recommended:
                </p>
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Dose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ASA</td>
                      <td>80 mg daily</td>
                    </tr>
                    <tr>
                      <td>Clopidogrel</td>
                      <td>75 mg daily</td>
                    </tr>
                    <tr>
                      <td>ASA-dipyridamole ER</td>
                      <td>25/200 mg BID</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Symptomatic Intracranial Stenosis
              </h2>
              <div className="asa-section-copy">
                <p>
                  For patients with symptomatic intracranial stenosis of{" "}
                  <strong>70–99%</strong>: dual antiplatelet therapy with ASA +
                  clopidogrel for <strong>3 months</strong>, then transition to a
                  single antiplatelet agent.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Rivaroxaban Vascular Dose
              </h2>
              <div className="asa-section-copy">
                <p>
                  <strong>Rivaroxaban 2.5 mg BID + ASA 80 mg daily</strong> may
                  be considered for patients with concomitant coronary or
                  peripheral arterial disease who are at low bleeding risk,
                  provided there is:
                </p>
                <ul>
                  <li>No cardioembolic source</li>
                  <li>No history of lacunar stroke</li>
                  <li>No history of hemorrhagic stroke</li>
                </ul>
                <p>
                  This combination should be started after the first month
                  post-event.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── ANTICOAGULATION FOR AF ── */}
        {activeTab === "anticoag-af" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Oral Anticoagulation After Stroke With AF
              </h2>
              <div className="asa-section-copy">
                <p>
                  After the acute phase of ischemic stroke in patients with
                  atrial fibrillation, oral anticoagulation is{" "}
                  <strong>strongly recommended over antiplatelet therapy</strong>{" "}
                  for long-term secondary prevention.
                </p>
                <p>
                  Discontinue antiplatelet therapy after the acute phase once
                  full-dose anticoagulation has been achieved.{" "}
                  <strong>Exception:</strong> patients who are &lt;1 year
                  post-PCI with coronary stent may require concurrent
                  antiplatelet therapy.
                </p>
                <div className="asa-alert asa-alert-amber">
                  No heparin bridging is recommended when transitioning from
                  antiplatelet to oral anticoagulant therapy.
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Timing: ASA to Anticoagulant Transition
              </h2>
              <div className="asa-section-copy">
                <table className="asa-dose-table">
                  <thead>
                    <tr>
                      <th>Stroke Severity</th>
                      <th>Traditional Timing</th>
                      <th>Emerging Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Minor stroke / small infarct</td>
                      <td>3 days</td>
                      <td>As early as 48 hours may be safe</td>
                    </tr>
                    <tr>
                      <td>Moderate stroke</td>
                      <td>6–7 days</td>
                      <td>As early as 48 hours may be safe</td>
                    </tr>
                    <tr>
                      <td>Severe / large infarct</td>
                      <td>12–14 days</td>
                      <td>&gt;6–7 days may be acceptable</td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ marginTop: "0.75rem" }}>
                  <strong>
                    Repeat brain imaging within 24 hours before starting
                    anticoagulation
                  </strong>{" "}
                  to exclude hemorrhagic transformation.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">TIA With Atrial Fibrillation</h2>
              <div className="asa-section-copy">
                <p>
                  For patients with TIA and no residual neurological symptoms or
                  infarct on imaging: start oral anticoagulation within{" "}
                  <strong>24 hours</strong>. No ASA bridging is required.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Embolic Stroke of Undetermined Source (ESUS)
              </h2>
              <div className="asa-section-copy">
                <p>
                  If initial Holter monitoring is negative, pursue{" "}
                  <strong>prolonged cardiac monitoring for ≥2 weeks</strong>{" "}
                  (e.g., implantable loop recorder or extended Holter) to detect
                  occult atrial fibrillation.
                </p>
                <div className="asa-alert asa-alert-blue">
                  There is currently no evidence to support empiric
                  anticoagulation in patients with ESUS. Treat with antiplatelet
                  therapy unless AF is detected on prolonged monitoring.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── AETIOLOGY-SPECIFIC ── */}
        {activeTab === "aetiology" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Carotid Atherosclerosis</h2>
              <div className="asa-section-copy">
                <p>
                  Patients with symptomatic{" "}
                  <strong>50–99% internal carotid artery (ICA) stenosis</strong>{" "}
                  should be referred for carotid revascularization (endarterectomy
                  or stenting), ideally within{" "}
                  <strong>14 days</strong> of the index event.
                </p>
                <p>
                  Confirm stenosis with CTA or MRA. For symptomatic vertebral or
                  intracranial stenosis, medical therapy (antiplatelets,
                  statins, blood pressure control) is preferred over
                  endovascular intervention.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Cervicocephalic Arterial Dissection
              </h2>
              <div className="asa-section-copy">
                <p>
                  Both antiplatelet therapy and anticoagulation are reasonable
                  options. The choice should be individualized based on:
                </p>
                <ul>
                  <li>Clinical features and severity</li>
                  <li>Vessel imaging findings</li>
                  <li>Bleeding risk</li>
                </ul>
                <p>
                  <strong>
                    Anticoagulation may be favoured when high-risk radiological
                    features are present:
                  </strong>{" "}
                  intraluminal thrombus, severe stenosis, or
                  pseudo-aneurysm with ongoing symptoms.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Fibromuscular Dysplasia</h2>
              <div className="asa-section-copy">
                <p>
                  Antiplatelet therapy is recommended for secondary prevention.
                  There is no evidence to support statin therapy unless there is
                  a separate indication (e.g., concomitant atherosclerotic
                  disease, dyslipidemia).
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Moyamoya Disease</h2>
              <div className="asa-section-copy">
                <p>
                  Refer to a specialized neurovascular center. Antiplatelet
                  therapy is recommended for patients presenting with
                  non-hemorrhagic events. Revascularization surgery (direct or
                  indirect bypass) should be considered in selected patients.
                </p>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">
                Patent Foramen Ovale (PFO)
              </h2>
              <div className="asa-section-copy">
                <p>
                  For patients aged <strong>18–60 years</strong> with a recent
                  non-lacunar ischemic stroke attributed to PFO:
                </p>
                <ul>
                  <li>
                    <strong>Antiplatelet therapy PLUS percutaneous PFO closure</strong>{" "}
                    is recommended
                  </li>
                </ul>
                <p>
                  Higher-risk features that strengthen the indication for closure
                  include:
                </p>
                <ul>
                  <li>Atrial septal aneurysm</li>
                  <li>
                    Large right-to-left shunt (&gt;20 microbubbles on contrast
                    echocardiography)
                  </li>
                  <li>Large PFO (≥2 mm separation)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── REFERENCES ── */}
        {activeTab === "references" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Key References</h2>
              <ol className="asa-ref-list">
                {references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
