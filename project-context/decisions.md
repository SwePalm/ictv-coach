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

