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
   * Tasks done 3+ times that don't yet have a `handovers/<task>-handover.md` file.

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
3. **Generate the Interactive HTML Reflection:** Create `ictv-coach/check-ins/YYYY-WXX.html` using [weekly-reflection-ui-template.html](../resources/weekly-reflection-ui-template.html), populating the `#ictv-weekly-data` JSON payload with the week's real misses, committed practice, and candidate experiments for next week. If the environment supports Generative UI artifacts, render it directly for the user. Misses the user adds on the page are saved in the check-in under **To Append to `misses-ledger.md`**: copy them into the ledger, and make sure each one has a new check.
4. **Set Next Week's Single Focus:** Update `ictv-coach/active-focus.md` with **one** clear, low-friction experiment for the coming week. Never pile on more than two active commitments at once.

---

## Pruning: Keep Checks and Suggestions Alive

A miss should be a learning experience that compounds. It only compounds if the list of checks and suggestions stays short enough that the user still reads it. Prune at every check-in.

### Prune the Checks
* **Tighten before you add.** When a miss is logged, first ask whether an existing check should have caught it. If so, sharpen that check instead of adding a new one.
* **Merge or drop.** If a handover has grown past about five checks, look for two that guard the same thing and merge them. A check that has passed on every run for a long time and guards nothing costly can be dropped. Say what you dropped and why, and note it in the check-in.
* **Never drop silently.** A check that guards something the user signs their name under stays until the user agrees to remove it.

### Prune the Suggestions (The Rule of Three)
* **At most three candidates.** Never offer more than three possible next steps, and commit to one.
* **Two skips, then change the way.** Read the last two check-ins. If the same practice was offered and left untested both times, do not offer it a third time. Retire it without blame and note it under *How I Learn Best* in `profile.md`.
* **Same goal, different way of learning.** An untested practice usually means the method did not fit, not that the person failed. People learn in different ways, as in any sport. Offer the same goal through another way:
  1. **Do it:** try the practice on a real task (the default).
  2. **Watch it:** the coach applies the practice to one of the user's own past tasks and shows the before and after.
  3. **Compare it:** two short versions side by side, with and without the practice, and the user picks.
  4. **Spot it:** a two-minute exercise where the coach plants one flaw and the user finds it.
  5. **Have it done:** the coach quietly applies the practice for a week and shows what it caught.
* **Record what works.** When a way of learning lands, note it in `profile.md` and lead with it next time.
* **Drop stale items.** A blocker in `active-focus.md` that no longer matches how the user works is removed, not carried forward.

---

## Step 4: Scheduling a Recurring Weekly Check-in

If the user does not yet have a recurring check-in scheduled, offer to set one up:

* **In Antigravity:**
  * Offer to set up a weekly scheduled automation (using the `automation` skill or suggesting the `/schedule` command) for their preferred time (e.g., Friday afternoon to wrap up the week, or Monday morning to set the week's focus).
  * Recommended self-contained prompt for the scheduled automation:
    > `"Use the ictv-coach skill to run my weekly ICTV check-in. Read my ictv-coach/ folder and recent session history from the past 7 days, summarize what worked and which ICTV letter caused the most friction, and guide me through a 5-minute check-in."`
* **In Claude / ChatGPT / Other Tools:**
  * Suggest adding a recurring 10-minute Friday calendar block with a direct link to their ICTV Coach project/folder.
