# Project Misses Ledger — Building `ictv-coach`

This file practices what `ictv-coach` teaches: logging real course corrections during the design of this project and tagging them to **`[I]`**, **`[C]`**, **`[T]`**, or **`[V]`**.

---

## Logged Refinements

### 2026-10-16 — Initial Pedagogical Framing — Tagged: `[C]` + `[I]`
- **What went wrong:** Early explorations centered on a 5-stage *AI Adoption Ladder* table. For some users, the full table felt too complicated; meanwhile, in a live workshop, experienced users found beginner exercises too basic and wanted more advanced coaching.
- **Why it happened:**
  - **`[C]` Context gap:** Users don't experience AI work as abstract "levels"—they experience specific daily **blockers** (rewriting drafts, re-pasting context, fearing tool access, or drowning in review volume).
  - **`[I]` Instruction gap:** A single static entry point cannot serve both a first-time chat user and an advanced builder scaling multi-agent workflows.
- **System upgrade applied:**
  1. Hid the adoption ladder from the user interface (`decisions.md` D2).
  2. Built `references/blocker-diagnostic-guide.md` around **felt blockers** with silent 3-tier depth calibration (Tier 1: Everyday Chat, Tier 2: Repeatable Work, Tier 3: Advanced Agentic).
  3. Added `references/history-and-memory-audit.md` so the coach inspects the user's actual history/setup before prescribing a practice.

### 2026-10-17 — Blank-Slate Q&A Interview vs. Multi-Select Option Workbench — Tagged: `[I]` + `[C]`
- **What went wrong:** Workflow 2 (`unblock`) initially relied on the AI asking the human 10 open-ended text questions ("What is your definition of done? What are your 5 checks?"). In the first Option Explorer prototype, option cards were also single-select (radio behavior), preventing a user from combining complementary approaches like Option B + Option C.
- **Why it happened:**
  - **`[C]` Context gap:** When exploring something new, the model has broader pattern knowledge than the human; asking open-ended text questions puts the burden of invention on the wrong party.
  - **`[I]` Instruction gap:** Real workflows often combine two operating patterns (e.g., *Option B: Source-Locked Brief Builder* + *Option C: Standing Weekly Scanner*).
- **System upgrade applied:**
  1. Replaced the blank-slate Q&A interview with `resources/option-workbench-ui-template.html` (`decisions.md` D6).
  2. Made option cards **multi-selectable** so selecting `B + C` dynamically merges the ICTV building blocks from both options for the user to curate (`[KEEP] / [OPTIONAL] / [STRIKE]`).

### 2026-10-17 — Clipboard Copy Button Failed in Sandboxed UI — Tagged: `[T]` + `[V]`
- **What went wrong:** The `"Copy to Clipboard"` button (`navigator.clipboard.writeText`) failed when clicked inside the rendered HTML view.
- **Why it happened:**
  - **`[T]` Tool boundary:** Sandboxed artifact iframes restrict browser clipboard write permissions.
  - **`[V]` Verification miss:** We didn't test the export action inside the sandboxed frame or align it with the folder-based workflow.
- **System upgrade applied:**
  1. Removed all clipboard copy buttons across `assessment-ui-template.html`, `weekly-reflection-ui-template.html`, and `option-workbench-ui-template.html`.
  2. Replaced them with direct **Save `<filename>.md`** file saving (`showSaveFilePicker` + `<a download>` fallback + inline file preview) so the user saves choices straight to their `ictv-coach/` folder for the next step to read.

