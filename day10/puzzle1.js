const fs = require("fs");

// Backtracking solver for integer button presses
function solveMachine(buttons, target) {
  const n = target.length;
  const m = buttons.length;
  let minPresses = Infinity;

  function backtrack(idx, current, presses) {
    // Prune if already worse than best found
    if (presses >= minPresses) return;

    // Check if current state matches target
    if (current.every((v, i) => v === target[i])) {
      minPresses = presses;
      return;
    }

    // If all buttons considered, stop
    if (idx === m) return;

    // Compute max times we could press this button without exceeding target
    let maxTimes = Infinity;
    for (let c of buttons[idx]) {
      if (target[c] >= current[c]) {
        maxTimes = Math.min(maxTimes, target[c] - current[c]);
      } else {
        maxTimes = 0; // cannot press without exceeding
      }
    }

    // Try pressing this button 0..maxTimes
    for (let t = 0; t <= maxTimes; t++) {
      const next = current.slice();
      for (let c of buttons[idx]) next[c] += t;
      backtrack(idx + 1, next, presses + t);
    }
  }

  backtrack(0, Array(n).fill(0), 0);
  return minPresses;
}

// Read input file
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

let total = 0;

for (const [machineIdx, line] of lines.entries()) {
  if (!line.trim()) continue;

  const buttonMatches = [...line.matchAll(/\(([\d,]+)\)/g)];
  const buttons = buttonMatches.map((m) => m[1].split(",").map(Number));

  const targetMatch = line.match(/\{([\d,]+)\}/);
  if (!targetMatch) continue;
  const target = targetMatch[1].split(",").map(Number);

  console.log(
    `Machine ${machineIdx + 1}: ${buttons.length} buttons, ${
      target.length
    } counters`
  );
  const presses = solveMachine(buttons, target);
  console.log(`  Fewest presses: ${presses}`);
  total += presses;
}

console.log("Total fewest button presses for joltage:", total);
