# AI Judge submission record

**Event:** Oracle AI World Hackathon
**Team:** Neon Knights
**Project:** Can We Staff It?
**Submission:** version 1, accepted October 25, 2026; evaluation Run #3138
**Portal:** https://app.hacktheworldaway.org/
**Demo:** https://akshaykamra92.github.io/oracle26ai-hackathon/
**Repository:** https://github.com/akshaykamra92/oracle26ai-hackathon
**Video:** None supplied (optional)

## What did you build?

Can We Staff It? is an interactive workforce expansion planner for multi-site organizations, using fictional staff data. A planner sets the total headcount and senior, lead, or specialty mix required for a new site. The app finds feasible transfers, protects each source team’s modeled minimum, searches local backfill chains, and reports whether the opening is ready now, still short, or conditionally ready later. The live demo includes a Tampa RN unit and two nonlicensed service hubs in Orlando and Phoenix.

## Who has this problem?

Our first user is a central workforce planner at a multi-facility health system; operations and workforce leaders review the decision. Without this view, they reconcile spreadsheets, job codes, location limits, license status, and calls to local managers. An employee who appears available can leave a source team below its required coverage, while a full headcount can still lack a senior or lead role. That makes expansion plans slow to revise and hard to explain. The same planning problem can arise in geographically distributed service operations; our nonlicensed scenarios show the rules are not limited to nurses. Broader demand and willingness to pay still need validation.

## How does your app solve it?

The planner enters a destination role mix and sees a proposal → check → revise trail, source coverage before and after each move, and any remaining gap. In the Tampa RN scenario, Orlando West starts at 7 against a modeled floor of 6, so one RN moves directly. A Charge RN can move only after a local float-pool RN backfills that source. Other candidates are blocked by source coverage, geography, or Florida authority. Tampa fills 7 of 8 positions and honestly reports one gap. The same engine finds an Orlando nonlicensed hub ready now. Phoenix has all 6 people but lacks the needed senior and lead mix; a conditional career forecast first meets that mix at the April 2029 checkpoint. This makes an expansion decision traceable instead of hiding the downstream vacancy cascade.

## How did you build it?

We built the prototype with plain HTML, CSS, and JavaScript, fictional fixture data, and a deterministic planner running in the browser. It needs no account, backend, API key, or database. Candidate moves are checked against job family, required skills, geographic opt-in, valid destination-state RN authority when applicable, and source total/senior/lead minimums. The search tries up to two backfill hops and explains each accepted or blocked move. Career checkpoints use time in role, performance of at least 3/5, required skill, and conditional promotion approval and availability; promotion changes level, not headcount. Automated planner checks and the deployed browser demo verify the scenarios. This prototype does not use a runtime AI model or Oracle database; real HR data integration and operational validation would be the next step.

## Browser verification

The exact JSON submitted to AI Judge is in [AI_JUDGE_VERIFICATION.json](AI_JUDGE_VERIFICATION.json). It checks the Tampa transfer cascade, Orlando ready-now mix, Phoenix career forecast, and an edited seven-person demand. The app is public and requires no login.
