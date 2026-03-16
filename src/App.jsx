import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  BrainCircuit,
  Calculator,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CircleAlert,
  CircleCheckBig,
  FileSearch,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Microscope,
  Pill,
  Printer,
  Search,
  ShieldAlert,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { toolCategories, tools } from "./data/tools";
import { clinicalContentByToolId } from "./data/markdownContent";
import { guideLibrary, resolveMarkdownTarget } from "./data/library";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AsaGuide } from "@/components/asa-guide";
import { HeartValvesGuide } from "@/components/heart-valves-guide";
import { TravelThrombosisGuide } from "@/components/travel-thrombosis-guide";
import { CancerThrombosisGuide } from "@/components/cancer-thrombosis-guide";
import { CvadThrombosisGuide } from "@/components/cvad-thrombosis-guide";
import { CerebralVenousThrombosisGuide } from "@/components/cerebral-venous-thrombosis-guide";
import { DvtDiagnosisGuide } from "@/components/dvt-diagnosis-guide";
import { DvtTreatmentGuide } from "@/components/dvt-treatment-guide";
import { HitGuide } from "@/components/hit-guide";
import { StrokePreventionAfGuide } from "@/components/stroke-prevention-af-guide";
import { PeDiagnosisGuide } from "@/components/pe-diagnosis-guide";
import { PeTreatmentGuide } from "@/components/pe-treatment-guide";
import { WarfarinGuide } from "@/components/warfarin-guide";
import { VteDurationGuide } from "@/components/vte-duration-guide";
import { ApsThrombophiliaGuide } from "@/components/aps-thrombophilia-guide";
import { ThrombophiliaNaturalAnticoagulantsGuide } from "@/components/thrombophilia-natural-anticoagulants-guide";
import { ThrombophiliaFvlPgmGuide } from "@/components/thrombophilia-fvl-pgm-guide";
import { ThrombophiliaHomocysteineGuide } from "@/components/thrombophilia-homocysteine-guide";
import { ThromboprophylaxisMedicalGuide } from "@/components/thromboprophylaxis-medical-guide";
import { ThromboprophylaxisNonOrthoGuide } from "@/components/thromboprophylaxis-non-ortho-guide";
import { ThromboprophylaxisOrthoGuide } from "@/components/thromboprophylaxis-ortho-guide";
import { PeHighIntermediateRiskGuide } from "@/components/pe-high-intermediate-risk-guide";
import { PtsGuide } from "@/components/pts-guide";
import { PvtGuide } from "@/components/pvt-guide";
import { SvtGuide } from "@/components/svt-guide";
import { VenaCavaFilterGuide } from "@/components/vena-cava-filter-guide";
import { VipitVittGuide } from "@/components/vipit-vitt-guide";
import { WarfarinInrManagementGuide } from "@/components/warfarin-inr-management-guide";
import { WarfarinPocInrGuide } from "@/components/warfarin-poc-inr-guide";
import { DoacsCoagulationTestsGuide } from "@/components/doacs-coagulation-tests-guide";
import { DoacsBleedingGuide } from "@/components/doacs-bleeding-guide";
import { DoacsPerioperativeGuide } from "@/components/doacs-perioperative-guide";
import { DoacsObesityGuide } from "@/components/doacs-obesity-guide";
import { PregnancyThromboprophylaxisGuide } from "@/components/pregnancy-thromboprophylaxis-guide";
import { PregnancyVteTreatmentGuide } from "@/components/pregnancy-vte-treatment-guide";
import { PregnancyDvtPeDiagnosisGuide } from "@/components/pregnancy-dvt-pe-diagnosis-guide";
import { IschemicStrokeSecondaryPreventionGuide } from "@/components/ischemic-stroke-secondary-prevention-guide";
import { StrokeThrombolysisGuide } from "@/components/stroke-thrombolysis-guide";
import { PeripheralArterialDiseaseGuide } from "@/components/peripheral-arterial-disease-guide";
import { AnticoagAntiplateletGuide } from "@/components/anticoag-antiplatelet-guide";
import { DaptDurationGuide } from "@/components/dapt-duration-guide";
import { HmbAnticoagulationGuide } from "@/components/hmb-anticoagulation-guide";
import { PerioperativeAntiplateletGuide } from "@/components/perioperative-antiplatelet-guide";
import { ApixabanGuide } from "@/components/apixaban-guide";
import { RivaroxabanGuide } from "@/components/rivaroxaban-guide";
import { DoacsComparisonGuide } from "@/components/doacs-comparison-guide";
import { DabigatranGuide } from "@/components/dabigatran-guide";
import { EdoxabanGuide } from "@/components/edoxaban-guide";
import { ClopidogrelGuide } from "@/components/clopidogrel-guide";
import { PrasugrelGuide } from "@/components/prasugrel-guide";
import { TicagrelorGuide } from "@/components/ticagrelor-guide";
import { CovidThromboprophylaxisGuide } from "@/components/covid-thromboprophylaxis-guide";
import { UfhLmwhFondaparinuxGuide } from "@/components/ufh-lmwh-fondaparinux-guide";
import { WarfarinPeriopGuide } from "@/components/warfarin-periop-guide";
import { GuideNavContext } from "@/components/guide-link";
import acuteGuidanceHtmlRaw from "../Thrombosis_Canada_Acute_Management_App (2).html?raw";

const siteName = "Blood\u{1FA78}Doctor CoagVision";

const toneMeta = {
  success: {
    label: "Ready to use",
    icon: CircleCheckBig,
  },
  warning: {
    label: "Review carefully",
    icon: CircleAlert,
  },
  danger: {
    label: "Urgent attention",
    icon: ShieldAlert,
  },
  neutral: {
    label: "Clinical support",
    icon: BadgeCheck,
  },
};

const globalToolDisclaimer = {
  text:
    "These general recommendations do not replace clinical judgement. Physicians must consider relative risks and benefits for each individual patient and consult with appropriate specialists.",
  source: "",
};

const acuteToolFrameMap = {
  "acute-af": "af",
  "acute-bleeding": "bleed",
  "acute-dvt": "dvt",
  "acute-pe": "pe",
};

const acuteFrameStyleOverrides = `
<style>
  :root {
    --navy: #0f172a !important;
    --red: #1d4ed8 !important;
    --blue: #ffffff !important;
    --light-blue: #f8fafc !important;
    --green: #166534 !important;
    --orange: #b45309 !important;
    --border: #e2e8f0 !important;
    --text: #0f172a !important;
    --muted: #475569 !important;
  }
  body {
    background: transparent !important;
    color: #0f172a !important;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  }
  header {
    background: #ffffff !important;
    color: #0f172a !important;
    border: 1px solid #e2e8f0 !important;
    border-bottom: none !important;
    border-radius: 18px 18px 0 0 !important;
    box-shadow: none !important;
    padding: 1rem 1.25rem !important;
  }
  header .logo { color: #111827 !important; }
  header .logo span,
  header .subtitle { color: #64748b !important; }
  .header-badge {
    background: #eff6ff !important;
    color: #1d4ed8 !important;
    border: 1px solid #bfdbfe !important;
    border-radius: 999px !important;
    padding: 0.35rem 0.75rem !important;
  }
  .tab-nav {
    background: transparent !important;
    border-left: 1px solid #e2e8f0 !important;
    border-right: 1px solid #e2e8f0 !important;
    border-bottom: none !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.6rem !important;
    padding: 0.95rem 1.25rem !important;
    overflow: visible !important;
  }
  .tab-nav button {
    background: #ffffff !important;
    color: #475569 !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 999px !important;
    padding: 0.72rem 1rem !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    margin-bottom: 0 !important;
  }
  .tab-nav button:hover {
    background: #eff6ff !important;
    color: #1d4ed8 !important;
  }
  .tab-nav button.active {
    background: #1d4ed8 !important;
    color: #ffffff !important;
    border-color: #1d4ed8 !important;
  }
  .tool-container {
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .tool-header {
    background: #ffffff !important;
    color: #0f172a !important;
    border: 1px solid #e2e8f0 !important;
    border-bottom: none !important;
    border-radius: 0 !important;
    padding: 1.25rem !important;
  }
  .tool-header h2,
  .tool-header p { color: inherit !important; }
  .tool-header p { color: #64748b !important; }
  .form-card {
    border: 1px solid #e2e8f0 !important;
    border-top: none !important;
    border-radius: 0 0 18px 18px !important;
    box-shadow: none !important;
    padding: 1.25rem !important;
    background: #ffffff !important;
  }
  .section {
    margin-bottom: 1.25rem !important;
    padding-bottom: 1.25rem !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }
  .section-label {
    color: #0f172a !important;
    font-weight: 700 !important;
  }
  .section-num {
    background: #1d4ed8 !important;
    color: #ffffff !important;
  }
  .option-item,
  .option-btn {
    background: #ffffff !important;
    color: #0f172a !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 14px !important;
    box-shadow: none !important;
  }
  .option-item:hover,
  .option-btn:hover {
    border-color: #1d4ed8 !important;
    background: #eff6ff !important;
  }
  .option-item.selected,
  .option-btn.selected,
  .option-item.active,
  .option-btn.active {
    background: #1d4ed8 !important;
    border-color: #1d4ed8 !important;
    color: #ffffff !important;
  }
  .option-item.selected *,
  .option-btn.selected *,
  .option-item.active *,
  .option-btn.active * {
    color: #ffffff !important;
  }
  .option-item input,
  .option-btn input { accent-color: #1d4ed8 !important; }
  .rec-box {
    border-radius: 16px !important;
    box-shadow: none !important;
  }
  .rec-box.primary {
    background: #1d4ed8 !important;
    color: #ffffff !important;
  }
  .dose-table th {
    background: #0f172a !important;
    color: #ffffff !important;
  }
  .btn-row {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.75rem !important;
    margin-top: 1rem !important;
  }
  .btn-next,
  .btn-reset,
  .btn-back {
    border-radius: 12px !important;
  }
  .btn-next { background: #1d4ed8 !important; }
  .btn-reset { background: #0f172a !important; }
  .btn,
  .btn-primary,
  .btn-reset,
  .acute-export-button {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.5rem !important;
    min-height: 2.8rem !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    padding: 0.75rem 1rem !important;
    font-weight: 700 !important;
    box-shadow: none !important;
  }
  .btn-primary {
    background: #1d4ed8 !important;
    border-color: #1d4ed8 !important;
    color: #ffffff !important;
  }
  .btn-reset {
    color: #ffffff !important;
  }
  .acute-export-row {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 0.75rem !important;
    margin-top: 1rem !important;
  }
  .acute-export-button {
    background: #ffffff !important;
    color: #0f172a !important;
  }
  .acute-export-button.primary {
    background: #0f172a !important;
    border-color: #0f172a !important;
    color: #ffffff !important;
  }
  .acute-report-panel {
    margin-top: 1rem !important;
    padding: 1rem !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 18px !important;
    background: #ffffff !important;
  }
  .acute-report-empty {
    color: #64748b !important;
    line-height: 1.7 !important;
  }
  .acute-report-sheet {
    display: grid !important;
    gap: 1rem !important;
  }
  .acute-report-header h4 {
    margin: 0.3rem 0 0 !important;
    font-size: 1.35rem !important;
    color: #0f172a !important;
  }
  .acute-report-header p {
    margin: 0.45rem 0 0 !important;
    color: #64748b !important;
  }
  .acute-report-eyebrow {
    font-size: 0.74rem !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.12em !important;
    color: #1d4ed8 !important;
  }
  .acute-report-grid {
    display: grid !important;
    gap: 1rem !important;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
  }
  .acute-report-card {
    border: 1px solid #e2e8f0 !important;
    border-radius: 16px !important;
    background: #f8fafc !important;
    padding: 1rem !important;
  }
  .acute-report-card h5 {
    margin: 0 0 0.85rem !important;
    color: #0f172a !important;
    font-size: 1rem !important;
  }
  .acute-report-table {
    width: 100% !important;
    border-collapse: collapse !important;
  }
  .acute-report-table td {
    padding: 0.6rem 0.2rem !important;
    vertical-align: top !important;
    border-bottom: 1px solid #e2e8f0 !important;
    color: #0f172a !important;
    line-height: 1.6 !important;
  }
  .acute-report-table td:first-child {
    width: 38% !important;
    font-weight: 700 !important;
    color: #334155 !important;
  }
  .acute-report-recommendations .rec-box:last-child {
    margin-bottom: 0 !important;
  }
  .acute-report-footer {
    padding-top: 0.35rem !important;
    color: #64748b !important;
    font-size: 0.85rem !important;
    line-height: 1.7 !important;
  }
  footer,
  .footer,
  .watermark,
  a[download] {
    display: none !important;
  }
</style>
`;

const sanitizeAcuteGuidanceHtml = (html, activeTool) => {
  if (!html) return "";

  const brandingCleaned = html
    .replaceAll("Thrombosis Canada — Acute Management Clinical Tools", "Blood\u{1FA78}Doctor Acute Management")
    .replaceAll("Thrombosis Canada", "Blood\u{1FA78}Doctor")
    .replaceAll("Clinical Decision Support", "Acute Management")
    .replaceAll("Visit the Blood\u{1FA78}Doctor website at www.blood\u{1FA78}doctor.ca", "")
    .replaceAll("powered by Vivomap®", "")
    .replaceAll("🫁 ", "")
    .replaceAll("❤️ ", "")
    .replaceAll("🩸 ", "")
    .replaceAll("🦵 ", "")
    .replaceAll("⚡ ", "")
    .replaceAll("✅ ", "")
    .replaceAll("⚠️ ", "")
    .replaceAll("🚨 ", "")
    .replaceAll("ℹ ", "")
    .replaceAll("ℹ️ ", "")
    .replace(/https?:\/\/thrombosiscanada\.ca[^\s"'<>)]*/gi, "#")
    .replace(/blob:https:\/\/thrombosiscanada\.ca[^"']*/gi, "#")
    .replace(/Based on Blood Doctor [^.]*\./gi, "Based on linked clinical guidance.")
    .replace(/Consult ESC 2019 and ACCP 2021 Guidelines and Blood Doctor Clinical Guides for complete guidance\./gi, "Use the linked guide library for expanded clinical detail.")
    .replace(/Thrombosis_Canada_Acute_Management_App\.html/gi, "Blood_Doctor_Acute_Management.html");

  const injectedScript = `
<script>
  (function () {
    var activeTool = ${JSON.stringify(activeTool)};
    function syncFrame() {
      if (typeof showTool === "function") {
        showTool(activeTool);
      }
      var logo = document.querySelector('header .logo');
      if (logo) {
        logo.innerHTML = 'Blood\u{1FA78}Doctor<span>Acute Management</span>';
      }
      var subtitle = document.querySelector('header .subtitle');
      if (subtitle) {
        subtitle.textContent = 'Urgent bedside pathways and escalation tools';
      }
      var badge = document.querySelector('.header-badge');
      if (badge) {
        badge.textContent = 'Acute Management';
      }
      document.querySelectorAll('footer, .footer, .watermark, a[download]').forEach(function (node) {
        node.remove();
      });
    }
    function cleanText(value) {
      return (value || '').replace(/\\s+/g, ' ').replace(/[\\u{1FA78}]/gu, '').trim();
    }
    function fieldLabelFor(input) {
      var group = input.closest('.input-group');
      if (group) {
        var label = group.querySelector('label');
        if (label) return cleanText(label.textContent);
      }
      return cleanText(input.getAttribute('placeholder') || input.name || input.id || 'Value');
    }
    function selectedOptionText(section) {
      var values = [];
      section.querySelectorAll('.option-item.selected label').forEach(function (label) {
        var text = cleanText(label.textContent);
        if (text) values.push(text);
      });
      return values;
    }
    function gatherSectionSummary(tool) {
      var panel = document.getElementById('tool-' + tool);
      if (!panel) return [];
      var rows = [];
      panel.querySelectorAll('.section').forEach(function (section) {
        var labelNode = section.querySelector('.section-label');
        if (!labelNode) return;
        var label = cleanText(labelNode.textContent.replace(/^\\d+/, ''));
        var answers = [];
        selectedOptionText(section).forEach(function (value) {
          if (value && answers.indexOf(value) === -1) answers.push(value);
        });
        section.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea, select').forEach(function (input) {
          var rawValue = input.value;
          if (rawValue == null) return;
          var value = cleanText(rawValue);
          if (!value) return;
          var field = fieldLabelFor(input);
          var combined = field && field !== value ? field + ': ' + value : value;
          if (combined && answers.indexOf(combined) === -1) answers.push(combined);
        });
        var dynamicResult = section.querySelector('#pesi-result');
        if (dynamicResult) {
          var resultText = cleanText(dynamicResult.textContent);
          if (resultText) answers.push(resultText);
        }
        if (answers.length) {
          rows.push({ label: label, value: answers.join('; ') });
        }
      });
      return rows;
    }
    function recommendationsReady(tool) {
      var node = document.getElementById(tool + '-recommendations');
      if (!node) return false;
      var text = cleanText(node.textContent);
      if (!text) return false;
      return !/complete all sections above|please select|enter patient data to generate/i.test(text);
    }
    function buildReportMarkup(tool) {
      var names = {
        pe: 'Pulmonary Embolism',
        af: 'Atrial Fibrillation',
        bleed: 'Bleed Management',
        dvt: 'Deep Vein Thrombosis'
      };
      var title = names[tool] || 'Acute Management';
      var rows = gatherSectionSummary(tool);
      var recNode = document.getElementById(tool + '-recommendations');
      var recHtml = recNode ? recNode.innerHTML : '';
      var summaryTable = rows.length
        ? '<table class="acute-report-table"><tbody>' + rows.map(function (row) {
            return '<tr><td>' + row.label + '</td><td>' + row.value + '</td></tr>';
          }).join('') + '</tbody></table>'
        : '<p>No structured patient inputs captured yet.</p>';
      return ''
        + '<div class="acute-report-sheet">'
        + '  <div class="acute-report-header">'
        + '    <span class="acute-report-eyebrow">Printable acute care plan</span>'
        + '    <h4>' + title + '</h4>'
        + '    <p>Generated ' + new Date().toLocaleString() + ' | Blood\u{1FA78}Doctor Acute Management</p>'
        + '  </div>'
        + '  <div class="acute-report-grid">'
        + '    <section class="acute-report-card">'
        + '      <h5>Case summary</h5>'
        +        summaryTable
        + '    </section>'
        + '    <section class="acute-report-card acute-report-recommendations">'
        + '      <h5>Assessment and plan</h5>'
        +        recHtml
        + '    </section>'
        + '  </div>'
        + '  <div class="acute-report-footer">'
        + '    These general recommendations do not replace clinical judgement. Physicians must consider relative risks and benefits for each individual patient and consult with appropriate specialists.'
        + '  </div>'
        + '</div>';
    }
    function ensureReportContainer(tool) {
      var panel = document.getElementById('tool-' + tool);
      if (!panel) return null;
      var report = panel.querySelector('#acute-report-' + tool);
      if (report) return report;
      var recNode = document.getElementById(tool + '-recommendations');
      if (!recNode) return null;
      report = document.createElement('section');
      report.className = 'acute-report-panel';
      report.id = 'acute-report-' + tool;
      report.innerHTML = '<div class="acute-report-empty">Generate recommendations to build a printable acute care plan.</div>';
      recNode.insertAdjacentElement('afterend', report);
      return report;
    }
    function renderReport(tool) {
      var report = ensureReportContainer(tool);
      if (!report) return;
      if (!recommendationsReady(tool)) {
        report.innerHTML = '<div class="acute-report-empty">Generate recommendations to build a printable acute care plan.</div>';
        postHeight();
        return;
      }
      report.innerHTML = buildReportMarkup(tool);
      postHeight();
    }
    function printReport(tool) {
      renderReport(tool);
      var report = document.getElementById('acute-report-' + tool);
      if (!report || !recommendationsReady(tool)) return;
      var win = window.open('', '_blank', 'width=1000,height=900');
      if (!win) return;
      win.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Acute Management Report</title>' + ${JSON.stringify(acuteFrameStyleOverrides)} + '</head><body><div class="tool-container" style="padding:24px;max-width:1000px;margin:0 auto;">' + report.innerHTML + '</div></body></html>');
      win.document.close();
      win.focus();
      setTimeout(function () { win.print(); }, 250);
    }
    function downloadWord(tool) {
      renderReport(tool);
      var report = document.getElementById('acute-report-' + tool);
      if (!report || !recommendationsReady(tool)) return;
      var doc = '<html><head><meta charset="utf-8">' + ${JSON.stringify(acuteFrameStyleOverrides)} + '</head><body><div class="tool-container" style="padding:24px;max-width:1000px;margin:0 auto;">' + report.innerHTML + '</div></body></html>';
      var blob = new Blob(['\\ufeff', doc], { type: 'application/msword' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Blood_Doctor_Acute_Management_' + tool + '.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
    function attachExportRow(tool) {
      var panel = document.getElementById('tool-' + tool);
      if (!panel || panel.querySelector('.acute-export-row')) return;
      var btnRow = panel.querySelector('.btn-row');
      if (!btnRow) return;
      var row = document.createElement('div');
      row.className = 'acute-export-row';
      row.innerHTML = ''
        + '<button type="button" class="acute-export-button primary">Generate report</button>'
        + '<button type="button" class="acute-export-button">Print / Save PDF</button>'
        + '<button type="button" class="acute-export-button">Download Word</button>';
      var buttons = row.querySelectorAll('button');
      buttons[0].addEventListener('click', function () { renderReport(tool); });
      buttons[1].addEventListener('click', function () { printReport(tool); });
      buttons[2].addEventListener('click', function () { downloadWord(tool); });
      btnRow.insertAdjacentElement('afterend', row);
    }
    function wrapGenerator(tool, generateName, resetName) {
      if (typeof window[generateName] === 'function' && !window[generateName].__bloodDoctorWrapped) {
        var originalGenerate = window[generateName];
        var wrappedGenerate = function () {
          var output = originalGenerate.apply(this, arguments);
          renderReport(tool);
          return output;
        };
        wrappedGenerate.__bloodDoctorWrapped = true;
        window[generateName] = wrappedGenerate;
      }
      if (typeof window[resetName] === 'function' && !window[resetName].__bloodDoctorWrapped) {
        var originalReset = window[resetName];
        var wrappedReset = function () {
          var output = originalReset.apply(this, arguments);
          var report = ensureReportContainer(tool);
          if (report) {
            report.innerHTML = '<div class="acute-report-empty">Generate recommendations to build a printable acute care plan.</div>';
          }
          postHeight();
          return output;
        };
        wrappedReset.__bloodDoctorWrapped = true;
        window[resetName] = wrappedReset;
      }
    }
    function enhanceAcuteTools() {
      [
        ['pe', 'peGenerate', 'peReset'],
        ['af', 'afGenerate', 'afReset'],
        ['bleed', 'bleedGenerate', 'bleedReset'],
        ['dvt', 'dvtGenerate', 'dvtReset']
      ].forEach(function (item) {
        attachExportRow(item[0]);
        ensureReportContainer(item[0]);
        wrapGenerator(item[0], item[1], item[2]);
      });
    }
    function postHeight() {
      var height = Math.max(
        document.body ? document.body.scrollHeight : 0,
        document.documentElement ? document.documentElement.scrollHeight : 0
      );
      parent.postMessage({ type: 'acute-frame-height', height: height }, '*');
    }
    window.addEventListener('load', function () {
      syncFrame();
      enhanceAcuteTools();
      postHeight();
      setTimeout(postHeight, 120);
    });
    window.addEventListener('resize', postHeight);
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(postHeight);
      ro.observe(document.documentElement);
      if (document.body) ro.observe(document.body);
    }
    setTimeout(function () {
      syncFrame();
      enhanceAcuteTools();
      postHeight();
    }, 10);
  })();
</script>
`;

  return brandingCleaned
    .replace("</head>", `${acuteFrameStyleOverrides}</head>`)
    .replace("</body>", `${injectedScript}</body>`);
};

const normalizeValue = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const getPageForToolId = (toolId) =>
  tools.find((tool) => tool.id === toolId)?.category === "algorithm" ? "algorithms" : "scores";
const buildGuideHref = (guideId, pageId = "guides") => `?guide=${encodeURIComponent(guideId)}#${pageId}`;
const buildToolHref = (toolId) => `?tool=${encodeURIComponent(toolId)}#${getPageForToolId(toolId)}`;

const pageDefinitions = [
  { id: "dashboard", label: "Dashboard", shortLabel: "Dashboard", icon: LayoutDashboard },
  { id: "algorithms", label: "Interactive Algorithms", shortLabel: "Algorithms", icon: BrainCircuit },
  { id: "acute", label: "Acute Management", shortLabel: "Acute", icon: HeartPulse },
  { id: "followup", label: "DOAC Follow-up", shortLabel: "DOAC Follow-up", icon: ClipboardList },
  { id: "scores", label: "Scoring Calculators", shortLabel: "Scores", icon: Calculator },
  { id: "guides", label: "Clinical Guides", shortLabel: "Guides", icon: BookOpenText },
];
const pageIds = new Set(pageDefinitions.map((page) => page.id));
const getPageFromHash = () => {
  const hashValue = window.location.hash.replace(/^#/, "").trim();
  return pageIds.has(hashValue) ? hashValue : "dashboard";
};
const pageCopy = {
  algorithms: {
    eyebrow: "Clinical tools index",
    title: "Interactive algorithms",
    description:
      "Decision pathways from the local clinical tools index, kept in a cleaner two-panel workspace with the active calculator and its reference stack side by side.",
  },
  acute: {
    eyebrow: "Acute pathways",
    title: "Acute management",
    description:
      "Rapid-access pathways for urgent rhythm, bleeding, DVT, and pulmonary embolism decisions, organized from the local acute-management reference file without carrying over source-site branding.",
  },
  followup: {
    eyebrow: "Clinical checklist",
    title: "DOAC follow-up",
    description:
      "Structured outpatient review checklist for direct oral anticoagulant therapy, with printable export for PDF and Word documentation.",
  },
  scores: {
    eyebrow: "Clinical tools index",
    title: "Scoring calculators",
    description:
      "Risk scores and renal dosing tools grouped into a calmer calculation workspace with faster switching and less visual clutter.",
  },
  guides: {
    eyebrow: "Clinical guides index",
    title: "Guide library",
    description:
      "A reading-focused guide browser with authentic references preserved and searchable clinical content.",
  },
};

const acuteManagementItems = [
  {
    id: "acute-af",
    title: "Atrial Fibrillation",
    shortTitle: "Atrial Fibrillation",
    category: "Rhythm instability",
    summary:
      "Urgent AF pathway focused on hemodynamic stability, valvular status, symptom duration, and recent stroke or TIA history.",
    prompts: [
      "Is the patient hemodynamically stable or unstable?",
      "Does the patient have valvular or non-valvular AF?",
      "For how long has the patient had non-valvular AF?",
      "Has the patient had a recent stroke or TIA?",
    ],
    action:
      "Use this section to triage urgent cardioversion questions and immediate anticoagulation context before moving into detailed dosing or long-term planning.",
  },
  {
    id: "acute-bleeding",
    title: "Bleed Management",
    shortTitle: "Bleed Management",
    category: "Bleeding emergencies",
    summary:
      "Urgent bleeding pathway centered on bleed severity, the anticoagulant involved, and INR-guided or drug-specific reversal planning.",
    prompts: [
      "What type of bleeding does the patient have?",
      "What type of anticoagulant did the patient receive?",
      "If the INR is known, please enter it.",
    ],
    action:
      "Use this section to structure initial stabilization, reversal decisions, and urgent escalation for clinically relevant or major bleeding.",
  },
  {
    id: "acute-dvt",
    title: "Deep Vein Thrombosis",
    shortTitle: "Deep Vein Thrombosis",
    category: "Venous thromboembolism",
    summary:
      "Acute DVT pathway emphasizing limb threat, iliofemoral involvement, cancer, pregnancy, and other features that change immediate treatment intensity.",
    prompts: [
      "Does the patient have massive iliofemoral DVT, such as phlegmasia?",
      "Please select all clinical modifiers that apply to the patient.",
    ],
    action:
      "Use this section to flag limb-threatening DVT, identify higher-risk subgroups, and separate standard anticoagulation from escalation pathways.",
  },
  {
    id: "acute-pe",
    title: "Pulmonary Embolism",
    shortTitle: "Pulmonary Embolism",
    category: "Venous thromboembolism",
    summary:
      "Acute PE pathway organized around hemodynamic stability, high-risk PE features, and escalation to reperfusion or ICU-level care when needed.",
    prompts: [
      "Is the patient stable or unstable?",
      "Please select all high-risk or contraindication features that apply.",
    ],
    action:
      "Use this section to separate unstable or deteriorating PE from lower-risk presentations and highlight when reperfusion discussions become urgent.",
  },
];

const acuteInitialState = {
  af: {
    stability: "",
    valvularStatus: "",
    duration: "",
    recentStrokeTia: "",
    chads2: "",
  },
  bleed: {
    severity: "",
    drug: "",
    inr: "",
    inrUnknown: false,
  },
  dvt: {
    massiveIliofemoral: "",
    modifiers: [],
  },
  pe: {
    stability: "",
    modifiers: [],
  },
};

const doacFollowupInitialState = {
  patientName: "",
  patientAge: "",
  weightKg: "",
  weightLb: "",
  sex: "",
  doac: "",
  chads2: "",
  healthRelevantProblems: false,
  healthEmbolicEvents: false,
  healthNone: false,
  healthComments: "",
  missedDoses: "",
  timingIssues: "",
  adherenceComments: "",
  hasBled: "",
  bleedGi: false,
  bleedOther: false,
  bleedHemoglobin: false,
  bleedHypotension: false,
  bleedNone: false,
  egfrDate: "",
  egfrResult: "",
  dehydratingIllness: "",
  renalComments: "",
  drugAsa: false,
  drugNsaid: false,
  drugOther: false,
  drugNone: false,
  bpSystolic: "",
  bpDiastolic: "",
  bpStatus: "",
  gaitReferral: "",
  stableContinue: "",
  doseVerified: "",
  therapyChanges: "",
  counselRationale: "",
  counselBleeding: "",
  counselAdherence: "",
  counselInteractions: "",
  nextFollowupDate: "",
  nextBloodworkDate: "",
  finalComments: "",
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatFollowupChoice = (value) => {
  if (value === true) {
    return "Yes";
  }

  if (value === false) {
    return "No";
  }

  if (value === "" || value === null || value === undefined) {
    return "Not recorded";
  }

  return String(value);
};

const buildYesNoLabel = (value) => {
  if (value === "yes") {
    return "Yes";
  }

  if (value === "no") {
    return "No";
  }

  return "Not recorded";
};

const getCheckedFollowupItems = (entries) =>
  entries.filter((entry) => entry.checked).map((entry) => entry.label);

const getDoacFollowupSummaryRows = (form) => {
  const healthItems = getCheckedFollowupItems([
    { label: "Relevant medical problems or hospital visits", checked: form.healthRelevantProblems },
    { label: "Embolic events", checked: form.healthEmbolicEvents },
    { label: "No interval health issues reported", checked: form.healthNone },
  ]);

  const bleedItems = getCheckedFollowupItems([
    { label: "GI bleeding symptoms", checked: form.bleedGi },
    { label: "Other bleeding symptoms", checked: form.bleedOther },
    { label: "Drop in hemoglobin or new anemia", checked: form.bleedHemoglobin },
    { label: "Hypotension with syncope or falls", checked: form.bleedHypotension },
    { label: "No bleeding concerns identified", checked: form.bleedNone },
  ]);

  const interactionItems = getCheckedFollowupItems([
    { label: "ASA or other antiplatelets", checked: form.drugAsa },
    { label: "NSAID exposure", checked: form.drugNsaid },
    { label: "Other interacting drugs", checked: form.drugOther },
    { label: "No interaction concerns recorded", checked: form.drugNone },
  ]);

  return [
    ["Patient name", form.patientName || "Not recorded"],
    ["Age", form.patientAge || "Not recorded"],
    ["Weight", form.weightKg ? `${form.weightKg} kg` : form.weightLb ? `${form.weightLb} lb` : "Not recorded"],
    ["Sex", form.sex || "Not recorded"],
    ["DOAC", form.doac || "Not recorded"],
    ["CHADS2", form.chads2 || "Not recorded"],
    ["Health status since last assessment", healthItems.length ? healthItems.join("; ") : "No items selected"],
    ["Missed doses in an average week", form.missedDoses || "Not recorded"],
    ["Issues with DOAC timing or administration", buildYesNoLabel(form.timingIssues)],
    ["HAS-BLED", form.hasBled || "Not recorded"],
    ["Bleeding review", bleedItems.length ? bleedItems.join("; ") : "No items selected"],
    ["Renal function", form.egfrResult ? `${form.egfrResult} (${form.egfrDate || "date not entered"})` : "Not recorded"],
    ["Recent dehydrating illness or medication change", buildYesNoLabel(form.dehydratingIllness)],
    ["Drug interactions", interactionItems.length ? interactionItems.join("; ") : "No items selected"],
    ["Blood pressure", form.bpSystolic || form.bpDiastolic ? `${form.bpSystolic || "?"}/${form.bpDiastolic || "?"}` : "Not recorded"],
    ["Blood pressure status", form.bpStatus || "Not recorded"],
    ["Falls-prevention referral needed", buildYesNoLabel(form.gaitReferral)],
    ["Overall stable to continue therapy", buildYesNoLabel(form.stableContinue)],
    ["Dose verified", buildYesNoLabel(form.doseVerified)],
    ["Therapy changes needed", buildYesNoLabel(form.therapyChanges)],
    ["Counselling: rationale", buildYesNoLabel(form.counselRationale)],
    ["Counselling: bleeding", buildYesNoLabel(form.counselBleeding)],
    ["Counselling: adherence", buildYesNoLabel(form.counselAdherence)],
    ["Counselling: interactions", buildYesNoLabel(form.counselInteractions)],
    ["Next follow-up date", form.nextFollowupDate || "Not recorded"],
    ["Next bloodwork", form.nextBloodworkDate || "Not recorded"],
    ["Additional comments", form.finalComments || form.healthComments || form.renalComments || form.adherenceComments || "None entered"],
  ];
};

const buildDoacFollowupDocument = (form) => {
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const rows = getDoacFollowupSummaryRows(form)
    .map(
      ([label, value]) => `
        <tr>
          <th>${escapeHtml(label)}</th>
          <td>${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const renderList = (items) =>
    items?.length
      ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "<p>None recorded.</p>";

  const renderParagraph = (value) =>
    value ? `<p>${escapeHtml(value)}</p>` : "<p>None recorded.</p>";

  const healthItems = getCheckedFollowupItems([
    { label: "Relevant medical problems, ED visits, or hospitalizations", checked: form.healthRelevantProblems },
    { label: "Embolic events", checked: form.healthEmbolicEvents },
    { label: "None of the above", checked: form.healthNone },
  ]);

  const bleedItems = getCheckedFollowupItems([
    { label: "Signs or symptoms of GI bleeding", checked: form.bleedGi },
    { label: "Signs or symptoms of other bleeding", checked: form.bleedOther },
    { label: "Drop in hemoglobin or new anemia", checked: form.bleedHemoglobin },
    { label: "Hypotension with syncope or falls", checked: form.bleedHypotension },
    { label: "None of the above", checked: form.bleedNone },
  ]);

  const interactionItems = getCheckedFollowupItems([
    { label: "ASA or other antiplatelets", checked: form.drugAsa },
    { label: "NSAID", checked: form.drugNsaid },
    { label: "Other drug interactions", checked: form.drugOther },
    { label: "None of the above", checked: form.drugNone },
  ]);

  const counsellingRows = [
    ["Rationale for continued DOAC therapy", buildYesNoLabel(form.counselRationale)],
    ["Bleeding discussion completed", buildYesNoLabel(form.counselBleeding)],
    ["Dosing and missed-dose counselling completed", buildYesNoLabel(form.counselAdherence)],
    ["OTC ASA, NSAIDs, and alcohol advice completed", buildYesNoLabel(form.counselInteractions)],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <th>${escapeHtml(label)}</th>
          <td>${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>DOAC Follow-up Checklist</title>
      <style>
        body { font-family: Arial, Helvetica, sans-serif; margin: 32px; color: #111827; background: #fff; }
        .sheet { border: 2px solid #23376b; }
        .sheet-header { background: #23376b; color: #fff; padding: 18px 24px; }
        .sheet-header h1 { margin: 0; font-size: 30px; }
        .sheet-date { padding: 18px 24px; border-top: 2px solid #23376b; font-size: 16px; }
        .sheet-section-title { padding: 16px 24px; border-top: 2px solid #23376b; font-size: 18px; font-weight: 700; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border-top: 1px solid #cbd5e1; padding: 14px 24px; vertical-align: top; text-align: left; }
        th { width: 34%; font-weight: 700; background: #f8fafc; }
        .content-section { padding: 0 24px 18px; border-top: 1px solid #cbd5e1; }
        .content-section h2 { font-size: 16px; margin: 18px 0 10px; color: #c2410c; text-transform: uppercase; letter-spacing: 0.04em; }
        .content-section p, .content-section li { line-height: 1.6; font-size: 15px; }
        .content-section ul { margin: 10px 0 0 20px; padding: 0; }
        .disclaimer { padding: 20px 24px; border-top: 2px solid #23376b; font-style: italic; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="sheet-header">
          <h1>Direct Oral Anticoagulant (DOAC) Follow-up Checklist</h1>
        </div>
        <div class="sheet-date">Date: ${escapeHtml(dateLabel)}</div>
        <div class="sheet-section-title">Summary of Patient Profile</div>
        <table>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <div class="content-section">
          <h2>Health status since last assessment</h2>
          ${renderList(healthItems)}
          ${renderParagraph(form.healthComments)}
        </div>
        <div class="content-section">
          <h2>Adherence with DOAC therapy</h2>
          <p>Missed doses in an average week: ${escapeHtml(form.missedDoses || "Not recorded")}</p>
          <p>Issues with timing or administration: ${escapeHtml(buildYesNoLabel(form.timingIssues))}</p>
          ${renderParagraph(form.adherenceComments)}
        </div>
        <div class="content-section">
          <h2>Bleeding risk assessment</h2>
          <p>HAS-BLED: ${escapeHtml(form.hasBled || "Not recorded")}</p>
          ${renderList(bleedItems)}
        </div>
        <div class="content-section">
          <h2>Renal function</h2>
          <p>Latest eGFR: ${escapeHtml(form.egfrResult || "Not recorded")}</p>
          <p>Date measured: ${escapeHtml(form.egfrDate || "Not recorded")}</p>
          <p>Recent dehydrating illness or medication changes: ${escapeHtml(buildYesNoLabel(form.dehydratingIllness))}</p>
          ${renderParagraph(form.renalComments)}
        </div>
        <div class="content-section">
          <h2>Drug interactions and examination</h2>
          ${renderList(interactionItems)}
          <p>Blood pressure: ${escapeHtml(form.bpSystolic || "?")}/${escapeHtml(form.bpDiastolic || "?")} mmHg</p>
          <p>Blood pressure status: ${escapeHtml(form.bpStatus || "Not recorded")}</p>
          <p>Falls-prevention referral needed: ${escapeHtml(buildYesNoLabel(form.gaitReferral))}</p>
        </div>
        <div class="content-section">
          <h2>Final assessment and counselling</h2>
          <table>
            <tbody>
              <tr>
                <th>Overall stable to continue current therapy</th>
                <td>${escapeHtml(buildYesNoLabel(form.stableContinue))}</td>
              </tr>
              <tr>
                <th>Dose verified as appropriate</th>
                <td>${escapeHtml(buildYesNoLabel(form.doseVerified))}</td>
              </tr>
              <tr>
                <th>Changes to therapy required</th>
                <td>${escapeHtml(buildYesNoLabel(form.therapyChanges))}</td>
              </tr>
              ${counsellingRows}
            </tbody>
          </table>
          <p>Next follow-up date: ${escapeHtml(form.nextFollowupDate || "Not recorded")}</p>
          <p>Next bloodwork: ${escapeHtml(form.nextBloodworkDate || "Not recorded")}</p>
          ${renderParagraph(form.finalComments)}
        </div>
        <div class="disclaimer">
          These general recommendations do not replace clinical judgement. Physicians must consider relative risks and benefits for each individual patient.
        </div>
      </div>
    </body>
  </html>`;
};

const referenceTabIconById = {
  overview: BookOpenText,
  criteria: Microscope,
  interpretation: Activity,
  application: HeartPulse,
  references: FileSearch,
};

const getInitialValues = (tool) =>
  tool.inputs.reduce((accumulator, input) => {
    if (input.defaultValue !== undefined) {
      accumulator[input.id] = input.defaultValue;
      return accumulator;
    }

    if (input.type === "checkbox") {
      accumulator[input.id] = false;
      return accumulator;
    }

    if ((input.type === "radio" || input.type === "select") && input.options?.length) {
      accumulator[input.id] = input.options[0].value;
      return accumulator;
    }

    accumulator[input.id] = "";
    return accumulator;
  }, {});

const toolStateDefaults = tools.reduce((accumulator, tool) => {
  accumulator[tool.id] = getInitialValues(tool);
  return accumulator;
}, {});

const getCompletion = (tool, values) => {
  const visibleInputs = tool.inputs.filter((input) => {
    if (input.type === "hidden") return false;
    if (input.visibleWhen && !input.visibleWhen(values ?? {})) return false;
    return true;
  });

  const completed = visibleInputs.filter((input) => {
    const value = values?.[input.id];

    if (input.type === "checkbox") {
      return value === true;
    }

    return value !== undefined && value !== null && value !== "";
  }).length;

  const total = visibleInputs.length || 1;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  };
};

const getToneClass = (tone) => tone ?? "neutral";

const getTab = (content, id) => content?.tabs?.find((tab) => tab.id === id) ?? null;
const getCards = (content, id) => getTab(content, id)?.cards ?? [];
const getBlocks = (content, id) => getCards(content, id).flatMap((card) => card.blocks ?? []);
const getFirstBlock = (content, id, type) => getBlocks(content, id).find((block) => block.type === type) ?? null;
const getFirstParagraphText = (content, id) => getFirstBlock(content, id, "paragraph")?.text ?? "";
const getFirstTable = (content, id) => getFirstBlock(content, id, "table");
const getFirstList = (content, id) => {
  const block = getBlocks(content, id).find(
    (item) => item.type === "bullet-list" || item.type === "ordered-list"
  );

  return block?.items ?? [];
};
const getPracticePoints = (content) => {
  if (!content?.tabs) return [];
  for (const tabId of ["application", "criteria", "overview"]) {
    const blocks = getBlocks(content, tabId);
    const list = blocks.find((b) => b.type === "bullet-list" || b.type === "ordered-list");
    if (list?.items?.length) return list.items;
    const facts = blocks.filter((b) => b.type === "fact");
    if (facts.length >= 2) return facts.map((f) => `${f.label}: ${f.value}`);
  }
  for (const tab of content.tabs) {
    const para = tab.cards?.[0]?.blocks?.find((b) => b.type === "paragraph");
    if (para?.text) {
      const sentences = para.text.split(/(?<=[.!?])\s+/).filter(s => s.length > 20).slice(0, 3);
      if (sentences.length) return sentences;
    }
  }
  return [];
};
const getReferenceItems = (content) => getBlocks(content, "references")
  .filter((block) => block.type === "reference-list")
  .flatMap((block) => block.items ?? []);
const trimSentence = (value, maxLength = 220) => {
  const safe = sanitizeDisplayText(value);
  if (safe.length <= maxLength) {
    return safe;
  }

  return `${safe.slice(0, maxLength).trim()}...`;
};

const getToolKeywords = (tool) =>
  normalizeValue([tool.title, tool.shortTitle, tool.blurb, ...(tool.tags ?? [])].join(" "))
    .split(" ")
    .filter((token) => token.length > 2);

const getRelatedGuides = (tool) => {
  const tokens = new Set(getToolKeywords(tool));

  return guideLibrary
    .map((guide) => {
      const score = guide.searchTokens.reduce(
        (total, token) => total + (tokens.has(token) ? 1 : 0),
        0
      );

      return {
        ...guide,
        matchScore: score,
      };
    })
    .filter((guide) => guide.matchScore > 0)
    .sort((left, right) => right.matchScore - left.matchScore || left.title.localeCompare(right.title))
    .slice(0, 6);
};

function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("coagvision-theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (t) => {
      if (t === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
      } else {
        root.classList.toggle("dark", t === "dark");
      }
    };
    applyTheme(theme);
    localStorage.setItem("coagvision-theme", theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const setTheme = (t) => setThemeState(t);
  return { theme, setTheme };
}

function ThemeToggle({ theme, setTheme }) {
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
        "border border-border bg-card text-muted-foreground",
        "hover:bg-accent hover:text-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label={`Theme: ${label}. Click to switch.`}
      title={`Theme: ${label}`}
    >
      <Icon size={14} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function App() {
  return (
    <SidebarProvider>
      <AppLayout />
    </SidebarProvider>
  );
}

function AppLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [activeToolId, setActiveToolId] = useState(tools[0]?.id ?? "");
  const [activeAcuteId, setActiveAcuteId] = useState(acuteManagementItems[0]?.id ?? "");
  const [acuteState, setAcuteState] = useState(acuteInitialState);
  const [doacFollowup, setDoacFollowup] = useState(doacFollowupInitialState);
  const [toolValues, setToolValues] = useState(toolStateDefaults);
  const [activeGuideId, setActiveGuideId] = useState(guideLibrary[0]?.id ?? "");
  const [activeGuideTab, setActiveGuideTab] = useState("overview");
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar();
  const { theme, setTheme } = useTheme();

  const toolSearch = searchTerm.trim().toLowerCase();
  const currentPageMeta = pageDefinitions.find((page) => page.id === currentPage) ?? pageDefinitions[0];

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#dashboard");
    }

    const syncPage = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", syncPage);

    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toolParam = params.get("tool");
    const guideParam = params.get("guide");
    const searchParam = params.get("search");
    const checklistParam = params.get("checklist");

    if (toolParam) {
      const matchedTool = tools.find((tool) => tool.id === toolParam);
      if (matchedTool) {
        setActiveToolId(matchedTool.id);
        setCurrentPage(matchedTool.category === "algorithm" ? "algorithms" : "scores");
      }
    }

    if (guideParam) {
      const matchedGuide = guideLibrary.find((guide) => guide.id === guideParam);
      if (matchedGuide) {
        setActiveGuideId(matchedGuide.id);
        setCurrentPage("guides");
      }
    }

    if (checklistParam === "doac-followup") {
      setCurrentPage("followup");
    }

    if (searchParam) {
      setSearchTerm(searchParam.replace(/\+/g, " "));
    }
  }, []);

  const navigateToPage = (pageId) => {
    if (!pageIds.has(pageId)) {
      return;
    }

    if (window.location.hash !== `#${pageId}`) {
      window.location.hash = pageId;
    }

    setCurrentPage(pageId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchableTools = useMemo(
    () =>
      tools.filter((tool) => {
        if (!toolSearch) {
          return true;
        }

        return [tool.title, tool.shortTitle, tool.blurb, ...(tool.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(toolSearch);
      }),
    [toolSearch]
  );

  const algorithmTools = useMemo(
    () => searchableTools.filter((tool) => tool.category === "algorithm"),
    [searchableTools]
  );

  const scoreTools = useMemo(
    () => searchableTools.filter((tool) => tool.category === "score" || tool.category === "renal"),
    [searchableTools]
  );

  const filteredGuides = useMemo(
    () =>
      guideLibrary.filter((guide) => {
        if (!toolSearch) {
          return true;
        }

        return guide.searchableText.includes(toolSearch);
      }),
    [toolSearch]
  );

  const filteredAcuteItems = useMemo(
    () =>
      acuteManagementItems.filter((item) => {
        if (!toolSearch) {
          return true;
        }

        return normalizeValue(`${item.title} ${item.category} ${item.summary} ${item.prompts.join(" ")}`).includes(toolSearch);
      }),
    [toolSearch]
  );

  const visibleTools =
    currentPage === "algorithms"
      ? algorithmTools
      : currentPage === "scores"
        ? scoreTools
        : searchableTools;

  useEffect(() => {
    if (visibleTools.length && !visibleTools.some((tool) => tool.id === activeToolId)) {
      setActiveToolId(visibleTools[0].id);
    }
  }, [activeToolId, visibleTools]);

  useEffect(() => {
    if (filteredGuides.length && !filteredGuides.some((guide) => guide.id === activeGuideId)) {
      setActiveGuideId(filteredGuides[0].id);
    }
  }, [activeGuideId, filteredGuides]);

  useEffect(() => {
    if (filteredAcuteItems.length && !filteredAcuteItems.some((item) => item.id === activeAcuteId)) {
      setActiveAcuteId(filteredAcuteItems[0].id);
    }
  }, [activeAcuteId, filteredAcuteItems]);

  const activeTool =
    visibleTools.find((tool) => tool.id === activeToolId) ??
    searchableTools.find((tool) => tool.id === activeToolId) ??
    tools.find((tool) => tool.id === activeToolId) ??
    tools[0];

  const activeValues = activeTool ? toolValues[activeTool.id] ?? {} : {};
  const result = activeTool ? activeTool.calculate(activeValues) : null;
  const relatedGuides = activeTool ? getRelatedGuides(activeTool) : [];
  const activeGuide =
    filteredGuides.find((guide) => guide.id === activeGuideId) ??
    guideLibrary.find((guide) => guide.id === activeGuideId) ??
    filteredGuides[0] ??
    null;
  const activeGuideOverview = trimSentence(getFirstParagraphText(activeGuide?.content, "overview") || activeGuide?.objective || activeGuide?.excerpt || "");
  const activeGuideApplicationList = getPracticePoints(activeGuide?.content).slice(0, 4);
  const activeGuideReferenceItems = getReferenceItems(activeGuide?.content).slice(0, 4);
  const activeAcuteItem =
    filteredAcuteItems.find((item) => item.id === activeAcuteId) ??
    acuteManagementItems.find((item) => item.id === activeAcuteId) ??
    filteredAcuteItems[0] ??
    acuteManagementItems[0] ??
    null;

  useEffect(() => {
    const firstTabId = activeGuide?.content?.tabs?.[0]?.id ?? "overview";
    setActiveGuideTab(firstTabId);
  }, [activeGuide?.id, activeGuide?.content?.tabs]);

  const stats = {
    tools: tools.length,
    guides: guideLibrary.length,
    categories: toolCategories.filter((category) => category.id !== "all").length,
  };

  const workspaceRows = useMemo(
    () =>
      tools.slice(0, 6).map((tool) => ({
        id: tool.id,
        name: tool.shortTitle,
        type: tool.badge,
        category:
          tool.category === "score"
            ? "Score"
            : tool.category === "algorithm"
              ? "Algorithm"
              : "Renal",
        inputs: tool.inputs.filter((input) => input.type !== "hidden").length,
        references: clinicalContentByToolId[tool.id]?.tabs.length ?? 0,
      })),
    []
  );

  const globalSearchResults = useMemo(() => {
    if (!toolSearch) {
      return [];
    }

    const toolResults = searchableTools.slice(0, 5).map((tool) => ({
      id: `tool-${tool.id}`,
      kind: "tool",
      title: tool.title,
      subtitle: tool.blurb,
      pageId: tool.category === "algorithm" ? "algorithms" : "scores",
      pageLabel: tool.category === "algorithm" ? "Algorithms" : "Scores",
      payloadId: tool.id,
      label: "Calculator",
    }));

    const guideResults = filteredGuides.slice(0, 4).map((guide) => ({
      id: `guide-${guide.id}`,
      kind: "guide",
      title: guide.title,
      subtitle: guide.category,
      pageId: "guides",
      pageLabel: "Guides",
      payloadId: guide.id,
      label: "Guide",
    }));

    const acuteResults = filteredAcuteItems.slice(0, 4).map((item) => ({
      id: `acute-${item.id}`,
      kind: "acute",
      title: item.title,
      subtitle: item.category,
      pageId: "acute",
      pageLabel: "Acute Management",
      payloadId: item.id,
      label: "Acute",
    }));

    const followupResults = toolSearch.includes("doac") || toolSearch.includes("follow") || toolSearch.includes("checklist")
      ? [
          {
            id: "followup-doac",
            kind: "followup",
            title: "DOAC Follow-up",
            subtitle: "Checklist and printable review page",
            pageId: "followup",
            pageLabel: "DOAC Follow-up",
            payloadId: "doac-followup",
            label: "Checklist",
          },
        ]
      : [];

    return [...toolResults, ...acuteResults, ...followupResults, ...guideResults].slice(0, 10);
  }, [filteredAcuteItems, filteredGuides, searchableTools, toolSearch]);

  const handleSearchSelection = (resultItem) => {
    if (resultItem.kind === "tool") {
      setActiveToolId(resultItem.payloadId);
    }

    if (resultItem.kind === "guide") {
      setActiveGuideId(resultItem.payloadId);
    }

    if (resultItem.kind === "acute") {
      setActiveAcuteId(resultItem.payloadId);
    }

    if (resultItem.kind === "followup") {
      setCurrentPage("followup");
    }

    setSearchTerm("");
    navigateToPage(resultItem.pageId);
  };

  const updateValue = (toolId, inputId, value) => {
    setToolValues((current) => ({
      ...current,
      [toolId]: {
        ...current[toolId],
        [inputId]: value,
      },
    }));
  };

  const updateAcuteField = (toolKey, field, value) => {
    setAcuteState((current) => ({
      ...current,
      [toolKey]: {
        ...current[toolKey],
        [field]: value,
      },
    }));
  };

  const toggleAcuteModifier = (toolKey, modifier, noneKey = "none") => {
    setAcuteState((current) => {
      const currentValues = current[toolKey]?.modifiers ?? [];
      const hasModifier = currentValues.includes(modifier);

      let nextValues;

      if (modifier === noneKey) {
        nextValues = hasModifier ? [] : [noneKey];
      } else if (hasModifier) {
        nextValues = currentValues.filter((value) => value !== modifier);
      } else {
        nextValues = [...currentValues.filter((value) => value !== noneKey), modifier];
      }

      return {
        ...current,
        [toolKey]: {
          ...current[toolKey],
          modifiers: nextValues,
        },
      };
    });
  };

  const resetAcuteTool = (toolKey) => {
    setAcuteState((current) => ({
      ...current,
      [toolKey]: acuteInitialState[toolKey],
    }));
  };

  const updateDoacFollowup = (field, value) => {
    setDoacFollowup((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetDoacFollowup = () => setDoacFollowup(doacFollowupInitialState);

  const handlePrintDoacFollowup = () => {
    const html = buildDoacFollowupDocument(doacFollowup);
    const popup = window.open("", "_blank", "width=980,height=860");
    if (!popup) {
      return;
    }
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  const handleWordDoacFollowup = () => {
    const html = buildDoacFollowupDocument(doacFollowup);
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "doac-followup-checklist.doc";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[384px_minmax(0,1fr)] bg-background">
      <button
        type="button"
        className={cn("hidden", sidebarOpen && "!fixed inset-0 z-30 !block bg-black/40 lg:!hidden")}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close navigation"
      />

      <AppSidebar
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onSelectTool={(toolId) => {
          setActiveToolId(toolId);
          navigateToPage(getPageForToolId(toolId));
        }}
        onSelectGuide={(guideId) => {
          setActiveGuideId(guideId);
          navigateToPage("guides");
        }}
        onSelectAcute={(acuteId) => {
          setActiveAcuteId(acuteId);
          navigateToPage("acute");
        }}
        onSelectFollowup={() => {
          navigateToPage("followup");
        }}
        activeToolId={activeToolId}
        activeAcuteId={activeAcuteId}
        activeGuideId={activeGuideId}
        algorithmItems={algorithmTools}
        acuteItems={filteredAcuteItems}
        scoreItems={scoreTools}
        guideItems={filteredGuides}
        siteName={siteName}
      />

      <div className="relative px-3 sm:px-4 md:px-6 py-3 sm:py-4 pb-8 w-full max-w-[1440px] mx-auto">
        <header className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <SidebarTrigger className="lg:hidden" />

            <div className="min-w-0">
              <div className="flex flex-wrap gap-1.5 text-muted-foreground text-xs">
                <span>Blood🩸Doctor</span>
                <span>/</span>
                <span>{currentPageMeta.label}</span>
              </div>
              <h2 className="text-base font-semibold truncate m-0">{siteName}</h2>
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && globalSearchResults.length) {
                    event.preventDefault();
                    handleSearchSelection(globalSearchResults[0]);
                  }
                }}
                placeholder="Search calculators, guides, references, or vault entries..."
                className="pl-9 h-9 w-full"
              />
            </div>

            {toolSearch ? (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border bg-popover shadow-lg max-h-80 overflow-y-auto">
                {globalSearchResults.length ? (
                  globalSearchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-accent transition-colors"
                      onClick={() => handleSearchSelection(item)}
                    >
                      <div className="min-w-0">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <strong className="block truncate">{item.title}</strong>
                        <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">{item.pageLabel}</Badge>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">No results matched your search.</div>
                )}
              </div>
            ) : null}
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <main className="grid gap-4">
          {currentPage === "dashboard" ? (
            <>
          <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
            <Card>
              <CardHeader>
                <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground mb-3">Overview</span>
                <CardTitle className="text-lg">Anticoagulation operations dashboard</CardTitle>
                <CardDescription>
                  A unified workspace for bedside calculators, decision support content, and
                  evidence-based clinical reading with structured guide library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button onClick={() => navigateToPage("algorithms")}>
                    Explore algorithms
                  </Button>
                  <Button variant="outline" onClick={() => navigateToPage("guides")}>
                    Browse clinical guides
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <Calculator size={14} />
                    Calculator engine active
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5">
                    <Microscope size={14} />
                    Evidence-based guide library
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3.5">
              <MetricCard
                icon={Calculator}
                label="Clinical tools"
                value={stats.tools}
                meta="Interactive algorithms and score calculators"
              />
              <MetricCard
                icon={BookOpenText}
                label="Guides in library"
                value={stats.guides}
                meta="Evidence-based clinical guides with searchable content"
              />
              <MetricCard
                icon={BrainCircuit}
                label="Matched resources"
                value={relatedGuides.length}
                meta="Guide recommendations linked to the current calculator"
              />
            </div>
          </section>

          <section className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-4">
            <Alert>
              <ShieldAlert size={17} />
              <AlertTitle>Decision support is live</AlertTitle>
              <AlertDescription>
                All calculator logic remains active. Use the dashboard for structured support, then
                confirm every recommendation against patient context and local policy.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">Library table</span>
                  <CardTitle className="text-lg">Core workspace modules</CardTitle>
                </div>
                <Activity size={17} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Inputs</TableHead>
                      <TableHead>Reference tabs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workspaceRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-medium"
                            onClick={() => {
                              setActiveToolId(row.id);
                              navigateToPage(
                                tools.find((tool) => tool.id === row.id)?.category === "algorithm"
                                  ? "algorithms"
                                  : "scores"
                              );
                            }}
                          >
                            {row.name}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{row.category}</Badge>
                        </TableCell>
                        <TableCell>{row.inputs}</TableCell>
                        <TableCell>{row.references}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

            </>
          ) : null}

          {currentPage === "algorithms" || currentPage === "scores" ? (
          <>
          <section className="grid gap-4 pt-0.5">
            <div className="grid gap-4">
              <section key={`tool-panel-${activeTool?.id ?? "empty"}`} className="relative min-w-0 bg-card border border-border rounded-[var(--radius-md)] shadow-sm p-4 border-blue-200 bg-gradient-to-b from-blue-50/70 via-teal-50/35 to-white overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-primary before:to-teal-700">
                {activeTool ? (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">Current calculator</span>
                        <h3>{activeTool.title}</h3>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setToolValues((current) => ({
                            ...current,
                            [activeTool.id]: getInitialValues(activeTool),
                          }))
                        }
                      >
                        Reset
                      </Button>
                    </div>

                    <div className="grid grid-cols-[minmax(0,1fr)] gap-3.5 items-start">
                      <div>
                        <p>{activeTool.blurb}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {activeTool.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {activeTool.notes.map((note) => (
                        <div key={note} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-4 py-3 border border-blue-200 rounded-[14px] bg-blue-50">
                          <span className="w-[1.9rem] h-[1.9rem] grid place-items-center rounded-full bg-primary/10 text-primary">
                            <Pill size={14} />
                          </span>
                          <p className="m-0 text-foreground leading-relaxed text-[0.95rem]">{note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {activeTool.inputs
                        .filter((input) => {
                          if (input.type === "hidden") return false;
                          if (input.visibleWhen && !input.visibleWhen(activeValues)) return false;
                          return true;
                        })
                        .map((input) => (
                          <FieldRenderer
                            key={input.id}
                            input={input}
                            value={activeValues[input.id]}
                            onChange={(value) => updateValue(activeTool.id, input.id, value)}
                          />
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-left">
                    <CircleAlert size={24} />
                    <h4>No tools matched the current search.</h4>
                  </div>
                )}
              </section>

              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] gap-4">
                <ResultPanel result={result} />
              </div>
            </div>
          </section>
          </>
          ) : null}

          {currentPage === "acute" ? (
          <>
          <AcuteManagementPage
            activeAcuteId={activeAcuteId}
            activeAcuteItem={activeAcuteItem}
            onSelectAcute={setActiveAcuteId}
            acuteState={acuteState}
            onFieldChange={updateAcuteField}
            onToggleModifier={toggleAcuteModifier}
            onResetTool={resetAcuteTool}
          />
          </>
          ) : null}

          {currentPage === "followup" ? (
          <>
          <DoacFollowupPage
            form={doacFollowup}
            onChange={updateDoacFollowup}
            onReset={resetDoacFollowup}
            onPrint={handlePrintDoacFollowup}
            onDownloadWord={handleWordDoacFollowup}
          />
          </>
          ) : null}

          {currentPage === "guides" ? (
          <>
          <section className="grid gap-4">
            <div key={`guide-panel-${activeGuide?.id ?? "empty"}`} className="relative min-w-0 grid gap-4 bg-card border border-border rounded-[var(--radius-md)] shadow-sm p-4 border-blue-200 bg-gradient-to-b from-blue-50/70 via-teal-50/35 to-white overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-primary before:to-teal-700">
              {activeGuide ? (
                <>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">Selected guide</span>
                      <h3>{activeGuide.title}</h3>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground">Category</span>
                      <Badge variant="outline">{activeGuide.category}</Badge>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground">Updated</span>
                      <strong className="text-sm">{activeGuide.versionDate || activeGuide.updatedAt || "Current"}</strong>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground">References</span>
                      <strong className="text-sm">
                        {getReferenceItems(activeGuide?.content).length}
                      </strong>
                    </div>
                  </div>

                  <GuideNavContext.Provider value={(guideId) => { setActiveGuideId(guideId); navigateToPage("guides"); }}>
                  {activeGuide.id === "Acetylsalicylic_Acid_(ASA)" || activeGuide.title === "Acetylsalicylic Acid (ASA)" ? (
                    <AsaGuide />
                  ) : activeGuide.id === "Bioprosthetic_and_Mechanical_Heart_Valves_Antithrombotic_Therapy" || activeGuide.title === "Bioprosthetic and Mechanical Heart Valves: Antithrombotic Therapy" ? (
                    <HeartValvesGuide />
                  ) : activeGuide.id === "Air_Travel-related_Thrombosis" || activeGuide.title === "Air Travel-related Thrombosis" ? (
                    <TravelThrombosisGuide />
                  ) : activeGuide.id === "Cancer_and_Thrombosis" || activeGuide.title === "Cancer and Thrombosis" ? (
                    <CancerThrombosisGuide />
                  ) : activeGuide.id === "Central_Venous_Catheter-Related_Deep_Vein_Thrombosis" || activeGuide.title === "Central Venous Catheter-Related Deep Vein Thrombosis" ? (
                    <CvadThrombosisGuide />
                  ) : activeGuide.id === "Cerebral_Venous_Thrombosis" || activeGuide.title === "Cerebral Venous Thrombosis" ? (
                    <CerebralVenousThrombosisGuide />
                  ) : activeGuide.id === "Deep_Vein_Thrombosis_(DVT)_Diagnosis" || (activeGuide.title?.includes("Deep Vein Thrombosis") && activeGuide.title?.includes("Diagnosis")) ? (
                    <DvtDiagnosisGuide />
                  ) : activeGuide.id === "Deep_Vein_Thrombosis_(DVT)_Treatment" || (activeGuide.title?.includes("Deep Vein Thrombosis") && activeGuide.title?.includes("Treatment")) ? (
                    <DvtTreatmentGuide />
                  ) : activeGuide.id === "Heparin-Induced_Thrombocytopenia_(HIT)" || activeGuide.title?.includes("Heparin-Induced Thrombocytopenia") ? (
                    <HitGuide />
                  ) : activeGuide.id === "Stroke_Prevention_in_Atrial_Fibrillation" || activeGuide.title?.includes("Stroke Prevention in Atrial Fibrillation") ? (
                    <StrokePreventionAfGuide />
                  ) : activeGuide.id === "Pulmonary_Embolism_(PE)_Diagnosis" || (activeGuide.title?.includes("Pulmonary Embolism") && activeGuide.title?.includes("Diagnosis")) ? (
                    <PeDiagnosisGuide />
                  ) : activeGuide.id === "Pulmonary_Embolism_(PE)_Treatment" || (activeGuide.title?.includes("Pulmonary Embolism") && activeGuide.title?.includes("Treatment")) ? (
                    <PeTreatmentGuide />
                  ) : activeGuide.id === "Warfarin" || activeGuide.title === "Warfarin" ? (
                    <WarfarinGuide />
                  ) : activeGuide.id === "Venous_Thromboembolism_Duration_of_Treatment" || activeGuide.title?.includes("Duration of Treatment") ? (
                    <VteDurationGuide />
                  ) : activeGuide.id === "Thrombophilia_Antiphospholipid_Syndrome" || activeGuide.title?.includes("Antiphospholipid") ? (
                    <ApsThrombophiliaGuide />
                  ) : activeGuide.id === "Thrombophilia_Deficiencies_in_Protein_C_Protein_S_and_Antithrombin" || (activeGuide.title?.includes("Protein C") || activeGuide.title?.includes("Antithrombin")) ? (
                    <ThrombophiliaNaturalAnticoagulantsGuide />
                  ) : activeGuide.id === "Thrombophilia_Factor_V_Leiden_and_Prothrombin_Gene_Mutation" || activeGuide.title?.includes("Factor V Leiden") ? (
                    <ThrombophiliaFvlPgmGuide />
                  ) : activeGuide.id === "Thrombophilia_Homocysteinemia_and_Methylene_Tetrahydrofolate_Reductase" || activeGuide.title?.includes("Homocysteinemia") || activeGuide.title?.includes("MTHFR") ? (
                    <ThrombophiliaHomocysteineGuide />
                  ) : activeGuide.id === "Thromboprophylaxis_Hospitalized_Medical_Patients" || (activeGuide.title?.includes("Thromboprophylaxis") && activeGuide.title?.includes("Medical")) ? (
                    <ThromboprophylaxisMedicalGuide />
                  ) : activeGuide.id === "Thromboprophylaxis_Non-Orthopedic_Surgery" || (activeGuide.title?.includes("Thromboprophylaxis") && activeGuide.title?.includes("Non-Orthopedic")) ? (
                    <ThromboprophylaxisNonOrthoGuide />
                  ) : activeGuide.id === "Thromboprophylaxis_Orthopedic_Surgery" || (activeGuide.title?.includes("Thromboprophylaxis") && activeGuide.title?.includes("Orthopedic") && !activeGuide.title?.includes("Non")) ? (
                    <ThromboprophylaxisOrthoGuide />
                  ) : activeGuide.id === "Pulmonary_Embolism_High-_and_Intermediate-Risk" || (activeGuide.title?.includes("Pulmonary Embolism") && (activeGuide.title?.includes("High") || activeGuide.title?.includes("Intermediate"))) ? (
                    <PeHighIntermediateRiskGuide />
                  ) : activeGuide.id === "Post_Thrombotic_Syndrome_(PTS)" || activeGuide.title?.includes("Post Thrombotic Syndrome") || activeGuide.title?.includes("Post-Thrombotic") ? (
                    <PtsGuide />
                  ) : activeGuide.id === "Portal_Vein_Thrombosis_(PVT)" || activeGuide.title?.includes("Portal Vein Thrombosis") ? (
                    <PvtGuide />
                  ) : activeGuide.id === "Superficial_Thrombophlebitis_Superficial_Vein_Thrombosis" || activeGuide.title?.includes("Superficial Thrombophlebitis") || activeGuide.title?.includes("Superficial Vein Thrombosis") ? (
                    <SvtGuide />
                  ) : activeGuide.id === "Vena_Cava_Filter" || activeGuide.title?.includes("Vena Cava Filter") ? (
                    <VenaCavaFilterGuide />
                  ) : activeGuide.id === "Vaccine-Induced_Prothrombotic_Immune_Thrombocytopenia_(VIPITVITT)" || activeGuide.title?.includes("VIPIT") || activeGuide.title?.includes("VITT") ? (
                    <VipitVittGuide />
                  ) : activeGuide.id === "Warfarin_Management_of_Out-of-Range_INRs" || activeGuide.title?.includes("Out-of-Range INR") ? (
                    <WarfarinInrManagementGuide />
                  ) : activeGuide.id === "Warfarin_Point-of-Care_INR_Monitoring" || activeGuide.title?.includes("Point-of-Care INR") ? (
                    <WarfarinPocInrGuide />
                  ) : activeGuide.id === "DOACs_Coagulation_Tests" || activeGuide.title?.includes("DOACs") && activeGuide.title?.includes("Coagulation Tests") ? (
                    <DoacsCoagulationTestsGuide />
                  ) : activeGuide.id === "DOACs_Management_of_Bleeding" || activeGuide.title?.includes("DOACs") && activeGuide.title?.includes("Bleeding") ? (
                    <DoacsBleedingGuide />
                  ) : activeGuide.id === "DOACs_Perioperative_Management" || activeGuide.title?.includes("DOACs") && activeGuide.title?.includes("Perioperative") ? (
                    <DoacsPerioperativeGuide />
                  ) : activeGuide.id === "DOACs_in_Patients_with_Obesity" || activeGuide.title?.includes("DOACs") && activeGuide.title?.includes("Obesity") ? (
                    <DoacsObesityGuide />
                  ) : activeGuide.id === "Pregnancy_Thromboprophylaxis" || activeGuide.title?.includes("Pregnancy") && activeGuide.title?.includes("Thromboprophylaxis") ? (
                    <PregnancyThromboprophylaxisGuide />
                  ) : activeGuide.id === "Pregnancy_Venous_Thromboembolism_Treatment" || activeGuide.title?.includes("Pregnancy") && activeGuide.title?.includes("VTE Treatment") ? (
                    <PregnancyVteTreatmentGuide />
                  ) : activeGuide.id === "Pregnancy_Diagnosis_of_DVT_and_PE" || activeGuide.title?.includes("Pregnancy") && activeGuide.title?.includes("Diagnosis") ? (
                    <PregnancyDvtPeDiagnosisGuide />
                  ) : activeGuide.id === "Ischemic_Stroke_or_TIA_Secondary_Prevention" || activeGuide.title?.includes("Ischemic Stroke") && activeGuide.title?.includes("Secondary Prevention") ? (
                    <IschemicStrokeSecondaryPreventionGuide />
                  ) : activeGuide.id === "Stroke_Thrombolysis_and_Endovascular_Therapy" || activeGuide.title?.includes("Thrombolysis") && activeGuide.title?.includes("Endovascular") ? (
                    <StrokeThrombolysisGuide />
                  ) : activeGuide.id === "Peripheral_Arterial_Disease" || activeGuide.title?.includes("Peripheral Arterial Disease") ? (
                    <PeripheralArterialDiseaseGuide />
                  ) : activeGuide.id === "Anticoagulation_in_Patients_Requiring_Antiplatelet_Therapy" || activeGuide.title?.includes("Requiring Antiplatelet") ? (
                    <AnticoagAntiplateletGuide />
                  ) : activeGuide.id === "Duration_of_Dual_Antiplatelet_Therapy_in_Patients_With_Coronary_Artery_Disease" || activeGuide.title?.includes("Dual Antiplatelet Therapy") ? (
                    <DaptDurationGuide />
                  ) : activeGuide.id === "Management_of_Heavy_Menstrual_Bleeding_for_Patients_on_Anticoagulation" || activeGuide.title?.includes("Heavy Menstrual Bleeding") ? (
                    <HmbAnticoagulationGuide />
                  ) : activeGuide.id === "Perioperative_Management_of_Antiplatelet_Therapy" || activeGuide.title?.includes("Perioperative") && activeGuide.title?.includes("Antiplatelet") ? (
                    <PerioperativeAntiplateletGuide />
                  ) : activeGuide.id === "Apixaban_(Eliquis)" || activeGuide.title?.includes("Apixaban") || activeGuide.title?.includes("Eliquis") ? (
                    <ApixabanGuide />
                  ) : activeGuide.id === "Rivaroxaban_(Xarelto)" || activeGuide.title?.includes("Rivaroxaban") || activeGuide.title?.includes("Xarelto") ? (
                    <RivaroxabanGuide />
                  ) : activeGuide.id === "DOACs_Comparison_And_Frequently-asked_Questions" || activeGuide.title?.includes("DOACs") && activeGuide.title?.includes("Comparison") ? (
                    <DoacsComparisonGuide />
                  ) : activeGuide.id === "Dabigatran_(Pradaxa)" || activeGuide.title?.includes("Dabigatran") || activeGuide.title?.includes("Pradaxa") ? (
                    <DabigatranGuide />
                  ) : activeGuide.id === "Edoxaban_(Lixiana)" || activeGuide.title?.includes("Edoxaban") || activeGuide.title?.includes("Lixiana") ? (
                    <EdoxabanGuide />
                  ) : activeGuide.id === "Clopidogrel_(Plavix)" || activeGuide.title?.includes("Clopidogrel") || activeGuide.title?.includes("Plavix") ? (
                    <ClopidogrelGuide />
                  ) : activeGuide.id === "Prasugrel" || activeGuide.title?.includes("Prasugrel") ? (
                    <PrasugrelGuide />
                  ) : activeGuide.id === "Ticagrelor_(Brilinta)" || activeGuide.title?.includes("Ticagrelor") || activeGuide.title?.includes("Brilinta") ? (
                    <TicagrelorGuide />
                  ) : activeGuide.id === "COVID-19_Primary_Thromboprophylaxis_for_Hospitalized_Patients" || activeGuide.title?.includes("COVID-19") && activeGuide.title?.includes("Thromboprophylaxis") ? (
                    <CovidThromboprophylaxisGuide />
                  ) : activeGuide.id === "Unfractionated_Heparin_Low_Molecular_Weight_Heparin_and_Fondaparinux" || activeGuide.title?.includes("Unfractionated Heparin") || activeGuide.title?.includes("Fondaparinux") ? (
                    <UfhLmwhFondaparinuxGuide />
                  ) : activeGuide.id === "Warfarin_Perioperative_Management" || activeGuide.title?.includes("Warfarin") && activeGuide.title?.includes("Perioperative") ? (
                    <WarfarinPeriopGuide />
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ContentSummaryCard
                          eyebrow="Guide synopsis"
                          title="Overview"
                          description={activeGuideOverview}
                        />
                        <ContentListPreview
                          eyebrow="Clinical application"
                          title="Practice points"
                          items={activeGuideApplicationList}
                          emptyLabel="Structured application points will appear here when listed in the guide."
                        />
                        <ContentOutlinePreview
                          eyebrow="Guide structure"
                          title="Key sections"
                          items={activeGuide.headings.slice(0, 8)}
                        />
                        <ContentListPreview
                          eyebrow="Reference preview"
                          title="Key bibliography"
                          items={activeGuideReferenceItems}
                          ordered
                          emptyLabel="Reference entries will appear here when available."
                        />
                      </div>

                      <ClinicalReference
                        eyebrow="Guide dossier"
                        title={activeGuide.title}
                        content={activeGuide.content}
                        activeTab={activeGuideTab}
                        onTabChange={setActiveGuideTab}
                        emptyMessage="No guide sections are available for this entry yet."
                      />
                    </>
                  )}
                  </GuideNavContext.Provider>

                  {activeGuide.linkedGuideIds.length || activeGuide.linkedToolIds.length ? (
                    <div className="border border-border rounded-[14px] bg-card-muted p-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">Connected navigation</span>
                          <h4>Linked guides and calculators</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {guideLibrary
                          .filter((guide) => activeGuide.linkedGuideIds.includes(guide.id))
                          .map((guide) => (
                          <Button
                            key={`guide-link-${guide.id}`}
                            variant="outline"
                            className="h-auto justify-between px-4 py-3 text-left"
                            onClick={() => {
                              setActiveGuideId(guide.id);
                            }}
                          >
                            <div>
                              <strong className="block">{guide.title}</strong>
                              <p className="text-xs text-muted-foreground">{guide.category}</p>
                            </div>
                            <ArrowUpRight size={15} />
                          </Button>
                        ))}
                        {tools
                          .filter((tool) => activeGuide.linkedToolIds.includes(tool.id))
                          .map((tool) => (
                            <Button
                              key={`tool-link-${tool.id}`}
                              variant="outline"
                              className="h-auto justify-between px-4 py-3 text-left"
                              onClick={() => {
                                setActiveToolId(tool.id);
                                navigateToPage(getPageForToolId(tool.id));
                              }}
                            >
                              <div>
                                <strong className="block">{tool.title}</strong>
                                <p className="text-xs text-muted-foreground">{tool.badge}</p>
                              </div>
                              <ArrowUpRight size={15} />
                            </Button>
                          ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="py-6 text-left">
                  <CircleAlert size={24} />
                  <h4>No guides matched the current search.</h4>
                </div>
              )}
            </div>
          </section>
          </>
          ) : null}

        </main>

        <footer className="pt-3 text-muted-foreground">
          <p className="m-0 text-center font-semibold text-[0.9rem]">Dr Abdul Mannan FRCPath FCPS | Blood🩸Doctor | blooddoctor.co@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

function DoacFollowupPage({ form, onChange, onReset, onPrint, onDownloadWord }) {
  const summaryRows = getDoacFollowupSummaryRows(form);

  return (
    <section className="grid gap-4">
      <Card className="rounded-xl border bg-card shadow-sm p-0 overflow-hidden">
        <div className="grid border-b border-border">
          <div className="px-5 py-4 bg-[#23376b] text-white">
            <h3 className="m-0 text-[clamp(1.7rem,2vw,2.15rem)] leading-tight tracking-tight">DOAC Follow-up</h3>
          </div>
          <div className="flex items-start justify-between gap-4 px-5 py-4 bg-gradient-to-b from-white to-[#fbfcff]">
            <div>
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">Checklist workspace</span>
              <p className="mt-1 mb-0 max-w-[62ch] text-muted-foreground leading-relaxed">Structured review template for outpatient DOAC follow-up, documentation, and counselling.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={onReset}>
                Reset
              </Button>
              <Button variant="outline" onClick={onPrint}>
                <Printer size={16} />
                Print / Save PDF
              </Button>
              <Button onClick={onDownloadWord}>
                <FileText size={16} />
                Download Word
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 bg-muted">
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <DoacTextField
                label="Patient name"
                value={form.patientName}
                onChange={(value) => onChange("patientName", value)}
              />
              <DoacTextField
                label="Patient age"
                value={form.patientAge}
                inputMode="numeric"
                onChange={(value) => onChange("patientAge", value)}
              />
              <DoacTextField
                label="Weight (kg)"
                value={form.weightKg}
                inputMode="decimal"
                onChange={(value) => onChange("weightKg", value)}
              />
              <DoacTextField
                label="Weight (lb)"
                value={form.weightLb}
                inputMode="decimal"
                onChange={(value) => onChange("weightLb", value)}
              />
              <DoacRadioGroup
                label="Sex"
                value={form.sex}
                onChange={(value) => onChange("sex", value)}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
              <DoacRadioGroup
                label="DOAC"
                value={form.doac}
                onChange={(value) => onChange("doac", value)}
                options={[
                  { value: "Apixaban", label: "Apixaban" },
                  { value: "Dabigatran", label: "Dabigatran" },
                  { value: "Edoxaban", label: "Edoxaban" },
                  { value: "Rivaroxaban", label: "Rivaroxaban" },
                ]}
              />
              <DoacSelectField
                label="CHADS2"
                value={form.chads2}
                onChange={(value) => onChange("chads2", value)}
                options={["", "0", "1", "2", "3", "4", "5", "6"]}
              />
            </div>
          </section>

          <DoacSectionTitle title="Health status since last assessment" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <p className="m-0 font-semibold leading-relaxed">Please check all that apply to the patient:</p>
            <DoacCheckboxList
              items={[
                ["healthRelevantProblems", "Relevant medical problems, ED visits, or hospitalizations"],
                ["healthEmbolicEvents", "Embolic events"],
                ["healthNone", "None of the above"],
              ]}
              form={form}
              onChange={onChange}
            />
            <DoacTextArea
              label="Other comments"
              value={form.healthComments}
              onChange={(value) => onChange("healthComments", value)}
            />
          </section>

          <DoacSectionTitle title="Adherence with DOAC therapy" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <DoacRadioGroup
              label="How many doses has the patient missed in an average week?"
              value={form.missedDoses}
              onChange={(value) => onChange("missedDoses", value)}
              options={[
                { value: "0", label: "0" },
                { value: "1 - 2", label: "1 – 2" },
                { value: "≥ 3", label: "≥ 3" },
              ]}
            />
            <DoacRadioGroup
              label="Any issues with taking the DOAC properly, including food or timing?"
              value={form.timingIssues}
              onChange={(value) => onChange("timingIssues", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <DoacTextArea
              label="Adherence comments"
              value={form.adherenceComments}
              onChange={(value) => onChange("adherenceComments", value)}
            />
          </section>

          <DoacSectionTitle title="Bleeding risk assessment" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <DoacSelectField
              label="HAS-BLED"
              value={form.hasBled}
              onChange={(value) => onChange("hasBled", value)}
              options={["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            />
            <p className="m-0 font-semibold leading-relaxed">Please check all that apply. A positive response prompts individualized review and does not by itself mean the DOAC should be stopped.</p>
            <DoacCheckboxList
              items={[
                ["bleedGi", "Signs or symptoms of GI bleeding"],
                ["bleedOther", "Signs or symptoms of other bleeding"],
                ["bleedHemoglobin", "Drop in hemoglobin or new anemia"],
                ["bleedHypotension", "Hypotension with syncope or falls"],
                ["bleedNone", "None of the above"],
              ]}
              form={form}
              onChange={onChange}
            />
          </section>

          <DoacSectionTitle title="Creatinine clearance / renal function" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <DoacDateField
                label="When was eGFR last measured?"
                value={form.egfrDate}
                onChange={(value) => onChange("egfrDate", value)}
              />
              <DoacTextField
                label="eGFR result"
                value={form.egfrResult}
                onChange={(value) => onChange("egfrResult", value)}
              />
            </div>
            <DoacRadioGroup
              label="Any recent dehydrating illness or medications added or changed?"
              value={form.dehydratingIllness}
              onChange={(value) => onChange("dehydratingIllness", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <DoacTextArea
              label="Other comments"
              value={form.renalComments}
              onChange={(value) => onChange("renalComments", value)}
            />
          </section>

          <DoacSectionTitle title="Drug interactions (review all concomitant medications)" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <p className="m-0 font-semibold leading-relaxed">Please check all that apply:</p>
            <DoacCheckboxList
              items={[
                ["drugAsa", "ASA or other antiplatelets"],
                ["drugNsaid", "NSAID"],
                ["drugOther", "Other drug interactions"],
                ["drugNone", "None of the above"],
              ]}
              form={form}
              onChange={onChange}
            />
          </section>

          <DoacSectionTitle title="Examination" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <DoacTextField
                label="Actual BP systolic"
                value={form.bpSystolic}
                inputMode="numeric"
                onChange={(value) => onChange("bpSystolic", value)}
              />
              <DoacTextField
                label="Actual BP diastolic"
                value={form.bpDiastolic}
                inputMode="numeric"
                onChange={(value) => onChange("bpDiastolic", value)}
              />
            </div>
            <DoacRadioGroup
              label="Patient's blood pressure is"
              value={form.bpStatus}
              onChange={(value) => onChange("bpStatus", value)}
              options={[
                { value: "Within target", label: "Within target" },
                { value: "High", label: "High" },
                { value: "Low", label: "Low" },
              ]}
            />
            <DoacRadioGroup
              label="Does the patient need referral for gait assessment or walking aids for falls prevention?"
              value={form.gaitReferral}
              onChange={(value) => onChange("gaitReferral", value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </section>

          <DoacSectionTitle title="Final assessment and recommendations" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <DoacBinaryMatrix
              rows={[
                [
                  "Overall patient appears stable from the anticoagulant standpoint; benefits of continued anticoagulant therapy outweigh risks; recommend continuation.",
                  form.stableContinue,
                  (value) => onChange("stableContinue", value),
                ],
                [
                  "Dose verified and appropriate for age, weight, renal function, and current health status.",
                  form.doseVerified,
                  (value) => onChange("doseVerified", value),
                ],
                [
                  "Any changes to current therapy are needed.",
                  form.therapyChanges,
                  (value) => onChange("therapyChanges", value),
                ],
              ]}
            />
          </section>

          <DoacSectionTitle title="Patient education and counselling" />
          <section className="grid gap-4 p-5 border border-border rounded-2xl bg-card shadow-sm">
            <DoacBinaryMatrix
              rows={[
                [
                  "The rationale for continued DOAC therapy was discussed.",
                  form.counselRationale,
                  (value) => onChange("counselRationale", value),
                ],
                [
                  "The potential for minor, major, or life-threatening bleeding was discussed.",
                  form.counselBleeding,
                  (value) => onChange("counselBleeding", value),
                ],
                [
                  "Dosing instructions, adherence, and handling of missed doses were reviewed.",
                  form.counselAdherence,
                  (value) => onChange("counselAdherence", value),
                ],
                [
                  "Avoiding OTC ASA and NSAIDs and minimizing alcohol intake were discussed.",
                  form.counselInteractions,
                  (value) => onChange("counselInteractions", value),
                ],
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <DoacDateField
                label="Next follow-up date"
                value={form.nextFollowupDate}
                onChange={(value) => onChange("nextFollowupDate", value)}
              />
              <DoacDateField
                label="Next bloodwork"
                value={form.nextBloodworkDate}
                onChange={(value) => onChange("nextBloodworkDate", value)}
              />
            </div>
            <DoacTextArea
              label="Final comments"
              value={form.finalComments}
              onChange={(value) => onChange("finalComments", value)}
            />
          </section>

          <section className="grid border-2 border-[#23376b] bg-card dark:border-[#4a6fa5] overflow-hidden">
            <div className="px-5 py-4 bg-[#8ea0c9] border-b-2 border-[#23376b]">
              <h4 className="m-0 text-[#1f3160] dark:text-foreground text-[clamp(1.55rem,2vw,2rem)] text-center leading-tight">Direct Oral Anticoagulant (DOAC) Follow-up Checklist</h4>
            </div>
            <div className="px-5 py-4 border-b border-[#23376b] text-center text-lg font-bold">
              Date: {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date())}
            </div>
            <div className="px-5 py-4 border-b border-[#23376b] text-xl font-bold">Summary of patient profile</div>
            <div className="grid">
              {summaryRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)] [&+&]:border-t [&+&]:border-slate-300">
                  <strong className="px-5 py-3.5 leading-relaxed bg-muted">{label}</strong>
                  <span className="px-5 py-3.5 leading-relaxed">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t-2 border-[#23376b] italic leading-relaxed">
              These general recommendations do not replace clinical judgement. Physicians must consider relative risks and benefits in each patient.
            </div>
          </section>
        </div>
      </Card>
    </section>
  );
}

function DoacSectionTitle({ title }) {
  return (
    <div className="px-0.5">
      <h4 className="m-0 pb-3 border-b-2 border-orange-600/20 text-orange-600 text-base font-extrabold uppercase tracking-widest">{title}</h4>
    </div>
  );
}

function DoacTextField({ label, value, onChange, inputMode = "text" }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-foreground text-base font-extrabold">{label}</span>
      <input className="w-full min-h-[3.3rem] px-3.5 py-3 border border-border rounded-[14px] bg-card text-foreground outline-none transition-all focus:border-[rgba(127,29,63,0.34)] focus:ring-4 focus:ring-[rgba(127,29,63,0.08)]" value={value} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function DoacDateField({ label, value, onChange }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-foreground text-base font-extrabold">{label}</span>
      <input className="w-full min-h-[3.3rem] px-3.5 py-3 border border-border rounded-[14px] bg-card text-foreground outline-none transition-all focus:border-[rgba(127,29,63,0.34)] focus:ring-4 focus:ring-[rgba(127,29,63,0.08)]" type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function DoacTextArea({ label, value, onChange }) {
  return (
    <label className="grid gap-2.5 col-span-full">
      <span className="text-foreground text-base font-extrabold">{label}</span>
      <textarea className="w-full min-h-[8.5rem] resize-y p-3.5 border border-border rounded-[14px] bg-card text-foreground leading-relaxed outline-none transition-all focus:border-[rgba(127,29,63,0.34)] focus:ring-4 focus:ring-[rgba(127,29,63,0.08)]" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function DoacSelectField({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-foreground text-base font-extrabold">{label}</span>
      <select className="w-full min-h-[3.3rem] px-3.5 py-3 border border-border rounded-[14px] bg-card text-foreground outline-none transition-all focus:border-[rgba(127,29,63,0.34)] focus:ring-4 focus:ring-[rgba(127,29,63,0.08)]" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {option || "Select"}
          </option>
        ))}
      </select>
    </label>
  );
}

function DoacRadioGroup({ label, value, onChange, options }) {
  return (
    <div className="grid gap-2.5 col-span-full">
      <span className="text-foreground text-base font-extrabold">{label}</span>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
        {options.map((option) => (
          <label key={option.value} className={cn(
            "flex items-center gap-3 min-h-[3.35rem] px-4 py-3.5 border rounded-2xl font-bold leading-snug cursor-pointer transition-colors",
            value === option.value
              ? "border-[rgba(127,29,63,0.3)] bg-[#fcf7f9] text-[#4a1428] dark:bg-[rgba(127,29,63,0.15)] dark:text-foreground dark:border-[rgba(127,29,63,0.4)]"
              : "border-border bg-card text-foreground"
          )}>
            <input
              type="radio"
              className="absolute opacity-0 pointer-events-none"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className={cn(
              "w-[1.15rem] h-[1.15rem] flex-none rounded-full border-2",
              value === option.value
                ? "border-[#7f1d3f] bg-[#7f1d3f] shadow-[inset_0_0_0_3px_#ffffff] dark:border-[#e05a8d] dark:bg-[#e05a8d]"
                : "border-muted-foreground bg-card"
            )} />
            <span className="block">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function DoacCheckboxList({ items, form, onChange }) {
  return (
    <div className="grid gap-3">
      {items.map(([field, label]) => (
        <label key={field} className={cn(
          "flex items-center gap-3 min-h-[3.35rem] px-4 py-3.5 border rounded-2xl font-bold leading-snug cursor-pointer transition-colors",
          form[field]
            ? "border-[rgba(127,29,63,0.3)] bg-[#fcf7f9] text-[#4a1428] dark:bg-[rgba(127,29,63,0.15)] dark:text-foreground dark:border-[rgba(127,29,63,0.4)]"
            : "border-border bg-card text-foreground"
        )}>
          <input
            type="checkbox"
            className="absolute opacity-0 pointer-events-none"
            checked={Boolean(form[field])}
            onChange={(event) => onChange(field, event.target.checked)}
          />
          <span className={cn(
            "w-[1.15rem] h-[1.15rem] flex-none border-2",
            form[field]
              ? "rounded border-[#7f1d3f] bg-[#7f1d3f] shadow-[inset_0_0_0_3px_#ffffff] dark:border-[#e05a8d] dark:bg-[#e05a8d]"
              : "rounded border-muted-foreground bg-card"
          )} />
          <span className="block">{label}</span>
        </label>
      ))}
    </div>
  );
}

function DoacBinaryMatrix({ rows }) {
  return (
    <div className="grid border border-border rounded-2xl overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_120px_120px] items-stretch bg-muted border-b border-border">
        <span className="px-4 py-3.5" />
        <strong className="px-4 py-3.5 text-center text-muted-foreground text-[0.95rem]">Yes</strong>
        <strong className="px-4 py-3.5 text-center text-muted-foreground text-[0.95rem]">No</strong>
      </div>
      {rows.map(([label, value, onChange], idx) => (
        <div key={label} className={cn("grid grid-cols-[minmax(0,1fr)_120px_120px] items-stretch", idx > 0 && "border-t border-border")}>
          <div className="p-4 leading-relaxed font-semibold text-foreground">{label}</div>
          <label className={cn(
            "grid place-items-center p-3 border-l border-border cursor-pointer",
            value === "yes" ? "bg-[#fcf7f9] dark:bg-[rgba(127,29,63,0.15)]" : "bg-card"
          )}>
            <input type="radio" className="absolute opacity-0 pointer-events-none" checked={value === "yes"} onChange={() => onChange("yes")} />
            <span className={cn(
              "w-6 h-6 rounded-full border-2",
              value === "yes"
                ? "border-[#7f1d3f] bg-[#7f1d3f] shadow-[inset_0_0_0_4px_#ffffff] dark:border-[#e05a8d] dark:bg-[#e05a8d]"
                : "border-muted-foreground bg-card"
            )} />
          </label>
          <label className={cn(
            "grid place-items-center p-3 border-l border-border cursor-pointer",
            value === "no" ? "bg-[#fcf7f9] dark:bg-[rgba(127,29,63,0.15)]" : "bg-card"
          )}>
            <input type="radio" className="absolute opacity-0 pointer-events-none" checked={value === "no"} onChange={() => onChange("no")} />
            <span className={cn(
              "w-6 h-6 rounded-full border-2",
              value === "no"
                ? "border-[#7f1d3f] bg-[#7f1d3f] shadow-[inset_0_0_0_4px_#ffffff] dark:border-[#e05a8d] dark:bg-[#e05a8d]"
                : "border-muted-foreground bg-card"
            )} />
          </label>
        </div>
      ))}
    </div>
  );
}

function AcuteManagementPage({
  activeAcuteId,
  activeAcuteItem,
  onResetTool,
}) {
  const [frameHeight, setFrameHeight] = useState(1900);
  const [frameKey, setFrameKey] = useState(0);
  const acuteTool = acuteToolFrameMap[activeAcuteId] ?? "af";

  const frameDoc = useMemo(
    () => sanitizeAcuteGuidanceHtml(acuteGuidanceHtmlRaw, acuteTool),
    [acuteTool]
  );

  useEffect(() => {
    const handleMessage = (event) => {
      if (event?.data?.type === "acute-frame-height" && Number.isFinite(event.data.height)) {
        setFrameHeight(Math.max(1200, event.data.height + 16));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!activeAcuteItem) {
    return (
      <section className="grid gap-4">
        <div className="rounded-xl border bg-card shadow-sm grid gap-4 p-5">
          <div className="py-6 text-left">
            <CircleAlert size={24} />
            <h4>No acute-management items matched the current search.</h4>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border bg-card shadow-sm grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">Acute management</span>
            <h3>{activeAcuteItem.title}</h3>
            <p>{activeAcuteItem.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onResetTool(getAcuteToolKey(activeAcuteId));
                setFrameKey((value) => value + 1);
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border border-border rounded-xl bg-muted/30 text-foreground">
          <CircleCheckBig size={18} />
          <span>Interactive acute pathways are now aligned to the generated acute-management build and open directly to the selected tool.</span>
        </div>

        <iframe
          key={`${activeAcuteId}-${frameKey}`}
          title={`${activeAcuteItem.title} acute management`}
          className="w-full min-h-[1200px] border-0 rounded-2xl bg-transparent"
          srcDoc={frameDoc}
          style={{ height: `${frameHeight}px` }}
        />
      </div>
    </section>
  );
}

function getAcuteToolKey(activeAcuteId) {
  if (activeAcuteId === "acute-af") return "af";
  if (activeAcuteId === "acute-bleeding") return "bleed";
  if (activeAcuteId === "acute-dvt") return "dvt";
  if (activeAcuteId === "acute-pe") return "pe";
  return "af";
}

function AcuteQuestionCard({ title, children, note }) {
  return (
    <section className="grid gap-3.5 p-5 border border-border rounded-2xl bg-card shadow-sm">
      <h4>{title}</h4>
      {note ? <p className="m-0 text-muted-foreground leading-relaxed text-sm">{note}</p> : null}
      {children}
    </section>
  );
}

function AcuteChoiceGrid({ options, value, onChange, multi = false }) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const active = multi ? value.includes(option.value) : value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={active ? "acute-choice active" : "acute-choice"}
            onClick={() => onChange(option.value)}
          >
            <span className="w-4.5 h-4.5 mt-0.5 border-2 border-muted-foreground rounded-full bg-card flex-shrink-0" />
            <span>
              <strong>{option.label}</strong>
              {option.detail ? <small>{option.detail}</small> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AcuteRecommendationBox({ tone = "info", title, children }) {
  return (
    <article className={`acute-rec-box ${tone}`}>
      <h4>{title}</h4>
      <div>{children}</div>
    </article>
  );
}

function AcuteAFPanel({ state, onFieldChange }) {
  const setField = (field, value) => onFieldChange("af", field, value);
  const isUnstable = ["hypotension", "ischemia", "edema"].includes(state.stability);
  const showValvularStatus = state.stability === "stable";
  const showDuration = state.stability === "stable" && state.valvularStatus === "nonvalvular";
  const showRecentStroke = showDuration && state.duration === "12to48h";
  const showChads = showRecentStroke && state.recentStrokeTia === "no";
  const showUnstableRec = isUnstable;
  const showValvularRec =
    state.stability === "stable" &&
    (state.valvularStatus === "valvular" || state.duration === "gt48h" || state.recentStrokeTia === "yes" || state.chads2 === "gte2");
  const showEarlyRec =
    state.stability === "stable" &&
    (state.duration === "lt12h" || (state.duration === "12to48h" && state.recentStrokeTia === "no"));

  return (
    <div className="grid gap-4">
      <AcuteQuestionCard title="Hemodynamic status">
        <AcuteChoiceGrid
          value={state.stability}
          onChange={(value) => {
            setField("stability", value);
            setField("valvularStatus", "");
            setField("duration", "");
            setField("recentStrokeTia", "");
            setField("chads2", "");
          }}
          options={[
            { value: "stable", label: "Stable" },
            { value: "hypotension", label: "Unstable", detail: "Acute AF causing persistent hypotension" },
            { value: "ischemia", label: "Unstable", detail: "Acute AF causing cardiac ischemia" },
            { value: "edema", label: "Unstable", detail: "Acute AF causing pulmonary edema" },
          ]}
        />
      </AcuteQuestionCard>

      {showValvularStatus ? (
        <AcuteQuestionCard title="Valvular status">
          <AcuteChoiceGrid
            value={state.valvularStatus}
            onChange={(value) => {
              setField("valvularStatus", value);
              setField("duration", "");
              setField("recentStrokeTia", "");
              setField("chads2", "");
            }}
            options={[
              { value: "valvular", label: "Valvular AF" },
              { value: "nonvalvular", label: "Non-valvular AF" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      {showDuration ? (
        <AcuteQuestionCard title="Duration of non-valvular AF">
          <AcuteChoiceGrid
            value={state.duration}
            onChange={(value) => {
              setField("duration", value);
              setField("recentStrokeTia", "");
              setField("chads2", "");
            }}
            options={[
              { value: "lt12h", label: "Less than 12 hours" },
              { value: "12to48h", label: "12 to 48 hours" },
              { value: "gt48h", label: "More than 48 hours" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      {showRecentStroke ? (
        <AcuteQuestionCard title="Recent stroke or TIA">
          <AcuteChoiceGrid
            value={state.recentStrokeTia}
            onChange={(value) => {
              setField("recentStrokeTia", value);
              setField("chads2", "");
            }}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      {showChads ? (
        <AcuteQuestionCard title="CHADS2 score">
          <AcuteChoiceGrid
            value={state.chads2}
            onChange={(value) => setField("chads2", value)}
            options={[
              { value: "gte2", label: "At least 2" },
              { value: "lt2", label: "0 or 1" },
              { value: "unknown", label: "Unknown" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      <div className="grid gap-4">
        {showUnstableRec ? (
          <AcuteRecommendationBox tone="danger" title="Urgent cardioversion pathway">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Initiate an oral anticoagulant as soon as possible, ideally before cardioversion.</li>
              <li>Proceed with urgent synchronized cardioversion.</li>
              <li>Continue anticoagulation for 4 weeks after cardioversion.</li>
              <li>Plan long-term anticoagulation according to stroke risk and specialist review.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showValvularRec ? (
          <AcuteRecommendationBox tone="warning" title="Anticoagulate before delayed cardioversion">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Provide therapeutic oral anticoagulation for at least 3 weeks before cardioversion, or perform TEE to exclude left atrial thrombus.</li>
              <li>Proceed with cardioversion once safe.</li>
              <li>Continue anticoagulation for 4 weeks after cardioversion.</li>
              <li>Arrange long-term anticoagulation based on stroke-risk assessment.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showEarlyRec ? (
          <AcuteRecommendationBox tone="action" title="Early AF cardioversion strategy">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Start oral anticoagulation as soon as possible, preferably before cardioversion.</li>
              <li>Proceed with cardioversion once rate and symptoms are appropriately managed.</li>
              <li>Continue anticoagulation for at least 4 weeks after cardioversion.</li>
              <li>Review the need for long-term anticoagulation according to stroke risk.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}
      </div>
    </div>
  );
}

function AcuteBleedPanel({ state, onFieldChange }) {
  const setField = (field, value) => onFieldChange("bleed", field, value);
  const showDrug = state.severity === "clinical" || state.severity === "major";
  const showInr = showDrug && state.drug === "warfarin";
  const showMinorRec = state.severity === "minor";
  const showClinicalRec = state.severity === "clinical";
  const showMajorInitial = state.severity === "major";
  const showWarfarinLow = showInr && !state.inrUnknown && Number(state.inr) > 0 && Number(state.inr) <= 1.5;
  const showWarfarinReverse = showInr && (state.inrUnknown || Number(state.inr) > 1.5);
  const showDabigatranRec = state.severity === "major" && state.drug === "dabigatran";
  const showXaRec = state.severity === "major" && ["apixaban", "rivaroxaban", "edoxaban"].includes(state.drug);
  const showHeparinRec = state.severity === "major" && state.drug === "heparin";

  return (
    <div className="grid gap-4">
      <AcuteQuestionCard title="Bleeding severity">
        <AcuteChoiceGrid
          value={state.severity}
          onChange={(value) => {
            setField("severity", value);
            setField("drug", "");
            setField("inr", "");
            setField("inrUnknown", false);
          }}
          options={[
            { value: "minor", label: "Minor bleeding", detail: "Small bruising, dental bleeding, anterior epistaxis, hemorrhoidal bleeding" },
            { value: "clinical", label: "Clinically relevant non-major bleeding", detail: "Requires medical attention or non-urgent intervention" },
            { value: "major", label: "Major or life-threatening bleeding", detail: "Critical site bleeding or hemodynamic instability" },
          ]}
        />
      </AcuteQuestionCard>

      {showDrug ? (
        <AcuteQuestionCard title="Anticoagulant used">
          <AcuteChoiceGrid
            value={state.drug}
            onChange={(value) => {
              setField("drug", value);
              setField("inr", "");
              setField("inrUnknown", false);
            }}
            options={[
              { value: "warfarin", label: "Warfarin" },
              { value: "dabigatran", label: "Dabigatran" },
              { value: "apixaban", label: "Apixaban" },
              { value: "rivaroxaban", label: "Rivaroxaban" },
              { value: "edoxaban", label: "Edoxaban" },
              { value: "heparin", label: "UFH or LMWH" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      {showInr ? (
        <AcuteQuestionCard title="Warfarin INR">
          <div className="grid grid-cols-[minmax(180px,220px)_minmax(220px,1fr)] gap-4 items-end">
            <label className="grid gap-2">
              <span>INR value</span>
              <input
                className="min-h-12 px-3.5 py-3 border border-border rounded-xl"
                type="number"
                step="0.1"
                min="0.5"
                max="15"
                value={state.inr}
                onChange={(event) => {
                  setField("inr", event.target.value);
                  setField("inrUnknown", false);
                }}
              />
            </label>
            <button
              type="button"
              className={state.inrUnknown ? "acute-choice active acute-inline-toggle" : "acute-choice acute-inline-toggle"}
              onClick={() => {
                setField("inrUnknown", !state.inrUnknown);
                if (!state.inrUnknown) {
                  setField("inr", "");
                }
              }}
            >
              <span className="w-4.5 h-4.5 mt-0.5 border-2 border-muted-foreground rounded-full bg-card flex-shrink-0" />
              <span><strong>Unknown or pending</strong></span>
            </button>
          </div>
        </AcuteQuestionCard>
      ) : null}

      <div className="grid gap-4">
        {showMinorRec ? (
          <AcuteRecommendationBox tone="action" title="Minor bleeding management">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Continue anticoagulant therapy and monitor.</li>
              <li>Confirm the drug and dose remain appropriate for age, weight, indication, and renal function.</li>
              <li>Review CBC, creatinine, liver function, and interacting medicines when clinically needed.</li>
              <li>Check INR if the patient is on warfarin.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showClinicalRec ? (
          <AcuteRecommendationBox tone="warning" title="Clinically relevant non-major bleeding">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Consider temporary interruption of anticoagulation depending on site and severity.</li>
              <li>Apply local hemostatic measures and refer for procedural control if needed.</li>
              <li>Check CBC, PT/INR, aPTT, creatinine, liver tests, and group and screen when relevant.</li>
              <li>Review antiplatelets, NSAIDs, and other medicines that may worsen bleeding.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showMajorInitial ? (
          <AcuteRecommendationBox tone="danger" title="Initial management of major bleeding">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Interrupt anticoagulant therapy immediately and begin monitored resuscitation.</li>
              <li>Apply local hemostatic measures and refer for procedural or surgical control where appropriate.</li>
              <li>Check CBC, coagulation tests, creatinine, liver function, and blood bank testing urgently.</li>
              <li>Use specific DOAC assays when available and timely.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showWarfarinLow ? (
          <AcuteRecommendationBox tone="info" title="Warfarin: INR 1.5 or lower">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>No reversal is usually required.</li>
              <li>Consider interrupting warfarin based on bleeding site and severity.</li>
              <li>Continue local measures, monitoring, and investigation of the bleeding source.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showWarfarinReverse ? (
          <AcuteRecommendationBox tone="danger" title="Warfarin: reversal required">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Use 4-factor PCC for immediate reversal, guided by INR and weight where available.</li>
              <li>Give vitamin K 10 mg IV to sustain reversal.</li>
              <li>Use FFP only if PCC is unavailable.</li>
              <li>Repeat INR about 15 minutes after PCC infusion and target INR 1.5 or lower.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showDabigatranRec ? (
          <AcuteRecommendationBox tone="danger" title="Dabigatran reversal">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Use idarucizumab 5 g IV as the preferred specific reversal agent.</li>
              <li>If unavailable, consider PCC 50 units/kg or FEIBA 50 units/kg with specialist input.</li>
              <li>Hemodialysis can be considered if feasible.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showXaRec ? (
          <AcuteRecommendationBox tone="danger" title="Factor Xa inhibitor reversal">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Use andexanet alfa where available and appropriate.</li>
              <li>If unavailable, consider 4-factor PCC 50 units/kg as pro-hemostatic therapy.</li>
              <li>Use calibrated anti-Xa testing where available to estimate residual drug effect.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showHeparinRec ? (
          <AcuteRecommendationBox tone="danger" title="Heparin or LMWH reversal">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Stop heparin immediately.</li>
              <li>Use protamine sulfate according to the heparin preparation and timing of the last dose.</li>
              <li>Monitor aPTT or anti-Xa level where appropriate.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}
      </div>
    </div>
  );
}

function AcuteDvtPanel({ state, onToggleModifier, onFieldChange }) {
  const setField = (field, value) => onFieldChange("dvt", field, value);
  const showModifiers = state.massiveIliofemoral === "no";
  const hasContra = state.modifiers.some((value) => value !== "none");
  const showStandard = showModifiers && state.modifiers.includes("none");
  const showContra = showModifiers && hasContra;

  return (
    <div className="grid gap-4">
      <AcuteQuestionCard title="Massive iliofemoral DVT">
        <AcuteChoiceGrid
          value={state.massiveIliofemoral}
          onChange={(value) => {
            setField("massiveIliofemoral", value);
            setField("modifiers", []);
          }}
          options={[
            { value: "yes", label: "Yes", detail: "Massive iliofemoral DVT or phlegmasia" },
            { value: "no", label: "No" },
          ]}
        />
      </AcuteQuestionCard>

      {showModifiers ? (
        <AcuteQuestionCard title="Clinical modifiers" note="Select all that apply. Choosing None clears the other modifiers.">
          <AcuteChoiceGrid
            multi
            value={state.modifiers}
            onChange={(value) => onToggleModifier("dvt", value)}
            options={[
              { value: "cancer", label: "Active cancer" },
              { value: "liver", label: "Significant hepatic dysfunction" },
              { value: "crcl15", label: "Creatinine clearance below 15 mL/min" },
              { value: "preg", label: "Pregnancy" },
              { value: "drugint", label: "Clinically important DOAC drug interaction" },
              { value: "none", label: "None of the above" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      <div className="grid gap-4">
        {state.massiveIliofemoral === "yes" ? (
          <AcuteRecommendationBox tone="danger" title="Massive iliofemoral DVT">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Seek immediate vascular surgery and interventional radiology input for urgent pharmacomechanical treatment.</li>
              <li>Continue anticoagulation with UFH or LMWH after initial intervention is arranged.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showStandard ? (
          <AcuteRecommendationBox tone="action" title="Standard anticoagulation options">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>LMWH for at least 5 days with warfarin bridging until INR is therapeutic.</li>
              <li>LMWH lead-in followed by dabigatran where appropriate.</li>
              <li>Apixaban 10 mg twice daily for 7 days, then 5 mg twice daily.</li>
              <li>Rivaroxaban 15 mg twice daily for 21 days, then 20 mg once daily.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showContra ? (
          <AcuteRecommendationBox tone="warning" title="DVT treatment with modifiers present">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Active cancer: consider LMWH monotherapy.</li>
              <li>Hepatic dysfunction, pregnancy, or CrCl below 15: use warfarin with heparin support or LMWH with specialist input.</li>
              <li>Important DOAC interactions: favor warfarin and LMWH or specialist consultation.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}
      </div>
    </div>
  );
}

function AcutePePanel({ state, onToggleModifier, onFieldChange }) {
  const setField = (field, value) => onFieldChange("pe", field, value);
  const showModifiers = state.stability === "stable";
  const hasContra = state.modifiers.some((value) => value !== "none");
  const showStandard = showModifiers && state.modifiers.includes("none");
  const showContra = showModifiers && hasContra;

  return (
    <div className="grid gap-4">
      <AcuteQuestionCard title="Hemodynamic stability" note="High-risk PE includes persistent hemodynamic instability, shock, or acute deterioration.">
        <AcuteChoiceGrid
          value={state.stability}
          onChange={(value) => {
            setField("stability", value);
            setField("modifiers", []);
          }}
          options={[
            { value: "stable", label: "Stable" },
            { value: "unstable", label: "Unstable", detail: "High-risk PE or clinical deterioration" },
          ]}
        />
      </AcuteQuestionCard>

      {showModifiers ? (
        <AcuteQuestionCard title="Treatment modifiers" note="Select all that apply. Choosing None clears the other modifiers.">
          <AcuteChoiceGrid
            multi
            value={state.modifiers}
            onChange={(value) => onToggleModifier("pe", value)}
            options={[
              { value: "cancer", label: "Active cancer" },
              { value: "liver", label: "Significant hepatic dysfunction" },
              { value: "crcl15", label: "Creatinine clearance below 15 mL/min" },
              { value: "preg", label: "Pregnancy" },
              { value: "drugint", label: "Clinically important DOAC drug interaction" },
              { value: "none", label: "None of the above" },
            ]}
          />
        </AcuteQuestionCard>
      ) : null}

      <div className="grid gap-4">
        {state.stability === "unstable" ? (
          <AcuteRecommendationBox tone="danger" title="Unstable pulmonary embolism">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Consider immediate IV thrombolysis.</li>
              <li>Consult ICU urgently.</li>
              <li>Consider pharmacomechanical therapy when bleeding risk is high.</li>
              <li>Use UFH or LMWH after initial reperfusion therapy is completed.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showStandard ? (
          <AcuteRecommendationBox tone="action" title="Standard PE anticoagulation">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>LMWH for at least 5 days with warfarin until INR is 2 to 3.</li>
              <li>LMWH lead-in followed by dabigatran where appropriate.</li>
              <li>Apixaban 10 mg twice daily for 7 days, then 5 mg twice daily.</li>
              <li>Rivaroxaban 15 mg twice daily for 21 days, then 20 mg once daily.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}

        {showContra ? (
          <AcuteRecommendationBox tone="warning" title="PE treatment with modifiers present">
            <ul className="grid gap-3 pl-4 text-muted-foreground leading-relaxed">
              <li>Active cancer: consider LMWH monotherapy.</li>
              <li>Hepatic dysfunction, pregnancy, or CrCl below 15: use warfarin with heparin support or LMWH with specialist input.</li>
              <li>Important DOAC interactions: favor warfarin and LMWH or specialist consultation.</li>
            </ul>
          </AcuteRecommendationBox>
        ) : null}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, meta }) {
  return (
    <Card className="p-4 flex flex-col gap-1">
      <CardContent className="p-0 flex flex-col gap-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
        <strong className="text-lg font-semibold">{value}</strong>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </CardContent>
    </Card>
  );
}

function ContentSummaryCard({ eyebrow, title, description }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description || "No structured summary is available yet."}</p>
      </CardContent>
    </Card>
  );
}

function ContentOutlinePreview({ eyebrow, title, items }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items?.length ? (
          <ul className="space-y-1.5">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-primary" />
                <span>{sanitizeDisplayText(item)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Section headings will appear here when available.</p>
        )}
      </CardContent>
    </Card>
  );
}

function ContentListPreview({ eyebrow, title, items, ordered = false, emptyLabel }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <Card>
      <CardHeader className="pb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items?.length ? (
          <ListTag className={cn("space-y-1 text-sm pl-5", ordered ? "list-decimal" : "list-disc")}>
            {items.map((item) => (
              <li key={item}>{renderInlineContent(item)}</li>
            ))}
          </ListTag>
        ) : (
          <p className="text-sm text-muted-foreground">{emptyLabel}</p>
        )}
      </CardContent>
    </Card>
  );
}

function ContentTablePreview({ eyebrow, title, table }) {
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {table?.headers?.length && table?.rows?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                {table.headers.map((header) => (
                  <TableHead key={header}>{renderInlineContent(header)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.rows.slice(0, 5).map((row, rowIndex) => (
                <TableRow key={`${row.join("-")}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={`${cell}-${cellIndex}`}>{renderInlineContent(cell)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground px-6 pb-6">A structured comparison table will appear here when available.</p>
        )}
      </CardContent>
    </Card>
  );
}

function PageLead({ eyebrow, title, description }) {
  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
        <div className="mt-2">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FieldRenderer({ input, value, onChange }) {
  if (input.type === "checkbox") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
          value ? "border-primary bg-primary/5" : "border-border"
        )}
        onClick={() => onChange(!value)}
      >
        <Checkbox
          id={input.id}
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(checked)}
        />
        <Label htmlFor={input.id} className="cursor-pointer font-normal">
          {input.label}
        </Label>
      </div>
    );
  }

  if (input.type === "radio") {
    return (
      <fieldset className="rounded-lg border p-3 space-y-2">
        <legend className="text-sm font-medium px-1">{input.label}</legend>
        <RadioGroup
          value={String(value)}
          onValueChange={(val) => onChange(val)}
          className="flex flex-wrap gap-1"
        >
          {input.options.map((option) => (
            <Label
              key={option.value}
              htmlFor={`${input.id}-${option.value}`}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm cursor-pointer border transition-colors",
                String(value) === String(option.value)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-transparent hover:bg-muted"
              )}
            >
              <RadioGroupItem
                value={String(option.value)}
                id={`${input.id}-${option.value}`}
                className="sr-only"
              />
              {option.label}
            </Label>
          ))}
        </RadioGroup>
      </fieldset>
    );
  }

  if (input.type === "select") {
    return (
      <div className="rounded-lg border p-3 space-y-1.5">
        <Label htmlFor={input.id}>{input.label}</Label>
        <Select value={String(value)} onValueChange={(val) => onChange(val)}>
          <SelectTrigger id={input.id}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {input.options.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-3 space-y-1.5">
      <Label htmlFor={input.id}>{input.label}</Label>
      <Input
        id={input.id}
        type="number"
        min={input.min}
        max={input.max}
        step={input.step ?? 1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function ResultPanel({ result }) {
  if (!result) {
    return (
      <Card className="border-muted">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">Outcome</span>
            <CardTitle className="text-lg">Live interpretation</CardTitle>
          </div>
          <Calculator size={17} className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Alert>
            <CircleAlert className="h-5 w-5" />
            <AlertTitle>Complete the inputs to generate an actionable recommendation.</AlertTitle>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const tone = getToneClass(result.tone);
  const meta = toneMeta[tone];
  const ToneIcon = meta.icon;

  return (
    <Card className={cn("space-y-4", tone === "success" ? "border-green-500/30" : tone === "warning" ? "border-yellow-500/30" : tone === "danger" ? "border-red-500/30" : "")}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Outcome</span>
          <CardTitle className="text-lg">Live interpretation</CardTitle>
        </div>
        <ToneIcon size={18} className="text-muted-foreground" />
      </CardHeader>

      <div className="grid gap-3 p-5 rounded-2xl border border-border bg-muted/40">
        <Badge variant="secondary">{meta.label}</Badge>
        <h4 className="text-base font-semibold leading-snug">{result.headline}</h4>
        {result.summary ? <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p> : null}
      </div>

      {result.action ? (
        <div className="border border-border rounded-xl bg-muted/50 p-5">
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">Recommended move</span>
          <p className="mt-2 text-sm leading-relaxed">{result.action}</p>
        </div>
      ) : null}

      {result.metrics?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {result.metrics.map((metric) => (
            <div key={`${metric.label}-${metric.value}`} className="flex flex-col gap-1.5 p-4 border border-border rounded-xl bg-card">
              <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
              <strong className="text-sm font-semibold leading-snug text-foreground">{metric.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {result.recommendations?.length ? (
        <div className="grid gap-3">
          {result.recommendations.map((item) => (
            <div key={`${item.label}-${item.value}`} className="flex flex-col gap-1.5 p-4 border border-border rounded-xl bg-card">
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              <strong className="text-sm font-semibold leading-snug text-foreground">{item.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {result.tables?.length ? (
        <div className="grid gap-3.5">
          {result.tables.map((table) => (
            <div key={table.title} className="grid gap-3 border border-border rounded-xl bg-muted/50 p-4">
              <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">{table.title}</span>
              <div className="overflow-x-auto border border-border rounded-xl bg-card">
                <table className="w-full border-collapse text-sm [&_th]:p-3 [&_th]:text-left [&_th]:border-b [&_th]:border-border [&_th]:bg-muted [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_td]:p-3 [&_td]:text-left [&_td]:border-b [&_td]:border-border [&_td]:leading-relaxed [&_tbody_tr:nth-child(even)]:bg-muted/30">
                  <thead>
                    <tr>
                      {table.headers.map((header) => (
                        <th key={header}>{renderInlineContent(header)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={`${table.title}-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${table.title}-${rowIndex}-${cellIndex}`}>
                            {renderInlineContent(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {result.supporting?.length ? (
        <div className="grid gap-2 p-4 border border-border rounded-xl bg-muted/30">
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">Supporting evidence</span>
          <ul className="m-0 pl-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {result.supporting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-2 p-4 border border-border rounded-xl bg-muted/30 text-sm">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">Clinical disclaimer</span>
        <p className="text-muted-foreground leading-relaxed">{globalToolDisclaimer.text}</p>
        {globalToolDisclaimer.source ? <small className="text-muted-foreground">{globalToolDisclaimer.source}</small> : null}
      </div>
    </Card>
  );
}

function ClinicalReference({
  title,
  content,
  activeTab,
  onTabChange,
  eyebrow = "Clinical detail",
  emptyMessage = "No clinical detail is available for this tool yet.",
}) {
  const visibleTab = content.tabs.find((tab) => tab.id === activeTab) ?? content.tabs[0] ?? null;
  const [openCardId, setOpenCardId] = useState("");

  useEffect(() => {
    if (!visibleTab?.cards?.length) {
      setOpenCardId("");
      return;
    }

    setOpenCardId(`${visibleTab.id}-${visibleTab.cards[0].title}`);
  }, [visibleTab]);

  const TabIcon = referenceTabIconById[visibleTab?.id] ?? BookOpenText;

  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
          <h3>{title || "Clinical reference"}</h3>
        </div>
        <BookOpenText size={17} />
      </div>

      {content.tabs.length ? (
        <>
          <div className="flex flex-wrap gap-3 mb-4" role="tablist" aria-label="Clinical reference sections">
            {content.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={visibleTab?.id === tab.id}
                className={visibleTab?.id === tab.id ? "tab-button active" : "tab-button"}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {visibleTab ? (
            <div className="grid gap-4">
              <div className="grid gap-3">
                {visibleTab.cards.map((card) => {
                  const cardId = `${visibleTab.id}-${card.title}`;
                  const isOpen = openCardId === cardId;

                  return (
                    <article key={cardId} className={isOpen ? "accordion-card open" : "accordion-card"}>
                      <button
                        type="button"
                        className="w-full flex items-start justify-between gap-4 p-4 text-left bg-transparent border-0 cursor-pointer"
                        onClick={() => setOpenCardId(isOpen ? "" : cardId)}
                        aria-expanded={isOpen}
                      >
                        <span className="min-w-0 grid grid-cols-[auto_minmax(0,1fr)] gap-3.5 items-start">
                          <span className="w-8 h-8 grid place-items-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                            <TabIcon size={16} />
                          </span>
                          <span>
                            <strong>{card.title}</strong>
                            {card.summary ? <p>{card.summary}</p> : null}
                          </span>
                        </span>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>

                      {isOpen ? (
                        <div className="grid gap-4 p-4 pt-0 border-t border-border bg-muted/30">
                          {card.blocks.map((block, index) => (
                            <ContentBlock key={`${card.title}-${block.type}-${index}`} block={block} />
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="py-6 text-left">
          <CircleAlert size={24} />
          <h4>{emptyMessage}</h4>
        </div>
      )}
    </section>
  );
}

function ContentBlock({ block }) {
  if (block.type === "paragraph") {
    return <p className="text-muted-foreground leading-relaxed">{renderInlineContent(block.text)}</p>;
  }

  if (block.type === "subheading") {
    return <h5 className="text-base font-semibold leading-snug mt-1">{renderInlineContent(block.text)}</h5>;
  }

  if (block.type === "fact") {
    return (
      <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(140px,0.65fr)] items-start gap-3 p-4 rounded-xl border border-border bg-card">
        <span>{renderInlineContent(block.label)}</span>
        <strong>{renderInlineContent(block.value)}</strong>
      </div>
    );
  }

  if (block.type === "callout") {
    const Icon = block.tone === "warning" ? CircleAlert : BadgeCheck;
    return (
      <div className={`content-callout ${block.tone === "warning" ? "warning" : "note"}`}>
        <div className="w-8 h-8 grid place-items-center rounded-full bg-card/70 flex-shrink-0">
          <Icon size={16} />
        </div>
        <div>
          <strong>{renderInlineContent(block.label)}</strong>
          <p>{renderInlineContent(block.value)}</p>
        </div>
      </div>
    );
  }

  if (block.type === "reference-list") {
    return (
      <ol className="m-0 pl-6 grid gap-3.5">
        {block.items.map((item) => (
          <li key={item} className="p-0 pl-1 m-0 border-0 bg-transparent leading-relaxed text-muted-foreground">
            {renderInlineContent(item)}
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "bullet-list" || block.type === "ordered-list") {
    const ListTag = block.type === "ordered-list" ? "ol" : "ul";
    return (
      <ListTag className="m-0 pl-4 text-muted-foreground leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{renderInlineContent(item)}</li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-x-auto border border-border rounded-xl bg-card">
        <table className="w-full border-collapse [&_th]:p-4 [&_th]:text-left [&_th]:border-b [&_th]:border-border [&_th]:bg-muted [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_td]:p-4 [&_td]:text-left [&_td]:border-b [&_td]:border-border [&_td]:leading-relaxed [&_tbody_tr:nth-child(even)]:bg-muted/30">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header}>{renderInlineContent(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${row.join("-")}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`}>{renderInlineContent(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="m-0 p-3.5 rounded-lg bg-muted font-mono text-sm text-muted-foreground">
        <code>{block.content}</code>
      </pre>
    );
  }

  return null;
}

function renderInlineContent(text) {
  const safeText = sanitizeDisplayText(text);
  const tokens = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match = pattern.exec(safeText);

  while (match) {
    if (match.index > lastIndex) {
      tokens.push(safeText.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const resolvedTarget = resolveMarkdownTarget(match[3]);

      if (resolvedTarget?.kind === "guide") {
        tokens.push(
          <a
            key={`${match[2]}-${match.index}`}
            href={buildGuideHref(resolvedTarget.id)}
            className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary"
          >
            {match[2]}
          </a>
        );
      } else if (resolvedTarget?.kind === "tool") {
        tokens.push(
          <a
            key={`${match[2]}-${match.index}`}
            href={buildToolHref(resolvedTarget.id)}
            className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary"
          >
            {match[2]}
          </a>
        );
      } else if (
        resolvedTarget?.kind === "external" &&
        !/thrombosiscanada\.ca/i.test(resolvedTarget.href)
      ) {
        tokens.push(
          <a
            key={`${match[2]}-${match.index}`}
            href={resolvedTarget.href}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary"
          >
            {match[2]}
          </a>
        );
      } else {
        tokens.push(match[2]);
      }
    } else if (match[4]) {
      tokens.push(<strong key={`${match[4]}-${match.index}`}>{match[4]}</strong>);
    } else if (match[5]) {
      tokens.push(<code key={`${match[5]}-${match.index}`}>{match[5]}</code>);
    } else if (match[6]) {
      tokens.push(<em key={`${match[6]}-${match.index}`}>{match[6]}</em>);
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(safeText);
  }

  if (lastIndex < safeText.length) {
    tokens.push(safeText.slice(lastIndex));
  }

  return tokens.map((token, index) => {
    if (typeof token === "string") {
      return <Fragment key={`${token}-${index}`}>{token}</Fragment>;
    }

    return token;
  });
}

function sanitizeDisplayText(value) {
  if (!value) {
    return "";
  }

  return value
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/\s+#{1,4}\s+/g, " ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^"\s*/gm, "")
    .replace(/\\\(/g, "")
    .replace(/\\\)/g, "")
    .replace(/\\\[/g, "")
    .replace(/\\\]/g, "")
    .replace(/\$\$([^$]+)\$\$/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\([_%#&])/g, "$1")
    .replace(/(^|\s)---(\s|$)/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export default App;
