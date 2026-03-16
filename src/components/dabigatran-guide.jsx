import { useState } from "react";
import { GuideLink } from "./guide-link";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  FileText,
  FlaskConical,
  Info,
  Link2,
  Pill,
  ShieldAlert,
  Syringe,
} from "lucide-react";

const dosingRows = [
  ["Stroke prevention in non-valvular AF", "150 mg BID", "Standard dose for most patients."],
  ["AF \u2014 age \u226580 or higher bleed risk", "110 mg BID", "Age \u226575 with \u22651 bleeding risk factor also qualifies for reduced dose."],
  ["VTE treatment (DVT/PE)", "150 mg BID", "After 5\u201310 days of parenteral anticoagulant. Dose reduction to 110 mg BID per AF criteria (not studied in VTE trials)."],
  ["VTE prophylaxis \u2014 hip/knee replacement", "110 mg 1\u20134 hrs post-op, then 220 mg OD", "Continue 10\u201335 days depending on procedure."],
];

const monitoringPoints = [
  { label: "Routine lab monitoring", text: "Not required." },
  { label: "aPTT", text: "Prolonged but reagent-dependent; plateaus at higher concentrations \u2014 not reliable for quantitation." },
  { label: "Thrombin clotting time (TCT)", text: "Most sensitive assay. Always prolonged when dabigatran is present; useful to confirm drug presence." },
  { label: "Dilute thrombin time (Hemoclot)", text: "Linear dose\u2013response relationship; best quantitative assay when available." },
  { label: "Clinical assessment", text: "Periodic review of adherence, comorbidities, and concomitant medications." },
  { label: "Renal function", text: "Creatinine clearance at least annually; more frequently if CrCl 30\u201350 mL/min or clinical change." },
];

const adverseEffects = [
  { tone: "serious", label: "Major", text: "Bleeding (gastrointestinal, intracranial, other sites)" },
  { tone: "default", label: "Common", text: "Dyspepsia (up to 10%) \u2014 may improve by taking with meals or adding a PPI" },
  { tone: "serious", label: "Serious", text: "Epidural/spinal haematoma risk with neuraxial anaesthesia or indwelling catheters" },
];

const drugInteractions = [
  { category: "CONTRAINDICATED", tone: "red", items: ["Strong P-gp inhibitors: ketoconazole, dronedarone"] },
  { category: "AVOID", tone: "red", items: ["Strong P-gp inducers: carbamazepine, phenytoin, rifampin, St John\u2019s Wort"] },
  { category: "CAUTION", tone: "amber", items: [
    "Moderate P-gp inhibitors \u2014 dose adjustment may be needed",
    "Verapamil/quinidine \u2014 take dabigatran at least 2 hours before the P-gp inhibitor",
    "SSRIs \u2014 increase bleeding risk 50\u2013100%",
    "SNRIs \u2014 increase bleeding risk approximately 100%",
  ]},
];

const specialConsiderations = [
  {
    title: "Storage and Administration",
    items: [
      "Keep capsules in original blister pack \u2014 moisture-sensitive.",
      "Do NOT crush, chew, or open capsules.",
    ],
  },
  {
    title: "Reversal Agent",
    items: [
      "Idarucizumab (Praxbind\u00ae) 5 g IV bolus \u2014 rapidly and completely reverses anticoagulant effect.",
    ],
  },
  {
    title: "Cancer-associated VTE",
    items: [
      "No randomised controlled trials in this population.",
      "Avoid dabigatran for cancer-associated VTE; prefer LMWH or another DOAC with supporting evidence.",
    ],
  },
  {
    title: "Obesity",
    items: [
      "BMI >40 or weight >120 kg \u2014 consider an alternative DOAC (rivaroxaban, apixaban) or VKA.",
    ],
  },
  {
    title: "Bariatric Surgery",
    items: [
      "Absorption may be reduced after bariatric procedures.",
      "Use parenteral anticoagulation initially, then consider oral dabigatran after 4+ weeks if drug levels support adequate absorption.",
    ],
  },
  {
    title: "Pediatrics",
    items: [
      "Not approved for pediatric use.",
      "Age- and weight-adjusted dosing has been studied.",
      "Consult a pediatric thrombosis specialist.",
    ],
  },
  {
    title: "Pregnancy and Lactation",
    items: [
      "Crosses the placenta \u2014 do NOT use in pregnancy.",
      "Small amounts detected in breast milk \u2014 avoid if possible.",
    ],
  },
  {
    title: "Renal Impairment",
    items: [
      "Contraindicated if CrCl <30 mL/min.",
      "No hepatic dose adjustment required, but use with caution in cirrhosis.",
    ],
  },
];

const relatedGuides = [
  { key: "doacsComparison", label: "DOACs: Comparison & FAQ" },
  { key: "doacsPeriop", label: "DOACs: Perioperative Management" },
  { key: "doacsBleeding", label: "DOACs: Bleeding Management" },
  { key: "doacsCoagTests", label: "DOACs: Coagulation Tests" },
  { key: "doacsObesity", label: "DOACs in Obesity" },
  { key: "strokeAf", label: "Stroke Prevention in AF" },
  { key: "dvtTreatment", label: "DVT: Treatment" },
  { key: "peTreatment", label: "PE: Treatment" },
  { key: "vteDuration", label: "VTE: Duration of Treatment" },
  { key: "cancer", label: "Cancer & Thrombosis" },
];

const references = [
  "Connolly SJ, et al. Dabigatran versus warfarin in patients with atrial fibrillation. N Engl J Med. 2009;361:1139-1151 (RE-LY).",
  "Schulman S, et al. Dabigatran versus warfarin in the treatment of acute venous thromboembolism. N Engl J Med. 2009;361:2342-2352 (RE-COVER).",
  "Schulman S, et al. Extended use of dabigatran, warfarin, or placebo in venous thromboembolism. N Engl J Med. 2013;368:709-718 (RE-MEDY/RE-SONATE).",
  "Eriksson BI, et al. Dabigatran etexilate versus enoxaparin for prevention of venous thromboembolism after total hip replacement. Lancet. 2007;370:949-956 (RE-NOVATE).",
  "Eriksson BI, et al. Oral dabigatran etexilate vs. subcutaneous enoxaparin for the prevention of venous thromboembolism after total knee replacement. J Thromb Haemost. 2007;5:2178-2185 (RE-MODEL).",
  "Eikelboom JW, et al. Dabigatran versus warfarin in patients with mechanical heart valves. N Engl J Med. 2013;369:1206-1214 (RE-ALIGN).",
  "Pollack CV Jr, et al. Idarucizumab for dabigatran reversal \u2014 full cohort analysis. N Engl J Med. 2017;377:431-441 (RE-VERSE AD).",
  "Martin K, et al. Use of dabigatran in obese patients. Thromb Res. 2016;147:110-112.",
  "Steffel J, et al. 2021 European Heart Rhythm Association practical guide on the use of non-vitamin K antagonist oral anticoagulants. Europace. 2021;23:1612-1676.",
];

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["monitoring", "Monitoring"],
  ["adverse", "Adverse Effects"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function DabigatranGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Direct Oral Anticoagulant</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">DOAC</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Dabigatran (Pradaxa&reg;)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Updated 2024</span>
              <span><FileText size={13} /> Clinical Guide</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <Pill size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide guidance on the use of dabigatran etexilate (Pradaxa&reg;) for stroke prevention in atrial fibrillation, VTE treatment and prevention, and thromboprophylaxis after joint replacement surgery.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
          <Syringe size={18} />
        </div>
        <div>
          <h3>Mechanism of Action</h3>
          <p>Dabigatran is an oral direct thrombin (factor IIa) inhibitor. It binds reversibly to the active site of both free and clot-bound thrombin, preventing thrombin-mediated conversion of fibrinogen to fibrin.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Dabigatran guide sections">
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
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="blue" />Approved Indications</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Stroke prevention in non-valvular atrial fibrillation</strong> — reduction of risk of stroke and systemic embolism in patients with AF.</li>
                <li><strong>VTE treatment</strong> — treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE), and prevention of recurrent DVT and PE.</li>
                <li><strong>VTE prophylaxis</strong> — prevention of venous thromboembolism after elective total hip or total knee replacement surgery.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Contraindicated in mechanical heart valves.</strong> The RE-ALIGN trial demonstrated increased thromboembolic and bleeding events with dabigatran compared to <GuideLink to="warfarin">warfarin</GuideLink> in patients with mechanical prosthetic valves.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Contraindicated if CrCl &lt;30 mL/min.</strong> Dabigatran is predominantly renally cleared (~80%). Accumulation occurs with significant renal impairment, substantially increasing bleeding risk.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "dosing" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="blue" />Dosing Summary</h3>
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
              <AlertCircle size={16} />
              <div>
                <strong>Dose reduction criteria (110 mg BID):</strong> Age &ge;80 years, or age &ge;75 with at least one additional bleeding risk factor (e.g., moderate renal impairment, concomitant antiplatelet therapy, prior GI bleeding, low body weight).
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Renal contraindication:</strong> Do NOT prescribe dabigatran if CrCl &lt;30 mL/min. Monitor renal function at least annually and more frequently in patients with CrCl 30&ndash;50 mL/min.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "monitoring" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="teal" />Laboratory Monitoring</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Routine coagulation monitoring is not required. However, assessment of drug presence or anticoagulant intensity may be useful in specific clinical situations (bleeding, urgent surgery, suspected non-adherence, renal deterioration). See the <GuideLink to="doacsCoagTests">DOACs: Coagulation Tests</GuideLink> guide for details.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {monitoringPoints.map((item) => (
                  <div key={item.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Clinical tip:</strong> A normal TCT effectively excludes clinically significant dabigatran levels. aPTT provides qualitative information only and should not be used for dose adjustment.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "adverse" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="danger" />Adverse Effects Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adverseEffects.map((item) => (
                  <div key={`${item.label}-${item.text}`} className={`asa-ae-card ${item.tone}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="orange" />Drug Interactions (P-glycoprotein Pathway)</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Dabigatran is a P-glycoprotein (P-gp) substrate. Co-administration with P-gp modulators significantly affects drug levels.</p>
              {drugInteractions.map((group) => (
                <div key={group.category}>
                  <div className={`asa-alert asa-alert-${group.tone}`} style={{ marginBottom: "0.5rem" }}>
                    <ShieldAlert size={16} />
                    <div>
                      <strong>{group.category}:</strong>
                      <ul className="list-none p-0 space-y-1" style={{ marginTop: "0.25rem" }}>
                        {group.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Neuraxial anaesthesia:</strong> Risk of epidural or spinal haematoma with indwelling catheters. Follow <GuideLink to="doacsPeriop">perioperative DOAC management</GuideLink> guidelines for timing of last dose and catheter removal.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "special" ? (
          <div className="grid gap-3.5">
            {specialConsiderations.map((section) => (
              <article key={section.title} className="rounded-xl border bg-card shadow-sm p-5">
                <h3 className="text-base font-semibold mb-2"><Dot tone="orange" />{section.title}</h3>
                <ul className="list-none p-0 space-y-1">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Mechanical heart valves:</strong> Dabigatran is CONTRAINDICATED. The RE-ALIGN trial was terminated early due to excess thromboembolic and bleeding events. Use <GuideLink to="warfarin">warfarin</GuideLink> instead.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Pregnancy:</strong> Dabigatran crosses the placenta and must NOT be used during pregnancy. If anticoagulation is required, use LMWH. See the <GuideLink to="ufhLmwh">UFH, LMWH &amp; Fondaparinux</GuideLink> guide.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                {relatedGuides.map((item) => (
                  <li key={item.key}><GuideLink to={item.key}>{item.label}</GuideLink></li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2"><Dot tone="gray" />References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Dabigatran (Pradaxa&reg;)</strong> | Clinical Guide | Updated 2024</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
