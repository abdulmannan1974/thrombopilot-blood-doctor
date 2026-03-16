import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Prophylaxis by Procedure", "Dosing & Duration", "ASA Evidence", "References"];

const procedures = [
  { procedure: "Hip Arthroplasty (THA)", vteRisk: "High", firstLine: "LMWH or rivaroxaban 10 mg OD (or DOAC alternative)", mechanical: "IPC ± GCS as adjunct", duration: "14–35 days (extended post-discharge)" },
  { procedure: "Knee Arthroplasty (TKA)", vteRisk: "High", firstLine: "LMWH or rivaroxaban 10 mg OD (or DOAC alternative)", mechanical: "IPC ± GCS as adjunct", duration: "14–35 days (extended post-discharge)" },
  { procedure: "Hip Fracture Surgery", vteRisk: "High", firstLine: "LMWH (start on admission if surgery delayed)", mechanical: "IPC if bleeding risk high", duration: "14–35 days" },
  { procedure: "Knee Arthroscopy (minor)", vteRisk: "Low", firstLine: "No routine pharmacologic prophylaxis", mechanical: "Early ambulation", duration: "N/A" },
  { procedure: "Spine Surgery (major)", vteRisk: "Moderate", firstLine: "LMWH or UFH (case-by-case)", mechanical: "IPC if high bleeding risk", duration: "Until discharge" },
  { procedure: "Lower Limb Amputation", vteRisk: "Moderate–High", firstLine: "LMWH", mechanical: "IPC where feasible", duration: "Until discharge / mobilized" },
  { procedure: "Lower Extremity Fracture (non-hip)", vteRisk: "Low–Moderate", firstLine: "Based on individual risk assessment", mechanical: "Early ambulation", duration: "Case-by-case" },
];

const doacOptions = [
  { drug: "Rivaroxaban", dose: "10 mg PO daily", approvedFor: "THA (35 days), TKA (14 days)", note: "Also evaluated as 5-day rivaroxaban → ASA 81 mg (see ASA Evidence tab)" },
  { drug: "Apixaban", dose: "2.5 mg PO BID", approvedFor: "THA (32–38 days), TKA (10–14 days)", note: "Well-studied in ADVANCE trials" },
  { drug: "Dabigatran", dose: "150 mg or 220 mg PO daily", approvedFor: "THA and TKA", note: "110 mg first dose (1–4h post-op), then 220 mg daily; 150 mg daily if CrCl 30–50 or age ≥75" },
];

const asaEvidence = [
  {
    trial: "PREVENT CLOT (O'Toole 2023, NEJM)",
    population: "Extremity fractures treated surgically (n=12,211, mean age 44.6)",
    comparison: "ASA 81 mg BID vs enoxaparin 30 mg BID",
    primaryOutcome: "Death from any cause at 90 days",
    result: "ASA noninferior for mortality; DVT rates low in both groups but slightly higher with ASA; similar major bleeding",
    conclusion: "ASA noninferior for mortality, but less effective for VTE prevention",
  },
  {
    trial: "CRISTAL (Sidhu 2022, JAMA)",
    population: "Hip or knee arthroplasty (n=9,711 of planned 15,562 — stopped early)",
    comparison: "ASA 100 mg daily vs enoxaparin 40 mg daily",
    primaryOutcome: "Symptomatic VTE within 90 days",
    result: "ASA did NOT meet noninferiority criteria",
    conclusion: "ASA alone is less effective than enoxaparin for VTE prevention in arthroplasty",
  },
];

const references = [
  "Anderson DR, et al. Aspirin or rivaroxaban for VTE prophylaxis after hip or knee arthroplasty. N Engl J Med 2018;378:699-707.",
  "Anderson DR, et al. ASH 2019 guidelines for VTE prevention in surgical patients. Blood Adv 2019;3:3898-3944.",
  "Falck-Ytter Y, et al. Prevention of VTE in orthopedic surgery patients. Chest 2012;141(2 Suppl):e278S-325S.",
  "O'Toole R, et al. Aspirin or LMWH for thromboprophylaxis after a fracture. N Engl J Med 2023;388(3):203-213.",
  "Sidhu V, et al. ASA vs enoxaparin in hip or knee arthroplasty (CRISTAL). JAMA 2022;328(8):719-727.",
];

export function ThromboprophylaxisOrthoGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h1 className="text-2xl font-bold leading-tight mt-1">Thromboprophylaxis: Orthopedic Surgery</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Extended thromboprophylaxis (14–35 days) for hip/knee arthroplasty and hip fracture surgery. DOACs are well-evaluated in this setting. ASA alone is less effective than LMWH.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
        {tabs.map((t, i) => (
          <button key={t} className={`asa-tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      <div className="grid gap-4">
        {activeTab === 0 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <strong>Key difference from medical/non-ortho:</strong> Orthopedic surgery patients need <strong>extended prophylaxis (14–35 days post-op)</strong>, including post-discharge. Before prophylaxis was standard, DVT occurred in 40–60% and PE in 5–10%. DOACs (rivaroxaban, apixaban, dabigatran) are well-validated here, unlike in medical or non-ortho settings.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Historic DVT rate (no prophylaxis)</span>
                <span className="text-sm">40–60%</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prophylaxis duration</span>
                <span className="text-sm">14–35 days (extended post-discharge)</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DOACs approved</span>
                <span className="text-sm">Yes — rivaroxaban, apixaban, dabigatran</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ASA alone?</span>
                <span className="text-sm">Less effective than LMWH — avoid if additional VTE risk factors</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Start timing</span>
                <span className="text-sm">~12 hours post-op (morning after surgery)</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pre-discharge USS screening</span>
                <span className="text-sm">NOT recommended (no benefit shown; bleeding with treatment of asymptomatic DVT)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Prophylaxis by Procedure Type</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Procedure</th>
                      <th>VTE Risk</th>
                      <th>First-Line Prophylaxis</th>
                      <th>Mechanical</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures.map((p) => (
                      <tr key={p.procedure}>
                        <td style={{ fontWeight: 600 }}>{p.procedure}</td>
                        <td><span className={`asa-badge ${p.vteRisk === "High" ? "asa-badge-red" : p.vteRisk === "Low" ? "asa-badge-blue" : "asa-badge-amber"}`}>{p.vteRisk}</span></td>
                        <td>{p.firstLine}</td>
                        <td>{p.mechanical}</td>
                        <td>{p.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Longer duration (up to 35 days)</strong> for: bilateral arthroplasty, previous VTE history, substantially impaired mobility at discharge, or rehabilitation patients (continue until discharge from rehab).
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">DOAC Options for Orthopedic Prophylaxis</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr><th>Drug</th><th>Dose</th><th>Approved For</th><th>Notes</th></tr>
                  </thead>
                  <tbody>
                    {doacOptions.map((d) => (
                      <tr key={d.drug}>
                        <td style={{ fontWeight: 600 }}>{d.drug}</td>
                        <td>{d.dose}</td>
                        <td>{d.approvedFor}</td>
                        <td style={{ fontSize: "0.85rem" }}>{d.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">LMWH Dosing — Same as Non-Ortho Guide</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Dalteparin 5,000 U SC daily (standard weight)</li>
                <li>Enoxaparin 40 mg SC daily (reduce to 30 mg if CrCl &lt;30)</li>
                <li>Tinzaparin 4,500 U SC daily</li>
                <li>Weight adjustments same as non-ortho guide</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Patients on Long-Term Anticoagulation</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Use prophylactic doses post-operatively until safe to restart full-dose anticoagulation (usually 48–72 hours). See <GuideLink to="doacsPeriop">DOACs Perioperative Management</GuideLink>.
              </p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Bottom line:</strong> ASA alone is less effective than enoxaparin for VTE prevention in orthopedic surgery. Mortality is similar, but VTE rates are higher with ASA. Avoid ASA alone in patients with additional VTE risk factors.
            </div>
            {asaEvidence.map((a) => (
              <div key={a.trial} className="rounded-xl border bg-card shadow-sm p-5">
                <h3 className="text-base font-semibold mb-2">{a.trial}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Population</span>
                    <span className="text-sm">{a.population}</span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Comparison</span>
                    <span className="text-sm">{a.comparison}</span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary outcome</span>
                    <span className="text-sm">{a.primaryOutcome}</span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result</span>
                    <span className="text-sm">{a.result}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem", fontWeight: 600 }}>
                  Conclusion: {a.conclusion}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 4 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((r) => <li key={r}>{r}</li>)}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="prophylaxisNonOrtho">Non-Ortho Prophylaxis</GuideLink> | <GuideLink to="doacsPeriop">DOACs Perioperative</GuideLink> | <GuideLink to="warfarinPeriop">Warfarin Perioperative</GuideLink> | <GuideLink to="asa">ASA</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
