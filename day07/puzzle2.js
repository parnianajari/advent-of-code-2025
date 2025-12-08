const fs = require("fs");

// Read input
const lines = fs.readFileSync("input.txt", "utf8").trim().split("\n");
if (lines.length === 0) {
  console.error("input.txt is empty or unreadable.");
  process.exit(1);
}
const grid = lines.map((l) => l.split(""));

const R = grid.length;
const C = grid[0].length;

// Find S
let startR = -1,
  startC = -1;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] === "S") {
      startR = r;
      startC = c;
      break;
    }
  }
  if (startR !== -1) break;
}
if (startR === -1) {
  console.error("Location S not found.");
  process.exit(1);
}

let counts = Array(C).fill(0n);
counts[startC] = 1n;

let exited = 0n;

for (let r = startR; r < R; r++) {
  const anyActive = counts.some((x) => x !== 0n);
  if (!anyActive) break;

  const next = Array(C).fill(0n);

  for (let c = 0; c < C; c++) {
    const n = counts[c];
    if (n === 0n) continue;

    const nr = r + 1;
    if (nr >= R) {
      exited += n;
      continue;
    }

    const cell = grid[nr][c];

    if (cell === ".") {
      next[c] += n;
    } else if (cell === "^") {
      if (c - 1 >= 0) next[c - 1] += n;
      if (c + 1 < C) next[c + 1] += n;
    } else {
      next[c] += n;
    }
  }

  counts = next;
}

console.log("Total timelines:", exited.toString());
