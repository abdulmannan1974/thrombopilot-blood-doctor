import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["evidence", "Evidence by Indication"],
  ["class3", "Class III Obesity"],
  ["recommendations", "Recommendations"],
  ["references", "References"],
];

const references = [
  "Martin K, et al. Use of the direct oral anticoagulants in patients with obesity for treatment and prevention of venous thromboembolism: Updated communication from the ISTH SCC Subcommittee on Control of Anticoagulation. J Thromb Haemostas 2021;19:1874-1882.",
  "van Es N, et al. Direct oral anticoagulants compared with vitamin K antagonists for acute venous thromboembolism: Evidence from phase 3 trials. Blood 2014;124(12):1968-1975.",
  "Cohen A, et al. Effectiveness and safety of apixaban vs. warfarin in venous thromboembolism patients with obesity and morbid obesity. J Clin Med 2021;10(2):200.",
  "Elshafei MN, et al. Comparative effectiveness and safety of direct oral anticoagulants compared to warfarin in morbidly obese patients with acute venous thromboembolism: systematic review and a meta-analysis. J Thrombosis Thrombolysis 2021;51:388-396.",
  "Mhanna M, et al. Direct oral anticoagulants versus warfarin in morbidly obese patients with nonvalvular atrial fibrillation: A systematic review and meta-analysis. Am J Ther 2021;28(5):e531-e539.",
  "Hohnloser SH, et al. Efficacy and safety of apixaban versus warfarin in patients with atrial fibrillation and extremes in body weight: insights from the ARISTOTLE Trial. Circulation 2019;139(20):2292-2300.",
  "Boriani G, et al. Relationship between body mass index and outcomes in patients with atrial fibrillation treated with edoxaban or warfarin in the ENGAGE AF-TIMI 48 trial. Eur Heart J 2019;40(19):1541-1550.",
  "Kaplan RM, et al. Efficacy and safety of direct oral anticoagulants for atrial fibrillation across body mass index categories. J Am Heart Assoc 2020;9(24):e017383.",
  "The Hokusai-VTE Investigators. Edoxaban versus warfarin for the treatment of symptomatic venous thromboembolism. N Engl J Med 2013;369:1406-1415.",
  "Spyropoulos AC, et al. Rivaroxaban versus warfarin treatment among morbidly obese patients with venous thromboembolism: Comparative effectiveness, safety, and costs. Thromb Res 2019;182:159-166.",
];

export function DoacsObesityGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <span className="flex flex-wrap gap-2 mb-2">Clinical Guide</span>
        <h2 className="text-2xl font-bold leading-tight mt-1">DOACs in Patients with Obesity</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Guidance on the management of direct oral anticoagulants (DOACs) in patients with obesity, including Class III obesity (BMI &gt;40 kg/m&#178; or weight &gt;120 kg).
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
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

      <div className="grid gap-4">
        {/* ── Overview ── */}
        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Definition</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                According to Health Canada, obesity is defined as a body mass index (BMI) &gt;30 kg/m&#178;.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Pharmacokinetics in Obesity</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>Obesity variably affects pharmacokinetic parameters (absorption, distribution, metabolism, elimination), which could influence overall DOAC exposure.</li>
                <li>Product monographs for apixaban, dabigatran, and rivaroxaban report that weights &gt;120 kg are associated with a 20&ndash;30% decrease in overall drug exposure. This difference is <strong>not</strong> considered clinically significant.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Clinical Trial Data</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>No randomized controlled trials have specifically examined DOACs in patients with obesity.</li>
                <li>In most DOAC trials, fewer than 20% of patients weighed &gt;90&ndash;100 kg or had a BMI &gt;30.</li>
                <li>Published subgroup analyses consistently show similar efficacy and safety compared with warfarin in obese populations.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">DOAC Drug Level Monitoring</h3>
              <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
                <strong>Routine monitoring not recommended.</strong> There is insufficient clinical data to recommend routine DOAC level monitoring in obesity. No accepted evidence-based therapeutic targets exist, and there can be significant inter- and intra-patient variability. Availability of DOAC drug level testing is also significantly limited.
              </div>
            </article>
          </div>
        ) : null}

        {/* ── Evidence by Indication ── */}
        {tab === "evidence" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Venous Thromboembolism (VTE) Treatment</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>Systematic review and meta-analysis (apixaban, dabigatran, rivaroxaban): similar efficacy in patients &lt;100 kg vs &ge;100 kg.</li>
                <li>No association found between BMI and risk of VTE recurrence or bleeding events in rivaroxaban-treated patients.</li>
                <li>Retrospective study of over 43,000 patients: apixaban vs warfarin in obese and morbidly obese patients showed no significant difference in recurrent VTE or major bleeding (slightly lower risk for both outcomes in the apixaban arm).</li>
                <li><strong>Hokusai VTE:</strong> Edoxaban showed no significant difference in efficacy or safety in &gt;100 kg vs &lt;100 kg subgroups.</li>
                <li>Observational propensity-matched study: rivaroxaban vs warfarin in BMI &ge;35 &mdash; rivaroxaban reduced VTE recurrence and major bleeding.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Atrial Fibrillation</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>Systematic review and post-hoc subgroup analyses of large RCTs: all four DOACs (apixaban, dabigatran, edoxaban, rivaroxaban) are equivalent to vitamin K antagonists in terms of efficacy and safety in patients with obesity.</li>
                <li>Retrospective multi-site study across all BMI categories: no differences in stroke rates or risk of intracranial haemorrhage between normal BMI and category 1 or higher obesity.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Orthopedic Surgery Thromboprophylaxis</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li><strong><GuideLink to="dabigatran">Dabigatran</GuideLink> vs enoxaparin:</strong> No significant difference in patients with BMI &gt;30.</li>
                <li><strong><GuideLink to="rivaroxaban">Rivaroxaban</GuideLink> vs enoxaparin:</strong> No difference in patients &gt;90 kg compared with lower weights.</li>
                <li><strong><GuideLink to="apixaban">Apixaban</GuideLink> vs enoxaparin:</strong> Pooled data showed no differences in VTE or bleeding events when BMI &lt;30 was compared with BMI &gt;30.</li>
              </ul>
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem" }}>
                For detailed guidance, see the <GuideLink to="prophylaxisOrtho">Thromboprophylaxis: Orthopedic Surgery</GuideLink> guide.
              </p>
            </article>
          </div>
        ) : null}

        {/* ── Class III Obesity ── */}
        {tab === "class3" ? (
          <div className="grid gap-3.5">
            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Limited but encouraging data.</strong> Data supporting DOAC use in patients with BMI &gt;40 kg/m&#178; or weight &gt;120 kg remain limited to retrospective and observational studies. However, clinical efficacy and safety results are encouraging. Randomized controlled trials are needed to validate these findings.
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">VTE in Class III Obesity</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>Three retrospective studies (BMI &ge;40): similar rates of recurrent VTE and major bleeding for rivaroxaban vs warfarin. One study also found similar results with apixaban vs warfarin.</li>
                <li>Systematic review of 5 observational studies (n=6,585; weight &gt;120 kg or BMI &gt;40): rivaroxaban and apixaban were non-inferior to warfarin for VTE recurrence (OR 1.07, 95% CI 0.93&ndash;1.23) and major bleeding (OR 0.80, 95% CI 0.54&ndash;1.17).</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Atrial Fibrillation in Class III Obesity</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>Meta-analysis of 10 studies (89,494 very obese NVAF patients): DOACs vs warfarin showed <strong>significantly lower</strong> stroke/systemic embolism (OR 0.71, 95% CI 0.62&ndash;0.81, P&lt;0.0001) and <strong>significantly lower</strong> major bleeding (OR 0.60, 95% CI 0.46&ndash;0.78, P&lt;0.0001).</li>
                <li><strong>ARISTOTLE post-hoc</strong> (apixaban; 5.4% of patients were &gt;120 kg): similar efficacy across all weight categories, with lower major bleeding in the apixaban arm.</li>
                <li><strong>ENGAGE AF-TIMI 48 post-hoc</strong> (edoxaban; 5.5% had BMI &ge;40): similar efficacy and safety across all BMI categories.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── Recommendations ── */}
        {tab === "recommendations" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Weight-Based Guidance</h3>

              <div style={{ marginBottom: "1rem" }}>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Up to 120 kg / BMI &le;40</span>
                <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem" }}>
                  Sufficient evidence is available demonstrating that DOACs can be used safely in this patient population.
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Over 120 kg / BMI &gt;40</span>
                <p className="text-sm text-foreground leading-relaxed mb-4" style={{ marginTop: "0.5rem" }}>
                  The ISTH recommends standard-dose <strong><GuideLink to="rivaroxaban">rivaroxaban</GuideLink></strong> or <strong><GuideLink to="apixaban">apixaban</GuideLink></strong> as appropriate options for treatment of VTE (less data supporting apixaban than rivaroxaban).
                </p>
                <ul className="text-sm text-foreground leading-relaxed mb-4">
                  <li><strong>Dabigatran:</strong> NOT recommended (unconvincing data).</li>
                  <li><strong>Edoxaban:</strong> NOT recommended (lack of pharmacokinetic/pharmacodynamic data).</li>
                </ul>
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>No absolute weight limit.</strong> There is no widely accepted weight or BMI limit above which DOACs should not be considered. With increasing weight and BMI, evidence becomes more limited. In patients with extremely elevated weights and BMIs, decisions should be evaluated on a case-by-case basis, taking into account individual thrombotic risk. Patients should be informed of the limitations of available evidence and the potential risk of underdosing.
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Special Considerations</h3>
              <ul className="text-sm text-foreground leading-relaxed mb-4">
                <li>DOACs are <strong>contraindicated</strong> in pregnancy and while breastfeeding.</li>
                <li>Data regarding safety and efficacy of DOACs in the pediatric population are very limited.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Key References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ol>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>DOACs in Patients with Obesity</strong> | Updated 6 February 2026 | Version 39</p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
