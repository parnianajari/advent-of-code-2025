const fs = require("fs");

// Read input Data from file

const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

function getLargestNumber(str, digitsToKeep) {
  let digitsToRemove = str.length - digitsToKeep;
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    const digit = str[i];

    while (
      stack.length > 0 &&
      digitsToRemove > 0 &&
      digit > stack[stack.length - 1]
    ) {
      stack.pop();
      digitsToRemove--;
    }

    stack.push(digit);
  }

  if (digitsToRemove > 0) {
    stack = stack.slice(0, stack.length - digitsToRemove);
  }

  return BigInt(stack.join(""));
}

let total = 0n;

// Process each battery bank
for (const line of lines) {
  if (!line.trim()) continue;

  const str = line.trim();
  const largestNum = getLargestNumber(str, 12);

  total += largestNum;
}

console.log("Total output joltage:", total.toString());
