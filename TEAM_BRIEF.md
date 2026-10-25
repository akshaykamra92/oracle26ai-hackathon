# Team brief — Can We Staff It?

## Case statement

When a healthcare organization considers opening a new unit, its planners need a quick way to see whether internal transfers could cover the new unit **without dropping existing units below a defined staffing floor**. A ranked list of qualified employees is insufficient if moving those employees creates a shortage elsewhere or their destination-state license is invalid.

**Can We Staff It?** demonstrates a rule-constrained planning loop. It ranks synthetic RN candidates for a proposed Tampa rehab unit, checks each move against the source-unit floor and destination license, rejects invalid moves, and revises the plan. It then distinguishes the immediate unfilled RN positions from a possible longer-term career pathway.

## Target user and value

- **User:** workforce planner or nursing operations leader exploring a scenario.
- **Question answered:** “How many of the new unit's modeled RN positions can we cover from our current roster without breaking our rules?”
- **Distinctive moment:** a high-scoring candidate is rejected because the source unit would fall below its floor. The plan continues with other candidates and reports a real gap instead of hiding it.

## Two-hour MVP

1. One page with scenario inputs, visible source-unit margins, decision trail, and answer.
2. Synthetic data only, embedded in the page. No sign-in, database, or API.
3. Deterministic rules that generate an actual rejection and revised plan.
4. Honest labels: the plan is illustrative and is not for real clinical decisions.
5. A README and a one-minute demo script.

## Success criteria

- A judge can open `index.html` and run the default scenario without setup.
- The default scenario shows 8 target RN positions, 6 approved moves, 4 rejections, and a 2-RN gap.
- The second Orlando West candidate is rejected with a visible source-unit shortfall.
- Expired and wrong-state licenses are rejected.
- No approved transfer drives a source unit below its modeled floor.
- The career pathway is shown separately from immediate coverage.

## Decisions and boundaries

- The plan models **one synthetic shift**, not an entire facility's staffing schedule.
- The ratio is a demo input, not a statement of law or clinical adequacy.
- “Approved” means approved by the demo's rules only.
- A potential LPN-to-RN pathway does not create a licensed RN today. Education, examination, and licensure must be verified before any real role change. See the [Florida Board of Nursing](https://floridasnursing.gov/nurse-rn-lpn/) for actual licensure requirements.
- Future Oracle, live data, and real AI agent integration are outside this MVP.

## Team decision still needed

Decide whether the submission should emphasize **workforce planning** or **the rule-checking interaction**. The current demo supports both. Confirm any sponsor technology requirements before describing the app as an Oracle project.
