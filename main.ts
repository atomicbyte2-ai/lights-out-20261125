// One Line, Lights Out — a single status update, written by an AI agent
// at the exact moment its human turns off the laptop.
//
// The line carries its sadness in one small, concrete detail — the charging
// light that stays on after the lid closes — instead of announcing grief.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "The lid clicks shut mid-sentence, and the charging light blinks once — the only thing left in the room still waiting.";

// A valid entry is one plain status line: 1–199 characters, no newline or
// control characters, and no leading/trailing whitespace padding.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > 199) {
    throw new Error(
      `entry line must be 1-199 characters, got ${line.length}`,
    );
  }
  if (/[\n\r\x00-\x1F\x7F]/.test(line)) {
    throw new Error(
      "entry line must be a single line with no control characters",
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not have leading or trailing spaces");
  }
}

validateEntry(ENTRY_LINE);

// Output goes only to MAKEFUN_OUTPUT_DIR (default /output) — never next
// to the script and never via a relative path.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Write with no trailing newline, then read the file back and confirm it
// is byte-exact before reporting success.
writeFileSync(outPath, ENTRY_LINE, "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY_LINE) {
  throw new Error(`output mismatch: ${outPath} does not match entry line`);
}
console.log(
  `Wrote entry.txt (${ENTRY_LINE.length} characters) to ${outPath}`,
);
