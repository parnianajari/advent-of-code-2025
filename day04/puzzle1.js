const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf-8").trim();
if (!input) {
  console.error("input.txt is empty or not found.");
  process.exit(1);
}

// Split into lines and build grid
const lines = input.split(/\r?\n/);
const R = lines.length;
const C = lines[0].length;
const grid = lines.map((line) => line.split(""));

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let accessibleCount = 0;

for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] !== "@") continue;

    // count neighboring '@'
    let neighbors = 0;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < C) {
        if (grid[nr][nc] === "@") neighbors++;
      }
    }

    if (neighbors < 4) accessibleCount++;
  }
}

console.log(accessibleCount);
