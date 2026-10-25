# Workforce model — design for the next demo iteration

This is a **proposed design**, not a claim that the current standalone app implements all of it. The current app checks direct RN transfers against a single headcount floor and Florida license. It does not yet model job families, seniority, mobility, or backfill chains.

## Problem statement

When a multi-site organization opens a new service, it needs a specific mix of people at the new location. The people who appear qualified may already be supporting required coverage elsewhere. A transfer can also create a vacancy that requires another transfer. The planner needs to know which moves are feasible across the **whole workforce network**, why others fail, and what remains to hire.

**First use case:** a multi-facility health system opening a Tampa rehab unit. The same demand, eligibility, source-coverage, and backfill pattern could later serve other distributed workforces with different role rules.

## Planner workflow

1. **Inspect the current stack.** Show each location's on-shift headcount by job family, level, and required capability. Show its required minimum and genuine spare capacity.
2. **Define demand.** The planner chooses the new location and enters a role mix, such as total RNs, senior RNs, and rehab-qualified RNs. A model may draft a mix from an approved template, but a human confirms the requirements.
3. **Find eligible people.** Match job family, level, skills, destination practice authority, shift availability, and employee-declared mobility or commute region.
4. **Simulate moves.** After each proposed transfer, check every source unit's remaining headcount and capability mix. If a required position opens, search for a qualified backfill. Continue until the chain reaches genuine spare capacity; otherwise mark it unresolved.
5. **Explain the answer.** Show the feasible move chains, the final coverage of every affected location, rejected chains and their reasons, and the remaining new-site and backfill hiring needs. A manager approves moves outside the simulation.

## Rules the demo should make visible

| Rule | Example |
| --- | --- |
| Headcount floor | Orlando West has 7 RNs and a floor of 6. Moving one RN leaves 6, so that move is allowed without backfill. |
| Capability minimum | A unit might require one charge-qualified RN. Moving its only qualified RN fails even if total RN headcount stays above 6. |
| Job-family compatibility | RN2 may fill an RN1-level assignment if local policy allows. RN1 cannot fill a charge role; LPN and CNA do not count toward an RN minimum. These mappings are configurable, not universal facts. |
| No double counting | A senior or charge RN can satisfy a senior-skill requirement and an RN headcount slot, but remains one person for the total RN count. |
| Destination eligibility | A clinical move needs verified authority to practice in the destination state and any required unit skills. [NCSBN](https://ncsbn.org/nurse-licensure-guidance) says requirements vary by state. |
| Geographic feasibility | Default candidate pool is the same metro or another employee-approved commute region. Longer moves require an explicit relocation preference and destination eligibility. A New York resident is not automatically a California candidate. Avoid collecting a precise home address for this demo. |
| Full-chain feasibility | An immediate move chain is feasible only if it ends at genuine spare capacity. If it needs a future hire, mark it contingent and report the gap. A cycle of transfers does not create net capacity. |

The demo's RN floors are illustrative. Real clinical staffing depends on patient needs, skill mix, shift and other factors; [AHRQ](https://psnet.ahrq.gov/primer/nursing-and-patient-safety) describes why a single ratio is insufficient. The app should remain a planning aid with human approval, not an automatic clinical staffing authority.

## Suggested data fields

| Object | Minimum fields for a synthetic demo |
| --- | --- |
| Location / unit | ID, city or metro, state, shift, required total by family, required level or capability counts |
| Employee | Synthetic ID, current unit, job code, job family, level, skills, shift availability, licensed practice regions, approved commute regions, relocation opt-in |
| New demand | Destination, shift, total positions by family, minimum senior or specialty coverage |
| Proposed move | Employee, from, to, fit explanation, effect on source, backfill chain ID, status |

## How to search backfill chains

For a proposed person → destination move, tentatively update both units. If the source still meets **all** minima, the chain ends. If it does not, treat the missing role or capability as a new destination and look for an eligible person from a nearby source. Reject anyone already in the chain, and keep searching until a valid chain ends at spare capacity. For a small two-hour demo, cap the chain at two or three moves and rank valid chains by fewer relocations, fewer moves, and greater remaining source coverage. Present the full chain for approval and sequence the actual moves from the spare-capacity end first.

The current 6-of-8 result is **direct-transfer coverage only**. Once role mix and mobility are enforced, that result may rise or fall. A backfill can free a qualified Tampa candidate; geography or missing senior coverage can exclude one. The next demo must calculate and display its new result rather than preserve the old number for the pitch.

## AI's useful role

- Translate a plain-language request into a **draft**, structured demand profile using approved role templates.
- Summarize the current capability stack and highlight gaps or unusual constraints for planner review.
- Explain why a chain is feasible or blocked in plain language.

The deterministic planner validates headcount, role compatibility, practice authority, mobility, and every move in the chain. The model must not invent a clinical minimum or override a failed rule. The standalone version can show this workflow with synthetic data and no runtime model; a later integrated version would make the AI drafting step live.

## Strong next demo moment

Show three decisions: (1) a direct move from a unit with one genuine spare RN; (2) a senior RN move that needs a local, qualified backfill and succeeds as a two-move chain; (3) a distant or unlicensed candidate rejected, leaving an honest gap. Show the location-by-location capability stack before and after.
