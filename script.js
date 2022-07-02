let display = document.querySelector("#results");
let results = "";

let firstNum;
let secondNum;
let operatorPosition;
let operator = "";

function displayResults(str) {
  results += str;
  display.textContent = results;
}

const nums = document.querySelectorAll(".num");
nums.forEach((e) => {
  e.addEventListener("click", () => {
    displayResults(e.textContent);
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  results = "";
  display.textContent = results;
});

const operators = document.querySelectorAll(".orangeNum");
operators.forEach((e) => {
  e.addEventListener("click", () => {
    firstNum = results;
    operatorPosition = results.length + 1;
    operator = e.textContent;
    displayResults(e.textContent);
  });
});

const equal = document.querySelector("#equals");
equal.addEventListener("click", () => {
  secondNum = Number(results.substring(operatorPosition));
  results = operate(operator, Number(firstNum), secondNum);
  display.textContent = results;
});

const add = (n, n2) => n + n2;
const subtract = (n, n2) => n - n2;
const multiply = (n, n2) => n * n2;
const divide = (n, n2) => n / n2;

function operate(operator, n, n2) {
  switch (operator) {
    case "+":
      return add(n, n2);
    case "-":
      return subtract(n, n2);
    case "*":
      return multiply(n, n2);
    case "/":
      return divide(n, n2);
  }
}
