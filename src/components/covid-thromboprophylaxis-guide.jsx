import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["non-critical", "Non-Critically Ill"],
  ["critical", "Critically Ill"],
  ["post-discharge", "Post-Discharge"],
  ["special", "Special Considerations"],
  ["references", "References"],
];

const references = [
  "ATTACC Investigators, ACTIV-4a Investigators, REMAP-CAP Investigators. Therapeutic anticoagulation with heparin in noncritically ill patients with Covid-19. N Engl J Med. 2021;385:790-802.",
  "REMAP-CAP, ACTIV-4a, ATTACC Investigators. Therapeutic anticoagulation with heparin in critically ill patients with Covid-19. N Engl J Med. 2021;385:777-789.",
  "INSPIRATION Investigators. Effect of intermediate-dose vs standard-dose prophylactic anticoagulation on thrombotic events, extracorporeal membrane oxygenation treatment, or mortality among patients with COVID-19 admitted to the intensive care unit: the INSPIRATION randomized clinical trial. JAMA. 2021;325:1620-1630.",
  "Sholzberg M, et al. Effectiveness of therapeutic heparin versus prophylactic heparin on death, mechanical ventilation, or intensive care unit admission in moderately ill patients with covid-19 admitted to hospital: RAPID randomised clinical trial. BMJ. 2021;375:n2400.",
  "Lopes RD, et al. Therapeutic versus prophylactic anticoagulation for patients admitted to hospital with COVID-19 and elevated D-dimer concentration (ACTION): an open-label, multicentre, randomised, controlled trial. Lancet. 2021;397:2253-2263.",
  "Ramacciotti E, et al. Rivaroxaban versus no anticoagulation for post-discharge thromboprophylaxis after hospitalisation for COVID-19 (MICHELLE): an open-label, multicentre, randomised, controlled trial. Lancet. 2022;399:50-59.",
  "Spyropoulos AC, et al. Efficacy and safety of therapeutic-dose heparin vs standard prophylactic or intermediate-dose heparins for thromboprophylaxis in high-risk hospitalized patients with COVID-19: the HEP-COVID randomized clinical trial. JAMA Intern Med. 2021;181:1612-1620.",
  "Lawler PR, et al. Therapeutic anticoagulation in non-critically ill patients with Covid-19. N Engl J Med. 2021;385:790-802.",
  "Connors JM, et al. Thromboinflammation and the hypercoagulability of COVID-19. J Thromb Haemost. 2020;18:1559-1561.",
];

export function CovidThromboprophylaxisGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Thromboprophylaxis</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">COVID-19: Primary Thromboprophylaxis for Hospitalized Patients</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To provide guidance on pharmacologic thromboprophylaxis for hospitalized patients with COVID-19, stratified by illness severity.
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto" role="tablist" aria-label="COVID thromboprophylaxis guide sections">
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

        {/* ── Overview ── */}
        {tab === "overview" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Thrombotic Risk in COVID-19</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                COVID-19 is associated with a significantly increased risk of venous thromboembolism. Observational studies report VTE rates of 10-30% in hospitalized patients despite routine thromboprophylaxis, compared to less than 2% in non-COVID medical patients.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Risk Factors</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Immobility and prolonged hospitalization</li>
                <li>Obesity</li>
                <li>Advanced age</li>
                <li>Disease severity (thrombogenicity correlates with illness severity)</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Pathophysiology</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                SARS-CoV-2 directly inflames the endothelium, causing endotheliopathy and in-situ thrombosis. This mechanism explains why pulmonary embolism is more commonly observed than deep vein thrombosis in COVID-19 patients — thrombi form locally within inflamed pulmonary vasculature rather than embolizing from peripheral veins.
              </p>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Key principle:</strong> All hospitalized COVID-19 patients warrant pharmacologic thromboprophylaxis. The optimal intensity depends on illness severity and bleeding risk.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Non-Critically Ill ── */}
        {tab === "non-critical" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Evidence: Therapeutic-Dose Anticoagulation</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Three major RCTs evaluated therapeutic-dose versus low- or intermediate-dose LMWH/UFH in non-critically ill hospitalized patients requiring low-flow oxygen supplementation.
              </p>
              <ul className="list-none p-0 space-y-1">
                <li>Therapeutic-dose heparin improved clinical outcomes</li>
                <li>Prevented progression to critical illness (organ support)</li>
                <li>Reduced major thromboembolism</li>
                <li>Trended toward reduced mortality</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <div>
                <strong>LMWH/UFH only:</strong> The benefit was specific to LMWH/UFH-based therapeutic anticoagulation. Rivaroxaban 20 mg daily did NOT improve outcomes and was associated with increased bleeding. DOACs should not be used for this indication.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Recommendations</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Patient Profile</th>
                    <th>Recommended Regimen</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Low bleeding risk</td>
                    <td className="font-bold text-foreground">Therapeutic-dose LMWH (preferred) or UFH</td>
                    <td>Initiate on admission, continue up to 14 days</td>
                  </tr>
                  <tr>
                    <td>High bleeding risk</td>
                    <td className="font-bold text-foreground">Standard-dose LMWH or UFH</td>
                    <td>Throughout admission</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>LMWH preferred over UFH:</strong> LMWH offers lower bleeding risk, lower risk of heparin-induced thrombocytopenia (HIT), and less personnel exposure (subcutaneous dosing versus IV infusion management).
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Critically Ill ── */}
        {tab === "critical" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Definition: Critically Ill</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                ICU-level care including high-flow nasal cannula, mechanical ventilation, vasopressor support, or extracorporeal membrane oxygenation (ECMO).
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Evidence Summary</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Two RCTs compared therapeutic-dose versus standard-dose anticoagulation</li>
                <li>Two RCTs compared intermediate-dose versus standard-dose anticoagulation</li>
                <li>Neither therapeutic-dose nor intermediate-dose improved clinical outcomes or mortality</li>
                <li>Therapeutic-dose anticoagulation trended toward more bleeding events</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>No benefit from dose escalation:</strong> In critically ill patients, escalating beyond standard-dose thromboprophylaxis does not improve outcomes and may increase bleeding risk.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Recommendation</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Patient Profile</th>
                    <th>Recommended Regimen</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Critically ill (all)</td>
                    <td className="font-bold text-foreground">Standard-dose LMWH or UFH</td>
                    <td>UFH reserved for LMWH contraindications (e.g., renal failure)</td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
        ) : null}

        {/* ── Post-Discharge ── */}
        {tab === "post-discharge" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Extended Post-Discharge Thromboprophylaxis</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Extended thromboprophylaxis with rivaroxaban 10 mg daily for up to 35 days post-discharge may be considered in select patients.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Patient Selection Criteria</h3>
              <ul className="list-none p-0 space-y-1">
                <li>High VTE risk (e.g., elevated D-dimer at discharge, prolonged immobility, obesity, prior VTE)</li>
                <li>No significant bleeding risk factors</li>
                <li>Not already on other antithrombotic therapy</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Evidence</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Trial</th>
                    <th>Regimen</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>MICHELLE (n=320)</td>
                    <td className="font-bold text-foreground">Rivaroxaban 10 mg daily x 35 days</td>
                    <td>Reduced symptomatic and asymptomatic VTE without increasing bleeding</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Note:</strong> Post-discharge thromboprophylaxis is not universally recommended. It should be individualized based on VTE risk, bleeding risk, and the patient's antithrombotic status.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Special Considerations ── */}
        {tab === "special" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Deteriorating Patients</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                If a patient on therapeutic-dose anticoagulation deteriorates and develops a need for organ support (high-flow oxygen, mechanical ventilation, vasopressors, ECMO), step down from therapeutic dose to standard-dose thromboprophylaxis.
              </p>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Renal Failure</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Renal Function</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CrCl &lt; 30 mL/min</td>
                    <td>Avoid therapeutic-dose enoxaparin or dalteparin</td>
                  </tr>
                  <tr>
                    <td>CrCl 20-30 mL/min</td>
                    <td className="font-bold text-foreground">Tinzaparin may be considered</td>
                  </tr>
                  <tr>
                    <td>CrCl &lt; 20 mL/min or dialysis</td>
                    <td className="font-bold text-foreground">UFH or dalteparin standard dose</td>
                  </tr>
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Patients on Antiplatelet Therapy</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Dual antiplatelet therapy (DAPT):</strong> Use standard-dose thromboprophylaxis only (not therapeutic dose) due to additive bleeding risk.</li>
                <li><strong>Single antiplatelet therapy:</strong> Therapeutic-dose thromboprophylaxis may be considered on a case-by-case basis.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>Patients Already on Therapeutic Anticoagulation</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Continue therapeutic-dose anticoagulation regardless of illness severity. Consider switching from a DOAC or VKA to LMWH while the patient is acutely ill (absorption concerns, drug interactions, inability to take oral medications).
              </p>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <div>
                <strong>D-dimer:</strong> Do NOT use D-dimer or other biomarkers to guide thromboprophylaxis dosing or duration. No validated biomarker-driven strategy exists for this purpose.
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Limitations of evidence:</strong> The pivotal studies were conducted during the early pandemic period, before widespread vaccination, and with prior SARS-CoV-2 strains. Applicability to current variants and vaccinated populations may differ.
              </div>
            </div>
          </div>
        ) : null}

        {/* ── References ── */}
        {tab === "references" ? (
          <div className="grid gap-4">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3>References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="prophylaxisMedical">Thromboprophylaxis: Medical Patients</GuideLink> | <GuideLink to="ufhLmwh">UFH &amp; LMWH</GuideLink> | <GuideLink to="dvtTreatment">DVT Treatment</GuideLink> | <GuideLink to="peTreatment">PE Treatment</GuideLink></p>
              </div>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>COVID-19: Primary Thromboprophylaxis for Hospitalized Patients</strong></p>
        <p>The information here is not a substitute for clinical judgement. Always seek appropriate specialist input when needed.</p>
      </div>
    </section>
  );
}
