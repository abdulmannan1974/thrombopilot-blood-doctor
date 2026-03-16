import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "treatment", label: "Treatment" },
  { id: "prevention", label: "Prevention" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "references", label: "References" },
];

const riskFactors = [
  { factor: "Catheter type", detail: "PICCs > centrally inserted catheters > implanted ports" },
  { factor: "Catheter size", detail: "Larger diameter, multiple lumens increase risk" },
  { factor: "Tip malposition", detail: "Non-optimal tip placement significantly increases risk" },
  { factor: "Left-sided placement", detail: "Left-sided insertion carries higher DVT risk" },
  { factor: "Concomitant infection", detail: "Active catheter-site or systemic infection" },
  { factor: "History of DVT", detail: "Prior VTE substantially elevates risk" },
  { factor: "Cancer type/stage", detail: "Advanced malignancy, especially with chemotherapy" },
  { factor: "Thrombophilia", detail: "Heritable thrombophilias likely increase risk; screening not routinely indicated" },
];

const imagingOptions = [
  {
    modality: "Duplex Ultrasonography",
    role: "First-line investigation",
    notes: "Best initial test; limited for isolated subclavian or more central veins (obscured by clavicle/chest wall)",
    badge: "preferred",
  },
  {
    modality: "MRI / CT Venography",
    role: "Problem-solving",
    notes: "Required when ultrasound is inconclusive due to anatomical hindrance",
    badge: "second-line",
  },
  {
    modality: "Direct Contrast Venography",
    role: "Gold standard (rarely used)",
    notes: "Invasive; difficult to obtain; reserved for complex cases",
    badge: "invasive",
  },
  {
    modality: "Clinical Decision Rules + D-dimer",
    role: "Not recommended in CVAD patients",
    notes: "Limited efficiency in central venous catheter patients; not recommended",
    badge: "not-recommended",
  },
];

const treatmentRows = [
  {
    phase: "Acute (0–10 days)",
    anticoagulant: "LMWH or DOAC",
    detail: "Both effective and safe (meta-analysis evidence). Initiate promptly on diagnosis.",
  },
  {
    phase: "Transition",
    anticoagulant: "LMWH → Warfarin",
    detail: "Minimum 5-day overlap; continue until INR therapeutic on 2 consecutive readings",
  },
  {
    phase: "Longer-term",
    anticoagulant: "LMWH alone, LMWH→Warfarin, or DOAC",
    detail: "Continue while catheter in situ; re-assess monthly",
  },
];

const durationRows = [
  {
    location: "Axillary vein or more proximal (subclavian, innominate, SVC)",
    duration: "Minimum 3 months, or longer if catheter remains in place",
    evidence: "Standard recommendation",
  },
  {
    location: "Brachial vein only",
    duration: "Case-by-case; full or lower-dose anticoagulation may be reasonable",
    evidence: "Limited data; no RCT evidence",
  },
  {
    location: "Superficial veins (cephalic, basilic) only",
    duration: "Case-by-case; anticoagulation has not been formally studied",
    evidence: "Expert opinion only",
  },
];

const catheterDecisionPoints = [
  {
    scenario: "Catheter still needed, functioning, no infection",
    action: "Continue catheter + anticoagulate",
    rationale: "Removal not required",
  },
  {
    scenario: "Symptoms persist or worsen despite anticoagulation",
    action: "Consider catheter removal",
    rationale: "Ongoing stimulus for thrombus; may perpetuate DVT",
  },
  {
    scenario: "Catheter-associated infection",
    action: "Remove catheter",
    rationale: "Infection is an independent indication for removal",
  },
  {
    scenario: "Extensive DVT with limb threat",
    action: "Consult thrombosis/IR for catheter-directed thrombolysis",
    rationale: "Limited data; case-by-case decision with specialist",
  },
];

const prophylaxisEvidence = [
  {
    agent: "Apixaban (low dose)",
    population: "Ambulatory cancer, Khorana ≥2",
    trial: "AVERT",
    result: "Effective VTE prophylaxis; not specifically CVAD patients",
  },
  {
    agent: "Rivaroxaban (low dose)",
    population: "Ambulatory cancer, Khorana ≥2",
    trial: "CASSINI",
    result: "Effective; TRIM-Line trial ongoing specifically for CVAD patients",
  },
  {
    agent: "Rivaroxaban (TRIM-Line pilot)",
    population: "Cancer patients with CVAD",
    trial: "TRIM-Line pilot (completed)",
    result: "Full-scale TRIM-Line trial underway; results pending",
  },
  {
    agent: "Apixaban in children (ALL/lymphoma + CVAD)",
    population: "Pediatric ALL/lymphoma",
    trial: "PREVAPIX-ALL",
    result: "No significant VTE benefit; bleeding higher in apixaban arm — not routinely recommended",
  },
];

const pedTreatmentRows = [
  {
    agent: "LMWH",
    role: "First-line treatment",
    notes: "Mainstay of catheter-related DVT treatment in pediatrics; well-established",
  },
  {
    agent: "Warfarin",
    role: "Long-term option",
    notes: "Standard oral option in pediatrics; requires INR monitoring",
  },
  {
    agent: "Dabigatran",
    role: "DOAC option (age-appropriate formulation)",
    notes: "DIVERSITY trial: similar efficacy/bleeding vs standard of care in children",
  },
  {
    agent: "Rivaroxaban",
    role: "DOAC option",
    notes: "Einstein Ped trial: similar efficacy/bleeding vs standard of care in children",
  },
];

const references = [
  "Wang TF, et al. Management of catheter-related upper extremity deep vein thrombosis in patients with cancer: a systematic review and meta-analysis. J Thromb Haemost 2024;22(3):749-764.",
  "King HL, et al. Unveiling the complexities of catheter-related thrombosis: risk factors, preventive strategies, and management. J Thromb Thrombolysis. 2025 Mar 5.",
  "Kahale LA, et al. Anticoagulation for people with cancer and central venous catheters. Cochrane Database Syst Rev 2018;6:CD006468.",
  "Li A, et al. Efficacy and safety of primary thromboprophylaxis for the prevention of VTE in patients with cancer and a central venous catheter. Thromb Res 2021;208:58-65.",
  "Ikesaka R, et al. Thromboprophylaxis with rivaroxaban in patients with malignancy and central venous lines (TRIM-Line). Res Pract Thromb Haemost 2021;5(4):e12517.",
  "Carrier M, et al. Apixaban to prevent venous thromboembolism in patients with cancer. N Engl J Med 2019;380:711-719.",
  "Khorana AA, et al. Rivaroxaban for thromboprophylaxis in high-risk ambulatory patients with cancer. N Engl J Med 2019;380(8):720-728.",
  "O'Brien SH, et al. Apixaban versus no anticoagulation for VTE prevention in children with ALL/lymphoma and CVAD (PREVAPIX-ALL). Lancet Haematol 2024;11(1):e27-e37.",
  "Halton J, et al. Dabigatran for acute VTE in children (DIVERSITY). Lancet Haematol 2021;8(1):e22-e33.",
  "Male C, et al. Rivaroxaban vs standard anticoagulants for VTE in children. Lancet Haematol 2020;7(1):e18-e27.",
  "Chopra V, et al. Risk of VTE following PICC exchange: analysis of 23,000 hospitalized patients. Am J Med 2018;131(6):651-660.",
  "Zwicker JI, et al. Catheter-associated deep vein thrombosis of the upper extremity in cancer patients. J Thromb Haemost 2014;12(5):796-800.",
  "Monagle P, et al. Antithrombotic therapy in neonates and children. Chest 2012;141(2 Suppl):e737S-801S.",
];

const badgeClass = (b) => {
  if (b === "preferred") return "asa-badge asa-badge-blue";
  if (b === "second-line") return "asa-badge asa-badge-amber";
  if (b === "invasive") return "asa-badge asa-badge-orange";
  if (b === "not-recommended") return "asa-badge asa-badge-red";
  return "asa-badge";
};

export function CvadThrombosisGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid gap-4">
      {/* Header */}
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Clinical Guide</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Updated Feb 2026</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight mt-1">Central Venous Catheter-Related DVT</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Diagnosis, treatment, and prevention of catheter-associated upper extremity deep vein thrombosis — including cancer patients and pediatric populations.
          </p>
        </div>
      </div>

      {/* Tabs */}
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
            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Key Principle:</strong> Catheter removal is <em>not</em> required if the CVAD is still needed, functioning, and not infected. Treat with anticoagulation and reassess.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Background</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Central venous catheters are widely used for chemotherapy, antibiotics, transfusion, dialysis, parenteral nutrition, and supportive care. Catheter-related DVT incidence ranges from <strong>2–70%</strong> across studies, driven by differences in screening criteria, patient populations, and follow-up duration.
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Risk Factors</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Risk Factor</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {riskFactors.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.factor}</strong></td>
                      <td>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Clinical Presentation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Arm/hand swelling", detail: "Unilateral; ipsilateral to catheter insertion side" },
                  { label: "Neck/shoulder pain", detail: "Pain or swelling in the neck, shoulder, or supraclavicular fossa" },
                  { label: "Visible collaterals", detail: "Prominent collateral veins on the chest wall" },
                  { label: "SVC syndrome", detail: "Facial swelling, dyspnoea, headache — suggests more central/extensive thrombosis" },
                  { label: "Asymptomatic", detail: "Many cases detected incidentally on imaging" },
                  { label: "Embolism symptoms", detail: "Pulmonary embolism or paradoxical stroke should prompt DVT evaluation" },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</span>
                    <span className="text-sm">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Outcomes at 3 Months (with treatment)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recurrent VTE risk</span>
                  <span className="text-sm" style={{ color: "var(--tone-green-text)", fontWeight: 700 }}>0.6%</span>
                </div>
                <div className="rounded-lg border p-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Major bleeding risk</span>
                  <span className="text-sm" style={{ color: "var(--tone-danger-text)", fontWeight: 700 }}>2.3%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIAGNOSIS */}
        {activeTab === "diagnosis" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Important:</strong> Clinical decision rules combined with D-dimer are <strong>not recommended</strong> for ruling out catheter-related DVT — their efficiency is limited in this population.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Imaging Strategy</h2>
              <div className="grid gap-3.5" style={{ gap: "0.75rem" }}>
                {imagingOptions.map((img, i) => (
                  <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <strong>{img.modality}</strong>
                      <span className={badgeClass(img.badge)}>{img.role}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4" style={{ margin: 0 }}>{img.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Anatomical Challenge</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Isolated subclavian vein or more central venous thrombosis may not be visualized on ultrasonography due to obstruction by the clavicle and chest wall. In these cases, proceed to MRI or CT venography before concluding there is no thrombosis.
              </p>
            </div>
          </div>
        )}

        {/* TREATMENT */}
        {activeTab === "treatment" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Anticoagulation Sequence</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Preferred Agent(s)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.phase}</strong></td>
                      <td>{r.anticoagulant}</td>
                      <td>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Treatment Duration by Thrombosis Location</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>DVT Location</th>
                    <th>Recommended Duration</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {durationRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.location}</strong></td>
                      <td>{r.duration}</td>
                      <td style={{ color: "var(--tone-gray-text)", fontSize: "0.85em" }}>{r.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Catheter Management Decision Tree</h2>
              <div className="grid gap-3.5" style={{ gap: "0.75rem" }}>
                {catheterDecisionPoints.map((d, i) => (
                  <div key={i} className="rounded-xl border bg-card shadow-sm p-5" style={{ margin: 0, borderLeft: "3px solid var(--primary)" }}>
                    <p style={{ margin: "0 0 0.3rem", fontWeight: 600, color: "var(--foreground)" }}>{d.scenario}</p>
                    <p style={{ margin: "0 0 0.2rem" }}><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Action</span> {d.action}</p>
                    <p className="text-sm text-foreground leading-relaxed mb-4" style={{ margin: 0, fontSize: "0.85em" }}>{d.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Catheter-directed thrombolysis:</strong> Limited data for extensive catheter-related DVT. Remains a case-by-case decision — consult thrombosis specialist and/or interventional radiology.
            </div>
          </div>
        )}

        {/* PREVENTION */}
        {activeTab === "prevention" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Non-pharmacological Prevention (Most Important)</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Use central venous catheters <strong>only when necessary</strong></li>
                <li>Insert the <strong>smallest calibre</strong> catheter that satisfies clinical needs</li>
                <li>Remove catheters <strong>promptly</strong> when no longer required</li>
                <li>Avoid PICC exchange unless absolutely necessary — recently identified as an independent risk factor for DVT</li>
                <li>Optimize catheter tip position at time of insertion</li>
                <li>Prefer right-sided insertion over left-sided when feasible</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Pharmacological Prophylaxis — Key Trials</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Routine anticoagulation prophylaxis is <strong>not recommended</strong> for all catheterized patients. However, it may be considered in cancer patients where thrombosis risk outweighs bleeding risk (e.g., prior VTE, high Khorana score).
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Population</th>
                    <th>Trial</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {prophylaxisEvidence.map((p, i) => (
                    <tr key={i}>
                      <td><strong>{p.agent}</strong></td>
                      <td>{p.population}</td>
                      <td style={{ fontStyle: "italic" }}>{p.trial}</td>
                      <td style={{ fontSize: "0.88em" }}>{p.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 shadow-sm p-5">
              <strong>Systematic review finding:</strong> Anticoagulation prophylaxis (DOACs, LMWH, warfarin) in cancer patients with CVADs reduces symptomatic catheter-related VTE by approximately <strong>40–50%</strong>, with no difference in major bleeding or mortality.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">When to Consider Prophylaxis</h2>
              <ul className="list-none p-0 space-y-1">
                <li>Cancer patients with <strong>prior VTE</strong> who require a new CVAD</li>
                <li>High Khorana score (≥2) in ambulatory cancer patients</li>
                <li>Weigh benefit vs. bleeding risk and anticoagulation burden individually</li>
              </ul>
            </div>
          </div>
        )}

        {/* PEDIATRICS */}
        {activeTab === "pediatrics" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Epidemiology</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Incidence of catheter-related DVT in children: <strong>3–34%</strong>, varying by patient population and diagnostic modality. CVADs are frequently necessary in children requiring supportive care (chemotherapy, parenteral nutrition, antibiotics, transfusions).
              </p>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Prophylaxis in Children</h2>
              <ul className="list-none p-0 space-y-1">
                <li><strong>No prior VTE:</strong> Thromboprophylaxis not routinely recommended</li>
                <li><strong>Long-term VTE risk factors</strong> (home TPN, haemodialysis): prophylaxis could be considered</li>
                <li><strong>Cancer without prior VTE:</strong> CVAD alone is not an indication; consider if additional risk factors present (asparaginase, obesity, hormonal contraceptives, adolescence, surgical hospitalisation)</li>
                <li><strong>PREVAPIX-ALL (apixaban in ALL/lymphoma + CVAD):</strong> No VTE benefit; bleeding slightly higher — apixaban not routinely recommended in this group</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h2 className="text-base font-semibold mb-2">Treatment Options in Children</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Role</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {pedTreatmentRows.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.agent}</strong></td>
                      <td>{r.role}</td>
                      <td style={{ fontSize: "0.88em" }}>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-900 shadow-sm p-5">
              <strong>Specialist involvement:</strong> A paediatrician with thromboembolism expertise should be involved in decisions wherever possible. When unavailable, combine neonatologist/paediatrician + adult haematologist + remote consultation with a paediatric haematology expert.
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
              <div style={{ marginTop: "1.5rem", fontSize: "0.82em", color: "var(--muted-foreground)" }}>
                <p>Related: <GuideLink to="cancer">Cancer &amp; Thrombosis</GuideLink> | <GuideLink to="dvtTreatment">DVT Treatment</GuideLink> | <GuideLink to="vteDuration">VTE Duration</GuideLink></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
