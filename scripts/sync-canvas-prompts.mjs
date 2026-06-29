import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { canvasPromptTexts } from "./canvas-prompt-texts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "docs/canvas-prompts.txt");

function serviceBlocks() {
  const slugs = [
    "wrapping-integral",
    "wrapping-parcial",
    "ppf",
    "custom-color",
    "vinilado-llantas",
    "tintado-lunas",
  ];
  const lines = [];
  for (let i = 0; i < slugs.length; i++) {
    const base = i * 3;
    lines.push(
      "",
      `--- ${slugs[i]} ---`,
      `START: ${canvasPromptTexts[base + 3]}`,
      `END: ${canvasPromptTexts[base + 4]}`,
      `MOTION: ${canvasPromptTexts[base + 5]}`,
    );
  }
  return lines;
}

const lines = [
  "# Higgsfield Canvas — prompts Meralux Garage (generado automáticamente)",
  "# Canvas: https://higgsfield.ai/canvas/65628483-977d-48a2-93cb-a95a9f902005",
  "# Regenerar: pnpm sync-canvas-prompts",
  "# Guía: docs/video-workflow.md",
  "",
  "=== HERO — START ===",
  canvasPromptTexts[0],
  "",
  "=== HERO — END ===",
  canvasPromptTexts[1],
  "",
  "=== HERO — MOTION ===",
  canvasPromptTexts[2],
  "",
  "=== SERVICIOS (16:9 · nano_banana) ===",
  ...serviceBlocks(),
];

writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Synced Canvas prompts → ${path.relative(root, outPath)}`);

