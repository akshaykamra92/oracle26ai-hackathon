# Workforce model — implemented demo and next steps

## Planning question

For a proposed new unit or location, **which people can move without taking any existing source below its required mix, and when could a different career mix make expansion viable?** This is a network question. The current stack, destination requirements, geography, practice authority when relevant, and every backfill move must be evaluated together.

The standalone demo implements this with fictional data in `planner.js`. It is a deterministic illustration, not a clinical standard, automatic employment decision, or full workforce optimizer.

## Data and rules currently implemented

| Concept | Demo behavior |
| --- | --- |
| Job family | RN I, RN II, and Charge RN form a licensed RN family. Associate, Senior Associate, and Team Lead form a nonlicensed service family. A different family cannot satisfy demand. |
| Level and mix | Level 2+ satisfies a senior minimum; level 3 satisfies a lead or charge minimum. Both still count as **one** person toward total headcount. The demand inputs let a planner change total, senior, lead, and rehab-skill minima. |
| Source stack | Every source has fictional total, senior, and lead minima. The table shows before → after and headcount room. A 7-to-6 move at floor 6 is allowed. A charge move may still need backfill if it would break the charge minimum. |
| Destination fit | A candidate needs the destination's job family and any required skill. Candidates in the same metro are considered; longer moves need a recorded synthetic mobility opt-in. A New York candidate is not assumed willing to move to Tampa. |
| RN authority | An RN move needs recorded destination-state authority valid on the proposed opening date. [NCSBN](https://ncsbn.org/nurse-licensure-guidance) notes that actual requirements vary by state. The service examples have no RN license rule. |
| Backfill chains | The planner tentatively moves a candidate, checks all source minima, and searches up to two eligible backfill hops if needed. It rejects a chain that cannot be repaired. The demo shows the executable order from spare capacity to new location. |
| Search order | Synthetic candidate scores determine a greedy order. When a feasible senior, lead, or specialty candidate is available, the planner can reserve a remaining destination slot for that required mix. This is an explainable demo search, **not proof of the globally optimal staffing plan**. |

For Tampa, Orlando West has 7 RNs and a floor of 6. RN-01 can move directly. RN-02 is a Charge RN; moving them next would leave Orlando West below its total and charge minima. RN-12 can move from the Orlando Float Pool to Orlando West, then RN-02 can move to Tampa. Orlando ICU's RN-03 cannot move because that source would fall below 5 total and no eligible backfill chain is found. Additional candidates fail geography or Florida license checks. The final modeled result is 7 of 8 Tampa RN positions covered with one backfill move and one unfilled position.

## Career ladder used for the forecast

| Current code | Next code | Minimum time in current role | Performance | Additional recorded skill |
| --- | --- | ---: | ---: | --- |
| RN I | RN II | 24 months | ≥3/5 | Advanced |
| RN II | Charge RN | 24 months | ≥3/5 | Leadership |
| Associate | Senior Associate | 12 months | ≥3/5 | None |
| Senior Associate | Team Lead | 24 months | ≥3/5 | Leadership |

The prototype samples readiness at the proposed Apr 2027 opening and +6, +12, +18, +24, and +36 months. At the Phoenix opening, six service positions are available, but the group has one senior-level person and no team lead against minima of two and one. Synthetic associates with the required rating may qualify for Senior Associate after 12 months. PHX-03 may qualify for Team Lead after 24 months because its fictional rating is 4/5 and leadership skill is recorded. PHX-04, rated 2/5, does not project. The first sampled checkpoint that meets the destination and source mix is +24 months, **if** promotions are approved, ratings and skills remain valid, and people remain available.

The forecast changes potential **level**, not headcount. Raising Phoenix demand to seven produces a one-person gap at every checkpoint. A potential RN promotion does not confer RN practice authority or replace a missing license.

## How to interpret the executive statement

- **Ready at opening:** demand total and all capability minima are met, and every source still meets its minima. Orlando demonstrates this.
- **Wait for role mix:** headcount is present, but senior or lead coverage is missing; a conditional sampled future checkpoint meets the mix. Phoenix demonstrates this.
- **Additional capacity needed:** headcount remains short through the 36-month checkpoints. Tampa demonstrates this even though its senior and charge mix is sufficient.

“Early-career” refers to synthetic job code and time in role. Employee age is neither stored nor used.

## Important limits before real use

Real clinical staffing depends on patient needs, skill mix, shift, and more; [AHRQ](https://psnet.ahrq.gov/primer/nursing-and-patient-safety) explains why a single count is insufficient. A real system would need approved local policy, validated schedules/FTE and license records, employee preferences, role openings, compensation and labor constraints, privacy protections, and human sign-off. The demo has no live data or runtime AI. A future AI feature could draft a demand profile or summarize the decision trail, while deterministic rules and a human reviewer retain authority over eligibility and coverage.
