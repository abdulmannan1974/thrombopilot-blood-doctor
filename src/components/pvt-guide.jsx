import { useState } from "react";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Info,
  Link2,
  Microscope,
  ShieldAlert,
  Syringe,
  Timer,
} from "lucide-react";

const riskFactors = [
  {
    title: "Local / Abdominal Factors",
    tone: "orange",
    icon: Activity,
    items: [
      "Cirrhosis (most common cause worldwide).",
      "Abdominal surgery or abdominal malignancy.",
      "Pancreatitis.",
      "Inflammatory bowel disease (IBD).",
    ],
  },
  {
    title: "Systemic / Haematological Factors",
    tone: "purple",
    icon: Microscope,
    items: [
      "Myeloproliferative neoplasms (MPN) -- up to 30% of non-cirrhotic, non-malignant PVT have underlying MPN.",
      "Inherited thrombophilia (factor V Leiden, prothrombin gene mutation, protein C/S/antithrombin deficiency).",
      "Antiphospholipid syndrome.",
      "Paroxysmal nocturnal haemoglobinuria.",
      "Oral contraceptive use or hormone replacement therapy.",
    ],
  },
];

const diagnosticApproach = [
  {
    modality: "CT with contrast",
    finding: "Non-enhancing filling defect in the portal vein",
    notes: "Most commonly used modality for diagnosis and extent assessment.",
  },
  {
    modality: "Doppler ultrasound",
    finding: "Echogenic thrombus with absent or reduced Doppler flow",
    notes: "Useful initial test; operator-dependent. May miss partial thrombosis.",
  },
  {
    modality: "MRI / MR angiography",
    finding: "Signal abnormality in the portal vein lumen",
    notes: "Alternative when CT contrast is contraindicated.",
  },
];

const workupItems = [
  "CBC and peripheral blood smear (screen for MPN).",
  "JAK2 V617F mutation testing -- high utility in non-cirrhotic, non-malignant PVT.",
  "Thrombophilia panel if no obvious provoking factor identified.",
  "Liver function tests and hepatic synthetic function.",
  "Cross-sectional imaging to exclude occult abdominal malignancy.",
  "Consider bone marrow biopsy if MPN suspected.",
];

const anticoagulateIndications = [
  {
    title: "Anticoagulate",
    tone: "teal",
    icon: CheckCircle2,
    items: [
      "Symptomatic or extensive acute PVT.",
      "Extension into the superior mesenteric vein (SMV) -- to prevent bowel ischaemia.",
      "Liver transplant candidates -- to maintain portal vein patency.",
      "Incidental cancer-associated PVT -- treat as symptomatic.",
    ],
  },
  {
    title: "Consider / Controversial",
    tone: "orange",
    icon: AlertCircle,
    items: [
      "Asymptomatic PVT -- decision should be individualised; controversial but many experts favour treatment.",
      "Chronic PVT without ongoing risk factor -- limited evidence of benefit.",
    ],
  },
  {
    title: "Exercise Caution or Avoid",
    tone: "danger",
    icon: ShieldAlert,
    items: [
      "Cavernous transformation (chronic collateralised PVT) -- unlikely to extend; risks of anticoagulation may outweigh benefits.",
      "Active bleeding -- absolute contraindication.",
    ],
  },
];

const bleedingNotes = [
  "Active bleeding is an absolute contraindication to anticoagulation.",
  "Previous variceal bleeding or presence of varices alone is NOT a contraindication to anticoagulation.",
  "Attempt variceal banding before initiating anticoagulation if feasible.",
  "Screen all cirrhotic patients for varices prior to starting anticoagulation.",
];

const acuteOptions = [
  {
    agent: "Low molecular weight heparin (LMWH)",
    detail: "Preferred in cancer-associated PVT and liver disease. Weight-based dosing; consider anti-Xa monitoring in cirrhosis.",
    tone: "teal",
  },
  {
    agent: "Unfractionated heparin (UFH)",
    detail: "Consider when rapid reversal may be needed (e.g., peri-procedural, high bleeding risk). aPTT-guided dosing.",
    tone: "blue",
  },
  {
    agent: "Sub-therapeutic LMWH",
    detail: "May be considered for high bleeding risk or localised, non-extensive PVT as a compromise strategy.",
    tone: "orange",
  },
];

const doacNote = {
  title: "Direct Oral Anticoagulants (DOACs)",
  points: [
    "Limited data in PVT; use is extrapolated from VTE evidence.",
    "One small RCT: rivaroxaban 15 mg daily vs no anticoagulation in non-cirrhotic chronic PVT.",
    "Results: lower thrombosis recurrence with rivaroxaban; no increase in major bleeding but more minor bleeding.",
    "DOACs should be used with caution in cirrhosis (limited safety data, especially Child-Pugh B/C).",
    "Warfarin remains an alternative for long-term therapy when LMWH is impractical and DOACs are unsuitable.",
  ],
};

const durationRows = [
  ["Reversible / transient risk factor", "3 months", "Reassess at completion; ensure provoking factor has resolved."],
  ["Unprovoked or ongoing risk factor", "\u22653\u20136 months", "Consider long-term anticoagulation with periodic reassessment."],
  ["Cancer-associated PVT", "As long as cancer is active or being treated", "LMWH preferred; DOAC if LMWH not tolerated (site-specific caution)."],
  ["Liver transplant candidates", "Until transplantation", "Maintain portal vein patency; individualise intensity."],
];

const specialCases = [
  {
    title: "TIPS (Transjugular Intrahepatic Portosystemic Shunt)",
    tone: "purple",
    text: "TIPS is an option in cirrhosis with portal hypertension and PVT. A small retrospective study showed most improvement versus anticoagulation or no treatment. May restore portal vein patency and relieve portal hypertension simultaneously.",
  },
  {
    title: "Cavernous Transformation",
    tone: "orange",
    text: "Chronic PVT with cavernous transformation is unlikely to extend. Anticoagulation is generally not recommended unless there is an additional indication (e.g., concurrent DVT/PE, high-risk thrombophilia). Focus on managing complications of portal hypertension.",
  },
  {
    title: "Myeloproliferative Neoplasms",
    tone: "teal",
    text: "MPN-associated PVT often requires long-term anticoagulation. Cytoreductive therapy (e.g., hydroxyurea) is typically co-administered. JAK2 V617F-positive patients may have higher recurrence risk.",
  },
];

const references = [
  "Amitrano L, et al. Review article: portal vein thrombosis -- new insights into aetiology and management. Aliment Pharmacol Ther. 2010;31(3):366-374.",
  "Dentali F, et al. Natural history of portal vein thrombosis in adults: a systematic review. Thromb Res. 2009;124(Suppl 1):S18.",
  "Intagliata NM, et al. Guidance document: diagnosis and management of portal vein thrombosis in patients with cirrhosis. Am J Gastroenterol. 2019;114(12):1906-1916.",
  "Jasper H, et al. Rivaroxaban versus no anticoagulation for chronic non-cirrhotic portal vein thrombosis. Thromb Haemost. 2012;107(4):584-588.",
  "Plessier A, et al. Acute portal vein thrombosis unrelated to cirrhosis: a prospective multicenter follow-up study. Hepatology. 2010;51(1):210-218.",
  "Plessier A, et al. Portal vein thrombosis: diagnosis and management. J Hepatol. 2022;77(4):1portal-1portal.",
  "Riva N, et al. Anticoagulation for portal vein thrombosis in liver cirrhosis and non-cirrhotic patients: a systematic review and meta-analysis. Blood. 2016;128(22):3654.",
  "Zhan C, et al. TIPS versus anticoagulation for portal vein thrombosis in cirrhosis: a retrospective cohort study. Hepatology. 2021;73(6):2390-2401.",
];

const relatedGuides = [
  "Cancer and Thrombosis",
  "Deep Vein Thrombosis (DVT): Treatment",
  "DOACs: Comparison and Frequently-asked Questions",
  "Unfractionated Heparin, Low Molecular Weight Heparin, and Fondaparinux",
  "Venous Thromboembolism: Duration of Treatment",
  "Warfarin",
];

const tabs = [
  ["overview", "Overview"],
  ["anticoagulate", "When to Anticoagulate"],
  ["options", "Anticoagulant Options"],
  ["duration", "Duration & Special Cases"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function PvtGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Venous Thrombosis</span>
              <span className="asa-badge asa-badge-gray">v24</span>
            </div>
            <h2 className="asa-guide-title">Portal Vein Thrombosis (PVT)</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Incidence ~4 per 100,000</span>
            </div>
          </div>
          <div className="asa-guide-icon">
            <Activity size={24} />
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To guide the diagnosis and anticoagulant management of portal vein thrombosis in cirrhotic and non-cirrhotic patients.
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div className="asa-mechanism-icon">
          <Info size={18} />
        </div>
        <div>
          <h3>Key Clinical Pearl</h3>
          <p>Most patients with PVT are asymptomatic and discovered incidentally on abdominal imaging. Up to 30% of non-cirrhotic, non-malignant PVT have an underlying myeloproliferative neoplasm -- JAK2 V617F testing has high utility in this population.</p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="PVT guide sections">
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
          <div className="asa-tab-panel">
            {riskFactors.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="asa-section-card">
                  <h3><Dot tone={section.tone} />{section.title}</h3>
                  <div className="asa-ind-group">
                    <div className="asa-ind-group-label">
                      <span className={`asa-ind-icon ${section.tone}`}><Icon size={14} /></span>
                      Risk Factors
                    </div>
                    <ul className="asa-ind-list">
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Diagnosis</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Modality</th>
                    <th>Key Finding</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosticApproach.map((row) => (
                    <tr key={row.modality}>
                      <td className="dose-highlight">{row.modality}</td>
                      <td>{row.finding}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="purple" />Recommended Work-up</h3>
              <ul className="asa-ind-list">
                {workupItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>MPN screening:</strong> Up to 30% of non-cirrhotic, non-malignant PVT have an underlying MPN. JAK2 V617F testing should be performed in all patients without an obvious provoking factor.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "anticoagulate" ? (
          <div className="asa-tab-panel">
            {anticoagulateIndications.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="asa-section-card">
                  <h3><Dot tone={section.tone} />{section.title}</h3>
                  <div className="asa-ind-group">
                    <div className="asa-ind-group-label">
                      <span className={`asa-ind-icon ${section.tone}`}><Icon size={14} /></span>
                      {section.title}
                    </div>
                    <ul className="asa-ind-list">
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}

            <article className="asa-section-card">
              <h3><Dot tone="danger" />Bleeding Risk Considerations</h3>
              <div className="asa-ae-grid">
                {bleedingNotes.map((note) => (
                  <div key={note} className="asa-ae-card default">
                    <div className="asa-ae-card-text">{note}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Active bleeding</strong> is an absolute contraindication to anticoagulation. However, previous variceal bleeding or the presence of varices alone is NOT a contraindication.
              </div>
            </div>

            <div className="asa-alert asa-alert-teal">
              <CheckCircle2 size={16} />
              <div>
                <strong>Variceal management:</strong> Attempt variceal banding before initiating anticoagulation if feasible. Screen all cirrhotic patients for varices prior to starting therapy.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "options" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Acute Anticoagulant Options</h3>
              <div className="asa-ae-grid">
                {acuteOptions.map((opt) => (
                  <div key={opt.agent} className={`asa-ae-card ${opt.tone}`}>
                    <div className="asa-ae-card-label">{opt.agent}</div>
                    <div className="asa-ae-card-text">{opt.detail}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />{doacNote.title}</h3>
              <ul className="asa-ind-list">
                {doacNote.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>DOACs in cirrhosis:</strong> Use with caution. Safety data are limited, especially in Child-Pugh B and C. LMWH or warfarin may be more appropriate in advanced liver disease.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Sub-therapeutic dosing:</strong> Sub-therapeutic LMWH may be considered as a compromise in patients with high bleeding risk or localised, non-extensive PVT.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "duration" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Duration of Anticoagulation</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Clinical Scenario</th>
                    <th>Recommended Duration</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {durationRows.map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="dose-highlight">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            {specialCases.map((sc) => (
              <article key={sc.title} className="asa-section-card">
                <h3><Dot tone={sc.tone} />{sc.title}</h3>
                <p className="asa-section-copy">{sc.text}</p>
              </article>
            ))}

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>Periodic reassessment:</strong> Patients on long-term anticoagulation should be reassessed periodically for ongoing indication, bleeding risk, and imaging to evaluate thrombus status.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="asa-related-list">
                {relatedGuides.map((item) => (
                  <li key={item}><Link2 size={14} /><span>{item}</span></li>
                ))}
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
        <p><strong>Portal Vein Thrombosis (PVT)</strong> | Updated 6 February 2026 | Version 24</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
