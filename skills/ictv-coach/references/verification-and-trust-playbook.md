# Verification & Trust Playbook (`V` + The Loop)

Since the launch of conversational AI, users have been told *"Don't trust AI—always check everything."* In practice, that advice breaks down in two ways:
1. **The Bottleneck:** You read every word yourself, which takes almost as long as doing the work from scratch.
2. **Criteria Drift:** Because AI prose is fluent and confident, your attention naturally drops over time (Lee et al., CHI 2025; Shankar et al., 2024). You start skimming and rubber-stamping subtle mistakes.

The ICTV answer is not blind trust and not exhausting manual inspection. It is **building a verification loop you can trust**.

---

## 1. The Two Questions: Substitution vs. Signature

Help the user separate two very different questions when delegating work to AI:
* **The Substitution Question:** *"Is this draft roughly as good as if I had typed it myself?"* (Answered by clear instructions and basic checks).
* **The Signature Question:** *"Can I put my name under this and stand behind its consequences?"* (Answered by a visible verification record, explicit assumptions, and knowing what was *not* checked).

An AI tool can take over **Responsibility (`R`)** for executing a task, but **Accountability (`A`)** always stays with the human whose name is on the work.

---

## 2. Check Report Before Result (Cognitive Forcing Function)

Research on human-AI decision making (Buçinca et al., CSCW 2021) shows that when people see a polished AI answer first, they anchor on it—missing roughly 3 out of 4 errors. Deciding on criteria and reading a structured **Check Report** *before* seeing the prose nearly triples error detection.

Whenever coaching a user on a deliverable, structure the output so the **Check Report** comes first:

```markdown
### Check Report (Read Before Draft)
- [x] **V1 (Source grounding):** All 3 claims reference passages in `q3-notes.md`.
- [x] **V2 (Audience & tone):** Written for business owners; zero unexplained technical acronyms.
- [x] **V3 (Length & format):** 250 words (limit: 300), structured as 3 decision bullets.
- [ ] **V4 (Competitor pricing comparison):** FAILED — pricing table was not in the folder.

**Bracketed Assumptions:**
- `[Assumption: Treated Q3 figures as final rather than preliminary.]`

**Not Checked:**
- Did not verify whether the legal team has approved the new partner name.
```

### Why the `"Not Checked"` Line Is Mandatory
An AI that claims 100% pass rates makes humans lazy. Requiring the AI to state **what it could not verify** turns the human's review from *"read everything hoping to spot a bug"* into *"inspect the exact seam where the agent stopped."*

---

## 3. Defending Against "The Stowaway"

**The Stowaway** is a fact the model remembers from its training data (often true!) that it attributes to a source document or URL that does not actually contain it.
* **Why it's dangerous:** Because the statement sounds plausible and true, human reviewers nod past it—until someone checks the cited source and discovers it was never there.
* **Mechanical Defense (Never "Be Careful"):**
  1. If a source file or URL was not actually read/fetched in the session, it may not be cited.
  2. Direct quotes and numerical claims must be re-verified against the source text before delivery.
  3. If a fact comes from general knowledge rather than the provided context, label it explicitly as `[General knowledge — not in source docs]`.

---

## 4. The Loop: Tagging Every Miss to `[I]`, `[C]`, `[T]`, or `[V]`

When a user says *"This output isn't right"*, the default human reflex is to open the document and rewrite it. **That is a dead end**—the AI setup learns nothing, and the next run will fail the same way.

Instead, walk the user through a 60-second **Miss Tagging Loop**:

| Tag | Question to Ask | Fix Applied to the System |
| :--- | :--- | :--- |
| **`[V]` Verification** | *Did our checks pass even though the output was bad?* | Add a new tickable check to the handover rubric so this flaw is caught before delivery next time. |
| **`[I]` Instructions** | *Did the agent misunderstand the goal, role, or boundaries?* | Tighten the instruction or add a bullet under **"Not acceptable"** in the handover. |
| **`[C]` Context** | *Did the agent have to guess facts, tone, or examples you know in your head?* | Add the missing background or example to the owned context folder (`ictv-coach/` or project docs). |
| **`[T]` Tools** | *Did the agent guess something a tool or script should have looked up or calculated?* | Connect the read-only source, or build a small deterministic check/script. |

### Golden Rule of Loop Tuning
**Change one thing at a time, and keep earlier checks in place.** That way, your verification list grows from real failures you actually experienced—not a speculative 50-item checklist invented in advance.
