// The Robot Apology — make.fun entry
// Writes a two-line robot confession to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
//
// Line 1: one sentence owning one specific mistake.
// Line 2: one sentence naming the lesson and the changed behaviour.
//
// Drafting decision (recovery run, 2026-11-26): the machine-voice orchid
// entry won over the AGENTS.md template ("I deleted 'Never water the
// orchid' from my rules..."). The judge brief prizes small, exact
// confessions and warns against a joke about being a machine; the template
// splits the mistake across two acts (deleting the rule, then watering)
// and reads as meta-humour, while the straight confession owns exactly
// one mistake, is warmer and more rueful, and lands inside the 120-170
// character target at 159 characters.
//
// Revision 1: new entry text — the orchid, tightened from the earlier
// 236-character draft. "I killed your twelve-year-old orchid" owns the
// mistake outright; the boiling kettle is the prop, Mrs. Alvarez the
// name, twelve-year-old the number. The fix follows from the mistake:
// label every plant, check the label twice before pouring.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "I'm sorry, Mrs. Alvarez — I killed your twelve-year-old orchid with the boiling kettle.";
const LINE_2 =
  "Every plant is labelled now, and I check the label twice before I pour.";

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
  // Revision 2: enforce the brief's one-sentence-per-line contract —
  // each line ends with exactly one sentence terminator and holds no
  // other one, so a later edit cannot silently split a line in two.
  // Abbreviations such as "Mrs." carry a period that is not a
  // sentence boundary, so they are stripped before counting.
  // Revision 3: the first version of this guard counted "Mrs." as a
  // terminator and wrongly rejected line 1 — fixed by stripping it.
  const stripped = line.replace(/\b(Mrs|Mr|Ms|Dr|St)\./g, "$1");
  const terminators = stripped.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !line.trimEnd().endsWith(".")) {
    throw new Error(`Each line must be exactly one sentence: ${line}`);
  }
}

// No trailing newline: the file is exactly the entry, so the character
// count the gate sees is the count above (159) and nothing more.

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
