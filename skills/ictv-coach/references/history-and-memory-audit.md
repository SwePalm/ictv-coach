# History, Memory & Workspace Audit Playbook

When a user asks `ictv-coach` to assess how they work with AI (or during a weekly check-in), **gather real evidence before asking generic questions**. People get much higher value when the coach points to patterns in their actual work.

---

## Step 1: Check Existing Coaching Context First

1. Check if `ictv-coach/` exists in the current workspace (or parent project directory).
2. If `ictv-coach/profile.md`, `active-focus.md`, or `misses-ledger.md` exist, read them first so you never ask the user to repeat what is already recorded.

---

## Step 2: Inspect Available Evidence (By Environment)

Adapt your audit to what is accessible in the current AI environment:

### Path A: Agentic Workspace Environments (Antigravity, Claude Code, Cursor, etc.)
Inspect the following sources quietly and quickly (do not read hundreds of files—sample recent, high-signal artifacts):

1. **Standing Instructions & Rules (`I`):**
   * Check for `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.agents/rules/`, or `.agents/skills/`.
   * *Signal to look for:* Are instructions absent (everything done ad-hoc in chat), overly bloated (walls of speculative rules), or well-structured with clear boundaries and verification steps?
2. **Project Context Organization (`C`):**
   * Check how files and context are organized in the workspace (e.g., `README.md`, `docs/`, `project-context/`, or MCP servers like `personal-context`).
   * *Signal to look for:* Does durable context live in plain files the user owns, or is the user re-explaining background inside every conversation?
3. **Tooling & Boundaries (`T`):**
   * Check connected MCP servers, scripts, or automation configs.
   * *Signal to look for:* Is the user doing manual copy-paste for things a read-only tool or script could fetch? Are deterministic checks automated or done manually?
4. **Recent Conversation Transcripts (`V` & Loop Signals):**
   * When transcript logs are accessible (e.g., recent `.jsonl` transcripts or session logs), sample the user's prompts (`USER_INPUT`) across the last 3–5 sessions.
   * *Signals to look for:*
     * **Multi-turn repair loops:** User asks a short prompt, gets a long output, and spends 4+ turns saying *"No, change the tone"*, *"You forgot X"*, *"Make it shorter"*. (Points to missing `I`/`C` upfront and no `V` Check Report).
     * **Repeated context pasting:** User pastes the same role/company/audience description across sessions. (Points to `C` — needs an owned context file).
     * **Absence of verification criteria:** User asks for deliverables without defining what "good" looks like or asking for a check report before the draft. (Points to `V`).
     * **Advanced orchestration bottlenecks:** User delegates complex multi-file or multi-agent work, and friction happens around edge-case verification, regression, or scope drift. (Points to Tier 3 `V` and `I`).

### Path B: Chat Environments with Built-in Memory (ChatGPT, Claude Projects, Copilot)
When running inside a chat app where you cannot scan local disk directories automatically:
1. **Audit Built-in Assistant Memory:** Inspect the user memories / project instructions already loaded in your system context.
2. **Ask the User for a 60-Second Sample (Optional):**
   * *"If you want a sharp diagnosis, paste 2 or 3 prompts you sent recently where the AI's answer frustrated you or took too much editing—or tell me what you're working on today."*

### Path C: Cold Start (No History or Files Available)
If the workspace is empty and no history is available, ask **at most 3 short, grounded questions**:
1. *"What kind of work do you use AI for most right now (e.g., drafting, research, analysis, coding, planning)?"*
2. *"Where does it currently feel like extra work—pasting the same context, fixing drafts that miss the mark, or not trusting it enough to hand over bigger tasks?"*
3. *"What is one recurring task on your plate this week that we could use as a real test bed?"*

---

## Step 3: Deliver the "Blocker Mirror" (How to Present Findings)

Never present your findings as a grade, score, or level number. Structure your feedback in three short parts:

1. **What You're Already Doing Well (1–2 bullets):**
   * Cite specific evidence from their setup or prompts (e.g., *"You already separate planning from execution"* or *"You keep reusable project context in structured files"*).
2. **The #1 Blocker Holding You Back Right Now:**
   * Describe the bottleneck in plain human terms and name which ICTV letter (`I`, `C`, `T`, or `V`) is underneath it.
   * *Beginner example:* *"Right now, your biggest time sink is **Verification (V) & Context (C)**: you ask for a draft in one sentence and then spend 4 rounds steering the tone and facts afterward."*
   * *Advanced example:* *"You already have strong context and skills (`I` and `C`), so your bottleneck has shifted to **Verification at scale (V)**: your agents self-check in the same context they generate in, which risks rubber-stamping subtle errors or 'stowaway' citations."*
3. **One Practice Experiment for This Week:**
   * Propose **one** concrete, low-friction practice they can test on a real task today (taking no more than 5–10 minutes to set up), and save it to `ictv-coach/profile.md` and `ictv-coach/active-focus.md`.
