import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The promises this course makes that the build can't check: the published
// assignment spec's checkable lines, the alignment between outcomes, seminars
// and assessments, and the design rules in CLAUDE.md. All read the built API.

interface ApiNode {
  id: string;
  type: string;
  title: string;
  meta: Record<string, unknown>;
}
interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
  edges: { from: string; to: string }[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const ofType = (type: string) => api.nodes.filter((n) => n.type === type);
const seminars = ofType("sessions");
const assessments = ofType("assessments");
const lectures = ofType("lectures");
const outcomesOf = (n: ApiNode) => n.meta.outcomes as number[];
const related = (id: string) =>
  new Set(api.edges.flatMap((e) => (e.from === id ? [e.to] : e.to === id ? [e.from] : [])));
// Seminar dates are date-only; an assessment due that day at noon still counts
// as after the seminar only if it is due on a later day.
const day = (value: unknown) => String(value).slice(0, 10);
const OUTCOMES = [1, 2, 3, 4];

describe("the published spec", () => {
  it("keeps the allocated code", () => {
    expect(api.course.code).toBe("SLOP1467");
  });

  it("runs across twelve dated teaching weeks, one seminar each", () => {
    const weeks = seminars.map((s) => s.meta.week).sort((a, b) => Number(a) - Number(b));
    expect(weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (const s of seminars) expect(day(s.meta.date), s.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("has a lecture whose slides link to a built deck", () => {
    const withDeck = lectures.filter((l) => typeof l.meta.slides === "string");
    expect(withDeck.length).toBeGreaterThan(0);
    for (const l of withDeck) {
      const deck = resolve("dist", String(l.meta.slides).replace(/^\//, ""), "index.html");
      expect(existsSync(deck), `${l.id} links to a deck that wasn't built`).toBe(true);
    }
  });

  it("weights assessment to 100%", () => {
    expect(assessments.reduce((sum, a) => sum + Number(a.meta.weight), 0)).toBe(100);
  });
});

describe("alignment", () => {
  it("teaches and assesses every outcome", () => {
    for (const n of OUTCOMES) {
      expect(seminars.some((s) => outcomesOf(s).includes(n)), `outcome ${n} is never taught`).toBe(true);
      expect(assessments.some((a) => outcomesOf(a).includes(n)), `outcome ${n} is never assessed`).toBe(true);
    }
  });

  it("tests every outcome a seminar serves, after the seminar", () => {
    for (const s of seminars) {
      const tests = assessments.filter((a) => related(s.id).has(a.id));
      expect(tests.length, `${s.id} is related to no assessment`).toBeGreaterThan(0);
      for (const n of outcomesOf(s)) {
        const later = tests.filter((a) => outcomesOf(a).includes(n) && day(a.meta.due) >= day(s.meta.date));
        expect(later.length, `${s.id}: outcome ${n} is not tested by a related assessment due after it`).toBeGreaterThan(0);
      }
    }
  });
});

describe("design rules", () => {
  it("gives one lecture per outcome, in the week it is first taught", () => {
    for (const n of OUTCOMES) {
      const firstWeek = Math.min(...seminars.filter((s) => outcomesOf(s).includes(n)).map((s) => Number(s.meta.week)));
      const its = lectures.filter((l) => outcomesOf(l).includes(n));
      expect(its.length, `outcome ${n} should have exactly one lecture`).toBe(1);
      expect(Number(its[0].meta.week), `outcome ${n}'s lecture`).toBe(firstWeek);
    }
  });

  it("never teaches the same technique twice", () => {
    const titles = seminars.map((s) => s.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("schedules nothing in the teaching break", () => {
    const dated = [...seminars, ...lectures].map((n) => [n.id, day(n.meta.date)] as const);
    for (const a of assessments) dated.push([a.id, day(a.meta.due)] as const);
    for (const [id, d] of dated) {
      expect(d >= "2027-03-29" && d <= "2027-04-09", `${id} falls in the break`).toBe(false);
    }
  });
});

describe("voice", () => {
  const banned = [/\bdelve/i, /\btapestry\b/i, /\blandscape\b/i, /\bin today's\b/i, /\bit's important to note\b/i,
    /\bMoreover,/, /\bFurthermore,/, /\ba testament to\b/i, /\bnavigate the complexities\b/i, /\brich\b/i, /\bjourney\b/i];
  const files = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? files(p) : /\.(md|mdx|astro)$/.test(f) ? [p] : [];
    });

  it("uses none of the banned words", () => {
    for (const file of [...files("src/content"), ...files("src/pages"), ...files("src/decks")]) {
      const text = readFileSync(file, "utf8");
      for (const word of banned) expect(text, `${file} matches ${word}`).not.toMatch(word);
    }
  });
});
