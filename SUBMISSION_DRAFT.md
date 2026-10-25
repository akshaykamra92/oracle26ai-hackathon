# Submission draft — Oracle AI World Hackathon portal

The signed-in contestant form asks for four written answers, a required **Demo URL**, an optional repo URL and video URL, and an optional verification JSON response. It says a new submission automatically starts evaluation. The text below is ready to paste after the team reviews it.

## What did you build?

We built **Can We Staff It?**, a standalone staffing scenario planner. For a proposed 40-bed rehab unit in Tampa, it ranks synthetic RN candidates, checks each proposed move against the source unit's modeled staffing floor and destination-state license, and records why a move is accepted or rejected. The default scenario covers 6 of 8 RN positions and reports an honest gap of 2.

## Who has this problem?

The first user is a workforce planner or nursing operations leader evaluating whether a new unit can draw staff from existing units. In a spreadsheet-based planning exercise, they must compare candidate skills with source-unit coverage and license status, then recalculate when a transfer fails a rule. The same problem can recur at health systems considering new units, service lines, or transfers across facilities. This prototype illustrates the workflow; the team has not yet validated demand with prospective buyers.

## How does your app solve it?

Before using the app, a planner may see a list of strong candidates but miss what their departure does to other units. In the demo, they enter the new unit's beds and RN threshold, press **Build staffing plan**, and see a proposal → check → revise trail. A high-scoring RN is rejected because Orlando West would drop from its modeled floor of 6 to 5. Expired and wrong-state licenses are also rejected. The final view shows approved moves, source-unit margins, the remaining gap, and a future career pathway kept separate from current coverage.

## How did you build it?

The current app is plain HTML, CSS, and JavaScript. It runs in a browser with synthetic data and a deterministic rules engine; no backend, live AI model, Oracle database, or login is required. Candidates are considered in rehab-score order. Each move is approved only if the RN license matches Florida, is current, and leaves the source unit at or above its illustrative floor. The decision trail is generated from these checks, not prerecorded. We verified the default 8 / 6 / 4 / 2 result and an alternate 20-bed scenario in a browser. A future version could connect validated shift rosters and policy rules to a database.

## Portal links and verification

- **Demo URL (required):** https://akshaykamra92.github.io/oracle26ai-hackathon/
- **Repo URL (optional):** https://github.com/akshaykamra92/oracle26ai-hackathon
- **Video URL (optional):** [ADD IF RECORDED]
- **App uses login:** No.
- **Verification JSON (optional):** The portal instructs contestants to fill the fields first, click **Download Prompt**, run that prompt in an AI tool, and paste the full returned JSON object. Generate this from the final live demo URL; do not invent the JSON.

The visible rubric weights are **problem severity 25%**, **target customer and market scope 20%**, **solution fit and design 20%**, **technical execution and demo proof 20%**, and **differentiation and investment readiness 15%**. The team should prioritize a working live link and a specific user story before claiming market size or production readiness.

## Project title

Can We Staff It?

## One-line description

A transparent staffing scenario planner that rejects internal transfers when they would breach a modeled source-unit coverage floor or destination-license rule.

## Problem

Opening a new healthcare unit creates demand for staff, but moving people from existing units can create a new shortage. A candidate's skills alone are not enough: planners must see the effect on the source unit and verify destination-state licensure.

## Solution and demo

Our standalone prototype models a proposed 40-bed rehab unit in Tampa. It ranks fictional RN candidates, checks each proposed transfer against synthetic coverage and license rules, records the reason for every rejection, and continues searching. In the default scenario, the new unit needs 8 RN positions on one modeled shift. The planner approves 6 transfers, rejects 4 proposals, and reports a remaining 2-RN gap. It shows a separate possible career pathway without counting unlicensed staff toward today's coverage.

## Technology and AI disclosure

The running demo is plain HTML, CSS, and JavaScript with a deterministic in-browser rules engine and synthetic data. It needs no database, backend, deployment service, or API key. GPT-6.1 Sol was used/recommended as a development assistant **only if your team actually uses it**. The submitted prototype does not currently call an AI model or Oracle database. Update this paragraph if the implementation changes.

## Links

- Source: https://github.com/akshaykamra92/oracle26ai-hackathon
- Live demo: https://akshaykamra92.github.io/oracle26ai-hackathon/
- Video: [ADD IF RECORDED]

## 60-second live demo script

1. **0–10s:** “We want to open a 40-bed Tampa rehab unit. A simple ranking of our best nurses could damage other units.”
2. **10–25s:** Show 8 required RN positions and the source-unit floors. Press **Build staffing plan**.
3. **25–40s:** Show RN-01 accepted, then RN-02 rejected: Orlando West would drop to 5 RNs but needs 6. Point out the expired and wrong-state license rejections.
4. **40–52s:** Show the completed result: 6 approved moves, 2 immediate openings, and source-unit coverage preserved under the model.
5. **52–60s:** “A possible LPN-to-RN career path appears separately because someone awaiting education and licensure cannot fill today's RN gap.”

## 30-second fallback

“We built a synthetic staffing scenario planner. It ranks internal candidates, checks each transfer before accepting it, and visibly rejects a high-scoring RN because moving them would break their current unit's floor. The default 40-bed Tampa scenario covers 6 of 8 RN positions, leaving an honest gap of 2. It also distinguishes future career candidates from staff qualified today.”

## Submission checks

- [x] Confirm the portal's required form fields and visible judging rubric.
- [ ] Confirm the event deadline and any sponsor technology rule.
- [x] Run the default scenario and verify 8 target / 6 approved / 4 rejected / 2 gap.
- [x] Confirm source code is pushed and visible to the team.
- [x] Verify the GitHub Pages live demo URL; paste it into the required portal field when the team submits.
- [ ] Remove or update any AI/Oracle claims that do not match the final code.
- [ ] Have a teammate explain how the rule engine blocks a transfer.
- [ ] After the form fields are filled, use the portal's **Download Prompt** workflow if the team wants the optional verification JSON.
