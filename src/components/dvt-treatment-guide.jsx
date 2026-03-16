import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "doacs", label: "DOACs" },
  { id: "lmwh", label: "LMWH" },
  { id: "warfarin", label: "Warfarin / UFH" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const doacRows = [
  {
    drug: "Apixaban (Eliquis®)",
    mechanism: "Factor Xa inhibitor",
    acuteDose: "10 mg PO BID × 7 days",
    maintenanceDose: "5 mg PO BID",
    extendedDose: "2.5 mg PO BID (after 6 months)",
    renalNote: "Can be used with caution in ESRD (CrCl <15 or dialysis) — discuss with specialist",
    leadIn: "No — start directly",
    badge: "preferred",
  },
  {
    drug: "Rivaroxaban (Xarelto®)",
    mechanism: "Factor Xa inhibitor",
    acuteDose: "15 mg PO BID × 21 days",
    maintenanceDose: "20 mg PO OD (with evening meal)",
    extendedDose: "10 mg PO OD (after 6 months)",
    renalNote: "Caution CrCl 15–30; not recommended CrCl <15",
    leadIn: "No — start directly",
    badge: "preferred",
  },
  {
    drug: "Dabigatran (Pradaxa®)",
    mechanism: "Direct thrombin inhibitor (IIa)",
    acuteDose: "After 5–10 days LMWH",
    maintenanceDose: "150 mg PO BID",
    extendedDose: "Not studied in VTE",
    renalNote: "Contraindicated CrCl <30",
    leadIn: "Yes — 5–10 day LMWH lead-in required",
    badge: "requires-lead-in",
  },
  {
    drug: "Edoxaban (Lixiana®)",
    mechanism: "Factor Xa inhibitor",
    acuteDose: "After 5–10 days LMWH",
    maintenanceDose: "60 mg PO OD (or 30 mg if CrCl 15–50, weight ≤60 kg, or P-gp inhibitor)",
    extendedDose: "—",
    renalNote: "Not recommended CrCl <15 or dialysis",
    leadIn: "Yes — 5–10 day LMWH lead-in required",
    badge: "requires-lead-in",
  },
];

const lmwhRows = [
  { drug: "Dalteparin (Fragmin®)", dose: "200 U/kg SC OD (preferred) or 100 U/kg SC BID (if >100 kg)", note: "Cap at 18,000 U/day for OD dosing" },
  { drug: "Enoxaparin (Lovenox®)", dose: "1.5 mg/kg SC OD or 1 mg/kg SC BID", note: "Renal adjustment to 1 mg/kg OD if CrCl <30" },
  { drug: "Tinzaparin (Innohep®)", dose: "175 U/kg SC OD", note: "Evidence supports use down to CrCl 20 mL/min without accumulation" },
  { drug: "Nadroparin (Fraxiparine®)", dose: "171 U/kg SC OD or 86 U/kg SC BID", note: "Less commonly used" },
];

const specialRows = [
  {
    situation: "Extensive proximal DVT (iliofemoral)",
    management: "Anticoagulation as core treatment. Consider CDT or pharmacomechanical thrombectomy for severe/limb-threatening DVT within 14 days of onset. Reserve for low-bleeding-risk patients. Phlegmasia cerulea/alba dolens are absolute indications for intervention.",
    key: "ATTRACT & CAVA trials: CDT did not significantly reduce PTS overall; role in select iliofemoral cases remains",
  },
  {
    situation: "Upper extremity DVT (UEDVT)",
    management: "5–10% of all VTE. Treat like lower extremity DVT. CDT/thrombectomy may be considered case-by-case for extensive, severely symptomatic UEDVT. Consider effort thrombosis (Paget-Schroetter) and thoracic outlet syndrome.",
    key: "cvad",
  },
  {
    situation: "Isolated distal DVT",
    management: "~10–15% extend proximally. Options: (1) Serial CUS weekly × 2 weeks; or (2) anticoagulate if severe symptoms, extension risk factors, or patient cannot return for follow-up. If treating: minimum 3 months.",
    key: "Extension risk factors: >5 cm length, multi-vein, near popliteal, no reversible provocation, prior VTE, cancer, inpatient, positive D-dimer",
  },
  {
    situation: "Cancer-associated DVT",
    management: "LMWH or anti-Xa DOACs (apixaban, rivaroxaban, edoxaban). Apixaban preferred in most — no lead-in needed, GI bleeding risk similar to LMWH.",
    key: "cancer",
  },
  {
    situation: "Pregnancy",
    management: "LMWH monotherapy for full duration. DOACs contraindicated. VKA contraindicated (except select circumstances).",
    key: "pregVte",
  },
  {
    situation: "Severe renal insufficiency (CrCl <15–20)",
    management: "UFH preferred. Apixaban with specialist consultation. Avoid LMWH (accumulation risk) and dabigatran (contraindicated).",
    key: "Consult thrombosis specialist before anticoagulating",
  },
  {
    situation: "Cannot anticoagulate (active bleeding / very high bleed risk)",
    management: "Consult thrombosis specialist. Consider retrievable IVC filter as bridge. Reassess anticoagulation candidacy frequently.",
    key: "vcFilter",
  },
  {
    situation: "Antiphospholipid syndrome (APS)",
    management: "Warfarin (INR 2.0–3.0) preferred. DOACs should not be used in APS.",
    key: "aps",
  },
];

const references = [
  "Ortel TL, et al. ASH 2020 guidelines for management of VTE: treatment of DVT and PE. Blood Adv 2020;4(19):4693-4738.",
  "Stevens SM, et al. Antithrombotic therapy for VTE disease: Second Update of the CHEST Guideline. CHEST 2021;160(6):e545-e608.",
  "Vedantham S, et al. Pharmacomechanical catheter-directed thrombolysis for DVT (ATTRACT). N Engl J Med 2017;377(23):2240-2252.",
  "Notten P, et al. Ultrasound-accelerated CDT vs anticoagulation for PTS prevention (CAVA). Lancet Haematol 2020;7(1):e40-e49.",
  "Castelluci LA, et al. Clinical and safety outcomes with treatment of acute VTE. JAMA 2014;312(11):1122-1135.",
  "Kearon C, et al. Antithrombotic therapy for VTE disease: CHEST Guideline 2016. Chest 2016;149(2):315-352.",
  "Franco L, et al. Anticoagulation in isolated distal DVT: meta-analysis. J Thromb Haemost 2017;15:1142-1154.",
  "Weitz J, et al. Rivaroxaban or aspirin for extended treatment of VTE. N Engl J Med 2017;376(13):1211-1222.",
  "Wells PS, Forgie MA, Rodger MA. Treatment of venous thromboembolism. JAMA 2014;311(7):717-728.",
  "Payne GJ, et al. Incidence of acute VTE in Canada: meta-analysis. Thromb Res 2021;197:8-12.",
];

const badgeClass = (b) => {
  if (b === "preferred") return "asa-badge asa-badge-blue";
  if (b === "requires-lead-in") return "asa-badge asa-badge-amber";
  return "asa-badge";
};

export function DvtTreatmentGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Version 80 · Nov 2025</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">DVT: Treatment</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Evidence-based anticoagulation for acute DVT — DOAC selection, LMWH dosing, and management of special situations including cancer, pregnancy, and iliofemoral thrombosis.
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
              <strong>First-line preference:</strong> DOACs (<GuideLink to="apixaban">apixaban</GuideLink> or <GuideLink to="rivaroxaban">rivaroxaban</GuideLink>) preferred over VKA except for APS, drug interactions (CYP3A4/P-gp), impaired oral absorption, or mechanical heart valve.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">General Principles</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Start anticoagulation before imaging confirmation if moderate-to-high suspicion and no high bleeding risk — get imaging ASAP</li>
                <li><strong>Outpatient management preferred</strong> unless limb-threatening DVT, high bleeding risk, or other hospitalisation indication</li>
                <li><strong>Warfarin monotherapy is not appropriate initial therapy</strong> — must overlap with immediate-acting agent for ≥5 days and until INR ≥2.0 for 2 consecutive days</li>
                <li><strong>Minimum 3 months</strong> anticoagulation for all patients</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Epidemiology</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Annual VTE (estimated)</span>
                  <span className="text-sm">~50,000 patients</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Present as DVT</span>
                  <span className="text-sm">Two thirds</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concurrent PE</span>
                  <span className="text-sm">~33%</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Post-thrombotic syndrome</span>
                  <span className="text-sm">Up to 50%</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recurrent DVT/PE at 10 years</span>
                  <span className="text-sm">~33%</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unprovoked first-time DVT</span>
                  <span className="text-sm">Up to 50%</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Anticoagulant Selection Framework</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred first-line</span>
                  <span className="text-sm">Apixaban or rivaroxaban (no lead-in, oral only)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requires LMWH lead-in</span>
                  <span className="text-sm">Dabigatran or edoxaban (5–10 day parenteral lead-in)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severe renal impairment</span>
                  <span className="text-sm">Apixaban with specialist review; UFH for CrCl &lt;15–20</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cancer-associated DVT</span>
                  <span className="text-sm">LMWH or anti-Xa DOAC (apixaban preferred)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">APS</span>
                  <span className="text-sm">Warfarin only — DOACs not recommended</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pregnancy</span>
                  <span className="text-sm">LMWH monotherapy — DOACs contraindicated</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOACS */}
        {activeTab === "doacs" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">DOAC Dosing for DVT Treatment</h2>
              {doacRows.map((d, i) => (
                <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <strong style={{ fontSize: "1.05em" }}>{d.drug}</strong>
                    <span className={badgeClass(d.badge)}>{d.leadIn.startsWith("No") ? "No lead-in needed" : "Requires LMWH lead-in"}</span>
                  </div>
                  <p style={{ margin: "0 0 0.2rem", fontSize: "0.88em" }}><span style={{ color: "#6b7280" }}>Mechanism:</span> {d.mechanism}</p>
                  <table className="w-full border-collapse text-sm" style={{ marginTop: "0.4rem" }}>
                    <thead>
                      <tr>
                        <th>Phase</th>
                        <th>Dose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Acute (initial)</td><td><strong>{d.acuteDose}</strong></td></tr>
                      <tr><td>Maintenance</td><td>{d.maintenanceDose}</td></tr>
                      <tr><td>Extended (&gt;6 months)</td><td>{d.extendedDose}</td></tr>
                      <tr><td>Renal note</td><td style={{ fontSize: "0.87em", color: "#4b5563" }}>{d.renalNote}</td></tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LMWH */}
        {activeTab === "lmwh" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">LMWH Dosing</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">Dose based on actual body weight. Round to nearest pre-filled syringe to facilitate self-administration.</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Dose</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {lmwhRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.drug}</strong></td>
                      <td>{r.dose}</td>
                      <td style={{ fontSize: "0.87em" }}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">LMWH Advantages Over UFH</h2>
              <ul className="list-none p-0 space-y-1">
                <li>More predictable anticoagulant effect — fixed weight-based dosing</li>
                <li>Longer duration of action — enables once-daily treatment</li>
                <li>Lower risk of HIT than UFH</li>
                <li>Less effect on bone metabolism</li>
                <li>No routine laboratory monitoring required</li>
                <li>Can be self-administered at home</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Renal insufficiency (CrCl &lt;30):</strong> Therapeutic LMWH generally avoided due to accumulation. Enoxaparin monograph allows 1 mg/kg OD in this setting. Tinzaparin has data showing no accumulation down to CrCl 20 mL/min. Guidelines recommend against routine anti-Xa monitoring for dose adjustment — consider UFH or specialist consultation instead.
            </div>
          </div>
        )}

        {/* WARFARIN / UFH */}
        {activeTab === "warfarin" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Warfarin</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Must overlap with LMWH or UFH for <strong>≥5 days</strong> AND until INR ≥2.0 on 2 consecutive days</li>
                <li>Initial dosing typically 5 mg OD — use standardised nomograms; therapeutic dose highly variable</li>
                <li>Frequent INR monitoring until stable; then every 2–4 weeks</li>
                <li>Community pharmacist INR monitoring available at some centres — ask patient's pharmacy</li>
                <li>Many drug-food interactions — alcohol, St. John's Wort affect INR</li>
                <li>Maintain <em>consistent</em> (not restricted) vitamin K intake — low intake causes unstable INR</li>
                <li>New medications or concurrent illness → increase monitoring frequency</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Unfractionated Heparin (UFH)</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Reserve for:</strong> high bleeding risk (rapid reversal needed), CrCl &lt;15–20, or DVT near concurrent thrombolytic therapy</li>
                <li>Narrow therapeutic range; inter-individual variation; requires aPTT monitoring</li>
                <li>Higher HIT risk and higher bleeding risk vs. LMWH</li>
              </ul>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                <strong>IV dosing:</strong> Bolus 5,000 U (or 80 U/kg) → infusion 18–20 U/kg/hr, adjusted to local aPTT target. Use standardised nomograms.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                <strong>SC dosing (no aPTT monitoring):</strong> 333 U/kg SC initial → 250 U/kg SC BID. Contraindicated if creatinine &gt;200 µmol/L.
              </p>
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="grid gap-3.5">
            {specialRows.map((s, i) => (
              <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ borderLeft: "3px solid var(--primary)" }}>
                <h3 style={{ margin: "0 0 0.4rem", color: "var(--foreground)", fontSize: "1em" }}>{s.situation}</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4" style={{ margin: "0 0 0.3rem" }}>{s.management}</p>
                <p style={{ margin: 0, fontSize: "0.84em", color: "#1d4ed8", fontWeight: 500 }}>
                  {["cvad","cancer","pregVte","vcFilter","aps"].includes(s.key) ? <>See <GuideLink to={s.key} /></> : s.key}
                </p>
              </div>
            ))}
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
                Version 80, updated 2025-11-02.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
