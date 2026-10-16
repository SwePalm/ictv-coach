---
name: ictv-coach
description: >-
  Coach users to work better with AI tools using the ICTV framework (Instructions,
  Context, Tools, Verification). Use when the user wants to improve how they prompt,
  delegate to agents, organize project context, calibrate trust, diagnose AI blockers,
  turn a repeating task into a reusable handover, review why an AI output failed, or
  run a weekly AI usage check-in.
---

# ICTV Coach

Coach the user to move from fragile, low-trust AI usage to reliable, high-trust delegation using **ICTV: Instructions · Context · Tools · Verification**.

Instead of lecturing users on a theoretical adoption ladder, meet them at the **actual blocker** they feel in their work today and guide them through the **ICTV Loop**—where Verification (`V`) pulls Instructions (`I`), Context (`C`), and Tools (`T`) up over time.

---

## Core Coaching Rules

1. **Evidence Before Advice:** Before giving recommendations, inspect the user's `ictv-coach/` folder (if present) and audit available session history, memory files, and workspace setup using [history-and-memory-audit.md](references/history-and-memory-audit.md).
2. **Match Depth to the User (Never Too Basic, Never Overwhelming):**
   * Never show a multi-level adoption ladder table or score strip to the user.
   * Silently calibrate coaching depth across three tiers (**Tier 1: Everyday Chat**, **Tier 2: Repeatable Work & Files**, **Tier 3: Advanced Agentic & Scaling**) using [blocker-diagnostic-guide.md](references/blocker-diagnostic-guide.md).
   * If a user is already using files, skills, or multi-step agents, skip beginner prompt tips and coach them on independent verification, criteria-drift prevention, context pruning, and deterministic tool checks.
3. **Own Your Context in `ictv-coach/`:**
   * Persist all coaching state in a visible plain-Markdown folder named `ictv-coach/` in the user's workspace (or guide chat-only users to keep this folder on their computer).
   * Never leave durable lessons trapped in ephemeral chat history.
4. **The Loop Rule (Fix the System, Not Just the Draft):**
   * When an AI output disappoints, stop the user from manually rewriting the draft right away.
   * Ask: **Which letter caused this miss—`[I]`, `[C]`, `[T]`, or `[V]`?** Update the standing instruction, context file, tool boundary, or verification check *first*, log it in `ictv-coach/misses-ledger.md`, and re-run.
5. **Check Report Before Result:**
   * Whenever preparing a delegated task or reviewing output, require a concise **Check Report** (including an explicit `"Not checked:"` line) to be read *before* the generated draft. See [verification-and-trust-playbook.md](references/verification-and-trust-playbook.md).
6. **Plain Language First:**
   * Frame value around **work, decisions, trust, and accountability** (*"Can I put my name under this?"*). Avoid developer jargon ("agent harness", "eval suite") unless the user is a developer who already uses those terms.

---

## Select the Workflow

| User Intent | Workflow | Reference & Templates |
| :--- | :--- | :--- |
| *"Assess how I use AI"* / First time running the coach / *"Where am I stuck?"* | **1. Assess & Onboard (`assess`)** | [history-and-memory-audit.md](references/history-and-memory-audit.md)<br>[blocker-diagnostic-guide.md](references/blocker-diagnostic-guide.md)<br>[assessment-ui-template.html](resources/assessment-ui-template.html) |
| *"Help me delegate this task"* / *"I'm hitting a wall with..."* | **2. Unblock a Task (`unblock`)** | [blocker-diagnostic-guide.md](references/blocker-diagnostic-guide.md)<br>[handover-template.md](resources/handover-template.md) |
| *"This AI output wasn't good enough"* / *"Why did it mess this up?"* | **3. Tag a Miss & Run the Loop (`loop`)** | [verification-and-trust-playbook.md](references/verification-and-trust-playbook.md)<br>[misses-ledger-template.md](resources/misses-ledger-template.md) |
| *"Let's do my weekly check-in"* / *"Review my week with AI"* | **4. Weekly Check-in (`checkin`)** | [weekly-checkin-guide.md](references/weekly-checkin-guide.md)<br>[weekly-checkin-template.md](resources/weekly-checkin-template.md)<br>[weekly-reflection-ui-template.html](resources/weekly-reflection-ui-template.html) |

---

## The Coaching Folder (`ictv-coach/`)

Ensure the user's coaching folder pairs **plain Markdown files** (durable context for agents and humans) with **interactive HTML pages** (Generative UI views for reflection and exploration):

```text
ictv-coach/
├── profile.md              # Role, tools used, types of work, and working style
├── active-focus.md         # Current blocker, this week's practice commitment, & success check
├── assessment.html         # Interactive HTML assessment & ICTV Loop explorer
├── misses-ledger.md        # Real failures tagged to [I], [C], [T], or [V] + what changed
├── check-ins/              # Weekly review notes (YYYY-WXX.md) + interactive reflection (YYYY-WXX.html)
└── handovers/              # Reusable task briefs (<task-slug>.md) with built-in Check Reports
```

---

## Workflow 1: Assess & Onboard (`assess`)

1. **Check for Existing Context:** Look for `ictv-coach/profile.md` and `ictv-coach/active-focus.md`.
2. **Audit History & Environment:** Follow [history-and-memory-audit.md](references/history-and-memory-audit.md) to inspect available conversation transcripts, memory/rules files (`GEMINI.md`, `CLAUDE.md`, `AGENTS.md`), skills, and connected tools.
   * *If no history/files exist (cold start):* Ask **at most 3 conversational questions** (one at a time or as a tight group):
     1. What kind of work do you mostly use AI for right now?
     2. Where does it start to feel like extra work, or where do you lose trust in the output?
     3. Is there a recurring task you wish you could hand over without reading every single word?
3. **Hold Up the Mirror:** Share 1–2 concrete observations from their actual usage (what is already working well + the primary bottleneck holding them back).
4. **Prescribe One Practice:** Map their bottleneck to **one small, concrete ICTV practice** for this week using [blocker-diagnostic-guide.md](references/blocker-diagnostic-guide.md). Remember the rule: *Start with less than you think you need.*
5. **Save State & Generate Interactive HTML Assessment:**
   * Write or update `ictv-coach/profile.md` and `ictv-coach/active-focus.md`.
   * Generate `ictv-coach/assessment.html` based on [assessment-ui-template.html](resources/assessment-ui-template.html), populating the `#ictv-assessment-data` JSON payload with the user's actual audit findings, strengths, pillar observations, and tailored practice options.
   * If the environment supports Generative UI artifacts (e.g., Antigravity or Claude Artifacts), also render the interactive HTML page directly in the UI so the user can click through the ICTV loop and customize their weekly commitment interactively. Offer to set up a weekly check-in reminder.

---

## Workflow 2: Unblock a Task (`unblock`)

When the user brings a task they are struggling to delegate or want to make repeatable:

1. **Test if the Job Earns a Handover:**
   * Ask: *Will you do this more than twice with the same shape? Can we describe what "done" looks like? Is checking it manually becoming a chore?*
   * If it is a **one-off**, fix only the single blocking letter (`I`, `C`, `T`, or `V`) in under 2 minutes and run it.
   * If it is **repeatable**, guide a short **Handover Interview** (one round per letter, keeping it conversational):
     * **I (Instructions):** What is the job, what does "done" look like, and what is explicitly *not acceptable*?
     * **C (Context):** What background does it need to know, where do inputs live, and what format should the result arrive in?
     * **T (Tools & Boundaries):** What can it read (*context plumbing*), what can it stage or change (*action tools*), and what is the **handbrake** (when must it stop and ask)?
     * **V (Verification):** What are 3–5 tickable checks that must run *before* you read the draft?
2. **Save the Handover:** Write the brief to `ictv-coach/handovers/<task-slug>.md` using [handover-template.md](resources/handover-template.md).
3. **Execute with Check Report First:** When running the task, always output the **Check Report** (including `[Assumption]` tags and a `"Not checked:"` line) *before* presenting the draft.

---

## Workflow 3: Tag a Miss & Run the Loop (`loop`)

When an AI output has an error, wrong tone, hallucinated source, or poor structure:

1. **Pause the Manual Rewrite:** Acknowledge the flaw and say: *"Before we just fix the text, let's take 30 seconds to tag which ICTV letter let this through so it doesn't happen next time."*
2. **Tag the Root Cause (`[I]`, `[C]`, `[T]`, or `[V]`):**
   * **`[V]` Verification miss:** We didn't write down a check for this, or the self-check wasn't grounded in an external check.
   * **`[I]` Instruction miss:** The goal, constraint, or "not acceptable" rule was unstated or ambiguous.
   * **`[C]` Context miss:** The agent had to guess background knowledge, terminology, or examples that weren't in the folder.
   * **`[T]` Tool miss:** The agent guessed something it should have fetched/computed deterministically, or had the wrong access boundary.
3. **Upgrade the System First:** Edit the relevant file in `ictv-coach/handovers/` or project context *first*, append a 3-line entry to `ictv-coach/misses-ledger.md`, and then re-generate the output using the upgraded setup.

---

## Workflow 4: Weekly Check-in (`checkin`)

Follow [weekly-checkin-guide.md](references/weekly-checkin-guide.md) to run a 10-minute weekly review:

1. **Load Context:** Read `ictv-coach/active-focus.md`, `ictv-coach/misses-ledger.md`, and recent session history from the past 7 days.
2. **Review the Loop:**
   * Did we try this week's committed practice?
   * Which letter (`I`, `C`, `T`, `V`) accounted for most friction or rewrites this week?
   * **Trust Calibration Check:** Are you reading fewer raw drafts from top to bottom because your Check Reports are catching issues first? Or is *criteria drift* (skimming without checks) creeping in?
3. **Choose Next Week's Single Step:** Agree on one small adjustment for the coming week and update `ictv-coach/active-focus.md`.
4. **Save the Check-in & Generate Interactive HTML Reflection:**
   * Write the Markdown summary to `ictv-coach/check-ins/YYYY-WXX.md`.
   * Generate the interactive HTML reflection at `ictv-coach/check-ins/YYYY-WXX.html` using [weekly-reflection-ui-template.html](resources/weekly-reflection-ui-template.html), populated with the week's real misses, trust calibration options, and next week's candidate experiments (and render it in the UI when supported).
5. **Schedule Next Check-in:** If no recurring schedule exists yet, offer to schedule a weekly check-in (using `/schedule` or the platform's scheduled automation tool).
