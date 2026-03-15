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
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Antiplatelet Therapy</span>
            </div>
            <h2 className="asa-guide-title">Clopidogrel (Plavix&reg;)</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Clinical Guide</span>
              <span><FileText size={13} /> Thienopyridine P2Y12 Inhibitor</span>
            </div>
          </div>
          <div className="asa-guide-icon">
            <Heart size={24} />
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide guidance on the use of clopidogrel for prevention of atherothrombotic events, including indications, dosing, adverse effects, and periprocedural management.
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Clopidogrel guide sections">
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
            <div className="asa-mechanism-card">
              <div className="asa-mechanism-icon">
                <Syringe size={18} />
              </div>
              <div>
                <h3>Mechanism of Action</h3>
                <p>Clopidogrel is a thienopyridine that irreversibly blocks the P2Y12 ADP receptor on platelets. It is a prodrug that requires metabolic activation by the cytochrome P450 system, primarily CYP3A4 and CYP2C19.</p>
              </div>
            </div>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Clinical Role</h3>
              <p className="asa-section-copy">
                Clopidogrel provides cardiovascular protection both as monotherapy and in combination with <GuideLink to="asa">ASA</GuideLink>. It is used across a spectrum of atherothrombotic conditions including acute coronary syndromes (ACS), peripheral arterial disease (PAD), and cerebrovascular disease.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Monitoring</h3>
              <p className="asa-section-copy">
                Obtain a baseline CBC before initiating therapy. No ongoing platelet function testing or coagulation monitoring is required.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── Indications ── */}
        {tab === "indications" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="cardiac" />Monotherapy</h3>
              <ul className="asa-ind-list">
                <li>Secondary prevention of atherothrombotic events in patients with stable atherosclerosis.</li>
                <li>Alternative to ASA in patients with ASA allergy or high gastrointestinal bleeding risk.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="cardiac" />Dual Antiplatelet Therapy (DAPT) with ASA</h3>
              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  <span className="asa-ind-icon cardiac"><Heart size={14} /></span>
                  ACS with PCI
                </div>
                <ul className="asa-ind-list">
                  <li>DAPT duration 3 to 12 months depending on individual risk assessment.</li>
                  <li>May extend beyond 1 year if the patient has low bleeding risk and high thrombotic risk.</li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  <span className="asa-ind-icon cardiac"><Heart size={14} /></span>
                  Elective PCI
                </div>
                <ul className="asa-ind-list">
                  <li>DAPT for 6 to 12 months.</li>
                  <li>High thrombotic risk + low bleeding risk: consider extending to 3 years.</li>
                  <li>High bleeding risk: shorten to 1 month (BMS) or 3 months (DES).</li>
                </ul>
              </div>

              <div className="asa-ind-group">
                <div className="asa-ind-group-label">
                  <span className="asa-ind-icon stroke"><ShieldAlert size={14} /></span>
                  Acute High-Risk TIA / Minor Ischemic Stroke
                </div>
                <ul className="asa-ind-list">
                  <li>DAPT for 21 days: clopidogrel 300&ndash;600 mg load + 75 mg daily, with ASA 160 mg load + 80 mg daily.</li>
                  <li>After 21 days, transition to ASA monotherapy.</li>
                </ul>
              </div>

              <div className="asa-alert asa-alert-warn">
                <AlertCircle size={16} />
                <div>
                  <strong>Risk factor assessment for DAPT duration:</strong> Weigh bleeding risk against thrombotic risk when determining duration. See the <GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink> guide.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Bleeding Risk Factors</h4>
                  <ul className="asa-ind-list" style={{ fontSize: "0.78rem" }}>
                    {bleedingRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Thrombotic Risk Factors</h4>
                  <ul className="asa-ind-list" style={{ fontSize: "0.78rem" }}>
                    {thromboticRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", marginBottom: "0.4rem", opacity: 0.85 }}>Angiographic Risk Factors</h4>
                  <ul className="asa-ind-list" style={{ fontSize: "0.78rem" }}>
                    {angiographicRiskFactors.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="stroke" />Other Indications</h3>
              <ul className="asa-ind-list">
                <li>Recurrent cerebrovascular events despite ASA therapy. See the <GuideLink to="strokeSecondary">Ischemic Stroke: Secondary Prevention</GuideLink> guide.</li>
                <li>Stable symptomatic <GuideLink to="pad">PAD</GuideLink> with high vascular risk, low bleeding risk, and contraindication to low-dose <GuideLink to="rivaroxaban">rivaroxaban</GuideLink>.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Dosing ── */}
        {tab === "dosing" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Dosing Summary</h3>
              <table className="asa-dose-table">
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
                      <td className="dose-highlight">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Loading dose rationale:</strong> Without a loading dose, peak antiplatelet effect is delayed by approximately 4 days.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Adverse Effects ── */}
        {tab === "adverse" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Adverse Effects Profile</h3>
              <div className="asa-ae-grid">
                {adverseEffects.map((item) => (
                  <div key={`${item.label}-${item.text}`} className={`asa-ae-card ${item.tone}`}>
                    <div className="asa-ae-card-label">{item.label}</div>
                    <div className="asa-ae-card-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Bleeding risk increases</strong> when clopidogrel is combined with ASA or anticoagulants. Assess bleeding risk carefully before initiating combination therapy.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Periprocedural ── */}
        {tab === "periprocedural" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="purple" />Periprocedural Management</h3>
              <div className="asa-alert asa-alert-info">
                <Info size={16} />
                <div>Balance thrombotic risk and bleeding risk for every procedure. Exercise particular caution in patients with recent coronary stents.</div>
              </div>

              <div className="asa-timeline">
                {timelineSteps.map((step) => (
                  <div key={step[0]} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="asa-timeline-label">{step[0]}</div>
                    <div className="asa-timeline-desc">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-teal">
              <CheckCircle2 size={16} />
              <div>See the <GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink> guide for detailed interruption and restart decisions.</div>
            </div>
          </div>
        ) : null}

        {/* ── Special Considerations ── */}
        {tab === "special" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="orange" />CYP2C19 Polymorphisms</h3>
              <p className="asa-section-copy">
                Genetic polymorphisms in CYP2C19 may reduce conversion of clopidogrel to its active metabolite, potentially diminishing its antiplatelet effect. However, routine CYP2C19 genotype testing is <strong>not recommended</strong> in clinical practice.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Proton Pump Inhibitor (PPI) Interaction</h3>
              <p className="asa-section-copy">
                Strong CYP2C19 inhibitors (e.g. omeprazole, esomeprazole) may reduce the antiplatelet effect of clopidogrel. When gastroprotection is needed, use <strong>pantoprazole</strong>, which is not a strong CYP2C19 inhibitor.
              </p>
              <div className="asa-alert asa-alert-warn">
                <AlertCircle size={16} />
                <div>
                  Avoid omeprazole and esomeprazole in patients taking clopidogrel. Pantoprazole is the preferred PPI.
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Comparison with Prasugrel and Ticagrelor</h3>
              <p className="asa-section-copy">
                <GuideLink to="prasugrel">Prasugrel</GuideLink> and <GuideLink to="ticagrelor">ticagrelor</GuideLink> provide faster onset and greater degree of platelet inhibition with less inter-patient variability compared to clopidogrel. They have demonstrated superior efficacy in ACS but are more costly. Consider these agents when enhanced platelet inhibition is clinically warranted.
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
                <li><GuideLink to="asa">ASA (Acetylsalicylic Acid)</GuideLink></li>
                <li><GuideLink to="periopAntiplatelet">Perioperative Antiplatelet Management</GuideLink></li>
                <li><GuideLink to="pad">Peripheral Arterial Disease</GuideLink></li>
                <li><GuideLink to="strokeSecondary">Ischemic Stroke: Secondary Prevention</GuideLink></li>
                <li><GuideLink to="daptDuration">DAPT Duration in CAD</GuideLink></li>
                <li><GuideLink to="prasugrel">Prasugrel</GuideLink></li>
                <li><GuideLink to="ticagrelor">Ticagrelor (Brilinta)</GuideLink></li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="gray" />References</h3>
              <ol className="asa-ref-list">
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="asa-guide-footer">
        <p><strong>Clopidogrel (Plavix&reg;)</strong> | Clinical Guide</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
