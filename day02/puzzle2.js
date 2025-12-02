const fs = require("fs");

let count = 0;

const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split(",");

// Function to check if an ID is invalid
const isInvalid = function (num) {
  const str = String(num);
  const len = str.length;

  for (let i = 1; i <= Math.floor(len / 2); i++) {
    if (len % i !== 0) continue;

    const repeatCount = len / i;
    const sub = str.slice(0, i);
    const repeated = sub.repeat(repeatCount);

    if (repeated === str) {
      return true;
    }
  }
  return false;
};

// Process each range
for (let line of lines) {
  let [start, end] = line.split("-").map(Number);

  for (let id = start; id <= end; id++) {
    if (isInvalid(id)) {
      count += id;
    }
  }
}
console.log("Total sum of invalid IDs:", count);
