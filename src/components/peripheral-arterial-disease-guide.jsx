import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["symptomatic", "Symptomatic PAD"],
  ["revascularization", "Revascularization"],
  ["compass", "COMPASS / VOYAGER"],
  ["periprocedural", "Periprocedural"],
  ["references", "References"],
];

const dosingRows = [
  ["ASA", "81 mg once daily", "Standard antiplatelet dose for PAD"],
  ["Clopidogrel", "75 mg once daily", "Alternative single antiplatelet; slightly favoured over ASA (CAPRIE)"],
  ["Ticagrelor", "60–90 mg twice daily", "No proven benefit over clopidogrel in PAD"],
  ["Low-dose rivaroxaban + ASA", "Rivaroxaban 2.5 mg BID + ASA 81 mg daily", "COMPASS / VOYAGER regimen for high-risk PAD"],
];

const compassSubgroups = [
  ["High-Risk Limb Profile (HRLP)", "Prior revascularization, prior amputation, Fontaine III / IV", "4.6%"],
  ["High-Risk Cardiovascular/Metabolic (HRCM)", "Polyvascular disease, diabetes, eGFR < 60, heart failure", "4.4%"],
  ["Both HRLP + HRCM", "Combined highest-risk population", "5.2%"],
  ["Neither HRLP nor HRCM", "Lower-risk stable PAD", "1.0%"],
];

const references = [
  "CAPRIE Steering Committee. A randomised, blinded, trial of clopidogrel versus aspirin in patients at risk of ischaemic events (CAPRIE). Lancet. 1996;348:1329-1339.",
  "Bonaca MP, et al. Rivaroxaban in peripheral artery disease after revascularization. N Engl J Med. 2020;382:1994-2004. (VOYAGER PAD)",
  "Eikelboom JW, et al. Rivaroxaban with or without aspirin in stable cardiovascular disease. N Engl J Med. 2017;377:1319-1330. (COMPASS)",
  "Anand SS, et al. Rivaroxaban plus aspirin versus aspirin in relation to vascular risk in the COMPASS trial. J Am Coll Cardiol. 2019;73:3271-3280.",
  "Bhatt DL, et al. Clopidogrel and aspirin versus aspirin alone for the prevention of atherothrombotic events. N Engl J Med. 2006;354:1706-1717. (CHARISMA)",
  "Warfarin Antiplatelet Vascular Evaluation Trial Investigators. Oral anticoagulant and antiplatelet therapy and peripheral arterial disease. N Engl J Med. 2007;357:217-227. (WAVE)",
  "Hiatt WR, et al. Ticagrelor versus clopidogrel in symptomatic peripheral artery disease. N Engl J Med. 2017;376:32-40. (EUCLID)",
  "Moll F, et al. Management of peripheral arterial disease. Eur J Vasc Endovasc Surg. 2024;67:1-82.",
  "Devereaux PJ, et al. Aspirin in patients undergoing noncardiac surgery. N Engl J Med. 2014;370:1494-1503. (POISE-2)",
  "Anand SS, et al. Major adverse limb events and mortality in patients with peripheral artery disease: the COMPASS trial. J Am Coll Cardiol. 2018;71:2306-2315.",
];

export function PeripheralArterialDiseaseGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Antithrombotic Therapy</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Peripheral Arterial Disease</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span>Atherothromboembolism Management</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To guide antithrombotic therapy selection in patients with peripheral arterial disease, including stable symptomatic PAD, post-revascularization, and periprocedural management.
        </div>
      </div>

      {/* Dosing quick-reference */}
      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div>
          <h3>Key Antithrombotic Dosing</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Dose</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {dosingRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td className="font-bold text-foreground">{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="PAD guide sections">
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

        {/* ─── Overview ─── */}
        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />Disease Overview</h3>
              <ul className="list-none p-0 space-y-1">
                <li>PAD reflects widespread atherosclerosis and confers elevated risk of <strong>MACE</strong> (cardiac death, myocardial infarction, stroke) and <strong>MALE</strong> (acute limb ischemia, amputation).</li>
                <li>PAD is now considered a disease of <strong>atherothromboembolism</strong> — management often requires antiplatelet therapy with or without anticoagulation.</li>
                <li>Antithrombotic therapy is one pillar; aggressive risk factor control is equally important: dyslipidemia management, hypertension control, diabetes optimization, smoking cessation, and supervised exercise therapy.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />Management Pillars</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Antithrombotic Therapy</div>
                  <div className="text-sm leading-relaxed">Single antiplatelet, dual pathway (rivaroxaban 2.5 mg BID + ASA), or DAPT in selected settings</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Dyslipidemia</div>
                  <div className="text-sm leading-relaxed">High-intensity statin; target LDL reduction per guidelines</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Hypertension</div>
                  <div className="text-sm leading-relaxed">Target BP per current guidelines; ACEi/ARB preferred</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Diabetes</div>
                  <div className="text-sm leading-relaxed">Glycemic optimization; consider SGLT2i for cardiovascular benefit</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Smoking Cessation</div>
                  <div className="text-sm leading-relaxed">Most modifiable risk factor in PAD progression</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Exercise Therapy</div>
                  <div className="text-sm leading-relaxed">Supervised exercise programs improve claudication distance and quality of life</div>
                </div>
              </div>
            </article>
          </div>
        ) : null}

        {/* ─── Symptomatic PAD ─── */}
        {tab === "symptomatic" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />Single Antiplatelet Therapy (Standard of Care)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Single antiplatelet therapy (ASA 81 mg daily or clopidogrel 75 mg daily) is the standard of care for reducing MACE in symptomatic PAD.</li>
                <li><strong>CAPRIE trial:</strong> Clopidogrel was slightly superior to ASA in the PAD subgroup for prevention of ischemic events.</li>
                <li><strong>Ticagrelor (EUCLID):</strong> No benefit over clopidogrel for MACE or MALE reduction, with more side effects. Not preferred.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />Dual Antiplatelet Therapy (DAPT)</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>CHARISMA trial:</strong> ASA + clopidogrel versus ASA alone showed no significant reduction in overall MACE or major bleeding difference in the broad PAD population.</li>
                <li>PAD subgroup analysis: 37% lower rate of myocardial infarction, but no reduction in stroke, cardiovascular death, or limb events.</li>
                <li><strong>Vorapaxar</strong> added to antiplatelet therapy reduced limb events but caused significantly increased severe bleeding and intracranial hemorrhage. Not recommended.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Asymptomatic PAD / Low ABI:</strong> Patients with reduced ankle-brachial index but no symptoms of PAD have NO evidence supporting antiplatelet benefit. Do not initiate antiplatelet therapy solely based on low ABI without symptoms.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />Full-Dose Anticoagulation — Do NOT Add</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>WAVE trial:</strong> Full-dose oral anticoagulation (warfarin, INR 2–3) added to antiplatelet therapy provided no benefit for MACE or limb events and caused a <strong>3.4-fold increase in life-threatening bleeding</strong>.</li>
                <li>Do NOT add full-dose anticoagulation to antiplatelet therapy for PAD indication alone.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />Patients Already on OAC (e.g., for Atrial Fibrillation)</h3>
              <ul className="list-none p-0 space-y-1">
                <li>For patients already on oral anticoagulation for another indication such as atrial fibrillation, adding antiplatelet therapy is generally NOT required once more than 1 year has elapsed from the most recent coronary or peripheral vascular event.</li>
                <li>The bleeding risk from combined therapy typically outweighs incremental antithrombotic benefit beyond the first year.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ─── Revascularization ─── */}
        {tab === "revascularization" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />Post-Revascularization: Preferred Regimen</h3>
              <ul className="list-none p-0 space-y-1">
                <li>After endovascular or open revascularization, <strong>rivaroxaban 2.5 mg BID + ASA 81 mg daily</strong> is recommended unless the patient has high bleeding risk.</li>
                <li>For high-risk endovascular stenting, clopidogrel may be added to rivaroxaban + ASA for a <strong>maximum of 30 days</strong>, then discontinued.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />VOYAGER PAD Trial</h3>
              <ul className="list-none p-0 space-y-1">
                <li>6,564 patients post-peripheral revascularization randomized to rivaroxaban 2.5 mg BID + ASA versus ASA alone.</li>
                <li><strong>15% relative risk reduction</strong> in the primary composite endpoint (acute limb ischemia, major amputation, MI, ischemic stroke, cardiovascular death) at 3 years.</li>
                <li>No excess in fatal bleeding or intracranial hemorrhage.</li>
                <li>ISTH major bleeding modestly increased; net clinical benefit favoured the dual-pathway regimen.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />If Ineligible for Rivaroxaban</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>Endovascular procedure:</strong> DAPT (ASA + clopidogrel) for 1–3 months, then step down to single antiplatelet.</li>
                <li><strong>Open surgical revascularization:</strong> Single antiplatelet therapy or full-dose oral anticoagulation (based on graft type and clinical context).</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />Acute Limb Ischemia</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Initiate heparin emergently upon diagnosis of acute limb ischemia.</li>
                <li>Optimal long-term antithrombotic regimen after acute revascularization remains uncertain.</li>
                <li>Consider rivaroxaban 2.5 mg BID + ASA as a minimum post-procedure antithrombotic strategy.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ─── COMPASS / VOYAGER ─── */}
        {tab === "compass" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />COMPASS Trial — Chronic Stable PAD</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Rivaroxaban 2.5 mg BID + ASA versus ASA alone in patients with chronic stable PAD.</li>
                <li><strong>28% relative risk reduction</strong> in MACE (cardiovascular death, MI, stroke).</li>
                <li><strong>46% relative risk reduction</strong> in severe limb ischemia and major vascular intervention.</li>
                <li>Major bleeding was increased, but there was no increase in fatal bleeding or intracranial hemorrhage.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />Risk Stratification — Who Benefits Most?</h3>
              <p style={{ marginBottom: "0.75rem", color: "var(--text-secondary, #94a3b8)" }}>
                Absolute risk reduction (ARR) in MACE + MALE by patient risk profile. Major bleeding absolute increase was less than 1.0% across all subgroups.
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Subgroup</th>
                    <th>Criteria</th>
                    <th>Absolute Risk Reduction</th>
                  </tr>
                </thead>
                <tbody>
                  {compassSubgroups.map((row) => (
                    <tr key={row[0]}>
                      <td><strong>{row[0]}</strong></td>
                      <td>{row[1]}</td>
                      <td className="font-bold text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <div>
                <strong>Regulatory approval:</strong> Rivaroxaban 2.5 mg BID + ASA is approved in Canada for patients with symptomatic PAD at high risk of ischemic events, based on COMPASS and VOYAGER PAD data.
              </div>
            </div>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />Clinical Takeaway</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Patients with HRLP or HRCM features derive the greatest net clinical benefit from dual-pathway therapy.</li>
                <li>In patients with neither high-risk profile, the absolute benefit is modest (1.0% ARR), and the decision should be individualized based on bleeding risk.</li>
                <li>The bleeding increase was primarily gastrointestinal and did not result in excess fatal or intracranial events.</li>
              </ul>
            </article>
          </div>
        ) : null}

        {/* ─── Periprocedural ─── */}
        {tab === "periprocedural" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />ASA Periprocedural Management</h3>
              <ul className="list-none p-0 space-y-1">
                <li><strong>POISE-2 trial:</strong> Continuing ASA perioperatively does not decrease perioperative MACE but increases bleeding.</li>
                <li>Vascular surgery subgroup: withdrawal of ASA did not increase vascular complications.</li>
                <li><strong>Low bleeding risk procedure:</strong> Continue ASA through the periprocedural period.</li>
                <li><strong>High bleeding risk procedure:</strong> Discontinue ASA 7 days before the procedure.</li>
              </ul>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />Low-Dose Rivaroxaban Periprocedural Management</h3>
              <ul className="list-none p-0 space-y-1">
                <li>Discontinue rivaroxaban 2.5 mg BID approximately <strong>12–24 hours before</strong> most surgical procedures.</li>
                <li>Highest bleeding risk period: <strong>2 days post-procedure</strong>.</li>
                <li>Bleeding risk significantly decreases by <strong>day 8</strong> post-procedure.</li>
                <li>Resume rivaroxaban when adequate hemostasis is achieved and surgical bleeding risk has diminished.</li>
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <div>
                <strong>Key Principle:</strong> Perioperative antithrombotic management must balance the risk of ischemic limb and cardiovascular events against the risk of surgical bleeding. Individualize based on procedure type and patient risk profile.
              </div>
            </div>
          </div>
        ) : null}

        {/* ─── References ─── */}
        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />Key References</h3>
              <ol className="list-none p-0 space-y-1">
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="asa">ASA</GuideLink> | <GuideLink to="clopidogrel">Clopidogrel</GuideLink> | <GuideLink to="rivaroxaban">Rivaroxaban</GuideLink> | <GuideLink to="anticoagAntiplatelet">Anticoagulation + Antiplatelet</GuideLink> | <GuideLink to="periopAntiplatelet">Perioperative Antiplatelet</GuideLink></p>
              </div>
            </article>
          </div>
        ) : null}
      </div>
    </section>
  );
}
