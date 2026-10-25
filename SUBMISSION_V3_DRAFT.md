# AI Judge version 3 draft — explicit outcome target

The version 2 AI Judge run scored 67.8 and requested a measurable customer outcome. The following copy is for a new version after team review. The **50% figure is an unvalidated pilot target**, and the 4/11 figure is a synthetic demo result.

## What did you build?

Can We Staff It? is a public browser demo that tests whether a proposed new unit can draw staff from a network without uncovering existing teams. A planner chooses an opening and edits total, senior, lead, and specialty requirements. The planner checks location, RN authority where relevant, source floors, and ordered backfill chains, then shows an executive recommendation, every approved or blocked move, and each source's before-and-after role mix. Three fictional scenarios show a Tampa RN headcount gap, an Orlando service hub ready now, and a Phoenix service hub whose senior mix may become ready later. A guided Phoenix +1 role button exposes the difference between a role-mix gap and a genuine people gap.

## Who has this problem?

The first user is a central workforce planner at a regional multi-site health system; the system workforce or operations leader is our buyer hypothesis. Today the planner exports rosters, reconciles job codes and credentials in spreadsheets, calls source managers to test backfills, and revises the opening recommendation after each move. A person who qualifies for the new unit may be the one keeping another unit above its floor. We have not measured the real time or cost of this workflow yet. AHA's 2025 health-systems snapshot reports 397 U.S. health systems; only a subset fits the initial multi-site wedge. AHA Fast Facts 2026 reports 3,567 community hospitals in a system. These are reach signals, not customers or revenue. Start with one RN opening decision and a central planning team, then expand by job family.

## How does your app solve it?

Before: a spreadsheet shortlist can show a qualified Charge RN, but the planner must discover whether moving that person leaves the source below its charge or headcount floor. After: the app simulates the entire sequence and shows the reason for each decision. In synthetic Tampa, Orlando West starts with 7 RNs against a floor of 6, so RN-01 can move. RN-02 can move only after RN-12 backfills the Charge RN source. Four of 11 proposals (36%) are rejected for source coverage, geography, or license rules; 7 of 8 Tampa positions are covered and 0 modeled source sites end below minimum. That is a reproducible fixture result, not a measured customer outcome. Our pilot target is at least **50% less median time to a reviewer-accepted, policy-compliant plan** than the same team's observed manual baseline, with zero source-floor violations in accepted plans. We would test 10 deidentified opening cases. The non-obvious value is calculating transferable capacity after each move and ordered backfill, then exposing the audit trail; a candidate match alone cannot answer this network question.

## How did you build it?

The shipped prototype is static HTML, CSS, and JavaScript with fictional rosters and a deterministic in-browser planner; it has no runtime AI or Oracle database. It checks family, level, skills, geography or opt-in, destination-state RN authority, and total/senior/lead source floors; short backfill chains are sequenced before the destination move. Career checkpoints require tenure, rating at least 3/5, skills, approval, and continued availability. Six automated tests and browser walkthroughs verify the three scenarios and Phoenix stress test. For quick adoption the UX has preloaded cases, four editable demand numbers, immediate recomputation, a one-screen executive answer, a decision trail, and a before-and-after source table. Production needs current HRIS, license, schedule, and approved policy data, access controls, audit records, and human approval. Future expansion would add job families and integrations; defensibility from validated configurations and decision history is a hypothesis, not a current asset.

## Links

- **Demo:** https://akshaykamra92.github.io/oracle26ai-hackathon/
- **Repository:** https://github.com/akshaykamra92/oracle26ai-hackathon
- **Verification contract:** `AI_JUDGE_VERIFICATION_V2.json` (regenerate only if the portal's contract changes)
