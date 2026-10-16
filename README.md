# ICTV Coach (`ictv-coach`)

**From *"Don't trust AI"* to building a verification loop you can trust.**

**ICTV Coach** is an open-source coaching skill and workflow that helps you work better with AI—whether you are drafting in everyday chat or orchestrating a team of autonomous agents.

> ### 🚀 Fastest Way to Start (For Humans)
> Copy the link to this repository, paste it into your AI tool of choice (Claude, ChatGPT, Antigravity, Cursor, Copilot), and say:
> ```text
> Read this repository and help me use ICTV Coach — set it up for my environment and run my first assessment.
> ```

---

## 🤖 Instructions for AI Assistants & Agents Reading This Repo

If a human just gave you this repository link and asked *"Help me use this"*, *"Set this up"*, or *"Coach me"*, **do not just summarize this README**. Follow the path that matches your capabilities right now:

### Path A: You Have Workspace / Local File Access *(Antigravity, Claude Code, Cursor, Windsurf, Codex)*
1. **Install the Skill:**
   * If you are already inside a clone of this repo, `.agents/skills/ictv-coach` is pre-linked.
   * Otherwise, clone or copy [`skills/ictv-coach/`](skills/ictv-coach/SKILL.md) into the user's workspace at `.agents/skills/ictv-coach/` (or their global skills directory, such as `~/.gemini/config/skills/ictv-coach` or `~/.claude/skills/ictv-coach`).
2. **Load the Skill Instructions:** Read [`skills/ictv-coach/SKILL.md`](skills/ictv-coach/SKILL.md) and [`skills/ictv-coach/references/history-and-memory-audit.md`](skills/ictv-coach/references/history-and-memory-audit.md).
3. **Run Workflow 1 (`assess`) Immediately:**
   * Audit available workspace rules, memory files, and recent session transcripts for how the user currently works with AI.
   * Present their **Blocker Mirror** (what already works well + their #1 bottleneck across `I`, `C`, `T`, or `V`).
   * Create their `ictv-coach/` folder (`profile.md`, `active-focus.md`, and the interactive `assessment.html` from [`assessment-ui-template.html`](skills/ictv-coach/resources/assessment-ui-template.html)) and propose **one** small practice experiment for this week.

### Path B: You Are a Web or Chat Assistant Without Direct Disk Access *(ChatGPT, Claude Web / Projects, Microsoft Copilot)*
1. **Load the Chat Edition Prompt:** Read [`chat-edition/ICTV-COACH-PROMPT.md`](chat-edition/ICTV-COACH-PROMPT.md) (and optionally [`skills/ictv-coach/references/blocker-diagnostic-guide.md`](skills/ictv-coach/references/blocker-diagnostic-guide.md)) and adopt those instructions as your active coaching persona.
2. **Tell the User How to Save Context (1 Sentence):** Recommend either pasting the prompt from [`chat-edition/ICTV-COACH-PROMPT.md`](chat-edition/ICTV-COACH-PROMPT.md) into a dedicated **Claude Project / ChatGPT Project / Custom GPT**, and creating an `ictv-coach/` folder on their computer to save the files you generate together.
3. **Run the First Assessment Right Now:**
   * Check your built-in **Memory** (if available) to see what you already know about the user's role, recurring tasks, and AI frustrations.
   * If you have memory of their work, hold up the mirror and name their #1 ICTV blocker (`I`, `C`, `T`, or `V`). If starting cold, ask at most the **3 short intake questions** from [`chat-edition/ICTV-COACH-PROMPT.md`](chat-edition/ICTV-COACH-PROMPT.md).
   * Generate their initial `profile.md`, `active-focus.md`, and—if you support **Artifacts / Canvas**—render an interactive HTML assessment page based on [`skills/ictv-coach/resources/assessment-ui-template.html`](skills/ictv-coach/resources/assessment-ui-template.html).

---

## What Is ICTV?

**ICTV** is the four questions a manager asks before handing work over—scaling as one single structure from a quick chat prompt to a team of autonomous agents:

* **I — Instructions:** How the work to be done is specified (objective, what "done" looks like, and what is explicitly *not acceptable*).
* **C — Context:** What the job needs to know, where inputs live, and how the result should arrive.
* **T — Tools:** Separating safe *context plumbing* (reading files/sources) from *action tools* (staged writes), plus a clear *handbrake* (when to stop and ask).
* **V — Verification:** Writing down what "good" looks like and reading a **Check Report** *before* you read the draft.

---

## Why ICTV? (The Loop That Builds Earned Trust)

Since ChatGPT launched, the standard advice has been *"Don't trust AI—always check everything."* In practice, that advice breaks down in two ways:
* **The Bottleneck:** You read and rewrite every sentence yourself, so AI feels like extra work.
* **Criteria Drift:** Because AI prose is fluent and confident, your attention naturally drops over time. You start skimming, and subtle errors or unverified citations (*stowaways*) slip past you.

**ICTV replaces blind trust and manual babysitting with a loop:**

```text
   ┌────────────────────────────────────────────────────────────┐
   │                                                            ▼
[ V: Verification ] ──(Exposes gap)──► Tag the Miss ──► [ I / C / T ]
Check Report BEFORE                     Why did it      Upgrade rule,
reading the draft                       fall short?     context, or tool
```

Whenever an AI output disappoints you, you don't just open the document and rewrite the text by hand (which teaches your setup nothing). You take 30 seconds with your coach to **tag the miss** to **`[I]`**, **`[C]`**, **`[T]`**, or **`[V]`** and update your folder—so the same failure never happens twice.

---

## Start from Your Blocker (Not a Complicated Framework)

You don't need to study a multi-level adoption table. **ICTV Coach** meets you at the friction you feel today—and automatically calibrates its coaching depth whether you are a beginner in chat or an advanced builder scaling agents:

| If You Feel This Blocker... | What's Actually Missing | What ICTV Coach Helps You Do |
| :--- | :--- | :--- |
| *"I spend 2 minutes prompting and 45 minutes rewriting the draft myself."* | **`[V]` Verification & `[I]` Instructions** | Define 3 tickable checks + a mandatory `"Not checked:"` line, and read the **Check Report before the draft**. |
| *"I keep pasting the same background into every chat, or it forgets how we work."* | **`[C]` Context** | Apply the **3x Paste Rule**: move recurring context out of chat history into plain Markdown files in a folder you own. |
| *"I get inconsistent results on work I do every week."* | **`[I]` Instructions & `[V]` Verification** | Run a 5-minute **Handover Interview** to turn a repeating task into a reusable `handover.md` with clear negative constraints. |
| *"I don't dare connect AI to real systems—what if it changes or sends something?"* | **`[T]` Tools** | Split **Context Plumbing** (read-only) from **Staged Actions** (draft writes), demonstrate reversibility, and set one explicit **Handbrake**. |
| *"I run multiple agents, and reviewing their output has made ME the bottleneck."* | **Advanced `[V]` & `[C]`** | Separate the generator from an independent verifier, run **mutation checks** on your rubric, prune context bloat, and offload deterministic checks to scripts. |

---

## Own Your Context: Plain Markdown + Interactive HTML

Models and front-ends change, so your working context shouldn't be locked inside one vendor's chat history.

As you work with `ictv-coach`, it creates and maintains a visible `ictv-coach/` folder in your workspace—pairing **plain Markdown files** (durable context for agents and humans) with **self-contained interactive HTML pages** (Generative UI dashboards you can open in any browser or view inline):

```text
ictv-coach/
├── profile.md              # Your role, tools, audience, and standing working rules
├── active-focus.md         # Your current blocker and the single practice you're testing this week
├── assessment.html         # Interactive HTML assessment & clickable ICTV Loop explorer
├── misses-ledger.md        # The Loop Engine: real failures tagged to [I], [C], [T], or [V] + fixes
├── check-ins/              # Weekly 5-minute notes (YYYY-WXX.md) + interactive reflection UI (YYYY-WXX.html)
└── handovers/              # Reusable task briefs (<task>.md) with built-in Check Reports
```

---

## Four Coaching Workflows You Can Trigger Anytime

Once set up, just ask your AI:
1. **"Assess how I use AI"** — Audits your recent transcripts/memory/files, reflects back what works and your #1 blocker, initializes `ictv-coach/`, and generates your interactive `assessment.html` dashboard.
2. **"Help me unblock [task]"** — Runs a tailored clinic or 4-round **Handover Interview** (`I → C → T → V`) on a real task on your desk today.
3. **"Tag this miss"** — When an AI output falls short, pauses manual rewriting to diagnose whether `[I]`, `[C]`, `[T]`, or `[V]` failed, upgrades your setup first, and logs it in `ictv-coach/misses-ledger.md`.
4. **"Run my weekly ICTV check-in"** — Reviews the past week's sessions and misses, checks whether your trust grew, and generates both `YYYY-WXX.md` and an interactive `YYYY-WXX.html` reflection page.

---

## Repository Map (For Humans & Agents)

| Path | Purpose |
| :--- | :--- |
| [`skills/ictv-coach/SKILL.md`](skills/ictv-coach/SKILL.md) | Main Agent Skill specification and workflow router (`assess`, `unblock`, `loop`, `checkin`). |
| [`skills/ictv-coach/references/blocker-diagnostic-guide.md`](skills/ictv-coach/references/blocker-diagnostic-guide.md) | Maps human blockers across Tier 1 (Chat), Tier 2 (Repeatable Files), and Tier 3 (Advanced Agentic) to concrete ICTV practices. |
| [`skills/ictv-coach/references/history-and-memory-audit.md`](skills/ictv-coach/references/history-and-memory-audit.md) | Playbook for auditing session transcripts, built-in chat memory, and workspace files before advising. |
| [`skills/ictv-coach/references/verification-and-trust-playbook.md`](skills/ictv-coach/references/verification-and-trust-playbook.md) | Check Report Before Result, the mandatory `"Not checked"` boundary, defending against *The Stowaway*, and the Miss Tagging Loop. |
| [`skills/ictv-coach/references/weekly-checkin-guide.md`](skills/ictv-coach/references/weekly-checkin-guide.md) | Protocol for the 10-minute weekly retrospective and recurring schedule setup. |
| [`skills/ictv-coach/resources/`](skills/ictv-coach/resources/) | Markdown templates (`profile`, `active-focus`, `misses-ledger`, `handover`, `weekly-checkin`) + interactive HTML templates (`assessment-ui-template.html`, `weekly-reflection-ui-template.html`). |
| [`chat-edition/ICTV-COACH-PROMPT.md`](chat-edition/ICTV-COACH-PROMPT.md) | Standalone copy-paste prompt for ChatGPT Projects/Custom GPTs, Claude Projects, and Microsoft Copilot. |
| [`project-context/`](project-context/brief.md) | Live example of dogfooding ICTV on this repo itself (`brief.md`, `decisions.md`, `misses-ledger.md`, `check-report.md`, `assessment.html`, and `check-ins/2026-W42.html`). |
