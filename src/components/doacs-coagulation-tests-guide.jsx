import { useState } from "react";
import { GuideLink } from "./guide-link";

const tabs = [
  ["overview", "Overview"],
  ["dabigatran", "Dabigatran"],
  ["fxa", "Factor Xa Inhibitors"],
  ["clinical", "Clinical Use"],
  ["references", "References"],
];

const coagEffects = [
  {
    drug: "Dabigatran",
    ptInr: "Variably elevated (reagent-dependent)",
    aptt: "Elevated (may be normal at trough)",
    tct: "Markedly elevated (most sensitive test)",
  },
  {
    drug: "Rivaroxaban",
    ptInr: "Variably elevated",
    aptt: "Mildly elevated",
    tct: "Not affected",
  },
  {
    drug: "Apixaban",
    ptInr: "Minimal effect",
    aptt: "Minimal effect",
    tct: "Not affected",
  },
  {
    drug: "Edoxaban",
    ptInr: "Variably elevated (reagent-dependent)",
    aptt: "Variably elevated (reagent-dependent)",
    tct: "Not affected",
  },
];

const references = [
  "Cuker A, et al. Laboratory measurement of the anticoagulant activity of the non-vitamin K oral anticoagulants. J Am Coll Cardiol. 2014;64(11):1128-1139.",
  "Chornenki NLJ, et al. Laboratory monitoring of direct oral anticoagulants. CMAJ. 2022;194:E1135.",
  "Douxfils J, et al. Laboratory testing in patients treated with direct oral anticoagulants: a practical guide for clinicians. J Thromb Haemost. 2018;16:209-19.",
  "Gosselin R, et al. International Council for Standardization in Haematology (ICSH) recommendations for laboratory measurement of direct oral anticoagulants. Int J Lab Hematol. 2016;38(5):505-513.",
  "Gosselin R, et al. Measuring dabigatran concentrations using a chromogenic ecarin-based assay: methods and clinical applications. Thromb Haemost. 2018;118:437-450.",
  "Gosselin R, et al. The laboratory's role in evaluating patients receiving direct oral anticoagulants. Int J Lab Hematol. 2019;41(Suppl. 1):33-39.",
  "Mithoowani S, et al. Direct oral anticoagulant laboratory testing in clinical practice. Thromb Res. 2022;215:1-4.",
  "Samuelson BT, et al. Laboratory assessment of the anticoagulant activity of direct oral anticoagulants: a systematic review. Chest. 2017;151(1):127-138.",
];

export function DoacsCoagulationTestsGuide() {
  const [tab, setTab] = useState("overview");

  return (
    <section className="grid gap-4">
      {/* ── Header ── */}
      <div className="rounded-xl border bg-card shadow-sm p-6">
        <p className="flex flex-wrap gap-2 mb-2">Clinical Guide</p>
        <h2 className="text-2xl font-bold leading-tight mt-1">DOACs: Coagulation Tests</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Laboratory assessment of coagulation in patients receiving direct oral
          anticoagulants (DOACs), including routine and specific assays.
        </p>
      </div>

      {/* ── Tabs ── */}
      <nav className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
        {tabs.map(([key, label]) => (
          <button
            key={key}
            className={`asa-tab-btn${tab === key ? " active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="grid gap-4">
        {/* ═══════════════ OVERVIEW ═══════════════ */}
        {tab === "overview" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Four Approved DOACs</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    <strong>Dabigatran (Pradaxa)</strong> &mdash; direct thrombin
                    (Factor IIa) inhibitor
                  </li>
                  <li>
                    <strong>Apixaban (Eliquis)</strong> &mdash; direct Factor Xa
                    inhibitor
                  </li>
                  <li>
                    <strong>Edoxaban (Lixiana)</strong> &mdash; direct Factor Xa
                    inhibitor
                  </li>
                  <li>
                    <strong>Rivaroxaban (Xarelto)</strong> &mdash; direct Factor Xa
                    inhibitor
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>Critical Limitation:</strong> There is NO routinely available
              laboratory test that reliably assesses the anticoagulant effect of
              DOACs in the way that INR monitors warfarin or aPTT monitors
              unfractionated heparin. Do NOT use routine coagulation tests to
              monitor DOAC therapeutic effect.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">INR and PT Considerations</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  The INR/ISI calculation system was developed based on vitamin K
                  antagonist (VKA) sensitivity and is not validated for DOACs. The
                  INR value in a patient on a DOAC is unreliable for clinical
                  decision-making. Laboratories may report the PT in seconds in
                  addition to the INR, which can provide some qualitative
                  information depending on the DOAC and reagent used.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Summary: DOAC Effects on Routine Coagulation Tests
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>PT / INR</th>
                      <th>aPTT</th>
                      <th>TCT (Thrombin Clotting Time)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coagEffects.map((row) => (
                      <tr key={row.drug}>
                        <td>
                          <strong>{row.drug}</strong>
                        </td>
                        <td>{row.ptInr}</td>
                        <td>{row.aptt}</td>
                        <td>{row.tct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ DABIGATRAN ═══════════════ */}
        {tab === "dabigatran" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Dabigatran &mdash; Direct Thrombin Inhibitor
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  Dabigatran is a direct thrombin (Factor IIa) inhibitor with peak
                  plasma effect occurring <strong>1 to 3 hours</strong> after oral
                  dosing.
                </p>
                <ul>
                  <li>
                    <strong>At peak:</strong> INR approximately 1.5&ndash;1.8, aPTT
                    may exceed 2&times; the upper limit of normal, and TCT is
                    markedly elevated.
                  </li>
                  <li>
                    <strong>After peak:</strong> The effect on PT/INR and aPTT
                    diminishes significantly, but TCT remains prolonged even at
                    trough levels.
                  </li>
                  <li>
                    A <strong>normal TCT excludes</strong> clinically significant
                    dabigatran levels. The TCT is the most sensitive routine test
                    for dabigatran.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
              <strong>Caution:</strong> A normal PT/INR or aPTT CANNOT reliably
              exclude residual anticoagulant effect of dabigatran, particularly at
              trough levels. Only a normal TCT can provide this assurance.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Specific Quantitative Assays for Dabigatran
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    <strong>Dilute thrombin time (dTT)</strong> &mdash; quantitative,
                    linear relationship with dabigatran concentration
                  </li>
                  <li>
                    <strong>Ecarin-based assays</strong> (Ecarin Clotting Time or
                    Ecarin Chromogenic Assay) &mdash; specific for direct thrombin
                    inhibitors
                  </li>
                  <li>
                    <strong>Chromogenic anti-Factor IIa assay</strong> &mdash;
                    quantitative measurement
                  </li>
                </ul>
                <p>
                  These assays are <strong>not widely available</strong> and there
                  are <strong>no established therapeutic ranges</strong> to guide
                  clinical decisions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ FACTOR Xa INHIBITORS ═══════════════ */}
        {tab === "fxa" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Apixaban</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    Peak plasma effect approximately <strong>3 hours</strong>{" "}
                    post-dose.
                  </li>
                  <li>
                    Minimal effect on PT/INR and aPTT, even at peak
                    concentrations.
                  </li>
                  <li>TCT is unaffected.</li>
                  <li>
                    <strong>
                      No routine coagulation test is useful for assessing
                      apixaban levels.
                    </strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Rivaroxaban</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    Peak plasma effect <strong>1 to 3 hours</strong> post-dose.
                  </li>
                  <li>
                    Often elevates PT/INR (&gt;2&times; upper limit of normal) and
                    slightly elevates aPTT at peak; both diminish after peak.
                  </li>
                  <li>TCT is unaffected.</li>
                  <li>
                    A <strong>normal PT/INR does NOT exclude</strong> therapeutic
                    rivaroxaban levels, especially at trough.
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Edoxaban</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    Peak plasma effect <strong>1 to 2 hours</strong> post-dose.
                  </li>
                  <li>
                    Prolongs PT/INR and aPTT in a dose-dependent manner but is
                    insufficiently sensitive at low therapeutic levels.
                  </li>
                  <li>TCT is unaffected.</li>
                  <li>
                    A <strong>normal PT/INR does NOT exclude</strong> therapeutic
                    edoxaban levels.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <strong>For all Factor Xa inhibitors:</strong> Normal PT/INR and aPTT
              may be found despite therapeutic drug levels. No routine coagulation
              test can reliably exclude residual anticoagulant effect of apixaban,
              rivaroxaban, or edoxaban.
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Specific Assay: Anti-Xa with Drug-Specific Calibrators
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  The anti-Xa assay can quantitatively measure Factor Xa inhibitor
                  levels, but it <strong>must</strong> be calibrated with{" "}
                  <strong>drug-specific calibrators</strong> (not LMWH calibrators).
                  LMWH-calibrated anti-Xa assays are not interchangeable and will
                  produce inaccurate results.
                </p>
                <ul>
                  <li>
                    Drug-specific anti-Xa assays are <strong>not widely
                    available</strong>.
                  </li>
                  <li>
                    Antithrombin-supplemented anti-Xa methods may{" "}
                    <strong>overestimate</strong> DOAC levels and should be
                    interpreted with caution.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ CLINICAL USE ═══════════════ */}
        {tab === "clinical" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Assessment in the Bleeding Patient
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  In patients presenting with bleeding on a DOAC, the{" "}
                  <strong>timing of the last dose</strong> and{" "}
                  <strong>renal function</strong> are critical for interpreting any
                  laboratory results and estimating residual drug effect.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Dabigatran Bleeding</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    A highly elevated aPTT (&gt;80 seconds) and/or elevated TCT
                    suggests a <strong>significant anticoagulant effect</strong> is
                    likely present.
                  </li>
                  <li>
                    A normal aPTT can exclude above-therapy dabigatran levels but{" "}
                    <strong>cannot exclude on-therapy levels</strong>.
                  </li>
                  <li>
                    A normal TCT reliably excludes clinically significant
                    dabigatran levels.
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Factor Xa Inhibitor Bleeding
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  A normal PT/INR or aPTT should <strong>NOT</strong> be used to
                  suggest the absence of a significant residual anticoagulant
                  effect from apixaban, rivaroxaban, or edoxaban.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">Baseline and Ongoing Monitoring</h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <ul>
                  <li>
                    <strong>Baseline and at least yearly:</strong> serum creatinine
                    and estimated creatinine clearance (CrCl) using the
                    Cockcroft-Gault equation.
                  </li>
                  <li>
                    More frequent renal function monitoring in patients with renal
                    impairment, advancing age, or intercurrent illness.
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">
                Emerging Tests and Point-of-Care Devices
              </h3>
              <div className="text-sm text-foreground leading-relaxed mb-4">
                <p>
                  Newer coagulation assessment tools including thromboelastography
                  (TEG), rotational thromboelastometry (ROTEM), and point-of-care
                  (POC) devices <strong>require further study</strong> and should
                  be interpreted with caution in the context of DOAC therapy.
                </p>
                <p>
                  If specific DOAC assays are available at your institution,
                  discuss interpretation and clinical application with the
                  coagulation laboratory director.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ REFERENCES ═══════════════ */}
        {tab === "references" && (
          <div className="grid gap-3.5">
            <div className="rounded-xl border bg-card shadow-sm p-5">
              <h3 className="text-base font-semibold mb-2">References</h3>
              <ol className="list-none p-0 divide-y divide-border text-sm">
                {references.map((ref, i) => (
                  <li key={i}>{ref}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
