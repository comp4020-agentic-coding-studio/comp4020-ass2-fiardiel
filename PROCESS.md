# Process overview

## What I built

SLOP1467 _Continuity Engineering_ is an undergraduate elective at Slop University. It teaches students to create and maintain a shared fictional universe through retcons and soft reboots. It covers one named technique each week for twelve weeks, with no previous study required.

A good continuity makes people more invested in the story. Once a fictional universe feels connected, you stop just watching films and start asking how things will play out, who might die, and who is strongest. Those questions only make sense because everything shares the same universe and rules.

## How I got here

### Deciding what a good course is

A course is bad when you do not know what you are learning or why, or when an assignment tests something the class never taught. A good course tests what you learned, gives you a reason for taking it, and teaches something clear and distinct each week.

The agent wanted to go straight into choosing a topic and treated the example courses as optional. I sent it back because it needed to understand what makes a good course before choosing a topic. I asked it to research good courses using my ANU experience and the examples in the brief ([`ea9ff25`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-fiardiel/commit/ea9ff25)).

Calling Bullshit showed me how one idea could carry through a semester. How to Make (Almost) Anything showed me how each week can have one concrete thing, while CS 007 showed me that a course does not need much padding, just the space, rules, and work.

Biggs's constructive alignment explains my complaint about being tested on things that were never taught. Wiggins and McTighe's _Understanding by Design_ says to work backwards from outcomes to assessment to weekly content. That matters because filling the weeks is exactly what an AI agent tends to do by default. You ask for twelve weeks and get twelve chunks that each look fine but add up to nothing.

### What went into the harness

I turned my position on good courses into rules in my harness ([`628974f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-fiardiel/commit/628974f)). Each assessment can only test things taught in class. Every page needs its learning outcomes. Each week must have one named technique with no duplicates.

I then turned those rules into tests in `spec/` ([`0d7683d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-fiardiel/commit/0d7683d)), so I could avoid small human errors and automatically check whether my logic contradicts itself.

I originally had participation worth 10% of the marks. Students could just turn up and do very little, so I replaced it with a briefing where each student presents once between weeks 6 and 11. This gives students something thought-provoking to do based on what they learned.

The drafted brief then asked too much for a 10% task. I made it simpler ([`9b7611e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-fiardiel/commit/9b7611e)): students explain why an alternative was possible rather than proving it was, marked against the seminars instead of outside research, and I cut the line calling one part "marked hardest".

### What I deliberately left out

I left out the DCU's launch because it does not fit my week 1 categories of contradiction, orphan, and drift. Including it would have meant creating a fourth category just to keep a good example, so I cut it.

I also added a `spec/` check that fails the build if a page contains slop words like "delve", "tapestry", or "journey" ([`6d7f024`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-fiardiel/commit/6d7f024)). It only catches AI clichés, not whether the writing is good. Judging the writing is still my job.

### How I knew a page was right

I judged each page on four things. It needed a specific example with a film or episode and its year, fit only in that week, and sound like a real course. Most importantly, I needed to know the material well enough to catch wrong claims, including MCU facts that an automated check or marker might miss.
