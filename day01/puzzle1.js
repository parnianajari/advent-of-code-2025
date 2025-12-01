const fs = require("fs");

// Read input Data from file
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

let current = 50;
let count = 0;

for (let line of lines) {
  let direction = line[0];
  let value = parseInt(line.slice(1));

  if (direction === "R") {
    current += value;
  } else if (direction === "L") {
    current -= value;
  }

  // Circle the numbers
  current = (current + 100) % 100;

  // Counting the number of zeros
  if (current === 0) {
    count++;
  }
}

console.log("Password:", count);
