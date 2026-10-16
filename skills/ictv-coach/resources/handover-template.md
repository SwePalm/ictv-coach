# Task Handover: [Task Name]

*Accountable Owner (Signature):* [Your Name]  
*Last Updated:* YYYY-MM-DD

---

## I — Instructions (What Is the Job?)
- **Objective:** [One clear sentence stating what this job accomplishes and why.]
- **Done Looks Like:** [How would a colleague know this deliverable is ready to use?]
- **Not Acceptable (Hard Boundaries):**
  - [e.g., Do not invent facts, quotes, or sources not present in the input files.]
  - [e.g., Do not use hype words or unexplained technical jargon.]
  - [e.g., Do not exceed X words/pages.]

## C — Context (What Does It Need to Know?)
- **Input Sources (Where to Read From):**
  - [File path, folder, or pasted input]
- **Standing Background:**
  - [Link to `ictv-coach/profile.md` or domain context file]
- **Output Specification (How Results Must Arrive):**
  - **Format & Structure:** [e.g., Markdown file saved to `drafts/`, starting with the Check Report]
  - **Audience & Tone:** [Who will read this and what do they care about?]

## T — Tools & Access Boundaries (What Can It Touch?)
- **Context Plumbing (Read-Only):** [Allowed files, folders, search, or MCP read tools]
- **Staged Actions (Allowed Writes):** [e.g., Create or update draft files in `drafts/` only]
- **Prohibited Actions:** [e.g., Never overwrite source files; never send or publish externally]
- **The Handbrake (Stop & Ask Condition):**
  - *Stop immediately and ask me before proceeding if:* [e.g., key source files are missing, instructions conflict, or more than 2 assumptions are required.]

## V — Verification (Check Report Before Result)
Before presenting or saving the final deliverable, run these checks and print the **Check Report** at the top of the response:

- [ ] **V1 (Completeness):** [Specific check 1]
- [ ] **V2 (Source Grounding / Stowaway Check):** Every cited fact or quote was verified directly in the input sources; zero unverified citations.
- [ ] **V3 (Negative Constraints):** Zero items from the "Not Acceptable" list appear in the draft.
- [ ] **V4 (Format & Audience):** Matches the Output Specification and length limit.
- [ ] **V5 (Assumptions & Unknowns):** All assumptions are marked in `[Assumption: ...]` brackets, and a mandatory **`Not checked:`** line lists anything that could not be verified.

---

## Trust & Review Plan
- **First 3 Runs:** Read the Check Report first, then spot-check the sections flagged under `Assumptions` and `Not checked`.
- **When to Stop Trust & Re-Open This Handover:** If a check passes in the Check Report but fails on human spot-check (log the miss in `ictv-coach/misses-ledger.md`).
