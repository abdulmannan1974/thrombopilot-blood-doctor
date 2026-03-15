import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Baby,
  Calendar,
  CheckCircle2,
  FileText,
  HeartPulse,
  Info,
  Microscope,
  Orbit,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Timer,
  TrendingDown,
  XCircle,
  Zap,
} from "lucide-react";

// ─── Tab definitions ──────────────────────────────────────────────────────────
const tabs = [
  ["overview",      "Overview"],
  ["bioprosthetic", "Bioprosthetic"],
  ["transcatheter", "Transcatheter"],
  ["mechanical",    "Mechanical Valves"],
  ["inr-targets",   "INR Targets"],
  ["subclinical",   "Subclinical Thrombosis"],
  ["special",       "Special Situations"],
  ["references",    "References"],
];

// ─── Bioprosthetic data ───────────────────────────────────────────────────────
const bioprostheticRows = [
  [
    "Surgical bioprosthetic aortic valve",
    "Warfarin 3–6 months (INR target 2.5) or ASA 81 mg daily",
    "Long-term ASA 81 mg daily may be considered if no other anticoagulation indication",
    "teal",
  ],
  [
    "Surgical bioprosthetic mitral valve",
    "Warfarin 3–6 months (INR target 2.5) or ASA 81 mg daily",
    "Long-term ASA 81 mg daily may be considered if no other anticoagulation indication",
    "teal",
  ],
  [
    "Surgical bioprosthetic tricuspid or pulmonic valve",
    "Warfarin 3 months (INR target 2.5) or ASA 81 mg daily",
    "Evidence is lower quality; management should be individualised",
    "orange",
  ],
  [
    "Surgical aortic valve repair",
    "ASA for at least 3 months",
    "Follow local surgical protocol where available",
    "green",
  ],
  [
    "Surgical mitral valve repair",
    "ASA or warfarin for 3 months",
    "Follow local surgical protocol where available",
    "green",
  ],
  [
    "Surgical tricuspid valve repair",
    "Warfarin for 3 months",
    "Follow local surgical protocol where available",
    "green",
  ],
];

const bioprostheticAFNote = [
  "RIVER trial (n=1005): rivaroxaban non-inferior to warfarin in surgical bioprosthetic valve patients",
  "ENAVLE trial (n=220): edoxaban showed comparable outcomes to warfarin",
  "RE-ALIGN trial: dabigatran showed increased pericardial bleeding early post-cardiac surgery — AVOID in first 3 months",
  "Guideline consensus: warfarin preferred in first 3 months; DOACs acceptable long-term for patients with AF",
];

// ─── Transcatheter data ───────────────────────────────────────────────────────
const transcatheterRows = [
  [
    "TAVR — no separate anticoagulation indication",
    "Single antiplatelet therapy (ASA 81 mg daily)",
    "DAPT no longer preferred: meta-analysis shows increased bleeding with no reduction in clinical thrombosis",
    "green",
  ],
  [
    "TAVR — with AF or another anticoagulation indication",
    "Long-term oral anticoagulation per AF pathway",
    "Do NOT add routine antiplatelet therapy — POPular TAVI: clopidogrel + anticoagulation increased bleeding without benefit",
    "blue",
  ],
  [
    "Transcatheter mitral valve replacement (off-label SAPIEN)",
    "3 months anticoagulation → aspirin alone",
    "Reserved for selected patients where surgical risk is prohibitive",
    "teal",
  ],
  [
    "EVOQUE transcatheter tricuspid valve (FDA approved Feb 2024)",
    "6 months warfarin or anticoagulant plus aspirin (per TRISCEND II protocol)",
    "Major bleeding 10.4% at 30 days; optimal therapy remains uncertain — individualise",
    "orange",
  ],
  [
    "Melody transcatheter pulmonary valve (congenital HD)",
    "Aspirin alone — likely safe",
    "No randomised data available in this population",
    "gray",
  ],
  [
    "MitraClip / TriClip (transcatheter repair)",
    "ASA alone or ASA + clopidogrel for 3–6 months → lifelong ASA",
    "Follows major device-trial protocols pending comparative data",
    "gray",
  ],
];

// ─── Mechanical valve data ────────────────────────────────────────────────────
const mechanicalRiskFacts = [
  { label: "Mechanical aortic valve", risk: "~0.5%/year", tone: "green" },
  { label: "Mechanical mitral valve", risk: "~0.9%/year", tone: "orange" },
  { label: "Both aortic + mitral valves", risk: "~1.2%/year", tone: "danger" },
];

const valveTypes = [
  {
    name: "Bileaflet",
    examples: "St. Jude, On-X",
    note: "Most commonly seen today",
    tone: "blue",
  },
  {
    name: "Tilting disc",
    examples: "Björk-Shiley",
    note: "Infrequently seen today",
    tone: "orange",
  },
  {
    name: "Ball-cage",
    examples: "Starr-Edwards",
    note: "Rarely seen today; highest thrombogenicity",
    tone: "danger",
  },
];

const doaCContraindications = [
  { drug: "Dabigatran", trial: "RE-ALIGN", finding: "More thrombosis AND more bleeding vs warfarin" },
  { drug: "Apixaban", trial: "PROACT-Xa", finding: "More thrombosis vs warfarin" },
  { drug: "Rivaroxaban", trial: "No completed RCT", finding: "Contraindicated by extrapolation" },
  { drug: "Edoxaban", trial: "No completed RCT", finding: "Contraindicated by extrapolation" },
];

// ─── INR target data ──────────────────────────────────────────────────────────
const inrCards = [
  {
    valve: "Standard bileaflet aortic",
    target: "2.0–3.0",
    notes: "No additional stroke risk factors",
    tone: "green",
    asa: "Add ASA 81 mg if low bleeding risk",
  },
  {
    valve: "Standard bileaflet aortic (high-risk†)",
    target: "2.5–3.5",
    notes: "AF, prior thromboembolism, LV dysfunction, hypercoagulable state, older generation valve",
    tone: "orange",
    asa: "Add ASA 81 mg if low bleeding risk",
  },
  {
    valve: "On-X aortic valve (≥3 months post-op)",
    target: "1.5–2.0",
    notes: "Only with ASA 81 mg co-administration. Controversial — not endorsed by ESC guidelines",
    tone: "teal",
    asa: "ASA 81 mg mandatory with lower target",
  },
  {
    valve: "On-X aortic (with AF or risk factors)",
    target: "2.5–3.5",
    notes: "Maintain higher INR target beyond 3 months in patients with AF or additional stroke risk",
    tone: "orange",
    asa: "Add ASA 81 mg if low bleeding risk",
  },
  {
    valve: "Mechanical mitral valve (bileaflet)",
    target: "2.5–3.5",
    notes: "Higher thrombogenicity than aortic position due to passive low-pressure flow",
    tone: "danger",
    asa: "Add ASA 81 mg if low bleeding risk",
  },
  {
    valve: "Tilting disc or ball-cage (any position)",
    target: "2.5–3.5",
    notes: "Ball-cage: consider INR target 3.0 for highest-risk patients",
    tone: "danger",
    asa: "Add ASA 81 mg if low bleeding risk",
  },
  {
    valve: "Tricuspid mechanical valve",
    target: "3.0 (avoid if possible)",
    notes: "Very high thrombosis risk; passive right-heart flow. Mechanical valves rarely placed here",
    tone: "danger",
    asa: "Specialist input required",
  },
];

const onXSummary = [
  {
    phase: "First 3 months post-implantation",
    inr: "2.0–3.0",
    tone: "blue",
    note: "Standard warfarin regardless of valve design",
  },
  {
    phase: "After 3 months — no risk factors",
    inr: "1.5–2.0",
    tone: "teal",
    note: "Lower target; must co-administer ASA 81 mg. Non-inferior for bleeding; numerically higher stroke rate",
  },
  {
    phase: "After 3 months — AF or risk factors",
    inr: "2.5–3.5",
    tone: "orange",
    note: "Maintain higher intensity; lower target not safe in this group",
  },
];

// ─── Subclinical thrombosis data ──────────────────────────────────────────────
const subclinicalTrials = [
  {
    name: "GALILEO",
    drug: "Rivaroxaban",
    result: "Stopped early — excess mortality in rivaroxaban group",
    tone: "danger",
  },
  {
    name: "ATLANTIS",
    drug: "Apixaban",
    result: "Reduced subclinical thrombosis vs antiplatelet therapy; similar trend to GALILEO for mortality",
    tone: "orange",
  },
  {
    name: "ADAPT-TAVR",
    drug: "Edoxaban",
    result: "Edoxaban reduced leaflet thrombosis and cerebral emboli vs DAPT",
    tone: "teal",
  },
];

// ─── Special situations ───────────────────────────────────────────────────────
const specialRows = [
  [
    "Periprocedural management",
    "Bridge with UFH or LMWH before (and sometimes after) elective surgery",
    "Do NOT interrupt warfarin for minor procedures: cataract surgery, dental, skin biopsy",
    "blue",
  ],
  [
    "Pregnancy — warfarin ≤5 mg/day",
    "Warfarin may continue throughout pregnancy",
    "Warfarin embryopathy, miscarriage, and stillbirth still reported even at low doses — informed consent essential",
    "orange",
  ],
  [
    "Pregnancy — warfarin >5 mg/day",
    "Switch to twice-daily LMWH (monitored anti-Xa) or IV UFH for first trimester",
    "Add ASA 81 mg in second and third trimesters. All patients → switch to UFH before delivery",
    "danger",
  ],
  [
    "Paediatrics",
    "Follow adult recommendations; co-manage with paediatric cardiology",
    "No randomised controlled trials in children; individualise with specialist input",
    "gray",
  ],
];

const pregnancyTimeline = [
  { phase: "Pre-conception", action: "Counselling on valve thrombosis risk, teratogenicity, and anticoagulation options", tone: "blue" },
  { phase: "First trimester", action: "Warfarin ≤5 mg/day: continue; >5 mg/day: switch to monitored twice-daily LMWH (anti-Xa target 0.8–1.2 U/mL 4h post-dose) or IV UFH", tone: "orange" },
  { phase: "Second & third trimesters", action: "Continue chosen anticoagulant + add ASA 81 mg for additional thrombotic risk reduction", tone: "teal" },
  { phase: "Peripartum", action: "Switch to IV UFH at planned delivery. Time of last dose must allow safe neuraxial anaesthesia if required", tone: "danger" },
];

// ─── References ───────────────────────────────────────────────────────────────
const references = [
  "Asgar AW, et al. 2019 Canadian Cardiovascular Society position statement for transcatheter aortic valve implantation. Can J Cardiol. 2019;35:1437-1448.",
  "Brouwer J, et al. Aspirin alone versus dual antiplatelet therapy after TAVI: a systematic review and patient-level meta-analysis. J Am Heart Assoc. 2021;10:e019604.",
  "Chu MWA, et al. Low-dose vs standard warfarin after mechanical mitral valve replacement: PROACT Mitral randomized trial. Ann Thorac Surg. 2023;115:929-938.",
  "Collet JP, et al. Apixaban vs standard of care after TAVI: the ATLANTIS trial. Eur Heart J. 2022;43:2783-2797.",
  "Dangas GD, et al. A controlled trial of rivaroxaban after transcatheter aortic-valve replacement (GALILEO). N Engl J Med. 2020;382:120-129.",
  "Eikelboom JW, et al. Dabigatran versus warfarin in patients with mechanical heart valves (RE-ALIGN). N Engl J Med. 2013;369:1206-1214.",
  "Guimarães HP, et al. Rivaroxaban in patients with AF and a bioprosthetic mitral valve (RIVER). N Engl J Med. 2020;383:2117-2126.",
  "Hahn RT, et al. Transcatheter valve replacement in severe tricuspid regurgitation (TRISCEND II). N Engl J Med. 2024;392:115-126.",
  "Kovacs MJ, et al. Postoperative LMWH bridging for high arterial thromboembolism risk (PERIOP2). BMJ. 2021;373:n1205.",
  "Montalescot G, et al. Apixaban and valve thrombosis after TAVR: ATLANTIS-4D-CT substudy. JACC Cardiovasc Interv. 2022;15:1794-1804.",
  "Nijenhuis VJ, et al. Anticoagulation with or without clopidogrel after TAVI (POPular TAVI). N Engl J Med. 2020;382:1696-1707.",
  "Otto CM, et al. 2020 ACC/AHA valvular heart disease guideline. Circulation. 2021;143:e72-e227.",
  "Park DW, et al. ADAPT-TAVR randomized clinical trial. Circulation. 2022;146:466-479.",
  "Puskas JD, et al. Anticoagulation and antiplatelet strategies after On-X mechanical aortic valve (PROACT). J Am Coll Cardiol. 2018;71:2717-2726.",
  "Shim CY, et al. Edoxaban early after surgical bioprosthetic valve implantation or repair (ENAVLE). J Thorac Cardiovasc Surg. 2023;165:58-67.e4.",
  "Unverdorben M, et al. Edoxaban versus VKA for AF after TAVR (ENVISAGE-TAVI). N Engl J Med. 2021;385:2150-2160.",
  "Vahanian A, et al. 2021 ESC/EACTS valvular heart disease guidelines. Eur Heart J. 2022;43:561-632.",
  "Wang TY, et al. Apixaban or warfarin in patients with an On-X mechanical aortic valve (PROACT-Xa). NEJM Evid. 2023;2(7).",
  "Whitlock RP, et al. Antithrombotic therapy for valvular disease (ACCP 9th ed). Chest. 2012;141:e576S-e600S.",
  "Woldendorp K, et al. Subclinical valve thrombosis in TAVI: systematic review and meta-analysis. J Thorac Cardiovasc Surg. 2021;162:1491-1499.e2.",
];

// ─── Small helpers ────────────────────────────────────────────────────────────
function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

function ToneStripe({ tone }) {
  const map = { green: "#16a34a", teal: "#0f766e", blue: "#2563eb", orange: "#d97706", danger: "#dc2626", gray: "#9ca3af" };
  return (
    <span
      style={{
        display: "inline-block",
        width: "3px",
        height: "1em",
        borderRadius: "2px",
        background: map[tone] || map.gray,
        marginRight: "0.5rem",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    />
  );
}

function INRBadge({ value, tone }) {
  const bg = { green: "#f0fdf4", teal: "#f0fdfa", orange: "#fffbeb", danger: "#fef2f2", blue: "#eff6ff", gray: "#f9fafb" };
  const color = { green: "#15803d", teal: "#0f766e", orange: "#b45309", danger: "#b91c1c", blue: "#1d4ed8", gray: "#6b7280" };
  const border = { green: "#bbf7d0", teal: "#99f6e4", orange: "#fde68a", danger: "#fecaca", blue: "#bfdbfe", gray: "#e5e7eb" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.3rem 0.7rem",
        borderRadius: "999px",
        border: `1px solid ${border[tone] || border.gray}`,
        background: bg[tone] || bg.gray,
        color: color[tone] || color.gray,
        fontWeight: 800,
        fontSize: "1.05rem",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      INR {value}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function HeartValvesGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell valves-guide-shell">

      {/* ── Header ── */}
      <div className="asa-guide-header">
        <div className="asa-guide-header-top">
          <div className="asa-guide-header-copy">
            <div className="asa-badge-row">
              <span className="asa-badge asa-badge-blue">Clinical Guide</span>
              <span className="asa-badge asa-badge-green">Valve Antithrombotics</span>
              <span className="asa-badge asa-badge-teal">Thrombosis Canada</span>
            </div>
            <h2 className="asa-guide-title">Bioprosthetic &amp; Mechanical Heart Valves: Antithrombotic Therapy</h2>
            <div className="asa-guide-meta">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Surgical · Repaired · Transcatheter · Mechanical</span>
            </div>
          </div>
          <div className="asa-guide-icon valves-guide-icon">
            <HeartPulse size={24} />
          </div>
        </div>
        <div className="asa-objective-strip">
          <strong>Objective:</strong> To summarise evidence-based recommendations for antithrombotic drug management in patients with surgical or transcatheter valve replacement or repair, including mechanical prostheses.
        </div>
      </div>

      {/* ── Clinical background strip ── */}
      <div className="asa-mechanism-card valves-mechanism-card">
        <div className="asa-mechanism-icon valves-mechanism-icon">
          <Orbit size={18} />
        </div>
        <div>
          <h3>Clinical Background</h3>
          <p style={{ margin: 0, color: "#374151", lineHeight: 1.65, fontSize: "0.94rem" }}>
            Valve thrombosis and thromboembolism risk is shaped by prosthesis type, valve position, surgical versus transcatheter approach, coexisting atrial fibrillation, and patient-specific bleeding risk. Two questions should anchor every decision: <strong>(1) Does the patient have another indication for anticoagulation?</strong> and <strong>(2) What type of valve or repair was performed?</strong>
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="asa-tabs">
        <div className="asa-tabs-list" role="tablist" aria-label="Heart valve guide sections">
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

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />High-Yield Clinical Orientation</h3>
              <ul className="asa-ind-list">
                <li>Bioprosthetic valve recommendations are derived from older, lower-quality observational data; guideline bodies differ in emphasis between warfarin and antiplatelet therapy early post-implantation.</li>
                <li>Transcatheter valve antithrombotic decisions are increasingly patient-driven — bleeding and thrombotic risk often reflect comorbidity burden more than the device itself.</li>
                <li>Mechanical valves require lifelong warfarin; DOACs are <strong>contraindicated</strong> in this population based on randomised trial evidence.</li>
                <li>Subclinical leaflet thrombosis (CT-detected hypoattenuated leaflet thickening) is associated with increased stroke risk. Anticoagulation reduces it, but routine screening and preventive anticoagulation are not currently recommended.</li>
                <li>The On-X aortic valve may allow a lower INR target (1.5–2.0) after 3 months, but this remains controversial and is not endorsed in ESC guidelines.</li>
              </ul>
            </article>

            {/* Decision framework grid */}
            <div className="asa-ae-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="asa-ae-card" style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
                <div className="asa-ae-card-label" style={{ color: "#1d4ed8" }}>Step 1 — Valve type</div>
                <div className="asa-ae-card-text" style={{ color: "#1e40af", fontSize: "0.88rem", marginTop: "0.3rem", fontWeight: 500 }}>Bioprosthetic · Mechanical · Repaired · Transcatheter</div>
              </div>
              <div className="asa-ae-card" style={{ borderColor: "#bbf7d0", background: "#f0fdf4" }}>
                <div className="asa-ae-card-label" style={{ color: "#166534" }}>Step 2 — Valve position</div>
                <div className="asa-ae-card-text" style={{ color: "#15803d", fontSize: "0.88rem", marginTop: "0.3rem", fontWeight: 500 }}>Aortic (lower risk) · Mitral (higher risk) · Tricuspid / Pulmonic</div>
              </div>
              <div className="asa-ae-card" style={{ borderColor: "#fde68a", background: "#fffbeb" }}>
                <div className="asa-ae-card-label" style={{ color: "#92400e" }}>Step 3 — Additional indication?</div>
                <div className="asa-ae-card-text" style={{ color: "#b45309", fontSize: "0.88rem", marginTop: "0.3rem", fontWeight: 500 }}>AF · Prior stroke/TE · Hypercoagulable state</div>
              </div>
              <div className="asa-ae-card" style={{ borderColor: "#fecaca", background: "#fef2f2" }}>
                <div className="asa-ae-card-label" style={{ color: "#b91c1c" }}>Step 4 — Bleeding risk</div>
                <div className="asa-ae-card-text" style={{ color: "#991b1b", fontSize: "0.88rem", marginTop: "0.3rem", fontWeight: 500 }}>GI bleed history · High-fall risk · Renal/hepatic impairment</div>
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>All antithrombotic decisions in valve disease require individualised assessment of thrombotic versus haemorrhagic risk. These recommendations should be applied alongside valve-specific cardiology input.</div>
            </div>
          </div>
        )}

        {/* ── BIOPROSTHETIC ── */}
        {tab === "bioprosthetic" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="green" />Surgical Bioprosthetic Valves and Valve Repair</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Without a separate indication for anticoagulation. Guidelines from ACC/AHA, ESC, and ACCP differ in emphasis; choices below reflect consensus where alignment exists.
              </p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Valve situation</th>
                    <th>Suggested regimen</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {bioprostheticRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="dose-highlight" style={{ display: "flex", alignItems: "center", gap: 0 }}>
                        <ToneStripe tone={row[3]} />{row[0]}
                      </td>
                      <td>{row[1]}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="blue" />With Atrial Fibrillation or Another Anticoagulation Indication</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem" }}>
                Use long-term anticoagulation as per the Stroke Prevention in Atrial Fibrillation pathway. Trial evidence supports DOACs long-term, but warfarin remains preferred in the first 3 months post-surgery.
              </p>
              <ul className="asa-ind-list">
                {bioprostheticAFNote.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="asa-alert asa-alert-teal">
              <CheckCircle2 size={16} />
              <div>
                When AF is present, DOACs (rivaroxaban, edoxaban) are acceptable for <strong>long-term</strong> anticoagulation in patients with surgical bioprosthetic valves. Warfarin remains preferred in the <strong>first 3 months</strong> post-operatively.
              </div>
            </div>

            <div className="asa-alert asa-alert-danger">
              <XCircle size={16} />
              <div>
                <strong>Dabigatran:</strong> Increased pericardial bleeding observed in RE-ALIGN trial in early post-cardiac surgery. Avoid in the first 3 months after any cardiac valve surgery.
              </div>
            </div>
          </div>
        )}

        {/* ── TRANSCATHETER ── */}
        {tab === "transcatheter" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="teal" />Transcatheter Valve Antithrombotic Strategies</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Randomised data are limited except for TAVR. For non-aortic transcatheter devices, antithrombotic decisions should be individualised by comorbidity burden as much as by device type.
              </p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Intervention</th>
                    <th>Antithrombotic approach</th>
                    <th>Key evidence / caveat</th>
                  </tr>
                </thead>
                <tbody>
                  {transcatheterRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="dose-highlight">
                        <ToneStripe tone={row[3]} />{row[0]}
                      </td>
                      <td>{row[1]}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-warn">
              <AlertCircle size={16} />
              <div>
                <strong>TAVR evolution:</strong> Earlier trials used empiric DAPT (embolic debris observed in ~75% of cases). Meta-analysis of 4 RCTs now shows DAPT increases bleeding without reducing clinical thrombosis. Single antiplatelet therapy is the current standard.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                <strong>ENVISAGE-TAVI:</strong> Edoxaban was non-inferior to warfarin in TAVR patients with AF, but was associated with higher major bleeding (primarily gastrointestinal). DOACs are acceptable but require careful patient selection.
              </div>
            </div>
          </div>
        )}

        {/* ── MECHANICAL ── */}
        {tab === "mechanical" && (
          <div className="asa-tab-panel">

            {/* Valve types */}
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Mechanical Valve Types</h3>
              <div className="asa-ae-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
                {valveTypes.map((v) => {
                  const bg = { blue: "#eff6ff", orange: "#fffbeb", danger: "#fef2f2" };
                  const bc = { blue: "#bfdbfe", orange: "#fde68a", danger: "#fecaca" };
                  const col = { blue: "#1d4ed8", orange: "#b45309", danger: "#b91c1c" };
                  return (
                    <div
                      key={v.name}
                      className="asa-ae-card"
                      style={{ borderColor: bc[v.tone], background: bg[v.tone] }}
                    >
                      <div className="asa-ae-card-label" style={{ color: col[v.tone] }}>{v.name}</div>
                      <div className="asa-ae-card-text" style={{ color: col[v.tone] }}>{v.examples}</div>
                      <div style={{ marginTop: "0.25rem", fontSize: "0.78rem", color: col[v.tone], opacity: 0.8 }}>{v.note}</div>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Annual stroke risk */}
            <article className="asa-section-card">
              <h3><Dot tone="danger" />Annual Stroke / Valve Thrombosis Risk Despite Anticoagulation</h3>
              <div className="asa-ae-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                {mechanicalRiskFacts.map((f) => {
                  const bg = { green: "#f0fdf4", orange: "#fffbeb", danger: "#fef2f2" };
                  const bc = { green: "#bbf7d0", orange: "#fde68a", danger: "#fecaca" };
                  const col = { green: "#166534", orange: "#92400e", danger: "#b91c1c" };
                  return (
                    <div
                      key={f.label}
                      className="asa-ae-card"
                      style={{ borderColor: bc[f.tone], background: bg[f.tone], textAlign: "center" }}
                    >
                      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: col[f.tone], letterSpacing: "-0.02em" }}>{f.risk}</div>
                      <div style={{ fontSize: "0.78rem", color: col[f.tone], marginTop: "0.2rem", fontWeight: 600 }}>{f.label}</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ margin: "0.85rem 0 0", fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.6 }}>
                Mitral valves are more thrombogenic than aortic valves because they are exposed to passive, low-pressure blood flow from the left atrium to the left ventricle.
              </p>
            </article>

            {/* DOAC contraindication */}
            <article className="asa-section-card">
              <h3><Dot tone="danger" />DOACs — Contraindicated in All Mechanical Valves</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Drug</th>
                    <th>Key trial</th>
                    <th>Finding</th>
                  </tr>
                </thead>
                <tbody>
                  {doaCContraindications.map((row) => (
                    <tr key={row.drug}>
                      <td className="dose-highlight">{row.drug}</td>
                      <td>{row.trial}</td>
                      <td style={{ color: "#b91c1c", fontSize: "0.88rem" }}>{row.finding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-danger">
              <ShieldAlert size={16} />
              <div>
                <strong>All DOACs are contraindicated in mechanical heart valves.</strong> Warfarin with an intensity based on valve type and location remains the only evidence-based anticoagulant for this population. See the INR Targets tab for specific ranges.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Syringe size={16} />
              <div>
                <strong>Aspirin:</strong> ASA 81 mg daily should be added to warfarin in patients with a mechanical aortic or mitral valve who are at <em>low</em> risk of bleeding. Use caution with a history of gastrointestinal bleeding.
              </div>
            </div>
          </div>
        )}

        {/* ── INR TARGETS ── */}
        {tab === "inr-targets" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Warfarin INR Target Ranges by Valve Type and Position</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Target INR depends on valve design, manufacturer, position, and patient stroke risk factors. All patients receive warfarin for the first 3 months post-implantation at standard intensity regardless of valve design.
              </p>
              <div style={{ display: "grid", gap: "0.65rem" }}>
                {inrCards.map((card) => {
                  const bg = { green: "#f0fdf4", teal: "#f0fdfa", orange: "#fffbeb", danger: "#fef2f2", blue: "#eff6ff", gray: "#f9fafb" };
                  const bc = { green: "#bbf7d0", teal: "#99f6e4", orange: "#fde68a", danger: "#fecaca", blue: "#bfdbfe", gray: "#e5e7eb" };
                  const col = { green: "#166534", teal: "#0f766e", orange: "#92400e", danger: "#b91c1c", blue: "#1e40af", gray: "#6b7280" };
                  return (
                    <div
                      key={card.valve}
                      style={{
                        border: `1px solid ${bc[card.tone]}`,
                        background: bg[card.tone],
                        borderRadius: "10px",
                        padding: "0.9rem 1rem",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: "1 1 220px" }}>
                        <div style={{ fontWeight: 700, color: col[card.tone], marginBottom: "0.2rem", fontSize: "0.9rem" }}>{card.valve}</div>
                        <div style={{ fontSize: "0.82rem", color: col[card.tone], opacity: 0.85, lineHeight: 1.55 }}>{card.notes}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end", flexShrink: 0 }}>
                        <INRBadge value={card.target} tone={card.tone} />
                        <span style={{ fontSize: "0.72rem", color: col[card.tone], opacity: 0.8, textAlign: "right" }}>{card.asa}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* On-X timeline */}
            <article className="asa-section-card">
              <h3><Dot tone="teal" />On-X Aortic Valve — Treatment Phase Summary</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                PROACT trial demonstrated non-inferiority of lower INR (1.5–2.0) vs standard (2.0–3.0) for composite of bleeding and thromboembolism, driven by reduced bleeding. However, numerically higher stroke and TIA rates were observed in the lower-target group.
              </p>
              <div className="asa-timeline">
                {onXSummary.map((step) => (
                  <div key={step.phase} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${step.tone}`} />
                    <div>
                      <div className="asa-timeline-label" style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827" }}>{step.phase}</div>
                      <div className="asa-timeline-desc" style={{ fontSize: "0.84rem", color: "#6b7280", marginTop: "0.2rem", lineHeight: 1.55 }}>
                        <INRBadge value={step.inr} tone={step.tone} />
                        <span style={{ marginLeft: "0.5rem" }}>{step.note}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-warn">
              <AlertTriangle size={16} />
              <div>
                <strong>PROACT Mitral:</strong> The trial of lower INR targets in On-X mitral valve patients (target 2.0–2.5 vs standard 2.5–3.5) was stopped early due to failure to meet non-inferiority. Lower INR targets should NOT be used for mechanical mitral valves regardless of design.
              </div>
            </div>

            <div className="asa-alert asa-alert-info">
              <Info size={16} />
              <div>
                † Higher intensity (INR target 3.0) should be considered in patients with ball-cage valves, additional stroke risk factors, or prior thromboembolic events. ‡ Co-administration of ASA 81 mg daily is recommended in patients at low bleeding risk.
              </div>
            </div>
          </div>
        )}

        {/* ── SUBCLINICAL THROMBOSIS ── */}
        {tab === "subclinical" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="orange" />Subclinical Valve Thrombosis</h3>
              <p className="asa-section-copy">
                Subclinical valve leaflet thrombosis is defined by <strong>hypoattenuated leaflet thickening</strong> on CT with reduced leaflet motion in the absence of clinical symptoms. Initially identified in TAVR patients, it has also been recognised in surgical aortic valve replacement patients. It is associated with an <strong>increased risk of clinical stroke</strong>.
              </p>
              <div className="asa-ae-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <div className="asa-ae-card" style={{ borderColor: "#fde68a", background: "#fffbeb" }}>
                  <div className="asa-ae-card-label" style={{ color: "#92400e" }}>CT feature</div>
                  <div className="asa-ae-card-text" style={{ color: "#78350f", fontSize: "0.85rem", marginTop: "0.25rem", fontWeight: 500 }}>Hypoattenuated leaflet thickening (HALT) with reduced leaflet motion on 4D CT</div>
                </div>
                <div className="asa-ae-card" style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
                  <div className="asa-ae-card-label" style={{ color: "#1d4ed8" }}>Clinical impact</div>
                  <div className="asa-ae-card-text" style={{ color: "#1e40af", fontSize: "0.85rem", marginTop: "0.25rem", fontWeight: 500 }}>Associated with increased clinical stroke risk; also seen after surgical AVR</div>
                </div>
                <div className="asa-ae-card" style={{ borderColor: "#99f6e4", background: "#f0fdfa" }}>
                  <div className="asa-ae-card-label" style={{ color: "#0f766e" }}>Effect of anticoagulation</div>
                  <div className="asa-ae-card-text" style={{ color: "#0f766e", fontSize: "0.85rem", marginTop: "0.25rem", fontWeight: 500 }}>Anticoagulation reduces subclinical leaflet thrombosis compared to DAPT</div>
                </div>
              </div>
            </article>

            <article className="asa-section-card">
              <h3><Dot tone="teal" />Key Trials Examining DOAC Use for Subclinical Thrombosis in TAVR</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Trial</th>
                    <th>Drug studied</th>
                    <th>Key finding</th>
                  </tr>
                </thead>
                <tbody>
                  {subclinicalTrials.map((row) => {
                    const col = { danger: "#b91c1c", orange: "#92400e", teal: "#0f766e" };
                    return (
                      <tr key={row.name}>
                        <td className="dose-highlight">{row.name}</td>
                        <td>{row.drug}</td>
                        <td style={{ color: col[row.tone] || "#4b5563", fontSize: "0.88rem" }}>{row.result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </article>

            <div className="asa-alert asa-alert-warn">
              <Microscope size={16} />
              <div>
                <strong>Current guidance:</strong> Routine CT screening for subclinical valve thrombosis and routine preventive anticoagulation are <strong>not recommended</strong>. However, patients found to have increased gradients on echocardiogram or thrombosis on CT should likely receive anticoagulation with warfarin. GALILEO and ATLANTIS both showed concerning mortality signals with DOACs in unselected TAVR patients.
              </div>
            </div>

            <div className="asa-alert asa-alert-teal">
              <Zap size={16} />
              <div>
                <strong>Bottom line:</strong> Anticoagulation reduces subclinical leaflet thrombosis but has not demonstrated net clinical benefit when used routinely in TAVR patients without a separate indication. Evidence is evolving.
              </div>
            </div>
          </div>
        )}

        {/* ── SPECIAL SITUATIONS ── */}
        {tab === "special" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="blue" />Special Clinical Situations</h3>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Clinical approach</th>
                    <th>Key point</th>
                  </tr>
                </thead>
                <tbody>
                  {specialRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="dose-highlight"><ToneStripe tone={row[3]} />{row[0]}</td>
                      <td>{row[1]}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.88rem" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            {/* Pregnancy timeline */}
            <article className="asa-section-card">
              <h3><Dot tone="purple" />Pregnancy — Anticoagulation Pathway</h3>
              <p className="asa-section-copy" style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Pregnant women with mechanical valves are at especially high risk of thrombotic complications. Management requires a <strong>multidisciplinary team</strong> with expertise in maternal cardiac care and thrombosis.
              </p>
              <div className="asa-timeline">
                {pregnancyTimeline.map((step) => (
                  <div key={step.phase} className="asa-timeline-step">
                    <div className={`asa-timeline-dot ${step.tone}`} />
                    <div>
                      <div className="asa-timeline-label" style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827" }}>{step.phase}</div>
                      <div className="asa-timeline-desc" style={{ fontSize: "0.84rem", color: "#6b7280", marginTop: "0.2rem", lineHeight: 1.55 }}>
                        {step.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="asa-alert asa-alert-info">
              <Stethoscope size={16} />
              <div>
                Periprocedural management: Bridging with UFH or LMWH is indicated before elective surgery. Warfarin does NOT need to be interrupted for minor procedures (cataract surgery, dental procedures, skin biopsies). Refer to the Warfarin Perioperative Management clinical guide.
              </div>
            </div>

            <div className="asa-alert asa-alert-teal">
              <Baby size={16} />
              <div>
                Paediatric patients should be co-managed with paediatric cardiology and haematology input. No randomised trials are available in children; adult recommendations serve as a guide.
              </div>
            </div>
          </div>
        )}

        {/* ── REFERENCES ── */}
        {tab === "references" && (
          <div className="asa-tab-panel">
            <article className="asa-section-card">
              <h3><Dot tone="gray" />References</h3>
              <ol className="asa-ref-list" style={{ paddingLeft: "1.2rem", listStyle: "decimal" }}>
                {references.map((item, i) => (
                  <li key={i} style={{ padding: "0.35rem 0", color: "#4b5563", lineHeight: 1.6, fontSize: "0.87rem" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="asa-guide-footer" style={{ padding: "1rem 1.35rem" }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#374151" }}>
          Bioprosthetic and Mechanical Heart Valves: Antithrombotic Therapy
        </p>
        <p style={{ margin: "0.3rem 0 0", color: "#6b7280", fontSize: "0.85rem" }}>
          Thrombosis Canada Clinical Guide · Updated 6 February 2026 · Use alongside valve-specific cardiology input and individualised bleeding-risk assessment.
        </p>
      </div>
    </section>
  );
}
