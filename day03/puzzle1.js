const fs = require("fs");

// Read input Data from file
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

let total = 0;

// Process each battery bank
for (const line of lines) {
  if (!line.trim()) continue;

  const str = line.trim();
  let maxTwoDigit = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      const twoDigitNum = parseInt(str[i] + str[j]);

      if (twoDigitNum > maxTwoDigit) {
        maxTwoDigit = twoDigitNum;
      }
    }
  }

  total += maxTwoDigit;
}

console.log("Total output joltage:", total);
