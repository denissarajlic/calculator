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

function appendDecimal() {
  if (waitingForSecondNumber) {
    currentInput = "0.";
    waitingForSecondNumber = false;
    highlightOperator(null);
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

// Rounds away floating point noise, e.g. 0.1 + 0.2 = 0.30000000000000004
function formatResult(number) {
  return String(parseFloat(number.toFixed(10)));
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
    currentInput = formatResult(firstNumber);
    firstNumber = parseFloat(currentInput);
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
  currentInput = formatResult(result);
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
  highlightOperator(null);
  updateDisplay();
}

function percent() {
  if (waitingForSecondNumber) return;

  currentInput = formatResult(parseFloat(currentInput) / 100);
  updateDisplay();
}

function toggleSign() {
  if (waitingForSecondNumber || currentInput === "0") return;

  if (currentInput.startsWith("-")) {
    currentInput = currentInput.slice(1);
  } else {
    currentInput = "-" + currentInput;
  }
  updateDisplay();
}

function clear() {
  currentInput = "0";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  highlightOperator(null);
  updateDisplay();
}

function backspace() {
  if (waitingForSecondNumber) return;

  currentInput = currentInput.slice(0, -1);
  if (currentInput === "" || currentInput === "-") {
    currentInput = "0";
  }
  updateDisplay();
}

function squareRoot() {
  if (waitingForSecondNumber) return;

  const value = parseFloat(currentInput);
  if (value < 0) {
    showError();
    return;
  }
  currentInput = formatResult(Math.sqrt(value));
  updateDisplay();
}

function square() {
  if (waitingForSecondNumber) return;

  const value = parseFloat(currentInput);
  currentInput = formatResult(value * value);
  updateDisplay();
}

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.value));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.getElementById("equals").addEventListener("click", equals);
document.getElementById("percent").addEventListener("click", percent);
document.getElementById("sign").addEventListener("click", toggleSign);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("decimal").addEventListener("click", appendDecimal);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("sqrt").addEventListener("click", squareRoot);
document.getElementById("square").addEventListener("click", square);

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendNumber(key);
  } else if (key in operatorSymbols) {
    chooseOperator(key);
  } else if (key === "." || key === ",") {
    appendDecimal();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    equals();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clear();
  } else if (key === "%") {
    percent();
  }
});

updateDisplay();
