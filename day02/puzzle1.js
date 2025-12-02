const fs = require("fs");

let count = 0;

const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split(",");

// Function to check if an ID is invalid
const isInvalid = function (num) {
  const str = String(num);
  const len = str.length;

  // If length is odd, it cannot have two equal halves
  if (len % 2 !== 0) return false;

  const half = len / 2;
  const firstHalf = str.slice(0, half);
  const secondHalf = str.slice(half);

  return firstHalf === secondHalf;
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
