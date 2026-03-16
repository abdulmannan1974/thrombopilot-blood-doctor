import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Risk Assessment", "Dosing", "Special Considerations", "References"];

const lmwhDoses = [
  { drug: "Dalteparin", standard: "5,000 U SC daily", lowWeight: "—", highWeight100: "7,500 U SC daily", highWeight120: "7,500 U SC daily (max to 180 kg)", renal: "No dose adjustment" },
  { drug: "Enoxaparin", standard: "40 mg SC daily", lowWeight: "30 mg SC daily", highWeight100: "60 mg SC daily", highWeight120: "0.5 mg/kg SC daily–BID", renal: "30 mg SC daily" },
  { drug: "Tinzaparin", standard: "4,500 U SC daily", lowWeight: "—", highWeight100: "8,000 U SC daily", highWeight120: "75 U/kg SC daily", renal: "No dose adjustment" },
  { drug: "Fondaparinux", standard: "2.5 mg SC daily", lowWeight: "—", highWeight100: "2.5 mg SC daily", highWeight120: "2.5 mg SC daily", renal: "Contraindicated if CrCl <30" },
  { drug: "UFH", standard: "5,000 U SC BID", lowWeight: "2,500 U SC BID", highWeight100: "7,500 U SC BID–TID", highWeight120: "7,500 U SC BID–TID", renal: "No dose adjustment" },
];

const vteRiskFactors = [
  "Stroke with immobility",
  "ICU admission",
  "Active cancer",
  "Age > 60 years",
  "Reduced mobility",
  "History of congestive heart failure",
  "Previous VTE",
  "Known thrombophilia",
  "Fracture in past 3 months",
  "Sepsis",
  "Acute inflammatory conditions",
  "Acute infectious disease (including COVID-19)",
];

const bleedingRisk = [
  { factor: "Known gastroduodenal ulcer", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Major bleeding in past 3 months", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Platelet count < 50 × 10⁹/L", risk: "High", action: "Withhold pharmacologic prophylaxis → use IPC" },
  { factor: "Active bleeding / intracranial hemorrhage", risk: "Contraindication", action: "Absolute contraindication to pharmacologic prophylaxis" },
  { factor: "Planned surgery during admission", risk: "Moderate", action: "Hold prophylaxis 6–12 hours before surgery" },
];

const references = [
  "Barbar S, Prandoni P. Scoring systems for estimating VTE risk in hospitalized medical patients. Semin Thromb Hemost. 2017;43(5):460-468.",
  "CLOTS Trials Collaboration. IPC in reduction of DVT risk in stroke. Lancet 2013;382(9891):516-524.",
  "Dentali F, et al. Anticoagulant prophylaxis to prevent symptomatic VTE in hospitalized medical patients. Ann Intern Med 2007;146(4):278-288.",
  "Eck RJ, et al. Anticoagulants for thrombosis prophylaxis in acutely ill patients: systematic review and network meta-analysis. BMJ 2022;378:070022.",
  "Mottier D, et al. Enoxaparin vs placebo to prevent symptomatic VTE in hospitalized older adults. NEJM Evid 2023;2(8).",
  "Schünemann HJ, et al. ASH 2018 guidelines for VTE prophylaxis in hospitalized medical patients. Blood Adv 2018;2(22):3198-3225.",
];

export function ThromboprophylaxisMedicalGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h1 className="text-2xl font-bold leading-tight mt-1">Thromboprophylaxis: Hospitalized Medical Patients</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          LMWH prophylaxis for acutely ill medical inpatients at increased VTE risk — balanced against bleeding risk. Duration: until discharge only. DOACs NOT recommended in this setting.
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
              <strong>Core principle:</strong> Pharmacologic thromboprophylaxis with LMWH for hospitalized medical patients at increased VTE risk who are not bleeding. Duration: until discharge only (not extended). DOACs are NOT recommended in medical inpatients (higher bleeding risk vs LMWH).
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Key Decision Framework</h3>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">1</div>
                  <div className="ml-2">
                    <strong>Assess VTE risk</strong>
                    <p>Use IMPROVE-DD, Padua, or GENEVA scoring systems. Higher risk: stroke, ICU, active cancer, prior VTE.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">2</div>
                  <div className="ml-2">
                    <strong>Assess bleeding risk</strong>
                    <p>Active GI ulcer, recent major bleed, platelets &lt;50 → use mechanical prophylaxis (IPC) instead.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3</div>
                  <div className="ml-2">
                    <strong>Choose prophylaxis</strong>
                    <p>High VTE risk + acceptable bleeding risk → LMWH. High bleeding risk → IPC, then start LMWH when safe.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">4</div>
                  <div className="ml-2">
                    <strong>Duration: until discharge</strong>
                    <p>Do NOT extend beyond hospitalization. A 2023 NEJM study found no benefit of LMWH beyond 30 days in medical elderly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>DOACs (apixaban, rivaroxaban, etc.):</strong> Should NOT be used for prophylaxis in medically ill hospitalized patients — RCTs show higher bleeding risk compared to LMWH with no clear net benefit.
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">VTE Risk Factors in Medical Inpatients</h3>
              <ul className="list-none p-0 space-y-1">
                {vteRiskFactors.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Scoring systems: IMPROVE-DD, Padua Prediction Score, GENEVA risk score. Computerized risk-assessment tools should be implemented where feasible.
              </p>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Bleeding Risk Factors</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr><th>Factor</th><th>Risk Level</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {bleedingRisk.map((b) => (
                      <tr key={b.factor}>
                        <td>{b.factor}</td>
                        <td><span className={`asa-badge ${b.risk === "Contraindication" ? "asa-badge-red" : "asa-badge-orange"}`}>{b.risk}</span></td>
                        <td>{b.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Pharmacologic Thromboprophylaxis Dosing</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>Standard (40–100 kg)</th>
                      <th>&lt;40 kg</th>
                      <th>100–120 kg</th>
                      <th>&gt;120 kg</th>
                      <th>CrCl &lt;30</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhDoses.map((d) => (
                      <tr key={d.drug}>
                        <td style={{ fontWeight: 600 }}>{d.drug}</td>
                        <td>{d.standard}</td>
                        <td>{d.lowWeight}</td>
                        <td>{d.highWeight100}</td>
                        <td>{d.highWeight120}</td>
                        <td>{d.renal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                LMWH is preferred over UFH (less frequent dosing, lower HIT risk). UFH 5,000 U SC BID is an alternative.
              </p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Ischemic Stroke</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">LMWH prophylaxis as for other medical patients. If contraindicated, use IPC (more effective than elastic compression stockings in immobile stroke patients).</p>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">HIT History</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">Use fondaparinux 2.5 mg SC daily as alternative to UFH/LMWH.</p>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Renal Impairment (CrCl &lt;30 mL/min)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Enoxaparin: reduce to 30 mg SC daily</li>
                <li>Dalteparin / Tinzaparin: no dose adjustment needed</li>
                <li>Fondaparinux: contraindicated</li>
                <li>UFH: no dose adjustment</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Duration — Key Evidence</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Mottier et al. (NEJM Evidence 2023): Enoxaparin vs placebo in medically ill older adults — no benefit of LMWH in preventing symptomatic VTE beyond 30 days, and no difference in major or clinically relevant bleeding. <strong>Continue prophylaxis until discharge only.</strong>
              </p>
            </div>
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
                <p>Related: <GuideLink to="ufhLmwh">UFH, LMWH &amp; Fondaparinux</GuideLink> | <GuideLink to="hit">HIT</GuideLink> | <GuideLink to="covid">COVID-19 Thromboprophylaxis</GuideLink> | <GuideLink to="prophylaxisNonOrtho">Non-Ortho Surgical Prophylaxis</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
