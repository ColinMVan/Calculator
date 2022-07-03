let display = document.querySelector("#results");
let results = "";

let firstNum;
let secondNum;
let operator = "";

let clickedOperator;

function displayResults(str) {
  results += str;
  display.textContent = results;
}

const nums = document.querySelectorAll(".num");
nums.forEach((e) => {
  e.addEventListener("click", () => {
    displayResults(e.textContent);
    document.querySelector(`#${clickedOperator}`).style.backgroundColor =
      "orange";
    document.querySelector(`#${clickedOperator}`).style.color = "white";
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  results = "";
  display.textContent = results;
  firstNum = 0;
  secondNum = 0;
  operator = "";
});

const operators = document.querySelectorAll(".orangeNum");
operators.forEach((e) => {
  e.addEventListener("click", () => {
    firstNum = results;
    operator = e.textContent;
    e.style.backgroundColor = "white";
    e.style.color = "orange";
    results = "";
    clickedOperator = e.id;
  });
});

const equal = document.querySelector("#equals");
equal.addEventListener("click", () => {
  secondNum = Number(results);
  results = operate(operator, Number(firstNum), secondNum);
  display.textContent = results;
});

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

function operate(operator, n, n2) {
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
