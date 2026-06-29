import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const expected = ["/logo/meralux-garage.png"];

const missing = [];
const present = [];

for (const urlPath of expected) {
  const filePath = path.join(publicDir, urlPath.replace(/^\//, ""));
  if (existsSync(filePath)) {
    present.push(urlPath);
  } else {
    missing.push(urlPath);
  }
}

console.log(`Media: ${present.length}/${expected.length} present\n`);

for (const p of present) {
  console.log(`  ✓ ${p}`);
}

if (missing.length) {
  console.log("\nFaltan:");
  for (const p of missing) {
    console.log(`  ✗ ${p}`);
  }
  process.exitCode = 1;
}
