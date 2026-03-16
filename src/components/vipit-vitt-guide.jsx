import { useState } from "react";
import { GuideLink } from "./guide-link";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Info,
  Link2,
  ShieldAlert,
  Syringe,
} from "lucide-react";

const symptoms = [
  { label: "Neurological", items: ["Persistent severe headache", "Focal neurological symptoms", "Visual changes"] },
  { label: "Cardiopulmonary", items: ["Shortness of breath", "Chest pain"] },
  { label: "Abdominal", items: ["Abdominal pain"] },
  { label: "Limb", items: ["Limb swelling or redness", "Pallor or coldness in a limb"] },
  { label: "Haematological", items: ["Unusual bleeding", "Bruising", "Petechiae"] },
];

const workupSteps = [
  { test: "CBC with platelet count", detail: "Platelet count < 150 \u00d7 10\u2079/L is a key trigger within the 4\u201328 day window." },
  { test: "D-dimer", detail: "Typically markedly elevated." },
  { test: "Blood film", detail: "Should be normal aside from thrombocytopenia." },
  { test: "Fibrinogen", detail: "May be low; supports consumptive coagulopathy." },
  { test: "Coagulation screen (PT, aPTT)", detail: "May be abnormal; assess for DIC overlap." },
];

const imagingGuidance = [
  { site: "Cerebral venous sinus thrombosis (CVST)", modality: "CT head + CT venogram OR MRI head + MR venogram", urgency: "SAME-DAY neuroimaging required." },
  { site: "Pulmonary embolism", modality: "CT pulmonary angiography", urgency: "Urgent if dyspnoea or chest pain." },
  { site: "Abdominal venous thrombosis", modality: "CT abdomen with contrast (portal / mesenteric / splenic veins)", urgency: "Consider if abdominal pain." },
  { site: "Limb DVT", modality: "Compression ultrasonography", urgency: "Same-day if limb symptoms." },
  { site: "Arterial thrombosis", modality: "CT angiography of affected territory", urgency: "Consider if pallor, coldness, or acute ischaemia signs." },
];

const managementSteps = [
  ["Urgent hematology referral", "Consult haematology immediately upon clinical suspicion. Do not wait for confirmatory test results.", "red"],
  ["Non-heparin anticoagulation", "Use argatroban, fondaparinux, or DOACs per HIT treatment guidelines. AVOID all forms of heparin.", "orange"],
  ["IVIG consideration", "Intravenous immunoglobulin (IVIG) 1 g/kg daily for 2 days may be beneficial and should be discussed with haematology.", "blue"],
  ["HIT confirmatory testing", "Send PF4 antibody assays (ELISA and/or functional assay such as SRA). Treatment should not be delayed pending results.", "gray"],
  ["AEFI reporting", "Report all suspected adverse events following immunisation (AEFI) to the local Public Health Unit.", "green"],
];

const relatedGuideKeys = [
  { to: "hit", label: "Heparin-Induced Thrombocytopenia (HIT)" },
  { to: "doacsComparison", label: "DOACs: Comparison & FAQ" },
  { to: "cvt", label: "Cerebral Venous Thrombosis" },
  { to: "dvtDiagnosis", label: "DVT Diagnosis" },
  { to: "peDiagnosis", label: "PE Diagnosis" },
];

const references = [
  "Greinacher A, Thiele T, Warkentin TE, et al. Thrombotic thrombocytopenia after ChAdOx1 nCoV-19 vaccination. N Engl J Med. 2021;384:2092-2101.",
  "Nazy I, Sachs UJ, Arnold DM, et al. Recommendations for the clinical and laboratory diagnosis of VITT against COVID-19: Communication from the ISTH SSC Subcommittee on Platelet Immunology. J Thromb Haemost. 2021;19:1585-1588.",
  "Pai M, Grill A, Engel N, et al. Vaccine-induced immune thrombotic thrombocytopenia (VITT) following adenovirus vector COVID-19 vaccination. Ontario COVID-19 Science Advisory Table. 2021.",
];

const tabs = [
  ["overview", "Overview"],
  ["diagnosis", "Diagnosis"],
  ["management", "Management"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function VipitVittGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Vaccine-Induced Thrombocytopenia</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">v21</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Vaccine-Induced Prothrombotic Immune Thrombocytopenia (VIPIT/VITT)</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Associated with adenoviral vector COVID-19 vaccines</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <Syringe size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To guide the recognition, diagnosis, and acute management of vaccine-induced prothrombotic immune thrombocytopenia (VIPIT/VITT), a rare thrombotic syndrome clinically resembling heparin-induced thrombocytopenia (HIT).
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
          <ShieldAlert size={18} />
        </div>
        <div>
          <h3>Pathophysiology</h3>
          <p>VIPIT/VITT is caused by platelet-activating antibodies against platelet factor 4 (PF4) that develop following vaccination with adenoviral vector vaccines, notably the AstraZeneca ChAdOx1 nCoV-19 vaccine. The mechanism closely resembles autoimmune HIT, leading to intense platelet activation, thrombocytopenia, and thrombosis in unusual sites including cerebral venous sinuses and splanchnic veins.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="VIPIT/VITT guide sections">
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
              <h3><Dot tone="danger" />Key Clinical Features</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                VIPIT/VITT typically presents 4 to 28 days after vaccination with an adenoviral vector COVID-19 vaccine. The clinical picture resembles HIT but occurs without prior heparin exposure. Thrombosis at unusual sites (cerebral venous sinuses, splanchnic veins) is characteristic.
              </p>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <AlertTriangle size={16} />
                <div>
                  <strong>Diagnostic window:</strong> Symptoms arising 4 to 28 days post-vaccination should trigger immediate investigation for VIPIT/VITT.
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Presenting Symptoms</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Patients may present with any of the following symptoms within the 4 to 28 day post-vaccination window:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {symptoms.map((group) => (
                  <div key={group.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{group.label}</div>
                    <ul className="list-none p-0 space-y-1" style={{ marginTop: "0.25rem" }}>
                      {group.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Key Decision Point</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <AlertCircle size={16} />
                <div>
                  <strong>If platelet count {"<"} 150 {"\u00d7"} 10{"\u2079"}/L within the 4 to 28 day post-vaccination window:</strong> evaluate the patient in the Emergency Department for suspected VIPIT/VITT. Do not delay assessment.
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "diagnosis" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Initial Laboratory Workup</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Order the following investigations promptly in all patients with suspected VIPIT/VITT:</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {workupSteps.map((row) => (
                    <tr key={row.test}>
                      <td className="font-bold text-foreground">{row.test}</td>
                      <td>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Diagnostic Imaging</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">If clinical suspicion is strong, proceed with diagnostic imaging based on the presenting symptoms. Thrombosis at unusual sites is characteristic of VIPIT/VITT.</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Thrombosis Site</th>
                    <th>Imaging Modality</th>
                    <th>Urgency</th>
                  </tr>
                </thead>
                <tbody>
                  {imagingGuidance.map((row) => (
                    <tr key={row.site}>
                      <td>{row.site}</td>
                      <td className="font-bold text-foreground">{row.modality}</td>
                      <td>{row.urgency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900" style={{ marginTop: "1rem" }}>
                <AlertTriangle size={16} />
                <div>
                  <strong>CVST imaging:</strong> Same-day neuroimaging is mandatory when cerebral venous sinus thrombosis is suspected. Do not defer to outpatient follow-up.
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Presumptive Diagnosis</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">A presumptive diagnosis of VIPIT/VITT is made when the following constellation of findings is present:</p>
              <ul className="list-none p-0 space-y-1">
                <li>Low platelet count ({"<"} 150 {"\u00d7"} 10{"\u2079"}/L)</li>
                <li>Abnormal coagulation parameters (elevated D-dimer, low fibrinogen, abnormal PT/aPTT)</li>
                <li>Normal blood film (except for thrombocytopenia)</li>
                <li>With or without thrombosis demonstrated on imaging</li>
              </ul>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900" style={{ marginTop: "1rem" }}>
                <Info size={16} />
                <div>
                  <strong>Confirmatory testing:</strong> Send HIT testing (PF4 antibody assays) in all suspected cases. However, do not delay treatment while awaiting confirmatory results.
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "management" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Acute Management</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Treat VIPIT/VITT like HIT. The cornerstone of management is immediate non-heparin anticoagulation, haematology consultation, and supportive care.
              </p>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                {managementSteps.map((step) => (
                  <div key={step[0]} className="relative">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="text-sm font-semibold">{step[0]}</div>
                    <div className="text-sm text-muted-foreground">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Anticoagulation Options</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Non-heparin anticoagulants should be used per HIT treatment guidelines:</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Route</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold text-foreground">Argatroban</td>
                    <td>IV infusion</td>
                    <td>Preferred in critically ill patients or those with hepatic impairment considerations. Dose-adjusted by aPTT.</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-foreground">Fondaparinux</td>
                    <td>Subcutaneous</td>
                    <td>Suitable for stable patients. Fixed or weight-based dosing.</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-foreground">DOACs (e.g., rivaroxaban, apixaban)</td>
                    <td>Oral</td>
                    <td>May be used once platelet count is recovering and patient is clinically stable. Follow HIT transition guidance.</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900" style={{ marginTop: "1rem" }}>
                <ShieldAlert size={16} />
                <div>
                  <strong>AVOID all heparin products:</strong> Unfractionated heparin, low molecular weight heparin, and heparin flushes must all be strictly avoided in suspected or confirmed VIPIT/VITT.
                </div>
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />IVIG</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Intravenous immunoglobulin (IVIG) at a dose of 1 g/kg daily for 2 days may be beneficial by inhibiting Fc-receptor-mediated platelet activation. Discuss with haematology.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Reporting</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
                <ClipboardList size={16} />
                <div>
                  <strong>Mandatory reporting:</strong> All suspected cases of VIPIT/VITT must be reported as adverse events following immunisation (AEFI) to the local Public Health Unit.
                </div>
              </div>
            </article>
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
        <p><strong>Vaccine-Induced Prothrombotic Immune Thrombocytopenia (VIPIT/VITT)</strong> | Updated 6 February 2026 | Version 21</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
