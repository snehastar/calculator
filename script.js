//creating a calculator class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); //initially the calculator should be empty
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //to take '.' only once
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //if no previous number exists we return and not compute
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

//selecting all the values from buttons to variables (constants)
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
//querySelectorAll gets all the elements and querySelector gets only the single element
const deleteButton = document.querySelector(`[data-delete]`);
const equalsButton = document.querySelector(`[data-equals]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandTextElement = document.querySelector(
  `[data-current-operand]`
);

//creating a Calculator object

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// clicking number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//clicking operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//clicking equal button
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//clicking clear button
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

//clicking delete button
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
