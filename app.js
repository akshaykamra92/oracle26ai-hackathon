"use strict";

const planner = window.WorkforcePlanner;
const $ = id => document.getElementById(id);
const codeNames = {
  RN1: "RN I", RN2: "RN II", CHARGE_RN: "Charge RN",
  ASSOCIATE: "Associate", SENIOR_ASSOCIATE: "Senior Associate", TEAM_LEAD: "Team Lead"
};
let latestSummary = "";

function node(tag, className, content) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (content !== undefined) item.textContent = content;
  return item;
}

function dateLabel(iso, months = 0) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + months, day));
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function applyScenario() {
  const scenario = planner.getScenario($("scenario-select").value);
  for (const key of ["total", "senior", "lead", "specialty"]) {
    $(key + "-input").value = scenario.demand[key];
  }
  $("opening-location").textContent = `${scenario.destination.metro}, ${scenario.destination.state} · ${dateLabel(scenario.openingDate)}`;
  $("specialty-field").hidden = scenario.destination.family !== "rn";
  $("scenario-context").textContent = scenario.destination.family === "rn"
    ? "RN I, RN II, and Charge RN share one licensed job family. Higher levels satisfy a senior or charge minimum while each person still fills only one total position. The rules are illustrative, not clinical standards."
    : "Associate, Senior Associate, and Team Lead share a nonlicensed service job family. The same planner checks role mix and source coverage without a nursing license rule.";
  run();
}

function readScenario() {
  const template = planner.getScenario($("scenario-select").value);
  const demand = {};
  for (const key of ["total", "senior", "lead", "specialty"]) {
    const raw = $(key + "-input").value;
    const value = Number(raw);
    if (raw.trim() === "" || !Number.isInteger(value) || value < 0 || value > 30) {
      throw new Error("Use whole-number requirements from 0 to 30.");
    }
    demand[key] = value;
  }
  if (template.destination.family !== "rn") demand.specialty = 0;
  if (demand.total < 1 || demand.senior > demand.total || demand.lead > demand.senior || demand.specialty > demand.total) {
    throw new Error("Total must be at least 1; senior and specialty cannot exceed total, and lead cannot exceed senior.");
  }
  return { ...template, demand };
}

function gapText(result) {
  if (!result.destinationDeficits.length) return "Every modeled minimum is met.";
  const labels = { total: "total headcount", senior: "senior coverage", lead: "lead/charge coverage", specialty: "rehab skill coverage" };
  return "The plan is below these modeled minimums: " + result.destinationDeficits.map(item => `${labels[item.key]} by ${item.missing}`).join(", ") + ".";
}

function renderExecutive(result, forecast) {
  const status = $("executive-status");
  const title = $("executive-title");
  const explanation = $("executive-explanation");
  const action = $("executive-action");
  const demand = result.scenario.demand;
  const have = result.destinationCoverage;
  const label = result.scenario.destination.family === "rn" ? "licensed RN" : "service";
  if (result.ready) {
    status.className = "status good";
    status.textContent = "READY AT OPENING";
    title.textContent = "The modeled workforce can open this location.";
    explanation.textContent = `${have.total} of ${demand.total} ${label} positions are covered, with ${have.senior} at senior level or higher and ${have.lead} in lead roles. Every source location remains at or above its required mix.`;
    action.textContent = "Executive signal: the available senior bench supports this opening under the synthetic rules. Review the proposed transfers and source stack before any real staffing decision.";
  } else if (forecast.earliest) {
    const months = forecast.earliest.months;
    status.className = "status wait";
    status.textContent = "WAIT FOR ROLE MIX";
    title.textContent = `A path to readiness appears at the ${dateLabel(result.scenario.openingDate, months)} checkpoint.`;
    explanation.textContent = `${have.total} of ${demand.total} positions are available at the proposed opening. ${gapText(result)} The first sampled checkpoint meeting every modeled minimum is +${months} months.`;
    action.textContent = "Executive signal: delay or add experienced hires. The forecast depends on tenure, a rating of at least 3/5, required skills, promotion approval, and continued availability.";
  } else if (result.headcountGap > 0) {
    status.className = "status risk";
    status.textContent = "CAPACITY GAP";
    title.textContent = "This opening needs another qualified source.";
    explanation.textContent = `${have.total} of ${demand.total} ${label} positions can be covered internally. ${gapText(result)} Approved transfers preserve all modeled source minimums.`;
    action.textContent = "Executive signal: seek additional qualified capacity or revise the opening plan. Career progression may improve the skill mix, but it does not create an extra person.";
  } else {
    status.className = "status risk";
    status.textContent = "ROLE MIX GAP";
    title.textContent = "The modeled mix is still incomplete.";
    explanation.textContent = `${gapText(result)} No sampled checkpoint through +36 months satisfies every requirement.`;
    action.textContent = "Executive signal: add an experienced hire, change the staffing requirement with proper review, or extend the forecast after verifying new career-path information.";
  }
}

function renderMetrics(result) {
  $("target-count").textContent = result.scenario.demand.total;
  $("selected-count").textContent = result.destinationCoverage.total;
  $("gap-count").textContent = result.headcountGap;
  $("backfill-count").textContent = result.backfillCount;
}

function renderMix(result) {
  const labels = {
    total: "Total people", senior: "Senior or higher", lead: result.scenario.destination.family === "rn" ? "Charge RN" : "Team Lead",
    specialty: "Rehab-skilled"
  };
  const keys = result.scenario.destination.family === "rn" ? ["total", "senior", "lead", "specialty"] : ["total", "senior", "lead"];
  const items = keys.map(key => {
    const count = result.destinationCoverage[key];
    const required = result.scenario.demand[key];
    const item = node("div", "mix-item" + (count < required ? " missing" : ""));
    item.append(node("span", "mix-label", labels[key]), node("strong", "mix-number", `${count} / ${required}`));
    const bar = node("progress", "mix-progress");
    bar.max = Math.max(1, required);
    bar.value = Math.min(count, bar.max);
    bar.setAttribute("aria-label", `${labels[key]}: ${count} of ${required} required`);
    item.append(bar, node("small", "", count < required ? `${required - count} below minimum` : "Minimum met"));
    return item;
  });
  $("mix-grid").replaceChildren(...items);
}

function renderDecisions(result) {
  const decisions = result.decisions;
  $("decision-count").textContent = `${decisions.filter(item => item.ok).length} approved · ${decisions.filter(item => !item.ok).length} blocked`;
  const siteNames = Object.fromEntries(planner.sites.map(site => [site.id, site.name]));
  siteNames[result.scenario.destination.id] = result.scenario.destination.name;
  const items = decisions.map((decision, index) => {
    const article = node("article", `decision ${decision.ok ? "accepted" : "rejected"}`);
    article.append(node("span", "decision-icon", decision.ok ? "✓" : "×"));
    const body = node("div", "decision-body");
    body.append(node("strong", "", `${String(index + 1).padStart(2, "0")} · ${decision.personId} · ${codeNames[decision.code]}`), node("p", "", decision.reason));
    if (decision.chain.length > 1) {
      const steps = decision.chain.slice().reverse().map(move => `${move.personId}: ${siteNames[move.from]} → ${siteNames[move.to]}`);
      body.append(node("p", "chain", `Move order: ${steps.join("; then ")}.`));
    }
    article.append(body, node("small", "decision-badge", decision.ok ? "APPROVED" : "BLOCKED"));
    return article;
  });
  $("decisions").replaceChildren(...items);
}

function stackCell(before, after, minimum) {
  const cell = node("td", before === after ? "" : "changed");
  cell.append(node("strong", "", before === after ? String(after) : `${before} → ${after}`), node("small", "", `min ${minimum}`));
  return cell;
}

function renderSites(result) {
  const rows = result.sourceCoverage.map(item => {
    const row = node("tr", item.deficits.length ? "site-deficit" : "");
    const name = node("td", "site-name");
    name.append(node("strong", "", item.site.name), node("small", "", `${item.site.metro}, ${item.site.state}`));
    row.append(name,
      stackCell(item.before.total, item.after.total, item.site.min.total),
      stackCell(item.before.senior, item.after.senior, item.site.min.senior),
      stackCell(item.before.lead, item.after.lead, item.site.min.lead));
    const room = node("td");
    room.append(node("span", `room${item.after.total === item.site.min.total ? " zero" : ""}`, String(item.after.total - item.site.min.total)));
    row.append(room);
    return row;
  });
  $("site-rows").replaceChildren(...rows);
}

function renderTimeline(forecast) {
  const first = forecast.earliest?.months;
  const items = forecast.checkpoints.map(result => {
    const item = node("div", `timepoint ${result.ready ? "ready" : "short"}${first === result.months ? " first-ready" : ""}`);
    const status = result.ready ? "Mix ready" : (result.headcountGap > 0 ? "People gap" : "Mix gap");
    item.append(node("span", "time-dot"), node("strong", "", result.months === 0 ? "OPENING" : `+${result.months} MO`), node("small", "", dateLabel(result.scenario.openingDate, result.months)), node("b", "", status));
    return item;
  });
  $("timeline").replaceChildren(...items);
}

function renderCareer(result) {
  const scenario = result.scenario;
  const people = planner.staff.filter(person =>
    person.movable && scenario.sourceSites.includes(person.siteId) &&
    (person.metro === scenario.destination.metro || person.mobility.includes(scenario.destination.metro)) &&
    (scenario.destination.family !== "rn" || person.licenses.some(license => license.state === scenario.destination.state && license.expires >= scenario.openingDate))
  ).sort((a, b) => b.score - a.score).slice(0, 7);
  const items = people.map(person => {
    const milestone = planner.nextMilestone(person);
    const item = node("article", "career-item");
    let title = `${person.id} · ${codeNames[person.code]}`;
    let detail;
    if (milestone.state === "timed") {
      title += ` → ${codeNames[milestone.next]}`;
      detail = `Potentially eligible in ${milestone.months} months · rating ${person.rating}/5${planner.LADDER[person.code].skill ? ` · ${planner.LADDER[person.code].skill} skill recorded` : ""}.`;
    } else if (milestone.state === "performance") {
      title += ` → ${codeNames[milestone.next]}`;
      detail = `Not projected: rating ${person.rating}/5 is below the 3/5 threshold.`;
    } else if (milestone.state === "skill") {
      title += ` → ${codeNames[milestone.next]}`;
      detail = `Not projected: ${milestone.skill} skill is not recorded.`;
    } else {
      detail = "Already at the modeled top level for this job family.";
    }
    item.append(node("strong", "", title), node("p", "", detail));
    return item;
  });
  $("career-list").replaceChildren(...items);
}

function renderForecastNote(result, forecast) {
  const note = $("forecast-explanation");
  if (result.ready) {
    note.textContent = "The modeled source network already meets the opening mix. Later milestones show development options, not extra positions. A senior person can satisfy both senior and total coverage, but remains one person.";
  } else if (forecast.earliest) {
    note.textContent = `At +${forecast.earliest.months} months, potential promotions produce enough senior and lead coverage in the first sampled ready checkpoint. This assumes ratings and skills remain valid, people stay available, and promotions are approved. It does not promise a future opening date.`;
  } else {
    note.textContent = "The planner finds no ready checkpoint within 36 months. Career progression changes job level, not total workforce size; any unfilled headcount requires another qualified source or hiring.";
  }
}

function renderOutcome(result, forecast) {
  const approved = result.decisions.filter(item => item.ok).map(item => item.personId);
  const blocked = result.decisions.filter(item => !item.ok).length;
  const family = result.scenario.destination.family === "rn" ? "RN" : "service";
  let summary = `${result.scenario.name}: ${result.destinationCoverage.total} of ${result.scenario.demand.total} ${family} positions covered at the proposed ${dateLabel(result.scenario.openingDate)} opening. ${gapText(result)} Source coverage is preserved with ${result.backfillCount} backfill move${result.backfillCount === 1 ? "" : "s"}; ${blocked} proposal${blocked === 1 ? "" : "s"} ${blocked === 1 ? "was" : "were"} blocked.`;
  if (!result.ready && forecast.earliest) summary += ` Conditional role-mix readiness first appears at the +${forecast.earliest.months}-month checkpoint.`;
  if (!result.ready && !forecast.earliest) summary += " The modeled workforce does not reach a fully ready checkpoint through +36 months.";
  $("outcome").textContent = summary;
  latestSummary = [
    "CAN WE STAFF IT? — Synthetic workforce scenario",
    `Scenario: ${result.scenario.name}; proposed opening ${dateLabel(result.scenario.openingDate)}`,
    `Demand: total ${result.scenario.demand.total}, senior ${result.scenario.demand.senior}, lead ${result.scenario.demand.lead}${result.scenario.destination.family === "rn" ? `, rehab-skilled ${result.scenario.demand.specialty}` : ""}`,
    `Destination coverage: total ${result.destinationCoverage.total}, senior ${result.destinationCoverage.senior}, lead ${result.destinationCoverage.lead}${result.scenario.destination.family === "rn" ? `, rehab-skilled ${result.destinationCoverage.specialty}` : ""}`,
    `Approved destination moves: ${approved.join(", ") || "none"}; backfill moves: ${result.backfillCount}; blocked proposals: ${blocked}`,
    `Headcount gap: ${result.headcountGap}; ready at opening: ${result.ready ? "yes" : "no"}`,
    `First sampled ready forecast: ${forecast.earliest ? `+${forecast.earliest.months} months` : "none through +36 months"}`,
    "All data and rules are fictional. Career predictions are conditional, not automatic promotions or real staffing decisions."
  ].join("\n");
}

function run() {
  try {
    const scenario = readScenario();
    const result = planner.planScenario(scenario, 0);
    const forecast = planner.forecast(scenario);
    $("input-error").hidden = true;
    renderExecutive(result, forecast);
    renderMetrics(result);
    renderMix(result);
    renderDecisions(result);
    renderSites(result);
    renderTimeline(forecast);
    renderCareer(result);
    renderForecastNote(result, forecast);
    renderOutcome(result, forecast);
  } catch (error) {
    $("input-error").textContent = error.message;
    $("input-error").hidden = false;
    latestSummary = "";
  }
}

$("scenario-select").addEventListener("change", applyScenario);
$("run-button").addEventListener("click", run);
for (const key of ["total", "senior", "lead", "specialty"]) $(key + "-input").addEventListener("input", run);
$("copy-button").addEventListener("click", async () => {
  if (!latestSummary) return;
  try {
    await navigator.clipboard.writeText(latestSummary);
    $("copy-button").textContent = "Copied ✓";
    window.setTimeout(() => { $("copy-button").textContent = "Copy summary"; }, 1800);
  } catch {
    $("input-error").textContent = "Clipboard access is unavailable in this browser. The plan is still visible above.";
    $("input-error").hidden = false;
  }
});
applyScenario();
