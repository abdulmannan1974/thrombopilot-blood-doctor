import { useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  FileText,
  Info,
  Luggage,
  Plane,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["prevention", "Prevention"],
  ["compression", "Compression"],
  ["medication", "Medication"],
  ["recommendations", "Recommendations"],
  ["references", "References"],
];

const riskFactors = [
  "Obesity with BMI greater than 30.",
  "Hormonal therapy.",
  "Known thrombophilia.",
  "Pregnancy and the postpartum period.",
  "Active cancer.",
  "Recent major surgery or hospitalization.",
  "Advanced age over 40 years.",
  "Extremes of height over 190 cm or under 160 cm.",
  "Prior history of venous thromboembolism.",
  "Window seating may increase risk, especially in passengers with obesity.",
];

const overviewStats = [
  ["Relative risk", "Three-fold increase in VTE risk after long-distance travel compared with no travel exposure."],
  ["Symptomatic VTE", "Approximately 1 in 4,656 person-flights after journeys longer than 4 hours."],
  ["Pulmonary embolism", "0.39 cases per 1 million travellers immediately after air travel, increasing with flights longer than 8 hours."],
  ["Clinical context", "Risk remains lower than several other transient provoking factors such as knee arthroscopy or lower-limb cast immobilization."],
];

const generalMeasures = [
  "Get up and walk every 1 to 2 hours when possible.",
  "Choose an aisle seat to facilitate movement.",
  "Avoid constrictive clothing.",
  "Minimize under-seat baggage that restricts leg room.",
  "Maintain hydration and avoid alcohol during travel.",
];

const compressionPoints = [
  "Graduated compression stockings reduce leg swelling symptoms and may help prevent travel-related DVT.",
  "Randomized trial data suggest roughly 90% reduction in asymptomatic DVT among travellers wearing compression stockings.",
  "Passengers with additional VTE risk factors appeared to benefit most.",
  "The clinical significance of small asymptomatic DVTs detected on screening ultrasound remains uncertain.",
];

const recommendationRows = [
  [
    "Baseline risk travellers",
    "Use frequent ambulation, calf exercises, hydration, and practical mobility measures.",
    "Do not routinely use compression stockings, aspirin, or anticoagulants in travellers without additional risk factors.",
  ],
  [
    "Travellers already on anticoagulation",
    "Continue existing prophylactic or treatment-dose anticoagulation.",
    "No additional VTE prophylaxis is required; monitor usual medication timing around departure.",
  ],
  [
    "Increased-risk travellers",
    "Recommend bilateral below-knee graduated compression stockings.",
    "Use 20 to 30 mmHg stockings for long-distance travel over 4 hours.",
  ],
  [
    "Very high-risk travellers",
    "Consider a single prophylactic anticoagulant dose shortly before travel.",
    "Make an individualized decision after weighing thrombosis risk, bleeding risk, and patient preferences.",
  ],
];

const references = [
  "Cannegieter SC, et al. Travel-related venous thrombosis: results from a large population-based case control study (MEGA Study). PLoS Med. 2006;3:1258-1265.",
  "Cesarone MR, et al. Venous thrombosis from air travel: The LONFLIT3 study. Angiology. 2002;53:1-6.",
  "Chandra D, et al. Meta-analysis: travel and risk for venous thromboembolism. Ann Intern Med. 2009;151:180-190.",
  "Clarke MJ, et al. Compression stockings for preventing deep vein thrombosis in airline passengers. Cochrane Database Syst Rev. 2021;4:CD004002.",
  "Czuprynska J, Arya R. Travel and thrombosis. Br J Haematol. 2020;188:833-843.",
  "Karsanji DJ, et al. The risk and prevention of venous thromboembolism in the pregnant traveller. J Travel Med. 2020;27:1-8.",
  "Koh CH. Commercial air travel for passengers with cardiovascular disease. Curr Probl Cardiol. 2021;46:100782.",
  "Kuipers S, et al. The absolute risk of venous thromboembolism after air travel. PLoS Med. 2007;4:1508-1514.",
  "Kuipers S, et al. The incidence of venous thromboembolism in commercial airline pilots. J Thromb Haemost. 2014;12:1260-1265.",
  "Perez-Rodriguez E, et al. Incidence of air travel-related pulmonary embolism at Madrid-Barajas airport. Arch Intern Med. 2003;163:2766-2770.",
  "Schunemann HJ, et al. American Society of Hematology 2018 guidelines for management of venous thromboembolism. Blood Adv. 2018;2:3198-3225.",
  "Van Adrichem R, et al. Thromboprophylaxis after knee arthroscopy and lower-leg casting. N Engl J Med. 2017;376:515-525.",
];

function Dot({ tone }) {
  return <span className={`asa-dot ${tone}`} />;
}

export function TravelThrombosisGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">Travel Medicine</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">VTE Prevention</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mt-1">Air Travel-related Thrombosis</h2>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
              <span><Calendar size={13} /> Updated 6 February 2026</span>
              <span><FileText size={13} /> Long-distance travel risk reduction guide</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-teal-200 bg-teal-50 text-teal-600 flex-shrink-0">
            <Plane size={24} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/60 text-sm text-muted-foreground border border-border/50">
          <strong>Objective:</strong> To summarize the available literature on venous thromboembolism risk during air travel and provide preventive recommendations for long-distance journeys.
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm p-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-teal-200 bg-teal-50 text-teal-600 mb-2">
          <Waves size={18} />
        </div>
        <div>
          <h3>Clinical Background</h3>
          <p>Travel-related thrombosis is likely multifactorial, with contributions from immobility and venous stasis, cabin hypobaric conditions, dehydration, and passenger-specific thrombotic risk factors.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-1 p-1 rounded-xl bg-muted" role="tablist" aria-label="Air travel thrombosis guide sections">
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

        {tab === "overview" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="blue" />Risk Overview</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>Clinical meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {overviewStats.map((row) => (
                    <tr key={row[0]}>
                      <td className="font-bold text-foreground">{row[0]}</td>
                      <td>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Key Risk Factors</h3>
              <ul className="list-none p-0 space-y-1">
                {riskFactors.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
        ) : null}

        {tab === "prevention" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="teal" />General Preventive Measures</h3>
              <div className="travel-card-grid">
                {generalMeasures.map((item) => (
                  <div key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start p-4">
                    <div className="w-7 h-7 grid place-items-center rounded-full bg-teal-100 text-teal-600 flex-shrink-0"><CheckCircle2 size={16} /></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900">
              <Info size={16} />
              <div>General preventive measures are widely accepted despite limited direct interventional trial evidence.</div>
            </div>
          </div>
        ) : null}

        {tab === "compression" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="purple" />Compression Stockings</h3>
              <ul className="list-none p-0 space-y-1">
                {compressionPoints.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <ShieldCheck size={16} />
              <div>For long-distance travellers at increased VTE risk, bilateral below-knee graduated compression stockings of 20 to 30 mmHg are recommended.</div>
            </div>
          </div>
        ) : null}

        {tab === "medication" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="orange" />Aspirin and Anticoagulants</h3>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Routine use of aspirin or anticoagulants for travel-related prophylaxis is not recommended for most travellers. Evidence is limited, and the clinical significance of prevented asymptomatic DVT remains uncertain.
              </p>
              <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                <AlertCircle size={16} />
                <div>A short course of prophylactic anticoagulation may be considered only in very high-risk travellers after individualized assessment. DOAC prophylaxis for this setting has not been adequately studied.</div>
              </div>
              <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                <Luggage size={16} />
                <div>DOACs should not be used for short-term travel prophylaxis in pregnant or breastfeeding patients.</div>
              </div>
            </article>
          </div>
        ) : null}

        {tab === "recommendations" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="green" />Practical Recommendations</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Traveller profile</th>
                    <th>Recommended approach</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendationRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="font-bold text-foreground">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <div className="flex gap-3 p-3.5 rounded-lg border border-teal-200 bg-teal-50 text-teal-900">
              <Users size={16} />
              <div>For travellers already receiving prophylactic or treatment-dose anticoagulation for another indication, no extra travel prophylaxis is required beyond usual dosing discipline.</div>
            </div>
          </div>
        ) : null}

        {tab === "references" ? (
          <div className="grid gap-3.5">
            <article className="rounded-xl border bg-card shadow-sm p-5">
              <h3><Dot tone="gray" />References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <div style={{ marginTop: "1rem", fontSize: "0.82em", color: "var(--muted)" }}>
                <p>Related: <GuideLink to="prophylaxisMedical">Thromboprophylaxis: Medical Patients</GuideLink> | <GuideLink to="dvtDiagnosis">DVT Diagnosis</GuideLink> | <GuideLink to="peDiagnosis">PE Diagnosis</GuideLink></p>
              </div>
            </article>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border bg-muted/50 p-4 text-xs text-muted-foreground">
        <p><strong>Air Travel-related Thrombosis</strong> | Updated 6 February 2026</p>
        <p>Use these recommendations with clinical judgement and tailor advice to thrombosis risk, bleeding risk, and journey duration.</p>
      </div>
    </section>
  );
}
