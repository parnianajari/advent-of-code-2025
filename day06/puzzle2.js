const fs = require("fs");

function solveCephalopodMath(inputText) {
  const lines = inputText.split("\n").filter((line) => line.length > 0);
  if (lines.length < 2) return 0;

  const operatorLine = lines.pop();
  const numberLines = lines;

  const maxLen = Math.max(
    ...numberLines.map((l) => l.length),
    operatorLine.length
  );
  const paddedNumberLines = numberLines.map((l) => l.padEnd(maxLen, " "));
  const paddedOpLine = operatorLine.padEnd(maxLen, " ");

  let totalSum = 0;
  let currentProblemColumns = [];
  let currentProblemOp = null;
  let inProblem = false;

  // Process columns from RIGHT TO LEFT
  for (let col = maxLen - 1; col >= 0; col--) {
    const colChars = paddedNumberLines.map((line) => line[col]);
    const allSpaces = colChars.every((ch) => ch === " ");

    if (!allSpaces) {
      if (!inProblem) {
        inProblem = true;
        currentProblemColumns = [];
      }
      currentProblemColumns.unshift(col);
      if (currentProblemOp === null) {
        const opChar = paddedOpLine[col];
        if (opChar === "+" || opChar === "*") {
          currentProblemOp = opChar;
        }
      }
    } else {
      if (inProblem) {
        let numbersInProblem = [];
        for (const col of currentProblemColumns) {
          let digitStr = "";
          for (let row = 0; row < paddedNumberLines.length; row++) {
            const ch = paddedNumberLines[row][col];
            if (ch >= "0" && ch <= "9") {
              digitStr += ch;
            }
          }
          if (digitStr.length > 0) {
            numbersInProblem.push(parseInt(digitStr, 10));
          }
        }

        let result;
        if (currentProblemOp === "+") {
          result = numbersInProblem.reduce((a, b) => a + b, 0);
        } else if (currentProblemOp === "*") {
          result = numbersInProblem.reduce((a, b) => a * b, 1);
        } else {
          result = 0;
        }
        totalSum += result;

        currentProblemColumns = [];
        currentProblemOp = null;
        inProblem = false;
      }
    }
  }

  // Process last problem if file ends without empty column
  if (inProblem) {
    let numbersInProblem = [];
    for (const col of currentProblemColumns) {
      let digitStr = "";
      for (let row = 0; row < paddedNumberLines.length; row++) {
        const ch = paddedNumberLines[row][col];
        if (ch >= "0" && ch <= "9") {
          digitStr += ch;
        }
      }
      if (digitStr.length > 0) {
        numbersInProblem.push(parseInt(digitStr, 10));
      }
    }
    let result;
    if (currentProblemOp === "+") {
      result = numbersInProblem.reduce((a, b) => a + b, 0);
    } else if (currentProblemOp === "*") {
      result = numbersInProblem.reduce((a, b) => a * b, 1);
    } else {
      result = 0;
    }
    totalSum += result;
  }

  return totalSum;
}

// Read input file and calculate result
const inputText = fs.readFileSync("input.txt", "utf-8");
console.log("Grand Total:", solveCephalopodMath(inputText));
