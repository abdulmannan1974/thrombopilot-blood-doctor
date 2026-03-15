import { useState } from "react";

const tabs = [
  ["overview", "Overview"],
  ["anticoagulants", "Anticoagulants"],
  ["monitoring", "Monitoring"],
  ["labour", "Labour & Delivery"],
  ["special", "Special Situations"],
  ["references", "References"],
];

const references = [
  "Bates SM, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: venous thromboembolism in the context of pregnancy. Blood Adv 2018;2(22):3317-3359.",
  "Bates SM, et al. Guidance for the treatment and prevention of obstetric-associated venous thromboembolism. J Thromb Thrombolysis 2016;41(1):92-128.",
  "Middeldorp S, Ganzevoort W. How I treat venous thromboembolism in pregnancy. Blood. 2020;136(19):2133-42.",
  "Beyer-Westendorf J, et al. Safety of direct oral anticoagulant exposure during pregnancy: a retrospective cohort study. Lancet Haematol. 2020;7(12):e884-e891.",
  "Chan WS, et al. Venous thromboembolism and antithrombotic therapy in pregnancy. J Obstet Gynaecol Can 2014;36(6):527-553.",
  "Horlocker TT, et al. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: ASRA Evidence-Based Guidelines (Fourth Edition). Reg Anesth Pain Med 2018;43(3):263-309.",
  "Leffert L, et al. The Society for Obstetric Anesthesia and Perinatology consensus statement on the anesthetic management of pregnant and postpartum women receiving thromboprophylaxis or higher dose anticoagulants. Anesth Analg 2018;126(3):928-944.",
  "Heavner MS, et al. Thrombolysis for massive pulmonary embolism in pregnancy. Pharmacotherapy 2017;37:1449-1457.",
  "Lindhoff-Last E, et al. Treatment of 51 pregnancies with danaparoid because of heparin intolerance. Thromb Haemost. 2005;93(1):63-69.",
  "Nichols KM, et al. Venous thromboembolism associated with pregnancy: JACC Focus Seminar. J Am Coll Cardiol. 2020;76(18):2128-2141.",
];

export function PregnancyVteTreatmentGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      {/* ── Header ── */}
      <header className="asa-guide-header">
        <span className="asa-guide-eyebrow">Thrombosis Canada — Clinical Guide</span>
        <h2 className="asa-guide-title">
          Pregnancy: Venous Thromboembolism Treatment
        </h2>
        <p className="asa-guide-lead">
          Evidence-based approach to treatment of DVT and/or PE during pregnancy
          and the postpartum period.
        </p>
      </header>

      {/* ── Tabs ── */}
      <nav className="asa-tab-bar" role="tablist">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "asa-tab-btn active" : "asa-tab-btn"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── Tab bodies ── */}
      <div className="asa-tab-body">
        {/* ───────── OVERVIEW ───────── */}
        {tab === "overview" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Background</h3>
              <p className="asa-section-copy">
                Venous thromboembolism (VTE) complicates approximately{" "}
                <strong>1.2 per 1,000 deliveries</strong>. Although the absolute
                risk is low, pulmonary embolism (PE) remains a{" "}
                <strong>
                  leading cause of maternal morbidity and mortality
                </strong>{" "}
                in the Western world.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Cornerstone of Treatment</h3>
              <p className="asa-section-copy">
                The cornerstone of VTE treatment in pregnancy is anticoagulant
                therapy with <strong>low-molecular-weight heparin (LMWH)</strong>.
                Recommendations are largely based on observational data and expert
                opinion given the lack of high-level evidence on optimal
                management.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Duration of Anticoagulation</h3>
              <p className="asa-section-copy">
                A <strong>minimum total duration of 3 months</strong> is
                recommended. However, given the additional increase in risk during
                pregnancy and the postpartum period, treatment is generally{" "}
                <strong>
                  extended throughout pregnancy and for at least 6 weeks
                  postpartum
                </strong>{" "}
                (with a minimum total duration of 3 months).
              </p>
            </article>

            <div className="asa-alert asa-alert-blue">
              <strong>Key principle:</strong> Both maternal safety/efficacy and
              fetal risks of anticoagulant therapy must be considered when
              selecting treatment during pregnancy.
            </div>
          </div>
        )}

        {/* ───────── ANTICOAGULANTS ───────── */}
        {tab === "anticoagulants" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">
                LMWH — Drug of Choice
              </h3>
              <p className="asa-section-copy">
                LMWH <strong>does not cross the placenta</strong> and is safe for
                the fetus. Studies have confirmed its efficacy and safety in
                pregnancy for VTE treatment. Preference over UFH is based on
                extrapolation of efficacy data from non-pregnant trials where LMWH
                is more effective, has more predictable pharmacokinetics, and a
                more favorable risk profile.
              </p>
              <ul className="asa-section-copy">
                <li>
                  Dosing based on <strong>actual body weight at diagnosis</strong>.
                </li>
                <li>
                  <strong>Once-daily dosing preferred</strong> over twice daily for
                  patient convenience.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">
                UFH — When LMWH Is Not Suitable
              </h3>
              <p className="asa-section-copy">
                UFH also does not cross the placenta and is safe for the fetus.
                Indications for UFH over LMWH include:
              </p>
              <ul className="asa-section-copy">
                <li>Severe renal dysfunction</li>
                <li>When rapid anticoagulant reversal may be required</li>
                <li>When thrombolytic treatment may be needed</li>
              </ul>
              <p className="asa-section-copy">
                Dose adjustment is based on{" "}
                <strong>activated partial thromboplastin time (aPTT)</strong>.
              </p>
            </article>

            <div className="asa-alert asa-alert-red">
              <strong>Warfarin CONTRAINDICATED in pregnancy.</strong> Crosses the
              placenta and may cause teratogenicity (warfarin embryopathy, CNS
              anomalies), pregnancy loss, and fetal bleeding.
            </div>

            <div className="asa-alert asa-alert-red">
              <strong>DOACs should NOT be used in pregnancy.</strong> Pregnant
              women were excluded from all DOAC clinical trials. DOACs are likely
              to cross the placenta and human reproductive risks are unknown.
              Observational data on accidental first-trimester exposure is
              reassuring with relatively low embryopathy risk.
            </div>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Breastfeeding Safety</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Breastfeeding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UFH</td>
                    <td><strong>Safe</strong></td>
                  </tr>
                  <tr>
                    <td>LMWH</td>
                    <td><strong>Safe</strong></td>
                  </tr>
                  <tr>
                    <td>Warfarin</td>
                    <td><strong>Safe</strong></td>
                  </tr>
                  <tr>
                    <td>Rivaroxaban</td>
                    <td>Passes into breast milk — <strong>not recommended</strong></td>
                  </tr>
                  <tr>
                    <td>Dabigatran</td>
                    <td>Passes into breast milk — <strong>not recommended</strong></td>
                  </tr>
                  <tr>
                    <td>Apixaban / Edoxaban</td>
                    <td>Manufacturers recommend <strong>against</strong> use while breastfeeding</td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
        )}

        {/* ───────── MONITORING ───────── */}
        {tab === "monitoring" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">LMWH Dose Adjustment Options</h3>
              <p className="asa-section-copy">
                Maternal weight gain and increased renal clearance during pregnancy
                have led to suggestions that LMWH dose should be adjusted; however,
                this remains <strong>controversial</strong>. Several approaches can
                be considered:
              </p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Approach</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Weight-based at diagnosis, no further adjustment</td>
                    <td>
                      Simplest option; <strong>favored by ASH 2018</strong>.
                      Extensive real-world use confirms efficacy and safety.
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Weight-adjusted throughout pregnancy</td>
                    <td>Dose adjusted as weight changes over gestation</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Peak anti-Xa guided</td>
                    <td>
                      Adjust dose based on peak anti-factor Xa levels
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Anti-Xa Monitoring</h3>
              <p className="asa-section-copy">
                <strong>Routine peak anti-Xa monitoring is NOT recommended</strong>{" "}
                due to lack of benefit and lack of robust data on optimal reference
                ranges. Consider only for:
              </p>
              <ul className="asa-section-copy">
                <li>Extremes of body weight</li>
                <li>Breakthrough thrombosis</li>
                <li>Select cases with very high thrombosis risk</li>
              </ul>
              <p className="asa-section-copy">
                <strong>Trough anti-Xa levels</strong> are used for monitoring drug
                accumulation in patients with <strong>severe renal dysfunction</strong>.
              </p>
            </article>

            <div className="asa-alert asa-alert-blue">
              <strong>HIT risk is low</strong> with LMWH in pregnant women.
              Routine platelet count monitoring is <strong>not suggested</strong>.
            </div>
          </div>
        )}

        {/* ───────── LABOUR & DELIVERY ───────── */}
        {tab === "labour" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Planning for Delivery</h3>
              <p className="asa-section-copy">
                The plan for delivery should account for{" "}
                <strong>obstetric, hematological, and anesthetic</strong> issues.
                Practices vary widely — familiarize yourself with institutional
                protocols.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">
                LMWH Timing Around Delivery
              </h3>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" />
                  <div className="asa-timeline-content">
                    <strong>Once-daily therapeutic LMWH:</strong> Last dose{" "}
                    <strong>&gt;24 hours</strong> before scheduled induction or
                    C-section. If C-section scheduled for early morning, give last
                    dose 24h prior at an{" "}
                    <strong>intermediate dose (50% of total daily dose)</strong>.
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" />
                  <div className="asa-timeline-content">
                    <strong>Twice-daily therapeutic LMWH:</strong> Last dose{" "}
                    <strong>24 hours</strong> before induction or C-section.
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" />
                  <div className="asa-timeline-content">
                    <strong>Spontaneous labor:</strong> Withhold injection if
                    patient believes she has entered labor.
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" />
                  <div className="asa-timeline-content">
                    <strong>Neuraxial anesthesia:</strong> Should{" "}
                    <strong>NOT</strong> be used within 24 hours of a therapeutic
                    LMWH dose.
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" />
                  <div className="asa-timeline-content">
                    <strong>Uncertain anticoagulation level:</strong> Rapid
                    assessment of heparin activity can guide anesthetic and
                    surgical management where laboratory support allows.
                  </div>
                </div>
              </div>
            </article>

            <div className="asa-alert asa-alert-amber">
              <strong>Very high VTE risk</strong> (proximal DVT or PE within 2-4
              weeks): Switch to <strong>IV UFH</strong>, discontinue{" "}
              <strong>4-6 hours</strong> before delivery. Consider{" "}
              <strong>IVC filter</strong> if VTE within 2 weeks of delivery.
            </div>
          </div>
        )}

        {/* ───────── SPECIAL SITUATIONS ───────── */}
        {tab === "special" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Postpartum Anticoagulation</h3>
              <ul className="asa-section-copy">
                <li>
                  Restart LMWH or UFH{" "}
                  <strong>12-24 hours after delivery</strong> depending on
                  bleeding concerns and local experience.
                </li>
                <li>
                  After epidural removal: delay full-dose LMWH/UFH{" "}
                  <strong>24 hours</strong> (longer if catheter placement was
                  bloody or traumatic).
                </li>
                <li>
                  <strong>Prophylactic-dose LMWH bridge</strong> may be used
                  until full-dose anticoagulation can be reinitiated if bleeding
                  concerns exist.
                </li>
                <li>
                  Can overlap <strong>warfarin with LMWH</strong> for at least 5
                  days until INR ≥2.0 is maintained for &gt;24 hours.
                </li>
                <li>
                  DOACs are an option postpartum{" "}
                  <strong>only if not breastfeeding</strong>.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Thrombolytic Therapy</h3>
              <p className="asa-section-copy">
                Experience with thrombolysis during pregnancy is{" "}
                <strong>limited</strong>. Available reports suggest a low risk of
                maternal bleeding but highlight concerns about{" "}
                <strong>fetal complications including fetal loss</strong>.
              </p>
              <div className="asa-alert asa-alert-red">
                <strong>Reserve thrombolysis</strong> for women with{" "}
                <strong>life- or limb-threatening VTE</strong> only.
              </div>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Inferior Vena Cava Filters</h3>
              <p className="asa-section-copy">
                Use of IVC filters during pregnancy should be limited to those
                with an <strong>absolute contraindication to anticoagulation</strong>{" "}
                in the setting of acute VTE. This typically does not include
                short-term interruption for delivery except in those with very
                recent or untreated DVT. Experience is limited.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">
                HIT in Pregnancy
              </h3>
              <p className="asa-section-copy">
                In pregnant patients with HIT or a history of HIT, non-heparin
                anticoagulants are required:
              </p>
              <ul className="asa-section-copy">
                <li>
                  <strong>Danaparoid</strong> — first-line for acute or sub-acute
                  HIT in pregnancy.
                </li>
                <li>
                  <strong>Fondaparinux</strong> — very limited experience,
                  especially during the first trimester.
                </li>
              </ul>
            </article>
          </div>
        )}

        {/* ───────── REFERENCES ───────── */}
        {tab === "references" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Related Thrombosis Canada Guides</h3>
              <ul className="asa-section-copy">
                <li>Deep Vein Thrombosis: Treatment</li>
                <li>Pregnancy: Diagnosis of PE and DVT</li>
                <li>Pregnancy: Thromboprophylaxis</li>
                <li>Pulmonary Embolism (PE): Treatment</li>
                <li>Unfractionated Heparin and Low-Molecular-Weight Heparin</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="asa-guide-header" style={{ marginTop: "1rem" }}>
        <p className="asa-section-copy">
          <strong>Pregnancy: Venous Thromboembolism Treatment</strong> | Updated
          1 May 2025 | Version 51
        </p>
        <p className="asa-section-copy" style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          This information is not a substitute for clinical judgement. Consult
          appropriate specialist input when needed.
        </p>
      </footer>
    </section>
  );
}
