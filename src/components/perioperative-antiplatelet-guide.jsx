import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "without-stents", label: "Without Stents" },
  { id: "with-stents", label: "With Stents" },
  { id: "cabg", label: "CABG Management" },
  { id: "references", label: "References" },
];

const p2y12Timing = [
  { agent: "Prasugrel", timing: "7 days before surgery" },
  { agent: "Clopidogrel", timing: "5 days before surgery" },
  { agent: "Ticagrelor", timing: "3\u20135 days before surgery" },
];

const stentTableRows = [
  {
    scenario: "PCI \u226512 months ago",
    recommendation: "Continue ASA perioperatively if surgical bleeding risk allows",
    p2y12: "\u2014",
    urgency: "standard",
  },
  {
    scenario: "Elective PCI (no ACS)",
    recommendation: "Delay elective non-cardiac surgery 6 months (ideally) or minimum 1 month after PCI",
    p2y12: "Continue ASA; interrupt P2Y12 inhibitor pre-operatively",
    urgency: "caution",
  },
  {
    scenario: "PCI for ACS",
    recommendation: "Delay elective surgery 12 months (ideally) or minimum 3 months after PCI",
    p2y12: "Continue ASA; interrupt P2Y12 inhibitor pre-operatively",
    urgency: "caution",
  },
  {
    scenario: "Within 3 months of PCI for ACS",
    recommendation: "Specialist consultation and multidisciplinary discussion required before proceeding",
    p2y12: "Do not interrupt without specialist input",
    urgency: "danger",
  },
  {
    scenario: "High-risk features (prior stent thrombosis, left main PCI)",
    recommendation: "Specialist consultation required regardless of timing",
    p2y12: "Do not interrupt without specialist input",
    urgency: "danger",
  },
];

const references = [
  "Devereaux PJ, et al. Aspirin in patients undergoing noncardiac surgery (POISE-2). N Engl J Med. 2014;370:1494-1503.",
  "Graham MM, et al. Aspirin in patients with previous percutaneous coronary intervention undergoing noncardiac surgery (POISE-2 PCI sub-study). Circulation. 2018;138:1303-1311.",
  "Douketis JD, et al. Perioperative management of antithrombotic therapy. CHEST. 2022;162:e207-e243.",
  "Mehta SR, et al. 2018 Canadian Cardiovascular Society/Canadian Association of Interventional Cardiology focused update: antiplatelet therapy. Can J Cardiol. 2018;34:214-233.",
  "Bainey KR, et al. 2023 CCS/CAIC focused update: antiplatelet therapy guidelines. Can J Cardiol. 2024;40:160-181.",
  "Fleisher LA, et al. 2014 ACC/AHA guideline on perioperative cardiovascular evaluation and management. Circulation. 2014;130:e278-e333.",
  "Rossini R, et al. Perioperative management of antiplatelet therapy in patients with coronary stents. Eur Heart J. 2019;40:3280-3285.",
];

const urgencyColor = (u) => {
  if (u === "danger") return "#dc2626";
  if (u === "caution") return "#d97706";
  return "#16a34a";
};

export function PerioperativeAntiplateletGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Perioperative</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Antiplatelet Therapy</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Clinical Guide</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Perioperative Management of Antiplatelet Therapy</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Balancing the risk of major adverse cardiovascular events (MACE) from interrupting antiplatelet therapy against the risk of perioperative bleeding from continuing therapy.
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
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Key principle:</strong> Risk stratification for perioperative antiplatelet management is largely empiric. Individual patient decisions require balancing thrombotic risk from interruption against bleeding risk from continuation.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Risk Stratification</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#dc2626" }}>High Thrombotic Risk</span>
                  <span className="text-sm">Recent coronary stent (&lt;1 year), recent MI, recent arterial embolism, recent ischaemic stroke</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#16a34a" }}>Low Thrombotic Risk</span>
                  <span className="text-sm">Antiplatelet therapy for primary prevention of cardiovascular events</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">P2Y12 Inhibitor Interruption Timing</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                When P2Y12 inhibitor interruption is required before surgery, the recommended pre-operative hold times vary by agent:
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>P2Y12 Inhibitor</th>
                    <th>Stop Before Surgery</th>
                  </tr>
                </thead>
                <tbody>
                  {p2y12Timing.map((row) => (
                    <tr key={row.agent}>
                      <td><strong>{row.agent}</strong></td>
                      <td className="font-bold text-foreground">{row.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WITHOUT STENTS */}
        {activeTab === "without-stents" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">POISE-2 Trial Evidence</h2>
              <div className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: 0, borderLeft: "3px solid var(--primary)" }}>
                <strong>POISE-2 (N = 10,010)</strong>
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.9em" }}>
                  Continuing or initiating ASA perioperatively in patients undergoing non-cardiac surgery did <strong>not</strong> reduce the rate of major adverse cardiovascular events (MACE), but <strong>did increase</strong> major bleeding (4.6% vs 3.8%).
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">When to Continue ASA</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Carotid endarterectomy</li>
                <li>Recent acute coronary syndrome or ischaemic stroke</li>
                <li>Low-to-moderate surgical bleeding risk procedures</li>
                <li>Surgeries intended to prevent local thrombosis (e.g., lower extremity arterial bypass)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Do NOT initiate ASA</strong> in patients not already taking ASA to reduce perioperative cardiovascular events. POISE-2 showed no benefit and increased bleeding.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">High Bleeding Risk Surgery</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Stop ASA <strong>7 days</strong> before surgery</li>
                <li>Resume ASA within <strong>24 hours</strong> post-operatively once haemostasis is secure</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>P2Y12 monotherapy (without stent):</strong> Limited data available to guide perioperative management. Consider specialist consultation for patients on P2Y12 monotherapy who require surgery.
            </div>
          </div>
        )}

        {/* WITH STENTS */}
        {activeTab === "with-stents" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">POISE-2 PCI Sub-study</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Study Population</span>
                  <span className="text-sm">470 patients with prior PCI</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#16a34a" }}>MIs Prevented</span>
                  <span className="text-sm"><strong>59</strong> per 1,000 patients with perioperative ASA</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#dc2626" }}>Major Bleeds Caused</span>
                  <span className="text-sm"><strong>8</strong> per 1,000 patients with perioperative ASA</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conclusion</span>
                  <span className="text-sm">Benefit of perioperative ASA likely outweighs harm in patients with prior PCI</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Stent Thrombosis Risk Over Time</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#dc2626" }}>First 6 weeks post-stent</span>
                  <span className="text-sm">Highest risk: <strong>8\u201310%</strong> stent thrombosis if DAPT interrupted</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#d97706" }}>6 weeks to 6 months</span>
                  <span className="text-sm">Risk gradually declines</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#16a34a" }}>Beyond 6 months</span>
                  <span className="text-sm">Plateaus at <strong>1\u20132%</strong></span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Management by PCI Timing and Indication</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Clinical Scenario</th>
                    <th>Recommendation</th>
                    <th>P2Y12 Management</th>
                  </tr>
                </thead>
                <tbody>
                  {stentTableRows.map((row, i) => (
                    <tr key={i}>
                      <td>
                        <strong style={{ color: urgencyColor(row.urgency) }}>{row.scenario}</strong>
                      </td>
                      <td style={{ fontSize: "0.87em" }}>{row.recommendation}</td>
                      <td style={{ fontSize: "0.87em" }}>{row.p2y12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CABG MANAGEMENT */}
        {activeTab === "cabg" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>High bleeding risk:</strong> CABG surgery carries a high risk of perioperative bleeding, including the life-threatening complication of cardiac tamponade. Decisions about antiplatelet management must carefully weigh coronary thrombotic complications against perioperative bleeding risk.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Interdisciplinary Assessment Required</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Perioperative antiplatelet management for CABG requires interdisciplinary assessment and shared decision-making involving:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cardiac Surgeon</span>
                  <span className="text-sm">Assesses surgical bleeding risk and timing considerations</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interventional Cardiologist</span>
                  <span className="text-sm">Evaluates coronary anatomy, stent characteristics, thrombotic risk</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attending Physician</span>
                  <span className="text-sm">Coordinates overall care and comorbidity management</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</span>
                  <span className="text-sm">Informed consent and shared decision-making about risks and benefits</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">P2Y12 Inhibitor Management for CABG</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Interrupt P2Y12 inhibitors before CABG according to standard hold times (prasugrel 7 days, clopidogrel 5 days, ticagrelor 3\u20135 days)</li>
                <li>ASA is generally continued through CABG surgery</li>
                <li>Urgent or emergent CABG may require proceeding despite recent P2Y12 inhibitor use, accepting increased bleeding risk</li>
                <li>Platelet function testing may be considered to guide timing in urgent cases</li>
              </ul>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Alert:</strong> Balance coronary thrombotic complications against perioperative bleeding. The consequence of CABG-related major bleeding (cardiac tamponade, death) mandates careful, individualized assessment in all cases.
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">References</h2>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="asa">ASA</GuideLink> | <GuideLink to="daptDuration">DAPT Duration</GuideLink> | <GuideLink to="anticoagAntiplatelet">Anticoagulation + Antiplatelet</GuideLink> | <GuideLink to="doacsPeriop">DOACs Perioperative</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
