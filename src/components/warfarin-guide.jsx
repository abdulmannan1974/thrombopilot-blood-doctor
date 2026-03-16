import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "dosing", label: "Dosing" },
  { id: "monitoring", label: "Monitoring & INR" },
  { id: "interactions", label: "Drug Interactions" },
  { id: "special", label: "Special Situations" },
  { id: "references", label: "References" },
];

const indications = [
  { indication: "Atrial fibrillation (non-valvular)", notes: "DOACs preferred; warfarin acceptable alternative" },
  { indication: "Valvular AF / rheumatic mitral stenosis", notes: "Warfarin required \u2014 DOACs not approved" },
  { indication: "Mechanical heart valves", notes: "Warfarin required \u2014 DOACs contraindicated" },
  { indication: "Acute VTE treatment", notes: "Must overlap with parenteral agent \u22655 days until INR \u22652.0 \u00d7 2 consecutive days" },
  { indication: "Long-term secondary VTE prevention", notes: "DOACs preferred; warfarin acceptable" },
  { indication: "Antiphospholipid syndrome (thrombotic)", notes: "Warfarin preferred \u2014 DOACs not recommended" },
];

const inrTargets = [
  { indication: "Most VTE and AF indications", target: "INR 2.5", range: "2.0\u20133.0" },
  { indication: "Mechanical mitral valve", target: "INR 3.0", range: "2.5\u20133.5" },
  { indication: "On-X aortic valve (after 3 months)", target: "INR 1.75", range: "1.5\u20132.0 + ASA" },
  { indication: "Some bileaflet aortic valves (low thrombogenicity)", target: "INR 2.5", range: "2.0\u20133.0" },
];

const dosageFactors = [
  "Age (elderly require lower doses)",
  "Body weight",
  "Ancestry (Asian patients often need lower doses)",
  "Nutritional status and diet consistency",
  "VKOR genetic variation (warfarin action site)",
  "CYP450 genetic variation (warfarin metabolism)",
  "Concomitant drugs",
  "Alcohol intake",
  "Comorbidities (liver disease, heart failure)",
  "Activity level",
];

const drugInteractions = [
  { drug: "Antiplatelet agents (ASA, clopidogrel)", effect: "Doubled bleeding risk", management: "Avoid unless specific indication (ACS, recent stent, mechanical valve). Carefully reassess risk/benefit." },
  { drug: "NSAIDs", effect: "Increased GI bleeding; CYP2C9 interaction increases INR", management: "Use celecoxib (COX-2 inhibitor) or NSAID + PPI if must use. Monitor INR more frequently." },
  { drug: "Antibiotics (most classes)", effect: "\u2191 INR (reduce Vitamin K synthesis + CYP inhibition)", management: "Check INR 3\u20134 days after starting; adjust warfarin dose as needed" },
  { drug: "St. John's Wort", effect: "\u2193 INR (CYP3A4 induction \u2014 reduces warfarin levels)", management: "Avoid; or check INR frequently if used" },
  { drug: "Alcohol", effect: "Variable \u2014 acute \u2191 INR; chronic use \u2193 INR", management: "Advise consistent intake; monitor INR with changes" },
  { drug: "Amiodarone", effect: "Potent \u2191 INR (CYP2C9 inhibition) \u2014 may persist weeks after stopping", management: "Reduce warfarin dose (often 30\u201350%) when starting; monitor INR closely" },
  { drug: "Azole antifungals (fluconazole)", effect: "\u2191 INR (CYP2C9 inhibition)", management: "Check INR 3\u20134 days after starting; may need significant dose reduction" },
  { drug: "SSRIs / SNRIs", effect: "Mild \u2191 bleeding risk (platelet function impairment)", management: "Extra caution if combined with other bleed risk factors; monitor INR" },
];

const references = [
  "Witt DM, et al. Guidance for practical management of warfarin therapy in VTE. J Thromb Thrombolysis 2016;41(1):187-205.",
  "Witt DM, et al. ASH 2018 guidelines: optimal management of anticoagulation therapy. Blood Adv 2018;2(22):3257-3291.",
  "Monagle P, et al. ASH 2018 guidelines: treatment of pediatric VTE. Blood Adv 2018;2(22):3292-3316.",
  "Sconce E, et al. Patients with unstable control have poorer dietary Vitamin K intake. Thromb Haemost 2005;93:872-875.",
  "Capodanno D, et al. Management of antithrombotic therapy in AF patients undergoing PCI. J Am Coll Cardiol 2019;74(1):83-99.",
];

export function WarfarinGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Version 44 &middot; May 2025</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Warfarin</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Mechanism, dosing, INR monitoring, drug interactions, and special situations for warfarin (vitamin K antagonist) therapy.
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
              <h2 className="text-base font-semibold mb-2">Mechanism of Action</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Warfarin inhibits hepatic production of <strong>vitamin K-dependent clotting factors II, VII, IX, and X</strong>, and also inhibits the natural anticoagulants <strong>protein C and protein S</strong>. The onset is delayed (3&ndash;7 days) as it depends on depletion of pre-existing clotting factors.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>DOACs are generally preferred over warfarin</strong> for most VTE and AF patients &mdash; they require less monitoring, are equally effective, and carry similar or less bleeding risk. Warfarin remains indicated in specific circumstances (see Indications below).
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Indications</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Indication</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {indications.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.indication}</strong></td>
                      <td>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Adverse Effects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Annual major bleeding</span>
                  <span className="text-sm" style={{ color: "#dc2626" }}>1&ndash;2% of chronic warfarin users</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Annual minor bleeding</span>
                  <span className="text-sm">10&ndash;20% of warfarin users</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Other side effects</span>
                  <span className="text-sm">Hair loss, skin rash (uncommon)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOSING */}
        {activeTab === "dosing" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Starting Dose</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Standard starting dose:</strong> 5 mg OD (for most adults)</li>
                <li><strong>Lower starting dose (1&ndash;2 mg OD):</strong> frail, underweight, or Asian descent patients</li>
                <li>Use standardised dosing nomograms to guide initial and subsequent dose adjustments</li>
                <li>Maintenance dose varies widely: &lt;1 mg/day to &gt;20 mg/day</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Factors Affecting Maintenance Dose</h2>
              <ul className="list-none p-0 space-y-1">
                {dosageFactors.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">INR Targets</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Indication</th>
                    <th>Target INR</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {inrTargets.map((r, i) => (
                    <tr key={i}>
                      <td>{r.indication}</td>
                      <td style={{ fontWeight: 700 }}>{r.target}</td>
                      <td>{r.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Acute VTE Initiation</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Warfarin must be combined with a parenteral anticoagulant (<GuideLink to="ufhLmwh">LMWH or UFH</GuideLink>) for <strong>&ge;5 days AND until INR &ge;2.0 for 2 consecutive days</strong></li>
                <li>Warfarin monotherapy is not acceptable as initial VTE treatment</li>
              </ul>
            </div>
          </div>
        )}

        {/* MONITORING */}
        {activeTab === "monitoring" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">INR Monitoring Frequency</h2>
              <div className="relative pl-6 space-y-4 border-l-2 border-border">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">1</div>
                  <div className="ml-2">
                    <strong>Initiation</strong>
                    <p>INR after 2&ndash;3 days of first dose. Do not monitor earlier &mdash; INR change takes 3&ndash;7 days to equilibrate.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">2</div>
                  <div className="ml-2">
                    <strong>Early phase</strong>
                    <p>Frequent monitoring until stable, therapeutic INR achieved.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">3</div>
                  <div className="ml-2">
                    <strong>Stable phase</strong>
                    <p>Every 2&ndash;6 weeks in most patients. Very stable patients may extend to every 12 weeks.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white bg-primary">!</div>
                  <div className="ml-2">
                    <strong>Increase monitoring when:</strong>
                    <p>New medication added or stopped, acute illness, diet change, travel, hospitalization, bleeding event</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Common Causes of Unstable INR</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Overly frequent monitoring with dose changes before INR equilibrates</li>
                <li>Excessively large dose adjustments</li>
                <li>Variable vitamin K intake (low intake leads to labile INR; encourage <em>consistent</em> diet)</li>
                <li>New drugs, antibiotics, or supplement changes</li>
                <li>Acute infection, diarrhoea, or vomiting</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Diet key message:</strong> Patients should NOT restrict foods high in vitamin K &mdash; they should maintain a <em>regular, consistent</em> diet. Dietary restriction causes more labile INR control.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Reversal of Warfarin</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Emergency reversal:</strong> IV vitamin K + 4-factor prothrombin complex concentrate (Octaplex&reg;, Beriplex&reg;)</li>
                <li><strong>Very elevated INR without bleeding:</strong> Oral vitamin K &mdash; see the <GuideLink to="warfarinInr">Warfarin: Out-of-Range INR Management</GuideLink> guide</li>
                <li><strong>No role for subcutaneous vitamin K</strong> (erratic absorption)</li>
              </ul>
            </div>
          </div>
        )}

        {/* DRUG INTERACTIONS */}
        {activeTab === "interactions" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Simplest approach to new drug interactions:</strong> Check INR 3&ndash;4 days after adding a new drug and adjust dose as needed. Very few drugs need to be avoided using this approach.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Key Drug Interactions</h2>
              {drugInteractions.map((d, i) => (
                <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: "0 0 0.75rem", borderLeft: "3px solid var(--primary)" }}>
                  <strong>{d.drug}</strong>
                  <p style={{ margin: "0.2rem 0", fontSize: "0.88em" }}>
                    <span style={{ color: "#dc2626" }}>Effect: </span>{d.effect}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.88em" }}>
                    <span style={{ color: "#16a34a" }}>Management: </span>{d.management}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIAL SITUATIONS */}
        {activeTab === "special" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pregnancy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Warfarin crosses the placenta and is <strong>teratogenic</strong> &mdash; causes fetal bleeding and increased spontaneous abortion. <strong>Generally avoided in pregnancy.</strong> Exception: some women with high-risk mechanical heart valves under co-care of thrombosis specialist and high-risk obstetrics.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4"><strong>Breastfeeding:</strong> Warfarin is safe &mdash; does not pass to breast milk in significant amounts.</p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pediatrics</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Warfarin can be used for treatment and prevention of thrombosis in children</li>
                <li>Regular blood work can be difficult in small children &mdash; point-of-care INR devices are helpful</li>
                <li>Paediatric thromboembolism expertise should be involved where possible</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Acenocoumarol (Sintrom&reg;)</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Alternative VKA &mdash; was occasionally used for patients with non-bleeding warfarin side effects. <strong>Currently no longer available in Canada</strong> (manufacturer discontinued) but available in some other countries.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Antiplatelet Combination Therapy</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Adding an antiplatelet agent to warfarin <strong>doubles bleeding risk</strong> and rarely adds thrombotic protection. Only combine when there is a specific indication (ACS, recent coronary stent, mechanical valve, stroke/TIA despite therapeutic anticoagulation). Re-assess and document the risk-benefit frequently. See the <GuideLink to="anticoagAntiplatelet">Anticoagulation + Antiplatelet Therapy</GuideLink> guide.
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
                {references.map((ref, i) => <li key={i}>{ref}</li>)}
              </ol>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                Version 44, updated 2025-05-01. Not a substitute for individual clinical judgment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
