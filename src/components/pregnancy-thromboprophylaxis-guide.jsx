import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk Factors" },
  { id: "agents", label: "Agents & Dosing" },
  { id: "thrombophilia", label: "Thrombophilia" },
  { id: "labour", label: "Labour & Delivery" },
  { id: "references", label: "References" },
];

const prophylacticDoses = [
  { agent: "Dalteparin (Fragmin\u00AE)", dose: "5,000 U SC once daily" },
  { agent: "Enoxaparin (Lovenox\u00AE)", dose: "40 mg SC once daily" },
  { agent: "Tinzaparin (Innohep\u00AE)", dose: "4,500 U SC once daily" },
  { agent: "Nadroparin (Fraxiparine\u00AE)", dose: "2,850 U SC once daily" },
];

const intermediateDoses = [
  { agent: "Dalteparin (Fragmin\u00AE)", dose: "5,000 U SC BID or 10,000 U SC once daily" },
  { agent: "Enoxaparin (Lovenox\u00AE)", dose: "40 mg SC BID or 80 mg SC once daily" },
  { agent: "Tinzaparin (Innohep\u00AE)", dose: "10,000 U SC once daily" },
];

const thrombophiliaRows = [
  {
    condition: "FVL heterozygous, no family hx",
    antepartum: "Surveillance",
    postpartum: "Surveillance",
  },
  {
    condition: "FVL heterozygous, + family hx",
    antepartum: "Surveillance",
    postpartum: "Prophylaxis",
  },
  {
    condition: "FVL homozygous",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
  {
    condition: "PGM heterozygous, no family hx",
    antepartum: "Surveillance",
    postpartum: "Surveillance",
  },
  {
    condition: "PGM heterozygous, + family hx",
    antepartum: "Surveillance",
    postpartum: "Prophylaxis",
  },
  {
    condition: "PGM homozygous",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
  {
    condition: "Compound heterozygous (FVL + PGM)",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
  {
    condition: "Protein C deficiency, + family hx",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
  {
    condition: "Protein S deficiency, + family hx",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
  {
    condition: "Antithrombin deficiency**",
    antepartum: "Prophylaxis",
    postpartum: "Prophylaxis",
  },
];

const references = [
  "Bates SM, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism: venous thromboembolism in the context of pregnancy. Blood Adv. 2018;2(22):3317-3359.",
  "Bates SM, et al. VTE, thrombophilia, antithrombotic therapy, and pregnancy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: ACCP Evidence-Based Clinical Practice Guidelines. Chest 2012;141(2 Suppl):e691S-736S.",
  "Bistervels IM, et al. Intermediate-dose versus low-dose low-molecular-weight heparin in pregnant and post-partum women with a history of VTE (Highlow study). Lancet. 2022;400(10365):1777-1787.",
  "Chan WS, et al. Venous thromboembolism and antithrombotic therapy in pregnancy. J Obstet Gynaecol Can. 2014;36(6):527-553.",
  "Horlocker TT, et al. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: ASRA Evidence-Based Guidelines (Fourth Edition). Reg Anesth Pain Med 2018;43:263-309.",
  "Kamel H, et al. Risk of a thrombotic event after the sixth week postpartum. N Engl J Med. 2014;370(14):1307-1315.",
  "Sultan AA, et al. Development and validation of risk prediction model for VTE in postpartum women: multinational cohort study. BMJ 2016;355:i6253.",
  "Bates SM, et al. Guidance for the treatment and prevention of obstetric-associated venous thromboembolism. J Thromb Thrombolysis 2016;41(1):92-128.",
];

export function PregnancyThromboprophylaxisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Version 43 · Feb 2026</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Pregnancy: Thromboprophylaxis</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Evidence-based recommendations for prevention of venous thromboembolism during pregnancy and the postpartum period, including LMWH dosing, thrombophilia-specific management, and neuraxial anesthesia timing.
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">VTE incidence</span>
                  <span className="text-sm">1-2 per 1,000 deliveries</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily VTE risk in pregnancy</span>
                  <span className="text-sm">5-10x vs non-pregnant</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Early postpartum risk</span>
                  <span className="text-sm">15-35x vs non-pregnant</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Elevated risk duration</span>
                  <span className="text-sm">Returns to baseline by 6 weeks postpartum (small increase may persist 12 weeks)</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Thrombophilia and Pregnancy VTE Risk</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Absolute risk in most women with thrombophilia without prior VTE remains low (<strong>&le;1%</strong>)</li>
                <li><strong>Higher risk:</strong> FVL homozygosity, PGM homozygosity, protein C/S/antithrombin deficiency (with family history), combined thrombophilia</li>
                <li>Thrombophilic women with a positive family history have <strong>2-4x greater risk</strong> than those without</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Prior VTE and Recurrence Risk</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Prior VTE with transient risk factor (not pregnancy/hormone-related): low antepartum recurrence risk (<strong>&le;5%</strong>)</li>
                <li>Unprovoked, pregnancy-related, or estrogen-related prior VTE: recurrence risk <strong>5-10%</strong></li>
                <li>Impact of thrombophilia on recurrent VTE risk in pregnancy remains unclear</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Caesarean section:</strong> Uncomplicated nonemergent C-section has NOT been associated with increased VTE risk compared with vaginal delivery.
            </div>
          </div>
        )}

        {/* RISK FACTORS */}
        {activeTab === "risk" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Additional Clinical Risk Factors for Pregnancy-Associated VTE</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Obesity / increased BMI</li>
                <li>Age &ge;40 years</li>
                <li>Pre-eclampsia with intrauterine growth restriction (IUGR)</li>
                <li>Strict antepartum bed rest for &ge;7 days</li>
                <li>Smoking &gt;5 cigarettes/day prior to pregnancy</li>
                <li>Systemic lupus erythematosus (SLE)</li>
                <li>Sickle cell disease</li>
                <li>Cancer</li>
                <li>Cardiac disease</li>
                <li>Severe ovarian hyperstimulation syndrome (assisted reproduction)</li>
                <li>Serious postpartum infection</li>
                <li>Major postpartum hemorrhage requiring intervention or surgery</li>
                <li>Emergency caesarean section</li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Pharmacologic prophylaxis</strong> is associated with approximately a <strong>75% relative risk reduction</strong> in pregnancy-related VTE. Women with a higher baseline risk derive more benefit than those with a lower baseline risk.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Risk Assessment</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                The magnitude of risk increases with multiple factors and their interactions remain uncertain. Predictive models for assessing individual patient risk of thrombosis are currently under evaluation and may prove helpful in the near future.
              </p>
            </div>
          </div>
        )}

        {/* AGENTS & DOSING */}
        {activeTab === "agents" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 shadow-sm p-5">
              <strong>DOACs are contraindicated:</strong> Direct oral anticoagulants (dabigatran, rivaroxaban, apixaban, edoxaban) should NOT be used in pregnancy or breastfeeding. These small molecules cross the placenta and human reproductive risks are unknown. Rivaroxaban and dabigatran have been detected in breast milk.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">LMWH &mdash; Drug of Choice</h2>
              <ul className="list-none p-0 space-y-1">
                <li>LMWH does not cross the placenta &mdash; safe for the fetus</li>
                <li>Better safety profile than UFH; <strong>LMWH is the drug of choice</strong> for VTE prevention in pregnancy</li>
                <li>LMWH is safe for the breastfed infant when administered to the nursing mother</li>
                <li><strong>Anti-Xa monitoring</strong> for prophylactic LMWH: NOT routinely recommended</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Prophylactic LMWH Doses</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Prophylactic Dose</th>
                  </tr>
                </thead>
                <tbody>
                  {prophylacticDoses.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.agent}</strong></td>
                      <td>{r.dose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Intermediate LMWH Doses</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Intermediate Dose</th>
                  </tr>
                </thead>
                <tbody>
                  {intermediateDoses.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.agent}</strong></td>
                      <td>{r.dose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem" }}>
                For women <strong>&ge;100-120 kg</strong>: use intermediate dosing antepartum. Postpartum: either standard or intermediate dosing can be used.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Warfarin</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Crosses the placenta &mdash; can cause <strong>teratogenicity</strong> (warfarin embryopathy, CNS anomalies), pregnancy loss, and fetal bleeding</li>
                <li><strong>Safe while breastfeeding</strong> when administered to the nursing mother</li>
              </ul>
            </div>
          </div>
        )}

        {/* THROMBOPHILIA */}
        {activeTab === "thrombophilia" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Thromboprophylaxis in Women with Thrombophilia (No Personal VTE History)</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginBottom: "0.75rem" }}>
                Recommendations based on VTE risk thresholds of <strong>2% antepartum</strong> and <strong>1% postpartum</strong> for recommending LMWH prophylaxis (expert opinion).
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Thrombophilia</th>
                    <th>Antepartum</th>
                    <th>Postpartum</th>
                  </tr>
                </thead>
                <tbody>
                  {thrombophiliaRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.condition}</strong></td>
                      <td>
                        <span className={`asa-badge ${r.antepartum === "Prophylaxis" ? "asa-badge-blue" : "asa-badge-amber"}`}>
                          {r.antepartum}
                        </span>
                      </td>
                      <td>
                        <span className={`asa-badge ${r.postpartum === "Prophylaxis" ? "asa-badge-blue" : "asa-badge-amber"}`}>
                          {r.postpartum}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.75rem", fontSize: "0.84em" }}>
                PGM = Prothrombin Gene Mutation; FVL = Factor V Leiden. Adapted from ASH 2018 VTE guidelines (Bates et al.).
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ fontSize: "0.84em" }}>
                ** No family studies available to inform this recommendation, but antepartum prophylaxis is recommended given overall VTE risk estimate.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Protein C / Protein S deficiency:</strong> Women with protein C or protein S deficiency should receive LMWH in preference to warfarin.
            </div>
          </div>
        )}

        {/* LABOUR & DELIVERY */}
        {activeTab === "labour" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Planning for Delivery</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Careful planning is essential to minimize the risk of maternal hemorrhage and epidural hematoma. Delivery options include both planned delivery and spontaneous labor with discontinuation of prophylaxis when labor commences, in consultation with obstetrics and anesthesiology.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Neuraxial Anesthesia Timing</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Anticoagulant</th>
                    <th>Minimum Interval Before Epidural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Prophylactic LMWH</strong></td>
                    <td>&ge;12 hours after last dose</td>
                  </tr>
                  <tr>
                    <td><strong>Higher-than-prophylactic LMWH</strong></td>
                    <td>&ge;24 hours after last dose</td>
                  </tr>
                  <tr>
                    <td><strong>Prophylactic UFH (5,000 U BID/TID)</strong></td>
                    <td>4-6 hours after last dose</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem", fontSize: "0.87em" }}>
                If prophylactic UFH is substituted for LMWH close to term, individual anesthesiologists may differ in their practice regarding timing.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Resuming Prophylaxis</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Resume prophylaxis <strong>&ge;12 hours</strong> post-delivery or after epidural catheter removal</li>
                <li>Ensure adequate hemostasis is assured before resuming</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Duration of Postpartum Prophylaxis</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>6 weeks postpartum</strong> for most women (highest risk period for VTE)</li>
                <li>Extend to <strong>12 weeks</strong> only for highest-risk women:
                  <ul style={{ marginTop: "0.3rem" }}>
                    <li>Prior late postpartum VTE event</li>
                    <li>Multiple VTE risk factors persisting beyond 6 weeks</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Adolescents:</strong> In adolescents who are pregnant, the above adult recommendations for thromboprophylaxis should be followed.
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
                <p>Related: <GuideLink to="pregDiagnosis">Pregnancy: DVT &amp; PE Diagnosis</GuideLink> | <GuideLink to="pregVte">Pregnancy: VTE Treatment</GuideLink> | <GuideLink to="ufhLmwh">UFH &amp; LMWH</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
