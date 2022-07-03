const display = document.querySelector("#results");
const operators = document.querySelectorAll(".orangeNum");
const nums = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equals");

display.textContent = "0";

let results = "";
let equation = [];

// displays the current user actions in the display bar at the top
function displayResults(str) {
  //   if (results === "0") {
  //     results = "";
  //   }
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
  results = "";
  display.textContent = "0";
  equation = [];
  clearOperatorColors();
});

// pushes the first number and operator to the array
operators.forEach((e) => {
  e.addEventListener("click", () => {
    clearOperatorColors();
    e.style.backgroundColor = "white";
    e.style.color = "orange";

    if (results === "") {
      equation.push(e.textContent);
    } else {
      equation.push(Number(results));
      equation.push(e.textContent);
    }

    if (
      isNaN(equation[equation.length - 1]) &&
      isNaN(equation[equation.length - 2])
    ) {
      equation.splice(equation.length - 2, 1);
    }
    results = "";
  });
});

// solves and displays the answer
equal.addEventListener("click", () => {
  if (equation.length !== 0) {
    if (!isNaN(results)) {
      equation.push(results);
    }
    //   equation.forEach((e) => console.log(e));
    //   console.log(equation.length);
    clearOperatorColors();
    completeEqual(equation);
  }
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
  if (arr[0] == 0 && arr[1] == "/" && arr[2] == 0) {
    display.textContent = "Wow you're really smart";
  } else {
    while (arr.length > 3) {
      let answer = operate(Number(arr[0]), arr[1], Number(arr[2]));
      arr.splice(0, 3, answer);
    }
    let finalAnswer = operate(Number(arr[0]), arr[1], Number(arr[2]));
    equation = [];
    results = finalAnswer;
    display.textContent = results;
  }
}
