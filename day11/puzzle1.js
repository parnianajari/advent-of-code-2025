const fs = require("fs");

// Read input file
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

// Build the graph as adjacency list
const graph = new Map();

for (const line of lines) {
  if (!line.trim()) continue;

  // Split line into "from: to1 to2 to3" format
  const [from, toList] = line.split(":").map((s) => s.trim());

  // Split destinations and filter out any empty strings
  const toNodes = toList.split(" ").filter((s) => s.trim() !== "");

  // Add to graph: from -> [to1, to2, to3, ...]
  graph.set(from, toNodes);
}

// DFS function to count all paths from start to end
function countAllPaths(start, end, visited = new Set()) {
  if (start === end) return 1;
  if (visited.has(start)) return 0;
  if (!graph.has(start)) return 0;

  visited.add(start);

  let totalPaths = 0;

  const neighbors = graph.get(start);

  // Recursively explore all neighbors
  for (const neighbor of neighbors) {
    totalPaths += countAllPaths(neighbor, end, visited);
  }

  // remove current node from visited set
  visited.delete(start);

  return totalPaths;
}

// Calculate number of paths from "you" to "out"
const result = countAllPaths("you", "out");
console.log("Number of paths from you to out:", result);
