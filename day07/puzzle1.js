const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const grid = input.map((line) => line.split(""));

const R = grid.length;
const C = grid[0].length;

// Find S
let startRow = -1,
  startCol = -1;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] === "S") {
      startRow = r;
      startCol = c;
      break;
    }
  }
  if (startRow !== -1) break;
}

let splits = 0;

let active = new Set([startCol]);

for (let r = startRow; r < R; r++) {
  if (active.size === 0) break;

  let nextActive = new Set();

  for (const c of active) {
    const nr = r + 1;
    if (nr >= R) continue;

    const cell = grid[nr][c];

    if (cell === ".") {
      nextActive.add(c);
    } else if (cell === "^") {
      splits++;

      if (c - 1 >= 0) nextActive.add(c - 1);
      if (c + 1 < C) nextActive.add(c + 1);
    }
  }

  active = nextActive;
}

console.log("Total splits:", splits);
