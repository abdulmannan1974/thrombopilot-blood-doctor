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
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Vaccine-Induced Thrombocytopenia</span>
              <span className="asa-badge asa-badge-gray">v21</span>
            </div>
            <h2 className="asa-guide-title">Vaccine-Induced Prothrombotic Immune Thrombocytopenia (VIPIT/VITT)</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Associated with adenoviral vector COVID-19 vaccines</span>
            </div>
          </div>
          <div className="asa-guide-icon">
            <Syringe size={24} />
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To guide the recognition, diagnosis, and acute management of vaccine-induced prothrombotic immune thrombocytopenia (VIPIT/VITT), a rare thrombotic syndrome clinically resembling heparin-induced thrombocytopenia (HIT).
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div className="asa-mechanism-icon">
          <ShieldAlert size={18} />
        </div>
        <div>
          <h3>Pathophysiology</h3>
          <p>VIPIT/VITT is caused by platelet-activating antibodies against platelet factor 4 (PF4) that develop following vaccination with adenoviral vector vaccines, notably the AstraZeneca ChAdOx1 nCoV-19 vaccine. The mechanism closely resembles autoimmune HIT, leading to intense platelet activation, thrombocytopenia, and thrombosis in unusual sites including cerebral venous sinuses and splanchnic veins.</p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="VIPIT/VITT guide sections">
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
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Key Clinical Features</h3>
              <p className="asa-section-copy">
                VIPIT/VITT typically presents 4 to 28 days after vaccination with an adenoviral vector COVID-19 vaccine. The clinical picture resembles HIT but occurs without prior heparin exposure. Thrombosis at unusual sites (cerebral venous sinuses, splanchnic veins) is characteristic.
              </p>
              <div className="asa-alert asa-alert-danger">
                <AlertTriangle size={16} />
                <div>
                  <strong>Diagnostic window:</strong> Symptoms arising 4 to 28 days post-vaccination should trigger immediate investigation for VIPIT/VITT.
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Presenting Symptoms</h3>
              <p className="asa-section-copy">Patients may present with any of the following symptoms within the 4 to 28 day post-vaccination window:</p>
              <div className="asa-ae-grid">
                {symptoms.map((group) => (
                  <div key={group.label} className="asa-ae-card default">
                    <div className="asa-ae-card-label">{group.label}</div>
                    <ul className="asa-ind-list" style={{ marginTop: "0.25rem" }}>
                      {group.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Key Decision Point</h3>
              <div className="asa-alert asa-alert-danger">
                <AlertCircle size={16} />
                <div>
                  <strong>If platelet count {"<"} 150 {"\u00d7"} 10{"\u2079"}/L within the 4 to 28 day post-vaccination window:</strong> evaluate the patient in the Emergency Department for suspected VIPIT/VITT. Do not delay assessment.
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "diagnosis" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Initial Laboratory Workup</h3>
              <p className="asa-section-copy">Order the following investigations promptly in all patients with suspected VIPIT/VITT:</p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {workupSteps.map((row) => (
                    <tr key={row.test}>
                      <td className="dose-highlight">{row.test}</td>
                      <td>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="purple" />Diagnostic Imaging</h3>
              <p className="asa-section-copy">If clinical suspicion is strong, proceed with diagnostic imaging based on the presenting symptoms. Thrombosis at unusual sites is characteristic of VIPIT/VITT.</p>
              <table className="asa-dose-table">
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
                      <td className="dose-highlight">{row.modality}</td>
                      <td>{row.urgency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="asa-alert asa-alert-danger" style={{ marginTop: "1rem" }}>
                <AlertTriangle size={16} />
                <div>
                  <strong>CVST imaging:</strong> Same-day neuroimaging is mandatory when cerebral venous sinus thrombosis is suspected. Do not defer to outpatient follow-up.
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Presumptive Diagnosis</h3>
              <p className="asa-section-copy">A presumptive diagnosis of VIPIT/VITT is made when the following constellation of findings is present:</p>
              <ul className="asa-ind-list">
                <li>Low platelet count ({"<"} 150 {"\u00d7"} 10{"\u2079"}/L)</li>
                <li>Abnormal coagulation parameters (elevated D-dimer, low fibrinogen, abnormal PT/aPTT)</li>
                <li>Normal blood film (except for thrombocytopenia)</li>
                <li>With or without thrombosis demonstrated on imaging</li>
              </ul>
              <div className="asa-alert asa-alert-info" style={{ marginTop: "1rem" }}>
                <Info size={16} />
                <div>
                  <strong>Confirmatory testing:</strong> Send HIT testing (PF4 antibody assays) in all suspected cases. However, do not delay treatment while awaiting confirmatory results.
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "management" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Acute Management</h3>
              <p className="asa-section-copy">
                Treat VIPIT/VITT like HIT. The cornerstone of management is immediate non-heparin anticoagulation, haematology consultation, and supportive care.
              </p>
              <div className="asa-timeline">
                {managementSteps.map((step) => (
                  <div key={step[0]} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="asa-timeline-label">{step[0]}</div>
                    <div className="asa-timeline-desc">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Anticoagulation Options</h3>
              <p className="asa-section-copy">Non-heparin anticoagulants should be used per HIT treatment guidelines:</p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Route</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="dose-highlight">Argatroban</td>
                    <td>IV infusion</td>
                    <td>Preferred in critically ill patients or those with hepatic impairment considerations. Dose-adjusted by aPTT.</td>
                  </tr>
                  <tr>
                    <td className="dose-highlight">Fondaparinux</td>
                    <td>Subcutaneous</td>
                    <td>Suitable for stable patients. Fixed or weight-based dosing.</td>
                  </tr>
                  <tr>
                    <td className="dose-highlight">DOACs (e.g., rivaroxaban, apixaban)</td>
                    <td>Oral</td>
                    <td>May be used once platelet count is recovering and patient is clinically stable. Follow HIT transition guidance.</td>
                  </tr>
                </tbody>
              </table>
              <div className="asa-alert asa-alert-danger" style={{ marginTop: "1rem" }}>
                <ShieldAlert size={16} />
                <div>
                  <strong>AVOID all heparin products:</strong> Unfractionated heparin, low molecular weight heparin, and heparin flushes must all be strictly avoided in suspected or confirmed VIPIT/VITT.
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />IVIG</h3>
              <p className="asa-section-copy">
                Intravenous immunoglobulin (IVIG) at a dose of 1 g/kg daily for 2 days may be beneficial by inhibiting Fc-receptor-mediated platelet activation. Discuss with haematology.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="green" />Reporting</h3>
              <div className="asa-alert asa-alert-teal">
                <ClipboardList size={16} />
                <div>
                  <strong>Mandatory reporting:</strong> All suspected cases of VIPIT/VITT must be reported as adverse events following immunisation (AEFI) to the local Public Health Unit.
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />Related Clinical Guides</h3>
              <ul className="asa-related-list">
                {relatedGuideKeys.map((item) => (
                  <li key={item.to}><Link2 size={14} /><GuideLink to={item.to}>{item.label}</GuideLink></li>
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
        <p><strong>Vaccine-Induced Prothrombotic Immune Thrombocytopenia (VIPIT/VITT)</strong> | Updated 6 February 2026 | Version 21</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
