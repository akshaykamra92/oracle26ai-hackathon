"use strict";

// Everything here is fictional and runs locally. Requirements are illustrative.
(function (root) {
  const LEVEL = {
    RN1: 1, RN2: 2, CHARGE_RN: 3,
    ASSOCIATE: 1, SENIOR_ASSOCIATE: 2, TEAM_LEAD: 3
  };
  const FAMILY = {
    RN1: "rn", RN2: "rn", CHARGE_RN: "rn",
    ASSOCIATE: "service", SENIOR_ASSOCIATE: "service", TEAM_LEAD: "service"
  };
  const LADDER = {
    RN1: { next: "RN2", months: 24, rating: 3, skill: "advanced" },
    RN2: { next: "CHARGE_RN", months: 24, rating: 3, skill: "leadership" },
    ASSOCIATE: { next: "SENIOR_ASSOCIATE", months: 12, rating: 3 },
    SENIOR_ASSOCIATE: { next: "TEAM_LEAD", months: 24, rating: 3, skill: "leadership" }
  };

  const sites = [
    { id: "ORL-W", name: "Orlando West", metro: "Orlando", state: "FL", family: "rn", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "ORL-I", name: "Orlando ICU", metro: "Orlando", state: "FL", family: "rn", min: { total: 5, senior: 1, lead: 1, specialty: 0 } },
    { id: "ORL-F", name: "Orlando Float Pool", metro: "Orlando", state: "FL", family: "rn", min: { total: 0, senior: 0, lead: 0, specialty: 0 } },
    { id: "JAX-R", name: "Jacksonville Rehab", metro: "Jacksonville", state: "FL", family: "rn", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "GAI-M", name: "Gainesville Med", metro: "Gainesville", state: "FL", family: "rn", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "TAL-O", name: "Tallahassee Ortho", metro: "Tallahassee", state: "FL", family: "rn", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "ATL-M", name: "Atlanta Med", metro: "Atlanta", state: "GA", family: "rn", min: { total: 3, senior: 1, lead: 1, specialty: 0 } },
    { id: "NYC-M", name: "New York Med", metro: "New York", state: "NY", family: "rn", min: { total: 2, senior: 1, lead: 1, specialty: 0 } },
    { id: "ORL-N", name: "Orlando Service North", metro: "Orlando", state: "FL", family: "service", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "ORL-S", name: "Orlando Service South", metro: "Orlando", state: "FL", family: "service", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "ORL-C", name: "Orlando Service Central", metro: "Orlando", state: "FL", family: "service", min: { total: 6, senior: 1, lead: 1, specialty: 0 } },
    { id: "PHX-E", name: "Phoenix Service East", metro: "Phoenix", state: "AZ", family: "service", min: { total: 5, senior: 1, lead: 1, specialty: 0 } },
    { id: "PHX-W", name: "Phoenix Service West", metro: "Phoenix", state: "AZ", family: "service", min: { total: 5, senior: 1, lead: 1, specialty: 0 } }
  ];

  const scenarios = [
    {
      id: "tampa",
      name: "Tampa rehab unit",
      subtitle: "Clinical mix · licensed RN family",
      destination: { id: "TAMPA", name: "New Tampa Rehab", metro: "Tampa", state: "FL", family: "rn", entrySkill: "rehab" },
      openingDate: "2027-04-01",
      demand: { total: 8, senior: 2, lead: 1, specialty: 2 },
      specialty: "rehab",
      sourceSites: ["ORL-W", "ORL-I", "ORL-F", "JAX-R", "GAI-M", "TAL-O", "ATL-M", "NYC-M"]
    },
    {
      id: "orlando",
      name: "Orlando service hub",
      subtitle: "Nonlicensed mix · senior bench ready",
      destination: { id: "ORL-HUB", name: "New Orlando Service Hub", metro: "Orlando", state: "FL", family: "service" },
      openingDate: "2027-04-01",
      demand: { total: 6, senior: 2, lead: 1, specialty: 0 },
      sourceSites: ["ORL-N", "ORL-S", "ORL-C"]
    },
    {
      id: "phoenix",
      name: "Phoenix service hub",
      subtitle: "Nonlicensed mix · early career bench",
      destination: { id: "PHX-HUB", name: "New Phoenix Service Hub", metro: "Phoenix", state: "AZ", family: "service" },
      openingDate: "2027-04-01",
      demand: { total: 6, senior: 2, lead: 1, specialty: 0 },
      sourceSites: ["PHX-E", "PHX-W"]
    }
  ];

  const siteById = Object.fromEntries(sites.map(site => [site.id, site]));
  const staff = [];
  function add(id, siteId, code, score, options) {
    const opts = options || {};
    const site = siteById[siteId];
    staff.push({
      id, siteId, code, family: FAMILY[code], metro: site.metro,
      score: score || 0,
      skills: opts.skills || [],
      licenses: opts.licenses || (FAMILY[code] === "rn" ? [{ state: site.state, expires: "2035-12-31" }] : []),
      mobility: opts.mobility || [],
      movable: Boolean(opts.movable),
      showInSearch: opts.showInSearch || [],
      rating: opts.rating === undefined ? 3 : opts.rating,
      monthsInRole: opts.monthsInRole === undefined ? 0 : opts.monthsInRole
    });
  }
  function fillers(site, code, count, options) {
    for (let i = 1; i <= count; i += 1) {
      // Baseline coverage is counted, but unnamed filler staff are not forecast as promotions.
      add(site + "-BASE-" + code + "-" + i, site, code, 0, { rating: 0, ...options });
    }
  }
  const fl = [{ state: "FL", expires: "2035-12-31" }];
  const floridaMove = { movable: true, mobility: ["Tampa"], licenses: fl, skills: ["rehab"] };

  add("RN-01", "ORL-W", "RN2", 98, { ...floridaMove, rating: 4, monthsInRole: 10 });
  add("RN-02", "ORL-W", "CHARGE_RN", 97, { ...floridaMove, skills: ["rehab", "leadership"], rating: 4, monthsInRole: 25 });
  fillers("ORL-W", "RN1", 5);
  add("RN-03", "ORL-I", "RN2", 96, floridaMove);
  fillers("ORL-I", "CHARGE_RN", 1);
  fillers("ORL-I", "RN2", 1);
  fillers("ORL-I", "RN1", 2);
  add("RN-12", "ORL-F", "CHARGE_RN", 25, { movable: true, skills: ["leadership"], rating: 4, monthsInRole: 18 });
  add("RN-06", "JAX-R", "RN2", 93, floridaMove);
  add("RN-07", "JAX-R", "RN1", 92, { ...floridaMove, skills: ["rehab", "advanced"], rating: 4, monthsInRole: 16 });
  fillers("JAX-R", "CHARGE_RN", 1);
  fillers("JAX-R", "RN2", 1);
  fillers("JAX-R", "RN1", 6);
  add("RN-08", "GAI-M", "RN1", 91, floridaMove);
  add("RN-09", "GAI-M", "RN1", 90, floridaMove);
  fillers("GAI-M", "CHARGE_RN", 1);
  fillers("GAI-M", "RN2", 1);
  fillers("GAI-M", "RN1", 5);
  add("RN-10", "TAL-O", "CHARGE_RN", 89, { ...floridaMove, skills: ["rehab", "leadership"] });
  fillers("TAL-O", "CHARGE_RN", 1);
  fillers("TAL-O", "RN2", 1);
  fillers("TAL-O", "RN1", 5);
  add("RN-04", "ATL-M", "RN2", 95, {
    movable: true, mobility: ["Tampa"], skills: ["rehab"],
    licenses: [{ state: "GA", expires: "2035-12-31" }, { state: "FL", expires: "2027-01-31" }]
  });
  add("RN-05", "ATL-M", "RN2", 94, {
    movable: true, mobility: ["Tampa"], skills: ["rehab"],
    licenses: [{ state: "GA", expires: "2035-12-31" }]
  });
  fillers("ATL-M", "CHARGE_RN", 1);
  fillers("ATL-M", "RN1", 2);
  add("RN-11", "NYC-M", "CHARGE_RN", 96.5, {
    movable: true, showInSearch: ["tampa"], skills: ["rehab", "leadership"],
    licenses: [{ state: "NY", expires: "2035-12-31" }]
  });
  fillers("NYC-M", "CHARGE_RN", 1);
  fillers("NYC-M", "RN1", 2);

  add("OPS-01", "ORL-N", "TEAM_LEAD", 90, { movable: true, skills: ["leadership"], rating: 4, monthsInRole: 28 });
  add("OPS-02", "ORL-N", "SENIOR_ASSOCIATE", 89, { movable: true, rating: 4, monthsInRole: 12 });
  fillers("ORL-N", "TEAM_LEAD", 1);
  fillers("ORL-N", "SENIOR_ASSOCIATE", 1);
  fillers("ORL-N", "ASSOCIATE", 4);
  add("OPS-03", "ORL-S", "SENIOR_ASSOCIATE", 88, { movable: true, rating: 3, monthsInRole: 12 });
  add("OPS-04", "ORL-S", "ASSOCIATE", 87, { movable: true, rating: 4, monthsInRole: 6 });
  fillers("ORL-S", "TEAM_LEAD", 1);
  fillers("ORL-S", "SENIOR_ASSOCIATE", 1);
  fillers("ORL-S", "ASSOCIATE", 4);
  add("OPS-05", "ORL-C", "ASSOCIATE", 86, { movable: true, rating: 4, monthsInRole: 5 });
  add("OPS-06", "ORL-C", "ASSOCIATE", 85, { movable: true, rating: 3, monthsInRole: 4 });
  fillers("ORL-C", "TEAM_LEAD", 1);
  fillers("ORL-C", "SENIOR_ASSOCIATE", 1);
  fillers("ORL-C", "ASSOCIATE", 4);

  add("PHX-01", "PHX-E", "ASSOCIATE", 80, { movable: true, rating: 4, monthsInRole: 0 });
  add("PHX-02", "PHX-E", "ASSOCIATE", 79, { movable: true, rating: 3, monthsInRole: 0 });
  add("PHX-03", "PHX-E", "SENIOR_ASSOCIATE", 78, { movable: true, rating: 4, monthsInRole: 0, skills: ["leadership"] });
  fillers("PHX-E", "TEAM_LEAD", 1);
  fillers("PHX-E", "SENIOR_ASSOCIATE", 1);
  fillers("PHX-E", "ASSOCIATE", 3);
  add("PHX-04", "PHX-W", "ASSOCIATE", 77, { movable: true, rating: 2, monthsInRole: 0 });
  add("PHX-05", "PHX-W", "ASSOCIATE", 76, { movable: true, rating: 3, monthsInRole: 0 });
  add("PHX-06", "PHX-W", "ASSOCIATE", 75, { movable: true, rating: 4, monthsInRole: 0 });
  fillers("PHX-W", "TEAM_LEAD", 1);
  fillers("PHX-W", "SENIOR_ASSOCIATE", 1);
  fillers("PHX-W", "ASSOCIATE", 3);

  const personById = Object.fromEntries(staff.map(person => [person.id, person]));

  function projectedCode(person, months) {
    if (months <= 0) return person.code;
    let code = person.code;
    let timeLeft = months;
    let tenure = person.monthsInRole;
    for (let step = 0; step < 2; step += 1) {
      const rule = LADDER[code];
      if (!rule || person.rating < rule.rating || (rule.skill && !person.skills.includes(rule.skill))) break;
      const wait = Math.max(0, rule.months - tenure);
      if (timeLeft < wait) break;
      timeLeft -= wait;
      code = rule.next;
      tenure = 0;
    }
    return code;
  }

  function nextMilestone(person) {
    const rule = LADDER[person.code];
    if (!rule) return { state: "top" };
    if (person.rating < rule.rating) return { state: "performance", next: rule.next, minRating: rule.rating };
    if (rule.skill && !person.skills.includes(rule.skill)) return { state: "skill", next: rule.next, skill: rule.skill };
    return { state: "timed", next: rule.next, months: Math.max(0, rule.months - person.monthsInRole) };
  }

  function getScenario(id) {
    return scenarios.find(scenario => scenario.id === id) || scenarios[0];
  }

  function dateAfterMonths(iso, months) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1 + months, day)).toISOString().slice(0, 10);
  }

  function requirementFor(site, scenario) {
    if (site.id === scenario.destination.id) {
      return { ...scenario.demand };
    }
    return site.min;
  }

  function coverage(site, assignments, codes, scenario) {
    const people = staff.filter(person => assignments[person.id] === site.id && person.family === site.family);
    const counts = { total: people.length, senior: 0, lead: 0, specialty: 0 };
    for (const person of people) {
      const level = LEVEL[codes[person.id]];
      if (level >= 2) counts.senior += 1;
      if (level >= 3) counts.lead += 1;
      if (scenario.specialty && person.skills.includes(scenario.specialty)) counts.specialty += 1;
    }
    return counts;
  }

  function deficits(site, assignments, codes, scenario) {
    const have = coverage(site, assignments, codes, scenario);
    const need = requirementFor(site, scenario);
    return Object.keys(need).filter(key => have[key] < need[key]).map(key => ({
      key, have: have[key], need: need[key], missing: need[key] - have[key]
    }));
  }

  function eligible(person, destination, code, scenario) {
    if (FAMILY[code] !== destination.family) return "Job family does not match the destination.";
    if (destination.entrySkill && !person.skills.includes(destination.entrySkill)) {
      return person.id + " lacks the destination's " + destination.entrySkill + " skill.";
    }
    if (person.metro !== destination.metro && !person.mobility.includes(destination.metro)) {
      return "Geography: " + person.id + " has not opted into a move to " + destination.metro + ".";
    }
    if (destination.family === "rn") {
      const license = person.licenses.find(item => item.state === destination.state);
      if (!license) return "License: " + person.id + " has no " + destination.state + " RN authority in the demo data.";
      if (license.expires < scenario.evaluationDate) {
        return "License: " + person.id + "'s " + destination.state + " license expires before the modeled " +
          (scenario.evaluationDate === scenario.openingDate ? "opening date." : "checkpoint date.");
      }
    }
    return "";
  }

  function sourceFailure(site, assignments, codes, scenario) {
    const gaps = deficits(site, assignments, codes, scenario);
    return gaps.map(gap => gap.key + " " + gap.have + "/" + gap.need).join(", ");
  }

  function planScenario(inputScenario, months) {
    const scenario = {
      ...inputScenario,
      demand: { ...inputScenario.demand },
      evaluationDate: dateAfterMonths(inputScenario.openingDate, months || 0)
    };
    const projectionMonths = months || 0;
    const codes = Object.fromEntries(staff.map(person => [person.id, projectedCode(person, projectionMonths)]));
    let assignments = Object.fromEntries(staff.map(person => [person.id, person.siteId]));
    const used = new Set();
    const decisions = [];
    const moves = [];
    const destination = scenario.destination;
    const sourceSites = scenario.sourceSites.map(id => siteById[id]);

    function repair(site, current, chainUsed, depth, visitedSites) {
      if (deficits(site, current, codes, scenario).length === 0) return { assignments: current, moves: [] };
      if (depth >= 2) return null;
      const choices = staff.filter(person =>
        person.movable && person.family === site.family &&
        !chainUsed.has(person.id) && !used.has(person.id) &&
        current[person.id] !== site.id && current[person.id] !== destination.id &&
        !visitedSites.has(current[person.id]) &&
        !eligible(person, site, codes[person.id], scenario)
      ).sort((a, b) => a.score - b.score);
      for (const person of choices) {
        const from = siteById[current[person.id]];
        const trial = { ...current, [person.id]: site.id };
        if (deficits(site, trial, codes, scenario).length > 0) continue;
        const nextUsed = new Set(chainUsed);
        nextUsed.add(person.id);
        const nextSites = new Set(visitedSites);
        nextSites.add(from.id);
        const continuation = repair(from, trial, nextUsed, depth + 1, nextSites);
        if (continuation) {
          return {
            assignments: continuation.assignments,
            moves: [{ personId: person.id, from: from.id, to: site.id, backfill: true }, ...continuation.moves]
          };
        }
      }
      return null;
    }

    const candidates = staff.filter(person =>
      person.movable && person.family === destination.family &&
      scenario.sourceSites.includes(person.siteId) &&
      (person.metro === destination.metro ||
        person.mobility.includes(destination.metro) ||
        person.showInSearch.includes(scenario.id))
    ).sort((a, b) => b.score - a.score);

    function reservedForRole(person) {
      const before = coverage(destination, assignments, codes, scenario);
      const remainingSlots = scenario.demand.total - before.total - 1;
      const level = LEVEL[codes[person.id]];
      const after = {
        senior: before.senior + (level >= 2 ? 1 : 0),
        lead: before.lead + (level >= 3 ? 1 : 0),
        specialty: before.specialty + (scenario.specialty && person.skills.includes(scenario.specialty) ? 1 : 0)
      };
      const labels = { senior: "senior", lead: "lead/charge", specialty: "specialty-qualified" };
      for (const key of ["lead", "senior", "specialty"]) {
        if (scenario.demand[key] <= after[key] + remainingSlots) continue;
        const alternative = candidates.find(other => {
          if (other.id === person.id || used.has(other.id) || eligible(other, destination, codes[other.id], scenario)) return false;
          const otherLevel = LEVEL[codes[other.id]];
          if (key === "senior" && otherLevel < 2) return false;
          if (key === "lead" && otherLevel < 3) return false;
          if (key === "specialty" && !other.skills.includes(scenario.specialty)) return false;
          const from = siteById[assignments[other.id]];
          const trial = { ...assignments, [other.id]: destination.id };
          return Boolean(repair(from, trial, new Set([other.id]), 0, new Set([from.id])));
        });
        if (alternative) return "Role mix: reserving a destination slot for a feasible " + labels[key] + " candidate.";
      }
      return "";
    }

    for (const person of candidates) {
      if (used.has(person.id)) continue;
      if (coverage(destination, assignments, codes, scenario).total >= scenario.demand.total) break;
      const reason = eligible(person, destination, codes[person.id], scenario);
      if (reason) {
        decisions.push({ personId: person.id, code: codes[person.id], score: person.score, ok: false, reason, chain: [] });
        continue;
      }
      const from = siteById[assignments[person.id]];
      const trial = { ...assignments, [person.id]: destination.id };
      const repaired = repair(from, trial, new Set([person.id]), 0, new Set([from.id]));
      if (!repaired) {
        const failure = sourceFailure(from, trial, codes, scenario);
        decisions.push({
          personId: person.id, code: codes[person.id], score: person.score, ok: false,
          reason: from.name + " would fall below its required mix (" + failure + "); no eligible backfill chain was found.",
          chain: []
        });
        continue;
      }
      const reservation = reservedForRole(person);
      if (reservation) {
        decisions.push({ personId: person.id, code: codes[person.id], score: person.score, ok: false, reason: reservation, chain: [] });
        continue;
      }
      assignments = repaired.assignments;
      const chain = [{ personId: person.id, from: from.id, to: destination.id, backfill: false }, ...repaired.moves];
      chain.forEach(move => { used.add(move.personId); moves.push(move); });
      decisions.push({
        personId: person.id, code: codes[person.id], score: person.score, ok: true,
        reason: repaired.moves.length
          ? "Approved with " + repaired.moves.length + " local backfill move" + (repaired.moves.length === 1 ? "" : "s") + "."
          : from.name + " remains above every required minimum.",
        chain
      });
    }

    const destCoverage = coverage(destination, assignments, codes, scenario);
    const destDeficits = deficits(destination, assignments, codes, scenario);
    const sourceCoverage = sourceSites.map(site => ({
      site, before: coverage(site, Object.fromEntries(staff.map(person => [person.id, person.siteId])), codes, scenario),
      after: coverage(site, assignments, codes, scenario),
      deficits: deficits(site, assignments, codes, scenario)
    }));
    return {
      scenario, months: projectionMonths, assignments, codes, decisions, moves,
      destinationCoverage: destCoverage, destinationDeficits: destDeficits,
      sourceCoverage, ready: destDeficits.length === 0,
      headcountGap: Math.max(0, scenario.demand.total - destCoverage.total),
      backfillCount: moves.filter(move => move.backfill).length
    };
  }

  function forecast(scenario) {
    const checkpoints = [0, 6, 12, 18, 24, 36];
    const results = checkpoints.map(months => planScenario(scenario, months));
    return {
      checkpoints: results,
      earliest: results.find(result => result.ready) || null
    };
  }

  const api = { scenarios, sites, staff, LEVEL, LADDER, getScenario, projectedCode, nextMilestone, planScenario, forecast, coverage };
  root.WorkforcePlanner = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
