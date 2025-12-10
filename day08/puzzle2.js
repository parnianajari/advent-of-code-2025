const fs = require("fs");

// Read input file containing X,Y,Z per line
const data = fs
  .readFileSync("input.txt", "utf8")
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

// Parse 3D points
const pts = data.map((line) => {
  const [xs, ys, zs] = line.split(",").map((s) => s.trim());
  return { x: Number(xs), y: Number(ys), z: Number(zs) };
});

const N = pts.length;

// Build all pair distances: [d2, i, j]
const pairs = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const dx = pts[i].x - pts[j].x;
    const dy = pts[i].y - pts[j].y;
    const dz = pts[i].z - pts[j].z;
    const d2 = dx * dx + dy * dy + dz * dz;
    pairs.push([d2, i, j]);
  }
}

pairs.sort((a, b) => a[0] - b[0]);

// Union-Find structure
const parent = new Array(N);
const size = new Array(N);
for (let i = 0; i < N; i++) {
  parent[i] = i;
  size[i] = 1;
}

function find(a) {
  while (a !== parent[a]) {
    parent[a] = parent[parent[a]];
    a = parent[a];
  }
  return a;
}

function union(a, b) {
  let ra = find(a);
  let rb = find(b);
  if (ra === rb) return false;
  if (size[ra] < size[rb]) {
    parent[ra] = rb;
    size[rb] += size[ra];
  } else {
    parent[rb] = ra;
    size[ra] += size[rb];
  }
  return true;
}

let components = N;
let lastConnection = null;

for (let k = 0; k < pairs.length && components > 1; k++) {
  const [, i, j] = pairs[k];

  if (union(i, j)) {
    components--;
    lastConnection = [i, j];
  }
}

if (!lastConnection) {
  console.log("No connection required (already one component).");
  process.exit(0);
}

// Get X values for the two last-connected points
const [a, b] = lastConnection;
const result = BigInt(pts[a].x) * BigInt(pts[b].x);

console.log("Last connected indices:", a, b);
console.log("Last connected points:", pts[a], pts[b]);
console.log("Answer:", result.toString());
