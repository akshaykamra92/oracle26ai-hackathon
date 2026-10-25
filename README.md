# Can We Staff It?

A standalone, synthetic workforce planning demo for a two-hour hackathon build.

The demo asks whether a proposed 40-bed rehab unit in Tampa can draw registered nurses from existing units without violating *illustrative* source-unit coverage and destination-license rules. It ranks candidates by a synthetic rehab score, checks each proposed move, records rejections, revises the plan, and shows the immediate gap. A separate career panel shows a possible longer-term LPN-to-RN pathway without counting unlicensed staff as current RN coverage.

## Run

Open `index.html` in a browser. For clipboard support, serve the folder locally:

```sh
python3 -m http.server 8765
```

Then visit `http://localhost:8765` and press **Build staffing plan**. No installation, account, API key, or database is needed.

## Demo result with the default inputs

- New unit: 40 beds × 2 RNs per 10 beds = **8 RN positions** on one modeled shift.
- **6 proposed transfers approved**, **4 rejected**, **2 RN positions unfilled**.
- The first candidate from Orlando West is approved. The next is rejected because it would leave that source unit with 5 RNs against its modeled floor of 6. An expired Florida license and a non-Florida license also trigger rejections.
- One synthetic LPN is shown as a *potential* RN pathway candidate within six months, contingent on education and licensure. This person does not fill today's gap.

Change beds or the ratio to explore a different target. The candidate data and source unit floors remain fixed for a repeatable demo.

## How it works

`app.js` holds fictional units and staff IDs. A deterministic planner considers candidates in rehab-score order. Before accepting each move, it checks the destination-state RN license and the projected RN count of the source unit. Rejected moves never reduce the projected roster. The displayed decision trail comes from those checks, not from a prerecorded animation.

This is a **rules-engine prototype**, not a live AI agent or Oracle integration. GPT-6.1 Sol was recommended for building and iterating on the prototype; no model runs inside the shipped demo. The `oracle26ai-hackathon` repository name does not imply that Oracle is used by this version.

## Files

- `index.html`, `styles.css`, `app.js`: standalone demo.
- `TEAM_BRIEF.md`: case statement, scope, and success criteria.
- `BUILD_HANDOFF.md`: copy-ready prompts for another Codex chat.
- `SUBMISSION_DRAFT.md`: pitch text, demo script, and submission checklist.

## Limits

All people and rosters are synthetic. The ratios are invented for this demo and do not represent a legal standard or clinically adequate staffing. The app models one shift and one destination state. It does not account for schedules, FTE, nursing scope, compact licenses, specialty credentialing, or organizational approval. A real deployment would need validated policies, current licensure data, shift-level demand, privacy protections, and human review.

The original concept included Oracle AI Database 26ai property graphs and database-enforced rules. That remains a future integration path; this time-boxed version deliberately has no database. If Oracle features are added later, Oracle documents [SQL property graphs and `GRAPH_TABLE`](https://docs.oracle.com/en/database/oracle/property-graph/26.1/spgdg/sql-property-graphs.html). Oracle's [assertion restrictions](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/create-assertion.html) prohibit aggregation and `SYSDATE`, so the proposed ratio and current-license rules would need another implementation such as appropriate triggers or a validated transaction procedure.
