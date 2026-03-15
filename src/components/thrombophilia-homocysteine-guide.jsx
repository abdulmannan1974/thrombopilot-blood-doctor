import { useState } from "react";

const tabs = ["Overview", "Testing Recommendations", "Management", "References"];

const homocysteineRanges = [
  { range: "5–15 µmol/L", category: "Normal", clinical: "No increased risk" },
  { range: "15–30 µmol/L", category: "Mild-moderate elevation", clinical: "Common (5–12% of population). Causes: enzyme defects, renal insufficiency, hypothyroidism, alcoholism, B12/folate deficiency, drugs (methotrexate, phenytoin, carbamazepine, isoniazid). Weak/inconsistent association with VTE." },
  { range: "> 100 µmol/L", category: "Homocystinuria", clinical: "Rare genetic disease — diagnosed in childhood. Severe: premature vascular disease + VTE. Not addressed in this guide." },
];

const keyMessages = [
  { message: "Do NOT test for MTHFR mutations", detail: "Testing is not recommended in any clinical setting — VTE, arterial thrombosis, or pregnancy complications", badge: "Do not test", badgeClass: "asa-badge asa-badge-red" },
  { message: "Do NOT routinely test homocysteine in VTE patients", detail: "Even if elevated, lowering homocysteine does NOT reduce recurrent VTE risk", badge: "No benefit", badgeClass: "asa-badge asa-badge-red" },
  { message: "Lowering homocysteine does NOT reduce cardiovascular death or MI", detail: "Multiple RCTs and meta-analyses confirm B vitamin supplementation fails to reduce MI or total cardiovascular death", badge: "No benefit for MI/CV death", badgeClass: "asa-badge asa-badge-red" },
  { message: "Possible stroke reduction with B vitamins — limited, context-specific", detail: "Some evidence for stroke risk reduction with folic acid, particularly in patients with hypertension and eGFR > 50 mL/min, in regions without folate-fortified grains (e.g. CSPPT trial in China: 0.7% ARR)", badge: "Possible benefit — stroke only", badgeClass: "asa-badge asa-badge-amber" },
];

const mthfrFacts = [
  { label: "Mutation", value: "C677T substitution in MTHFR gene → reduced enzyme activity → ↑ homocysteine" },
  { label: "Heterozygous carriers", value: "~40% of general population" },
  { label: "Homozygous carriers", value: "~10% of general population" },
  { label: "Clinical significance", value: "Unclear in the absence of elevated homocysteine" },
  { label: "Testing recommended?", value: "NO — in any clinical setting" },
];

const references = [
  "Clarke R, et al. Homocysteine and risk of ischemic heart disease and stroke. JAMA 2002;288(16):2015-2023.",
  "den Heijer M, et al. Homocysteine lowering by B vitamins and secondary prevention of DVT/PE. Blood. 2007;109(1):139-144.",
  "Dong H, et al. B vitamins for stroke prevention: network meta-analysis. PLoS One. 2015;10(9):e0137533.",
  "Hensen ADO, et al. Hyperhomocysteinemia and recurrent VTE: MEGA follow-up study. Br J Haem 2019;187(2):219-226.",
  "Huo Y, et al. Folic acid for primary stroke prevention in hypertension (CSPPT). JAMA. 2015;313(13):1325-35.",
  "Martí-Carvajal AJ, et al. Homocysteine lowering for preventing cardiovascular events. Cochrane Database Syst Rev. 2017(8):CD006612.",
  "Ray JG, et al. Homocysteine-lowering therapy and VTE risk. Ann Intern Med. 2007;146(11):761-767.",
  "Spence JD, et al. B vitamins in stroke prevention: time to reconsider. Lancet Neurol. 2017;16(9):750-760.",
];

export function ThrombophiliaHomocysteineGuide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada · Clinical Guide</p>
        <h1 className="asa-guide-title">Thrombophilia: Homocysteinemia & MTHFR</h1>
        <p className="asa-guide-lead">
          Bottom line: Do NOT test for MTHFR mutations. Homocysteine testing in VTE is not useful because lowering it does not reduce recurrent VTE, MI, or cardiovascular death.
        </p>
      </div>

      <div className="asa-tab-bar">
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

      <div className="asa-tab-body">
        {/* OVERVIEW */}
        {activeTab === 0 && (
          <div className="asa-sections">
            <div className="asa-alert asa-alert-red">
              <strong>Key message:</strong> Routine testing for homocysteinemia and MTHFR mutations in patients with VTE is <strong>NOT recommended</strong>. Lowering homocysteine does NOT reduce recurrent VTE.
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">MTHFR at a Glance</h3>
              <div className="asa-ae-grid">
                {mthfrFacts.map((f) => (
                  <div key={f.label} className="asa-ae-card">
                    <span className="asa-ae-label">{f.label}</span>
                    <span className="asa-ae-value">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Homocysteine Levels and Clinical Significance</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="asa-dose-table">
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
            <div className="asa-section-card">
              <h3 className="asa-section-title">Causes of Mild-Moderate Elevation</h3>
              <ul className="asa-ind-list">
                <li>Vitamin B12 or folic acid deficiency</li>
                <li>Renal insufficiency</li>
                <li>Hypothyroidism</li>
                <li>Alcoholism</li>
                <li>Drugs: methotrexate, phenytoin, carbamazepine, isoniazid</li>
                <li>MTHFR C677T homozygosity (10% of population)</li>
              </ul>
            </div>
          </div>
        )}

        {/* TESTING RECOMMENDATIONS */}
        {activeTab === 1 && (
          <div className="asa-sections">
            {keyMessages.map((k) => (
              <div key={k.message} className="asa-section-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="asa-section-title" style={{ margin: 0 }}>{k.message}</h3>
                  <span className={k.badgeClass}>{k.badge}</span>
                </div>
                <p className="asa-section-copy">{k.detail}</p>
              </div>
            ))}
            <div className="asa-alert asa-alert-amber">
              <strong>Why MTHFR testing is particularly problematic:</strong> ~40% of the population is heterozygous and ~10% is homozygous. Testing identifies a huge number of "positive" results that have no clear clinical significance (especially in the absence of elevated homocysteine) and cause unnecessary anxiety. The ASH 2023 thrombophilia guidelines explicitly recommend against MTHFR testing.
            </div>
          </div>
        )}

        {/* MANAGEMENT */}
        {activeTab === 2 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">B Vitamin Supplementation — The Evidence</h3>
              <div className="asa-timeline">
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" style={{ background: "var(--danger)" }}>✗</div>
                  <div className="asa-timeline-content">
                    <strong>VTE prevention: No benefit</strong>
                    <p>Clinical trials show NO reduction in recurrent VTE with B vitamin supplementation, even in patients with high baseline homocysteine levels.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" style={{ background: "var(--danger)" }}>✗</div>
                  <div className="asa-timeline-content">
                    <strong>MI / cardiovascular death: No benefit</strong>
                    <p>Cochrane meta-analysis confirms no reduction in MI or total cardiovascular death with homocysteine-lowering therapy.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" style={{ background: "#f59e0b" }}>?</div>
                  <div className="asa-timeline-content">
                    <strong>Stroke: Possible benefit — limited and context-specific</strong>
                    <p>Some evidence of stroke reduction with folic acid, particularly in:</p>
                    <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                      <li>Patients with hypertension</li>
                      <li>eGFR &gt; 50 mL/min/1.73m² (no benefit if eGFR &lt; 50)</li>
                      <li>Regions without folate-fortified grains (e.g., CSPPT trial in China: 0.7% absolute risk reduction)</li>
                    </ul>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>In countries with folate fortification of grains (Canada, USA), benefit is unlikely and supplementation for primary CV prevention is not recommended.</p>
                  </div>
                </div>
                <div className="asa-timeline-step">
                  <div className="asa-timeline-marker" style={{ background: "#6b7280" }}>—</div>
                  <div className="asa-timeline-content">
                    <strong>Obstetric complications: Unknown</strong>
                    <p>Hyperhomocysteinemia has been associated with obstetric complications, but optimal management is unknown.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="asa-section-card">
              <h3 className="asa-section-title">Pediatrics</h3>
              <p className="asa-section-copy">
                MTHFR mutation combined with hyperhomocysteinemia is reported to be associated with stroke in children. Pediatric hematologist with thromboembolism expertise should manage where possible.
              </p>
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === 3 && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <p className="asa-section-copy" style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                Source: Thrombosis Canada Clinical Guides | Version 34 | Updated: 2026-02-06
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
