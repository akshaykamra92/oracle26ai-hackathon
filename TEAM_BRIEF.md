# Team brief — Can We Staff It?

## Case statement

When a distributed organization opens a new site or service, leaders need to know whether they can staff it internally **without creating a shortage elsewhere**. A list of qualified employees does not answer that question: every transfer changes coverage at the source, and some employees are ineligible for the destination.

**Can We Staff It?** starts with healthcare, where this trade-off is especially visible. It ranks synthetic RN candidates for a proposed Tampa rehab unit, checks each move against the source-unit floor and destination license, rejects invalid moves, and reports the feasible internal coverage and remaining gap. It keeps a possible longer-term career pathway separate from today's qualified staffing.

## Target user and value

- **First user:** workforce planner at a multi-facility health system. A nursing operations leader reviews the result.
- **First buyer hypothesis:** a health system workforce or operations leader responsible for expansion and coverage. This needs customer validation.
- **Question answered:** “How many of the new unit's modeled RN positions can we cover from our current roster without breaking our rules?”
- **Distinctive moment:** a high-scoring candidate is rejected because the source unit would fall below its floor. The plan continues with other candidates and reports a real gap instead of hiding it.
- **Broader product hypothesis:** the same demand → eligible people → source coverage → feasible moves → remaining gap workflow could serve field service, retail, or other multi-site organizations with their own rules. The current demo implements only the healthcare scenario.

## Why this problem matters

The [American Hospital Association's 2026 workforce scan](https://www.aha.org/system/files/media/file/2025/12/2026-Health-Care-Workforce-Scan-Executive-Summary.pdf) describes staffing shortages, rising demand, and efforts to allocate staff time more effectively. [AHRQ's patient-safety primer](https://psnet.ahrq.gov/primer/nursing-and-patient-safety) explains that staffing levels and skill mix matter to patient safety. These sources support the importance of the category; they do not prove how long a specific hospital takes to plan a transfer or that a buyer would pay for this product. The team should validate those claims with prospective users.

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
- The current 6-of-8 result covers direct moves under a single RN floor. A move from 7 RNs down to a floor of 6 is allowed; it does not need a backfill under the modeled rule. The result is not a full workforce-network optimum.

The proposed next iteration in [WORKFORCE_MODEL.md](WORKFORCE_MODEL.md) adds job families, level and specialty requirements, geographic eligibility, and backfill chains. Its result should be recalculated from those rules; do not reuse 6-of-8 if the new rules change the answer.

## Pitch direction for team review

Lead with the **workforce expansion decision** and use the rule-checking rejection as proof. A concise version: “Before opening a new unit, see how many roles can be filled internally without leaving another unit short—and see the honest gap.” Keep the first customer specific to multi-facility healthcare. Mention other industries as a future application of the planning pattern, not as markets already served. Confirm any sponsor technology requirements before describing the app as an Oracle project.

The signed-in portal's visible rubric gives 25% to problem severity, 20% to target customer and market scope, 20% to solution fit and design, 20% to technical execution and demo proof, and 15% to differentiation and investment readiness. Keep the user story specific and point judges to the [live demo](https://akshaykamra92.github.io/oracle26ai-hackathon/).
