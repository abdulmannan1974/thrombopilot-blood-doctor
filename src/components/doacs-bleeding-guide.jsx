import { useState } from "react";

const tabs = [
  ["overview", "Overview"],
  ["minor", "Minor & CRNM Bleeding"],
  ["major", "Major Bleeding"],
  ["reversal", "Reversal Agents"],
  ["references", "References"],
];

const halfLifeRows = [
  ["Dabigatran", "12-17 h", "Longer with impaired CrCl"],
  ["Rivaroxaban", "5-9 h (young) / 11-13 h (elderly)", ""],
  ["Apixaban", "8-15 h", ""],
  ["Edoxaban", "10-14 h", ""],
];

const references = [
  "Recommendations for Use of Prothrombin Complex Concentrates in Canada. National Advisory Committee on Blood and Blood Products. https://nacblood.ca",
  "Abraham NS, et al. ACG-CAG Clinical Practice Guideline: Management of Anticoagulants and Antiplatelets During Acute Gastrointestinal Bleeding and the Periendoscopic Period. Am J Gastroenterol. 2022;117(4):542-558.",
  "Cuker A, et al. Reversal of direct oral anticoagulants: Guidance from the Anticoagulation Forum. Am J Hematol. 2019;94:697.",
  "Levy JH, et al. When and how to use antidotes for the reversal of direct oral anticoagulants: guidance from the SSC of the ISTH. J Thromb Haemost. 2016;14:623-627.",
  "Greenberg SM, et al. 2022 Guideline for the Management of Patients with Spontaneous Intracerebral Hemorrhage. AHA/ASA. Stroke. 2022;53(7):e282-e361.",
  "Gomez-Outes A, et al. Meta-Analysis of Reversal Agents for Severe Bleeding Associated with Direct Oral Anticoagulants. J Am Coll Cardiol. 2021;77(24):2987-3001.",
  "Pollack CV, et al. Idarucizumab for dabigatran reversal. N Engl J Med. 2015;373(6):511-520.",
  "Sarode R. Direct oral anticoagulant monitoring: what laboratory tests are available to guide us? Hematology Am Soc Hematol Educ Program. 2019;2019(1):194-197.",
  "Siegal DM. What Have We Learned About DOAC Reversal? Hematology Am Soc Hematol Educ Program. 2019;2019(1):198-203.",
  "Tomaselli GF, et al. 2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2020;76(5):594-622.",
];

const relatedGuides = [
  "Apixaban (Eliquis)",
  "Dabigatran (Pradaxa)",
  "DOACs: Comparison and Frequently Asked Questions",
  "DOACs: Coagulation Tests",
  "DOACs: Peri-operative Management",
  "Edoxaban (Lixiana)",
  "Rivaroxaban (Xarelto)",
];

export function DoacsBleedingGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="asa-guide-shell">
      <div className="asa-guide-header">
        <p className="asa-guide-eyebrow">Thrombosis Canada &middot; Clinical Guide</p>
        <h2 className="asa-guide-title">DOACs: Management of Bleeding</h2>
        <p className="asa-guide-lead">
          Guidance for clinicians on the management of bleeding in patients receiving a direct oral anticoagulant (DOAC).
        </p>
      </div>

      <div className="asa-tab-bar" role="tablist">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            className={tab === id ? "asa-tab-btn active" : "asa-tab-btn"}
            aria-selected={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="asa-tab-body">
        {/* ── Overview ── */}
        {tab === "overview" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Background</h3>
              <p className="asa-section-copy">
                Four DOACs are approved for clinical use in Canada: <strong>apixaban</strong>, <strong>edoxaban</strong>, <strong>rivaroxaban</strong>, and <strong>dabigatran</strong>. Like all anticoagulants, bleeding is the major complication of DOAC therapy.
              </p>
              <p className="asa-section-copy">
                DOACs have short half-lives (generally ~10-12 hours in the absence of renal or hepatic dysfunction) and significant drug clearance occurs within 24 hours of ingestion.
              </p>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Specific Reversal Agents</h3>
              <ul className="asa-section-copy">
                <li><strong>Idarucizumab (Praxbind)</strong> &mdash; specific reversal agent for <em>dabigatran</em>. Indicated for acute serious bleeding or emergency surgery.</li>
                <li><strong>Andexanet alfa (Ondexxya)</strong> &mdash; specific antidote for factor Xa inhibitors <em>rivaroxaban</em> and <em>apixaban</em>. Indicated when rapid reversal is needed due to life-threatening or uncontrolled bleeding.</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Non-Specific Hemostatic Agents</h3>
              <p className="asa-section-copy">
                <strong>4-Factor PCC</strong> (Octaplex, Beriplex) or <strong>aPCC</strong> (FEIBA) may aid hemostasis by supplying coagulation factors to overcome anticoagulant effect, but they do <strong>not</strong> reverse the anticoagulant effect nor reduce the level of active drug.
              </p>
            </article>

            <div className="asa-alert asa-alert-blue">
              <strong>Systematic approach required:</strong> Appropriate management in all cases of bleeding requires assessment and management of the competing risks and consequences of both bleeding and thrombosis.
            </div>
          </div>
        )}

        {/* ── Minor & CRNM Bleeding ── */}
        {tab === "minor" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Minor Bleeding</h3>
              <p className="asa-section-copy" style={{ fontStyle: "italic", opacity: 0.85 }}>
                Examples: extremity bruising, hemorrhoidal bleeding, subconjunctival bleed, self-limited epistaxis
              </p>
              <ul className="asa-section-copy">
                <li>Continue DOAC and monitor</li>
                <li>Confirm the patient is receiving the appropriate drug and dose based on indication, age, weight, creatinine clearance, and co-medications</li>
                <li>Check hemoglobin, platelet count, creatinine, and liver function tests</li>
                <li>Review concomitant medications that may contribute to bleeding (e.g. antiplatelet therapies, NSAIDs)</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Clinically Relevant Non-Major (CRNM) Bleeding</h3>
              <p className="asa-section-copy" style={{ fontStyle: "italic", opacity: 0.85 }}>
                Non-life-threatening bleeding requiring medical attention: hemodynamically stable GI bleed, epistaxis, hematuria, menstrual bleeding
              </p>
              <ul className="asa-section-copy">
                <li><strong>Hold DOAC</strong></li>
                <li>Apply local hemostatic measures (compression, packing, suturing)</li>
                <li>Labs: hemoglobin, platelet count, PT/INR, aPTT, creatinine, LFTs, group &amp; screen</li>
                <li>If indicated, administer transfusion therapies as per guidelines</li>
                <li>Consultation for investigation and definitive management of bleeding source (endoscopy, interventional radiology, surgery)</li>
              </ul>

              <div className="asa-alert asa-alert-amber">
                <strong>Coagulation test interpretation:</strong> PT/INR and aPTT can &ldquo;rule in&rdquo; but are <strong>not sensitive enough</strong> to &ldquo;rule out&rdquo; clinically significant DOAC effect. Unexplained abnormalities suggest clinically significant DOAC levels are likely present. <strong>Exception:</strong> A normal thrombin time (TT) rules out the presence of dabigatran.
              </div>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Estimating Drug Clearance</h3>
              <p className="asa-section-copy">
                Determine whether clinically significant DOAC levels are likely present using: <strong>timing of last dose</strong>, <strong>drug half-life</strong>, and <strong>creatinine clearance (CrCl)</strong>.
              </p>
              <table className="asa-dose-table">
                <thead>
                  <tr>
                    <th>DOAC</th>
                    <th>Estimated Half-Life</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {halfLifeRows.map((row) => (
                    <tr key={row[0]}>
                      <td><strong>{row[0]}</strong></td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="asa-section-copy">
                <strong>If available with timely results AND the results would change management</strong>, consider measuring plasma DOAC concentration using a specific validated assay that provides a quantitative DOAC level.
              </p>
            </article>
          </div>
        )}

        {/* ── Major Bleeding ── */}
        {tab === "major" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Severe / Life-Threatening Bleeding</h3>
              <p className="asa-section-copy" style={{ fontStyle: "italic", opacity: 0.85 }}>
                Bleeding in a critical area or organ: intracranial, intraspinal/epidural, retroperitoneal, intramuscular with compartment syndrome, pericardial, hemodynamically unstable GI bleeding
              </p>

              <div className="asa-alert asa-alert-red">
                <strong>Consult expert URGENTLY</strong> &mdash; hematologist, internist, ER physician, or pharmacist &mdash; for advice regarding management of coagulopathy. Consult for definitive procedural intervention (GI, interventional radiology, surgery).
              </div>

              <ul className="asa-section-copy">
                <li><strong>Hold DOAC</strong></li>
                <li>Initiate resuscitation in a monitored setting</li>
                <li>Apply local hemostatic measures (compression, packing, suturing)</li>
                <li><strong>STAT labs:</strong> hemoglobin, platelet count, PT/INR, aPTT, creatinine, LFTs, group &amp; screen</li>
                <li>Same coagulation test interpretation caveats as CRNM bleeding (PT/INR and aPTT can rule in but not rule out; normal TT rules out dabigatran)</li>
                <li>Determine whether clinically significant DOAC levels are likely present (timing of last dose + drug half-life + CrCl)</li>
                <li>If available with timely results and would change management, measure plasma DOAC concentration with specific validated assay</li>
                <li>If indicated, administer transfusion therapies as per guidelines</li>
                <li><strong>Consider specific reversal or hemostatic agents</strong> (see Reversal Agents tab)</li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">When Bleeding Has Resolved</h3>
              <ol className="asa-section-copy">
                <li>Assess for resumption of anticoagulation when hemostasis is achieved, with consideration of patient values and preferences. Confirm ongoing indication.</li>
                <li>Estimate risks of recurrent bleeding and thrombosis with multidisciplinary input.</li>
                <li>Assess baseline labs (hemoglobin, platelets, creatinine, LFTs) and patient weight.</li>
                <li>Review concomitant medications and reassess need for agents that may contribute to bleeding (antiplatelets, NSAIDs, SSRIs, herbal supplements).</li>
                <li>Confirm appropriateness of anticoagulant type and dose based on indication, age, weight, and CrCl.</li>
                <li>Provide education and counselling regarding bleeding complications and when to seek medical attention.</li>
                <li>Ensure routine follow-up and reassessment at regular intervals.</li>
              </ol>
            </article>
          </div>
        )}

        {/* ── Reversal Agents ── */}
        {tab === "reversal" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Dabigatran Reversal</h3>
              <ul className="asa-section-copy">
                <li>
                  <strong>Idarucizumab (Praxbind)</strong>: 5 g IV (2 &times; 2.5 g vials). Complete reversal of anticoagulant effect expected within minutes.
                </li>
                <li>
                  If idarucizumab is <strong>not available</strong>: consider aPCC (FEIBA) or 4F-PCC (Octaplex/Beriplex) as alternative non-specific hemostatic therapies.
                </li>
                <li>
                  <strong>Hemodialysis</strong> can be considered as an adjunct (~65% removal of dabigatran after 4 hours).
                </li>
                <li>
                  Inform patients/families of potential thrombotic risk (stroke, MI, VTE) due to interruption of anticoagulation and administration of reversal agents, but emphasize that the consequences of uncontrolled bleeding likely exceed this risk.
                </li>
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Apixaban / Edoxaban / Rivaroxaban (Xa Inhibitors)</h3>
              <ul className="asa-section-copy">
                <li>
                  <strong>Andexanet alfa (Ondexxya)</strong>: specific antidote for factor Xa inhibitors rivaroxaban and apixaban. Indicated for adult patients when rapid reversal is needed due to life-threatening or uncontrolled bleeding.
                </li>
                <li>
                  <strong>4F-PCC</strong>: not a specific reversal agent but may aid hemostasis for patients with severe/life-threatening bleeding likely to have clinically significant drug levels.
                </li>
                <li>
                  Optimal 4F-PCC dosing is uncertain:
                  <ul>
                    <li>(i) 2000 units fixed dose, or</li>
                    <li>(ii) 25-50 units/kg, maximum single dose 3000 units</li>
                  </ul>
                </li>
                <li>Consult local institutional protocols or hematology/thrombosis for advice.</li>
              </ul>

              <div className="asa-alert asa-alert-amber">
                <strong>PCC/FEIBA are NOT antidotes.</strong> They do not affect the inhibitory effect of DOACs on factors IIa (thrombin) and Xa, and they do not affect DOAC drug levels. These agents may reduce bleeding by providing large amounts of exogenous factors II and X. They may be associated with a small increased prothrombotic risk.
              </div>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Non-Specific Therapies</h3>
              <ul className="asa-section-copy">
                <li>
                  <strong>Tranexamic acid (Cyclokapron)</strong>: No direct evidence of benefit in DOAC-associated bleeding, but early use has benefit in traumatic bleeding, postpartum bleeding, and cardiac surgery with a good safety profile. May be considered as an adjunct. <strong>Not recommended</strong> for genitourinary or gastrointestinal bleeding.
                </li>
                <li>
                  <strong>Recombinant factor VIIa (rFVIIa; NovoSeven)</strong>: Generally <strong>not recommended</strong> due to lack of benefit in animal and in vitro studies and associated prothrombotic risk.
                </li>
              </ul>
            </article>
          </div>
        )}

        {/* ── References ── */}
        {tab === "references" && (
          <div className="asa-sections">
            <article className="asa-section-card">
              <h3 className="asa-section-title">Related Thrombosis Canada Clinical Guides</h3>
              <ul className="asa-section-copy">
                {relatedGuides.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">References</h3>
              <ol className="asa-ref-list">
                {references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ol>
            </article>

            <article className="asa-section-card">
              <h3 className="asa-section-title">Special Considerations</h3>
              <p className="asa-section-copy">
                <strong>Pediatrics:</strong> There are no studies evaluating the management of bleeding in children receiving DOACs.
              </p>
            </article>

            <p className="asa-section-copy" style={{ opacity: 0.7, fontSize: "0.82rem", marginTop: "1rem" }}>
              Date of version: 16 October 2025 &middot; Source: Thrombosis Canada Clinical Guides &middot; Updated 6 February 2026
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
