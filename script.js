const display = document.getElementById("display");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (waitingForSecondNumber) {
    currentInput = number;
    waitingForSecondNumber = false;
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
    default:
      return b;
  }
}

function chooseOperator(op) {
  const value = parseFloat(currentInput);

  if (operator !== null && !waitingForSecondNumber) {
    firstNumber = calculate(firstNumber, value, operator);
    currentInput = String(firstNumber);
    updateDisplay();
  } else {
    firstNumber = value;
  }

  operator = op;
  waitingForSecondNumber = true;
}

function equals() {
  if (operator === null || waitingForSecondNumber) return;

  const result = calculate(firstNumber, parseFloat(currentInput), operator);
  currentInput = String(result);
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
  updateDisplay();
}

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.value));
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => chooseOperator(button.dataset.operator));
});

document.getElementById("equals").addEventListener("click", equals);

updateDisplay();
