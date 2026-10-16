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
