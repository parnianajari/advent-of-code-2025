const fs = require("fs");

// Read input file
const input = fs.readFileSync("input.txt", "utf8");
const lines = input.trim().split("\n");

// Parse coordinates into array of [x, y] pairs
const points = lines.map((line) => {
  const [x, y] = line.split(",").map(Number);
  return [x, y];
});

let maxArea = 0;
let bestPair = null;

// Check all pairs of points
for (let i = 0; i < points.length; i++) {
  for (let j = i + 1; j < points.length; j++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[j];

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const area = (maxX - minX + 1) * (maxY - minY + 1);

    // Update maximum area found
    if (area > maxArea) {
      maxArea = area;
      bestPair = [
        [x1, y1],
        [x2, y2],
      ];
    }
  }
}

console.log(`Largest rectangle area: ${maxArea}`);
if (bestPair) {
  console.log(
    `Between points: (${bestPair[0][0]},${bestPair[0][1]}) and (${bestPair[1][0]},${bestPair[1][1]})`
  );
}
