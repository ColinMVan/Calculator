const display = document.querySelector("#results");
const operators = document.querySelectorAll(".orangeNum");
const nums = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equals");

let results = "";
let equation = [];

// displays the current user actions in the display bar at the top
function displayResults(str) {
  if (results === "0") {
    results = "";
  }
  results += str;
  display.textContent = results;
}

// clears all of the operator colors after clicked
function clearOperatorColors() {
  operators.forEach((e) => {
    e.style.backgroundColor = "orange";
    e.style.color = "white";
  });
}

// adds the number clicked to the results
nums.forEach((e) => {
  e.addEventListener("click", () => {
    displayResults(e.textContent);
    clearOperatorColors();
  });
});

// clears everything
clear.addEventListener("click", () => {
  results = "0";
  display.textContent = results;
  equation = [];
  clearOperatorColors();
});

// pushes the first number and operator to the array
operators.forEach((e) => {
  e.addEventListener("click", () => {
    clearOperatorColors();
    e.style.backgroundColor = "white";
    e.style.color = "orange";
    equation.push(Number(results));
    equation.push(e.textContent);
    results = "";
  });
});

// solves and displays the answer
equal.addEventListener("click", () => {
  if (results !== "0" || isNaN(results)) {
    equation.push(results);
  }
  //   equation.forEach((e) => console.log(e));
  //   console.log(equation.length);
  completeEqual(equation);
});

// gives the number of decimals in the answer so the answer is limited
const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

const add = (n, n2) => n + n2;
const subtract = (n, n2) => n - n2;
const multiply = (n, n2) => n * n2;
const divide = (n, n2) => {
  let answer = n / n2;
  if (decimalCount(answer) > 5) {
    return answer.toFixed(6);
  } else {
    return answer;
  }
};

// operates the given numbers based on the operator
function operate(n, operator, n2) {
  switch (operator) {
    case "+":
      return add(n, n2);
    case "-":
      return subtract(n, n2);
    case "x":
      return multiply(n, n2);
    case "/":
      return divide(n, n2);
  }
}

// completes the entire equation
function completeEqual(arr) {
  while (arr.length > 3) {
    let answer = operate(Number(arr[0]), arr[1], Number(arr[2]));
    arr.splice(0, 3, answer);
  }
  let finalAnswer = operate(Number(arr[0]), arr[1], Number(arr[2]));
  display.textContent = finalAnswer;
}
