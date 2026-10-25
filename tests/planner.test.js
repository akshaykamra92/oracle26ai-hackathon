"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const planner = require("../planner.js");

test("Tampa counts a 7-to-6 direct move and sequences a charge backfill", () => {
  const result = planner.planScenario(planner.getScenario("tampa"), 0);
  const west = result.sourceCoverage.find(item => item.site.id === "ORL-W");
  const direct = result.decisions.find(item => item.personId === "RN-01");
  const charge = result.decisions.find(item => item.personId === "RN-02");
  assert.equal(west.before.total, 7);
  assert.equal(west.after.total, 6);
  assert.equal(west.site.min.total, 6);
  assert.equal(direct.ok, true);
  assert.equal(direct.chain.length, 1);
  assert.equal(charge.ok, true);
  assert.deepEqual(charge.chain.map(move => move.personId), ["RN-02", "RN-12"]);
  assert.equal(result.backfillCount, 1);
  assert.equal(result.destinationCoverage.total, 7);
  assert.equal(result.headcountGap, 1);
  assert.ok(result.sourceCoverage.every(item => item.deficits.length === 0));
});

test("Tampa blocks unsupported mobility, destination license, and source coverage", () => {
  const result = planner.planScenario(planner.getScenario("tampa"), 0);
  const rejected = Object.fromEntries(result.decisions.filter(item => !item.ok).map(item => [item.personId, item.reason]));
  assert.match(rejected["RN-11"], /Geography/);
  assert.match(rejected["RN-04"], /expires before/);
  assert.match(rejected["RN-05"], /no FL RN authority/);
  assert.match(rejected["RN-03"], /below its required mix/);
});

test("nonlicensed service hub is ready with senior and lead coverage", () => {
  const result = planner.planScenario(planner.getScenario("orlando"), 0);
  assert.equal(result.ready, true);
  assert.equal(result.destinationCoverage.total, 6);
  assert.ok(result.destinationCoverage.senior >= 2);
  assert.ok(result.destinationCoverage.lead >= 1);
  assert.equal(result.headcountGap, 0);
  assert.ok(result.sourceCoverage.every(item => item.deficits.length === 0));
});

test("Phoenix has headcount now but projected mix only at month 24", () => {
  const scenario = planner.getScenario("phoenix");
  const forecast = planner.forecast(scenario);
  assert.equal(forecast.checkpoints[0].headcountGap, 0);
  assert.equal(forecast.checkpoints[0].ready, false);
  assert.equal(forecast.checkpoints.find(item => item.months === 12).destinationCoverage.lead, 0);
  assert.equal(forecast.earliest.months, 24);
  const lowRated = planner.staff.find(person => person.id === "PHX-04");
  assert.equal(planner.projectedCode(lowRated, 36), "ASSOCIATE");
  const twoStep = { code: "ASSOCIATE", rating: 4, monthsInRole: 0, skills: ["leadership"] };
  assert.equal(planner.projectedCode(twoStep, 24), "SENIOR_ASSOCIATE");
  assert.equal(planner.projectedCode(twoStep, 36), "TEAM_LEAD");
});

test("career progression does not invent an extra employee", () => {
  const template = planner.getScenario("phoenix");
  const scenario = { ...template, demand: { ...template.demand, total: 7 } };
  const forecast = planner.forecast(scenario);
  assert.equal(forecast.earliest, null);
  assert.ok(forecast.checkpoints.every(item => item.destinationCoverage.total === 6));
  assert.ok(forecast.checkpoints.every(item => item.sourceCoverage.every(site => site.deficits.length === 0)));
});

test("a small custom opening reserves a slot for a feasible future lead", () => {
  const template = planner.getScenario("phoenix");
  const scenario = { ...template, demand: { total: 2, senior: 1, lead: 1, specialty: 0 } };
  const projected = planner.planScenario(scenario, 24);
  assert.equal(projected.ready, true);
  assert.equal(projected.destinationCoverage.total, 2);
  assert.equal(projected.destinationCoverage.lead, 1);
  assert.match(projected.decisions.find(item => item.personId === "PHX-02").reason, /reserving a destination slot/);
  assert.equal(projected.decisions.find(item => item.personId === "PHX-03").ok, true);
});
