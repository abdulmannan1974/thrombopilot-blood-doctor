import { useState } from "react";
import { GuideLink } from "./guide-link";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Link2,
  ShieldAlert,
  XCircle,
} from "lucide-react";

const indications = [
  "Acute proximal DVT or PE with a contraindication to anticoagulation (typically within 2 to 4 weeks of diagnosis).",
  "Consider in hemodynamically unstable patients with acute DVT in addition to advanced therapies (e.g., catheter-directed or systemic thrombolysis).",
];

const doNotPlace = [
  "Patients who are therapeutically anticoagulated.",
  "Recurrent VTE despite therapeutic anticoagulation.",
  "Primary prophylaxis in trauma or surgical patients.",
  "Chronic thromboembolic pulmonary hypertension (CTEPH).",
  "Patients on extended anticoagulation who develop a contraindication to anticoagulation.",
  "Isolated subsegmental PE or distal DVT with a contraindication to anticoagulation (provided proximal DVT has been ruled out).",
];

const filterTypes = [
  {
    title: "Permanent (Non-removable)",
    description: "Intended for lifelong placement. Rarely preferred in modern practice.",
  },
  {
    title: "Retrievable (Preferred)",
    description:
      "Designed for temporary placement with planned removal once anticoagulation can be safely initiated. Preferred over permanent filters in most clinical scenarios.",
  },
];

const complicationCategories = [
  {
    title: "Immediate Complications",
    tone: "danger",
    items: [
      "Access-site hematoma.",
      "Filter misplacement.",
      "Filter embolization during deployment.",
    ],
  },
  {
    title: "Short-term Complications",
    tone: "moderate",
    items: [
      "Access-site thrombosis.",
      "Insertion-site infection.",
      "Arteriovenous fistula.",
    ],
  },
  {
    title: "Long-term Complications",
    tone: "serious",
    items: [
      "Filter tilt or migration.",
      "Filter fracture.",
      "Strut penetration through the IVC wall.",
      "IVC thrombosis or stenosis.",
      "Retrieval failure due to endothelialisation or tissue ingrowth.",
    ],
  },
  {
    title: "Retrieval Complications",
    tone: "moderate",
    items: [
      "Caval wall injury during removal.",
      "Filter fracture or fragment embolization.",
      "Inability to retrieve the filter.",
    ],
  },
];

const postInsertionSteps = [
  [
    "Initiate anticoagulation",
    "Start anticoagulation as soon as it is safe to do so after filter insertion.",
    "green",
  ],
  [
    "Plan retrieval early",
    "Document a retrieval plan at the time of filter insertion. Best retrieval outcomes occur within 9 to 12 weeks. Newer-generation filters may be safely retrieved after 6 or more months.",
    "blue",
  ],
  [
    "Remove when safe",
    "Remove the filter shortly after the patient is able to tolerate therapeutic anticoagulation.",
    "green",
  ],
  [
    "Duration of anticoagulation",
    "The presence of a VCF does not alter the recommended duration of anticoagulation for the underlying VTE. Some clinicians continue anticoagulation long-term if the filter cannot be removed; others stop at the appropriate duration for the VTE indication. This remains controversial.",
    "gray",
  ],
];

const relatedGuideKeys = [
  { to: "dvtTreatment", label: "DVT Treatment" },
  { to: "peTreatment", label: "PE Treatment" },
  { to: "peHighRisk", label: "PE: High- and Intermediate-Risk" },
  { to: "vteDuration", label: "VTE Duration of Treatment" },
  { to: "doacsComparison", label: "DOACs: Comparison & FAQ" },
];

const references = [
  "Bikdeli B, et al. Inferior vena cava filters to prevent pulmonary embolism: systematic review and meta-analysis. J Am Coll Cardiol. 2017;70(13):1587-1597.",
  "Duffett L, et al. Vena cava filters for the prevention of pulmonary embolism. Hematology Am Soc Hematol Educ Program. 2016;2016(1):619-624.",
  "Geerts W, Selby R. Prevention of venous thromboembolism in the ICU. Chest. 2003;124(6 Suppl):357S-363S. Updated review 2017.",
  "Health Canada. Safety review: inferior vena cava filters. 2016.",
  "Kaufman JA, et al. Society of Interventional Radiology clinical practice guideline for inferior vena cava filters in the treatment of patients with venous thromboembolic disease. J Vasc Interv Radiol. 2020;31(10):1529-1544.",
  "Mismetti P, et al. Effect of a retrievable inferior vena cava filter plus anticoagulation vs anticoagulation alone on risk of recurrent pulmonary embolism: a randomized clinical trial (PREPIC2). JAMA. 2015;313(16):1627-1635.",
  "Stevens S, et al. Antithrombotic therapy for VTE disease: second update of the CHEST guideline and expert panel report. Chest. 2021;160(6):e545-e608.",
];

const tabs = [
  ["overview", "Overview"],
  ["indications", "Indications & Contraindications"],
  ["complications", "Complications"],
  ["postinsertion", "Post-Insertion Management"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function VenaCavaFilterGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">VTE Management</span>
              <span className="asa-badge asa-badge-gray">v43</span>
            </div>
            <h2 className="asa-guide-title">Vena Cava Filter</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> VTE Management Clinical Guide</span>
            </div>
          </div>
          <div className="asa-guide-icon">
            <ShieldAlert size={24} />
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide guidance on the use of inferior vena cava filters in the management of venous thromboembolism.
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div className="asa-mechanism-icon">
          <Info size={18} />
        </div>
        <div>
          <h3>Key Principle</h3>
          <p>
            A vena cava filter (VCF) traps thromboemboli arising from lower extremity deep vein thrombosis before they reach the pulmonary vasculature. However, there is a <strong>lack of high-quality evidence</strong> that VCFs prevent clinically important pulmonary embolism, and <strong>no evidence</strong> that they prevent fatal PE. VCFs are associated with an <strong>increased risk of DVT</strong>.
          </p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Vena cava filter guide sections">
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
              <h3><Dot tone="blue" />Filter Types</h3>
              <div className="asa-ae-grid">
                {filterTypes.map((ft) => (
                  <div key={ft.title} className="asa-ae-card default">
                    <div className="asa-ae-card-label">{ft.title}</div>
                    <div className="asa-ae-card-text">{ft.description}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>Important:</strong> Retrievable filters are preferred over permanent filters. A retrieval plan should be documented at the time of insertion.
              </div>
            </div>

            <article className="asa-section-card">
              <h3><Dot tone="gray" />Health Canada Guidance (2016)</h3>
              <ul className="asa-ind-list">
                <li>IVC filters are indicated for acute proximal DVT or PE when anticoagulation is contraindicated.</li>
                <li>Retrievable filters should be used for short-term placement and removed as soon as anticoagulation can be safely initiated.</li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Evidence gap:</strong> No randomised trial has demonstrated that VCFs reduce clinically important or fatal PE. They are associated with increased DVT risk and carry procedural and long-term complications.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "indications" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="green" />Indications for VCF Placement</h3>
              <ul className="asa-ind-list">
                {indications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="danger" />Do NOT Place a VCF In</h3>
              <div className="asa-alert asa-alert-danger" style={{ marginBottom: "0.75rem" }}>
                <XCircle size={16} />
                <div>The following are situations where VCF placement is <strong>not recommended</strong>.</div>
              </div>
              <ul className="asa-ind-list">
                {doNotPlace.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                The indication for VCF is narrow: it is reserved for patients with acute proximal DVT or PE who cannot receive anticoagulation in the short term (2 to 4 weeks).
              </div>
            </div>
          </div>
        ) : null}

        {tab === "complications" ? (
          <div className="asa-tab-panel">
            {complicationCategories.map((cat) => (
              <article key={cat.title} className="asa-section-card">
                <h3><Dot tone={cat.tone} />{cat.title}</h3>
                <ul className="asa-ind-list">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>Long-term risk:</strong> IVC thrombosis and filter-related complications increase with dwell time. Early retrieval reduces these risks significantly.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "postinsertion" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="teal" />Post-Insertion Management</h3>
              <div className="asa-timeline">
                {postInsertionSteps.map((step) => (
                  <div key={step[0]} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="asa-timeline-label">{step[0]}</div>
                    <div className="asa-timeline-desc">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />Retrieval Timing</h3>
              <div className="asa-ae-grid">
                <div className="asa-ae-card default">
                  <div className="asa-ae-card-label">Optimal window</div>
                  <div className="asa-ae-card-text">Within 9 to 12 weeks of insertion for best retrieval success.</div>
                </div>
                <div className="asa-ae-card default">
                  <div className="asa-ae-card-label">Newer-generation filters</div>
                  <div className="asa-ae-card-text">May be safely retrieved after 6 or more months, depending on the device.</div>
                </div>
              </div>
            </article>

            <div className="asa-alert asa-alert-teal">
              <CheckCircle2 size={16} />
              <div>
                <strong>Best practice:</strong> Document the retrieval plan at the time of filter insertion and ensure follow-up is arranged to facilitate timely removal.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Duration of anticoagulation:</strong> The presence of a VCF does not alter the recommended duration of anticoagulation for the underlying VTE. Whether to continue anticoagulation long-term if the filter cannot be removed remains controversial.
              </div>
            </div>
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
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="asa-guide-footer">
        <p><strong>Vena Cava Filter</strong> | Updated 6 February 2026 | Version 43</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
