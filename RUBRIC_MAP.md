# AI Judge rubric map — team discussion draft

The signed-in [AI Judge portal](https://app.hacktheworldaway.org/) lists five categories. This is our own evidence check, **not a judge score or prediction**.

| Category | Weight | What the current project can show | What is still missing |
| --- | ---: | --- | --- |
| Demand Reality & Problem Severity | 25% | A concrete expansion decision: moving an RN to a new unit can leave the old unit below its modeled floor. The [AHA workforce scan](https://www.aha.org/system/files/media/file/2025/12/2026-Health-Care-Workforce-Scan-Executive-Summary.pdf) documents sector staffing pressure; [AHRQ](https://psnet.ahrq.gov/primer/nursing-and-patient-safety) connects nurse staffing to patient safety. | Direct interviews or workflow evidence from planners. Do not claim “takes weeks” or monetary savings without evidence. |
| Target Customer & Market Scope | 20% | First user: workforce planner at a multi-facility health system; operations leader reviews the plan. The problem pattern can also apply to other multi-site workforces. | Buyer validation, a defensible market estimate, and proof that other industries need this exact workflow. |
| Solution Fit & Product Design | 20% | Live input → candidate ranking → rule checks → rejected move → feasible plan and remaining gap. The decision trail explains each rejection. | User feedback on whether these inputs and outputs match real planning work. |
| Technical Execution & Demo Proof | 20% | Public [live demo](https://akshaykamra92.github.io/oracle26ai-hackathon/), no login, [source code](https://github.com/akshaykamra92/oracle26ai-hackathon), reproducible default 8 needed / 6 approved / 4 rejected / 2 unfilled. | No live data, Oracle integration, or runtime AI. Any sponsor requirement for these must be checked. |
| Differentiation & Investment Readiness | 15% | The demo makes source-team damage visible before accepting a transfer and reports an honest gap. This is a promising product angle. | Competitor comparison, customer willingness to pay, and an integration plan. Do not claim the approach is unique yet. |

## Recommended pitch

**Problem:** “When a multi-site organization opens a new service, qualified employees may be available on paper, but transferring them can break coverage at the teams they leave. Planners need a fast answer to what can be staffed internally and what gap is real.”

**First market:** multi-facility health systems. **First workflow:** opening a new unit. **Broader hypothesis:** configurable eligibility and source-coverage rules could make the same planning loop useful to field service, retail, and other distributed operations. These are future applications, not features the current demo implements.

**Demo proof:** the highest-ranked candidate is accepted, but the second-highest is blocked when the source unit would fall to 5 RNs against a modeled floor of 6; the planner continues, approves 6 feasible transfers, and shows a gap of 2 rather than masking it.

## Team questions before final submission

1. Can we get one workforce planner or operations leader to react to the problem and demo? Record their words, with permission, rather than inventing validation.
2. Is the first buyer the health system's central workforce planning team or a nursing operations leader? Choose one for the pitch.
3. Does the event require Oracle technology in the submitted build? The current app has no Oracle or runtime AI integration.
