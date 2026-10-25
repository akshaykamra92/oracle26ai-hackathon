# AI Judge version 2 submission record

**Event:** Oracle AI World Hackathon  
**Team:** Neon Knights  
**Submission:** version 2, accepted October 25, 2026; evaluation Run #3157  
**Status at submission:** queued; score pending  
**Source commit:** `7c01bb5`  
**Demo:** https://akshaykamra92.github.io/oracle26ai-hackathon/  
**Repository:** https://github.com/akshaykamra92/oracle26ai-hackathon

The answers below are copied from the portal-generated verification prompt after the form was filled. The exact browser contract pasted into the portal is [AI_JUDGE_VERIFICATION_V2.json](AI_JUDGE_VERIFICATION_V2.json).

## What did you build?

Can We Staff It? is a public, interactive workforce expansion planner for multi-site organizations. A planner sets total headcount and senior, lead, or specialty requirements for a new site. The app tests transfers against the vacancy each move creates at the source, finds short ordered backfill chains, and shows an executive answer with an auditable decision trail. Three fictional demos cover a Tampa RN unit and Orlando and Phoenix nonlicensed service hubs. An evidence strip counts proposals, blocks, backfills, and source-floor breaches in each run; a guided Phoenix what-if makes the difference between missing seniority and missing headcount visible.

## Who has this problem?

Our first user is a central workforce planner at a multi-facility health system; the buyer hypothesis is a system-level workforce or operations leader. Today they reconcile rosters, job codes, local minimums, licenses, mobility, and calls to managers. A person who looks available may be protecting another unit. AHA Fast Facts reports 3,567 U.S. community hospitals in a health system: a reach signal, not traction or contract count. The nonlicensed service demo shows an expansion path to other job families.

## How does your app solve it?

Before: a planner ranks employees, then manually discovers which source teams a transfer would uncover. After: they set the new site’s role mix and inspect a network-level plan with every accepted or blocked move and source stack. In fictional Tampa, 11 proposals yield 4 blocks, 1 ordered backfill, 0 modeled source-floor breaches, and 7 of 8 positions covered. Orlando is ready now. Phoenix has full headcount but lacks senior and lead roles until a conditional +24-month checkpoint. The guided +1 role button proves promotion does not add a person. These are demo outputs, not customer impact.

## How did you build it?

The shipped prototype is static HTML, CSS, and JavaScript with fictional rosters and a deterministic in-browser planner. It checks job family, skills, geography or opt-in, RN authority where relevant, and source total/senior/lead minimums. It searches short backfill chains and shows a conditional career forecast based on tenure, rating at least 3/5, and skills. Six automated planner checks and browser walkthroughs verify the demos. Production needs live HRIS, license, schedule, policy, access-control, and human approval workflows. There is no runtime AI model or Oracle database yet. A future pilot would measure time to an accepted plan and source conflicts caught against the team’s manual baseline.

