import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "anticoagulation", label: "Anticoagulation" },
  { id: "management", label: "Other Management" },
  { id: "duration", label: "Duration & Follow-up" },
  { id: "references", label: "References" },
];

const riskFactors = [
  { category: "Hormonal", examples: "Oral contraceptives (>50% of cases in women <55), puerperium" },
  { category: "Thrombophilia", examples: "Heritable and acquired (antiphospholipid antibody syndrome)" },
  { category: "Malignancy", examples: "Especially haematologic malignancies" },
  { category: "Systemic disease", examples: "SLE, granulomatosis with polyangiitis, Behçet's, IBD" },
  { category: "Infection", examples: "Meningitis, otitis, mastoiditis (local head/neck infection)" },
  { category: "Local structural", examples: "Head trauma, neurosurgery, spinal procedures, parasagittal meningioma" },
  { category: "No apparent cause", examples: "Found in <25% of cases" },
];

const symptomsData = [
  { symptom: "Headache", frequency: "~90%", mechanism: "Increased intracranial pressure" },
  { symptom: "Seizures", frequency: "~40%", mechanism: "Cortical irritation; >10% occur post-acute phase" },
  { symptom: "Focal deficits", frequency: "20–40%", mechanism: "Venous ischaemia or haemorrhage" },
  { symptom: "Intracranial bleeding", frequency: "~30%", mechanism: "Venous hypertension; mostly intracerebral" },
  { symptom: "Decreased consciousness/encephalopathy", frequency: "Variable", mechanism: "Parenchymal injury or mass effect" },
];

const doacTrials = [
  {
    trial: "RESPECT-CVT",
    agent: "Dabigatran 150 mg bid vs warfarin (INR 2–3)",
    n: 120,
    duration: "6 months",
    result: "No differences in major bleeding or venous recanalization. Exploratory; underpowered.",
    takeaway: "Dabigatran feasible alternative to warfarin",
  },
  {
    trial: "SECRET",
    agent: "Rivaroxaban vs warfarin",
    n: 55,
    duration: "180 days",
    result: "1 ICH, 2 CRNMB, 1 recurrent CVT — all in rivaroxaban arm. Phase II feasibility trial.",
    takeaway: "No definitive conclusions; awaiting larger data",
  },
  {
    trial: "ACTION-CVT (retrospective)",
    agent: "DOAC vs warfarin",
    n: "Large multicenter",
    duration: "Observational",
    result: "No difference in recurrent VTE (5.26 vs 5.87/100 pt-yr). Fewer bleeding events with DOACs (2.44 vs 4.70/100 pt-yr). Similar death and recanalization.",
    takeaway: "DOACs associated with less bleeding; no efficacy difference",
  },
  {
    trial: "DOAC-CVT (prospective cohort)",
    agent: "DOAC vs vitamin K antagonist",
    n: "Multicenter international",
    duration: "Observational",
    result: "No differences in symptomatic VTE, major bleeding, or death.",
    takeaway: "Supports DOAC use in CVT",
  },
  {
    trial: "EINSTEIN-Jr CVT (substudy)",
    agent: "Rivaroxaban vs VKA/LMWH",
    n: 114,
    duration: "3 months",
    population: "Children (CVT subset)",
    result: "1 VTE + 1 major bleed in standard arm; 5 CRNMB in rivaroxaban arm, no VTE/major bleed.",
    takeaway: "Rivaroxaban feasible in children with CVT",
  },
];

const deteriorationOptions = [
  {
    cause: "Mass effect (venous infarction/haemorrhage)",
    intervention: "Urgent neurosurgical consultation — decompressive hemicraniectomy",
    evidence: "DECOMPRESS2: 34% mortality at 12 months; 80% of survivors judged surgery worthwhile",
  },
  {
    cause: "Thrombus extension",
    intervention: "Consider mechanical thrombectomy (interdisciplinary decision)",
    evidence: "TO-ACT: no benefit with routine neurointervention; 3/33 interventional patients had venous sinus perforation",
  },
];

const references = [
  "Ferro JM, et al. Safety and efficacy of dabigatran vs warfarin for CVT (RESPECT-CVT). JAMA Neurol 2019;76(12):1457-1465.",
  "Field TS, et al. Study of rivaroxaban for CVT (SECRET). Stroke 2023;54:2724-2736.",
  "Yaghi S, et al. DOACs versus warfarin in CVT treatment (ACTION-CVT). Stroke 2022;53(3):728-738.",
  "Van de Munchkof, et al. DOACs versus VKA for CVT (DOAC-CVT). Lancet Neurol 2025;24(3):199-207.",
  "Connor P, et al. Rivaroxaban in pediatric CVT (EINSTEIN-Jr CVT). Blood Adv 2020;4:6250-6258.",
  "Aaron S, et al. Decompressive surgery for severe CVT (DECOMPRESS2). Stroke 2024;55(5):1218-1226.",
  "Coutinho JM, et al. Endovascular treatment vs standard care in severe CVT (TO-ACT). JAMA Neurol 2020;77:966-973.",
  "Aguiar de Sousa A. ESCOA-CVT: Extended anticoagulation after CVT. ESOC2025.",
  "Aguiar de Sousa, et al. Safety of pregnancy after CVT. Stroke 2016;47:713-718.",
  "Coutinho J, et al. Anticoagulation for cerebral venous sinus thrombosis. Cochrane Database Syst Rev 2011;(8):CD002005.",
  "Ferro JM, et al. ESO guideline for diagnosis and treatment of CVT. Eur J Neurol 2017;24(10):1203-1213.",
  "Saposnik G, et al. Diagnosis and management of CVT: AHA/ASA statement. Stroke 2011;42:1158-1192.",
  "Zhou LW, et al. Incidence of CVT: population-based study, systematic review and meta-analysis. Stroke 2023;54(1):169-177.",
];

export function CerebralVenousThrombosisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Thrombosis Canada</span>
            <span className="asa-badge">Version 33 · Feb 2026</span>
          </div>
          <h1 className="asa-guide-title">Cerebral Venous Thrombosis</h1>
          <p className="asa-guide-lead">
            Management of CVT: anticoagulation (including in the presence of intracranial bleeding), ICP management, seizures, headache, and duration of therapy.
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
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Epidemiology</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Incidence</span>
                  <span className="asa-ae-value">~10 per million/year</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">% of all strokes</span>
                  <span className="asa-ae-value">~1%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Age group</span>
                  <span className="asa-ae-value">80% under age 55</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Sex</span>
                  <span className="asa-ae-value">75% female; OCP/puerperium in >50%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Functional independence</span>
                  <span className="asa-ae-value" style={{ color: "#16a34a" }}>~85% of survivors</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Mortality</span>
                  <span className="asa-ae-value" style={{ color: "#dc2626" }}>5–10%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Recurrent VTE/year</span>
                  <span className="asa-ae-value">~2–4% (higher with thrombophilia/malignancy)</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Presenting Symptoms</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Symptom</th>
                    <th>Frequency</th>
                    <th>Mechanism</th>
                  </tr>
                </thead>
                <tbody>
                  {symptomsData.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.symptom}</strong></td>
                      <td>{s.frequency}</td>
                      <td>{s.mechanism}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Risk Factors</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {riskFactors.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.category}</strong></td>
                      <td>{r.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DIAGNOSIS */}
        {activeTab === "diagnosis" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>Critical:</strong> Non-contrast CT or MRI brain are <strong>not sensitive enough</strong> to diagnose CVT. CT venography or contrast-enhanced MR venography is required.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Imaging Strategy</h2>
              <div className="asa-sections" style={{ gap: "0.75rem" }}>
                {[
                  {
                    title: "Non-contrast CT / MRI Brain",
                    role: "Not diagnostic for CVT",
                    detail: "Use to assess for parenchymal injury: venous oedema, intracranial bleeding, mass effect",
                    badge: "limited",
                  },
                  {
                    title: "CT Venography",
                    role: "Diagnostic test of choice",
                    detail: "Rapid, widely available; excellent for dural sinus and deep vein assessment",
                    badge: "preferred",
                  },
                  {
                    title: "Contrast-enhanced MR Venography",
                    role: "Diagnostic test of choice (alternative)",
                    detail: "Superior soft tissue resolution; preferred when radiation avoidance needed",
                    badge: "preferred",
                  },
                ].map((img, i) => (
                  <div key={i} className="asa-section-card" style={{ margin: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <strong>{img.title}</strong>
                      <span className={`asa-badge ${img.badge === "preferred" ? "asa-badge-blue" : img.badge === "limited" ? "asa-badge-amber" : "asa-badge-red"}`}>{img.role}</span>
                    </div>
                    <p className="asa-section-copy" style={{ margin: 0 }}>{img.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">VITT-associated CVT</h2>
              <p className="asa-section-copy">
                For CVT in the context of Vaccine-induced Immune Thrombocytopenia and Thrombosis (VITT), see the dedicated clinical guide: <em>HIT, VITT, and VITT-like Disorders</em>. Management differs significantly from non-VITT CVT (avoid heparin, use IVIG and non-heparin anticoagulants).
              </p>
            </div>
          </div>
        )}

        {/* ANTICOAGULATION */}
        {activeTab === "anticoagulation" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>Key principle:</strong> Anticoagulation is standard-of-care for CVT <em>even in the presence of intracranial bleeding</em>. In CVT, bleeding is driven by venous hypertension — improving venous obstruction reduces the bleeding stimulus.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute Phase: Parenteral Anticoagulation</h2>
              <ul className="asa-ind-list">
                <li><strong>LMWH preferred over UFH</strong> — more predictable anticoagulant effect</li>
                <li>Parenteral anticoagulation especially indicated when intracranial haemorrhage or mass effect is present</li>
                <li>Transition to oral anticoagulation once patient is clinically stable</li>
                <li>Rare exceptions: large/rapidly expanding ICH or anticipated emergent surgical decompression — collaborative case-by-case decision (neurology, neurosurgery, haematology)</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Oral Anticoagulation Choices</h2>
              <p className="asa-section-copy">
                Current guidelines recommend VKA (warfarin, INR 2.0–3.0) as the standard oral option. Emerging evidence supports DOACs as an alternative. Key trials:
              </p>
              <div className="asa-sections" style={{ gap: "0.75rem" }}>
                {doacTrials.map((t, i) => (
                  <div key={i} className="asa-section-card" style={{ margin: 0, borderLeft: "3px solid var(--primary)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                      <strong>{t.trial}</strong>
                      {t.population && <span className="asa-badge asa-badge-amber">{t.population}</span>}
                    </div>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.88em" }}><strong>Agent:</strong> {t.agent} | <strong>n =</strong> {t.n} | <strong>Duration:</strong> {t.duration}</p>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.88em" }}>{t.result}</p>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.85em", color: "#1d4ed8", fontWeight: 600 }}>{t.takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>APLAS patients:</strong> DOACs are <strong>not recommended</strong> in patients with known antiphospholipid antibody syndrome — use warfarin (INR 2–3).
            </div>
          </div>
        )}

        {/* OTHER MANAGEMENT */}
        {activeTab === "management" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Neurological Deterioration Despite Anticoagulation</h2>
              <div className="asa-sections" style={{ gap: "0.75rem" }}>
                {deteriorationOptions.map((d, i) => (
                  <div key={i} className="asa-section-card" style={{ margin: 0, borderLeft: "3px solid #dc2626" }}>
                    <p style={{ margin: "0 0 0.3rem", fontWeight: 600 }}>{d.cause}</p>
                    <p style={{ margin: "0 0 0.3rem" }}><span className="asa-badge asa-badge-red">Intervention</span> {d.intervention}</p>
                    <p className="asa-section-copy" style={{ margin: 0, fontSize: "0.85em" }}>{d.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Seizure Management</h2>
              <ul className="asa-ind-list">
                <li>30–40% of CVT patients experience seizures; >10% have late post-acute seizures</li>
                <li><strong>Referral to neurology</strong> is indicated for all patients with seizures</li>
                <li>No evidence for prophylactic antiseizure therapy in patients <em>without</em> seizures</li>
                <li><strong>Drug-drug interactions</strong> between common antiseizure medications and both VKAs and DOACs — review carefully</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Headache Management</h2>
              <ul className="asa-ind-list">
                <li>Headache present in ~90%; can be severe</li>
                <li>Adequate analgesia important — severe pain and vomiting worsen ICP</li>
                <li>Headache generally improves with anticoagulation and ICP management</li>
                <li>Chronic headache persisting after acute phase: refer for outpatient pain management</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Risk Factor Management</h2>
              <ul className="asa-ind-list">
                <li>Correct local structural factors that obstruct venous outflow</li>
                <li><strong>Discontinue provoking factors:</strong> hormonal therapies (OCPs), etc.</li>
                <li>Smoking cessation and lifestyle modification</li>
                <li>Thrombophilia testing: not routinely recommended — implications for anticoagulation duration are uncertain in most cases</li>
                <li>APLAS: confirmed diagnosis warrants warfarin over DOACs</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Acute Setting Considerations</h2>
              <ul className="asa-ind-list">
                <li>Assess need for <strong>ICU/high-acuity setting</strong> early — patients may deteriorate from ICH, raised ICP, or seizures</li>
                <li>Involve <strong>Neurology and Haematology/Thrombosis</strong> early in all cases</li>
              </ul>
            </div>
          </div>
        )}

        {/* DURATION & FOLLOW-UP */}
        {activeTab === "duration" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Duration of Anticoagulation</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card" style={{ gridColumn: "1 / -1" }}>
                  <span className="asa-ae-label">No ongoing structural/provoking risk factors; no APLAS</span>
                  <span className="asa-ae-value"><strong>3–6 months</strong> — equally effective vs 12 months (ESCOA-CVT: 460 patients, no difference in recurrent VTE, bleeding, or death at 12 months)</span>
                </div>
                <div className="asa-ae-card" style={{ gridColumn: "1 / -1" }}>
                  <span className="asa-ae-label">Recurrent CVT, prior VTE, or ongoing provoking factor</span>
                  <span className="asa-ae-value"><strong>Extended anticoagulation</strong> — periodic reassessment of bleeding risk</span>
                </div>
                <div className="asa-ae-card" style={{ gridColumn: "1 / -1" }}>
                  <span className="asa-ae-label">No high bleeding risk + patient uncomfortable with recurrence risk</span>
                  <span className="asa-ae-value">Consider extended anticoagulation after shared decision-making</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">CVT and Pregnancy</h2>
              <ul className="asa-ind-list">
                <li>Women with prior CVT: relative risk of non-cerebral VTE during pregnancy is <strong>16-fold</strong> above baseline</li>
                <li>Risk of recurrent CVT during pregnancy: <strong>80-fold</strong> above baseline (systematic review data)</li>
                <li>Recommendation: prescribe <strong>antepartum and postpartum thromboprophylaxis</strong> to pregnant women with prior CVT and no anticoagulation contraindication</li>
                <li>Data remain limited — decisions should involve thrombosis and obstetric specialists</li>
              </ul>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Long-term Quality of Life</h2>
              <p className="asa-section-copy">
                Over half of CVT survivors may experience persistent headache, fatigue, mood disturbance, or cognitive impairment affecting quality of life — even in those who are functionally independent. Ongoing monitoring and referral for specialist support (neurology, pain, psychology) should be individualised.
              </p>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">References</h2>
              <ol className="asa-ref-list">
                {references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ol>
              <p className="asa-section-copy" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Source: Thrombosis Canada Clinical Guides — thrombosiscanada.ca | Version 33, updated 2026-02-06. Not a substitute for individual clinical judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
