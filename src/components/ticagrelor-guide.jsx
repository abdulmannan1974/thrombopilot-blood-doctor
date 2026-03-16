import { useState } from "react";
import { GuideLink } from "./guide-link";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  Info,
  Link2,
  ShieldAlert,
  Syringe,
  Wind,
} from "lucide-react";

const tabs = [
  ["overview", "Overview"],
  ["dosing", "Dosing"],
  ["adverse", "Adverse Effects"],
  ["periprocedural", "Periprocedural"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const dosingRows = [
  [
    "ACS (medical, PCI, or CABG)",
    "180 mg loading, then 90 mg BID",
    "Continue up to 1 year. Take with ASA 81 mg daily.",
  ],
  [
    "Prior MI \u22651 year, high risk",
    "60 mg BID",
    "Continue up to 3 years. Take with ASA 81 mg daily.",
  ],
];

const trialSummary = [
  {
    name: "PLATO",
    population: "ACS",
    comparator: "Ticagrelor 90 mg BID vs clopidogrel",
    result:
      "1.9% ARR for MI / CV death / stroke (NNT = 52). MI ARR 1.1%. All-cause mortality ARR 1.4%.",
  },
  {
    name: "PEGASUS-TIMI 54",
    population: "MI 1\u20133 years prior",
    comparator: "Ticagrelor 60 mg BID + ASA vs ASA alone",
    result: "1.3% ARR for CV death / MI / stroke (NNT = 79).",
  },
  {
    name: "THALES",
    population: "Minor stroke / high-risk TIA",
    comparator: "30-day DAPT vs ASA alone",
    result:
      "Slightly superior (5% vs 6.3%) but more severe bleeding (0.5% vs 0.1%). NOT superior to ASA alone at 90 days for acute ischemic stroke / TIA.",
  },
];

const adverseItems = [
  {
    tone: "serious",
    label: "Major bleeding (PLATO)",
    text: "4.5% (NNH = 143 vs clopidogrel).",
  },
  {
    tone: "serious",
    label: "Major bleeding (PEGASUS 60 mg)",
    text: "TIMI major ARI 1.2% (NNH = 81 vs ASA alone).",
  },
  {
    tone: "serious",
    label: "Elderly bleeding (POPular AGE, age \u226570)",
    text: "Clopidogrel had less bleeding (18% vs 24%) with similar net clinical benefit \u2014 clopidogrel may be preferred for elderly.",
  },
  {
    tone: "moderate",
    label: "Dyspnea",
    text: "14\u201316%. Usually mild, often resolves. Mechanism: adenosine-mediated vagal C-fiber stimulation.",
  },
  {
    tone: "default",
    label: "Bradycardia / ventricular pauses",
    text: "Early onset, not associated with syncope or pacemaker need.",
  },
  {
    tone: "default",
    label: "Renal / metabolic",
    text: "Small increases in creatinine, uric acid; possible gout.",
  },
];

const contraindicatedDrugs = [
  {
    category: "Strong CYP3A4 inhibitors",
    examples: "Ketoconazole, clarithromycin, ritonavir",
  },
  {
    category: "Strong CYP3A4 inducers",
    examples: "Phenytoin, carbamazepine, rifampin",
  },
];

const references = [
  "Wallentin L, et al. Ticagrelor versus clopidogrel in patients with acute coronary syndromes (PLATO). N Engl J Med. 2009;361:1045-1057.",
  "Bonaca MP, et al. Long-term use of ticagrelor in patients with prior myocardial infarction (PEGASUS-TIMI 54). N Engl J Med. 2015;372:1791-1800.",
  "Johnston SC, et al. Ticagrelor and aspirin or aspirin alone in acute ischemic stroke or TIA (THALES). N Engl J Med. 2020;383:207-217.",
  "Gimbel M, et al. Clopidogrel versus ticagrelor or prasugrel in patients aged 70 years or older with non-ST-elevation acute coronary syndrome (POPular AGE). Lancet. 2020;395:1374-1381.",
  "Bainey KR, et al. 2023 Canadian Cardiovascular Society and Canadian Association of Interventional Cardiology focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2024;40:160-181.",
  "Mehta SR, et al. 2018 Canadian Cardiovascular Society and Canadian Association of Interventional Cardiology focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2018;34:214-233.",
  "Douketis JD, et al. Perioperative management of antithrombotic therapy. CHEST. 2022;126:e207-e243.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function TicagrelorGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Antiplatelet Therapy</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Ticagrelor (Brilinta&reg;)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Clinical Guide</span>
              <span><FileText size={13} /> P2Y12 receptor antagonist</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <Heart size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide clinical guidance on the use of ticagrelor in the prevention of atherothrombotic events in patients with acute coronary syndromes and prior myocardial infarction.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
          <Syringe size={18} />
        </div>
        <div>
          <h3>Mechanism of Action</h3>
          <p>
            Cyclo-pentyl-triazolo-pyrimidine (CPTP). Selective, <strong>reversible</strong> P2Y12 receptor antagonist that binds at a site distinct from ADP (non-competitive inhibition). Does not require hepatic conversion to an active metabolite.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Ticagrelor guide sections">
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
              <h3><Dot tone="cardiac" />Approved Indications</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Acute coronary syndromes (ACS) &mdash; medically managed, PCI, or CABG &mdash; in combination with <GuideLink to="asa">ASA</GuideLink>, for up to 1 year.</li>
                <li>Prior MI &ge;1 year in patients at high risk, in combination with ASA, for up to 3 years (60 mg BID).</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Key Trial Evidence</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Trial</th>
                    <th>Population</th>
                    <th>Comparator</th>
                    <th>Key Result</th>
                  </tr>
                </thead>
                <tbody>
                  {trialSummary.map((row) => (
                    <tr key={row.name}>
                      <td className="font-bold text-foreground">{row.name}</td>
                      <td>{row.population}</td>
                      <td>{row.comparator}</td>
                      <td>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>ASA dose matters:</strong> The efficacy benefit of ticagrelor may be lost when co-administered with ASA doses exceeding 150 mg/day. Use ASA 81 mg daily.
              </div>
            </div>
          </div>
        ) : null}

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

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="default" />Pharmacokinetic Notes</h3>
              <ul className="list-none p-0 space-y-1">
                <li>No food effect on absorption.</li>
                <li>No dose adjustment for renal impairment or mild hepatic impairment.</li>
                <li>Always co-administer with ASA 81 mg daily.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Contraindicated Drug Interactions</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {contraindicatedDrugs.map((row) => (
                    <tr key={row.category}>
                      <td className="font-bold text-foreground">{row.category}</td>
                      <td>{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>CONTRAINDICATED</strong> with strong CYP3A4 inhibitors (ketoconazole, clarithromycin, ritonavir) and strong CYP3A4 inducers (phenytoin, carbamazepine, rifampin).
              </div>
            </div>
          </div>
        ) : null}

        {tab === "adverse" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Adverse Effects Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adverseItems.map((item) => (
                  <div key={`${item.label}`} className={`asa-ae-card ${item.tone}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>CONTRAINDICATED</strong> in patients with prior intracranial hemorrhage (ICH).
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Wind size={16} />
              <div>
                <strong>Dyspnea (14&ndash;16%):</strong> Usually mild and often resolves spontaneously. The mechanism involves adenosine-mediated stimulation of vagal C fibers. It does not reflect heart failure or bronchospasm in most cases.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Elderly patients (age &ge;70):</strong> The POPular AGE trial showed <GuideLink to="clopidogrel">clopidogrel</GuideLink> had less bleeding (18% vs 24%) with similar net clinical benefit. Clopidogrel may be preferred in this population.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "periprocedural" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Periprocedural Management</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <Info size={16} />
                <div>Balance thrombotic risk and procedural bleeding risk. Consult a specialist before stopping ticagrelor in stented patients.</div>
              </div>

              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-blue-500" />
                  <div className="text-sm font-semibold">5 days before surgery</div>
                  <div className="text-sm text-muted-foreground">
                    Stop ticagrelor 5 days before surgery when interruption is appropriate.
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-gray-400" />
                  <div className="text-sm font-semibold">Day of procedure</div>
                  <div className="text-sm text-muted-foreground">
                    Proceed with surgery. Confirm bleeding control plan.
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
                  <div className="text-sm font-semibold">Post-procedure</div>
                  <div className="text-sm text-muted-foreground">
                    Restart ticagrelor as soon as hemostasis is secure.
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="cardiac" />DAPT Duration After ACS</h3>
              <ul className="list-none p-0 space-y-1">
                <li>After medically managed ACS: continue DAPT for at least 3 months, preferably 1 year.</li>
                <li>Delay significant bleed-risk procedures beyond these timeframes when possible.</li>
                <li>Minor procedures: no need to stop ticagrelor.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <CheckCircle2 size={16} />
              <div>See the <GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink> guide for detailed interruption, DAPT management, and restart decisions.</div>
            </div>
          </div>
        ) : null}

        {tab === "special" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Pharmacogenomic Advantage</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Unlike <GuideLink to="clopidogrel">clopidogrel</GuideLink> and <GuideLink to="prasugrel">prasugrel</GuideLink>, ticagrelor does <strong>not</strong> require conversion to an active metabolite. Its efficacy is therefore:
              </p>
              <ul className="list-none p-0 space-y-1">
                <li>Not affected by CYP2C19 loss-of-function alleles.</li>
                <li>Not reduced by concomitant proton pump inhibitor (PPI) use.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Pregnancy and Breastfeeding</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Pregnancy safety has not been established.</li>
                <li>Breastfeeding is not recommended during ticagrelor therapy.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                <strong>Reversible inhibition:</strong> Because ticagrelor binds reversibly, platelet function recovers faster after discontinuation compared with the irreversible thienopyridines (<GuideLink to="clopidogrel">clopidogrel</GuideLink>, <GuideLink to="prasugrel">prasugrel</GuideLink>). This is relevant when planning urgent procedures.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                <li><GuideLink to="asa">ASA (Acetylsalicylic Acid)</GuideLink></li>
                <li><GuideLink to="clopidogrel">Clopidogrel (Plavix)</GuideLink></li>
                <li><GuideLink to="prasugrel">Prasugrel</GuideLink></li>
                <li><GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink></li>
                <li><GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink></li>
                <li><GuideLink to="doacsComparison">DOACs: Comparison &amp; FAQ</GuideLink></li>
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
        <p><strong>Ticagrelor (Brilinta&reg;)</strong> | Clinical Guide</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
