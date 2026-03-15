import { useState } from "react";

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["monitoring", "Monitoring & Safety"],
  ["special", "Special Populations"],
  ["cancer", "Cancer & Other Uses"],
  ["references", "References"],
];

const dosingRows = [
  [
    "AF stroke prevention",
    "5 mg PO BID",
    "Reduce to 2.5 mg BID if ≥2 of: age ≥80, weight ≤60 kg, Cr ≥133 µmol/L",
  ],
  [
    "Acute VTE treatment",
    "10 mg BID × 7 days → 5 mg BID",
    "No renal adjustment for CrCl ≥30 mL/min",
  ],
  [
    "VTE secondary prevention",
    "2.5 mg BID (after ≥6 months)",
    "Extended prevention of recurrent DVT/PE",
  ],
  [
    "Post-arthroplasty prophylaxis",
    "2.5 mg BID",
    "Start 12–24 h post-op. 14 days (knee) / 35 days (hip)",
  ],
];

const renalRows = [
  ["CrCl >30 mL/min", "No adjustment needed for VTE indications", "default"],
  ["CrCl 25–30 mL/min", "Limited AF data — use standard AF dose-reduction criteria", "moderate"],
  ["CrCl 15–24 mL/min", "Limited data — use with caution due to higher bleeding risk", "moderate"],
  [
    "CrCl <15 / dialysis",
    "Not generally recommended. Observational data + 2 RCTs (Renal-AF, AXADIA-AFNET 8) support use in AF",
    "serious",
  ],
];

const drugInteractions = [
  {
    type: "inhibitors",
    label: "Strong dual CYP3A4 + P-gp inhibitors (AVOID — increased bleeding)",
    examples:
      "Azole antifungals (itraconazole, ketoconazole, posaconazole), macrolides (clarithromycin, erythromycin), HIV protease inhibitors (ritonavir)",
  },
  {
    type: "inducers",
    label: "Strong inducers (AVOID — reduced apixaban levels)",
    examples:
      "Rifampin, carbamazepine, phenytoin, St. John's Wort",
  },
];

const relatedGuides = [
  "Cancer and Thrombosis",
  "DOACs: Coagulation Tests",
  "DOACs: Comparison and Frequently Asked Questions",
  "DOACs in Patients with Obesity",
  "DOACs: Management of Bleeding",
  "DOACs: Perioperative Management",
  "Stroke Prevention in Atrial Fibrillation",
  "Thromboprophylaxis: Orthopedic Surgery",
  "Anticoagulation in Patients Requiring Antiplatelet Therapy",
];

const references = [
  "Agnelli G, et al. AMPLIFY Investigators. Oral apixaban for the treatment of acute venous thromboembolism. N Engl J Med 2013;369(9):799-808.",
  "Agnelli G, et al. AMPLIFY-EXT Investigators. Apixaban for extended treatment of venous thromboembolism. N Engl J Med. 2013;368(8):699-708.",
  "Agnelli G, et al. Caravaggio Investigators. Apixaban for the treatment of venous thromboembolism associated with cancer. N Engl J Med. 2020;382:1599-1607.",
  "Alcalai R, et al. Apixaban vs. warfarin in patients with left ventricular thrombus: a prospective multicentre randomized clinical trial. Eur Heart J Cardiovasc Pharmacother. 2022;8(7):660-667.",
  "Carrier M, et al. AVERT Investigators. Apixaban to prevent venous thromboembolism in patients with cancer. N Engl J Med. 2019;380(8):711-719.",
  "Connolly SJ, et al. Andexanet alfa for acute major bleeding associated with factor Xa inhibitors. N Eng J Med 2016;375(12):1131-1141.",
  "Connolly SJ, et al. Andexanet for Factor Xa inhibitor-associated acute intracerebral hemorrhage (ANNEXA-I). N Eng J Med 2024;390(19):1745-55.",
  "Couturaud F, et al. Extended treatment of venous thromboembolism with reduced-dose versus full-dose direct oral anticoagulants. Lancet 2025;405(10480):725-735.",
  "Granger CB, et al. Apixaban versus warfarin in patients with atrial fibrillation. N Engl J Med 2011;365(11):981-992.",
  "Healey JS, et al. Apixaban for stroke prevention in subclinical atrial fibrillation. N Engl J Med 2023;390(2):107-117.",
  "Isa WY, et al. Apixaban versus warfarin in patients with left ventricular thrombus: a pilot prospective randomized outcome blinded study. J Clin Prev Cardiol. 2020;9(4):150-154.",
  "Levine GN, et al. Management of patients at risk for and with left ventricular thrombus: a scientific statement from the AHA. Circulation. 2022;146:e205-e233.",
  "Lopes RD, et al. AUGUSTUS Investigators. Antithrombotic therapy after acute coronary syndrome or PCI in atrial fibrillation. N Engl J Med. 2019;380(16):1509-1524.",
  "Mahe I, et al. API-CAT: Extended anticoagulant therapy with reduced-dose apixaban in patients with active cancer and VTE. N Eng J Med 2021;392:1363-1373.",
  "Pfizer Canada Inc / Bristol-Myers Squibb Canada. Eliquis (Apixaban) Product Monograph. Revised January 10, 2025.",
  "Pokorney SD, et al. RENAL-AF Investigators. Apixaban for patients with atrial fibrillation on hemodialysis. Circulation. 2022;146:1735-1745.",
  "Reinecke H, et al. AXADIA-AFNET 8 Study: apixaban vs. phenprocoumon in patients on chronic hemodialysis. Circulation. 2023;147:296-309.",
  "Schulman S, Crowther MA. How I treat with anticoagulants in 2012: new and old anticoagulants, and when and how to switch. Blood 2012;119(13):3016-3023.",
  "Siegal DM, et al. Andexanet alfa for the reversal of factor Xa inhibitor activity. N Eng J Med 2015;373(25):2413-2424.",
  "Yeh CH, et al. Evolving use of new oral anticoagulants for treatment of venous thromboembolism. Blood 2014;124(7):1020-1028.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function ApixabanGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Factor Xa Inhibitor</span>
              <span className="asa-badge asa-badge-gray">v78</span>
            </div>
            <h2 className="asa-guide-title">Apixaban (Eliquis)</h2>
            <div className="asa-guide-meta">
              <span>Updated 5 February 2026</span>
              <span>Oral direct factor Xa inhibitor</span>
            </div>
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide an overview of the mechanism of
          action, licensed indications, dosing regimens, and side-effect profile
          of apixaban.
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div>
          <h3>Mechanism of Action</h3>
          <p>
            Apixaban is an oral factor Xa inhibitor. By binding reversibly to the
            active site of factor Xa, it attenuates thrombin generation and
            reduces fibrin formation.
          </p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Apixaban guide sections">
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
              <h3><Dot tone="blue" />Licensed Indications in Canada</h3>
              <ul className="asa-ind-list">
                <li>
                  Prevention of stroke and systemic embolism in patients with
                  non-valvular atrial fibrillation (NVAF).
                </li>
                <li>
                  Treatment of DVT and PE, and prevention of recurrent DVT and
                  PE.
                </li>
                <li>
                  Prevention of VTE after elective hip or knee replacement
                  surgery.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Administration</h3>
              <ul className="asa-ind-list">
                <li>May be taken with or without food.</li>
                <li>
                  For patients unable to swallow whole pills: crush into fine
                  powder, mix with water or applesauce, and administer
                  immediately.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Dosing ── */}
        {tab === "dosing" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Dosing by Indication</h3>
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
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="dose-highlight">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Renal Dosing Considerations</h3>
              <div className="asa-ae-grid">
                {renalRows.map((row) => (
                  <div key={row[0]} className={`asa-ae-card ${row[2]}`}>
                    <div className="asa-ae-card-label">{row[0]}</div>
                    <div className="asa-ae-card-text">{row[1]}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ) : null}

        {/* ── Monitoring & Safety ── */}
        {tab === "monitoring" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="teal" />Laboratory Monitoring</h3>
              <ul className="asa-ind-list">
                <li>
                  <strong>No routine lab monitoring needed.</strong>
                </li>
                <li>
                  PT/INR and aPTT are often normal in patients taking apixaban
                  and do not provide reliable measures of anticoagulant activity.
                </li>
                <li>
                  Specific anti-Xa assay with apixaban calibrators is available
                  in some labs, but no established therapeutic levels exist.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Periodic Clinical Assessment</h3>
              <ul className="asa-ind-list">
                <li>
                  Review compliance, comorbidities, medication changes
                  (especially interacting agents), and provide patient education.
                </li>
                <li>
                  At least yearly CrCl assessment. More frequent monitoring if
                  baseline is abnormal or renal function is worsening.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="danger" />Safety Concerns</h3>
              <ul className="asa-ind-list">
                <li>
                  <strong>Major adverse effect: bleeding.</strong> Risk is
                  increased with concomitant antiplatelet drugs or other
                  anticoagulants.
                </li>
                <li>
                  Avoid in patients with indwelling epidural catheters or recent
                  spinal puncture (risk of epidural/spinal hematoma).
                </li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <div>
                See <strong>DOACs: Coagulation Tests</strong> clinical guide for
                details on specific anti-Xa testing. See{" "}
                <strong>DOACs: Management of Bleeding</strong> for approach to
                bleeding complications.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Special Populations ── */}
        {tab === "special" ? (
          <div className="asa-tab-panel">
            <div className="asa-alert asa-alert-danger">
              <div>
                <strong>Pregnancy:</strong> Apixaban crosses the placenta — do
                NOT use in pregnancy. Avoid in breastfeeding as excretion into
                breast milk is uncertain.
              </div>
            </div>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Pediatrics</h3>
              <p className="asa-section-copy">
                Not recommended for use in children until ongoing studies
                establish the pharmacokinetics, pharmacodynamics, safety, and
                efficacy in pediatric patients.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Drug Interactions</h3>
              <p className="asa-section-copy">
                Avoid concomitant drugs or herbal products that inhibit or induce
                both P-glycoprotein (P-gp) and CYP3A4.
              </p>
              <div className="asa-ae-grid">
                {drugInteractions.map((item) => (
                  <div
                    key={item.type}
                    className={`asa-ae-card ${item.type === "inhibitors" ? "serious" : "moderate"}`}
                  >
                    <div className="asa-ae-card-label">{item.label}</div>
                    <div className="asa-ae-card-text">{item.examples}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Obesity</h3>
              <p className="asa-section-copy">
                No RCTs exist, but a multitude of observational data
                demonstrates that efficacy and safety are maintained in obese
                patients. See <strong>DOACs in Patients with Obesity</strong>{" "}
                clinical guide.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="purple" />Reversal</h3>
              <ul className="asa-ind-list">
                <li>
                  <strong>Andexanet alfa (Ondexxya):</strong> Recombinant
                  modified factor Xa decoy protein for life-threatening or
                  uncontrolled bleeding. Effective hemostasis at 12 hours in 79%
                  of patients with major bleeding; however, thrombotic events
                  occurred in 18% during 30-day follow-up.
                </li>
                <li>
                  <strong>2024 RCT (ANNEXA-I):</strong> Benefit for controlling
                  hematoma expansion in FXa inhibitor-associated acute ICH —
                  hemostatic efficacy 67% (andexanet) vs 53% (usual care).
                  However, thrombotic events (including ischemic stroke)
                  significantly increased. No appreciable differences in
                  neurological disability or death at 30 days.
                </li>
                <li>
                  <strong>PCC (prothrombin complex concentrates):</strong>{" "}
                  Indirect reversal agent — consult local institutional protocols
                  when reversal is indicated.
                </li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Cancer & Other Uses ── */}
        {tab === "cancer" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Cancer-Associated Thrombosis Treatment</h3>
              <p className="asa-section-copy">
                RCT (Caravaggio) comparing apixaban (10 mg BID x 7 days then
                5 mg BID) vs. subcutaneous dalteparin for 6 months showed
                apixaban was non-inferior for both recurrent VTE and major
                bleeding.
              </p>
              <p className="asa-section-copy">
                <strong>2025 RCT (API-CAT):</strong> After at least 6 months of
                anticoagulation, extended therapy with 2.5 mg BID was
                non-inferior to 5 mg BID for prevention of recurrent VTE, with
                significantly less clinically relevant bleeding.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Cancer Primary Prophylaxis</h3>
              <p className="asa-section-copy">
                In ambulatory cancer patients at Khorana intermediate/high risk
                (AVERT trial): apixaban 2.5 mg BID reduced overall VTE from
                10.2% to 4.2% (HR 0.41), but major bleeding increased from 1.8%
                to 3.5% (HR 2.95). Decisions must be individualized considering
                VTE risk, cancer site, patient values, and drug cost. Not
                licensed for this indication in Canada.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />AF + ACS/PCI (AUGUSTUS Trial)</h3>
              <p className="asa-section-copy">
                In AF patients with recent ACS or PCI taking a P2Y12 inhibitor,
                apixaban (at stroke prevention doses) without ASA resulted in
                less bleeding and fewer hospitalizations compared to regimens
                including a VKA, ASA, or both — without significant differences
                in ischemic events.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="purple" />Subclinical AF (ARTESIA Trial)</h3>
              <p className="asa-section-copy">
                In patients with subclinical AF (6 minutes to 24 hours) detected
                via implantable devices and CHA2DS2-VASc score of 3 or greater:
                apixaban lowered stroke/SE risk vs. ASA (HR 0.63; 95% CI
                0.45–0.88) but increased major bleeding (HR 1.80; 95% CI
                1.26–2.57). Shared decision-making is essential based on
                individual risk profiles.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />LV Thrombus</h3>
              <p className="asa-section-copy">
                Small RCTs and growing observational data suggest apixaban (at AF
                doses) is non-inferior to warfarin for LV thrombus treatment with
                similar or lower bleeding risk. AHA scientific statement
                considers DOACs a reasonable alternative to warfarin, especially
                when time in therapeutic range is predicted to be low or frequent
                INR checks are not feasible.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="asa-related-list">
                {relatedGuides.map((item) => (
                  <li key={item}><span>{item}</span></li>
                ))}
              </ul>
            </article>

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
          <strong>Apixaban (Eliquis)</strong> | Updated 5 February 2026 |
          Version 78
        </p>
        <p>
          The information here is not a substitute for clinical judgement. Always
          consult your doctor or other professional healthcare provider.
        </p>
      </div>
    </section>
  );
}
