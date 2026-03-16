import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "riskstrat", label: "Risk Stratification" },
  { id: "doacs", label: "DOACs" },
  { id: "lmwh", label: "LMWH / UFH" },
  { id: "thrombolysis", label: "Thrombolysis" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const doacRows = [
  {
    drug: "Apixaban (Eliquis®)",
    acuteDose: "10 mg PO BID × 7 days",
    maintenanceDose: "5 mg PO BID",
    extendedDose: "2.5 mg PO BID (after 6 months)",
    leadIn: "No — start directly",
    renal: "Caution CrCl 15–29; avoid CrCl <15 / dialysis",
    badge: "preferred",
  },
  {
    drug: "Rivaroxaban (Xarelto®)",
    acuteDose: "15 mg PO BID × 21 days (with food)",
    maintenanceDose: "20 mg PO OD (with food)",
    extendedDose: "10 mg PO OD (after 6 months)",
    leadIn: "No — start directly",
    renal: "No adjustment CrCl 15–50; caution CrCl 15–30; avoid CrCl <15",
    badge: "preferred",
  },
  {
    drug: "Dabigatran (Pradaxa®)",
    acuteDose: "After 5–10 days LMWH → 150 mg PO BID",
    maintenanceDose: "150 mg PO BID",
    extendedDose: "Not studied in VTE",
    leadIn: "Yes — 5–10 day LMWH required",
    renal: "Contraindicated CrCl <30",
    badge: "lead-in",
  },
  {
    drug: "Edoxaban (Lixiana®)",
    acuteDose: "After 5–10 days LMWH → 60 mg PO OD",
    maintenanceDose: "60 mg OD (or 30 mg if CrCl 15–50, weight ≤60 kg, or P-gp inhibitor)",
    extendedDose: "—",
    leadIn: "Yes — 5–10 day LMWH required",
    renal: "Not recommended CrCl <15",
    badge: "lead-in",
  },
];

const lmwhPERows = [
  { drug: "Dalteparin (Fragmin®)", dose: "200 U/kg SC OD or 100 U/kg SC BID (>100 kg)" },
  { drug: "Enoxaparin (Lovenox®)", dose: "1 mg/kg SC BID or 1.5 mg/kg SC OD" },
  { drug: "Nadroparin (Fraxiparine®)", dose: "171 U/kg SC OD or 86 U/kg SC BID" },
  { drug: "Tinzaparin (Innohep®)", dose: "175 U/kg SC OD" },
];

const thrombolysisRegimens = [
  { agent: "rt-PA (alteplase)", regimen: "100 mg IV over 2 hours" },
  { agent: "rt-PA (reduced dose)", regimen: "0.6 mg/kg (max 50 mg) IV over 15 minutes" },
  { agent: "rt-PA (weight-based)", regimen: "≥50 kg: 50 mg (10 mg bolus over 1 min + remainder over 2h); <50 kg: 0.5 mg/kg same approach" },
  { agent: "rt-PA (cardiac arrest)", regimen: "50 mg IV bolus over 1 minute" },
  { agent: "Tenecteplase (TNK, PEITHO regimen)", regimen: "30–50 mg IV bolus over 5–10 seconds (weight-based)" },
];

const references = [
  "Kahn S and de Wit K. Pulmonary embolism. N Engl J Med 2022;387:45-57.",
  "Ortel TL, et al. ASH 2020 guidelines for management of VTE: treatment of DVT and PE. Blood Adv 2020;4(19):4693-4738.",
  "Kearon C, et al. Antithrombotic therapy for VTE disease: CHEST Guideline 2016. Chest 2016;149(2):315-352.",
  "Konstantinides S, et al. 2019 ESC Guidelines for diagnosis and management of acute PE. Eur Heart J 2019.",
  "Meyer G, et al. Fibrinolysis for patients with intermediate-risk PE (PEITHO). N Engl J Med 2014;370(15):1402-1411.",
  "Roy PM, et al. Triaging acute PE by Hestia or simplified PESI criteria (HOME-PE). Eur Heart J 2021.",
  "Agnelli G, et al. Oral apixaban for treatment of acute VTE (AMPLIFY). N Engl J Med 2013;369:799-808.",
  "The EINSTEIN-PE Investigators. Rivaroxaban for symptomatic PE. N Engl J Med 2012;336(14):1287-1297.",
  "The Hokusai-VTE Investigators. Edoxaban vs warfarin for symptomatic VTE. N Engl J Med 2013;369(15):1406-1415.",
  "Weitz JI, et al. Rivaroxaban or aspirin for extended treatment of VTE (EINSTEIN CHOICE). N Engl J Med 2017;376(13):1211-1222.",
  "Agnelli G, et al. Apixaban for extended VTE treatment (AMPLIFY EXT). N Engl J Med 2013;368:699-708.",
  "Male C, et al. Rivaroxaban for VTE in children (EINSTEIN-Jr). Lancet Haematol 2020;7(1):e18-e27.",
  "Halton J, et al. Dabigatran for VTE in children (DIVERSITY). Lancet Haematol 2021;8(1):e22-e33.",
];

const badgeClass = (b) => {
  if (b === "preferred") return "asa-badge asa-badge-blue";
  if (b === "lead-in") return "asa-badge asa-badge-amber";
  return "asa-badge";
};

export function PeTreatmentGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Version 60 · May 2025</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Pulmonary Embolism: Treatment</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Risk stratification, anticoagulant selection, thrombolysis criteria, and outpatient management for acute PE — including special populations.
          </p>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`asa-tab-btn${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Principle:</strong> DOACs are preferred over LMWH-to-warfarin — equally effective, more convenient, lower bleeding risk. Extent of PE does not influence anticoagulant choice (unless thrombolysis considered).
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Treatment Initiation</h2>
              <ul className="list-none p-0 space-y-1">
                <li>If <strong>high pre-test probability</strong>: start rapid-acting anticoagulant while awaiting imaging (unless high bleed risk)</li>
                <li><strong>Intermediate PTP</strong>: withhold anticoagulation if imaging available within 4 hours</li>
                <li><strong>Low PTP</strong>: withhold anticoagulation if imaging available within 24 hours</li>
                <li>All confirmed PE: anticoagulation minimum <strong>3 months</strong></li>
                <li>Warfarin monotherapy NOT acceptable as initial treatment — must overlap with immediate-acting agent</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">~40% of ED PE Patients Are Outpatient Candidates</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Use PESI score (very low / low risk), simplified PESI, or HESTIA criteria to identify patients suitable for outpatient or early-discharge treatment. Exclude patients with supplemental O₂ need, parenteral analgesia, high bleed risk, severe renal dysfunction, or absent social supports.
              </p>
            </div>
          </div>
        )}

        {/* RISK STRATIFICATION */}
        {activeTab === "riskstrat" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Risk Tiers</h2>
              <div className="grid gap-3.5" style={{ gap: "0.75rem" }}>
                {[
                  {
                    tier: "High-risk (Massive) PE",
                    features: "Persistent hypotension (SBP <90 mmHg or 40 mmHg drop from baseline), vasopressor requirement, or cardiac arrest",
                    management: "IV UFH + urgent consideration of systemic thrombolysis (or surgical embolectomy). Short-term mortality >15%.",
                    color: "var(--tone-danger-text)",
                  },
                  {
                    tier: "Intermediate-risk (Sub-massive) PE",
                    features: "Haemodynamically stable + RV dysfunction on imaging (CTPA or echo) OR elevated troponin/BNP",
                    management: "LMWH or DOAC anticoagulation. Careful monitoring. Thrombolysis NOT routinely indicated — may be considered in select patients with severe symptoms and cardiopulmonary deterioration who are low bleed risk.",
                    color: "var(--tone-orange-text)",
                  },
                  {
                    tier: "Low-risk PE",
                    features: "Haemodynamically stable, no RV dysfunction, no elevated biomarkers",
                    management: "DOAC (preferred). Assess PESI/HESTIA for outpatient eligibility — ~40% can be safely discharged.",
                    color: "var(--tone-green-text)",
                  },
                ].map((r, i) => (
                  <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: 0, borderLeft: `3px solid ${r.color}` }}>
                    <strong style={{ color: r.color }}>{r.tier}</strong>
                    <p style={{ margin: "0.3rem 0", fontSize: "0.88em" }}><strong>Features:</strong> {r.features}</p>
                    <p style={{ margin: 0, fontSize: "0.88em" }}><strong>Management:</strong> {r.management}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Caution in "low-risk" patients:</strong> If RV dilatation on imaging, elevated troponin, or elevated BNP is present, these higher-mortality prognostic markers should trigger re-evaluation even if PESI score is low.
            </div>
          </div>
        )}

        {/* DOACS */}
        {activeTab === "doacs" && (
          <div className="grid gap-3.5">
            {doacRows.map((d, i) => (
              <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ borderLeft: "3px solid var(--primary)", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                  <strong style={{ fontSize: "1.05em" }}>{d.drug}</strong>
                  <span className={badgeClass(d.badge)}>{d.leadIn.startsWith("No") ? "No lead-in" : "LMWH lead-in required"}</span>
                </div>
                <table className="w-full border-collapse text-sm" style={{ marginTop: "0.4rem" }}>
                  <tbody>
                    <tr><td style={{ width: "35%" }}>Acute dose</td><td><strong>{d.acuteDose}</strong></td></tr>
                    <tr><td>Maintenance</td><td>{d.maintenanceDose}</td></tr>
                    <tr><td>Extended (&gt;6 months)</td><td>{d.extendedDose}</td></tr>
                    <tr><td>Renal</td><td style={{ fontSize: "0.87em" }}>{d.renal}</td></tr>
                  </tbody>
                </table>
              </div>
            ))}
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Extended treatment dose reduction:</strong> After 6 months, rivaroxaban 10 mg OD or apixaban 2.5 mg BID can be used — equally efficacious vs. standard dose but less clinically relevant bleeding (EINSTEIN CHOICE, AMPLIFY EXT, RENOVE trials).
            </div>
          </div>
        )}

        {/* LMWH / UFH */}
        {activeTab === "lmwh" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">LMWH Dosing for PE</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Dose</th>
                  </tr>
                </thead>
                <tbody>
                  {lmwhPERows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.drug}</strong></td>
                      <td>{r.dose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                Dose based on actual body weight. No maximum dose. Round to nearest pre-filled syringe. Tinzaparin has data supporting use down to CrCl 20 mL/min. Avoid most LMWHs in severe renal insufficiency (CrCl &lt;30).
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">UFH</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Reserved for:</strong> severe renal insufficiency (CrCl &lt;30), high bleed risk requiring rapid reversal, patients receiving thrombolysis</li>
                <li><strong>IV UFH bolus:</strong> 80 U/kg → infusion 18–20 U/kg/hr, adjust to local aPTT target</li>
                <li>Check baseline aPTT before starting — lupus anticoagulant can falsely elevate aPTT (consult thrombosis specialist)</li>
                <li>Some centres monitor with anti-Xa levels instead of aPTT</li>
                <li>UFH is preferred over LMWH for initial PE therapy if thrombolysis is planned (short half-life facilitates post-lysis management)</li>
              </ul>
            </div>
          </div>
        )}

        {/* THROMBOLYSIS */}
        {activeTab === "thrombolysis" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Systemic thrombolysis is indicated only in high-risk (massive) PE</strong> — defined as: cardiac arrest, persistent hypotension (SBP &lt;90 mmHg or ≥40 mmHg drop), or vasopressor requirement. Short-term mortality &gt;15%.
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Intermediate-risk (sub-massive) PE:</strong> Thrombolysis NOT routinely indicated — increases major bleeding and haemorrhagic stroke. May be considered only in select intermediate-risk patients with: (1) severe persistent symptoms, (2) signs of right heart failure/deterioration, AND (3) low bleeding risk — only after thrombosis specialist discussion.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Thrombolytic Regimens</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Regimen</th>
                  </tr>
                </thead>
                <tbody>
                  {thrombolysisRegimens.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.agent}</strong></td>
                      <td>{r.regimen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Post-Thrombolysis Anticoagulation</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                IV UFH (without bolus) should be used immediately after thrombolysis, followed by transition to a longer-term anticoagulant (LMWH, DOAC, or warfarin).
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Catheter-Directed Thrombolysis / Thrombectomy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Only at centres with requisite expertise. Delivers thrombolytic directly into emboli — potentially lower bleeding risk than systemic. No randomised trial data yet — ongoing trials (HI-PEITHO, PE-TRACT, PEERLESS 2). <strong>Should not be used routinely</strong> — consult specialist.
              </p>
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pregnancy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">LMWH monotherapy for full treatment duration. DOACs and <GuideLink to="warfarin">warfarin</GuideLink> contraindicated in pregnancy. See the <GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink> guide.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Cancer-associated PE</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">LMWH or anti-Xa DOAC (<GuideLink to="apixaban">apixaban</GuideLink> preferred — no lead-in, favourable GI bleeding profile). See the <GuideLink to="cancer">Cancer &amp; Thrombosis</GuideLink> guide.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Anticoagulation Contraindicated</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">Consider retrievable IVC filter as bridge. Consult thrombosis specialist. Reassess anticoagulation candidacy frequently. See the <GuideLink to="vcFilter">Vena Cava Filters</GuideLink> guide.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pediatric PE</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Confirm diagnosis with V/Q scan, CT contrast, or MRI</li>
                <li>Initiate with age-appropriate LMWH or UFH</li>
                <li>Treat for 3 months (provoked) or longer (unprovoked/recurrent)</li>
                <li>DOACs: rivaroxaban (EINSTEIN-Jr, weight-adjusted) and dabigatran (DIVERSITY) both showed similar low recurrence vs. standard anticoagulants in children</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Antiphospholipid Syndrome (APS)</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">DOACs should not be used in APS. Use <GuideLink to="warfarin">warfarin</GuideLink> with a target INR of 2.0–3.0. See <GuideLink to="aps">Antiphospholipid Syndrome</GuideLink>.</p>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">References</h2>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((ref, i) => <li key={i}>{ref}</li>)}
              </ol>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Version 60, updated 2025-05-01.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
