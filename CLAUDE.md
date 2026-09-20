# SLOP1467 Continuity Engineering

This repo is the website for one Slop University course: **Continuity
Engineering**, an intro undergraduate elective on building and maintaining a
shared fictional universe. The site is the whole course. There is no separate
curriculum document, so every decision about the course lands in a page here.

The brief and spec are on the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/).
The platform is fixed and documented in `README.md`. Read both before you plan
or build.

The agreed plan and build progress are in `docs/plan.md`. Tick its boxes as
slices land, and add to its moments log whenever the student rejects or
changes something.

## The course, in one line

Every page answers to one essential question:

> **What does a long-running story owe the people who remember it?**

Each week comes at that question through one continuity technique, taught from
three case studies: the Marvel Cinematic Universe, the CW Arrowverse and LEGO
Ninjago. They are the course's primary texts. Cite them the way an engineering
course cites a bridge collapse. Never explain what they are.

## How this course is designed

These rules come from the position in `PROCESS.md` on what makes a good course.
They are why the course holds together, so don't trade them for speed.

1. **Design backward.** The order is outcomes, then assessments, then sessions.
   Don't write a session until you know which learning outcome it serves and
   which assessment will test it.
2. **One named technique per session.** A session teaches a thing with a name
   (the retcon, the soft reboot, the crossover event), not a theme. No two
   sessions teach the same technique. If a week's title could swap with
   another's, one of them is wrong.
3. **Ground every technique in a specific beat.** Name the film, episode or
   season, and what happened in it. "Franchises often contradict themselves" is
   filler. The Mandarin reveal in _Iron Man 3_ is evidence.
4. **Record the alignment in frontmatter.** Every session and assessment carries
   `outcomes:` (the outcome numbers it serves), and every session is `related:`
   to at least one assessment that tests it. An outcome nothing assesses, or a
   week nothing assesses, is a design error to fix, not a gap to paper over.
5. **No coverage for its own sake.** If a paragraph could sit unchanged in
   another week, cut it. Don't pad a page to look substantial. A short page
   that says one true thing beats a long one that says five generic ones.

## Voice

- Deadpan and institutional. The course takes itself completely seriously and
  never winks. The joke is the seriousness.
- Plain register: short sentences, concrete nouns, no academese. Say "students
  will fix a retcon", not "learners will engage with retroactive continuity
  paradigms".
- Australian spelling (ANU house style): _organise_, _colour_, _centre_.
- None of these, ever: "delve", "tapestry", "landscape", "in today's",
  "it's important to note", "Moreover,", "Furthermore,", "a testament to",
  "navigate the complexities", "rich", "journey".
- The banned words above are the one part of voice a check can hold:
  `spec/course-promises.test.ts` fails the build on any of them. That check is
  a tripwire for the most obvious tics, not a verdict on the prose — it passing
  means nothing worse than "no clichés", never "this page is good". Everything
  else about voice is judgement. Read each page as a prospective student before
  you call it done.

## How to work in here

- Keep the dev server running (`pnpm dev`, served at
  `http://localhost:4321/comp4020-ass2-fiardiel/`). The bare `:4321` is a 404.
- Open the page in a browser and look at it at both marking viewports. The
  rendered page is the truth; your mental model of it isn't.
- Run `pnpm check` before you commit. When a check fails, read its output
  before changing anything. Never commit a red state (except a new spec test
  that starts red on purpose).
- `pnpm check` does **not** run `pnpm check:evidence`. Run it yourself before
  shipping.
- Commit each slice of work as you finish it (one session, one assessment, one
  rule). The commit history is the process evidence, and one giant commit at
  the end says nothing.

## Facts about this platform that are easy to get wrong

- **Fixed, don't touch:** the Slop branding and palette (`src/site-config.ts`
  identity, `astro.config.ts`), the four collections (`sessions`,
  `assessments`, `lectures`, `people`) and their keys, and the generated API.
  Adding is fine: new pages, components, collections.
- **The course record lives in `src/course-config.ts` only.** The code, title,
  dates, description and tags feed the home page, nav and API. Never restate
  them in prose, where they'll drift.
- **The code is SLOP1467.** `467` was allocated to this repo; `1` is the level.
- **Collection key = file = URL = API ref.**
  `src/content/sessions/03-the-retcon.md` is `/sessions/03-the-retcon/` and the
  ref `sessions/03-the-retcon`. Renaming one means renaming every `related:`
  that points at it. A dangling ref fails the build, which is the point.
- **Base path:** a hand-written `href="/sessions/"` in an `.astro` file skips
  the base and 404s on the live site. Markdown links and theme components are
  rewritten for you.
- **Dates:** every session, lecture and due date must fall between
  `startDate` and `endDate` in `course-config.ts`
  (`spec/data-integrity.test.ts`). Change them together.
- **`outcomes:`** is declared in `src/content.config.ts`: a list of numbers
  into `src/learning-outcomes.ts`, so an outcome that doesn't exist fails the
  build. Pages render the outcome text from there. Never copy it into prose.
- **Other custom frontmatter keys** pass validation and land in that node's
  `meta` in the generated API. The reserved keys are `title`, `description`,
  `tags`, `related`, `links`, `spec` and `published`.
- **Starter content:** every placeholder carries a `STARTER_CONTENT` comment.
  Remove the comment in the same commit that replaces the fragment.
  `check:evidence` fails on any left over, and on the unchanged
  `card.png` / `hero-home.avif`.
- **Decks** are `src/decks/*.deck.mdx`, built to `/decks/<name>/`, linked from
  their lecture with `slides: /decks/<name>/`. Nothing checks whether a slide
  fits, so look at it at both viewports.
