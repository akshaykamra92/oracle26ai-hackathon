# First buyer, pilot scorecard, and expansion path

## The smallest useful wedge

**User:** a central workforce planner at a regional, multi-site health system. **Buyer hypothesis:** the system's workforce or operations leader. The first decision is whether one proposed RN unit opening can be staffed from existing locations under approved local rules. This can be evaluated with a bounded roster and one job family before building a full HR platform. Buyer access and willingness to pay have not been validated.

The current manual path is a roster export, spreadsheet reconciliation of job codes and credentials, calls to source managers, repeated checks after each possible transfer, and an executive summary. We have not measured how long that takes at a real organization. The app demonstrates a proposed alternative: set the opening's total and capability minima, simulate each move and local backfill in order, show the remaining gap and every source's resulting mix, then send the plan for human review.

## Measurable proof and proposed outcome

The **synthetic Tampa fixture** evaluates 11 proposed moves, rejects 4 (36%) for source coverage, geography, or Florida authority, orders 1 backfill, and leaves 0 modeled source locations below their minima. This proves the demo's constraint checks on seeded data. It does **not** prove avoided real transfers, time saved, or commercial traction.

For a design-partner pilot, use 10 deidentified historical or live opening cases from one system and compare the planner's existing workflow with the prototype after approved policy and roster data are configured. Timestamp the opening request and the first plan accepted by the reviewer. Record all revisions and source-floor conflicts found before approval.

| Metric | Measurement | Pilot target, not achieved |
| --- | --- | --- |
| Median time to a reviewer-accepted, policy-compliant plan | Minutes from request to accepted plan for the same case type; compare with the organization's observed manual baseline. | At least 50% lower than the measured baseline. |
| Source-floor violations in an accepted plan | Recheck all source minima after the ordered move chain. | Zero. |
| Conflicts caught before approval | Count proposals rejected for source floor, location, credentials, or role-mix rules before a person is asked to transfer. | Report the count and reason; establish baseline in the pilot. |

The 50% target is an experiment threshold chosen for a pilot, not a forecast based on existing customer data.

## Reach and defensibility hypotheses

[AHA's 2025 health-systems infographic](https://www.aha.org/infographics/2025-06-18-fast-facts-us-health-systems-2025-infographic) reports **397 U.S. health systems** from FY2023 data. Its definition includes single diversified hospitals, so only a subset belongs to the initial multi-site wedge. [AHA Fast Facts 2026](https://www.aha.org/statistics/fast-facts-us-hospitals) reports **3,567 community hospitals in a system** from FY2024 data. These are two different context measures, not a contract count, pipeline, revenue estimate, or traction.

The app's demonstrated distinction is **transferable capacity**: eligibility alone is insufficient until the planner tests the vacancy that transfer creates, an ordered backfill if needed, and all affected source floors. The same audit trail also shows what conditional career progression changes and what it cannot change. Future defensibility would have to come from customer-approved policy configurations, HRIS and credential integrations, and decision history. None of those is shipped today.

After the RN opening wedge, configure another licensed family, then nonlicensed service roles (already illustrated by the demo), and finally connect live rosters, schedules, credentials, and approvals. Each step requires buyer validation and production-grade controls.
