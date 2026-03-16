import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = ["Overview", "Testing Recommendations", "Management", "References"];

const homocysteineRanges = [
  { range: "5\u201315 \u00b5mol/L", category: "Normal", clinical: "No increased risk" },
  { range: "15\u201330 \u00b5mol/L", category: "Mild-moderate elevation", clinical: "Common (5\u201312% of population). Causes: enzyme defects, renal insufficiency, hypothyroidism, alcoholism, B12/folate deficiency, drugs (methotrexate, phenytoin, carbamazepine, isoniazid). Weak/inconsistent association with VTE." },
  { range: "> 100 \u00b5mol/L", category: "Homocystinuria", clinical: "Rare genetic disease \u2014 diagnosed in childhood. Severe: premature vascular disease + VTE. Not addressed in this guide." },
];

const keyMessages = [
  { message: "Do NOT test for MTHFR mutations", detail: "Testing is not recommended in any clinical setting \u2014 VTE, arterial thrombosis, or pregnancy complications", badge: "Do not test", badgeClass: "asa-badge asa-badge-red" },
  { message: "Do NOT routinely test homocysteine in VTE patients", detail: "Even if elevated, lowering homocysteine does NOT reduce recurrent VTE risk", badge: "No benefit", badgeClass: "asa-badge asa-badge-red" },
  { message: "Lowering homocysteine does NOT reduce cardiovascular death or MI", detail: "Multiple RCTs and meta-analyses confirm B vitamin supplementation fails to reduce MI or total cardiovascular death", badge: "No benefit for MI/CV death", badgeClass: "asa-badge asa-badge-red" },
  { message: "Possible stroke reduction with B vitamins \u2014 limited, context-specific", detail: "Some evidence for stroke risk reduction with folic acid, particularly in patients with hypertension and eGFR > 50 mL/min, in regions without folate-fortified grains (e.g. CSPPT trial in China: 0.7% ARR)", badge: "Possible benefit \u2014 stroke only", badgeClass: "asa-badge asa-badge-amber" },
];

const mthfrFacts = [
  { label: "Mutation", value: "C677T substitution in MTHFR gene \u2192 reduced enzyme activity \u2192 \u2191 homocysteine" },
  { label: "Heterozygous carriers", value: "~40% of general population" },
  { label: "Homozygous carriers", value: "~10% of general population" },
  { label: "Clinical significance", value: "Unclear in the absence of elevated homocysteine" },
  { label: "Testing recommended?", value: "NO \u2014 in any clinical setting" },
];

const references = [
  "Clarke R, et al. Homocysteine and risk of ischemic heart disease and stroke. JAMA 2002;288(16):2015-2023.",
  "den Heijer M, et al. Homocysteine lowering by B vitamins and secondary prevention of DVT/PE. Blood. 2007;109(1):139-144.",
  "Dong H, et al. B vitamins for stroke prevention: network meta-analysis. PLoS One. 2015;10(9):e0137533.",
  "Hensen ADO, et al. Hyperhomocysteinemia and recurrent VTE: MEGA follow-up study. Br J Haem 2019;187(2):219-226.",
  "Huo Y, et al. Folic acid for primary stroke prevention in hypertension (CSPPT). JAMA. 2015;313(13):1325-35.",
  "Mart\u00ed-Carvajal AJ, et al. Homocysteine lowering for preventing cardiovascular events. Cochrane Database Syst Rev. 2017(8):CD006612.",
  "Ray JG, et al. Homocysteine-lowering therapy and VTE risk. Ann Intern Med. 2007;146(11):761-767.",
  "Spence JD, et al. B vitamins in stroke prevention: time to reconsider. Lancet Neurol. 2017;16(9):750-760.",
];

export function ThrombophiliaHomocysteineGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h1 className="text-2xl font-bold leading-tight mt-1">Thrombophilia: Homocysteinemia &amp; MTHFR</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Bottom line: Do NOT test for MTHFR mutations. Homocysteine testing in VTE is not useful because lowering it does not reduce recurrent VTE, MI, or cardiovascular death.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`asa-tab-btn${activeTab === i ? " active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {/* OVERVIEW */}
        {activeTab === 0 && (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>Key message:</strong> Routine testing for homocysteinemia and MTHFR mutations in patients with VTE is <strong>NOT recommended</strong>. Lowering homocysteine does NOT reduce recurrent VTE.
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">MTHFR at a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mthfrFacts.map((f) => (
                  <div key={f.label} className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</span>
                    <span className="text-sm">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Homocysteine Levels and Clinical Significance</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Category</th>
                      <th>Clinical Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homocysteineRanges.map((r) => (
                      <tr key={r.range}>
                        <td style={{ fontWeight: 600 }}>{r.range}</td>
                        <td>{r.category}</td>
                        <td style={{ fontSize: "0.85rem" }}>{r.clinical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Causes of Mild-Moderate Elevation</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Vitamin B12 or folic acid deficiency</li>
                <li>Renal insufficiency</li>
                <li>Hypothyroidism</li>
                <li>Alcoholism</li>
                <li>Drugs: methotrexate, phenytoin, carbamazepine, isoniazid</li>
                <li>MTHFR C677T homozygosity (10% of population)</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Related Guides</h3>
              <ul className="list-none p-0 space-y-1">
                <li><GuideLink to="fvlPgm">Factor V Leiden &amp; Prothrombin Gene Mutation</GuideLink></li>
                <li><GuideLink to="naturalAnticoag">Natural Anticoagulant Deficiencies (PC, PS, AT)</GuideLink></li>
                <li><GuideLink to="aps">Antiphospholipid Syndrome</GuideLink></li>
              </ul>
            </div>
          </div>
        )}

        {/* TESTING RECOMMENDATIONS */}
        {activeTab === 1 && (
          <div className="grid gap-3.5">
            {keyMessages.map((k) => (
              <div key={k.message} className="rounded-xl border bg-card shadow-sm p-5">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="text-base font-semibold mb-2" style={{ margin: 0 }}>{k.message}</h3>
                  <span className={k.badgeClass}>{k.badge}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">{k.detail}</p>
              </div>
            ))}
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Why MTHFR testing is particularly problematic:</strong> ~40% of the population is heterozygous and ~10% is homozygous. Testing identifies a huge number of &quot;positive&quot; results that have no clear clinical significance (especially in the absence of elevated homocysteine) and cause unnecessary anxiety. The ASH 2023 thrombophilia guidelines explicitly recommend against MTHFR testing.
            </div>
          </div>
        )}

        {/* MANAGEMENT */}
        {activeTab === 2 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">B Vitamin Supplementation &mdash; The Evidence</h3>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary" style={{ background: "var(--danger)" }}>{"\u2717"}</div>
                  <div className="ml-2">
                    <strong>VTE prevention: No benefit</strong>
                    <p>Clinical trials show NO reduction in recurrent VTE with B vitamin supplementation, even in patients with high baseline homocysteine levels.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary" style={{ background: "var(--danger)" }}>{"\u2717"}</div>
                  <div className="ml-2">
                    <strong>MI / cardiovascular death: No benefit</strong>
                    <p>Cochrane meta-analysis confirms no reduction in MI or total cardiovascular death with homocysteine-lowering therapy.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary" style={{ background: "#f59e0b" }}>?</div>
                  <div className="ml-2">
                    <strong>Stroke: Possible benefit &mdash; limited and context-specific</strong>
                    <p>Some evidence of stroke reduction with folic acid, particularly in:</p>
                    <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                      <li>Patients with hypertension</li>
                      <li>eGFR &gt; 50 mL/min/1.73m&sup2; (no benefit if eGFR &lt; 50)</li>
                      <li>Regions without folate-fortified grains (e.g., CSPPT trial in China: 0.7% absolute risk reduction)</li>
                    </ul>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>In countries with folate fortification of grains (Canada, USA), benefit is unlikely and supplementation for primary CV prevention is not recommended.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary" style={{ background: "#6b7280" }}>&mdash;</div>
                  <div className="ml-2">
                    <strong>Obstetric complications: Unknown</strong>
                    <p>Hyperhomocysteinemia has been associated with obstetric complications, but optimal management is unknown.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Pediatrics</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                MTHFR mutation combined with hyperhomocysteinemia is reported to be associated with stroke in children. Pediatric hematologist with thromboembolism expertise should manage where possible.
              </p>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === 3 && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
