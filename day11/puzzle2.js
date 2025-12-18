const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

// Build forward graph and reverse graph
const graph = new Map();
const reverseGraph = new Map();
const nodes = new Set();

for (const line of lines) {
  if (!line.trim()) continue;

  const [from, toList] = line.split(":").map((s) => s.trim());
  const toNodes = toList.split(" ").filter((s) => s !== "");

  // Add nodes to global set
  nodes.add(from);
  toNodes.forEach((node) => nodes.add(node));

  if (!graph.has(from)) graph.set(from, []);
  graph.set(from, [...graph.get(from), ...toNodes]);

  for (const to of toNodes) {
    if (!reverseGraph.has(to)) reverseGraph.set(to, []);
    reverseGraph.get(to).push(from);
  }
}

// Topological sort function
function topologicalSort() {
  const inDegree = new Map();

  // Initialize indegree for all nodes
  for (const node of nodes) {
    inDegree.set(node, 0);
  }

  // Calculate indegree from forward graph
  for (const [from, neighbors] of graph) {
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
    }
  }

  // Queue for nodes with indegree 0
  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If not all nodes are in result, graph has cycles
  if (result.length !== nodes.size) {
    console.log("Graph has cycles! Using BFS instead.");
    return null;
  }

  return result;
}

// Count paths from start to end that visit both 'dac' and 'fft'
function countPathsDP(start, end) {
  const topoOrder = topologicalSort();

  if (topoOrder) {
    const dp = new Map();

    // Initialize DP table for all nodes
    for (const node of nodes) {
      dp.set(node, [
        [0, 0],
        [0, 0],
      ]);
    }

    dp.get(start)[0][0] = 1;

    // Process nodes in topological order
    for (const node of topoOrder) {
      const neighbors = graph.get(node) || [];

      for (const neighbor of neighbors) {
        const dpNode = dp.get(node);
        const dpNeighbor = dp.get(neighbor);

        // Transfer all state combinations
        for (let dac = 0; dac <= 1; dac++) {
          for (let fft = 0; fft <= 1; fft++) {
            if (dpNode[dac][fft] > 0) {
              let newDac = dac || (neighbor === "dac" ? 1 : 0);
              let newFft = fft || (neighbor === "fft" ? 1 : 0);

              dpNeighbor[newDac][newFft] += dpNode[dac][fft];
            }
          }
        }
      }
    }

    return dp.get(end)[1][1];
  } else {
    console.log("Using memoized DFS with pruning...");

    const memo = new Map();
    let callCount = 0;

    function dfs(node, dacSeen, fftSeen, visitedMask) {
      callCount++;
      if (callCount % 1000000 === 0) {
        console.log(`Call count: ${callCount}`);
      }

      const memoKey = `${node}:${dacSeen}:${fftSeen}:${visitedMask}`;
      if (memo.has(memoKey)) {
        return memo.get(memoKey);
      }

      if (node === end) {
        const result = dacSeen && fftSeen ? 1 : 0;
        memo.set(memoKey, result);
        return result;
      }

      const visitedBit = 1 << Array.from(nodes).indexOf(node) % 32;
      if (visitedMask & visitedBit) {
        memo.set(memoKey, 0);
        return 0;
      }

      // Node doesn't exist in graph
      if (!graph.has(node)) {
        memo.set(memoKey, 0);
        return 0;
      }

      const newVisitedMask = visitedMask | visitedBit;

      // Update dac/fft status
      const newDacSeen = dacSeen || node === "dac";
      const newFftSeen = fftSeen || node === "fft";

      let total = 0;
      const neighbors = graph.get(node);

      for (const neighbor of neighbors) {
        total += dfs(neighbor, newDacSeen, newFftSeen, newVisitedMask);
      }

      memo.set(memoKey, total);
      return total;
    }

    const nodeIndex = new Map();
    let idx = 0;
    for (const node of nodes) {
      nodeIndex.set(node, idx);
      idx++;
    }

    const startMask = 1 << nodeIndex.get(start) % 32;
    return dfs(start, false, false, startMask);
  }
}

// Calculate result
const result = countPathsDP("svr", "out");
console.log("Number of valid paths:", result);
