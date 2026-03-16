import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "wellsscore", label: "Wells Score" },
  { id: "ddimer", label: "D-dimer" },
  { id: "imaging", label: "Ultrasound" },
  { id: "algorithm", label: "Algorithm" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const wellsItems = [
  { criterion: "Active cancer (treatment ongoing, within 6 months, or palliative)", points: "+1" },
  { criterion: "Paralysis, paresis, or recent plaster immobilisation of lower extremity", points: "+1" },
  { criterion: "Recently bedridden for >3 days or major surgery within 12 weeks", points: "+1" },
  { criterion: "Localised tenderness along the distribution of the deep venous system", points: "+1" },
  { criterion: "Entire leg swelling", points: "+1" },
  { criterion: "Calf swelling ≥3 cm larger than asymptomatic leg (measured 10 cm below tibial tuberosity)", points: "+1" },
  { criterion: "Pitting oedema confined to the symptomatic leg", points: "+1" },
  { criterion: "Collateral superficial veins (non-varicose)", points: "+1" },
  { criterion: "Previously documented DVT", points: "+1" },
  { criterion: "Alternative diagnosis at least as likely as DVT", points: "–2" },
];

const ddimmerRows = [
  {
    threshold: "Standard (fixed)",
    cutoff: "500 µg/L (FEU) — most labs",
    use: "DVT unlikely PTP: negative D-dimer excludes DVT",
    notes: "Sensitivity >90% with validated high-sensitivity assay",
  },
  {
    threshold: "Age-adjusted",
    cutoff: "Age × 10 µg/L (FEU) in patients >50 years",
    use: "May be used when using 3-level Wells score",
    notes: "Emerging evidence supports safety; less data for DVT specifically",
  },
  {
    threshold: "Probability-specific",
    cutoff: "Varies by PTP tier",
    use: "For 3-level Wells score stratification",
    notes: "Limited validation in DVT; more established in PE",
  },
];

const cusRows = [
  {
    type: "Proximal CUS (femoral + popliteal veins)",
    advantage: "Quick, widely available; avoids over-detection of isolated distal DVT",
    disadvantage: "Requires repeat CUS at 5–7 days if initial negative + high/likely PTP",
    recommendation: "Standard approach",
  },
  {
    type: "Whole-leg CUS (proximal + distal calf veins)",
    advantage: "If negative, no repeat CUS needed; detects distal extension risk earlier",
    disadvantage: "Over-diagnoses isolated distal DVT → management uncertainty",
    recommendation: "Acceptable alternative; discuss distal DVT management",
  },
];

const distalExtensionRisk = [
  "Positive D-dimer",
  "Calf DVT that is extensive or close to proximal veins",
  "Absence of a reversible provoking risk factor",
  "Active cancer",
  "Previous history of VTE",
  "Lower extremity immobilisation (plaster casting, neuromuscular disease)",
  "Inpatient status",
];

const references = [
  "Bates SM, et al. Diagnosis of DVT: ACCP Evidence-Based Clinical Practice Guidelines 9th ed. Chest 2012;141(2 Suppl):e351S-418S.",
  "Kearon C, et al. Diagnosis of DVT with D-dimer adjusted to clinical probability. BMJ 2022;376:e067378.",
  "Linkins LA, et al. Selective D-dimer testing for diagnosis of first suspected DVT. Ann Intern Med 2013;158:93-100.",
  "Riva N, et al. Age-adjusted D-dimer to rule out DVT: PALLADIO algorithm. J Thromb Haemost 2018;16:271-278.",
  "Kleinjan A, et al. Safety and feasibility of an algorithm for suspected UEDVT. Ann Intern Med 2014;160(7):451-457.",
  "Mazzolai L, et al. Diagnosis and management of acute DVT: ESC consensus. Eur Heart J 2018;39(47):4208-4218.",
  "Lim W, et al. ASH 2018 guidelines for management of VTE: Diagnosis of VTE. Blood Adv 2018;2(22):3226-3256.",
  "Monagle P, et al. ASH 2018 guidelines: treatment of pediatric VTE. Blood Adv 2018;2(22):3292-3316.",
  "Chan WS, et al. VTE and antithrombotic therapy in pregnancy: SOGC guidelines. J Obstet Gynaecol Can 2014;36(6):527-553.",
  "NICE. Venous Thromboembolic Diseases: Diagnosis, Management and Thrombophilia Testing. 2015.",
];

export function DvtDiagnosisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Version 60 · May 2025</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">DVT: Diagnosis</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Evidence-based approach to evaluating patients with suspected acute deep vein thrombosis — using pre-test probability, D-dimer, and compression ultrasound.
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
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Epidemiology</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Annual DVT cases (estimated)</span>
                  <span className="text-sm">~45,000</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Population incidence</span>
                  <span className="text-sm">1–2 per 1,000/year</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DVTs per solo family practice/year</span>
                  <span className="text-sm">2–4</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">% suspected DVT that is confirmed</span>
                  <span className="text-sm">Only 10–20%</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Anatomy: Proximal vs. Distal DVT</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proximal veins</span>
                  <span className="text-sm">Popliteal, femoral, common femoral, external iliac — higher PE risk; anticoagulation indicated</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Distal (calf) veins</span>
                  <span className="text-sm">Posterior/anterior tibial, peroneal — lower PE risk; ~20% extend proximally; treatment is case-by-case</span>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                <strong>Important:</strong> The <em>superficial femoral vein</em> (also called the femoral vein) is a <strong>deep vein</strong> — not superficial. This has critical therapeutic implications.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Diagnostic Triad</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step 1</span>
                  <span className="text-sm">Pre-test probability (Wells Score — 2-level preferred)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step 2</span>
                  <span className="text-sm">D-dimer (high-sensitivity assay)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step 3</span>
                  <span className="text-sm">Compression Ultrasound (proximal or whole-leg)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WELLS SCORE */}
        {activeTab === "wellsscore" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Two-Level Wells Score Criteria</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Clinical Finding</th>
                    <th style={{ textAlign: "center" }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {wellsItems.map((w, i) => (
                    <tr key={i} style={w.points === "–2" ? { background: "#fff7ed" } : {}}>
                      <td>{w.criterion}</td>
                      <td style={{ textAlign: "center", fontWeight: 700, color: w.points === "–2" ? "#dc2626" : "#1d4ed8" }}>
                        {w.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Score Interpretation (2-Level)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#16a34a" }}>DVT Unlikely</span>
                  <span className="text-sm">Score ≤1 → proceed to D-dimer</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={{ color: "#dc2626" }}>DVT Likely</span>
                  <span className="text-sm">Score ≥2 → proceed directly to CUS</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Clinical decision rule mandate:</strong> A validated clinical decision rule (Wells Score or equivalent) <em>must</em> be used in every DVT assessment. Clinical gestalt alone is insufficient.
            </div>
          </div>
        )}

        {/* D-DIMER */}
        {activeTab === "ddimer" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>D-dimer is sensitive but not specific:</strong> Elevated in DVT but also in inflammation, malignancy, pregnancy, surgery, hospitalisation, trauma, and advanced age. Useful to <em>rule out</em> DVT, not to confirm it.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">D-dimer Threshold Options</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Threshold Type</th>
                    <th>Cutoff</th>
                    <th>When to Use</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {ddimmerRows.map((d, i) => (
                    <tr key={i}>
                      <td><strong>{d.threshold}</strong></td>
                      <td>{d.cutoff}</td>
                      <td>{d.use}</td>
                      <td style={{ fontSize: "0.87em" }}>{d.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Community Practice Note</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Community physicians may not receive D-dimer results promptly from outside labs. In these settings, a direct-to-CUS approach for all suspected DVT patients is a reasonable (if more costly) alternative. If CUS is performed without D-dimer: negative proximal CUS + unlikely PTP excludes DVT; negative proximal CUS + likely PTP requires repeat CUS at 5–7 days.
              </p>
            </div>
          </div>
        )}

        {/* ULTRASOUND */}
        {activeTab === "imaging" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Compression Ultrasound (CUS) Options</h2>
              {cusRows.map((c, i) => (
                <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ marginBottom: "0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <strong>{c.type}</strong>
                  <p style={{ margin: "0.3rem 0", fontSize: "0.88em" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>✓ Advantage:</span> {c.advantage}</p>
                  <p style={{ margin: "0.3rem 0", fontSize: "0.88em" }}><span style={{ color: "#dc2626", fontWeight: 600 }}>✗ Disadvantage:</span> {c.disadvantage}</p>
                  <p style={{ margin: 0 }}><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{c.recommendation}</span></p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Isolated Distal DVT: Risk Factors for Proximal Extension</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">~20% of distal DVTs extend proximally. Consider treatment (rather than serial CUS) if any of the following are present:</p>
              <ul className="list-none p-0 space-y-1">
                {distalExtensionRisk.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                Patients unlikely or unable to return for follow-up serial CUS should generally be treated.
              </p>
            </div>
          </div>
        )}

        {/* ALGORITHM */}
        {activeTab === "algorithm" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Suggested Diagnostic Strategy</h2>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">1</div>
                  <div className="ml-2">
                    <strong>History & Physical Exam</strong>
                    <p>Assess all Wells Score components. Also evaluate for PE symptoms.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">2</div>
                  <div className="ml-2">
                    <strong>Calculate Wells Score</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginTop: "0.5rem" }}>
                      <div className="rounded-lg border p-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score ≤1 (Unlikely)</span>
                        <span className="text-sm">→ Send D-dimer</span>
                      </div>
                      <div className="rounded-lg border p-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score ≥2 (Likely)</span>
                        <span className="text-sm">→ Proceed directly to CUS</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3A</div>
                  <div className="ml-2">
                    <strong>Unlikely PTP + D-dimer</strong>
                    <p><strong>Negative D-dimer:</strong> DVT excluded — no further testing needed</p>
                    <p><strong>Positive D-dimer:</strong> → Proximal or whole-leg CUS</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3B</div>
                  <div className="ml-2">
                    <strong>Likely PTP → CUS</strong>
                    <p><strong>Negative proximal CUS:</strong> → D-dimer; if positive or no D-dimer available, repeat CUS in 5–7 days</p>
                    <p><strong>Negative whole-leg CUS:</strong> DVT excluded — no repeat needed</p>
                    <p><strong>Positive CUS (proximal):</strong> DVT confirmed — initiate anticoagulation</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">4</div>
                  <div className="ml-2">
                    <strong>Isolated Distal DVT on Whole-Leg CUS</strong>
                    <p>Offer anticoagulation if severe symptoms or high proximal extension risk; alternatively, serial CUS over 1–2 weeks.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Timing:</strong> If diagnostic testing will be delayed &gt;4 hours in patients with moderate/high or likely PTP, initiate a rapidly-acting anticoagulant (LMWH or DOAC) unless bleeding contraindication exists — while awaiting confirmatory testing.
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Suspected Recurrent DVT (Ipsilateral)</h2>
              <ul className="list-none p-0 space-y-1">
                <li>CUS is problematic — residual compression abnormalities often persist from prior DVT</li>
                <li><strong>Always compare</strong> new CUS to prior studies if available</li>
                <li>Recurrent DVT only definitively diagnosed by: new non-compressibility in previously normal segments, or ≥4 mm increase in compression diameter</li>
                <li>Negative D-dimer makes recurrence less likely; useful when no prior CUS available</li>
                <li>Consult thrombosis expert when no prior CUS is available for comparison</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Upper Extremity DVT (UEDVT)</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Annual incidence ~3/100,000. Most patients have risk factors: CVAD, pacemaker, malignancy. Spontaneous UEDVT often relates to sudden physical effort + thoracic outlet narrowing (Paget-Schroetter / thoracic outlet syndrome).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginTop: "0.75rem" }}>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Low/Unlikely PTP</span>
                  <span className="text-sm">D-dimer first → duplex US if positive; duplex US alone acceptable if D-dimer unavailable</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">High/Likely PTP</span>
                  <span className="text-sm">Duplex ultrasound first-line; if negative but suspicion remains → D-dimer, repeat US, or CT/MRI venography</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pediatric DVT</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Incidence: 0.7–0.14 per 10,000 children — lower than adults</li>
                <li>Usually associated with CVAD, cancer, congenital heart disease, or post-intervention</li>
                <li>Clinical decision rules and D-dimer testing <strong>not validated</strong> in children</li>
                <li>Diagnosis initiated with CUS; may not be accurate for upper extremity veins</li>
                <li>High clinical suspicion + negative CUS: consider MRI or CT</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">DVT in Pregnancy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                See the <GuideLink to="pregDiagnosis">Pregnancy: DVT &amp; PE Diagnosis</GuideLink> guide — special algorithms apply due to altered physiology and D-dimer thresholds during pregnancy.
              </p>
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
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Version 60, updated 2025-05-07.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
