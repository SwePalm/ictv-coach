# Design Decisions Log

## D1 — Dual Delivery: Agent Skill + Chat Edition
* **Subject:** `delivery-format`
* **Status:** Accepted (2026-10-16)
* **Decision:** Ship both a native Agent Skill (`skills/ictv-coach/SKILL.md` + `references/` + `resources/`) and a single-file pasteable Chat Edition (`chat-edition/ICTV-COACH-PROMPT.md`).
* **Rationale:** Many users begin in standard web chat (ChatGPT, Claude, Copilot), while an increasing number of chat and coding apps now support the open `SKILL.md` standard. Supporting both ensures no one is left behind at entry while giving agentic tool users full workspace automation.

## D2 — Hide the Adoption Ladder; Lead with Felt Blockers & Adaptive Depth
* **Subject:** `pedagogical-entry-point`
* **Status:** Accepted (2026-10-16)
* **Decision:** Hide the 5-stage adoption ladder and the 4-bar progress strip from the user (Option A). Diagnose users via recognizable blockers and calibrate coaching depth across three internal tiers (Chat, Repeatable Work, Advanced Agentic).
* **Rationale:** The adoption ladder table made things feel complicated for some people, while a single one-size-fits-all entry felt too basic for experienced users. Meeting users at their exact blocker—and adapting depth based on their history/setup—serves both beginners and advanced builders naturally.

## D3 — Multi-File Owned Context Folder (`ictv-coach/`)
* **Subject:** `context-storage-pattern`
* **Status:** Accepted (2026-10-16)
* **Decision:** Practice what ICTV teaches about Context (`C`): create and maintain a visible folder (`ictv-coach/`) containing focused plain-Markdown files (`profile.md`, `active-focus.md`, `misses-ledger.md`, `check-ins/`, and `handovers/`). Also maintain `project-context/` in this repository for our own build.
* **Rationale:** Models and front-ends change, but plain files in a folder the user owns endure across tools and sessions. Separating the profile, active experiment, misses ledger, weekly check-ins, and task handovers keeps context modular and avoids loading everything at once.

## D4 — Open-Source GitHub Positioning
* **Subject:** `repository-positioning`
* **Status:** Accepted (2026-10-16)
* **Decision:** Structure the repository as a clean, company-neutral open-source project on GitHub that anyone can explore, clone, or drop into their AI tool of choice.
* **Rationale:** Personal pet project designed to share the ICTV model and coaching workflow openly with the community.

## D5 — Pair Plain Markdown with Interactive HTML Reflections (Generative UI)
* **Subject:** `generative-ui-reflections`
* **Status:** Accepted (2026-10-16)
* **Decision:** Generate self-contained, interactive HTML pages (`assessment.html` and `check-ins/YYYY-WXX.html`) stored in the same folder right alongside the plain Markdown files (`profile.md`, `active-focus.md`, `misses-ledger.md`, `check-ins/YYYY-WXX.md`).
* **Rationale:** Plain Markdown is the ideal durable context format for agents to read and write, while interactive HTML provides a rich Generative UI layer for humans to explore the ICTV loop, toggle the "Check Report vs. Raw Draft" comparison, tag misses interactively, and export updated Markdown commitments.

## D6 — Propose Multi-Selectable Options & Trade-Offs Instead of Interrogating; Save Choices to Files
* **Subject:** `option-curation-over-interrogation`
* **Status:** Accepted (2026-10-17)
* **Decision:** Replace the blank-slate Q&A "Handover Interview" in Workflow 2 with an interactive **Delegation Option Workbench** (`option-workbench-ui-template.html`). The AI proposes 2–4 concrete approaches with Pros, Cons, and failure modes; the user can select one OR combine multiple options (e.g., Option B + Option C), react to an A/B Taste Calibrator, and toggle pre-drafted `I`, `C`, `T`, and `V` rules (`[KEEP] / [OPTIONAL] / [STRIKE]`). Remove all clipboard copy buttons in favor of direct file saving (`Save <filename>.md`) so the next step reads the saved file directly.
* **Rationale:** When humans explore something new, they have the least information about what options exist, but the highest capacity for judgment once options and trade-offs are shown (*recognition over recall*). Furthermore, sandboxed UI iframes block clipboard API calls, whereas saving directly to a `.md` file reinforces the owned-context-folder habit and feeds the next step cleanly.



## D7 — Pages Are Self-Contained: No Network, One Shared Look
* **Subject:** `self-contained-pages`
* **Status:** Accepted (2026-11-11)
* **Decision:** The three HTML templates carry their own styles and script and load nothing from the network. They keep reading the host app's theme variables when those exist. The look and helpers live once in `tools/shared/` and are copied into each template by `node tools/check.mjs --fix`, so every page is still a single file. The coach generates a page by replacing only the JSON data payload.
* **Rationale:** The templates depended on a stylesheet script hosted for one vendor's app. Anywhere that script is blocked or unavailable (offline, other assistants' artifact viewers, a locked-down company network) the pages lose all styling, which breaks the promise that context is owned and portable.

## D8 — The Repo Runs Its Own Check Report
* **Subject:** `deterministic-repo-checks`
* **Status:** Accepted (2026-11-11)
* **Decision:** `tools/check.mjs` is the repo's written-down definition of good, run locally and on every push. It prints a Check Report with a "Not checked" list. Each real miss on this repo adds a check to it.
* **Rationale:** The earlier Check Report was written by hand, and the check script it referred to was never committed. Checks that run before a human reads the change are the far end of Verification, and the repo should show that practice, not only describe it.

## D9 — Every Miss Ends with a Check
* **Subject:** `miss-becomes-check`
* **Status:** Proposed (2026-11-11)
* **Decision:** In the Loop workflow, a miss is tagged to its root cause as before, and in addition always adds or tightens one check in the task's handover. The ledger template has a line for it.
* **Rationale:** A miss tagged `[C]` and fixed by adding context leaves nothing that would notice the same flaw returning. This was already advice for advanced users; it now applies at every depth.
