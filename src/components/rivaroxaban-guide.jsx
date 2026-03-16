import { useState } from "react";
import { GuideLink } from "./guide-link";

const dosingRows = [
  ["AF stroke prevention", "20 mg OD with food (CrCl > 50)", "15 mg OD with food if CrCl 15\u201349. Not recommended CrCl < 15."],
  ["Acute VTE treatment", "15 mg BID with food \u00d7 3 weeks \u2192 20 mg OD", "No adjustment CrCl > 15. Caution CrCl 15\u201329."],
  ["VTE secondary prevention", "10 mg OD (after \u2265 6 months)", "Consider dose reduction from 20 mg based on recurrence vs bleed risk."],
  ["Post-arthroplasty prophylaxis", "10 mg OD", "Start 6\u201310 h post-op. 14 days (knee) / 35 days (hip)."],
  ["CAD/PAD vascular protection", "2.5 mg BID + ASA 75\u2013100 mg", "NOT with DAPT. Not for patients with AF."],
  ["Pediatric VTE", "Weight-based (oral suspension 1 mg/mL)", "After \u2265 5 days initial parenteral anticoagulation. See special populations."],
];

const drugInteractions = [
  {
    title: "Strong Dual CYP3A4 + P-gp Inhibitors \u2014 AVOID",
    tone: "danger",
    items: [
      "Azole antifungals: ketoconazole, itraconazole, posaconazole",
      "HIV protease inhibitors: ritonavir, cobicistat",
      "Nirmatrelvir/ritonavir (Paxlovid) \u2014 hold rivaroxaban 24 h before starting; restart 2 days after completing treatment",
    ],
    effect: "Increased rivaroxaban plasma levels \u2192 increased bleeding risk",
  },
  {
    title: "Strong CYP3A4 Inducers \u2014 AVOID",
    tone: "warn",
    items: [
      "Rifampin",
      "Carbamazepine",
      "Phenytoin, phenobarbital",
      "St. John\u2019s Wort",
    ],
    effect: "Reduced rivaroxaban levels \u2192 decreased efficacy",
  },
  {
    title: "Moderate CYP3A4 + P-gp Inhibitors \u2014 CAUTION",
    tone: "info",
    items: [
      "Erythromycin, fluconazole \u2014 no clinically relevant effect in normal renal function",
      "Use with caution in mild\u2013moderate renal impairment (approximately 2-fold increase in levels)",
    ],
    effect: "Monitor closely in renal impairment",
  },
  {
    title: "Antiplatelet Agents",
    tone: "warn",
    items: [
      "Concomitant antiplatelets increase bleeding risk",
      "ASA, clopidogrel, prasugrel, ticagrelor",
    ],
    effect: "Use combination therapy only when clearly indicated and for shortest duration",
  },
];

const references = [
  "Caroti KS, et al. Rivaroxaban versus low-molecular-weight heparins in a broad cohort of patients with cancer-associated venous thromboembolism: An analysis of the OSCAR-US program. Clin Appl Thromb Hemost. 2023;29:10760296231189282.",
  "Eikelboom JW, et al. Rivaroxaban with or without ASA in stable cardiovascular disease. N Engl J Med. 2017;377(14):1319\u20131330.",
  "EINSTEIN Investigators, et al. Oral rivaroxaban for symptomatic venous thromboembolism. N Engl J Med. 2010;363(26):2499\u20132510.",
  "EINSTEIN-PE Investigators, et al. Oral rivaroxaban for the treatment of symptomatic pulmonary embolism. N Engl J Med. 2012;366(14):1287\u20131297.",
  "Eriksson BI, et al. Oral rivaroxaban for the prevention of symptomatic venous thromboembolism after elective hip and knee replacement. J Bone Joint Surg Br. 2009;91(8):636\u2013644.",
  "Gibson CM, et al. Prevention of bleeding in patients with atrial fibrillation undergoing PCI. N Engl J Med. 2016;375:2423\u20132434.",
  "Khorana AA, et al. Rivaroxaban for thromboprophylaxis in high-risk ambulatory patients with cancer. N Engl J Med. 2019;380:720\u2013728.",
  "Male C, et al. Rivaroxaban compared with standard anticoagulants for the treatment of acute venous thromboembolism in children: a randomized, controlled, phase 3 trial. Lancet Haematol. 2020;7(1):e18\u2013e27.",
  "McCrindle BW, et al. Thromboprophylaxis for children post-Fontan procedure: Insights from the UNIVERSE study. J Am Heart Assoc. 2021;10(22):e021765.",
  "Patel MR, et al. Rivaroxaban versus warfarin in nonvalvular atrial fibrillation. N Engl J Med. 2011;365(10):883\u2013891.",
  "Schulman S, Crowther MA. How I treat with anticoagulants in 2012: new and old anticoagulants, and when and how to switch. Blood. 2012;119(13):3016\u20133023.",
  "Turpie AG, et al. Management consensus guidance for the use of rivaroxaban \u2014 an oral, direct factor Xa inhibitor. Thromb Haemost. 2012;108(5):876\u2013888.",
  "Weitz JI, et al. Rivaroxaban or aspirin for extended treatment of venous thromboembolism. N Engl J Med. 2017;376:1211\u20131222.",
  "Wiesen HJ, et al. The direct factor Xa inhibitor rivaroxaban passes into human breast milk. Chest. 2016;150(1):e1\u2013e4.",
  "Xarelto (rivaroxaban) Product Monograph. Bayer Inc. Mississauga, Ontario. March 27, 2024.",
  "Young AM, et al. Comparison of an oral factor Xa inhibitor with low molecular weight heparin in patients with cancer with venous thromboembolism: results of a randomized trial (SELECT-D). J Clin Oncol. 2018;36(20):2017\u20132023.",
];

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["monitoring", "Monitoring & Safety"],
  ["interactions", "Drug Interactions"],
  ["special", "Special Populations"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function RivaroxabanGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Direct Oral Anticoagulant</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">v54</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Rivaroxaban (Xarelto)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span>Updated 6 February 2026</span>
              <span>Oral Factor Xa Inhibitor</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide an overview of the mechanism of action, approved indications, dosing regimens, and side effects of rivaroxaban.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div>
          <h3>Mechanism of Action</h3>
          <p>
            Rivaroxaban is an oral factor Xa inhibitor. By binding reversibly to the active site of factor Xa, rivaroxaban attenuates thrombin generation and reduces fibrin formation.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Rivaroxaban guide sections">
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

        {/* ── OVERVIEW ── */}
        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <div>
                <strong>Advisory (Dec 2018):</strong> Rivaroxaban is NOT indicated nor recommended for patients post transcatheter aortic valve replacement (TAVR). Increased all-cause mortality, thromboembolic events, and bleeding events have been observed.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Approved Indications</h3>
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Rivaroxaban 10 mg, 15 mg, 20 mg</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Thromboprophylaxis after elective hip (THR) or knee (TKR) replacement surgery.</li>
                  <li>Treatment of DVT and/or PE, and prevention of recurrent DVT and PE.</li>
                  <li>Stroke and systemic embolism prevention in patients with non-valvular atrial fibrillation.</li>
                </ul>
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Rivaroxaban 2.5 mg + ASA 75-100 mg daily</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Prevention of stroke, MI, cardiovascular death, and acute limb ischaemia in patients with CAD with or without PAD.</li>
                  <li>Prevention of atherothrombotic events in symptomatic PAD at high risk of MALE or MACCE.</li>
                </ul>
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">Rivaroxaban granules for oral suspension (1 mg/mL)</div>
                <ul className="list-none p-0 space-y-1">
                  <li>Treatment of VTE and prevention of VTE recurrence in patients aged less than 18 years, after at least 5 days of initial parenteral anticoagulation.</li>
                </ul>
              </div>
            </article>
          </div>
        ) : null}

        {/* ── DOSING ── */}
        {tab === "dosing" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Dosing Summary</h3>
              <table className="w-full border-collapse text-sm">
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
                      <td className="font-bold text-foreground">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Food requirement:</strong> Rivaroxaban 15 mg and 20 mg tablets, and granules for oral suspension, MUST be taken with food (or feeding) for adequate absorption. The 2.5 mg and 10 mg tablets may be taken with or without food.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Switching from Warfarin to Rivaroxaban</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Stop <GuideLink to="warfarin">warfarin</GuideLink> and wait until INR falls below 2.5 before starting rivaroxaban (onset of action is rapid, 1&ndash;3 hours).</li>
                <li>If INR testing is not readily available, wait 2&ndash;3 days after the last warfarin dose before starting rivaroxaban.</li>
                <li>If INR is supratherapeutic, it will take longer for INR to fall to 2.5 or below.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Administration</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Tablets may be crushed and mixed with applesauce for immediate oral use.</li>
                <li>May be administered via nasogastric tube: crush tablet in 50 mL water, flush with water, follow with food/NG feeds.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── MONITORING & SAFETY ── */}
        {tab === "monitoring" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Laboratory Monitoring</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Routine laboratory monitoring is NOT necessary.</li>
                <li>PT/INR is more responsive to rivaroxaban than aPTT, but neither provides a reliable measure for dosing adjustments.</li>
                <li>Anti-factor Xa assays using rivaroxaban-specific calibrators, where available, can determine plasma rivaroxaban concentration. See the <GuideLink to="doacsCoagTests">DOACs: Coagulation Tests</GuideLink> guide.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Periodic Clinical Assessment</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Compliance assessment and reinforcement at each visit.</li>
                <li>Review comorbidities and medication changes, including potential interacting agents.</li>
                <li>Patient education on signs of bleeding and when to seek care.</li>
                <li>Creatinine clearance at least yearly; more frequently if baseline abnormal or risk of worsening renal function.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Adverse Effects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Major</div>
                  <div className="text-sm leading-relaxed">Bleeding (risk increased with concomitant antiplatelets or strong CYP3A4/P-gp inhibitors)</div>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">GI</div>
                  <div className="text-sm leading-relaxed">Dyspepsia in some patients &mdash; take with food to reduce symptoms and improve absorption</div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Neuraxial</div>
                  <div className="text-sm leading-relaxed">Avoid with indwelling epidural catheters or recent spinal puncture (risk of epidural haematoma)</div>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {/* ── DRUG INTERACTIONS ── */}
        {tab === "interactions" ? (
          <div className="grid gap-3.5">
            {drugInteractions.map((section) => (
              <article key={section.title} className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone={section.tone === "danger" ? "danger" : section.tone === "warn" ? "orange" : "teal"} />{section.title}</h3>
                <ul className="list-none p-0 space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={`asa-alert asa-alert-${section.tone === "danger" ? "danger" : section.tone === "warn" ? "warn" : "info"}`}>
                  <div><strong>Effect:</strong> {section.effect}</div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {/* ── SPECIAL POPULATIONS ── */}
        {tab === "special" ? (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <div>
                <strong>Pregnancy:</strong> Rivaroxaban crosses the placenta and is contraindicated in pregnancy. It passes into breast milk and should be avoided in breastfeeding mothers.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Renal and Hepatic Impairment</h3>
              <ul className="list-none p-0 space-y-1">
                <li>CrCl &lt; 15 mL/min: rivaroxaban is NOT recommended.</li>
                <li>CrCl 15&ndash;29 mL/min: use with caution across all indications.</li>
                <li>Moderate or severe hepatic impairment (Child-Pugh B or C): avoid rivaroxaban.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Pediatrics</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Approved (January 2021) for VTE treatment and recurrence prevention in patients &lt; 18 years.</li>
                <li>Weight-based dosing using oral suspension (1 mg/mL) based on EINSTEIN Jr phase III trial data.</li>
                <li>Requires at least 5 days of initial parenteral anticoagulation (heparinization) before starting.</li>
                <li>EINSTEIN Jr: symptomatic recurrent VTE in 0.6% of children; no major bleeds on treatment.</li>
                <li>All children requiring rivaroxaban should be managed in consultation with a paediatric haematologist.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Cancer-Associated Thrombosis</h3>
              <ul className="list-none p-0 space-y-1">
                <li>No approved indication specifically for cancer-associated VTE.</li>
                <li>SELECT-D trial: rivaroxaban may be a reasonable alternative to LMWH when GI bleeding risk is low and in non-GI solid tumours.</li>
                <li>OSCAR-US observational study: rivaroxaban associated with significant reductions in composite of recurrent VTE or bleeding-related hospitalisation vs LMWH.</li>
                <li>Caution with upper GI and urothelial cancers due to increased GI/GU bleeding risk.</li>
                <li>Review drug interactions and thrombocytopenia risk before prescribing. See the <GuideLink to="cancer">Cancer &amp; Thrombosis</GuideLink> guide.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Obesity</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Observational studies support efficacy and safety of rivaroxaban in obese patients.</li>
                <li>ISTH guidance supports standard dosing for patients &gt; 120 kg or BMI &gt; 40. See the <GuideLink to="doacsObesity">DOACs in Obesity</GuideLink> guide.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Bleeding Reversal</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Andexanet alfa: specific reversal agent for life-threatening or uncontrolled bleeding.</li>
                <li>Prothrombin complex concentrate (PCC): indirect reversal option when andexanet alfa is unavailable.</li>
                <li>Supportive measures: discontinue rivaroxaban, local haemostasis, fluid resuscitation, transfusion as needed.</li>
              </ul>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <div>See the <GuideLink to="doacsBleeding">DOACs: Management of Bleeding</GuideLink> guide for detailed protocols.</div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Stable Cardiovascular Disease (COMPASS Trial)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Rivaroxaban 2.5 mg BID + ASA 100 mg OD: improved cardiovascular outcomes and lower mortality vs ASA alone, but more major bleeding. Net clinical benefit favoured combination therapy. See the <GuideLink to="pad">Peripheral Arterial Disease</GuideLink> guide.</li>
                <li>Rivaroxaban 5 mg BID alone: did not improve outcomes vs ASA and was associated with more bleeding.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── REFERENCES ── */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                <li><GuideLink to="anticoagAntiplatelet">Anticoagulation + Antiplatelet Therapy</GuideLink></li>
                <li><GuideLink to="cancer">Cancer &amp; Thrombosis</GuideLink></li>
                <li><GuideLink to="dvtTreatment">DVT: Treatment</GuideLink></li>
                <li><GuideLink to="doacsCoagTests">DOACs: Coagulation Tests</GuideLink></li>
                <li><GuideLink to="doacsComparison">DOACs: Comparison &amp; FAQ</GuideLink></li>
                <li><GuideLink to="doacsBleeding">DOACs: Bleeding Management</GuideLink></li>
                <li><GuideLink to="doacsPeriop">DOACs: Perioperative Management</GuideLink></li>
                <li><GuideLink to="pad">Peripheral Arterial Disease</GuideLink></li>
                <li><GuideLink to="peTreatment">PE: Treatment</GuideLink></li>
                <li><GuideLink to="strokeAf">Stroke Prevention in AF</GuideLink></li>
                <li><GuideLink to="prophylaxisOrtho">Thromboprophylaxis: Orthopedic Surgery</GuideLink></li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Rivaroxaban (Xarelto)</strong> | Updated 6 February 2026 | Version 54</p>
        <p>The information here is not a substitute for clinical judgement. Always consult appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
