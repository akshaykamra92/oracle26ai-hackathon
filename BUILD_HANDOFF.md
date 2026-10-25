# Copy-ready prompts for other Codex chats

## Model choice

Use **GPT-6.1 Sol, medium reasoning** for the coding chat. It is a good fit for a coordinated deliverable with limited time. Use **GPT-6 Astra, medium reasoning** only if the team needs a deeper product or architecture review. The shipped prototype has no runtime model or API calls. See [OpenAI model selection](https://developers.openai.com/api/docs/guides/model-selection) and the [model catalog](https://developers.openai.com/api/docs/models). Model availability depends on the user's account or product.

## Prompt A — continue the standalone build

Copy this into a Codex chat using GPT-6.1 Sol at medium reasoning:

```text
You are continuing a two-hour hackathon prototype in the repository https://github.com/akshaykamra92/oracle26ai-hackathon. Its live demo is https://akshaykamra92.github.io/oracle26ai-hackathon/. Read README.md, TEAM_BRIEF.md, index.html, styles.css, and app.js before editing.

The product is “Can We Staff It?”, a standalone HTML/CSS/JS staffing scenario planner using only synthetic data. Its default demo must show a Tampa rehab unit requiring 8 RN positions, 6 rule-approved transfers, 4 rejected proposals, and a 2-RN gap. A second candidate from Orlando West must fail the source-unit floor check. Expired and wrong-state licenses must fail. Potential LPN-to-RN pathway candidates must not count as current RN coverage.

Your task: [INSERT ONE CONCRETE FEATURE OR FIX HERE].

Keep the app runnable by opening index.html, with no required database, API key, or build step. Preserve explicit labels that the data and staffing ratios are illustrative and that no live Oracle or AI model is in the shipped demo. Do not introduce real personal or patient data. Prefer the smallest change that improves the live demonstration. Check JavaScript syntax, run the scenario in a browser, inspect the resulting counts and decision trail, and update README.md if behavior changes. Commit and push a verified milestone to the repository without force-pushing. Report the commit and any unresolved issue.
```

## Prompt B — pitch and submission polish

Use GPT-6.1 Sol at medium reasoning after the final demo works:

```text
Read README.md, TEAM_BRIEF.md, SUBMISSION_DRAFT.md, and the actual running app in https://github.com/akshaykamra92/oracle26ai-hackathon. Write a concise hackathon submission that accurately describes only features visible in the running app. Lead with the problem, the database/rules-engine distinction, the rejection-and-revision demo moment, and the measurable default result. Do not claim the prototype uses Oracle, a live model, real clinical rules, or a production database unless those have been added and verified. Provide a 60-second spoken demo script and a 30-second fallback. Leave unknown event fields as clearly marked placeholders. Update SUBMISSION_DRAFT.md and commit/push the verified document.
```

## Prompt C — optional Oracle extension after the standalone demo

Use GPT-6.1 Sol at high reasoning only if an Oracle 26ai instance and enough time are confirmed:

```text
The standalone app in this repository already works. Your job is to design a small, optional Oracle AI Database 26ai extension without disrupting it. First verify a saved SQLcl MCP connection, database version, privileges, and property-graph support. Do not ask for credentials or place them in the repository. Use only synthetic data and prefix new database objects WT_. Provide a replayable sql/ directory and one verified GRAPH_TABLE query that finds candidate RNs through employee→unit and employee→skill relationships.

Do not assume CREATE ASSERTION can enforce the proposed ratio or current-date license rules: Oracle assertions prohibit aggregation and SYSDATE. Research the supported mechanism in the connected instance, then implement and verify only if feasible. Never describe an unverified database feature as completed. Keep the standalone HTML demo as the reliable fallback. Commit and push only tested changes.
```
