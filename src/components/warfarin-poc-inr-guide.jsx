import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "approaches", label: "POC Testing Approaches" },
  { id: "suitability", label: "Patient Suitability" },
  { id: "references", label: "References" },
];

const suitabilityCriteria = [
  "Patient is aware of the commitment involved in self-testing or self-management.",
  "Patient has demonstrated acceptable adherence to INR testing visits and warfarin therapy.",
  "No physical or cognitive challenges that would preclude reliable use of the POC device.",
  "Patient has been trained and is able to perform the test reliably.",
  "Patient is willing and able to self-adjust warfarin dose using predetermined instructions and keeps accurate records.",
  "Patient has back-up support from a knowledgeable health professional.",
  "Patient is reviewed every 6–12 months in an anticoagulant clinic for quality check of technique and results.",
  "Patient can afford the POC device and ongoing test strip costs.",
];

const references = [
  "Christensen TD, Larsen TB. Point-of-care testing and home INR monitoring. J Thromb Haemost 2012;10(2):251-260.",
  "Heneghan CJ, et al. Self-monitoring and self-management of oral anticoagulation. Cochrane Database Syst Rev 2016, Issue 7. CD003839.",
  "Holbrook A, et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: ACCP guidelines. Chest 2012;141(2 Suppl):e152S-184S.",
  "CADTH Optimal Use Report. Self-monitoring of INR to guide anticoagulation with warfarin. Ottawa: CADTH; 2014.",
  "Sawicki PT. A structured teaching and self-management program for patients receiving oral anticoagulation. JAMA 1999;281(2):145-150.",
  "Wool GD. Benefits of point-of-care INR testing. Am J Clin Pathol 2019;151:1-17.",
];

export function WarfarinPocInrGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="asa-guide-shell">
      <div className="asa-guide-header">
        <div className="asa-guide-header-body">
          <div className="asa-guide-eyebrow">
            <span className="asa-badge asa-badge-blue">Thrombosis Canada</span>
            <span className="asa-badge">Clinical Guide</span>
          </div>
          <h1 className="asa-guide-title">Warfarin: Point-of-Care INR Monitoring</h1>
          <p className="asa-guide-lead">
            Point-of-care (POC) INR testing devices, self-testing and self-management approaches, and patient suitability criteria for home INR monitoring.
          </p>
        </div>
      </div>

      <div className="asa-tab-bar">
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

      <div className="asa-tab-body">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">What Is POC INR Testing?</h2>
              <p className="asa-section-copy">
                A point-of-care (POC) INR device is a <strong>small, portable instrument</strong> that measures blood clotting from a <strong>fingerstick capillary sample</strong>. It reports the result as an INR value within approximately <strong>one minute</strong>, enabling timely warfarin dose adjustments without the need for venipuncture or laboratory processing.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Evidence for Improved Outcomes</h2>
              <p className="asa-section-copy">
                In randomized controlled trials, POC testing with <strong>weekly INR measurement</strong> has been shown to improve <strong>time in therapeutic range (TTR)</strong> compared with standard laboratory-based monitoring. Higher TTR is directly associated with <strong>fewer thromboembolic events</strong> and <strong>fewer bleeding events</strong>.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">Accuracy</h2>
              <p className="asa-section-copy">
                POC INR results compared with laboratory INR values are generally <strong>within 15%</strong> of each other, which is similar to inter-laboratory variability between different hospital labs. These differences <strong>do not result in different dosing instructions</strong> in the vast majority of cases.
              </p>
            </div>

            <div className="asa-section-card asa-alert asa-alert-amber">
              <strong>Accuracy limitations:</strong> POC devices are <strong>less accurate when INR &gt;3.5</strong>. Results may be <strong>inaccurate</strong> in patients with severe anaemia or polycythaemia (haematocrit &lt;15% or &gt;55%), co-administration of other anticoagulants (e.g., heparin, DOACs), or the presence of <strong>antiphospholipid antibodies</strong>. In these situations, laboratory INR testing should be used.
            </div>
          </div>
        )}

        {/* POC TESTING APPROACHES */}
        {activeTab === "approaches" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">1. Clinic / Pharmacy / Office-Based Testing</h2>
              <p className="asa-section-copy">
                The patient attends a clinic, pharmacy, or physician's office where a POC device is used. The patient receives an <strong>immediate INR result</strong> and <strong>dosing adjustment from the clinician</strong> at the same visit, eliminating the delay associated with laboratory processing.
              </p>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">2. Patient Self-Management</h2>
              <p className="asa-section-copy">
                The patient performs the POC INR test at home <strong>and</strong> self-adjusts the warfarin dose using <strong>predetermined dosing instructions</strong> combined with personal experience. The patient maintains their own records and contacts their health professional only when results fall outside the expected range.
              </p>
              <div className="asa-alert asa-alert-blue" style={{ marginTop: "0.75rem" }}>
                <strong>Advantages of self-management:</strong> Empowers the patient in a manner similar to glucose self-monitoring in diabetes. Associated with <strong>cost savings</strong>, <strong>moderate improvements in TTR</strong>, and <strong>quality-of-life improvements</strong> including greater autonomy and confidence.
              </div>
            </div>

            <div className="asa-section-card">
              <h2 className="asa-section-title">3. Patient Self-Testing</h2>
              <p className="asa-section-copy">
                The patient performs the POC INR test at home but <strong>calls the clinician</strong> to report the result and receive dose adjustment advice. The patient does not self-adjust the dose.
              </p>
              <div className="asa-alert asa-alert-blue" style={{ marginTop: "0.75rem" }}>
                <strong>Advantages of self-testing:</strong> Particularly beneficial when access to laboratory INR testing is <strong>difficult</strong> (e.g., rural or remote locations, mobility limitations, frequent travel).
              </div>
            </div>
          </div>
        )}

        {/* PATIENT SUITABILITY */}
        {activeTab === "suitability" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">Suitability Criteria for Self-Testing / Self-Management</h2>
              <p className="asa-section-copy">
                All of the following criteria should be met before a patient is considered suitable for POC INR self-testing or self-management:
              </p>
              <ol style={{ margin: "0.75rem 0 0 1.25rem", lineHeight: 1.7 }}>
                {suitabilityCriteria.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="asa-section-card asa-alert asa-alert-blue">
              <strong>Children:</strong> Paediatric patients particularly benefit from POC INR self-testing due to the <strong>convenience</strong> and <strong>avoidance of venipuncture</strong>. Parental education and training is essential to ensure reliable testing and appropriate dose management.
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {activeTab === "references" && (
          <div className="asa-sections">
            <div className="asa-section-card">
              <h2 className="asa-section-title">References</h2>
              <ol className="asa-ref-list">
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
