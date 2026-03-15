import { useState } from "react";
import { GuideLink } from "./guide-link";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  Info,
  Link2,
  Search,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";

const riskFactors = [
  {
    title: "Shared with DVT",
    items: [
      "Immobilisation or recent surgery",
      "Active malignancy",
      "Thrombophilia (inherited or acquired)",
      "Obesity",
      "Hormone therapy or oral contraceptives",
      "Pregnancy and postpartum period",
      "Prior VTE",
    ],
  },
  {
    title: "SVT-Specific Risk Factors",
    items: [
      "Varicose veins (present in ~80% of lower-extremity SVT)",
      "Intravenous catheters (most common cause of upper-extremity SVT)",
      "Sclerotherapy or endovenous ablation",
      "Autoimmune or inflammatory conditions",
    ],
  },
];

const treatmentAlgorithm = [
  {
    step: 1,
    scenario: "Concomitant DVT at diagnosis",
    treatment: "Therapeutic anticoagulation",
    duration: "Per DVT treatment guidelines",
    tone: "danger",
  },
  {
    step: 2,
    scenario: "SVT within 3 cm of saphenofemoral junction (SFJ) or saphenopopliteal junction (SPJ)",
    treatment: "Therapeutic anticoagulation",
    duration: "3 months",
    tone: "danger",
  },
  {
    step: 3,
    scenario: "SVT ≥5 cm in length, >3 cm from SFJ/SPJ",
    treatment: "Fondaparinux 2.5 mg SC daily, OR rivaroxaban 10 mg PO daily, OR prophylactic/intermediate-dose LMWH",
    duration: "45 days",
    tone: "orange",
  },
  {
    step: 4,
    scenario: "SVT <5 cm in length, >3 cm from SFJ/SPJ",
    treatment: "NSAIDs, warm/cold compresses, elevation. If severe symptoms or risk factors present: prophylactic anticoagulation",
    duration: "Symptomatic; up to 45 days if AC started",
    tone: "blue",
  },
  {
    step: 5,
    scenario: "IV cannulation-related SVT (upper extremity)",
    treatment: "Supportive care only: warm compresses, topical NSAIDs, catheter removal",
    duration: "Until symptom resolution",
    tone: "gray",
  },
];

const specialPopulations = [
  {
    title: "Pregnancy",
    tone: "orange",
    icon: Heart,
    points: [
      "LMWH at prophylactic or intermediate dose is the anticoagulant of choice.",
      "Indications for treatment: bilateral SVT, symptomatic SVT, SVT ≤3 cm from deep venous system, or SVT ≥5 cm in length.",
      "Untreated antepartum SVT carries a 10.4% risk of VTE in the same pregnancy.",
      "DOACs and warfarin are contraindicated in pregnancy.",
      "Fondaparinux may be considered if LMWH is not tolerated, but data in pregnancy are limited.",
    ],
  },
  {
    title: "Malignancy",
    tone: "danger",
    icon: ShieldAlert,
    points: [
      "Minimum 45 days of anticoagulation if bleeding risk is acceptably low.",
      "Consider extending treatment duration based on severity, persistence, and cancer activity.",
      "Migratory SVT (Trousseau syndrome) should heighten suspicion for occult malignancy.",
      "In patients aged >40 with no varicose veins and no obvious risk factors, age- and gender-appropriate cancer screening is recommended.",
    ],
  },
  {
    title: "Recurrent SVT",
    tone: "blue",
    icon: AlertCircle,
    points: [
      "High recurrence risk in patients with varicose veins.",
      "Repeat compression ultrasonography to rule out deep vein extension with each recurrence.",
      "Consider short-term anticoagulation per the treatment algorithm table.",
      "Evaluate for underlying thrombophilia or occult malignancy if recurrences are unprovoked.",
    ],
  },
];

const references = [
  "Beyer-Westendorf J, Schellong SM, Gerlach H, et al. Prevention of thromboembolic complications in patients with superficial-vein thrombosis given rivaroxaban or fondaparinux: the open-label, randomised, non-inferiority SURPRISE phase 3b trial. Lancet Haematol. 2017;4(3):e105-e113.",
  "Decousus H, Prandoni P, Mismetti P, et al. Fondaparinux for the treatment of superficial-vein thrombosis in the legs (CALISTO). N Engl J Med. 2010;363(13):1222-1232.",
  "Di Nisio M, Wichers IM, Röver C, et al. Treatment for superficial thrombophlebitis of the leg. Cochrane Database Syst Rev. 2018;2:CD004982.",
  "Duffett L, Carrier M. Superficial venous thrombosis. In: Defined: Thrombosis Explained. Thrombosis Canada; 2019.",
  "Wiegers HMG, Middeldorp S, Brekelmans MPA, et al. Treatment and long-term outcomes of superficial vein thrombosis: a systematic review and meta-analysis. Blood. 2023;142(10):891-901.",
];

const relatedGuideKeys = [
  { to: "dvtDiagnosis", label: "DVT Diagnosis" },
  { to: "dvtTreatment", label: "DVT Treatment" },
  { to: "vteDuration", label: "VTE Duration of Treatment" },
  { to: "cancer", label: "Cancer & Thrombosis" },
  { to: "pregDiagnosis", label: "Pregnancy: DVT & PE Diagnosis" },
  { to: "pregProphylaxis", label: "Pregnancy Thromboprophylaxis" },
  { to: "aps", label: "Antiphospholipid Syndrome" },
];

const tabs = [
  ["overview", "Overview"],
  ["diagnosis", "Diagnosis"],
  ["treatment", "Treatment Algorithm"],
  ["special", "Special Populations"],
  ["references", "References"],
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function SvtGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-teal">Venous Thrombosis</span>
              <span className="asa-badge asa-badge-gray">v35</span>
            </div>
            <h2 className="asa-guide-title">Superficial Vein Thrombosis (SVT)</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 5 February 2026</span>
              <span><FileText size={13} /> Superficial Thrombophlebitis / Superficial Vein Thrombosis</span>
            </div>
          </div>
          <div className="asa-guide-icon">
            <Stethoscope size={24} />
          </div>
        </div>

        <div className="asa-objective-strip">
          <strong>Objective:</strong> To provide an evidence-based approach to diagnosis and management of superficial vein thrombosis, including identification of patients at risk for deep vein extension or pulmonary embolism.
        </div>
      </div>

      <div className="asa-mechanism-card">
        <div className="asa-mechanism-icon">
          <Info size={18} />
        </div>
        <div>
          <h3>Key Epidemiology</h3>
          <p>SVT is approximately 6 times more common than DVT/PE, with a yearly incidence of 0.64%. The great saphenous vein (GSV) is involved in 60-80% of cases. Approximately 25% of SVT patients have concomitant VTE at diagnosis, and ~4% have concomitant pulmonary embolism.</p>
        </div>
      </div>

      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="SVT guide sections">
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
            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Critical reminder:</strong> The superficial femoral vein is a DEEP vein despite its name. Thrombosis of the superficial femoral vein must be managed as a deep vein thrombosis, not as SVT.
              </div>
            </div>

            {riskFactors.map((section) => (
              <article key={section.title} className="asa-section-card">
                <h3><Dot tone="blue" />{section.title}</h3>
                <ul className="asa-ind-list">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}

            <article className="asa-section-card">
              <h3><Dot tone="orange" />Concomitant VTE Risk</h3>
              <p className="asa-section-copy">
                At initial diagnosis, approximately 25% of patients with SVT have concomitant deep vein thrombosis, and approximately 4% have concomitant pulmonary embolism. This underscores the importance of performing compression ultrasonography at presentation to rule out DVT and assess the proximity of the thrombus to the saphenofemoral or saphenopopliteal junctions.
              </p>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Cancer Screening Consideration</h3>
              <p className="asa-section-copy">
                In patients aged over 40 with SVT, no varicose veins, and no other obvious risk factors, age- and gender-appropriate cancer screening should be considered. Migratory SVT (Trousseau syndrome) should further increase suspicion for occult malignancy.
              </p>
            </article>
          </div>
        ) : null}

        {tab === "diagnosis" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Clinical Presentation</h3>
              <ul className="asa-ind-list">
                <li>Erythema along the course of a superficial vein</li>
                <li>Warmth overlying the affected area</li>
                <li>Tender, palpable cord</li>
                <li>Local swelling and induration</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Compression Ultrasonography (CUS)</h3>
              <div className="asa-alert asa-alert-info">
                <Search size={16} />
                <div>All patients with clinically suspected SVT should undergo compression ultrasonography of the affected and contralateral limbs.</div>
              </div>
              <p className="asa-section-copy">The goals of ultrasonography are to:</p>
              <ul className="asa-ind-list">
                <li>Confirm the diagnosis of SVT and determine the extent and length of thrombus</li>
                <li>Rule out concomitant deep vein thrombosis</li>
                <li>Assess the proximity of the thrombus to the saphenofemoral junction (SFJ) or saphenopopliteal junction (SPJ)</li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-warn">
              <AlertTriangle size={16} />
              <div>
                <strong>Ultrasound monitoring:</strong> Follow-up ultrasonography is used to rule out deep extension of the thrombus. It is NOT intended to confirm thrombus resolution. Repeat imaging should be guided by clinical progression, new symptoms, or treatment decisions.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "treatment" ? (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Treatment Algorithm by Location and Extent</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Clinical Scenario</th>
                    <th>Treatment</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentAlgorithm.map((row) => (
                    <tr key={row.step}>
                      <td>
                        <span className={`asa-badge asa-badge-${row.tone === "danger" ? "blue" : row.tone === "orange" ? "teal" : "gray"}`}>
                          {row.step}
                        </span>
                      </td>
                      <td>{row.scenario}</td>
                      <td className="dose-highlight">{row.treatment}</td>
                      <td>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>Concomitant DVT:</strong> If DVT is identified at any point, escalate immediately to full therapeutic anticoagulation and manage per DVT treatment guidelines.
              </div>
            </div>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Key Treatment Notes</h3>
              <ul className="asa-ind-list">
                <li>Fondaparinux 2.5 mg SC daily is the best-studied agent for SVT ≥5 cm (CALISTO trial).</li>
                <li>Rivaroxaban 10 mg PO daily is an alternative with comparable efficacy (SURPRISE trial).</li>
                <li>Prophylactic or intermediate-dose LMWH is a reasonable option when fondaparinux or rivaroxaban are unavailable or contraindicated.</li>
                <li>Graduated compression stockings may provide symptomatic relief but are not a substitute for anticoagulation when indicated.</li>
                <li>Surgical ligation of the SFJ is not routinely recommended.</li>
              </ul>
            </article>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>Supportive measures for all patients:</strong> Encourage ambulation, apply warm or cold compresses for symptom relief, and consider oral NSAIDs for pain and inflammation in patients not receiving anticoagulation.
              </div>
            </div>
          </div>
        ) : null}

        {tab === "special" ? (
          <div className="asa-tab-panel">
            {specialPopulations.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="asa-section-card">
                  <h3>
                    <span className={`asa-ind-icon ${section.tone}`}><Icon size={14} /></span>
                    {section.title}
                  </h3>
                  <ul className="asa-ind-list">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </article>
              );
            })}

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>Pregnancy warning:</strong> DOACs and warfarin are contraindicated in pregnancy. Use LMWH as the anticoagulant of choice. Untreated antepartum SVT carries a 10.4% risk of VTE in the same pregnancy.
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
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="asa-guide-footer">
        <p><strong>Superficial Vein Thrombosis (SVT)</strong> | Updated 5 February 2026 | Version 35</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
