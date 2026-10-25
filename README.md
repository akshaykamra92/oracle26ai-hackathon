# Can We Staff It?

A standalone, synthetic workforce expansion planner built for a two-hour hackathon. It answers a practical question: **can we staff a new location from our existing workforce without creating a shortage elsewhere, and if not, when might the right role mix become available?**

**[Live demo](https://akshaykamra92.github.io/oracle26ai-hackathon/)** · **[Team brief](TEAM_BRIEF.md)** · **[Revised submission copy](SUBMISSION_V2_DRAFT.md)** · **[Judge feedback response](JUDGE_FEEDBACK_RESPONSE.md)**

The default example is a proposed Tampa rehab unit. The same planner also runs two **nonlicensed service** examples, showing that the demand → eligibility → source coverage → future readiness workflow can support other job families when their rules are configured.

## Run and verify

Open `index.html` directly in a browser, or serve the folder for clipboard support:

```sh
python3 -m http.server 8765
```

Visit `http://localhost:8765/`. The Tampa plan runs automatically. Change the scenario or the total, senior, lead, or rehab-skill requirements to recalculate. The **Try Phoenix +1 role** button demonstrates that career progression cannot create an extra person; **Reset selected scenario** restores its starting demand. No installation, login, database, API key, or build step is required.

Run the planner checks with:

```sh
node --test tests/planner.test.js
```

## Three built-in scenarios

| Scenario | Demand at proposed Apr 2027 opening | Result | Executive reading |
| --- | --- | --- | --- |
| Tampa rehab unit | 8 RNs total; at least 2 senior, 1 charge, 2 rehab-skilled | 7 destination moves approved, 4 proposals blocked, 1 backfill move, 1 RN position unfilled | Enough senior coverage, but one more qualified person is needed. No modeled promotion creates headcount. |
| Orlando service hub | 6 service staff; at least 2 senior, 1 team lead | 6 approved, 0 blocked; 3 senior-level and 1 lead-level person | Ready under the synthetic mix and source minima. |
| Phoenix service hub | 6 service staff; at least 2 senior, 1 team lead | 6 approved; only 1 senior-level and 0 team leads at opening | Headcount is available but the mix is not. The first sampled ready checkpoint is 24 months later, conditional on career progression and continued availability. |

The Tampa decision trail contains four distinct proof points:

1. Orlando West starts with 7 RNs and a modeled floor of 6. RN-01 moves directly; 6 is allowed.
2. Moving RN-02, a Charge RN, needs a backfill. RN-12 moves from the Orlando Float Pool to Orlando West **before** RN-02 moves to Tampa, preserving Orlando West's total and charge minimums.
3. RN-03 is blocked because Orlando ICU would drop below its total floor; the local search finds no eligible backfill. RN-11 is blocked by mobility, RN-04 by an expired Florida license at the proposed opening, and RN-05 by no Florida RN authority in the demo data.
4. The plan continues to other sources and reports the remaining one-person gap rather than assuming every high-scoring candidate can move.

The evidence strip above the decision trail counts what each synthetic run actually checked. In Tampa it shows **11 proposals evaluated, 4 blocked, 1 backfill move, and 0 source locations below their modeled minima after the plan**. These are reproducible demo outputs, not customer usage or measured savings.

## Model and forecast

`planner.js` contains fictional locations, job codes, employees, and deterministic rules. RN I, RN II, and Charge RN form one licensed family. Associate, Senior Associate, and Team Lead form a nonlicensed service family. A higher-level person can satisfy a senior or lead minimum **and** one total headcount position; they never count as two people. Each proposed move is checked against job family, required skill, geography or stated mobility, destination-state license for RNs, and source total/senior/lead minima. The planner searches up to two local backfill hops and rejects a chain that would leave a source short.

The career ladder models eligibility after 12 or 24 months in a job code, a performance rating of at least 3/5, and any required advanced or leadership skill. Future checkpoints are 0, 6, 12, 18, 24, and 36 months after the **fictional Apr 2027 proposed opening**. The forecast assumes ratings, skills, availability, and promotion approvals will hold. It is a conditional scenario, not an automatic promotion or a promise of a future opening. An RN promotion does not create a new RN or substitute for a missing license.

The source table shows before → after totals and senior/lead coverage. “Room” means headcount above the total minimum, **not** the number of people who can definitely move; mobility, licensure, skills, and the role mix may reduce feasible moves.

## Files

- `index.html`, `styles.css`, `app.js`, `planner.js`: standalone demo and planner.
- `tests/planner.test.js`: default outcomes and core guardrails.
- `TEAM_BRIEF.md`: problem statement, first user, and demo scope.
- `WORKFORCE_MODEL.md`: implemented rules, assumptions, and expansion path.
- `BUILD_HANDOFF.md`: copy-ready prompts for other Codex chats.
- `SUBMISSION_DRAFT.md`: portal answers and spoken demo script for team review.
- `SUBMISSION_V2_DRAFT.md`: revised portal answers based on AI Judge feedback.
- `JUDGE_FEEDBACK_RESPONSE.md`: feedback, implemented changes, market signal, and proposed pilot KPI.
- `AI_JUDGE_VERIFICATION.json` and `AI_JUDGE_VERIFICATION_V2.json`: original submitted browser checks and revised checks for the guided what-if. Recheck the portal's current verification contract before a new submission.
- `RUBRIC_MAP.md`: evidence map against the visible AI Judge rubric.

## Limits and technology disclosure

All people, ratings, rosters, opening dates, and site rules are fictional. The clinical minima are invented for this demo and are **not** legal or clinically adequate staffing standards. The app models a simplified snapshot, not schedules, FTE, patient acuity, scope of practice, compact-license status, salary, promotion approval, or employee preferences beyond the recorded synthetic mobility field. Real deployment would need validated policies, current licensure and skill data, privacy protections, and human review.

The shipped app is plain HTML/CSS/JavaScript with a deterministic in-browser planner. It does **not** call a runtime AI model or Oracle database. GPT-6.1 Sol is the suggested development assistant, subject to availability. Oracle AI Database 26ai remains an optional future integration; the repository name alone does not imply Oracle functionality.
