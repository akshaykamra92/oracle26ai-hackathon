# Response to AI Judge feedback — Run #3138

Run #3138 scored 71.0 overall. Technical Execution & Demo Proof scored 98/100; the feedback asked for a clearer differentiator, a measurable proof point, a more visible product workflow, a concrete market scope signal, and a credible expansion path. The technical comment mentioned demo reliability without identifying a failed browser step in the feedback visible to us. We therefore retested the critical flows rather than claiming an unverified failure was fixed.

| Feedback | Change in this revision | Claim boundary |
| --- | --- | --- |
| Show measurable proof | The app now counts proposals evaluated, blocked moves, backfills, and source sites below their modeled minima. Tampa shows 11, 4, 1, and 0. | These are outputs from fictional fixture data, not traction or measured customer impact. |
| Make product workflow clearer | A guided Phoenix button raises demand from 6 to 7; Reset returns the selected scenario to its starting demand. The user can compare a conditional role-mix forecast with a hard headcount shortage in two clicks. | The forecast remains conditional; a promotion never adds an employee. |
| Clarify differentiation | The submission emphasizes network consequences: a move is valid only if all source floors remain intact, possibly after an ordered backfill chain. Rejected moves stay visible. | This is a specific capability demonstrated here, not a claim that no other product can do it. |
| Show first buyer and market signal | The wedge is a central workforce planning team and system-level operations buyer at a multi-facility health system. [AHA Fast Facts](https://www.aha.org/statistics/fast-facts-us-hospitals) reports 3,567 U.S. community hospitals in a health system. | The AHA count is context for reach, not contracts, traction, revenue, or an addressable-market estimate. |
| Show expansion path | After validating the RN opening workflow, configure other job families and connect roster, license, schedule, and approval systems. The demo already runs a nonlicensed service family. | Integrations and production authorization are future work. |

## Proposed pilot measurement

In a design-partner pilot, timestamp an opening request and the first plan a workforce leader accepts after checking source coverage. Compare the **median time to a valid plan** with the same team's observed spreadsheet workflow. Also count **source-floor conflicts detected before approval** and **manual corrections to proposed moves**. We have not run this pilot, so there is no claimed time saving or customer traction. A reasonable *target to test*, not a result, is a 50% reduction in plan-preparation time with zero policy violations in the approved plan.

## Prototype versus production

Shipped: public static app, synthetic rosters, deterministic move and short-chain search, source-floor checks, conditional career forecast, repeatable browser interactions, automated planner tests. Production work would require current HRIS and credential data, scheduling/FTE and skill rules approved by the organization, authentication and role-based access, audit records, privacy review, and human sign-off. The app does not currently run an AI model or Oracle database.

## What version 2 taught us

Version 2 (Run #3157) scored 67.8 versus version 1's 71.0. Technical Execution stayed at 98/100. The new synthetic evidence counts did not satisfy the judge's request for a measurable **customer outcome**; it flagged `missing_outcome_evidence` and again asked for a concrete impact KPI. The shorter portal answers also obscured the exact before-and-after transfer cascade and product design choices. [PILOT_SCORECARD.md](PILOT_SCORECARD.md) now specifies the proposed outcome measurement and its unvalidated target. We must keep that target separate from results already achieved.
