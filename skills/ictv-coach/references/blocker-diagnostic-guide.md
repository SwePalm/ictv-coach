# Blocker Diagnostic Guide & Adaptive Coaching Tiers

Users rarely wake up wanting to climb an abstract adoption ladder. They show up because **something in their AI workflow feels slow, fragile, or untrustworthy**.

Use this guide to:
1. Recognize which ICTV pillar (`I`, `C`, `T`, or `V`) is causing the user's felt blocker.
2. Silently calibrate the **coaching depth** (Tier 1, Tier 2, or Tier 3) so beginners aren't overwhelmed and advanced builders never feel talked down to.

> [!IMPORTANT]
> **Never display a multi-stage ladder or score matrix to the user.** Use the tiers below strictly to select a practice that fits where they already work.

---

## How to Calibrate Coaching Depth

* **Tier 1 — Everyday Chat & Drafting:** User works primarily in single-turn or multi-turn chat threads, copy-pasting inputs and editing outputs manually.
* **Tier 2 — Repeatable Work & Owned Files:** User works on recurring deliverables, attaches files or folders, uses project instructions (`CLAUDE.md`, `GEMINI.md`, Custom GPTs/Projects), and wants consistency across sessions.
* **Tier 3 — Advanced Agentic & Scaling:** User runs coding/research agents, MCP tools, skills, or multi-agent workflows, and hits bottlenecks around review volume, criteria drift, context bloat, or autonomous reliability.

---

## Pillar 1: Verification (`V`) — *Often the Best Place to Start*

Verification is the engine of the ICTV loop. Writing down what "good" looks like almost always exposes that instructions (`I`) were vaguer than they felt and context (`C`) was missing.

### Tier 1 Blocker: *"I spend 2 minutes prompting and 45 minutes checking or rewriting it myself."*
* **What's happening:** The Substitution Trap. The user has an unwritten picture of "good" in their head, asks a brief question, and then manually edits the draft line-by-line.
* **The Practice to Coach:** **Three Checks + Check Report First.**
  * Before asking the AI to draft, write 3 tickable rules for what a good result must do (and 1 thing it must *not* do).
  * Ask the AI to print a **Check Report** at the very top of its response (including a `"Not checked:"` line) *before* writing the draft.

### Tier 2 Blocker: *"The output looks polished, so I skim it—and then an embarrassing factual or tone error slips through."*
* **What's happening:** Fluency Bias & **Criteria Drift** (Shankar et al., 2024; Lee et al., 2025) or **The Stowaway** (a fact the model remembers from training data wearing a citation that doesn't actually contain it).
* **The Practice to Coach:** **Mechanical Grounding & The Stowaway Rule.**
  * Require every factual claim or quote to cite the exact passage from a fetched source, plus an explicit `[Assumption]` tag whenever evidence is missing.
  * Add a mandatory `"Not checked:"` section to every handover so the AI states what it could *not* verify.

### Tier 3 Blocker: *"I have agents running in parallel, and reviewing their work has made ME the bottleneck—or their self-checks just rubber-stamp their own mistakes."*
* **What's happening:** Generator-Verifier Collusion & Review Volume Overload. Asking the same agent context that wrote the output to "check its work" suffers from confirmation bias.
* **The Practice to Coach:** **Independent Verifier & Mutation Testing.**
  * **Separate the rooms:** Have a fresh, independent verifier subagent (or deterministic script) grade the output against the rubric *without* seeing the generator's chain-of-thought rationalization.
  * **Mutation Catch Test:** Occasionally inject one known flaw into a sample draft and run your verifier check. If the check passes the flawed draft, tighten the check.
  * **Grow `V` from real misses:** Every failure logged in `ictv-coach/misses-ledger.md` becomes a permanent check in the task's handover.

---

## Pillar 2: Context (`C`) — *What the Job Needs to Know & How Results Arrive*

### Tier 1 Blocker: *"The AI gives generic, cliché answers that don't sound like me or fit my business."*
* **What's happening:** The Tribal Knowledge Gap. The AI only sees the one-sentence ask, not the background constraints or target audience.
* **The Practice to Coach:** **Split Input Context from Output Spec.**
  * Before hitting send, add two short bullets:
    1. *What you need to know about this situation/audience:* (2–3 facts)
    2. *How the result should arrive:* (format, length, tone, and words to avoid)

### Tier 2 Blocker: *"I'm tired of pasting the same background, role, and style rules into every new chat session."*
* **What's happening:** Ephemeral Context Lock-in. Valuable working context is trapped inside old chat threads or a single vendor's memory toggle.
* **The Practice to Coach:** **The 3x Paste Rule & Owned Context Folder.**
  * The third time you paste or explain the same background paragraph, stop. Put it in a plain Markdown file (e.g., `ME.md`, `AUDIENCE.md`, `PROJECT-BRIEF.md`) inside a folder you own on disk.
  * Point any AI tool at that folder so your context travels with you across tools and models.

### Tier 3 Blocker: *"Long agent sessions get dumber over time—the agent forgets earlier rules or gets confused by huge logs."*
* **What's happening:** **Context Rot & Window Pollution.** Stuffing every reference doc, tool log, and historical note into the active context window degrades model attention.
* **The Practice to Coach:** **Progressive Disclosure & State Offloading.**
  * Keep top-level briefs (`SKILL.md`, `AGENTS.md`, `brief.md`) lean (<100 lines) and move bulky reference material into on-demand files loaded only when needed.
  * Offload intermediate research or long tool outputs to scratch files on disk, keeping only verified summaries in the active conversation.

---

## Pillar 3: Instructions (`I`) — *How the Work Is Specified*

### Tier 1 Blocker: *"I'm hunting for the 'magic prompt', or I have to go back and forth 6 times before it gets what I want."*
* **What's happening:** Using chat to *do* the task before using chat to *specify* the task.
* **The Practice to Coach:** **The First-Day Handover Question.**
  * Read your prompt as if you were handing the task to a smart new colleague on their first day, then walking into a two-hour meeting. Ask the AI first: *"Before you write anything, ask me the 3 most important clarifying questions you need answered to do this right."*

### Tier 2 Blocker: *"I do this task every week, and every week the result comes back slightly different."*
* **What's happening:** Treating a repeating job like a one-off conversation.
* **The Practice to Coach:** **The Handover Interview -> Standing Brief.**
  * Run the `unblock` workflow to interview the user across `I`, `C`, `T`, and `V` and save a reusable `ictv-coach/handovers/<task>.md`.
  * Include an explicit **"Not acceptable"** section (negative constraints eliminate 80% of recurring annoyances).

### Tier 3 Blocker: *"My agent instructions have grown into a 2,000-word wall of rules, and the agent now ignores half of them."*
* **What's happening:** Instruction Bloat & Over-Specification. Adding speculative rules without evidence creates conflicting constraints.
* **The Practice to Coach:** **"Start With Less Than You Think You Need."**
  * Strip the instruction back to the core objective, hard boundaries, and verification checks.
  * Let every new instruction rule **earn its place** through a real failed verification recorded in `misses-ledger.md`, changing one variable at a time.

---

## Pillar 4: Tools (`T`) — *Plumbing vs. Action & Scoped Trust*

### Tier 1 Blocker: *"I don't use connectors or files because I'm worried about confidentiality or the AI doing something unintended."*
* **What's happening:** Treating all tool access as a single high-risk switch.
* **The Practice to Coach:** **Separate Context Plumbing from Action Tools.**
  * Distinguish **Context Plumbing** (read-only access to a safe local folder or public URL—zero external blast radius) from **Action Tools** (sending, deleting, modifying shared systems). Start strictly with read-only context plumbing on one low-risk task.

### Tier 2 Blocker: *"I want the agent to help with my inbox/docs/repo, but I don't trust it to make live changes."*
* **What's happening:** Missing a staging boundary and a clear handbrake.
* **The Practice to Coach:** **The 3-Criteria Trust Sort & Staged Writes.**
  * Sort any tool action by three criteria:
    1. *Does it have an effect outside this workspace?*
    2. *Does it touch sensitive information?*
    3. *Is it hard to undo?*
  * Grant **draft/staging write access** (e.g., create a draft email, write to a staging folder, open a draft branch) while keeping irreversible external actions behind a human approval **Handbrake**.
  * Demonstrate reversibility on one small step first—trust moves by demonstration, not by theory.

### Tier 3 Blocker: *"The agent wastes tokens or makes subtle arithmetic/formatting errors doing repetitive data processing—or I have approval fatigue from clicking 'Allow' 50 times."*
* **What's happening:** Using a probabilistic LLM for deterministic work, or lacking policy boundaries.
* **The Practice to Coach:** **Deterministic Tool Building & Exception Escalation.**
  * Have the agent write a small deterministic script/linter for repeatable data extraction, formatting, or validation rather than doing it "in its head" each run.
  * Replace per-step micromanagement approvals with sandboxed execution + explicit circuit breakers (escalate to the human only on failed checks, ambiguity, or high-impact boundaries).
