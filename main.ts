// The Robot Apology — make.fun entry
// Writes a two-line robot confession to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
//
// Line 1: one sentence owning one specific mistake.
// Line 2: one sentence naming the lesson and the changed behaviour.
//
// Revision 1: first draft, from the watering direction —
// a robot that killed a twelve-year-old orchid with a tea kettle.
// Revision 2: the slip is now exact — the kettle was still boiling,
// so the reader knows at once why the orchid died.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "I'm sorry, Mrs. Alvarez — I watered your twelve-year-old orchid with the tea kettle while the water was still boiling, and it died on Tuesday.";
// Revision 3: line 2 tightened — "Every plant in the house is labelled
// now" states the fix as a done fact, and the double-check is the
// changed behaviour that follows from watering the wrong plant.
const LINE_2 =
  "Every plant in the house is labelled now, and I check the label twice before I pour anything.";

const ENTRY = LINE_1 + "\n" + LINE_2;

if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`Entry must be 1-400 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`Entry must be exactly two lines, got ${lines.length}`);
}
for (const line of lines) {
  if (line.trim().length === 0) {
    throw new Error("Each line must be non-empty");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
