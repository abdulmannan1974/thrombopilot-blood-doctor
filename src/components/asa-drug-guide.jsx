import { useState } from "react";

const TABS = ["Overview", "Indications", "Dosing", "Adverse Effects", "Special Considerations", "References"];

const indicationItems = {
  cardiac: [
    "All symptomatic CAD: acute coronary syndromes (ACS), chronic stable angina, post-PCI and post-CABG.",
    "With a P2Y12 inhibitor (clopidogrel, prasugrel, or ticagrelor) for approximately one year after ACS with PCI.",
    "With clopidogrel plus oral anticoagulant (OAC) for the shortest possible duration when anticoagulation is also indicated.",
    "With rivaroxaban 2.5 mg twice daily for patients with CAD or PAD (COMPASS trial).",
    "High-risk mechanical heart valve in addition to VKA therapy.",
    "Bioprosthetic aortic or mitral valve when not on oral anticoagulation.",
  ],
  cerebrovascular: [
    "Non-cardioembolic ischaemic stroke or transient ischaemic attack (TIA).",
    "Following carotid endarterectomy.",
  ],
  pad: [
    "Symptomatic peripheral arterial disease with or without prior vascular intervention.",
  ],
  primaryPrevention: [
    "NOT routinely recommended for primary prevention of a first vascular event, with or without cardiovascular risk factors.",
  ],
  vteSecondary: [
    "Consider ASA when extended anticoagulant therapy is not acceptable to the patient after at least 3 to 6 months of anticoagulation.",
  ],
  arthroplasty: [
    "Total knee arthroplasty (TKA): rivaroxaban 10 mg daily for 5 days, then ASA 81 mg daily for 9 additional days.",
    "Total hip arthroplasty (THA): rivaroxaban 10 mg daily for 5 days, then ASA 81 mg daily to complete 30 days total.",
  ],
  preeclampsia: [
    "Moderate- to high-risk patients: start ASA between 12 and 16 weeks gestation and continue until 36 weeks.",
  ],
};

const dosingRows = [
  { indication: "Usual antiplatelet dose", dose: "81 mg daily", notes: "Standard maintenance for most indications." },
  { indication: "ACS initial loading", dose: "162 mg chewed or crushed, then 81 mg daily indefinitely", notes: "Chew or crush for rapid absorption in the acute setting." },
  { indication: "Pre-angioplasty (not on chronic ASA)", dose: "325 mg chewed or crushed", notes: "One-time loading dose before the procedure." },
  { indication: "TIA or ischaemic stroke", dose: "81 mg daily", notes: "Start promptly once haemorrhagic stroke is excluded." },
  { indication: "High GI bleed risk", dose: "81 mg daily with PPI or H2 antagonist", notes: "Alternatively, consider clopidogrel as a substitute." },
];

const adverseEffectItems = [
  { severity: "Very common", text: "Bruising and minor bleeding" },
  { severity: "Common", text: "Dyspepsia and gastrointestinal upset" },
  { severity: "Serious", text: "Gastrointestinal bleeding (dose-related; the most clinically significant adverse effect)" },
  { severity: "Uncommon", text: "Allergic reactions including urticaria and angioedema" },
  { severity: "Uncommon", text: "Aspirin-induced asthma (aspirin-exacerbated respiratory disease)" },
];

const concomitantOacExceptions = [
  "Very recent ACS or PCI with a coronary stent, for the shortest possible duration.",
  "High-risk prosthetic heart valve scenarios.",
  "Proven TIA or ischaemic stroke while on therapeutic anticoagulation alone.",
  "High-risk thrombophilia with breakthrough thrombosis despite therapeutic anticoagulation.",
];

const cautions = [
  "Asthma or nasal polyps (risk of aspirin-exacerbated respiratory disease).",
  "High bleeding risk or recent major bleeding.",
  "Severe thrombocytopenia.",
  "Familial or acquired bleeding disorders.",
];

const perioperativePoints = [
  "Stop ASA 4 to 7 days before the procedure if interruption is clinically appropriate.",
  "Do not routinely stop ASA in patients at high thrombotic risk or for low bleeding-risk procedures.",
  "Restart ASA within 48 hours after the procedure once haemostasis is secure.",
];

const references = [
  "Anderson D, et al. Aspirin or rivaroxaban for VTE prophylaxis after hip or knee arthroplasty. N Engl J Med. 2018;378:699-707.",
  "Bainey KR, et al. 2023 CCS/CAIC focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2024;40:160-181.",
  "Bowman W, et al. Effects of aspirin for primary prevention in persons with diabetes mellitus. N Engl J Med. 2018;379:1529-1539.",
  "Douketis JD, et al. Perioperative management of antithrombotic therapy. CHEST. 2022;126:e207-e243.",
  "Duley L, et al. Antiplatelet agents for preventing pre-eclampsia and its complications. Cochrane Database Syst Rev. 2019;10.",
  "Eikelboom JW, et al. Rivaroxaban with or without aspirin in stable cardiovascular disease (COMPASS). N Engl J Med. 2017;377:1319-1330.",
  "Gaziano JM, et al. Use of aspirin to reduce risk of initial vascular events. Lancet. 2018;392:1036-1046.",
  "Lopes RD, et al. Antithrombotic therapy after ACS or PCI in atrial fibrillation. N Engl J Med. 2019;380:1509-1524.",
  "Mehta SR, et al. 2018 CCS/CAIC focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2018;34:214-233.",
  "Monagle P, et al. Antithrombotic therapy in neonates and children. Chest. 2012;141:e737S-e801S.",
  "Nishimura R, et al. 2017 AHA/ACC focused update of the valvular heart disease guideline. Circulation. 2017;135:e1159-e1195.",
  "Rolnik DL, et al. Aspirin versus placebo in pregnancies at high risk for preterm preeclampsia. N Engl J Med. 2017;377:613-622.",
  "Wein T, et al. Canadian Stroke Best Practice Recommendations: ASA for prevention of vascular events. CMAJ. 2020;192:E302-E311.",
  "Weitz JI, et al. Rivaroxaban or aspirin for extended treatment of VTE. N Engl J Med. 2017;376:1211-1222.",
  "Yasuda S, et al. Antithrombotic therapy for atrial fibrillation with stable coronary disease. N Engl J Med. 2019;381:1103-1113.",
  "Yusuf S, et al. Polypill with or without aspirin in persons without cardiovascular disease. N Engl J Med. 2021;384:216-228.",
];

export function AsaDrugGuide() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className="asa-guide-shell">
      <header className="asa-guide-header">
        <h2>Acetylsalicylic Acid (ASA) — Drug Monograph</h2>
        <p>Thrombosis Canada Clinical Guide</p>
      </header>

      <nav className="asa-tab-bar" role="tablist" aria-label="ASA drug guide sections">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={activeTab === t}
            className={activeTab === t ? "asa-tab-btn active" : "asa-tab-btn"}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="asa-tab-body">
        {/* ── Overview ── */}
        {activeTab === "Overview" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>Background</h3>
              <p>
                Acetylsalicylic acid (ASA) is well established in the acute management of myocardial
                infarction and in the secondary prevention of cardiovascular disease. It irreversibly
                inhibits platelet aggregation by blocking thromboxane A<sub>2</sub> (TxA<sub>2</sub>)
                synthesis through cyclooxygenase inhibition. The antiplatelet effect persists for the
                lifetime of the platelet.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Expanding Role</h3>
              <p>
                ASA may also be considered for the secondary prevention of recurrent venous
                thromboembolism (VTE) when extended anticoagulation is not acceptable, and for VTE
                prophylaxis after joint arthroplasty as part of a stepped regimen with rivaroxaban.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Primary Prevention</h3>
              <div className="asa-alert">
                ASA is <strong>not routinely recommended</strong> for primary prevention of a first
                vascular event. The net clinical benefit depends on weighing the reduction in
                cardiovascular events against the risk of gastrointestinal and intracranial bleeding.
              </div>
            </article>
          </div>
        )}

        {/* ── Indications ── */}
        {activeTab === "Indications" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>Cardiac Indications</h3>
              <ul className="asa-ind-list">
                {indicationItems.cardiac.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Cerebrovascular Indications</h3>
              <ul className="asa-ind-list">
                {indicationItems.cerebrovascular.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Peripheral Arterial Disease</h3>
              <ul className="asa-ind-list">
                {indicationItems.pad.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Primary Prevention</h3>
              <div className="asa-alert">
                {indicationItems.primaryPrevention[0]}
              </div>
            </article>

            <article className="asa-section-card">
              <h3>VTE Secondary Prevention</h3>
              <ul className="asa-ind-list">
                {indicationItems.vteSecondary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Thromboprophylaxis After Joint Arthroplasty</h3>
              <ul className="asa-ind-list">
                {indicationItems.arthroplasty.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Prevention of Pre-eclampsia</h3>
              <ul className="asa-ind-list">
                {indicationItems.preeclampsia.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        )}

        {/* ── Dosing ── */}
        {activeTab === "Dosing" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>Dosing Summary</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Indication</th>
                    <th>Dose</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {dosingRows.map((row) => (
                    <tr key={row.indication}>
                      <td>{row.indication}</td>
                      <td><strong>{row.dose}</strong></td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert">
              <strong>GI bleeding risk:</strong> For patients at elevated gastrointestinal bleeding
              risk, co-administer a proton pump inhibitor (PPI) or H2-receptor antagonist.
              Alternatively, clopidogrel may be used as a substitute antiplatelet agent.
            </div>
          </div>
        )}

        {/* ── Adverse Effects ── */}
        {activeTab === "Adverse Effects" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>Adverse Effects Profile</h3>
              <ul className="asa-ind-list">
                {adverseEffectItems.map((item) => (
                  <li key={item.text}>
                    <strong>{item.severity}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </article>

            <div className="asa-alert">
              <strong>Key point:</strong> Gastrointestinal bleeding risk is dose-related. Use the
              lowest effective dose (81 mg daily for most indications). Higher doses do not improve
              antithrombotic efficacy but significantly increase bleeding.
            </div>
          </div>
        )}

        {/* ── Special Considerations ── */}
        {activeTab === "Special Considerations" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>Concomitant Oral Anticoagulation and ASA</h3>
              <p>
                Combined use of therapeutic-dose anticoagulation and ASA is discouraged and should
                only be considered in carefully selected patients at low bleeding risk:
              </p>
              <ul className="asa-ind-list">
                {concomitantOacExceptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="asa-alert">
                In <strong>most</strong> patients, ASA should be stopped when oral anticoagulation
                is started.
              </div>
            </article>

            <article className="asa-section-card">
              <h3>NSAID Interaction</h3>
              <p>
                Avoid traditional NSAIDs in patients taking ASA for vascular protection. If an
                anti-inflammatory agent is required, a COX-2 selective inhibitor is preferred.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Cautions</h3>
              <ul className="asa-ind-list">
                {cautions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Perioperative Management</h3>
              <ul className="asa-ind-list">
                {perioperativePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Pediatric Use</h3>
              <div className="asa-alert">
                When possible, obtain specialist paediatric thrombosis consultation before
                prescribing ASA for antiplatelet therapy in children.
              </div>
            </article>
          </div>
        )}

        {/* ── References ── */}
        {activeTab === "References" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3>References</h3>
              <ol className="asa-ref-list">
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
