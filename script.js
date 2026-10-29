const display = document.getElementById("display");

let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.value));
});

updateDisplay();
