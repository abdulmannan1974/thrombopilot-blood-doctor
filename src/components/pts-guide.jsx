import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Diagnosis & Risk Factors", "Prevention", "Treatment", "References"];

const riskFactors = [
  { factor: "Recurrent ipsilateral DVT", impact: "6-fold ↑ risk", modifiable: "Yes — adequate duration of anticoagulation" },
  { factor: "Iliofemoral DVT (extensive)", impact: "2–4 fold ↑ vs distal DVT", modifiable: "Consider thrombolysis in select cases" },
  { factor: "Higher BMI (≥35)", impact: "Increased risk", modifiable: "Weight management" },
  { factor: "Preexisting chronic venous insufficiency", impact: "~2-fold ↑", modifiable: "Assess contralateral leg at baseline" },
  { factor: "Subtherapeutic INR (>50% time in first 3 months)", impact: "Increased risk", modifiable: "Optimize early anticoagulation quality" },
  { factor: "Residual thrombosis on ultrasound", impact: "OR ~2", modifiable: "No — but modest effect" },
  { factor: "Persistent elevated D-dimer", impact: "Modest risk factor", modifiable: "No" },
  { factor: "DVT in pregnancy", impact: "Increased risk", modifiable: "Ensure adequate treatment" },
];

const villaltaScale = [
  { symptom: "Pain", scored: "0–3 (severity)" },
  { symptom: "Cramps", scored: "0–3" },
  { symptom: "Heaviness", scored: "0–3" },
  { symptom: "Paresthesia", scored: "0–3" },
  { symptom: "Pruritus", scored: "0–3" },
  { symptom: "Pretibial edema", scored: "0–3 (clinical sign)" },
  { symptom: "Skin induration", scored: "0–3" },
  { symptom: "Hyperpigmentation", scored: "0–3" },
  { symptom: "Redness", scored: "0–3" },
  { symptom: "Venous ectasia", scored: "0–3" },
  { symptom: "Pain on calf compression", scored: "0–3" },
];

const soxPtsItems = [
  { predictor: "Iliac vein DVT", points: "+1" },
  { predictor: "BMI ≥ 35 kg/m²", points: "+2" },
  { predictor: "Moderate-severe Villalta score at DVT diagnosis", points: "+1" },
];

const preventionStrategies = [
  { strategy: "Prevent DVT (primary prevention)", detail: "Best prevention of PTS is preventing DVT. Ipsilateral DVT recurrence is the strongest modifiable risk factor.", badge: "Most important", badgeClass: "asa-badge asa-badge-blue" },
  { strategy: "Adequate anticoagulation", detail: "Therapeutic, adequate duration of anticoagulation for the initial DVT is critical. Subtherapeutic anticoagulation in first 3 months increases PTS risk.", badge: "Essential", badgeClass: "asa-badge asa-badge-blue" },
  { strategy: "Elastic compression stockings (ECS)", detail: "Routine use for 2 years to prevent PTS is NO LONGER recommended (SOX trial: no benefit). Can be used for symptom relief. If used: knee-length, 20–30 mmHg. Most can stop at 6 months if no PTS.", badge: "Not routine", badgeClass: "asa-badge asa-badge-amber" },
  { strategy: "Thrombolysis (select cases)", detail: "Catheter-directed thrombolysis for extensive iliofemoral DVT, symptoms <14 days, low bleeding risk, long life expectancy. Three RCTs of PCDT showed no overall PTS reduction, but possible severity reduction in iliofemoral DVT long-term.", badge: "Selected cases", badgeClass: "asa-badge asa-badge-orange" },
  { strategy: "DOAC/LMWH over VKA", detail: "Growing evidence that LMWH and DOACs (particularly rivaroxaban) may be superior to VKA for PTS prevention — possibly due to stable anticoagulation and anti-inflammatory properties. Awaiting confirmation from clinical trials.", badge: "Emerging evidence", badgeClass: "asa-badge asa-badge-blue" },
  { strategy: "Adjunctive anti-inflammatory agents", detail: "Low-dose colchicine (Conquer-DVT trial) and statins (SAVER trial) are currently under investigation as adjuncts to anticoagulation for PTS prevention.", badge: "Under investigation", badgeClass: "asa-badge asa-badge-amber" },
];

const treatmentOptions = [
  { treatment: "Elastic compression stockings (ECS)", detail: "Daily use can reduce swelling and discomfort. Knee-length, 20–30 mmHg. Use as long as symptomatic.", evidence: "Symptomatic relief; limited disease-modifying evidence" },
  { treatment: "Exercise training program", detail: "Improves QOL and PTS symptoms. Structured program recommended.", evidence: "RCT: improved patient-reported outcomes" },
  { treatment: "Intermittent pneumatic compression (IPC)", detail: "For severe, intractable PTS symptoms or severe edema. Cumbersome and expensive.", evidence: "Symptomatic benefit in severe cases" },
  { treatment: "Venowave® device", detail: "Portable, battery-powered intermittent compression. Benefits some with moderate-severe PTS.", evidence: "Limited data" },
  { treatment: "Wound care for venous ulcers", detail: "Compression therapy, leg elevation, topical dressings. Refractory cases → dermatology/wound clinic referral. Rule out concurrent PAD if not healing.", evidence: "Standard care; ulcers tend to recur" },
  { treatment: "Endovascular recanalization", detail: "Increasing use for obstructive proximal (iliac) PTS. Rivaroxaban alone (without aspirin) maintained intra-stent patency at 6 months (ARIVA trial). C-TRACT trial ongoing.", evidence: "Uncontrolled studies encouraging; RCTs pending" },
  { treatment: "Venoactive drugs (e.g. MPFF)", detail: "No current evidence of benefit. MUFFIN-PTS trial ongoing for MPFF.", evidence: "Not recommended outside trials" },
  { treatment: "Diuretics", detail: "No evidence for PTS-related edema.", evidence: "Not recommended" },
];

const references = [
  "Avila L, et al. Clinical care of pediatric PTS. J Thromb Haemost. 2024;22(2):365-378.",
  "Barco S, et al. Rivaroxaban for venous stent patency (ARIVA). Circulation 2025;151(12):835-846.",
  "Galanaud J, et al. 25 vs 35 mmHg ECS for PTS prevention (CELEST). Lancet Haematol. 2022;9(12):e886-e896.",
  "Kahn SR, et al. Compression stockings to prevent PTS (SOX trial). Lancet 2014;383(9920):880-888.",
  "Kahn SR, et al. PTS: AHA scientific statement. Circulation 2014;130(18):1636-1661.",
  "Rabinovich A, et al. SOX-PTS score for PTS prediction. J Thromb Haemost. 2020;18:1381-1389.",
  "Vedantham S, et al. PCDT for DVT (ATTRACT). N Engl J Med 2017;377:2240-2252.",
];

export function PtsGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h1 className="text-2xl font-bold leading-tight mt-1">Post-Thrombotic Syndrome (PTS)</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          PTS develops in 20–50% of DVT patients. Prevention centers on adequate anticoagulation and preventing recurrent ipsilateral DVT. Routine ECS for 2 years is no longer recommended.
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
              PTS is a chronic condition: leg pain, swelling, heaviness, skin changes, and in severe cases venous ulcers. Develops 3–6 months to 2 years post-DVT. ~60% recover fully; ~30% develop some PTS; ~5–10% develop severe PTS.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Incidence post-DVT</span><span className="text-sm">20–50%</span></div>
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severe PTS</span><span className="text-sm">5–10%</span></div>
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upper extremity PTS</span><span className="text-sm">Up to 15%</span></div>
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Strongest modifiable risk factor</span><span className="text-sm">Ipsilateral DVT recurrence (6× ↑)</span></div>
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diagnosis</span><span className="text-sm">Clinical (Villalta scale) — no gold standard lab/imaging test</span></div>
              <div className="rounded-lg border p-3"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Defer diagnosis until</span><span className="text-sm">3–6 months after acute DVT (acute symptoms need to resolve)</span></div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Pathophysiology</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                DVT → residual venous obstruction + valvular reflux → venous hypertension + inflammation → leg swelling, reduced calf muscle/skin perfusion, increased vascular permeability → PTS symptoms and skin changes.
              </p>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Villalta PTS Scale (ISTH Standard)</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead><tr><th>Item</th><th>Scoring</th></tr></thead>
                  <tbody>
                    {villaltaScale.map((v) => (
                      <tr key={v.symptom}><td>{v.symptom}</td><td>{v.scored}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem" }}>
                Total 0–4 = no PTS; 5–9 = mild; 10–14 = moderate; ≥15 or venous ulcer = severe PTS.
              </p>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Risk Factors for Developing PTS</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead><tr><th>Risk Factor</th><th>Impact</th><th>Modifiable?</th></tr></thead>
                  <tbody>
                    {riskFactors.map((r) => (
                      <tr key={r.factor}>
                        <td style={{ fontWeight: 600 }}>{r.factor}</td>
                        <td>{r.impact}</td>
                        <td>{r.modifiable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">SOX-PTS Prediction Score</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead><tr><th>Predictor</th><th>Points</th></tr></thead>
                  <tbody>
                    {soxPtsItems.map((s) => (
                      <tr key={s.predictor}><td>{s.predictor}</td><td style={{ fontWeight: 600 }}>{s.points}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
                Score ≥4: OR 5.9 for developing PTS vs score 0.
              </p>
            </div>
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>NOT risk factors for PTS:</strong> Age, sex, inherited thrombophilia, provoked vs unprovoked DVT, duration or intensity of long-term anticoagulation.
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid gap-3.5">
            {preventionStrategies.map((p) => (
              <div key={p.strategy} className="rounded-xl border bg-card shadow-sm p-5">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="text-base font-semibold mb-2" style={{ margin: 0 }}>{p.strategy}</h3>
                  <span className={p.badgeClass}>{p.badge}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">{p.detail}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 3 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Limited evidence-based treatments exist for established PTS.</strong> Management is primarily symptomatic. No diuretics or venoactive drugs are currently recommended outside of trials.
            </div>
            {treatmentOptions.map((t) => (
              <div key={t.treatment} className="rounded-xl border bg-card shadow-sm p-5">
                <h3 className="text-base font-semibold mb-2">{t.treatment}</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">{t.detail}</p>
                <p className="text-sm text-foreground leading-relaxed mb-4" style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.25rem" }}>Evidence: {t.evidence}</p>
              </div>
            ))}
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Pediatrics</h3>
              <ul className="list-none p-0 space-y-1">
                <li>PTS incidence: up to 15% in children with DVT (some studies report higher)</li>
                <li>No pediatric RCTs for PTS therapy exist</li>
                <li>Symptomatic management may follow adult guidelines; start with lower strength ECS (15–20 mmHg)</li>
                <li>Pediatric hematology expertise recommended</li>
              </ul>
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
                <p>Related: <GuideLink to="dvtTreatment">DVT Treatment</GuideLink> | <GuideLink to="vteDuration">VTE Duration</GuideLink> | <GuideLink to="dvtDiagnosis">DVT Diagnosis</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
