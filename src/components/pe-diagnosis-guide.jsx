import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "wellsscore", label: "Wells / PERC" },
  { id: "ddimer", label: "D-dimer" },
  { id: "imaging", label: "Imaging" },
  { id: "algorithm", label: "Algorithm" },
  { id: "unstable", label: "Haemodynamic Instability" },
  { id: "references", label: "References" },
];

const wellsPeItems = [
  { criterion: "Clinical signs and symptoms of DVT (minimum: leg swelling and pain on palpation)", points: "+3" },
  { criterion: "PE is the #1 diagnosis, or equally likely", points: "+3" },
  { criterion: "Heart rate >100 bpm", points: "+1.5" },
  { criterion: "Immobilization ≥3 days OR surgery in the previous 4 weeks", points: "+1.5" },
  { criterion: "Previous objectively diagnosed DVT or PE", points: "+1.5" },
  { criterion: "Haemoptysis", points: "+1" },
  { criterion: "Malignancy (on treatment, treated in the last 6 months, or palliative)", points: "+1" },
];

const percItems = [
  "Age <50 years",
  "Heart rate <100 bpm",
  "O₂ saturation ≥95% on room air",
  "No unilateral leg swelling",
  "No haemoptysis",
  "No recent surgery or trauma (within 4 weeks requiring hospitalisation)",
  "No prior DVT or PE",
  "No hormone use (oral contraceptives, hormone replacement, oestrogen treatment)",
];

const imagingComparison = [
  {
    modality: "CTPA (Multidetector CT Pulmonary Angiography)",
    advantages: "Widely available; highly sensitive and specific; rapid results; may identify alternative diagnoses",
    disadvantages: "Radiation (breast cancer risk in young women); contrast nephropathy risk; may detect subsegmental PE of uncertain significance (overdiagnosis risk)",
    when: "First-line in most patients",
  },
  {
    modality: "V/Q Scan (Ventilation-Perfusion Scan)",
    advantages: "No contrast needed; lower radiation; SPECT V/Q: binary result (positive/negative); preferred in pregnant women, renal insufficiency, contrast allergy",
    disadvantages: "Less widely available; non-diagnostic result common if abnormal chest X-ray or lung disease; requires follow-up CUS if non-diagnostic",
    when: "Renal insufficiency, contrast allergy, young women (radiation), pregnancy, normal CXR",
  },
];

const algorithmVariants = [
  {
    name: "Standard algorithm",
    steps: "PTP (Wells or Geneva) → D-dimer (standard or age-adjusted) → CTPA if positive/high PTP",
    detail: "Most commonly used; combines PTP + D-dimer to minimise unnecessary imaging",
  },
  {
    name: "YEARS algorithm",
    steps: "3 Wells criteria (DVT signs, haemoptysis, PE most likely) → No criteria: D-dimer threshold 1000 µg/L → ≥1 criterion: D-dimer threshold 500 µg/L",
    detail: "Increases proportion ruled out without imaging",
  },
  {
    name: "PeGeD algorithm",
    steps: "Wells PTP → Low PTP: D-dimer threshold 1000 µg/L → Moderate PTP: D-dimer threshold 500 µg/L → High PTP: direct imaging (no D-dimer)",
    detail: "Further risk stratification before imaging",
  },
  {
    name: "PERC rule",
    steps: "Low empiric PTP + all 8 PERC criteria met → No further testing required (not even D-dimer)",
    detail: "Avoids D-dimer in very-low-probability patients",
  },
];

const references = [
  "Kearon C, et al. Diagnosis of PE with D-dimer adjusted to clinical probability. N Engl J Med 2019;381(22):2125-2134.",
  "Penaloza A, et al. PERC rule in European patients with low pretest probability (PERCEPIC). Lancet Haematol 2017;4(12):e615-e621.",
  "Roy PM, et al. Derivation and validation of a simple diagnostic algorithm for PE. J Thromb Haemost 2021;19(9):2217-2226.",
  "van der Pol LM, et al. Pregnancy-adapted YEARS algorithm for diagnosis of suspected PE. N Engl J Med 2019;380(12):1139-1149.",
  "Wells PS, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected PE presenting to the ED. Ann Intern Med 2001;135(2):98-107.",
  "Konstantinides SV, et al. 2019 ESC guidelines for the diagnosis and management of acute PE. Eur Heart J 2020;41(4):543-603.",
];

export function PeDiagnosisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Clinical Guide</span>
            <span className="asa-badge">Version 84 · Feb 2026</span>
          </div>
          <h1 className="asa-guide-title">Pulmonary Embolism: Diagnosis</h1>
          <p className="asa-guide-lead">
            Structured approach to suspected PE — pre-test probability, PERC rule, D-dimer thresholds (standard, age-adjusted, YEARS, PeGeD), CTPA vs. V/Q, and haemodynamically unstable PE.
          </p>
        </div>
      </div>

      <div className="asa-tab-bar">
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

      <div className="asa-tab-body">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Epidemiology</h2>
              <div className="asa-ae-grid">
                <div className="asa-ae-card">
                  <span className="asa-ae-label">VTE incidence</span>
                  <span className="asa-ae-value">1–2 per 1,000 adults/year</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">DVT at time of PE diagnosis</span>
                  <span className="asa-ae-value">Clinically evident in only 25–50%</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Fatal within 1st hour of symptoms</span>
                  <span className="asa-ae-value" style={{ color: "#dc2626" }}>5–10% of symptomatic PEs</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label">Unprovoked first-time PE</span>
                  <span className="asa-ae-value">~50%</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Clinical Presentation</h2>
              <div className="asa-ae-grid">
                {[
                  { label: "Sudden dyspnoea", detail: "Most common presenting symptom" },
                  { label: "Pleuritic chest pain", detail: "Sharp, worsens with breathing" },
                  { label: "Haemoptysis", detail: "Suggests pulmonary infarction" },
                  { label: "Syncope", detail: "Suggests high-risk/massive PE" },
                  { label: "Tachycardia / tachypnoea", detail: "Signs of cardiorespiratory compromise" },
                  { label: "Hypotension / shock", detail: "Haemodynamic instability — urgent evaluation" },
                ].map((s, i) => (
                  <div key={i} className="asa-ae-card">
                    <span className="asa-ae-label">{s.label}</span>
                    <span className="asa-ae-value">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Risk Stratification After Diagnosis</h2>
              <p className="asa-section-copy">After PE is confirmed, risk stratification guides site of care:</p>
              <ul className="asa-ind-list">
                <li><strong>Haemodynamic instability</strong> (cardiac arrest, shock, SBP &lt;90 mmHg) → High-risk / massive PE → ICU</li>
                <li><strong>RV dilatation on CTPA/echo + positive troponin/BNP</strong> → Intermediate-risk → hospitalisation</li>
                <li><strong>Stable, no RV dysfunction, no elevated biomarkers</strong> → Low-risk → consider outpatient treatment</li>
              </ul>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Overdiagnosis concern:</strong> CTPA has led to detection of small subsegmental PE of uncertain clinical significance. Use validated algorithms to avoid unnecessary imaging and limit overdiagnosis.
            </div>
          </div>
        )}

        {/* WELLS / PERC */}
        {activeTab === "wellsscore" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Wells Score for PE</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Clinical Criterion</th>
                    <th style={{ textAlign: "center" }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {wellsPeItems.map((w, i) => (
                    <tr key={i}>
                      <td>{w.criterion}</td>
                      <td style={{ textAlign: "center", fontWeight: 700, color: "#1d4ed8" }}>{w.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="asa-ae-grid" style={{ marginTop: "0.75rem" }}>
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#16a34a" }}>PE Unlikely (2-level)</span>
                  <span className="asa-ae-value">Score ≤4 → D-dimer</span>
                </div>
                <div className="asa-ae-card">
                  <span className="asa-ae-label" style={{ color: "#dc2626" }}>PE Likely (2-level)</span>
                  <span className="asa-ae-value">Score &gt;4 → CTPA directly</span>
                </div>
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">PERC Rule (PE Rule-out Criteria)</h2>
              <p className="asa-section-copy">
                In patients with <strong>low empiric pre-test probability</strong>, if <strong>ALL 8 criteria below are met</strong>, no further testing is required — not even D-dimer.
              </p>
              <ul className="asa-ind-list">
                {percItems.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div className="asa-section-card asa-alert asa-alert-blue" style={{ margin: "0.75rem 0 0" }}>
                <strong>PERC criteria must ALL be present</strong> in a patient with low empiric PTP to safely exclude PE without further workup.
              </div>
            </div>
          </div>
        )}

        {/* D-DIMER */}
        {activeTab === "ddimer" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>D-dimer is sensitive but non-specific:</strong> Elevated in malignancy, surgery, hospitalisation, pregnancy, and advanced age. Useful to rule out PE when negative, not to confirm it.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">D-dimer Threshold Strategies</h2>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>Strategy</th>
                    <th>Threshold</th>
                    <th>When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { strategy: "Standard (fixed)", threshold: ">500 µg/L (FEU) for all ages <50", when: "Low/moderate PTP (Wells ≤4)" },
                    { strategy: "Age-adjusted", threshold: ">age × 10 µg/L for patients ≥50 years", when: "Low/moderate PTP in older patients — increases specificity" },
                    { strategy: "YEARS (low PTP tier)", threshold: "1000 µg/L (no YEARS criteria) or 500 µg/L (≥1 YEARS criterion)", when: "When using YEARS algorithm" },
                    { strategy: "PeGeD (low PTP tier)", threshold: "1000 µg/L (low PTP) or 500 µg/L (moderate PTP)", when: "When using PeGeD algorithm" },
                  ].map((d, i) => (
                    <tr key={i}>
                      <td><strong>{d.strategy}</strong></td>
                      <td>{d.threshold}</td>
                      <td>{d.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">YEARS Algorithm (3 Criteria)</h2>
              <ul className="asa-ind-list">
                <li>Signs of DVT</li>
                <li>Haemoptysis</li>
                <li>PE is the most likely diagnosis</li>
              </ul>
              <p className="asa-section-copy">
                <strong>No criteria:</strong> D-dimer threshold = 1000 µg/L<br />
                <strong>≥1 criterion:</strong> D-dimer threshold = 500 µg/L<br />
                Negative D-dimer (at respective threshold) excludes PE without imaging.
              </p>
            </div>
          </div>
        )}

        {/* IMAGING */}
        {activeTab === "imaging" && (
          <div className="asa-sections">
            {imagingComparison.map((img, i) => (
              <div key={i} className="asa-section-card">
                <h2 className="asa-section-title">{img.modality}</h2>
                <p style={{ marginBottom: "0.3rem" }}><span className="asa-badge asa-badge-blue">When to use</span> {img.when}</p>
                <p style={{ margin: "0.4rem 0", fontSize: "0.9em" }}>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>Advantages:</span> {img.advantages}
                </p>
                <p style={{ margin: "0.4rem 0", fontSize: "0.9em" }}>
                  <span style={{ color: "#dc2626", fontWeight: 600 }}>Disadvantages:</span> {img.disadvantages}
                </p>
              </div>
            ))}

            <div className="asa-section-card">
              <h2 className="asa-section-title">Imaging in Pregnancy</h2>
              <p className="asa-section-copy">
                Both CTPA and V/Q scan are safe in pregnancy (risks of undiagnosed PE outweigh fetal radiation risk). V/Q scan preferred when normal CXR. See the <GuideLink to="pregDiagnosis">Pregnancy: DVT &amp; PE Diagnosis</GuideLink> guide.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">When CTPA is Negative but Suspicion Remains High</h2>
              <ul className="asa-ind-list">
                <li>Proceed to V/Q scan — normal V/Q excludes PE</li>
                <li>And/or bilateral proximal CUS of the lower extremities</li>
                <li>Proximal DVT on CUS → treat as PE equivalent</li>
              </ul>
            </div>
          </div>
        )}

        {/* ALGORITHM */}
        {activeTab === "algorithm" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Suggested Diagnostic Strategy</h2>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">1</div>
                  <div className="asa-timeline-content">
                    <strong>Low empiric PTP?</strong>
                    <p>Check all 8 PERC criteria. If all met → PE excluded, no further testing.</p>
                    <p>If any PERC criterion absent → proceed to D-dimer.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">2</div>
                  <div className="asa-timeline-content">
                    <strong>Calculate Wells Score for PE</strong>
                    <p><strong>≤4 (PE Unlikely):</strong> D-dimer using appropriate threshold</p>
                    <p><strong>&gt;4 (PE Likely):</strong> Proceed directly to CTPA</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">3A</div>
                  <div className="asa-timeline-content">
                    <strong>PE Unlikely + D-dimer negative:</strong>
                    <p>PE excluded — no imaging required</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker">3B</div>
                  <div className="asa-timeline-content">
                    <strong>PE Unlikely + D-dimer positive, OR PE Likely → CTPA</strong>
                    <p>Positive CTPA → PE confirmed → anticoagulate</p>
                    <p>Negative CTPA + low/moderate PTP → PE excluded</p>
                    <p>Negative CTPA + high PTP → consider V/Q and/or lower extremity CUS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Timing:</strong> If diagnostic workup will be delayed &gt;4 hours in patients with moderate/high PTP, start an immediate-acting anticoagulant (LMWH or DOAC) unless high bleed risk — hold until testing is done.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Algorithm Variants</h2>
              {algorithmVariants.map((a, i) => (
                <div key={i} className="asa-section-card" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <strong>{a.name}</strong>
                  <p style={{ margin: "0.3rem 0", fontSize: "0.88em" }}>{a.steps}</p>
                  <p style={{ margin: 0, fontSize: "0.85em", fontStyle: "italic", color: "#4b5563" }}>{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HAEMODYNAMIC INSTABILITY */}
        {activeTab === "unstable" && (
          <div className="asa-sections">
            <div className="asa-section-card asa-alert asa-alert-red">
              <strong>Haemodynamic instability (cardiac arrest, shock, SBP &lt;90 mmHg):</strong> Patient may be too unstable for CTPA. Urgent bedside echocardiography is the immediate next step.
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Echocardiographic Assessment</h2>
              <p className="asa-section-copy">
                Obtain urgent echo if patient too unstable to go to CTPA, or while awaiting imaging. Features suggestive of high-risk PE:
              </p>
              <ul className="asa-ind-list">
                <li>Severe right ventricular (RV) dysfunction</li>
                <li>RV size &gt; LV size</li>
                <li>Interventricular septal shift (D-sign)</li>
                <li>Embolus visible in RV or main pulmonary arteries</li>
              </ul>
              <p className="asa-section-copy" style={{ marginTop: "0.75rem" }}>
                <strong>If RV features of high-risk PE present + no alternative diagnosis:</strong> Initiate treatment for PE (thrombolysis or surgical embolectomy).<br />
                <strong>If RV features absent in hypotensive patient:</strong> High-risk PE unlikely (though smaller PE not excluded).
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">After Stabilisation</h2>
              <ul className="asa-ind-list">
                <li>Confirmatory imaging with CTPA or V/Q should be sought when feasible</li>
                <li>Lower extremity CUS is an alternative confirmatory approach (proximal DVT = VTE confirmed)</li>
                <li>RV dysfunction on echo alone is insufficient to confirm PE diagnosis — additional confirmation always preferable</li>
              </ul>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">References</h2>
              <ol className="asa-ref-list">
                {references.map((ref, i) => <li key={i}>{ref}</li>)}
              </ol>
              <p className="asa-section-copy" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Version 84, updated 2026-02-06.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
