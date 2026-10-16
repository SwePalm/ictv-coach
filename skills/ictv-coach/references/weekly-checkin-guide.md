# Weekly Check-in & Retrospective Protocol

A 10-minute weekly rhythm turns ICTV from an interesting idea into a durable working habit. Use this protocol when the user asks for a weekly check-in or when triggered by a scheduled weekly automation.

---

## Step 1: Gather the Week's Evidence

Before asking the user how their week went, inspect:
1. `ictv-coach/active-focus.md` — What was the single practice or blocker they committed to testing this week?
2. `ictv-coach/misses-ledger.md` — What misses were logged since the last check-in, and which letters (`[I]`, `[C]`, `[T]`, `[V]`) appeared most often?
3. `ictv-coach/handovers/` — Were any new task handovers created or refined?
4. **Recent Session History (if accessible):** Scan conversations from the last 7 days for signs of:
   * Long back-and-forth correction threads (untagged misses)
   * Repeated context pasting (candidates for the **3x Paste Rule**)
   * Tasks done 3+ times that don't yet have a `handovers/<task>.md` file.

---

## Step 2: Run the 3-Question Retrospective

Keep the check-in conversational and brief (aim for 5–10 minutes total):

1. **The Commitment Check:**
   * *"Last time, we focused on **[active practice from `active-focus.md`]**. Did you get a chance to try it on a real task this week, and how did it feel?"*
2. **The Rework & Trust Check (Practical Trust Metrics):**
   * Ask (or infer from history):
     * **Direct-edit vs. Loop ratio:** *"When an AI draft missed the mark this week, did you catch yourself rewriting it by hand, or did we tag the miss to `I`, `C`, `T`, or `V`?"*
     * **Check Report utility:** *"On tasks where you used a Check Report first, did it save you from reading a flawed draft—or did any issue slip past the checks?"*
3. **The Repeated Friction Scan:**
   * *"What was the single most annoying or time-consuming moment you had with AI this week?"* (If you spotted one in their session transcripts, mention it directly: *"I noticed on Wednesday you had to re-explain X three times..."*).

---

## Step 3: Update the Coaching Folder & Generate Interactive Reflection

1. **Log Any Unrecorded Misses:** If the user mentions a failure from the week that wasn't logged yet, add it to `ictv-coach/misses-ledger.md` tagged to `[I]`, `[C]`, `[T]`, or `[V]`.
2. **Write the Weekly Check-in Note:** Create `ictv-coach/check-ins/YYYY-WXX.md` using [weekly-checkin-template.md](../resources/weekly-checkin-template.md).
3. **Generate the Interactive HTML Reflection:** Create `ictv-coach/check-ins/YYYY-WXX.html` using [weekly-reflection-ui-template.html](../resources/weekly-reflection-ui-template.html), populating the `#ictv-weekly-data` JSON payload with the week's real misses, committed practice, and candidate experiments for next week. If the environment supports Generative UI artifacts, render it directly for the user.
4. **Set Next Week's Single Focus:** Update `ictv-coach/active-focus.md` with **one** clear, low-friction experiment for the coming week. Never pile on more than two active commitments at once.

---

## Step 4: Scheduling a Recurring Weekly Check-in

If the user does not yet have a recurring check-in scheduled, offer to set one up:

* **In Antigravity:**
  * Offer to set up a weekly scheduled automation (using the `automation` skill or suggesting the `/schedule` command) for their preferred time (e.g., Friday afternoon to wrap up the week, or Monday morning to set the week's focus).
  * Recommended self-contained prompt for the scheduled automation:
    > `"Use the ictv-coach skill to run my weekly ICTV check-in. Read my ictv-coach/ folder and recent session history from the past 7 days, summarize what worked and which ICTV letter caused the most friction, and guide me through a 5-minute check-in."`
* **In Claude / ChatGPT / Other Tools:**
  * Suggest adding a recurring 10-minute Friday calendar block with a direct link to their ICTV Coach project/folder.
