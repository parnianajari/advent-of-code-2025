const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

// Collect ranges
const ranges = [];
for (const line of lines) {
  if (line.trim() === "") break;
  if (line.includes("-")) {
    const [start, end] = line.split("-").map(Number);
    ranges.push([start, end]);
  }
}

// Sort ranges by start value in ascending order
ranges.sort((a, b) => a[0] - b[0]);

// Merge overlapping or consecutive ranges
const mergedRanges = [];
let currentRange = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  if (ranges[i][0] <= currentRange[1] + 1) {
    currentRange[1] = Math.max(currentRange[1], ranges[i][1]);
  } else {
    mergedRanges.push(currentRange);
    currentRange = ranges[i];
  }
}
mergedRanges.push(currentRange);

// Calculate total count of unique numbers in all merged ranges
let totalFresh = 0;
for (const [start, end] of mergedRanges) {
  totalFresh += end - start + 1;
}

console.log("Number of fresh ingredient IDs:", totalFresh);
