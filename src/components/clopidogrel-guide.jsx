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
} from "lucide-react";

const tabs = [
  ["overview", "Overview"],
  ["indications", "Indications"],
  ["dosing", "Dosing"],
  ["adverse", "Adverse Effects"],
  ["periprocedural", "Periprocedural"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const dosingRows = [
  ["ACS loading dose", "300\u2013600 mg once", "Administer as early as possible."],
  ["High-risk TIA / minor stroke loading", "300\u2013600 mg once", "Combined with ASA 160 mg loading dose."],
  ["Maintenance dose", "75 mg daily", "Standard long-term dose for all indications."],
  ["Switching from ticagrelor (early post-ACS)", "300\u2013600 mg load", "Then 75 mg daily."],
  ["Switching from ticagrelor (later)", "75 mg daily", "Direct switch without loading."],
  ["Switching from prasugrel", "75 mg daily", "Direct switch without loading."],
];

const adverseEffects = [
  { tone: "default", label: "Common", text: "Increased bruising and bleeding" },
  { tone: "serious", label: "Serious", text: "GI bleeding (higher risk with concomitant ASA or anticoagulants)" },
  { tone: "moderate", label: "Rare", text: "Skin rash" },
  { tone: "serious", label: "Very rare", text: "Agranulocytosis" },
  { tone: "serious", label: "Very rare", text: "Aplastic anemia" },
  { tone: "serious", label: "Very rare", text: "Neutropenia, thrombocytopenia" },
];

const timelineSteps = [
  ["5 days before procedure", "Stop clopidogrel 5 days before invasive procedures if safe to do so. Exercise caution in patients with high thrombotic risk (e.g. recent coronary stents).", "blue"],
  ["Timing after stent placement", "Delay surgery at least 1 month after BMS and at least 3 months after DES whenever possible.", "gray"],
  ["Surgical options", "(1) Continue DAPT through surgery. (2) Continue ASA and hold clopidogrel 5 days pre-op. (3) Rarely: hold all oral antiplatelets and admit for IV short-acting antiplatelet agent.", "green"],
];

const bleedingRiskFactors = [
  "Concomitant oral anticoagulant use",
  "Age > 75 years",
  "Frailty",
  "Anemia (Hb < 110 g/L)",
  "Chronic kidney disease",
  "Weight < 60 kg",
  "Prior hospitalization for bleeding",
  "Prior stroke or intracranial hemorrhage",
  "Chronic NSAID or prednisone use",
];

const thromboticRiskFactors = [
  "Diabetes mellitus",
  "Chronic kidney disease",
  "Prior stent thrombosis",
  "Current smoking",
];

const angiographicRiskFactors = [
  "\u22653 stents deployed",
  "Long lesions treated",
  "Complex lesions (bifurcation, chronic total occlusion)",
  "Left main PCI",
  "Multivessel PCI",
];

const references = [
  "Bainey KR, et al. 2023 Canadian Cardiovascular Society and Canadian Association of Interventional Cardiology focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2024;40:160-181.",
  "CAPRIE Steering Committee. A randomised, blinded, trial of clopidogrel versus aspirin in patients at risk of ischaemic events (CAPRIE). Lancet. 1996;348:1329-1339.",
  "Bhatt DL, et al. Clopidogrel and aspirin versus aspirin alone for the prevention of atherothrombotic events (CHARISMA). N Engl J Med. 2006;354:1706-1717.",
  "Johnston SC, et al. Clopidogrel and aspirin in acute ischemic stroke and high-risk TIA (POINT). N Engl J Med. 2018;379:215-225.",
  "Mehta SR, et al. 2018 Canadian Cardiovascular Society and Canadian Association of Interventional Cardiology focused update of the guidelines for the use of antiplatelet therapy. Can J Cardiol. 2018;34:214-233.",
  "Douketis JD, et al. Perioperative management of antithrombotic therapy. CHEST. 2022;126:e207-e243.",
  "Yusuf S, et al. Effects of clopidogrel in addition to aspirin in patients with acute coronary syndromes without ST-segment elevation (CURE). N Engl J Med. 2001;345:494-502.",
  "Mega JL, et al. Cytochrome P-450 polymorphisms and response to clopidogrel. N Engl J Med. 2009;360:354-362.",
  "Bhatt DL, et al. ACCF/ACG/AHA 2008 expert consensus document on reducing the gastrointestinal risks of antiplatelet therapy and NSAID use. Circulation. 2008;118:1894-1909.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function ClopidogrelGuide() {
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
            <h2 className="text-2xl font-bold leading-tight mt-1">Clopidogrel (Plavix&reg;)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Clinical Guide</span>
              <span><FileText size={13} /> Thienopyridine P2Y12 Inhibitor</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <Heart size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide guidance on the use of clopidogrel for prevention of atherothrombotic events, including indications, dosing, adverse effects, and periprocedural management.
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Clopidogrel guide sections">
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
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
                <Syringe size={18} />
              </div>
              <div>
                <h3>Mechanism of Action</h3>
                <p>Clopidogrel is a thienopyridine that irreversibly blocks the P2Y12 ADP receptor on platelets. It is a prodrug that requires metabolic activation by the cytochrome P450 system, primarily CYP3A4 and CYP2C19.</p>
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Clinical Role</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Clopidogrel provides cardiovascular protection both as monotherapy and in combination with <GuideLink to="asa">ASA</GuideLink>. It is used across a spectrum of atherothrombotic conditions including acute coronary syndromes (ACS), peripheral arterial disease (PAD), and cerebrovascular disease.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Monitoring</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Obtain a baseline CBC before initiating therapy. No ongoing platelet function testing or coagulation monitoring is required.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── Indications ── */}
        {tab === "indications" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="cardiac" />Monotherapy</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Secondary prevention of atherothrombotic events in patients with stable atherosclerosis.</li>
                <li>Alternative to ASA in patients with ASA allergy or high gastrointestinal bleeding risk.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="cardiac" />Dual Antiplatelet Therapy (DAPT) with ASA</h3>
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"><Heart size={14} /></span>
                  ACS with PCI
                </div>
                <ul className="list-none p-0 space-y-1">
                  <li>DAPT duration 3 to 12 months depending on individual risk assessment.</li>
                  <li>May extend beyond 1 year if the patient has low bleeding risk and high thrombotic risk.</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"><Heart size={14} /></span>
                  Elective PCI
                </div>
                <ul className="list-none p-0 space-y-1">
                  <li>DAPT for 6 to 12 months.</li>
                  <li>High thrombotic risk + low bleeding risk: consider extending to 3 years.</li>
                  <li>High bleeding risk: shorten to 1 month (BMS) or 3 months (DES).</li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2"><ShieldAlert size={14} /></span>
                  Acute High-Risk TIA / Minor Ischemic Stroke
                </div>
                <ul className="list-none p-0 space-y-1">
                  <li>DAPT for 21 days: clopidogrel 300&ndash;600 mg load + 75 mg daily, with ASA 160 mg load + 80 mg daily.</li>
                  <li>After 21 days, transition to ASA monotherapy.</li>
                </ul>
              </div>

              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <AlertCircle size={16} />
                <div>
                  <strong>Risk factor assessment for DAPT duration:</strong> Weigh bleeding risk against thrombotic risk when determining duration. See the <GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink> guide.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Bleeding Risk Factors</h4>
                  <ul className="list-none p-0 space-y-1" style={{ fontSize: "0.78rem" }}>
                    {bleedingRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Thrombotic Risk Factors</h4>
                  <ul className="list-none p-0 space-y-1" style={{ fontSize: "0.78rem" }}>
                    {thromboticRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Angiographic Risk Factors</h4>
                  <ul className="list-none p-0 space-y-1" style={{ fontSize: "0.78rem" }}>
                    {angiographicRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="stroke" />Other Indications</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Recurrent cerebrovascular events despite ASA therapy. See the <GuideLink to="strokeSecondary">Ischemic Stroke: Secondary Prevention</GuideLink> guide.</li>
                <li>Stable symptomatic <GuideLink to="pad">PAD</GuideLink> with high vascular risk, low bleeding risk, and contraindication to low-dose <GuideLink to="rivaroxaban">rivaroxaban</GuideLink>.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Dosing ── */}
        {tab === "dosing" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Dosing Summary</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Indication or situation</th>
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

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                <strong>Loading dose rationale:</strong> Without a loading dose, peak antiplatelet effect is delayed by approximately 4 days.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Adverse Effects ── */}
        {tab === "adverse" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Adverse Effects Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adverseEffects.map((item) => (
                  <div key={`${item.label}-${item.text}`} className={`asa-ae-card ${item.tone}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Bleeding risk increases</strong> when clopidogrel is combined with ASA or anticoagulants. Assess bleeding risk carefully before initiating combination therapy.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Periprocedural ── */}
        {tab === "periprocedural" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Periprocedural Management</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <Info size={16} />
                <div>Balance thrombotic risk and bleeding risk for every procedure. Exercise particular caution in patients with recent coronary stents.</div>
              </div>

              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                {timelineSteps.map((step) => (
                  <div key={step[0]} className="relative">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="text-sm font-semibold">{step[0]}</div>
                    <div className="text-sm text-muted-foreground">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <CheckCircle2 size={16} />
              <div>See the <GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink> guide for detailed interruption and restart decisions.</div>
            </div>
          </div>
        ) : null}

        {/* ── Special Considerations ── */}
        {tab === "special" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />CYP2C19 Polymorphisms</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Genetic polymorphisms in CYP2C19 may reduce conversion of clopidogrel to its active metabolite, potentially diminishing its antiplatelet effect. However, routine CYP2C19 genotype testing is <strong>not recommended</strong> in clinical practice.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Proton Pump Inhibitor (PPI) Interaction</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Strong CYP2C19 inhibitors (e.g. omeprazole, esomeprazole) may reduce the antiplatelet effect of clopidogrel. When gastroprotection is needed, use <strong>pantoprazole</strong>, which is not a strong CYP2C19 inhibitor.
              </p>
              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <AlertCircle size={16} />
                <div>
                  Avoid omeprazole and esomeprazole in patients taking clopidogrel. Pantoprazole is the preferred PPI.
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Comparison with Prasugrel and Ticagrelor</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                <GuideLink to="prasugrel">Prasugrel</GuideLink> and <GuideLink to="ticagrelor">ticagrelor</GuideLink> provide faster onset and greater degree of platelet inhibition with less inter-patient variability compared to clopidogrel. They have demonstrated superior efficacy in ACS but are more costly. Consider these agents when enhanced platelet inhibition is clinically warranted.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                <li><GuideLink to="asa">ASA (Acetylsalicylic Acid)</GuideLink></li>
                <li><GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink></li>
                <li><GuideLink to="pad">Peripheral Arterial Disease</GuideLink></li>
                <li><GuideLink to="strokeSecondary">Ischemic Stroke: Secondary Prevention</GuideLink></li>
                <li><GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink></li>
                <li><GuideLink to="prasugrel">Prasugrel</GuideLink></li>
                <li><GuideLink to="ticagrelor">Ticagrelor (Brilinta)</GuideLink></li>
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
        <p><strong>Clopidogrel (Plavix&reg;)</strong> | Clinical Guide</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
