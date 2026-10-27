# Project history and AI handoff

This is the durable context for continuing **Can We Staff It?** in another AI chat. It summarizes the product discussions, scope changes, accepted rules, submission iterations, and current state. It is a decision history, not a verbatim chat transcript. Read this first, then use the linked source-of-truth documents and code before changing the demo or making claims.

## Current project in one page

**Can We Staff It?** is a public, standalone workforce expansion planner. A central planner describes the role mix needed at a proposed location. The deterministic planner tests whether synthetic people can fill it while preserving total and senior/lead minimums at source sites, respecting job family, skill, geography or stated mobility, and (for RNs) valid authority in the destination state. It returns an auditable opening recommendation, a sequenced move/backfill plan, any remaining headcount or role-mix gap, and a conditional career readiness view.

- **First user hypothesis:** central workforce planner at a regional multi-site health system.
- **Buyer hypothesis:** system workforce or operations leader. Neither persona nor willingness to pay has been validated with customers.
- **First wedge:** a human-reviewed pre-approval check for one RN opening, including downstream source impact. Orlando and Phoenix demonstrate the same workflow for nonlicensed service staff.
- **Current app:** static HTML, CSS, and JavaScript on GitHub Pages, with fictional data and a deterministic in-browser rules engine. There is no runtime AI model, Oracle database, production HR integration, or live workforce data.
- **Current AI Judge result:** version 5, Run #3209, 91.7. It did not improve on version 4. On the last observed leaderboard snapshot (October 25, 2026), Neon Knights was #6; third place was 93.3. Rankings can change as other teams finish.
- **Best next product opportunity:** improve the planner's smallest workflow and product-fit evidence; the judge repeatedly left Solution Fit & Product Design at 75/100 and asked for a clearer smallest wedge. Version 5 led with that wedge but the score remained unchanged, so copy changes alone did not move the result.

## How the idea changed

### 1. Original proposal: an Oracle-backed staffing agent

The initial supplied problem brief proposed a solo, roughly 90-minute Oracle AI Database 26ai build. The ambitious plan called for a plain-English staffing request, synthetic multi-hospital workforce data, Oracle property graphs for candidate and career searches, database-enforced staffing and licensure rules, and an agent that would recover after the database rejected an unsafe plan. It also proposed roughly 1,200 synthetic employees, multiple states, detailed skills/licenses, replayable SQL, and a career pipeline. The headline was that an unsafe transfer would fail at the database and the agent would explain and correct it.

That proposal was useful as the problem source and long-term technical direction. It was too broad for the actual two-hour team hackathon and for the demo the team could verify. The original phase plan's database, graph, assertion, and Oracle claims must not be described as implemented. See the original pasted brief in the project conversation; the current authoritative scope is the shipped code and this repository's docs.

### 2. Hackathon constraints changed the implementation plan

The contestant clarified that the event allowed building any app in about two hours, that they were open to ideas, and that a standalone HTML demo with mock data was acceptable. A formal database was unnecessary under the time limit. The team wanted a widely implementable problem and asked how it mapped to the AI Judge rubric before finalizing the case statement.

Decision: keep the high-value workforce question, remove infrastructure that cannot be completed and demonstrated reliably, and make every feature visible in a browser. A deterministic planner is sufficient to prove the move logic. AI and Oracle can be future extensions if they become real requirements; neither is simulated or claimed in the shipped app.

### 3. The core problem became network-safe capacity planning

The first pitch was narrowed from “an AI staffing system” to a planner answering: **Can we staff a new unit from the current workforce without making another unit unsafe or under-covered?** The essential insight is that finding a qualified candidate is not enough; each move changes the source site's capacity and mix, and may require a backfill chain.

The contestant clarified an important capacity rule: if a source has 7 people and a minimum of 6, moving one person is allowed. The system must check the post-move total and mix against the floor; it must not freeze everyone at the original headcount. A later move can become infeasible if it breaks another source rule, and the full sequence must preserve every modeled floor.

### 4. Role mix, geography, and career development were added

The planner was expanded beyond undifferentiated headcount:

- Job codes belong to families; levels and required skills determine eligibility.
- Senior and charge/lead requirements are separate from total headcount. A senior employee may satisfy a senior minimum and still counts as exactly one person toward total headcount.
- Geography matters. A person in New York is not assumed willing or able to transfer to California. The demo uses explicit locations and recorded mobility/opt-in; RN moves additionally check destination-state authority at the proposed opening date.
- Both licensed and nonlicensed roles matter. The RN case proves licensure and specialty constraints; the service-family cases prove the workflow generalizes without clinical licensing.
- The executive view distinguishes capacity available now from future role mix. Senior staff may support opening now or seeding another location; a predominantly early-level mix may imply waiting, recruiting, or developing a pipeline.
- The career ladder is conditional: tenure (12 or 24 months by step), performance rating at least 3/5, required skill, approval, and continued availability. A promotion never creates another employee, grants a license, or guarantees a future opening.
- “Early-career” refers only to synthetic job level/time in role. The demo does not infer or use employee age.

These rules are demonstrated with fictional fixtures, not real employment decisions. The planner is a prototype and must not be used to make a real transfer, clinical coverage, licensure, promotion, or hiring decision.

### 5. The scope was expressed as three scenarios

The approved demo direction combines an RN example, nonlicensed roles, an executive summary, and a conditional career ladder:

| Case | What the fixture demonstrates | Intended executive takeaway |
| --- | --- | --- |
| Tampa rehab unit | RN job family, specialty skills, destination-state authority, mobility, source floors, and the RN-12 backfill before RN-02 moves. Orlando West can go from 7 to 6 at a floor of 6. The proposed unit ends 7 of 8 positions filled. | A transfer plan must show the entire sequence; one additional qualified RN is needed under these fictional rules. |
| Orlando service hub | Nonlicensed Associate/Senior Associate/Team Lead mix; 6 of 6 people with the required senior and lead coverage. | Ready now under the fixture's source and destination rules. |
| Phoenix service hub | Full headcount but insufficient senior/lead mix initially; conditional role progression reaches the first sampled ready checkpoint at +24 months. A +1 headcount stress case shows promotion cannot fill a people gap. | Wait, hire experienced staff, or revisit later; the forecast is conditional on several assumptions. |

All numbers, employees, locations, demand minima, ratings, dates, and outcomes above are synthetic. Staffing minimums are invented for the demo and are not legal or clinically safe ratios.

## Design decisions and claim boundaries

| Decision | Why | What a future model must preserve |
| --- | --- | --- |
| Standalone browser app, no formal database in the hackathon build | Two-hour time limit; user explicitly accepted static HTML/mock data. | Keep direct-open/static operation unless the team asks for a real backend. Never imply Oracle or AI is wired in when it is not. |
| Deterministic rules engine for decisions | Reproducible browser verification and inspectable constraints. | Models can help draft inputs or explain output later, but cannot waive hard coverage, mobility, skills, or licensure checks. |
| Source minima evaluated after each complete move/backfill sequence | Counts alone obscure cascading vacancies. | A source at 7 with floor 6 may lose one. Check the final post-sequence total and level mix at every affected source. A circular move cannot create net capacity. |
| Total, senior, lead, and specialty demands are distinct | A higher-level employee contributes to mix while remaining one person. | Never double-count one person toward total headcount; retain separate minima and specialty/skill rules. |
| Geography and destination-state authority are explicit | Qualifications do not imply transfer consent or legal authority. | Preserve location/opt-in and valid RN authority checks at the proposed date. Do not infer willingness to relocate. |
| Conditional career forecast | It helps executives distinguish a role-mix shortage from a person shortage. | Forecasts depend on tenure, rating, skills, approval, availability, and future assumptions. Label as conditional; promotion does not create headcount. |
| Use synthetic workforce data | Safe, reproducible demo and no private employee data. | Do not introduce real worker names, IDs, patient information, or private roster data. |
| Human review stays in the workflow | The fixture is not authoritative policy or an employment decision. | Present recommendations as proposals for planner/source-manager review, never automatic transfers or approvals. |
| Do not invent traction or customer outcomes | No design-partner interview or measured pilot was supplied. | The 50% reduction is an unvalidated pilot target; fixture counts are demo outputs, not customer KPIs. AHA statistics are reach context, not TAM, contracts, traction, or willingness to pay. |
| Prompts are drafts to discuss with the team | Contestant asked to talk through ideas before finalizing prompts/case statement. | Keep `BUILD_HANDOFF.md` prompts copy-ready but mark strategic choices and integrations as team decisions; do not silently expand scope. |

## AI Judge submission history

Scores and feedback below are portal results reported during the submission loop. The overall score is the leaderboard value; where individual category numbers are known, they are included. The portal's qualitative feedback was partly templated, so a repeated comment is evidence about what the judge displayed, not proof that the team ignored it.

| Version | Run | Score | Change / observed rank | What changed or what we learned |
| --- | ---: | ---: | --- | --- |
| 1 | #3138 | 71.0 | Baseline | Technical execution 98/100. Judge asked for differentiator, measurable proof, visible workflow, market scope, and expansion path. |
| 2 | #3157 | 67.8 | −3.2 | Added synthetic evidence counts and a guided what-if. This did not satisfy a customer-outcome request; shorter copy obscured the exact cascade/product design. Technical execution remained 98. |
| 3 | #3166 | 79.5 | +11.7 | Explicit before/after sequence and carefully labeled, unvalidated pilot target improved Demand Reality to 95. Solution Fit remained 56; the judge wanted the controls/outputs mapped to manual pain. |
| 4 | #3184 | 91.7 | +12.1 as displayed by the portal | Added one-click scenarios, clearer Evaluate action and transfer/source-impact panel. Category scores: Demand 97, Market 92, Solution Fit 75, Technical 98; differentiation was labeled Outstanding (numeric score not visible). Ranked #4 at the time, 0.1 behind third place. |
| 5 | #3209 | 91.7 | 0.0 versus v4; ranked #6 in last observed snapshot | Rewrote the top of the pitch around “one planner, one RN opening, four demand numbers, one reviewable answer.” The judge still displayed Solution Fit 75 and the same comment: describe the smallest wedge. By then third place was 93.3. A copy-only change did not improve the score. |

Across the later results, recurring next actions included: name a reachable buyer and scope signal; provide a measurable impact/traction/market signal; explain the smallest useful workflow; explain what is production-ready versus hackathon-grade; and show why the opportunity can expand. We address these honestly: the user/buyer is a hypothesis, AHA signals are contextual, the 50% pilot target is unvalidated, and production needs live systems, access controls, audit, policy validation, and human approvals.

**Current score status is historical:** the last viewed leaderboard was October 25, 2026, with 31 registered teams and 19 scored; Neon Knights #6 at 91.7 and third place at 93.3. Refresh the portal before quoting rank. The user had authorized iterative submissions until top 3, but the fifth run had not reached that goal in the last observed state.

## Build and verification facts

- `index.html`, `styles.css`, `app.js`, `planner.js`: public demo and deterministic planner.
- `tests/planner.test.js`: six planner checks (at the last verification); the suite previously passed with `node --test tests/planner.test.js`.
- `AI_JUDGE_VERIFICATION_V3.json`: three stable browser workflows for Tampa, Orlando, and Phoenix; exact base URL includes the GitHub Pages repository path.
- Last v4/v5 browser verification showed Tampa's ordered backfill and source before/after mix; Orlando ready; Phoenix conditional; Phoenix +1 demonstrates a true headcount gap. Last known `node --check` for `app.js` and `planner.js`, planner tests, and `git diff --check` passed before version 5. Version 5 changed portal copy only, not app code.
- Public demo: https://akshaykamra92.github.io/oracle26ai-hackathon/
- GitHub repository: https://github.com/akshaykamra92/oracle26ai-hackathon

Do not trust a stale count or description in prose after code changes. Re-run the current app, verify its cases, and update README, TEAM_BRIEF, submission copy, verification workflows, and this history if behavior changes.

## Suggested reading order for the next AI chat

1. `PROJECT_HISTORY.md` — decisions, timeline, score history, claim limits (this file).
2. `README.md` — current setup, scenarios, test command, and repository map.
3. `TEAM_BRIEF.md` — case statement, demo narrative, and open team decisions.
4. `WORKFORCE_MODEL.md` — implemented workforce rules and assumptions.
5. `SUBMISSION_V5_DRAFT.md`, `SUBMISSION_V4_RECORD.md`, `JUDGE_FEEDBACK_RESPONSE.md`, `RUBRIC_MAP.md` — exact copy and judging evidence.
6. `BUILD_HANDOFF.md` — model recommendation and prompts for focused follow-up work.
7. `planner.js`, `app.js`, `index.html`, `styles.css`, and `tests/planner.test.js` — actual implementation.

## Instructions for an AI continuing the work

Start by checking the actual repository state, recent GitHub history, live demo, and current AI Judge feedback. Use `PROJECT_HISTORY.md` as context, not as a substitute for inspecting code or the current portal. Keep the static demo runnable, use synthetic fixtures, preserve the rules above, and update all affected documentation when behavior changes. Separate measured facts, synthetic outputs, targets, hypotheses, and future work. Discuss strategic scope or case-statement changes with the contestant/team before treating them as final. The contestant previously authorized pushing verified repository updates and making repeat AI Judge submissions; check the latest instruction and live state before taking either action. Never force-push or claim a score/rank not visibly verified.

## Open questions for the team

- Has a planner or system workforce leader confirmed this workflow and buyer hypothesis?
- Is Oracle 26ai or a runtime AI feature required by the final judging rules, or is a transparent standalone planner acceptable?
- What single first wedge should a real pilot test: one RN opening with source-manager review, or a specific nonlicensed job family?
- Who will provide a deidentified manual baseline and define a valid-plan KPI?
- Which roles, location rules, and career checkpoints would a design partner actually use?
