const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf-8").trim();
let grid = input.split("\n").map((line) => line.split(""));

const rows = grid.length;
const cols = grid[0].length;

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function countNeighbors(i, j, grid) {
  let count = 0;
  for (const [dx, dy] of directions) {
    const ni = i + dx;
    const nj = j + dy;

    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
      if (grid[ni][nj] === "@") {
        count++;
      }
    }
  }
  return count;
}

let totalRemoved = 0;
let removedInThisRound;

do {
  removedInThisRound = 0;
  let toRemove = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "@") {
        const neighborCount = countNeighbors(i, j, grid);
        if (neighborCount < 4) {
          toRemove.push([i, j]);
        }
      }
    }
  }

  for (const [i, j] of toRemove) {
    grid[i][j] = ".";
    removedInThisRound++;
  }

  totalRemoved += removedInThisRound;
} while (removedInThisRound > 0);

console.log("Total rolls removed:", totalRemoved);
