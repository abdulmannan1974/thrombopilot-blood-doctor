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
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">VTE Management</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">v43</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Vena Cava Filter</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> VTE Management Clinical Guide</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 flex-shrink-0">
            <ShieldAlert size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide guidance on the use of inferior vena cava filters in the management of venous thromboembolism.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 mb-2">
          <Info size={18} />
        </div>
        <div>
          <h3>Key Principle</h3>
          <p>
            A vena cava filter (VCF) traps thromboemboli arising from lower extremity deep vein thrombosis before they reach the pulmonary vasculature. However, there is a <strong>lack of high-quality evidence</strong> that VCFs prevent clinically important pulmonary embolism, and <strong>no evidence</strong> that they prevent fatal PE. VCFs are associated with an <strong>increased risk of DVT</strong>.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Vena cava filter guide sections">
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
              <h3><Dot tone="blue" />Filter Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filterTypes.map((ft) => (
                  <div key={ft.title} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{ft.title}</div>
                    <div className="text-sm leading-relaxed">{ft.description}</div>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Important:</strong> Retrievable filters are preferred over permanent filters. A retrieval plan should be documented at the time of insertion.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />Health Canada Guidance (2016)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>IVC filters are indicated for acute proximal DVT or PE when anticoagulation is contraindicated.</li>
                <li>Retrievable filters should be used for short-term placement and removed as soon as anticoagulation can be safely initiated.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <ShieldAlert size={16} />
              <div>
                <strong>Evidence gap:</strong> No randomised trial has demonstrated that VCFs reduce clinically important or fatal PE. They are associated with increased DVT risk and carry procedural and long-term complications.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "indications" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Indications for VCF Placement</h3>
              <ul className="list-none p-0 space-y-1">
                {indications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="danger" />Do NOT Place a VCF In</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900" style={{ marginBottom: "0.75rem" }}>
                <XCircle size={16} />
                <div>The following are situations where VCF placement is <strong>not recommended</strong>.</div>
              </div>
              <ul className="list-none p-0 space-y-1">
                {doNotPlace.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                The indication for VCF is narrow: it is reserved for patients with acute proximal DVT or PE who cannot receive anticoagulation in the short term (2 to 4 weeks).
              </div>
            </div>
          </div>
        ) : null}

        {tab === "complications" ? (
          <div className="grid gap-3.5">
            {complicationCategories.map((cat) => (
              <article key={cat.title} className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone={cat.tone} />{cat.title}</h3>
                <ul className="list-none p-0 space-y-1">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle size={16} />
              <div>
                <strong>Long-term risk:</strong> IVC thrombosis and filter-related complications increase with dwell time. Early retrieval reduces these risks significantly.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "postinsertion" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />Post-Insertion Management</h3>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                {postInsertionSteps.map((step) => (
                  <div key={step[0]} className="relative">
                    <div className={`asa-timeline-dot ${step[2]}`} />
                    <div className="text-sm font-semibold">{step[0]}</div>
                    <div className="text-sm text-muted-foreground">{step[1]}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Retrieval Timing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Optimal window</div>
                  <div className="text-sm leading-relaxed">Within 9 to 12 weeks of insertion for best retrieval success.</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Newer-generation filters</div>
                  <div className="text-sm leading-relaxed">May be safely retrieved after 6 or more months, depending on the device.</div>
                </div>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <CheckCircle2 size={16} />
              <div>
                <strong>Best practice:</strong> Document the retrieval plan at the time of filter insertion and ensure follow-up is arranged to facilitate timely removal.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>
                <strong>Duration of anticoagulation:</strong> The presence of a VCF does not alter the recommended duration of anticoagulation for the underlying VTE. Whether to continue anticoagulation long-term if the filter cannot be removed remains controversial.
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
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Vena Cava Filter</strong> | Updated 6 February 2026 | Version 43</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
