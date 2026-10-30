const display = document.getElementById("display");
const operatorButtons = document.querySelectorAll(".operator");

const operatorSymbols = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
};

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
  if (operator === null) {
    display.textContent = currentInput;
    return;
  }

  const secondPart = waitingForSecondNumber ? "" : currentInput;
  display.textContent = firstNumber + operatorSymbols[operator] + secondPart;
}

function highlightOperator(op) {
  operatorButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.operator === op);
  });
}

function appendNumber(number) {
  if (waitingForSecondNumber) {
    currentInput = number;
    waitingForSecondNumber = false;
    highlightOperator(null);
  } else if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
    default:
      return b;
  }
}

function showError() {
  currentInput = "0";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
  highlightOperator(null);
  display.textContent = "Error";
}

function chooseOperator(op) {
  const value = parseFloat(currentInput);

  if (operator !== null && !waitingForSecondNumber) {
    firstNumber = calculate(firstNumber, value, operator);
    if (firstNumber === null) {
      showError();
      return;
    }
    currentInput = String(firstNumber);
  } else {
    firstNumber = value;
  }

  operator = op;
  waitingForSecondNumber = true;
  highlightOperator(op);
  updateDisplay();
}

function equals() {
  if (operator === null || waitingForSecondNumber) return;

  const result = calculate(firstNumber, parseFloat(currentInput), operator);
  if (result === null) {
    showError();
    return;
  }
  currentInput = String(result);
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
  highlightOperator(null);
  updateDisplay();
}

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.value));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.getElementById("equals").addEventListener("click", equals);

updateDisplay();
