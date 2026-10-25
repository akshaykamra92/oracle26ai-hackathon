# AI Judge submission copy — revision after Run #3138

**Project title:** Can We Staff It?

**One-line description:** An auditable expansion planner that finds feasible transfers, protects source teams, and shows when the right role mix may exist.

## What did you build?

We built **Can We Staff It?**, a public, interactive workforce expansion planner for multi-site organizations. A planner sets the total people and senior, lead, or specialty mix needed at a new site. The app proposes transfers, checks the downstream vacancy each move creates, finds short ordered backfill chains, and shows an executive answer with the full decision trail. Its three fictional demos cover a Tampa RN unit and Orlando and Phoenix nonlicensed service hubs. A new evidence strip counts the proposals, blocks, backfills, and modeled source-floor breaches in each run; a guided Phoenix what-if makes the difference between missing seniority and missing headcount visible.

## Who has this problem?

The first user is a central workforce planner at a multi-facility health system; a system-level workforce or operations leader is the first buyer hypothesis. Today that team may reconcile rosters, job codes, local minimums, licenses, mobility preferences, and calls to managers to test an opening. A qualified person on a list may be the one keeping another unit above its floor, while a full headcount may still lack a charge or lead role. [AHA Fast Facts](https://www.aha.org/statistics/fast-facts-us-hospitals) reports 3,567 U.S. community hospitals in a health system. That is a market reach signal, not a customer or revenue claim. The same workflow may later serve other distributed job families; the live demo already models nonlicensed service roles.

## How does your app solve it?

The planner sets demand, sees a recommendation, then audits each proposed move and every source's before-and-after mix. In synthetic Tampa, 11 proposals are evaluated: 4 are blocked, 1 backfill is sequenced, and 0 modeled source sites end below their minimums. Orlando West starts with 7 RNs against a floor of 6, so one move is safe; another Charge RN move succeeds only after a float-pool RN backfills it. Tampa covers 7 of 8 positions and exposes the remaining gap. Orlando's service hub is ready now. Phoenix has 6 of 6 people but lacks the senior and lead mix until a conditional +24-month career checkpoint. Click **Try Phoenix +1 role**: demand becomes 7, coverage stays 6, and no promotion creates a new person. The differentiator demonstrated here is a network-level staffing answer with an auditable transfer sequence, rather than an isolated list of available employees. These metrics are synthetic demo outputs, not customer traction.

## How did you build it?

The shipped prototype is static HTML, CSS, and JavaScript with fictional data and a deterministic in-browser planner. It checks job family, skills, location or opt-in, destination-state RN authority where relevant, and source total/senior/lead minimums; it tries up to two backfill hops and explains every block. Career checkpoints use time in role, rating at least 3/5, recorded skills, and conditional approval and availability. Automated planner checks and browser walkthroughs cover all three scenarios and the seven-person Phoenix stress test. No account, API key, backend, runtime AI model, or Oracle database is needed. Production would require live HRIS, license, schedule, and approved policy data plus access controls and human sign-off. In a future pilot we would compare median time to a reviewer-accepted plan against the team's observed manual baseline and count source conflicts caught before approval; no pilot impact is claimed yet.

## Links

- **Demo:** https://akshaykamra92.github.io/oracle26ai-hackathon/
- **Repository:** https://github.com/akshaykamra92/oracle26ai-hackathon
- **Login:** None
- **Verification draft:** `AI_JUDGE_VERIFICATION_V2.json` (recheck against the portal's current Download Prompt before pasting)

## Spoken demo — 60 seconds

1. **0–10s:** “Opening a new site is a network decision. A transfer can uncover the team it came from.”
2. **10–28s:** Show Tampa: 11 proposals, 4 blocks, 1 backfill, 0 source-floor breaches, and the specific RN-12 → RN-02 move order.
3. **28–38s:** Show the honest one-person destination gap despite senior and charge coverage.
4. **38–46s:** Switch to Orlando: the same engine handles a nonlicensed family and says ready now.
5. **46–60s:** Switch to Phoenix: headcount is full but the role mix is not. The +24-month forecast is conditional. Click the +1 role button: seven positions still need seven people.
