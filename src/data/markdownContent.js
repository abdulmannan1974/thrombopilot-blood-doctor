const markdownModules = import.meta.glob("../../*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const byFileName = Object.entries(markdownModules).reduce((accumulator, [path, content]) => {
  const fileName = path.split("/").pop();
  accumulator[fileName] = content;
  return accumulator;
}, {});

export const markdownByToolId = {
  perioperative: byFileName["01_Perioperative_Anticoagulant_Algorithm.md"] ?? "",
  "af-dosing": byFileName["02_Anticoagulant_Dosing_AF.md"] ?? "",
  thrombophilia: byFileName["03_Thrombophilia_Testing_Algorithm.md"] ?? "",
  vitt: byFileName["04_VITT_Algorithm.md"] ?? "",
  "wells-pe": byFileName["05_Wells_PE.md"] ?? "",
  "wells-dvt": byFileName["06_Wells_DVT.md"] ?? "",
  chads2: byFileName["07_CHADS2.md"] ?? "",
  "cha2ds2-vasc": byFileName["08_CHA2DS2_VASc.md"] ?? "",
  "has-bled": byFileName["09_HAS_BLED.md"] ?? "",
  perc: byFileName["10_PERC_Rule.md"] ?? "",
  pesi: byFileName["11_PESI.md"] ?? "",
  spesi: byFileName["12_Simplified_PESI.md"] ?? "",
  "timi-ua": byFileName["13_TIMI_UA_NSTEMI.md"] ?? "",
  "timi-stemi": byFileName["14_TIMI_STEMI.md"] ?? "",
  khorana: byFileName["15_Khorana_VTE_Cancer.md"] ?? "",
  "creatinine-clearance": byFileName["16_Creatinine_Clearance.md"] ?? "",
  abcd2: byFileName["17_ABCD2_TIA.md"] ?? "",
};
