const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf-8");
const lines = input.split(/\r?\n/);

let ranges = [];
let ids = new Set();
let inRangesSection = true;

// Parse each line
for (const line of lines) {
  const trimmed = line.trim();

  if (trimmed === "") {
    inRangesSection = false;
    continue;
  }

  if (inRangesSection) {
    const [start, end] = trimmed.split("-").map(Number);
    ranges.push([start, end]);
  } else {
    ids.add(parseInt(trimmed));
  }
}

// Merge overlapping or consecutive ranges for efficiency
ranges.sort((a, b) => a[0] - b[0]);
const mergedRanges = [];
let current = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  if (ranges[i][0] <= current[1] + 1) {
    current[1] = Math.max(current[1], ranges[i][1]);
  } else {
    mergedRanges.push(current);
    current = ranges[i];
  }
}
mergedRanges.push(current);

// Check each ID against the merged ranges
let freshCount = 0;
for (const id of ids) {
  for (const [start, end] of mergedRanges) {
    if (id >= start && id <= end) {
      freshCount++;
      break;
    }
  }
}

// Output statistics and result
console.log(
  `Ranges: ${ranges.length}, Merged: ${mergedRanges.length}, Unique IDs: ${ids.size}`
);
console.log("Fresh ingredient IDs:", freshCount);
