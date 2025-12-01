const fs = require("fs");

// Read input Data from file
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

let current = 50;
let count = 0;

for (let line of lines) {
  let direction = line[0];
  let value = parseInt(line.slice(1));

  for (let i = 0; i < value; i++) {
    if (direction === "R") {
      current = (current + 1) % 100;
    } else if (direction === "L") {
      current = (current - 1 + 100) % 100;
    }

    // Circle the numbers
    current = (current + 100) % 100;

    // Counting the number of zeros
    if (current === 0) {
      count++;
    }
  }
}

console.log("Password:", count);
