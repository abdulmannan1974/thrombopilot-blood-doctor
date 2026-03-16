import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "approach", label: "Approach to Out-of-Range INR" },
  { id: "low-inr", label: "Causes of Low INR" },
  { id: "high-inr", label: "Causes of High INR" },
  { id: "references", label: "References" },
];

const lowInrCauses = [
  { cause: "Missed doses / non-adherence", detail: "Most common cause — always ask about adherence" },
  { cause: "New medications that decrease INR", detail: "Rifampin, carbamazepine, phenytoin, barbiturates (CYP enzyme inducers)" },
  { cause: "Increased vitamin K intake", detail: "Green leafy vegetables, nutritional supplements, multivitamins containing vitamin K" },
  { cause: "Alcohol binge drinking (acute)", detail: "Acute heavy intake can transiently lower INR" },
  { cause: "Herbal products", detail: "St. John's Wort (potent CYP3A4 inducer — significantly reduces warfarin levels)" },
];

const highInrDrugs = [
  { category: "Antibiotics", drugs: "TMP-SMX (Septra), metronidazole (Flagyl), quinolones, amoxicillin, macrolides (azithromycin, clarithromycin)" },
  { category: "Azole antifungals", drugs: "Fluconazole, voriconazole (potent CYP2C9 inhibitors)" },
  { category: "Cardiac medications", drugs: "Amiodarone (potent — may need 30-50% dose reduction), some statins, fenofibrate" },
  { category: "Analgesics", drugs: "Acetaminophen >1 g/day (underappreciated interaction)" },
  { category: "Thyroid", drugs: "Levothyroxine dose changes (full effect on INR takes 4-6 weeks)" },
];

const highInrOtherCauses = [
  "Decreased vitamin K intake (poor appetite, reduced dietary intake)",
  "Acute illness — fever, diarrhea, vomiting (reduced vitamin K absorption)",
  "Chronic alcohol use (impaired hepatic metabolism)",
  "Liver disease (reduced clotting factor synthesis)",
  "Heart failure exacerbation (hepatic congestion)",
  "Cannabis / CBD products (CYP inhibition)",
];

const references = [
  "Ageno W, Gallus AS, Wittkowsky A, et al. Oral anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: American College of Chest Physicians Evidence-Based Clinical Practice Guidelines. Chest 2012;141(2 Suppl):e44S-e88S.",
  "Holbrook A, Schulman S, Witt DM, et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: American College of Chest Physicians Evidence-Based Clinical Practice Guidelines. Chest 2012;141(2 Suppl):e152S-e184S.",
  "Smythe MA, Priziola J, Engel PJ, et al. Guidance for the practical management of warfarin therapy in the treatment of venous thromboembolism. Pharmacotherapy 2023;43(12):1327-1338.",
  "Witt DM, Nieuwlaat R, Clark NP, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: optimal management of anticoagulation therapy. Blood Adv 2018;2(22):3257-3291.",
];

export function WarfarinInrManagementGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Anticoagulation</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Clinical Guide</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Warfarin: Management of Out-of-Range INRs</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Systematic approach to investigating and managing supratherapeutic and subtherapeutic INR values in patients on warfarin therapy.
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
              <h2 className="text-base font-semibold mb-2">Therapeutic Range and TTR</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Warfarin has a <strong>narrow therapeutic range</strong> and a highly <strong>variable dose-response</strong> between patients. Maintaining INR within the target range is critical for both efficacy and safety.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                <strong>Time in Therapeutic Range (TTR)</strong> strongly correlates with clinical outcomes — both thromboembolic events and bleeding complications are directly related to TTR. Target TTR should be <strong>&gt;60%</strong> for optimal outcomes.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Clinician alert:</strong> Clinicians may underdose warfarin due to perceived bleeding risk. However, maintaining a subtherapeutic INR significantly increases the risk of thromboembolism without meaningfully reducing bleeding risk. Both over- and under-anticoagulation are harmful.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Achieving Good INR Control</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Use a <strong>consistent, systematic approach</strong> to dose adjustments</li>
                <li>Paper-based dosing nomograms provide structured guidance</li>
                <li>Computerized decision support systems can improve TTR</li>
                <li>Avoid ad hoc dose changes without a clear rationale</li>
                <li>Patient education on diet consistency, drug interactions, and adherence is essential</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Key Principles</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Thromboembolic events relate to time spent below the therapeutic range</li>
                <li>Bleeding events relate to time spent above the therapeutic range</li>
                <li>Both outcomes are minimized when TTR is maximized</li>
                <li>A single out-of-range INR does not always require a maintenance dose change</li>
                <li>Investigate the <em>cause</em> of each out-of-range INR before adjusting the dose</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Related Guides</h2>
              <ul className="list-none p-0 space-y-1">
                <li><GuideLink to="warfarin">Warfarin: General Guide</GuideLink></li>
                <li><GuideLink to="warfarinPoc">Warfarin: Point-of-Care INR Monitoring</GuideLink></li>
                <li><GuideLink to="warfarinPeriop">Warfarin: Perioperative Management</GuideLink></li>
              </ul>
            </div>
          </div>
        )}

        {/* APPROACH TO OUT-OF-RANGE INR */}
        {activeTab === "approach" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Questions to Ask the Patient</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Every out-of-range INR should prompt a structured history to identify the cause:
              </p>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Doses taken in the past 2 weeks</strong> — were all doses taken correctly?</li>
                <li><strong>Missed doses</strong> — any forgotten or skipped doses?</li>
                <li><strong>New or stopped medications</strong> — especially <em>antibiotics</em>, which are the most common drug interaction</li>
                <li><strong>Appetite and diet changes</strong> — changes in vitamin K intake</li>
                <li><strong>Alcohol intake</strong> — changes in pattern or quantity</li>
                <li><strong>Cannabis / CBD products</strong> — can inhibit CYP enzymes and increase INR</li>
                <li><strong>General health</strong> — infection, fever, diarrhea, vomiting, heart failure exacerbation</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Deciding on Dose Adjustment</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Determine whether the patient needs a <strong>one-time dose change</strong>, a <strong>maintenance dose change</strong>, or <strong>both</strong>.
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Transient / temporary cause identified</strong></td>
                    <td>One-time dose change only (hold dose or give extra dose); resume usual maintenance</td>
                  </tr>
                  <tr>
                    <td><strong>&ge;2 consecutive out-of-range INRs in the same direction</strong> with no temporary cause</td>
                    <td>Change the maintenance dose</td>
                  </tr>
                  <tr>
                    <td><strong>Single slightly out-of-range INR</strong></td>
                    <td>Option A: Continue current dose + recheck in 1-2 weeks<br />Option B: One-time change (hold or increase by half to one dose) + resume maintenance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>ASH 2018 / Nomogram approach:</strong> When a maintenance dose change is needed, adjust as a percentage of the total weekly dose. Typical adjustments are 5-20% of the weekly dose. Avoid making large dose changes (&gt;20%) as the INR may overshoot in the opposite direction.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Significantly Elevated INR Without Bleeding</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>INR Level</th>
                    <th>Management</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>INR 4.5-10, no bleeding</strong></td>
                    <td>Hold warfarin until INR returns to therapeutic range. <strong>Routine vitamin K is NOT needed.</strong> Recheck INR in 1-2 days.</td>
                  </tr>
                  <tr>
                    <td><strong>INR &gt;10, no bleeding</strong></td>
                    <td>Hold warfarin. <strong>Consider oral vitamin K</strong> (1-2.5 mg PO) based on individual bleeding risk assessment. Recheck INR daily until stable.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>Active bleeding at any INR level:</strong> This is a medical emergency. Refer to bleeding management protocols. Major bleeding requires IV vitamin K + prothrombin complex concentrate (PCC). See also the <GuideLink to="doacsBleeding">DOAC Bleeding Management</GuideLink> guide for comparison.
            </div>
          </div>
        )}

        {/* CAUSES OF LOW INR */}
        {activeTab === "low-inr" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Low INR = Increased thromboembolism risk.</strong> A subtherapeutic INR exposes the patient to the risk of stroke (in AF) or recurrent VTE. Promptly investigate and correct the cause.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Common Causes of Low INR</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Cause</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {lowInrCauses.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.cause}</strong></td>
                      <td>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Management of Low INR</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Step 1:</strong> Investigate the cause using the structured questions (see Approach tab)</li>
                <li><strong>Step 2:</strong> If a transient cause is identified (e.g., missed doses, short course of an interacting drug), give a one-time dose increase and resume usual maintenance</li>
                <li><strong>Step 3:</strong> If no transient cause and &ge;2 consecutive low INRs, increase the maintenance dose by 5-20% of the total weekly dose</li>
                <li><strong>Step 4:</strong> Recheck INR in 1-2 weeks to confirm response</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Vitamin K intake counselling:</strong> Patients should not restrict green leafy vegetables. Instead, advise a <em>consistent</em> diet. Sudden increases in vitamin K-rich foods will lower the INR; the goal is consistency, not avoidance.
            </div>
          </div>
        )}

        {/* CAUSES OF HIGH INR */}
        {activeTab === "high-inr" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>High INR = Increased bleeding risk.</strong> The risk of major hemorrhage rises sharply with INR values above 4.0. Promptly identify the cause and manage accordingly.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Drugs That Commonly Increase INR</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Drug Category</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {highInrDrugs.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.category}</strong></td>
                      <td>{r.drugs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Other Causes of High INR</h2>
              <ul className="list-none p-0 space-y-1">
                {highInrOtherCauses.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Management of High INR</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>INR Level</th>
                    <th>No Bleeding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Above range but &lt;4.5</strong></td>
                    <td>Reduce or hold 1-2 doses, then resume at a lower maintenance dose if warranted. Recheck INR in 1-2 weeks.</td>
                  </tr>
                  <tr>
                    <td><strong>INR 4.5-10</strong></td>
                    <td>Hold warfarin. No routine vitamin K needed. Recheck INR in 1-2 days. Resume at a reduced dose once INR is therapeutic.</td>
                  </tr>
                  <tr>
                    <td><strong>INR &gt;10</strong></td>
                    <td>Hold warfarin. <strong>Consider oral vitamin K 1-2.5 mg</strong> based on individual bleeding risk. Recheck INR daily. Resume at a reduced dose.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Antibiotics are the #1 drug interaction cause of elevated INR.</strong> Always check INR 3-4 days after starting any antibiotic. Consider empiric warfarin dose reduction (10-25%) when starting TMP-SMX, metronidazole, or fluconazole.
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
