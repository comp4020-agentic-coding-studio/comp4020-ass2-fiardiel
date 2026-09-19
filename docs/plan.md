# Plan: SLOP1467 Continuity Engineering

The course plan agreed before building (19 September 2026). Once a slice is
built, **the content in `src/` is the truth** and this file only tracks
progress. Don't keep two copies of a decision in sync. Update the page, then
tick the box here.

Due **noon Monday 21 September 2026**. Aim to be live by about 10:00. The week 7
retro crit that afternoon presents from `PROCESS.md`.

## To resume in a new session

Start `claude` **from this repo's root**, so the session runs on course
credits from `.claude/settings.local.json`. Then say:

> Read docs/plan.md and continue from the first unticked step.

## Agreed decisions

- **Course:** SLOP1467 _Continuity Engineering_, intro undergraduate (level 1,
  `467` allocated). A full title or subtitle is still to be set in step 1.
- **Essential question:** _What does a long-running story owe the people who
  remember it?_
- **Case studies:** MCU, CW Arrowverse, LEGO Ninjago. Voice rules are in
  `CLAUDE.md`.
- **Session label:** Seminars (`sessionLabels` in `src/site-config.ts`).
- **Teaching period:** keep the starter's (22 Feb – 28 May 2027) unless there's
  a reason to change it.

### Learning outcomes

By the end, a student can:

1. **Diagnose** a continuity failure in a shared universe: locate it, classify
   it, and trace the production decision that caused it.
2. **Evaluate** a franchise's continuity strategy against the alternatives it
   passed over.
3. **Design** a repair (retcon, reboot, multiverse or recast) and argue what it
   costs.
4. **Build** a continuity bible that lets a stranger write into an original
   universe without contradicting it.

### Assessments (sum to 100%)

| Assessment | Weight | Outcomes | Due |
|---|---|---|---|
| Continuity Audit | 25% | 1 | week 5 |
| Continuity Briefing (seminar presentation, rostered weeks 5–11) | 10% | 2 | week 11 |
| Retcon Proposal | 30% | 3, 1 | week 9 |
| Capstone: Continuity Bible | 35% | 4, 2, 3 | week 12 |

The Briefing replaced a 10% participation mark, because participation tests no
outcome (constructive alignment).

### Twelve weeks (one named technique each)

| Wk | Seminar | Outcomes | Assessed by |
|---|---|---|---|
| 1 | Orientation: what a continuity is | 1 | Audit |
| 2 | The Bible | 4 | Capstone |
| 3 | The Retcon | 1, 3 | Audit, Retcon Proposal |
| 4 | The Soft Reboot | 3 | Retcon Proposal |
| 5 | The Crossover Event (**the deck lecture**) | 2 | Briefing |
| 6 | Spin-off Drift | 1, 4 | Capstone |
| 7 | The Multiverse Solution | 3 | Retcon Proposal |
| 8 | Recasting | 3 | Retcon Proposal |
| 9 | Winding Down | 2 | Briefing |
| 10 | Paracanon | 4 | Capstone |
| 11 | Franchise Fatigue | 2 | Briefing, Capstone |
| 12 | Capstone studio | 4 | Capstone |

**Timing rule:** an assessment only tests weeks taught before its due date. The
mapping above respects it, so keep it that way if weeks move.

## Build order (backward design; commit after each)

- [x] Clone the repo, get the baseline `pnpm check` green
- [x] Research: the three example courses, Biggs, Wiggins & McTighe
- [x] `CLAUDE.md` harness
- [x] Course credits scoped to this repo
- [ ] 1. Course record (`src/course-config.ts`) and the outcomes, shown on the
      home page
- [ ] 2. The four assessments (`src/content/assessments/`), with `outcomes:`
      and a marking model each
- [ ] 3. The twelve seminars (`src/content/sessions/`), with `outcomes:` and
      `related:` to the assessments that test them
- [ ] 4. Lectures, plus the real deck for week 5, linked with `slides:`
- [ ] 5. People (convenor and tutor), home page and policies page
- [ ] 6. Artwork: hero, share card and the two people photos (all four are
      flagged by `check:evidence`)
- [ ] 7. `spec/` checks: agree them with the student. Candidates: every outcome
      is taught and assessed; every seminar is tested by an assessment due
      after it; assessment weights sum to 100; twelve weeks; the deck is linked
      from its lecture.
- [ ] 8. The student reads the site as a prospective student at 1920×1080 and
      390×844, and fixes anything generic
- [ ] 9. The student rewrites `PROCESS.md` in their own words, with citations
- [ ] 10. `/comp4020:preflight`, then `/comp4020:ship`, live before noon Monday

## Notes for the agent

- `PROCESS.md` is an **agent draft** and deliberately uncommitted. Don't commit
  it; the student rewrites it. Its `TEMPLATE:` marker keeps
  `check:evidence` red until they do.
- Every seminar and assessment is drafted by the agent and **approved by the
  student** before its commit.

## Moments log

Raw material for `PROCESS.md`. Whenever the student rejects, changes or
redirects something, add one line: the date, what was proposed, what they
changed and why, and the prompt quoted where it matters. Cite the commit once
there is one.

- 2026-09-19: the first assessment draft had 10% for participation. Replaced
  with the Continuity Briefing after the research into constructive alignment
  showed participation tests no outcome.
- 2026-09-19: the agent went straight to picking a topic and told the student
  the example courses were optional background. The student questioned that,
  and the brief turned out to require it ("a position on what a good course
  is"). The student then asked for a second pass, which brought in Biggs and
  _Understanding by Design_ and gave the "coverage sin" framing.
