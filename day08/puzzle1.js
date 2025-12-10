const fs = require("fs");

// Read input file (each line: "X,Y,Z")
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

if (N === 0) {
  console.log("No points found.");
  process.exit(0);
}

// Each entry is [d2, i, j]
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

// Union-Find data structures
const parent = new Array(N);
const size = new Array(N);
for (let i = 0; i < N; i++) {
  parent[i] = i;
  size[i] = 1;
}

// Find with path compression
function find(a) {
  while (a !== parent[a]) {
    parent[a] = parent[parent[a]];
    a = parent[a];
  }
  return a;
}

// Union by size
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

// Connect the first 1000 closest pairs (or fewer if needed)
const LIMIT = 1000;
const totalPairs = pairs.length;
const count = Math.min(LIMIT, totalPairs);

for (let k = 0; k < count; k++) {
  const [, i, j] = pairs[k];
  union(i, j);
}

// Count component sizes
const compSizes = new Map();
for (let i = 0; i < N; i++) {
  const r = find(i);
  compSizes.set(r, (compSizes.get(r) || 0) + 1);
}

const sizes = Array.from(compSizes.values()).sort((a, b) => b - a);

// Take the largest three
const a = BigInt(sizes[0] || 1);
const b = BigInt(sizes[1] || 1);
const c = BigInt(sizes[2] || 1);

const product = a * b * c;

// Show output
console.log("Largest component sizes:", sizes.slice(0, 10));
console.log("Product of top 3:", product.toString());
