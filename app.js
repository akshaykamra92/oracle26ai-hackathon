"use strict";

// Synthetic single-shift roster. IDs deliberately do not resemble real people.
const units = [
  { id: "ORL-W", name: "Orlando West", beds: 30, ratio: 2, rns: 7 },
  { id: "ORL-I", name: "Orlando ICU", beds: 20, ratio: 2.5, rns: 5 },
  { id: "JAX-R", name: "Jacksonville Rehab", beds: 30, ratio: 2, rns: 10 },
  { id: "GAI-M", name: "Gainesville Med", beds: 30, ratio: 2, rns: 9 },
  { id: "TAL-O", name: "Tallahassee Ortho", beds: 30, ratio: 2, rns: 8 }
];

const candidates = [
  { id: "RN-01", unit: "ORL-W", rehab: 98, license: "FL", expires: "2035-12-31" },
  { id: "RN-02", unit: "ORL-W", rehab: 97, license: "FL", expires: "2035-12-31" },
  { id: "RN-03", unit: "ORL-I", rehab: 96, license: "FL", expires: "2035-12-31" },
  { id: "RN-04", unit: "JAX-R", rehab: 95, license: "FL", expires: "2020-01-01" },
  { id: "RN-05", unit: "GAI-M", rehab: 94, license: "GA", expires: "2035-12-31" },
  { id: "RN-06", unit: "JAX-R", rehab: 93, license: "FL", expires: "2035-12-31" },
  { id: "RN-07", unit: "JAX-R", rehab: 92, license: "FL", expires: "2035-12-31" },
  { id: "RN-08", unit: "GAI-M", rehab: 91, license: "FL", expires: "2035-12-31" },
  { id: "RN-09", unit: "GAI-M", rehab: 90, license: "FL", expires: "2035-12-31" },
  { id: "RN-10", unit: "TAL-O", rehab: 89, license: "FL", expires: "2035-12-31" }
];

const careerPipeline = [
  { id: "LPN-01", path: "LPN → RN", education: "RN bridge in progress", earliestMonths: 5, license: "Pending" },
  { id: "LPN-02", path: "LPN → RN", education: "RN bridge not started", earliestMonths: 18, license: "Not eligible" }
];

const $ = id => document.getElementById(id);
const floor = unit => Math.ceil(unit.beds / 10 * unit.ratio);
const asOf = new Date();
const asOfYmd = [asOf.getFullYear(), String(asOf.getMonth() + 1).padStart(2, "0"), String(asOf.getDate()).padStart(2, "0")].join("-");
let latestSummary = "";
let hasRun = false;

function readScenario() {
  const beds = Number($("beds").value);
  const ratio = Number($("ratio").value);
  if (!Number.isFinite(beds) || beds < 10 || beds > 80 || !Number.isFinite(ratio) || ratio < 0.5 || ratio > 4) {
    throw new Error("Enter 10–80 beds and a ratio from 0.5–4 RNs per 10 beds.");
  }
  return { beds, ratio, target: Math.ceil(beds / 10 * ratio) };
}

function evaluate(candidate, projected) {
  const source = units.find(unit => unit.id === candidate.unit);
  if (candidate.license !== "FL") {
    return { ok: false, reason: `License rule: ${candidate.id} has ${candidate.license}, not a Florida RN license.` };
  }
  if (candidate.expires < asOfYmd) {
    return { ok: false, reason: `License rule: ${candidate.id}'s Florida RN license expired on ${candidate.expires}.` };
  }
  const after = projected[source.id] - 1;
  const minimum = floor(source);
  if (after < minimum) {
    return { ok: false, reason: `Coverage rule: ${source.name} would have ${after} RNs; its floor is ${minimum}.` };
  }
  projected[source.id] = after;
  return { ok: true, reason: `${source.name} remains at ${after} RNs; floor ${minimum}.` };
}

function plan(scenario) {
  const projected = Object.fromEntries(units.map(unit => [unit.id, unit.rns]));
  const decisions = [];
  const selected = [];
  for (const candidate of [...candidates].sort((a, b) => b.rehab - a.rehab)) {
    if (selected.length >= scenario.target) break;
    const result = evaluate(candidate, projected);
    decisions.push({ ...candidate, ...result });
    if (result.ok) selected.push(candidate);
  }
  return { selected, decisions, projected, gap: Math.max(0, scenario.target - selected.length) };
}

function renderUnits(projected = Object.fromEntries(units.map(unit => [unit.id, unit.rns]))) {
  $("unit-rows").replaceChildren(...units.map(unit => {
    const row = document.createElement("tr");
    const values = [unit.name, projected[unit.id], floor(unit)];
    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }
    const room = projected[unit.id] - floor(unit);
    const cell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `room${room === 0 ? " zero" : ""}`;
    badge.textContent = room;
    cell.appendChild(badge);
    row.appendChild(cell);
    return row;
  }));
}

function renderDecisions(decisions) {
  const nodes = decisions.map((decision, index) => {
    const article = document.createElement("article");
    article.className = `decision ${decision.ok ? "accepted" : "rejected"}`;
    const icon = document.createElement("span");
    icon.className = "decision-icon";
    icon.textContent = decision.ok ? "✓" : "×";
    const body = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = `${String(index + 1).padStart(2, "0")} · ${decision.id} · rehab score ${decision.rehab}`;
    const reason = document.createElement("p");
    reason.textContent = decision.reason;
    body.append(name, reason);
    const badge = document.createElement("small");
    badge.textContent = decision.ok ? "TRANSFER APPROVED" : "PROPOSAL REJECTED";
    article.append(icon, body, badge);
    return article;
  });
  $("decisions").replaceChildren(...nodes);
}

function renderOutcome(scenario, result) {
  const rejected = result.decisions.filter(item => !item.ok);
  const nearFloor = units.filter(unit => result.projected[unit.id] - floor(unit) <= 1).map(unit => unit.name);
  const nearTerm = careerPipeline.filter(person => person.earliestMonths <= 6);
  const outcome = $("outcome");
  outcome.className = "outcome-grid";
  outcome.replaceChildren();
  const main = document.createElement("div");
  main.className = "outcome-main";
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = "TODAY'S PLAN";
  const headline = document.createElement("strong");
  headline.textContent = `${result.selected.length} of ${scenario.target} RN positions covered`;
  const details = document.createElement("p");
  details.textContent = `${result.gap} remain open. ${rejected.length} proposed moves were rejected by the rules engine. ${nearFloor.length} source units are now within one RN of their floor.`;
  const roster = document.createElement("p");
  roster.textContent = `Approved: ${result.selected.map(person => person.id).join(", ") || "none"}.`;
  main.append(tag, headline, details, roster);
  const pipeline = document.createElement("div");
  pipeline.className = "pipeline";
  const pTitle = document.createElement("h3");
  pTitle.textContent = "Future career pipeline";
  const pText = document.createElement("p");
  pText.textContent = result.gap > 0
    ? `${nearTerm.length} synthetic LPN is in an RN bridge program with an earliest milestone within six months. Licensure is still pending, so this person does not count toward today's ${result.gap}-RN gap.`
    : `${nearTerm.length} synthetic LPN is in an RN bridge program with an earliest milestone within six months. Licensure is still pending, so this pathway is tracked for future capacity only.`;
  const pFoot = document.createElement("p");
  pFoot.textContent = `Immediate external or other qualified RN coverage needed: ${result.gap}. Longer-term need may change only after education and licensure are verified.`;
  pipeline.append(pTitle, pText, pFoot);
  outcome.append(main, pipeline);
  latestSummary = `CAN WE STAFF IT? — Synthetic scenario\nTampa rehab unit: ${scenario.beds} beds × ${scenario.ratio} RNs per 10 beds = ${scenario.target} RN positions on one modeled shift.\nApproved internal transfers: ${result.selected.length} (${result.selected.map(person => person.id).join(", ") || "none"}).\nRejected proposed transfers: ${rejected.length}.\nRemaining immediate gap: ${result.gap} RNs.\nSource units within one RN of their modeled floor: ${nearFloor.join(", ") || "none"}.\nCareer pipeline: ${nearTerm.length} potential LPN-to-RN pathway candidate within six months, subject to education and licensure; not counted as current coverage.\nAll data and rules are illustrative.`;
  $("copy-button").disabled = false;
}

function run() {
  try {
    const scenario = readScenario();
    const result = plan(scenario);
    $("target-count").textContent = scenario.target;
    $("selected-count").textContent = result.selected.length;
    $("gap-count").textContent = result.gap;
    $("rejected-count").textContent = result.decisions.filter(item => !item.ok).length;
    $("plan-status").textContent = "Plan checked";
    $("plan-status").classList.add("done");
    renderDecisions(result.decisions);
    renderUnits(result.projected);
    renderOutcome(scenario, result);
    hasRun = true;
  } catch (error) {
    window.alert(error.message);
  }
}

$("run-button").addEventListener("click", run);
$("copy-button").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(latestSummary);
    const button = $("copy-button");
    button.textContent = "Copied ✓";
    window.setTimeout(() => { button.textContent = "Copy summary"; }, 1800);
  } catch {
    window.alert("Clipboard access is unavailable here. Try serving the app on localhost.");
  }
});
for (const id of ["beds", "ratio"]) {
  $(id).addEventListener("input", () => {
    try {
      $("target-count").textContent = readScenario().target;
      if (hasRun) run();
    } catch {
      $("target-count").textContent = "—";
      $("selected-count").textContent = "—";
      $("gap-count").textContent = "—";
      $("rejected-count").textContent = "—";
      $("plan-status").textContent = "Check inputs";
      $("plan-status").classList.remove("done");
      $("decisions").textContent = "Enter valid scenario values, then build the plan.";
      $("outcome").className = "outcome-empty";
      $("outcome").textContent = "Run the scenario to see approved transfers and the remaining gap.";
      $("copy-button").disabled = true;
      latestSummary = "";
      renderUnits();
    }
  });
}
renderUnits();
