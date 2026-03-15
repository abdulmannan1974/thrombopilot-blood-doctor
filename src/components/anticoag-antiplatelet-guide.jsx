import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["af-acs", "AF + ACS/PCI"],
  ["vte-acs", "VTE + ACS/PCI"],
  ["lv-thrombus", "LV Thrombus"],
  ["longterm", "Long-term Combination"],
  ["references", "References"],
];

const doacDoses = [
  ["Rivaroxaban", "15 mg once daily", "10 mg once daily if CrCl 30\u201350 mL/min"],
  ["Apixaban", "5 mg twice daily", "2.5 mg twice daily if \u22652 of: age \u226580, weight \u226460 kg, creatinine \u2265133 \u00b5mol/L"],
  ["Dabigatran", "150 mg or 110 mg twice daily", "110 mg twice daily preferred when combined with antiplatelets"],
  ["Edoxaban", "60 mg once daily", "30 mg once daily if CrCl 30\u201350 mL/min, weight \u226460 kg, or potent P-gp inhibitor"],
  ["Warfarin", "INR target 2.0\u20132.5", "Lower target range when combined with antiplatelet therapy"],
];

const algorithmSteps = [
  {
    step: 1,
    text: "Assess stroke risk: if CHADS\u2082 = 0 and age < 65, OAC is not required. Proceed with standard DAPT per ACS/PCI guidelines.",
    tone: "blue",
  },
  {
    step: 2,
    text: "If CHADS\u2082 \u2265 1 or age \u2265 65, initiate triple therapy: OAC + ASA + clopidogrel.",
    tone: "purple",
  },
  {
    step: 3,
    text: "Discontinue ASA between day 1 and day 30, based on stent thrombosis risk versus bleeding risk.",
    tone: "orange",
  },
  {
    step: 4,
    text: "High stent thrombosis risk + low bleeding risk: extend triple therapy toward 30 days.",
    tone: "amber",
  },
  {
    step: 5,
    text: "Low stent thrombosis risk + high bleeding risk: transition to dual pathway (OAC + P2Y12) from day 1.",
    tone: "teal",
  },
  {
    step: 6,
    text: "Continue dual pathway (OAC + clopidogrel) for up to 12 months, then OAC alone.",
    tone: "green",
  },
];

const lvPoints = [
  "High thromboembolic risk warrants OAC in confirmed LV thrombus.",
  "DOACs are a reasonable alternative to warfarin (2022 AHA scientific statement).",
  "PCI management follows the same approach as AF patients (short triple therapy then dual pathway).",
  "DOACs should be used at full therapeutic dose without reduction, even with concurrent antiplatelets.",
  "Discontinue OAC after 3 months if LV thrombus has resolved on repeat imaging.",
];

const longtermPoints = [
  "Guidelines recommend OAC alone in most patients \u22651 year from ACS or PCI.",
  "2025 meta-analysis: OAC + single antiplatelet vs OAC alone showed no difference in MI, stroke, or death, but a 2.4% higher rate of major bleeding.",
];

const exceptions = [
  {
    title: "Antiphospholipid syndrome (APS)",
    text: "Consider adding ASA to warfarin if recurrent thrombosis occurs despite therapeutic warfarin (INR 2\u20133). Refer to a thrombosis or rheumatology specialist.",
  },
  {
    title: "Mechanical heart valves",
    text: "Older RCTs showed lower embolism rates when ASA was added to warfarin, especially in patients with low bleeding risk or high thrombotic risk. On-X valve in the aortic position may allow a lower INR target with ASA.",
  },
];

const references = [
  "Lopes RD, Heizer G, Aronson R, et al. Antithrombotic therapy after acute coronary syndrome or PCI in atrial fibrillation (AUGUSTUS). N Engl J Med. 2019;380:1509\u20131524.",
  "Cannon CP, Bhatt DL, Oldgren J, et al. Dual antithrombotic therapy with dabigatran after PCI in atrial fibrillation (RE-DUAL PCI). N Engl J Med. 2017;377:1513\u20131524.",
  "Gibson CM, Mehran R, Bode C, et al. Prevention of bleeding in patients with atrial fibrillation undergoing PCI (PIONEER AF-PCI). N Engl J Med. 2016;375:2423\u20132434.",
  "Vranckx P, Valgimigli M, Eckardt L, et al. Edoxaban-based versus vitamin K antagonist-based antithrombotic regimen after successful coronary stenting (ENTRUST-AF PCI). Lancet. 2019;394:1335\u20131343.",
  "Bainey KR, Coome L, Engstr\u00f6m G, et al. 2023 CCS/CAIC focused update: use of antiplatelet therapy. Can J Cardiol. 2024;40:160\u2013181.",
  "Mehta SR, Bainey KR, Cantor WJ, et al. 2018 CCS/CAIC focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2018;34:214\u2013233.",
  "Khan SU, Khan MZ, Alkhouli M, et al. Oral anticoagulation with or without single antiplatelet therapy beyond 1 year after PCI: a systematic review and meta-analysis. Eur Heart J. 2025;46:123\u2013134.",
  "Lip GYH, Collet JP, Haude M, et al. 2024 ESC guidelines for the management of atrial fibrillation. Eur Heart J. 2024;45:3314\u20133414.",
  "Writing Committee Members, Levine GN, McEvoy JW, et al. 2022 AHA/ACC/HFSA guideline for the management of heart failure. Circulation. 2022;145:e895\u2013e1032.",
  "Kearon C, Akl EA, Ornelas J, et al. Antithrombotic therapy for VTE disease: CHEST guideline. Chest. 2016;149:315\u2013352.",
];

const relatedGuideKeys = [
  { to: "strokeAf", label: "Stroke Prevention in AF" },
  { to: "doacsComparison", label: "DOACs: Comparison & FAQ" },
  { to: "dvtTreatment", label: "DVT Treatment" },
  { to: "periopAntiplatelet", label: "Perioperative Antiplatelet" },
  { to: "warfarin", label: "Warfarin" },
  { to: "asa", label: "ASA" },
];

export function AnticoagAntiplateletGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Antithrombotic Therapy</span>
            </div>
            <h2 className="asa-guide-title">
              Anticoagulation in Patients Requiring Antiplatelet Therapy
            </h2>
            <div className="asa-guide-meta">
              <span>Combined antithrombotic strategies for OAC + antiplatelet overlap</span>
            </div>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To guide the management of patients who require
          both oral anticoagulation and antiplatelet therapy, balancing thrombotic
          protection against bleeding risk.
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Anticoagulation-antiplatelet guide sections">
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
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot blue" />Clinical Context</h3>
              <ul className="asa-ind-list">
                <li>
                  Approximately 20% of patients with atrial fibrillation present
                  with concomitant acute coronary syndrome.
                </li>
                <li>
                  Other OAC indications (VTE, mechanical heart valves, LV
                  thrombus) may coexist with a need for antiplatelet therapy.
                </li>
                <li>
                  Combining DAPT with OAC increases major bleeding but reduces
                  thromboembolic events.
                </li>
                <li>
                  RCTs demonstrate that dual pathway therapy (P2Y12 inhibitor +
                  OAC) reduces bleeding compared with triple therapy (DAPT + OAC)
                  without increasing thrombotic risk.
                </li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-danger">
              <strong>P2Y12 inhibitor restriction:</strong> Only clopidogrel should
              be used as the P2Y12 inhibitor in combination with OAC. Ticagrelor
              and prasugrel are NOT recommended when combined with oral
              anticoagulation.
            </div>

            <article className="asa-section-card">
              <h3><span className="asa-dot teal" />DOAC and Warfarin Dosing in Combination Therapy</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Anticoagulant</th>
                    <th>Standard dose</th>
                    <th>Dose adjustment</th>
                  </tr>
                </thead>
                <tbody>
                  {doacDoses.map((row) => (
                    <tr key={row[0]}>
                      <td className="dose-highlight">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        ) : null}

        {/* ── AF + ACS/PCI ── */}
        {tab === "af-acs" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot purple" />CCS/CAIC 2023 Algorithm: AF + ACS/PCI</h3>
              <div className="asa-timeline">
                {algorithmSteps.map((s) => (
                  <div key={s.step} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${s.tone}`} />
                    <div className="asa-timeline-label">Step {s.step}</div>
                    <div className="asa-timeline-desc">{s.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-info">
              <strong>Key principle:</strong> The duration of triple therapy
              should be as short as possible. In most patients, ASA should be
              discontinued within 30 days and replaced by dual pathway therapy
              (OAC + clopidogrel) for up to 12 months, followed by OAC alone.
            </div>
          </div>
        ) : null}

        {/* ── VTE + ACS/PCI ── */}
        {tab === "vte-acs" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot orange" />VTE with Concurrent ACS or PCI</h3>
              <ul className="asa-ind-list">
                <li>
                  <strong>Active VTE (within last 3 months):</strong> maintain
                  full therapeutic OAC doses even when concurrent antiplatelet
                  therapy is required.
                </li>
                <li>
                  The approach mirrors the AF + ACS/PCI algorithm: short triple
                  therapy transitioning to dual pathway therapy for up to 12
                  months.
                </li>
                <li>
                  <strong>Elective PCI:</strong> delay the procedure until OAC is
                  no longer required for VTE treatment, if clinically feasible.
                </li>
                <li>
                  <strong>Extended VTE treatment:</strong> after the initial 6
                  months, consider dose reduction (rivaroxaban 10 mg once daily or
                  apixaban 2.5 mg twice daily) per standard VTE duration
                  guidelines.
                </li>
                <li>
                  Once OAC is discontinued after VTE treatment, resume an
                  antiplatelet strategy appropriate for the ACS or PCI indication.
                </li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-warn">
              <strong>Timing note:</strong> Therapeutic-dose OAC takes priority
              over antiplatelet de-escalation during the first 3 months of acute
              VTE treatment. Balance stent thrombosis risk carefully when
              shortening triple therapy in this window.
            </div>
          </div>
        ) : null}

        {/* ── LV Thrombus ── */}
        {tab === "lv-thrombus" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot blue" />LV Thrombus Management</h3>
              <ul className="asa-ind-list">
                {lvPoints.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>

            <div className="asa-alert asa-alert-warn">
              <strong>Important:</strong> OAC is NOT recommended for patients who
              are merely at risk of LV thrombus without confirmed thrombus on
              imaging (e.g., anterior STEMI alone without documented LV
              thrombus).
            </div>
          </div>
        ) : null}

        {/* ── Long-term Combination ── */}
        {tab === "longterm" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot green" />Long-term OAC + Antiplatelet Therapy</h3>
              <ul className="asa-ind-list">
                {longtermPoints.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><span className="asa-dot orange" />Potential Exceptions</h3>
              {exceptions.map((ex) => (
                <div key={ex.title} className="asa-ind-group">
                  <div className="asa-ind-group-label">{ex.title}</div>
                  <p className="asa-section-copy">{ex.text}</p>
                </div>
              ))}
            </article>

            <div className="asa-alert asa-alert-info">
              <strong>Bottom line:</strong> For most patients beyond 1 year from
              ACS or PCI, the addition of single antiplatelet therapy to OAC does
              not reduce ischaemic events but does increase major bleeding. OAC
              alone is preferred unless a specific exception applies.
            </div>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><span className="asa-dot gray" />Related Clinical Guides</h3>
              <ul className="asa-related-list">
                {relatedGuideKeys.map((item) => (
                  <li key={item.to}><GuideLink to={item.to}>{item.label}</GuideLink></li>
                ))}
              </ul>
            </article>

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
        <p>
          <strong>Anticoagulation in Patients Requiring Antiplatelet Therapy</strong>
        </p>
        <p>
          The information here is not a substitute for clinical judgement. Always
          seek appropriate specialist input when needed.
        </p>
      </div>
    </section>
  );
}
