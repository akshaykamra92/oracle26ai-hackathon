# Submission draft — confirm portal fields before posting

The hackathon portal's submission form was not visible without signing in when this draft was prepared. Copy only the fields it actually requests, and replace bracketed placeholders.

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
- Live demo: [ADD IF DEPLOYED]
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

- [ ] Confirm the portal's exact required fields, deadline, and any sponsor technology rule.
- [ ] Run the default scenario and verify 8 target / 6 approved / 4 rejected / 2 gap.
- [ ] Confirm source code is pushed and visible to the team.
- [ ] Add a live demo or short screen recording if the portal requests one.
- [ ] Remove or update any AI/Oracle claims that do not match the final code.
- [ ] Have a teammate explain how the rule engine blocks a transfer.
