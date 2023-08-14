const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const scientificButtons = document.querySelectorAll(".scientific");

let currentValue = "0";
let operator = "";
let firstValue = "";

function updateDisplay() {
  display.textContent = currentValue;
}

function clearDisplay() {
  currentValue = "0";
  operator = "";
  firstValue = "";
  updateDisplay();
}

function deleteLastDigit() {
  if (currentValue.length === 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

function handleNumberClick(event) {
  const clickedValue = event.target.getAttribute("data-value");
  if (currentValue === "0") {
    currentValue = clickedValue;
  } else {
    currentValue += clickedValue;
  }
  updateDisplay();
}

function handleOperatorClick(event) {
  operator = event.target.getAttribute("data-value");
  firstValue = currentValue;
  currentValue = "0";
}

function calculate() {
  const num1 = parseFloat(firstValue);
  const num2 = parseFloat(currentValue);
  let result = 0;
  
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        alert("Cannot divide by zero");
        clearDisplay();
        return;
      }
      break;
  }
  
  currentValue = result.toString();
  operator = "";
  firstValue = "";
  updateDisplay();
}

function handleScientificClick(event) {
  const scientificValue = event.target.getAttribute("data-value");
  const num = parseFloat(currentValue);
  
  switch (scientificValue) {
    case "sqrt":
      if (num >= 0) {
        currentValue = Math.sqrt(num).toString();
      } else {
        alert("Cannot calculate square root of a negative number");
      }
      break;
    case "exp":
      currentValue = Math.exp(num).toString();
      break;
    case "sin":
      currentValue = Math.sin(num).toString();
      break;
    case "cos":
      currentValue = Math.cos(num).toString();
      break;
    case "tan":
      currentValue = Math.tan(num).toString();
      break;
    case "log":
      if (num > 0) {
        currentValue = Math.log(num).toString();
      } else {
        alert("Cannot calculate logarithm of a non-positive number");
      }
      break;
  }
  
  updateDisplay();
}

clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteLastDigit);
equalsButton.addEventListener("click", calculate);
numberButtons.forEach(button => button.addEventListener("click", handleNumberClick));
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
scientificButtons.forEach(button => button.addEventListener("click", handleScientificClick));

updateDisplay();
