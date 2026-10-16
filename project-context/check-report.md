# Check Report — `ictv-coach` v1 Build

*Verified against `project-context/brief.md` and `project-context/decisions.md` before final review.*

---

## Verification Checks

- [x] **V1 (No Visible Adoption Ladder):** Verified across `SKILL.md`, `references/`, `resources/`, `chat-edition/`, and `README.md`. The 5-stage ladder and progress bars are absent; user-facing entry points are strictly symptom-based blockers.
- [x] **V2 (Beginner-to-Advanced Depth Calibration):** Verified in `references/blocker-diagnostic-guide.md`. Every ICTV letter (`I`, `C`, `T`, `V`) has concrete, non-trivial interventions across Tier 1 (Everyday Chat), Tier 2 (Repeatable Work & Files), and Tier 3 (Advanced Agentic: independent verifiers, mutation catch tests, progressive disclosure, deterministic script generation).
- [x] **V3 (Dual Delivery — Skill + Chat Edition):**
  - Native Agent Skill created at `skills/ictv-coach/SKILL.md` (and linked at `.agents/skills/ictv-coach`) with all 10 relative markdown links to `references/` and `resources/` verified on disk.
  - Standalone Chat Edition created at `chat-edition/ICTV-COACH-PROMPT.md` with instructions for auditing built-in chat memory and saving plain Markdown files locally.
- [x] **V4 (Owned Multi-File Context Folder):**
  - User coaching state is structured as a visible `ictv-coach/` folder (`profile.md`, `active-focus.md`, `misses-ledger.md`, `check-ins/`, `handovers/`).
  - Our own build dogfoods the pattern in `project-context/` (`brief.md`, `decisions.md`, `misses-ledger.md`, `check-report.md`).
- [x] **V5 (Plain Business & Practitioner Language):** Core instructions frame value around decisions, work quality, accountability (*substitution vs. signature*), and earned trust. No unexplained developer jargon ("agent harness", "eval suite") in user-facing coaching prompts.
- [x] **V6 (Privacy & Public GitHub Readiness):** Zero private client names, employer references, or personal vault paths appear in any repository file.

---

## Bracketed Assumptions
- `[Assumption: Users cloning the repository on GitHub may run the coach inside the repo itself; we should add a .gitignore rule for a personal local ictv-coach-session/ or document how to keep personal coaching notes private if forking.]`

## Not Checked
- **Live user trial on an external ChatGPT / Copilot session:** While the prompt structure in `chat-edition/ICTV-COACH-PROMPT.md` is verified for completeness, its behavioral feel in a live third-party web chat session with real user memory has not yet been field-tested with external users.
- **Automated cron trigger (`sidecar.json`):** The weekly check-in protocol (`references/weekly-checkin-guide.md`) includes the self-contained automation prompt, but a live background cron job has not been enabled on this machine yet (requires user opt-in for day/time).
