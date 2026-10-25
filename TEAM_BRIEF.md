# Team brief — Can We Staff It?

## Case statement for discussion

**Problem:** When a distributed organization opens a new location or service, leaders may see qualified people elsewhere in the organization, yet moving them can uncover another team. The real decision depends on the mix of job levels and skills, geography, eligibility, source minima, and possible backfill chains. A headcount total or ranked candidate list cannot show whether the whole network remains viable.

**Our solution:** Can We Staff It? takes a proposed destination's demand profile, searches an existing synthetic workforce, tests every move and backfill against local rules, and gives an executive answer: **open under the modeled rules, add capacity, or wait for a conditional career pipeline**. It shows the full decision trail and source stack so planners can challenge the answer.

**First user:** a central workforce planner at a multi-facility health system. A nursing operations leader reviews the clinical example. **First buyer hypothesis:** a system-level workforce or operations leader responsible for expansion; buyer and willingness-to-pay claims still require validation.

**Wide application:** the same planning question appears in distributed service operations. Our Orlando and Phoenix examples use Associate → Senior Associate → Team Lead, so the demo already shows the workflow without nursing licenses. Retail, field service, hospitality, and other markets remain hypotheses, not validated customer segments.

## Why it matters

The [American Hospital Association's workforce scan](https://www.aha.org/system/files/media/file/2025/12/2026-Health-Care-Workforce-Scan-Executive-Summary.pdf) describes healthcare staffing pressure. [AHRQ's nursing and patient-safety primer](https://psnet.ahrq.gov/primer/nursing-and-patient-safety) explains why levels and skill mix matter alongside numbers. These support the category; they do not prove a specific buyer's workflow, time saved, or willingness to pay. One planner interview would improve the pitch more than an invented ROI figure.

## What the live demo proves

| Scenario | Executive answer | Visible evidence |
| --- | --- | --- |
| Tampa RN expansion | **Additional capacity needed.** 7 of 8 positions covered, with senior and rehab minima met but one RN headcount gap. | Orlando West 7 → 6 is allowed at floor 6; RN-02 needs RN-12 as charge backfill; one source-floor block, one mobility block, and two license blocks. |
| Orlando service hub | **Ready at the proposed opening** under fictional minima. | 6 of 6 people covered, including 3 senior-level and 1 team lead; all source sites remain at or above their modeled minima. |
| Phoenix service hub | **Wait for role mix or hire experience.** 6 of 6 people available, but only 1 of 2 senior and 0 of 1 lead at opening. | Career ladder raises the projected mix to ready at the +24-month sampled checkpoint, contingent on tenure, rating, skill, approvals, and continued availability. Raising demand to 7 shows that promotion cannot add headcount. |

The executive view calls this an **early-career** mix based on synthetic job code and time in role. It does not use employee age. Senior or lead staff can satisfy overlapping capability minima while still counting as one person.

## Rules and boundaries

- The demo uses synthetic people and one simplified staffing snapshot. All minima, ratings, and opening dates are illustrative.
- “Approved” means the deterministic demo rules found a feasible chain. It is not a real transfer, clinical staffing approval, licensure verification, or employment decision.
- RNs require recorded destination-state authority valid at the proposed opening; nonlicensed service roles use job-family, geography, and coverage rules without that license check.
- A source must retain its total, senior, and lead minima after the full move chain. A source with 7 people and a floor of 6 can lose one without backfill. A cycle does not create capacity.
- The career ladder requires 12 or 24 months in role, at least 3/5 performance, and any stated skill. Its forecast is conditional. An RN promotion never substitutes for RN licensure or creates an extra person.
- The app is plain HTML/CSS/JavaScript with no runtime AI or Oracle database. Be explicit about that in the submission unless the implementation changes and is verified.

## 60-second pitch spine

1. **Problem:** “An expansion plan can look staffed on paper and still damage existing teams.”
2. **Tampa proof:** Show a 7-to-6 move allowed, a charge move repaired by a backfill chain, and mobility/license/source-floor blocks. End on 7 of 8 filled and one honest gap.
3. **Generality:** Switch to Orlando. The same planner shows a nonlicensed service hub with the senior bench to open.
4. **Forward view:** Switch to Phoenix. Headcount is full but the role mix is not; a conditional career ladder points to the +24-month checkpoint.
5. **Close:** “The planner gives an auditable expansion decision today and a grounded view of when the workforce might be ready later.”

## Team questions before submitting

1. Is the first buyer a central workforce planning team or an operations executive? Choose one based on the team's experience or a quick buyer conversation.
2. Does the event require Oracle or runtime AI in the submitted app? The current demo does not claim either.
3. Which of the three scenario moments should lead the spoken demo? Tampa has the strongest rule and backfill proof; Orlando and Phoenix show broader applicability and the career forecast.

The [AI Judge rubric map](RUBRIC_MAP.md) ties these claims to visible proof. The [live demo](https://akshaykamra92.github.io/oracle26ai-hackathon/) is the first thing to show a judge.
