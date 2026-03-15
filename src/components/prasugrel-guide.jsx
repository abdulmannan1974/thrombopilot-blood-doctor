import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["adverse", "Adverse Effects"],
  ["periprocedural", "Periprocedural"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const dosingRows = [
  ["Loading dose at PCI", "60 mg orally once", "Administered at time of percutaneous coronary intervention."],
  ["Maintenance dose", "10 mg orally once daily", "Continue for up to 1 year after ACS with PCI."],
  ["Concomitant ASA", "81 mg orally once daily", "ASA should be taken concurrently throughout treatment."],
];

const references = [
  "Bainey KR, et al. 2023 Canadian Cardiovascular Society and Canadian Association of Interventional Cardiology focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2024;40:160-181.",
  "Bundhun PK, et al. Prasugrel versus clopidogrel in patients undergoing percutaneous coronary intervention: a systematic review and meta-analysis. BMC Cardiovasc Disord. 2017;17:195.",
  "Montalescot G, et al. Prasugrel compared with clopidogrel in patients undergoing percutaneous coronary intervention for ST-elevation myocardial infarction (TRITON-TIMI 38): double-blind, randomised controlled trial. Lancet. 2009;373:723-731.",
  "Montalescot G, et al. Prehospital ticagrelor in ST-segment elevation myocardial infarction. N Engl J Med. 2013;371:1016-1027.",
  "Motovska Z, et al. Prasugrel versus ticagrelor in patients with acute myocardial infarction treated with primary percutaneous coronary intervention: multicenter randomized PRAGUE-18 study. Circulation. 2016;134:1603-1612.",
  "Roe MT, et al. Prasugrel versus clopidogrel for acute coronary syndromes without revascularization. N Engl J Med. 2012;367:1297-1309.",
  "Sakurai R, et al. Pharmacodynamic effects of a loading dose of prasugrel in Japanese patients with ST-elevation acute myocardial infarction. Thromb Res. 2017;158:95-100.",
  "Sch\u00fcpke S, et al. Ticagrelor or prasugrel in patients with acute coronary syndromes. N Engl J Med. 2019;381:1524-1534.",
  "Wiviott SD, et al. Prasugrel versus clopidogrel in patients with acute coronary syndromes. N Engl J Med. 2007;357:2001-2015.",
];

export function PrasugrelGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Antiplatelet Therapy</span>
            </div>
            <h2 className="asa-guide-title">Prasugrel</h2>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide guidance on the use of prasugrel for secondary prevention of ischemic cardiac events in patients with acute coronary syndromes managed with percutaneous coronary intervention.
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tab-bar" role="tablist" aria-label="Prasugrel guide sections">
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
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3>Mechanism of Action</h3>
              <p className="asa-section-copy">
                Prasugrel is an irreversible P2Y12 ADP receptor inhibitor. It is a thienopyridine prodrug that, after hepatic bioactivation, binds irreversibly to the platelet P2Y12 receptor, blocking ADP-mediated platelet activation and aggregation for the lifetime of the platelet.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Clinical Role</h3>
              <p className="asa-section-copy">
                Prasugrel is co-administered with <GuideLink to="asa">ASA</GuideLink> for secondary prevention of ischemic cardiac events in patients with acute coronary syndromes (ACS) managed with percutaneous coronary intervention (PCI). See the <GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink> guide for duration considerations.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Key Evidence</h3>
              <ul className="asa-ind-list">
                <li>
                  In the Phase 3 TRITON-TIMI 38 trial, prasugrel demonstrated a 2.2% absolute risk reduction (NNT = 46) for the composite of cardiovascular death, non-fatal myocardial infarction, and non-fatal stroke compared with <GuideLink to="clopidogrel">clopidogrel</GuideLink>.
                </li>
                <li>
                  Myocardial infarction and stent thrombosis were also significantly reduced with prasugrel.
                </li>
                <li>
                  Benefit was observed only in ACS patients managed with PCI. There was no benefit in medically managed non-ST-elevation MI patients.
                </li>
                <li>
                  Evidence comparing <GuideLink to="ticagrelor">ticagrelor</GuideLink> versus prasugrel is mixed. One study of 4018 patients (ISAR-REACT 5) suggested improved outcomes with prasugrel (2.4% absolute risk reduction) with no difference in major bleeding.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {tab === "dosing" ? (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3>Dosing Summary</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Indication or situation</th>
                    <th>Dose and route</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {dosingRows.map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="dose-highlight">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-red">
              <div>
                <strong>Not recommended:</strong> Prasugrel is not recommended in patients weighing less than 60 kg or aged over 75 years due to increased bleeding risk. A 5 mg daily dose has been evaluated in post-hoc analyses of patients over 75, but there is no approval for the 5 mg dose.
              </div>
            </div>

            <article className="asa-section-card">
              <h3>Pharmacokinetic Notes</h3>
              <ul className="asa-ind-list">
                <li>No food effect on absorption.</li>
                <li>No dose adjustment required for renal impairment or mild-to-moderate hepatic impairment.</li>
                <li>No significant pharmacokinetic drug interactions.</li>
                <li>Duration of dual antiplatelet therapy is typically 1 year.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {tab === "adverse" ? (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3>Bleeding Risk</h3>
              <ul className="asa-ind-list">
                <li>Major bleeding, including intracranial hemorrhage, is the principal adverse effect.</li>
                <li>
                  CABG-related bleeding occurred in 13.4% of prasugrel-treated patients (NNH = 10 versus clopidogrel).
                </li>
                <li>
                  Fatal bleeding: 0.4% with prasugrel versus 0.1% with clopidogrel (NNH = 333).
                </li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-red">
              <div>
                <strong>Net clinical benefit lost:</strong> The net benefit of prasugrel over <GuideLink to="clopidogrel">clopidogrel</GuideLink> is lost in patients aged over 75 years or weighing less than 60 kg due to the higher bleeding risk in these populations.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "periprocedural" ? (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3>Periprocedural Management</h3>
              <ul className="asa-ind-list">
                <li>Discontinue prasugrel at least 7 days before elective surgery, if it is safe to do so.</li>
                <li>Delay elective procedures beyond 1 year after stent placement if possible, when dual antiplatelet therapy can be safely completed.</li>
                <li>Consultation with cardiology or thrombosis specialist is advised before stopping prasugrel in stented patients, particularly within the first year.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>Minor Procedures</h3>
              <p className="asa-section-copy">
                For minor procedures such as dental work, skin procedures, and cataract surgery, there is generally no need to discontinue prasugrel. See the <GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink> guide for details.
              </p>
            </article>
          </div>
        ) : null}

        {tab === "special" ? (
          <div className="asa-tab-body">
            <div className="asa-alert asa-alert-red">
              <div>
                <strong>Contraindicated in prior stroke or TIA:</strong> Prasugrel must be avoided in patients with a history of stroke or transient ischemic attack due to significantly increased risk of fatal and intracranial hemorrhagic bleeding.
              </div>
            </div>

            <article className="asa-section-card">
              <h3>Hepatic Impairment</h3>
              <p className="asa-section-copy">
                Avoid prasugrel in patients with severe liver disease.
              </p>
            </article>

            <article className="asa-section-card">
              <h3>Pregnancy and Lactation</h3>
              <ul className="asa-ind-list">
                <li>No adequate studies in pregnant women. Use only if the potential benefit justifies the potential risk to the fetus.</li>
                <li>Prasugrel is excreted in rat milk. Breastfeeding is not recommended during treatment.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="asa-tab-body">
            <article className="asa-section-card">
              <h3>Related Clinical Guides</h3>
              <ul className="asa-related-list">
                <li><GuideLink to="asa">ASA (Acetylsalicylic Acid)</GuideLink></li>
                <li><GuideLink to="clopidogrel">Clopidogrel (Plavix)</GuideLink></li>
                <li><GuideLink to="ticagrelor">Ticagrelor (Brilinta)</GuideLink></li>
                <li><GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink></li>
                <li><GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink></li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3>References</h3>
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
        <p><strong>Prasugrel</strong> | Clinical Guide</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
