import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "dvt", label: "DVT Diagnosis" },
  { id: "pe", label: "PE Diagnosis" },
  { id: "special", label: "Special Considerations" },
  { id: "references", label: "References" },
];

const references = [
  "Al Lawati K, et al. J Thromb Haemost 2020;18(2):373-380.",
  "Bates SM, et al. Blood Adv 2018;2(22):3317-3359.",
  "Bellesini M, et al. J Thromb Haemost 2021.",
  "Chan WS, et al. J Obstet Gynaecol Can 2014;36(6):527-553.",
  "Righini M, et al. Ann Intern Med 2018;169(11):766-773.",
  "Van der Pol LM, et al. N Engl J Med 2019;380:1139-1149.",
];

export function PregnancyDvtPeDiagnosisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Clinical Guide</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Pregnancy: Diagnosis of DVT and PE</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Diagnostic strategies for suspected deep vein thrombosis and pulmonary embolism in pregnant patients — adapted clinical prediction, D-dimer interpretation, compression ultrasonography, and the Pregnancy-Adapted YEARS algorithm.
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
              <h2 className="text-base font-semibold mb-2">Diagnostic Challenge in Pregnancy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Diagnosing DVT and PE in pregnancy is uniquely challenging because many signs and symptoms of venous thromboembolism overlap with normal physiological changes of pregnancy. Failure to diagnose can be fatal; overdiagnosis leads to unnecessary anticoagulation with associated bleeding risk.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">DVT in Pregnancy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Laterality</span>
                  <span className="text-sm">~80% left-sided (uterine compression of left iliac vein)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</span>
                  <span className="text-sm">More often ilio-femoral (proximal) compared to non-pregnant patients</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Symptoms overlap</span>
                  <span className="text-sm">Leg swelling, discomfort, and edema are common in normal pregnancy</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">PE in Pregnancy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dyspnea</span>
                  <span className="text-sm">Common in normal pregnancy (physiological hyperventilation)</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chest pain</span>
                  <span className="text-sm">May occur from musculoskeletal causes or reflux in pregnancy</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tachycardia</span>
                  <span className="text-sm">Heart rate rises 10-20 bpm in normal pregnancy</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Standard clinical prediction rules (Wells score) are NOT validated in pregnancy.</strong> Modified approaches are needed for both DVT and PE diagnosis in pregnant patients.
            </div>
          </div>
        )}

        {/* DVT DIAGNOSIS */}
        {activeTab === "dvt" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">DVT Diagnostic Algorithm (Adapted from SOGC)</h2>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">1</div>
                  <div className="ml-2">
                    <strong>Clinical suspicion of DVT</strong>
                    <p>Perform compression ultrasonography (CUS) of the symptomatic leg.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">2</div>
                  <div className="ml-2">
                    <strong>CUS Positive</strong>
                    <p>DVT confirmed. Initiate anticoagulation treatment.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3</div>
                  <div className="ml-2">
                    <strong>CUS Negative but high clinical suspicion</strong>
                    <p>Repeat CUS in 3-7 days.</p>
                    <p>Consider iliac vein assessment (Doppler or MRV) — iliac DVT is more common in pregnancy due to uterine compression.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">4</div>
                  <div className="ml-2">
                    <strong>Single negative CUS</strong>
                    <p>Systematic review evidence supports that a single negative CUS can safely rule out DVT in pregnancy.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">D-dimer in Pregnancy for DVT</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                D-dimer has traditionally been <strong>discouraged</strong> in pregnancy because levels rise physiologically throughout gestation and are highest in the 3rd trimester, reducing specificity.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem" }}>
                However, recent systematic review and meta-analysis found that D-dimer is <strong>highly sensitive</strong> in pregnancy with a <strong>very high negative predictive value (NPV 100%, 95% CI 99.1-100%)</strong>. This supports incorporation of D-dimer into diagnostic algorithms for pregnant patients.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Clinical Prediction Rules</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The <strong>LEFT clinical prediction rule</strong> (LEft leg, Edema, First Trimester) has been evaluated for DVT in pregnancy but is <strong>not yet widely validated</strong>. Standard Wells score is not validated in pregnancy.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Key point:</strong> Iliac vein DVT is significantly more common in pregnancy. Standard CUS may miss isolated iliac vein thrombosis — consider Doppler assessment or MRV when clinical suspicion is high and CUS is negative.
            </div>
          </div>
        )}

        {/* PE DIAGNOSIS */}
        {activeTab === "pe" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pregnancy-Adapted YEARS Algorithm</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginBottom: "0.5rem" }}>
                <em>Van der Pol LM, et al. N Engl J Med 2019</em>
              </p>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">1</div>
                  <div className="ml-2">
                    <strong>Assess 3 YEARS Criteria</strong>
                    <ul className="list-none p-0 space-y-1">
                      <li>Signs and symptoms of DVT</li>
                      <li>Hemoptysis</li>
                      <li>PE is the most likely diagnosis</li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">2</div>
                  <div className="ml-2">
                    <strong>Measure D-dimer</strong>
                    <p>Apply pregnancy-adapted thresholds based on YEARS criteria results.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3</div>
                  <div className="ml-2">
                    <strong>Interpret Results</strong>
                    <p><strong>NO YEARS criteria</strong> AND D-dimer &lt;1000 ng/mL → <span style={{ color: "var(--tone-green-text)", fontWeight: 600 }}>PE excluded</span></p>
                    <p><strong>1 or more YEARS criteria</strong> AND D-dimer &lt;500 ng/mL → <span style={{ color: "var(--tone-green-text)", fontWeight: 600 }}>PE excluded</span></p>
                    <p><strong>Otherwise</strong> → Proceed to <span style={{ color: "var(--tone-danger-text)", fontWeight: 600 }}>CTPA</span></p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5" style={{ margin: "0.75rem 0 0" }}>
                <strong>Impact:</strong> The Pregnancy-Adapted YEARS algorithm safely reduced CT imaging by approximately 40% in pregnant women with suspected PE.
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Imaging Considerations in Pregnancy</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Modality</th>
                    <th>Maternal Breast Radiation</th>
                    <th>Fetal Radiation</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>CTPA</strong></td>
                    <td style={{ color: "var(--tone-danger-text)" }}>Higher</td>
                    <td style={{ color: "var(--tone-green-text)" }}>Lower</td>
                    <td>Preferred if high clinical suspicion; widely available; rapid results</td>
                  </tr>
                  <tr>
                    <td><strong>V/Q Scan</strong></td>
                    <td style={{ color: "var(--tone-green-text)" }}>Lower</td>
                    <td style={{ color: "var(--tone-danger-text)" }}>Higher</td>
                    <td>Lower breast dose; may contaminate breastmilk for 24-48h (radioisotopes)</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                Both CTPA and V/Q scan are acceptable in pregnancy. Fetal radiation exposure from either modality is <strong>well below harmful thresholds</strong>.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Technical Adaptations for Pregnancy</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Adapted CT protocols account for pregnancy hemodynamic changes (increased cardiac output) requiring timing optimization for contrast bolus</li>
                <li>Both modalities should be available at centers managing pregnant patients with suspected PE</li>
                <li>The risk of undiagnosed PE far outweighs the small radiation risk to the fetus from either imaging modality</li>
              </ul>
            </div>
          </div>
        )}

        {/* SPECIAL CONSIDERATIONS */}
        {activeTab === "special" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Postpartum Period</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                In the postpartum period, investigate for VTE as in non-pregnant patients using standard algorithms (Wells score, D-dimer, CTPA/V/Q). However, remember that the <strong>postpartum period carries the highest VTE risk</strong> — maintain a higher index of suspicion.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Breastfeeding and Imaging</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CT scan (CTPA)</span>
                  <span className="text-sm" style={{ color: "var(--tone-green-text)" }}>Safe in breastfeeding — no interruption needed</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">V/Q scan</span>
                  <span className="text-sm" style={{ color: "var(--tone-orange-text)" }}>Radioisotopes may contaminate breastmilk for 24-48 hours — pump and discard during this period</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Hemodynamically unstable patient with clinical suspicion of PE:</strong> Treat empirically with anticoagulation. Confirm diagnosis with imaging when the patient is stabilized. Do not delay treatment for diagnostic workup.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Summary of Key Principles</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Standard clinical prediction rules (Wells) are not validated in pregnancy — use pregnancy-adapted algorithms</li>
                <li>CUS is the first-line investigation for suspected DVT in pregnancy</li>
                <li>The Pregnancy-Adapted YEARS algorithm can safely reduce unnecessary CT imaging for suspected PE</li>
                <li>D-dimer has a very high NPV in pregnancy despite rising physiological levels</li>
                <li>Both CTPA and V/Q are safe — fetal radiation is well below harmful levels</li>
                <li>The postpartum period is the highest-risk time for VTE — investigate promptly</li>
              </ul>
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
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink> | <GuideLink to="pregProphylaxis">Pregnancy: Thromboprophylaxis</GuideLink> | <GuideLink to="peDiagnosis">PE Diagnosis</GuideLink> | <GuideLink to="dvtDiagnosis">DVT Diagnosis</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
