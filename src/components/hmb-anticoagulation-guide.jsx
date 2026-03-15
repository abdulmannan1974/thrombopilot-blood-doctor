import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["evaluation", "Evaluation"],
  ["treatment", "Treatment"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const references = [
  "Boonyawat K, et al. Heavy menstrual bleeding in women on anticoagulant therapy: management strategies. Thromb Res. 2021;197:63-71.",
  "De Jong CMM, et al. Heavy menstrual bleeding in women using oral anticoagulants: a systematic review. TH Open. 2022;6:e201-e211.",
  "Kirtava A, et al. Menorrhagia as a presenting symptom of bleeding disorders in women. Haemophilia. 2004;10:133-140.",
  "Martinelli I, et al. Heavy menstrual bleeding in women treated with rivaroxaban compared with vitamin K antagonist therapy. Haematologica. 2016;101:e440-e441.",
  "Bryk AH, et al. Heavy menstrual bleeding in women treated with rivaroxaban and vitamin K antagonists: a post hoc analysis of the EINSTEIN DVT/PE studies. Thromb Haemost. 2016;116:869-876.",
  "Godin R, et al. Combined hormonal contraceptives in women receiving anticoagulation for venous thromboembolism: a post hoc analysis. Blood Adv. 2020;4:3488-3496.",
  "Ferreira M, et al. Hormonal management of heavy menstrual bleeding in women on anticoagulation: a narrative review. J Thromb Haemost. 2023;21:1677-1689.",
  "WOMAN Trial Collaborators. Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial. Lancet. 2017;389:2105-2116.",
  "Mannucci PM, Franchini M. Antifibrinolytic agents and anticoagulation: friend or foe? Blood Transfus. 2023;21:83-88.",
  "James AH, et al. Evaluation and management of acute menorrhagia in women with and without underlying bleeding disorders: consensus from an international expert panel. Eur J Obstet Gynecol Reprod Biol. 2011;158:124-134.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function HmbAnticoagulationGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Anticoagulation Management</span>
            </div>
            <h2 className="asa-guide-title">
              Management of Heavy Menstrual Bleeding for Patients on Anticoagulation
            </h2>
            <div className="asa-guide-meta">
            </div>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To guide the assessment and management of heavy
          menstrual bleeding (HMB) in individuals receiving anticoagulant therapy,
          including hormonal and non-hormonal strategies and anticoagulation considerations.
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="HMB guide sections">
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
              <h3><Dot tone="blue" />Heavy Menstrual Bleeding and Anticoagulation</h3>
              <ul className="asa-ind-list">
                <li>
                  HMB is defined as excessive menstrual blood loss that interferes with
                  quality of life. It is a distinct and clinically important complication
                  of anticoagulation therapy.
                </li>
                <li>
                  Approximately one-third of menstruating individuals experience HMB
                  under normal circumstances; up to 70% of those on anticoagulation
                  therapy may be affected.
                </li>
                <li>
                  Complications of HMB in anticoagulated patients include iron deficiency
                  with or without anemia, need for medical or surgical interventions,
                  hospitalizations, anticoagulation interruptions leading to increased VTE
                  recurrence, and significantly reduced quality of life.
                </li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <div>
                <strong>Key principle:</strong> A systematic approach to the assessment
                and management of HMB is essential in all menstruating patients
                initiating or receiving anticoagulation therapy.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Evaluation ── */}
        {tab === "evaluation" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="teal" />Screening and Baseline Assessment</h3>
              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  "7-2-1" Screening Rule
                </div>
                <ul className="asa-ind-list">
                  <li>Periods lasting longer than 7 days</li>
                  <li>Needing to change menstrual product every 2 hours or less</li>
                  <li>Passing clots larger than 1 inch in diameter</li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  At Anticoagulation Initiation — Assess:
                </div>
                <ul className="asa-ind-list">
                  <li>Menstrual history (frequency, duration, volume)</li>
                  <li>Current contraception method</li>
                  <li>History of iron deficiency</li>
                  <li>
                    Concomitant bleeding-risk medications: antiplatelets, NSAIDs, SSRIs,
                    herbal supplements
                  </li>
                </ul>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Ongoing Evaluation</h3>
              <ul className="asa-ind-list">
                <li>
                  Use the ISTH-BAT (Bleeding Assessment Tool) for patients with
                  additional bleeding symptoms to evaluate for an underlying bleeding
                  disorder.
                </li>
                <li>
                  Assess hormonal therapies currently in use — abrupt discontinuation of
                  hormonal contraception can cause new or worsened HMB.
                </li>
                <li>
                  CHCs and DMPA: post hoc data from apixaban and rivaroxaban trials
                  suggest safe use with therapeutic-dose anticoagulation. Decisions should
                  involve shared decision-making.
                </li>
                <li>
                  Follow-up assessment after 1 to 2 menstrual cycles on anticoagulation.
                  Ongoing assessment at every clinical visit, with a minimum of annual
                  review.
                </li>
                <li>
                  Periodic CBC and ferritin monitoring to screen for iron deficiency and
                  anemia.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Treatment ── */}
        {tab === "treatment" ? (
          <div className="asa-tab-panel">
            {/* Choice of anticoagulant */}
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Choice of Anticoagulant</h3>
              <ul className="asa-ind-list">
                <li>
                  Apixaban and edoxaban carry a similar risk of HMB compared with
                  warfarin.
                </li>
                <li>
                  Dabigatran may have a lower HMB risk, although the warfarin comparator
                  arm had a higher baseline rate of HMB.
                </li>
              </ul>
              <div className="asa-alert asa-alert-warn">
                <div>
                  <strong>Rivaroxaban:</strong> Associated with approximately 2-fold
                  increased risk of HMB compared with warfarin. Some experts avoid
                  rivaroxaban in menstruating women. If HMB occurs on rivaroxaban,
                  consider switching to apixaban or dabigatran.
                </div>
              </div>
            </article>

            {/* Hormonal therapies */}
            <article className="asa-section-card">
              <h3><Dot tone="teal" />Hormonal Therapies (First-Line)</h3>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  LNG-IUD (Mirena) — Preferred
                </div>
                <ul className="asa-ind-list">
                  <li>
                    Approximately 80% reduction in menstrual blood loss by 4 months.
                  </li>
                  <li>
                    Amenorrhea in 44% at 6 months and 50% at 1 year.
                  </li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  Etonogestrel Implant
                </div>
                <ul className="asa-ind-list">
                  <li>
                    Effective for HMB reduction, but breakthrough bleeding and spotting
                    are common.
                  </li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  Progesterone-Only Pill
                </div>
                <ul className="asa-ind-list">
                  <li>
                    Effective for HMB management but must be taken at the same time daily
                    for optimal efficacy.
                  </li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  DMPA (Depot Medroxyprogesterone Acetate)
                </div>
                <ul className="asa-ind-list">
                  <li>
                    Highest amenorrhea rate among hormonal options, but associated with
                    VTE risk.
                  </li>
                  <li>
                    Therapeutic anticoagulation must be in place before starting DMPA.
                  </li>
                  <li>
                    Discontinue DMPA at least 1 month before planned anticoagulation
                    cessation.
                  </li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  CHC (Combined Hormonal Contraceptives — Pills, Patches, Rings)
                </div>
                <ul className="asa-ind-list">
                  <li>
                    Can induce amenorrhea, especially with continuous-cycle use.
                  </li>
                  <li>
                    Carry VTE risk — therapeutic anticoagulation must be in place before
                    starting.
                  </li>
                  <li>
                    Discontinue CHC at least 4 weeks before planned anticoagulation
                    cessation.
                  </li>
                </ul>
              </div>

              <div className="asa-alert asa-alert-info">
                <div>
                  <strong>Note:</strong> Progesterone-only options (LNG-IUD, implant,
                  POP) do NOT increase VTE risk and are preferred when feasible.
                </div>
              </div>
            </article>

            {/* Antifibrinolytics */}
            <article className="asa-section-card">
              <h3><Dot tone="purple" />Antifibrinolytics (Tranexamic Acid)</h3>
              <ul className="asa-ind-list">
                <li>
                  Tranexamic acid produces a 40 to 50% reduction in menstrual blood loss
                  when taken three times daily during heavy flow days.
                </li>
              </ul>
              <div className="asa-alert asa-alert-warn">
                <div>
                  <strong>Timing caution:</strong> Avoid tranexamic acid during the first
                  month of VTE treatment to allow fibrinolysis of the index thrombus.
                  Beyond this period, tranexamic acid is considered safe with
                  anticoagulation based on RCT data in trauma, postpartum, and
                  perioperative settings.
                </div>
              </div>
            </article>

            {/* Gynecology referral */}
            <article className="asa-section-card">
              <h3><Dot tone="orange" />Gynecology Referral</h3>
              <ul className="asa-ind-list">
                <li>
                  Refer for investigation of underlying structural causes of HMB
                  (fibroids, polyps, adenomyosis).
                </li>
                <li>
                  Procedural options include endometrial ablation, uterine artery
                  embolization, and hysterectomy.
                </li>
              </ul>
            </article>

            {/* Anticoagulation modification */}
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Anticoagulation Modification</h3>
              <ul className="asa-ind-list">
                <li>
                  Dose reduction or temporary discontinuation of anticoagulation is NOT
                  recommended during acute VTE treatment (first 3 to 6 months).
                </li>
                <li>
                  There is insufficient evidence to support dose modification even in the
                  long-term anticoagulation phase.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Special Considerations ── */}
        {tab === "special" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="orange" />Iron Deficiency and Anemia</h3>
              <ul className="asa-ind-list">
                <li>
                  Assess CBC and ferritin in all patients with HMB or symptoms of iron
                  deficiency.
                </li>
                <li>
                  Treat confirmed iron deficiency with oral or intravenous iron
                  supplementation as appropriate.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Transitioning Hormonal Therapies</h3>
              <ul className="asa-ind-list">
                <li>
                  If stopping CHC or DMPA, transition promptly to a progestin-based
                  alternative (LNG-IUD, implant, or progesterone-only pill) to maintain
                  menstrual suppression.
                </li>
                <li>
                  If continuing CHC or DMPA while on anticoagulation, maintain the full
                  therapeutic anticoagulation dose. Reduced anticoagulant doses have not
                  been studied in this clinical context.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />References</h3>
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
          <strong>Management of Heavy Menstrual Bleeding for Patients on Anticoagulation</strong>
        </p>
        <p>
          The information here is not a substitute for clinical judgement. Always seek
          appropriate specialist input when needed.
        </p>
      </div>
    </section>
  );
}
