# Submission draft — team review before pasting into the hackathon portal

The [AI Judge portal](https://app.hacktheworldaway.org/) previously showed four written answers, a required Demo URL, optional repository and video URLs, and an optional verification JSON workflow. Recheck the live form before submitting. The copy below matches the current three-scenario standalone demo.

## Project title

**Can We Staff It?**

## One-line description

An auditable workforce expansion planner that shows who can move without uncovering another team and when the right role mix might become available.

## What did you build?

We built **Can We Staff It?**, a synthetic workforce expansion planner for multi-site organizations. A planner defines the total people and senior, lead, or specialty mix required at a new location. The app checks whether employees can move without dropping any existing source below its modeled minimum, searches short backfill chains, and gives an executive answer: ready at opening, additional capacity needed, or conditionally ready later. The live demo has a Tampa RN unit and two nonlicensed service hubs in Orlando and Phoenix.

## Who has this problem?

Our first user is a central workforce planner at a multi-facility health system, with an operations leader reviewing expansion decisions. A ranked list of qualified staff can hide the shortage a transfer creates elsewhere, and total headcount can hide a missing senior or lead role. The same planning pattern may help other distributed workforces; the service-hub scenarios demonstrate a nonlicensed job family, while broader market demand and buyer willingness to pay still need validation.

## How does your app solve it?

The planner enters a destination role mix and sees a proposal → check → revise trail, a before-and-after source stack, and the remaining gap. In the default Tampa scenario, Orlando West starts with 7 RNs against a fictional floor of 6, so one RN can move directly. A later Charge RN move succeeds only after a qualified RN from the local float pool backfills Orlando West. Another source move is blocked, as are a candidate without geographic opt-in and two without valid Florida authority at the proposed opening. The app covers 7 of 8 Tampa RN positions and reports one honest headcount gap. Orlando shows a ready nonlicensed senior bench. Phoenix has all 6 people but lacks senior and lead coverage at opening; a conditional career forecast first meets the mix at the +24-month sampled checkpoint.

## How did you build it?

The current prototype is plain HTML, CSS, and JavaScript with fictional data and a deterministic in-browser planner. It needs no account, backend, API key, or database. Candidate moves are checked against job family, skill, geography, RN destination-state authority when relevant, and source total/senior/lead minima. The planner tries up to two backfill hops and explains each block. Career milestones require 12 or 24 months in role, a rating of at least 3/5, and any required skill; future readiness remains conditional on approval and continued availability. The app does **not** currently use a runtime AI model or Oracle database, and its rules are not clinical standards. The scenarios and core guardrails are verified with automated planner checks and in a browser.

## Demo links

- **Demo URL (required in the previously observed form):** https://akshaykamra92.github.io/oracle26ai-hackathon/
- **Repo URL:** https://github.com/akshaykamra92/oracle26ai-hackathon
- **Video URL:** [ADD IF RECORDED]
- **Login required:** No.
- **Optional verification JSON:** Follow the portal's current **Download Prompt** instructions after the final URL and answers are set. Run the downloaded prompt against the actual app and paste its returned JSON; do not invent this object.

## 60-second spoken demo

1. **0–8s:** “Opening a new location is a network decision. Someone who looks free on paper may be protecting another team.”
2. **8–23s:** Show Tampa's 8-person RN demand. “Orlando West has 7 against a floor of 6, so this first move is allowed. The Charge RN move needs a backfill: the float-pool RN moves first, then the Charge RN.”
3. **23–36s:** Show the source-floor, geography, and license blocks. “The planner continues rather than hiding those conflicts.”
4. **36–43s:** Point to 7 of 8 Tampa roles covered and one genuine headcount gap.
5. **43–51s:** Switch to Orlando. “The same rules engine handles nonlicensed service roles; its senior bench makes the modeled hub ready.”
6. **51–60s:** Switch to Phoenix. “Headcount is full, but the senior/lead mix is not. A conditional career ladder suggests the +24-month checkpoint. Promotion changes level; it does not create headcount.”

## 30-second fallback

“Can We Staff It? tests whether a new location can draw staff without uncovering existing teams. Tampa shows a direct 7-to-6 move, a charge backfill chain, rejected ineligible moves, and a real one-RN gap. Orlando demonstrates the same planner for nonlicensed service staff who are ready now. Phoenix has enough people but lacks the senior mix; a conditional career ladder points to a later opening. All data is synthetic and the app runs directly in a browser.”

## Final team checks

- [ ] Recheck the portal deadline, required fields, and any sponsor technology requirement.
- [ ] Verify the deployed Pages site matches the final source and shows Tampa 7/8, Orlando 6/6 ready, and Phoenix first ready at +24 months.
- [ ] Have a teammate challenge the first buyer, the market claim, and the 60-second script.
- [ ] Record a video only if useful or required; add its URL if available.
- [ ] Generate the optional verification JSON from the portal's actual prompt after the final app is live.
- [ ] Submit only after the team chooses its final case statement and answers.
