# Project Brief: ICTV Coach (`ictv-coach`)

## Objective
Build an open-source, portable **ICTV Coach** (as both an Agent Skill and a standalone Chat Edition) that coaches knowledge workers and advanced practitioners to work better with their AI tools—moving from *"Don't trust AI"* to **building a verification loop they can trust**.

## Why This Exists
Conversations about **ICTV (Instructions, Context, Tools, Verification)** resonate strongly for two reasons:
1. **A single structure from first chat to multi-agent scale:** People want a practical mental model that helps beginners elevate everyday chat conversations *and* helps experienced users who hit a wall when scaling with autonomous agents.
2. **Turning "Don't trust AI" into earned trust:** Telling people not to trust AI either leads to reading every sentence manually (making the human the bottleneck) or passive rubber-stamping (*criteria drift*). Real value comes from **Verification (V)** driving a continuous loop back into **Instructions (I)**, **Context (C)**, and **Tools (T)**.

## Core Principles (Our Definition of Good)
1. **Start from Blockers, Not a Ladder:** Users do not want to study a 5-stage adoption table. They recognize the **blockers** they hit in real work. The coach diagnoses their blocker and prescribes a right-sized practice.
2. **Adaptive Coaching Depth:** A workshop or coach feels "too basic" if it gives beginner prompt tips to someone already building workflows. The coach must inspect how the user actually works (history, memory, workspace setup) and calibrate across three tiers:
   * *Tier 1:* Chat & Everyday Drafting
   * *Tier 2:* Repeatable Work & Owned Files
   * *Tier 3:* Advanced Agentic & Multi-Agent Scaling
3. **Own Your Context in a Folder:** The coach stores all durable coaching state in a visible, plain-Markdown folder (`ictv-coach/`) owned by the user—never locked inside proprietary chat history.
4. **The Loop Rule:** Whenever an AI output disappoints, the coach stops the user from merely rewriting the draft by hand. Instead, it **tags the miss** to `[I]`, `[C]`, `[T]`, or `[V]` and upgrades the underlying setup so the same failure does not repeat.
5. **Check Report Before Result:** Verification comes *before* reading the prose—acting as a cognitive forcing function with an explicit `"Not checked:"` boundary.

## What Is Not Acceptable
* Showing or lecturing the user on an abstract multi-level adoption ladder.
* Using unexplained developer jargon ("agent harness", "eval suite", "token embeddings") unless explicitly coaching a technical builder who uses those terms.
* Giving generic "write better prompts" advice when the real problem is missing context (`C`), unscoped tool access (`T`), or unwritten verification checks (`V`).
* Storing coaching state only in ephemeral chat turns without updating the user's `ictv-coach/` folder.
