import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["ufh", "UFH Dosing"],
  ["lmwh", "LMWH Dosing"],
  ["fondaparinux", "Fondaparinux"],
  ["monitoring", "Monitoring"],
  ["adverse", "Adverse Effects"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const ufhDosingRows = [
  ["VTE prophylaxis", "5000 U SC q8-12h", "Standard prophylactic dose"],
  ["Acute VTE (IV)", "5000 U IV bolus (or 80 U/kg) then 20 U/kg/hr", "Titrate to aPTT using institutional nomogram"],
  ["Outpatient VTE (SC)", "333 U/kg SC then 250 U/kg BID", "Use if CrCl >200 \u00b5mol/L"],
  ["ACS (UA/NSTEMI)", "60\u201370 U/kg bolus (max 5000 U) then 12\u201315 U/kg/hr (max 1000 U/hr)", "Weight-based with cap"],
  ["STEMI + fibrinolytic", "60 U/kg bolus (max 4000 U) then 12 U/kg/hr (max 1000 U/hr)", "Lower cap with fibrinolytic therapy"],
];

const lmwhProphylaxisRows = [
  ["Dalteparin", "5000 U OD"],
  ["Enoxaparin", "40 mg OD or 30 mg BID"],
  ["Tinzaparin", "50\u201375 U/kg OD (3500 or 4500 U)"],
];

const lmwhTreatmentRows = [
  ["Dalteparin", "200 U/kg OD or 100 U/kg BID"],
  ["Enoxaparin", "1.5 mg/kg OD or 1 mg/kg BID"],
  ["Tinzaparin", "175 U/kg OD"],
];

const lmwhAcsRows = [
  ["Enoxaparin (NSTE-ACS)", "1 mg/kg BID"],
  ["Dalteparin (NSTE-ACS)", "100 U/kg BID"],
  ["Enoxaparin STEMI (<75 yr)", "30 mg IV bolus + 1 mg/kg BID"],
  ["Enoxaparin STEMI (\u226575 yr)", "0.75 mg/kg BID (no bolus)"],
];

const fondaparinuxDosingRows = [
  ["VTE prophylaxis", "2.5 mg OD"],
  ["VTE treatment (<50 kg)", "5 mg OD"],
  ["VTE treatment (50\u2013100 kg)", "7.5 mg OD"],
  ["VTE treatment (>100 kg)", "10 mg OD"],
  ["ACS", "2.5 mg OD"],
];

const references = [
  "Bauer KA, et al. Fondaparinux compared with enoxaparin for the prevention of venous thromboembolism after elective major knee surgery. N Engl J Med. 2001;345:1305-1310.",
  "Garcia DA, et al. Parenteral anticoagulants: antithrombotic therapy and prevention of thrombosis, 9th edition. Chest. 2012;141:e24S-e43S.",
  "Kearon C, et al. Antithrombotic therapy for VTE disease: CHEST guideline. Chest. 2016;149:315-352.",
  "Lim W, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: diagnosis of venous thromboembolism. Blood Adv. 2018;2:3226-3256.",
  "Monagle P, et al. Antithrombotic therapy in neonates and children: antithrombotic therapy and prevention of thrombosis, 9th edition. Chest. 2012;141:e737S-e801S.",
  "Nutescu EA, et al. Low-molecular-weight heparins in renal impairment and obesity: available evidence and clinical practice recommendations across medical and surgical settings. Ann Pharmacother. 2009;43:1064-1083.",
  "Smythe MA, et al. Guidance for the practical management of the heparin anticoagulants in the treatment of venous thromboembolism. J Thromb Thrombolysis. 2016;41:165-186.",
  "Warkentin TE, et al. Heparin-induced thrombocytopenia: recognition, treatment, and prevention. Chest. 2012;141:e495S-e530S.",
  "Yusuf S, et al. Comparison of fondaparinux and enoxaparin in acute coronary syndromes (OASIS-5). N Engl J Med. 2006;354:1464-1476.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function UfhLmwhFondaparinuxGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Parenteral Anticoagulants</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Unfractionated Heparin, Low Molecular Weight Heparin and Fondaparinux</h2>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> Guidance on the use of UFH, LMWH, and fondaparinux for the prevention and treatment of venous and arterial thromboembolic events.
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto" role="tablist" aria-label="UFH LMWH Fondaparinux guide sections">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "asa-tab-btn active" : "asa-tab-btn"}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* -- Overview -- */}
        {tab === "overview" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="blue" />Mechanism of Action</h3>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>UFH and LMWH:</strong> Form complexes with antithrombin (AT), inhibiting thrombin (IIa), factor Xa, IXa, XIa, and XIIa, thereby reducing fibrin formation.</li>
                  <li><strong>LMWH:</strong> Derived from UFH by depolymerization. Retains anti-Xa activity with reduced anti-IIa activity. More predictable pharmacokinetics allow fixed weight-based dosing without routine monitoring.</li>
                  <li><strong>Fondaparinux:</strong> Synthetic pentasaccharide that specifically inhibits factor Xa via antithrombin. Does NOT inactivate thrombin.</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="teal" />Indications for UFH and LMWH</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>VTE prevention and treatment</li>
                  <li>Superficial vein thrombosis (SVT)</li>
                  <li>Acute coronary syndromes (ACS)</li>
                  <li>Cardiovascular procedures</li>
                  <li>Hemodialysis circuit anticoagulation</li>
                  <li>Bridging during warfarin interruption (see <GuideLink to="warfarinPeriop">Warfarin: Perioperative Management</GuideLink>)</li>
                  <li>Anterior wall MI / LV thrombus prevention</li>
                  <li>Systemic arterial embolism</li>
                  <li>Selected ischemic stroke and cervical artery dissection</li>
                  <li>Purpura fulminans</li>
                  <li>Pregnancy anticoagulation (see <GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink>)</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="purple" />Indications for Fondaparinux</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>VTE prevention and treatment</li>
                  <li>Superficial vein thrombosis (SVT)</li>
                  <li>Acute coronary syndromes (without PCI as sole agent due to catheter thrombosis risk)</li>
                  <li><GuideLink to="hit">HIT</GuideLink> prevention and treatment</li>
                </ul>
              </article>

              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <div>
                  <strong>Fondaparinux and PCI:</strong> Fondaparinux should not be used as the sole anticoagulant during PCI due to increased risk of catheter thrombosis. Supplemental UFH or bivalirudin is required.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* -- UFH Dosing -- */}
        {tab === "ufh" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="blue" />UFH Dosing by Indication</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Indication</th>
                      <th>Dose</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ufhDosingRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td className="font-bold text-foreground">{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <div>
                  <strong>aPTT Nomogram:</strong> Therapeutic IV UFH should be titrated using an institutional weight-based nomogram. Check aPTT every 6 hours until two consecutive therapeutic values, then monitor daily.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* -- LMWH Dosing -- */}
        {tab === "lmwh" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="teal" />VTE Prophylaxis</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Dose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhProphylaxisRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td className="font-bold text-foreground">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="blue" />VTE Treatment</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Dose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhTreatmentRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td className="font-bold text-foreground">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="orange" />ACS Dosing</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>Dose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmwhAcsRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td className="font-bold text-foreground">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <div>
                  <strong>Dosing weight:</strong> Therapeutic LMWH dosing is based on actual body weight. There is no established maximum dose cap.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* -- Fondaparinux -- */}
        {tab === "fondaparinux" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="purple" />Fondaparinux Dosing</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Indication</th>
                      <th>Dose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fondaparinuxDosingRows.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td className="font-bold text-foreground">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <div>
                  <strong>Renal contraindication:</strong> Fondaparinux is CONTRAINDICATED when CrCl is less than 30 mL/min (Cockcroft-Gault).
                </div>
              </div>

              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <div>
                  <strong>No reversal agent:</strong> There is no specific reversal agent for fondaparinux that is widely available. Andexanet alfa is licensed but has not received broad public reimbursement.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* -- Monitoring -- */}
        {tab === "monitoring" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="blue" />IV UFH Monitoring</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>Baseline: CBC, PT/INR, aPTT before initiation.</li>
                  <li>Check aPTT every 6 hours until two consecutive values are therapeutic, then monitor daily.</li>
                  <li>Use an institutional weight-based nomogram for dose adjustments.</li>
                  <li>In patients with <GuideLink to="aps">antiphospholipid syndrome (APS)</GuideLink>, aPTT may be unreliable; use anti-Xa level monitoring instead.</li>
                  <li>Monitor platelet count if UFH is administered for 4 or more days (<GuideLink to="hit">HIT</GuideLink> risk).</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="teal" />LMWH Monitoring</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>Baseline: CBC and serum creatinine.</li>
                  <li>Routine anti-Xa monitoring is NOT required for most patients.</li>
                  <li>Consider anti-Xa monitoring in renal impairment or pregnancy, though therapeutic targets remain uncertain.</li>
                  <li>Tinzaparin can be used without anti-Xa monitoring down to CrCl 20 mL/min (no significant accumulation demonstrated).</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="purple" />Fondaparinux Monitoring</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>Specialist consultation is recommended for monitoring decisions.</li>
                  <li>If anti-Xa monitoring is needed, specific fondaparinux-calibrated assays are required (standard LMWH calibrators are not appropriate).</li>
                </ul>
              </article>
            </div>
          </div>
        ) : null}

        {/* -- Adverse Effects -- */}
        {tab === "adverse" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="danger" />Bleeding</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">Bleeding is the most common adverse effect of all three agents. Risk increases with higher doses, concomitant antiplatelet therapy, renal impairment, and advanced age.</p>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="danger" />Heparin-Induced Thrombocytopenia (HIT)</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>Occurs in up to 5% of patients receiving UFH.</li>
                  <li>Less common with LMWH.</li>
                  <li>If HIT is suspected, stop ALL heparin sources (including flushes and coated catheters). See the <GuideLink to="hit">HIT Guide</GuideLink> for full management.</li>
                  <li>Alternative anticoagulants: argatroban, danaparoid, bivalirudin, fondaparinux, or a DOAC.</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="orange" />Other Adverse Effects</h3>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>Osteoporosis:</strong> Uncommon; associated with prolonged high-dose UFH therapy.</li>
                  <li><strong>Hyperkalemia:</strong> Rare; caused by aldosterone suppression.</li>
                  <li><strong>Elevated AST/ALT:</strong> Mild, clinically insignificant transaminase elevations that typically resolve within 15 to 30 days.</li>
                </ul>
              </article>

              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <div>
                  <strong>HIT alert:</strong> Monitor platelet count in any patient receiving UFH for 4 or more days. A 50% drop from baseline or new thrombosis should prompt immediate investigation for HIT.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* -- Special Considerations -- */}
        {tab === "special" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="purple" />Periprocedural Management</h3>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>IV UFH:</strong> Stop 4 to 6 hours before the procedure.</li>
                  <li><strong>Prophylactic LMWH/UFH:</strong> Generally no need to stop for most minor procedures.</li>
                  <li><strong>Therapeutic OD LMWH:</strong> Give last dose 2 days before the procedure.</li>
                  <li><strong>Fondaparinux:</strong> Give last dose at least 48 hours before the procedure.</li>
                  <li><strong>Restart:</strong> Full-dose LMWH typically restarted 48 to 72 hours post-operatively.</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="danger" />Bleeding Reversal</h3>
                <ul className="list-none p-0 space-y-1">
                  <li><strong>UFH:</strong> Protamine sulfate (1 mg per 100 U of UFH given in the preceding 2 to 3 hours).</li>
                  <li><strong>LMWH:</strong> Protamine is less effective but should be used if needed. It partially reverses anti-IIa activity but has minimal effect on anti-Xa.</li>
                  <li><strong>Fondaparinux:</strong> No widely available reversal agent. Andexanet alfa is licensed but has not received broad public reimbursement.</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="blue" />Warfarin Overlap</h3>
                <p className="text-sm text-foreground leading-relaxed mb-4">When transitioning to <GuideLink to="warfarin">warfarin</GuideLink>, start warfarin on the same day as heparin. Overlap for at least 5 days and until the INR is therapeutic (2.0 to 3.0) on two consecutive days before discontinuing the parenteral agent.</p>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="teal" />Pregnancy</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>LMWH or UFH are the preferred anticoagulants in pregnancy (DOACs and warfarin are contraindicated in pregnancy). See <GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink> and <GuideLink to="pregProphylaxis">Pregnancy: Thromboprophylaxis</GuideLink>.</li>
                  <li>Peripartum planning is essential, with multidisciplinary coordination for timing of last dose and neuraxial anaesthesia.</li>
                  <li>Breastfeeding is safe with LMWH and warfarin.</li>
                  <li>Fondaparinux data in pregnancy are limited; use only when heparin products are contraindicated.</li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="orange" />Renal Impairment</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>LMWH is renally excreted; use Cockcroft-Gault to estimate CrCl.</li>
                  <li>CrCl less than 30 mL/min: specialist consultation recommended before using LMWH.</li>
                  <li>Tinzaparin has demonstrated no significant accumulation down to CrCl 20 mL/min.</li>
                  <li>Consider anti-Xa level monitoring when using LMWH in renal impairment.</li>
                  <li><strong>Fondaparinux is CONTRAINDICATED when CrCl is less than 30 mL/min.</strong></li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="gray" />Pediatrics</h3>
                <ul className="list-none p-0 space-y-1">
                  <li>Dosing is age-dependent; neonates and infants require higher weight-based doses than older children.</li>
                  <li>UFH target anti-Xa: 0.35 to 0.7 U/mL.</li>
                  <li>Maximum UFH bolus: 75 to 100 U/kg.</li>
                  <li>Specialist pediatric thrombosis input should be sought whenever possible.</li>
                </ul>
              </article>
            </div>
          </div>
        ) : null}

        {/* -- References -- */}
        {tab === "references" ? (
          <div className="grid gap-4">
            <div className="grid gap-3.5">
              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="gray" />Related Clinical Guides</h3>
                <ul className="list-none p-0 divide-y divide-border">
                  <li><GuideLink to="doacsPeriop">DOACs: Perioperative Management</GuideLink></li>
                  <li><GuideLink to="warfarinPeriop">Warfarin: Perioperative Management</GuideLink></li>
                  <li><GuideLink to="dvtTreatment">Deep Vein Thrombosis (DVT): Treatment</GuideLink></li>
                  <li><GuideLink to="peTreatment">Pulmonary Embolism (PE): Treatment</GuideLink></li>
                  <li><GuideLink to="hit">Heparin-Induced Thrombocytopenia (HIT)</GuideLink></li>
                  <li><GuideLink to="cancer">Cancer and Thrombosis</GuideLink></li>
                  <li><GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink></li>
                </ul>
              </article>

              <article className="rounded-xl border bg-card shadow-sm p-5">
                <h3><Dot tone="gray" />References</h3>
                <ol className="list-none p-0 divide-y divide-border text-sm">
                  {references.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </article>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>UFH, LMWH &amp; Fondaparinux</strong> | Clinical Guide</p>
        <p>Not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
