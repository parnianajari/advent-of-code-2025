const fs = require("fs");

// Read input
const input = fs.readFileSync("input.txt", "utf-8").trim();
const lines = input.split("\n");

const maxWidth = Math.max(...lines.map((line) => line.length));

const paddedLines = lines.map((line) => line.padEnd(maxWidth, " "));

const numRows = paddedLines.length;
const operationsRow = numRows - 1;

// Identify columns
let columns = [];
let inColumn = false;
let columnStart = 0;

for (let col = 0; col < maxWidth; col++) {
  let hasData = false;
  for (let row = 0; row < numRows - 1; row++) {
    if (paddedLines[row][col] !== " ") {
      hasData = true;
      break;
    }
  }

  if (hasData && !inColumn) {
    inColumn = true;
    columnStart = col;
  } else if (!hasData && inColumn) {
    columns.push([columnStart, col - 1]);
    inColumn = false;
  }
}

// Handle case where file ends while still in a column
if (inColumn) {
  columns.push([columnStart, maxWidth - 1]);
}

console.log(`Found ${columns.length} columns`);

let grandTotal = 0;

// Process each column from LEFT TO RIGHT
for (const [start, end] of columns) {
  const numbers = [];

  for (let row = 0; row < numRows - 1; row++) {
    let numStr = "";
    for (let col = start; col <= end; col++) {
      const char = paddedLines[row][col];
      if (char !== " ") {
        numStr += char;
      }
    }

    if (numStr.trim() !== "") {
      numbers.push(parseInt(numStr));
    }
  }

  // Get the operator for this column from the last row
  let operation = "";
  for (let col = start; col <= end; col++) {
    const char = paddedLines[operationsRow][col];
    if (char === "+" || char === "*") {
      operation = char;
      break;
    }
  }

  // Calculate result based on the operator
  let result;
  if (operation === "+") {
    result = numbers.reduce((sum, num) => sum + num, 0);
  } else if (operation === "*") {
    result = numbers.reduce((product, num) => product * num, 1);
  }

  console.log(
    `Column ${start}-${end}: ${numbers.join(` ${operation} `)} = ${result}`
  );

  grandTotal += result;
}

console.log("Grand total:", grandTotal);
