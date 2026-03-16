import { useState } from "react";
import { GuideLink } from "./guide-link";
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

const relatedGuideKeys = [
  { to: "cancer", label: "Cancer & Thrombosis" },
  { to: "dvtTreatment", label: "DVT Treatment" },
  { to: "doacsComparison", label: "DOACs: Comparison & FAQ" },
  { to: "ufhLmwh", label: "UFH, LMWH & Fondaparinux" },
  { to: "vteDuration", label: "VTE Duration of Treatment" },
  { to: "warfarin", label: "Warfarin" },
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
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Venous Thrombosis</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">v24</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Portal Vein Thrombosis (PVT)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Incidence ~4 per 100,000</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <Activity size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To guide the diagnosis and anticoagulant management of portal vein thrombosis in cirrhotic and non-cirrhotic patients.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
          <Info size={18} />
        </div>
        <div>
          <h3>Key Clinical Pearl</h3>
          <p>Most patients with PVT are asymptomatic and discovered incidentally on abdominal imaging. Up to 30% of non-cirrhotic, non-malignant PVT have an underlying myeloproliferative neoplasm -- JAK2 V617F testing has high utility in this population.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="PVT guide sections">
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
            {riskFactors.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="rounded-xl border bg-card shadow-sm p-5">
                  <h3><Dot tone={section.tone} />{section.title}</h3>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                      <span className={`asa-ind-icon ${section.tone}`}><Icon size={14} /></span>
                      Risk Factors
                    </div>
                    <ul className="list-none p-0 space-y-1">
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Diagnosis</h3>
              <table className="w-full border-collapse text-sm">
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
                      <td className="font-bold text-foreground">{row.modality}</td>
                      <td>{row.finding}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Recommended Work-up</h3>
              <ul className="list-none p-0 space-y-1">
                {workupItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                <strong>MPN screening:</strong> Up to 30% of non-cirrhotic, non-malignant PVT have an underlying MPN. JAK2 V617F testing should be performed in all patients without an obvious provoking factor.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "anticoagulate" ? (
          <div className="grid gap-3.5">
            {anticoagulateIndications.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="rounded-xl border bg-card shadow-sm p-5">
                  <h3><Dot tone={section.tone} />{section.title}</h3>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                      <span className={`asa-ind-icon ${section.tone}`}><Icon size={14} /></span>
                      {section.title}
                    </div>
                    <ul className="list-none p-0 space-y-1">
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Bleeding Risk Considerations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bleedingNotes.map((note) => (
                  <div key={note} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-sm leading-relaxed">{note}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Active bleeding</strong> is an absolute contraindication to anticoagulation. However, previous variceal bleeding or the presence of varices alone is NOT a contraindication.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <CheckCircle2 size={16} />
              <div>
                <strong>Variceal management:</strong> Attempt variceal banding before initiating anticoagulation if feasible. Screen all cirrhotic patients for varices prior to starting therapy.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "options" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Acute Anticoagulant Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acuteOptions.map((opt) => (
                  <div key={opt.agent} className={`asa-ae-card ${opt.tone}`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{opt.agent}</div>
                    <div className="text-sm leading-relaxed">{opt.detail}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />{doacNote.title}</h3>
              <ul className="list-none p-0 space-y-1">
                {doacNote.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>DOACs in cirrhosis:</strong> Use with caution. Safety data are limited, especially in Child-Pugh B and C. LMWH or warfarin may be more appropriate in advanced liver disease.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                <strong>Sub-therapeutic dosing:</strong> Sub-therapeutic LMWH may be considered as a compromise in patients with high bleeding risk or localised, non-extensive PVT.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "duration" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Duration of Anticoagulation</h3>
              <table className="w-full border-collapse text-sm">
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
                      <td className="font-bold text-foreground">{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            {specialCases.map((sc) => (
              <article key={sc.title} className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone={sc.tone} />{sc.title}</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">{sc.text}</p>
              </article>
            ))}

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Periodic reassessment:</strong> Patients on long-term anticoagulation should be reassessed periodically for ongoing indication, bleeding risk, and imaging to evaluate thrombus status.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="list-none p-0 divide-y divide-border">
                {relatedGuideKeys.map((item) => (
                  <li key={item.to}><Link2 size={14} /><GuideLink to={item.to}>{item.label}</GuideLink></li>
                ))}
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
        <p><strong>Portal Vein Thrombosis (PVT)</strong> | Updated 6 February 2026 | Version 24</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
