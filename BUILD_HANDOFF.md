# Copy-ready prompts for other Codex chats — team discussion draft

## Which model to use

Use **GPT-6.1 Sol at medium reasoning** for a coding or documentation chat, if it is available in your Codex setup. Give it a single concrete deliverable and ask it to verify the running app before pushing. Use a higher reasoning setting only for a difficult planner rewrite or integration. The shipped browser app runs a deterministic rules engine and **does not call a model at runtime**. Model availability and pricing can vary; check the [official model catalog](https://developers.openai.com/api/docs/models) before choosing an API model for a later extension.

The three prompts below are drafts to discuss with the team. They are grounded in the verified standalone app, not a promise to add a database or live AI inside the two-hour build.

## Prompt A — continue a focused demo change

Paste into a Codex chat using GPT-6.1 Sol at medium reasoning:

```text
Work in https://github.com/akshaykamra92/oracle26ai-hackathon. Read README.md, TEAM_BRIEF.md, WORKFORCE_MODEL.md, planner.js, app.js, index.html, styles.css, and tests/planner.test.js before editing. The live demo is https://akshaykamra92.github.io/oracle26ai-hackathon/.

Can We Staff It? is a standalone synthetic workforce expansion planner. It has a licensed RN family and a nonlicensed service family. The default Tampa plan currently covers 7 of 8 RN positions, blocks four proposals, uses one local charge RN backfill, and leaves one headcount gap. Orlando service covers 6 of 6 with its senior/lead mix. Phoenix service covers 6 of 6 headcount but misses senior/lead minima at the proposed opening; its first sampled conditionally ready checkpoint is +24 months. Career promotions do not create headcount or RN licensure.

Your single task: [INSERT ONE CONCRETE CHANGE].

Keep index.html directly runnable with no required backend, database, API key, or build step. Use fictional staff only. Keep role-level, source-minimum, geography, destination-license, and backfill-chain checks visible. A move from 7 people to a floor of 6 is allowed. Do not make a future promotion automatic or count a senior person as two total positions. If your change alters scenario results, recalculate them and update every affected claim in README.md, TEAM_BRIEF.md, SUBMISSION_DRAFT.md, and RUBRIC_MAP.md. Run node --test tests/planner.test.js, check JavaScript syntax, and verify the changed scenario in a browser. Commit and push only a verified milestone without force-pushing. Report the commit and any remaining limitation.
```

## Prompt B — final submission copy and demo script

Paste into a Codex chat using GPT-6.1 Sol at medium reasoning after the team settles the pitch:

```text
Read the actual running app at https://akshaykamra92.github.io/oracle26ai-hackathon/ and its source at https://github.com/akshaykamra92/oracle26ai-hackathon/. Read TEAM_BRIEF.md, RUBRIC_MAP.md, README.md, and SUBMISSION_DRAFT.md. Verify the three visible scenario results before writing. Do not rely on stale numbers in prose if the app differs.

Write the four portal answers: What did you build? Who has this problem? How does it solve it? How did you build it? Lead with the broadly useful expansion question, then name the first user as a multi-facility health-system workforce planner. Use Tampa's direct move, charge backfill, and honest gap as the primary demo proof. Use Orlando to show a nonlicensed family, and Phoenix to show conditional career readiness. Explain that early-career means job code and time in role, not employee age. Do not claim customer interviews, savings, runtime AI, Oracle integration, clinical standards, or a production database unless separately verified.

Provide a 60-second spoken demo script, a 30-second fallback, and a short one-line title. Keep the optional verification JSON and any unknown event fields as placeholders; do not invent them. Update SUBMISSION_DRAFT.md, then show the exact final text for team review. Do not submit the portal form without a separate user instruction.
```

## Prompt C — optional AI-assisted intake, only if time remains

Paste into a Codex chat using GPT-6.1 Sol at high reasoning **only if** the team chooses to add a runtime AI feature and has a secure endpoint/key arrangement:

```text
The repository https://github.com/akshaykamra92/oracle26ai-hackathon already has a working standalone planner in planner.js. Design and implement the smallest optional AI-assisted intake: a planner types a plain-language opening request, an AI service drafts structured demand fields (total, senior, lead, specialty, destination), and a human reviews and edits those fields before the deterministic planner runs.

First inspect the current app and confirm the available backend/hosting and credential storage. Never put an API key in client-side JavaScript, a static site, git, or example output. If no secure runtime is available, write a concise implementation plan and keep the existing demo working; do not fake an AI call. Validate model output against an explicit schema and against the hard demand rules. The model may draft and explain, but it cannot override coverage, mobility, or licensure checks. Use only synthetic prompts and data. Test the normal path and malformed output, verify the browser flow, and update the technology disclosure accurately. Push only after verification.
```

## Prompt D — optional Oracle extension, only if the event requires it

```text
The standalone demo at https://github.com/akshaykamra92/oracle26ai-hackathon works without a database. First verify a saved SQLcl MCP connection, Oracle version, privileges, and property-graph support. Do not request or commit credentials. Use only fictional data and prefix new objects WT_. Add a replayable sql/ directory and one tested GRAPH_TABLE query that finds employee-to-unit and employee-to-skill relationships. Keep the browser demo as a working fallback.

Do not assume CREATE ASSERTION can enforce aggregate staffing ratios or time-dependent license rules. Research the supported mechanism in the connected instance, implement only what can be tested there, and describe unverified ideas as future work. Commit and push only verified changes without force-pushing.
```
