const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = '0';
let firstNum = null;
let operator = null;
let waitingForSecondValue = false;


updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.matches('button')) return;


    if (element.classList.contains('operator')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }
    if (element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }
    if (element.classList.contains('decimal')) {
        inputDecimal()
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
})

function inputNumber(number) {
    if (waitingForSecondValue) {
        console.log("deneme");
        displayValue = number;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
        console.log("deneme2");
    }
}
function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue = displayValue + "."
    }
}
function clear() {
    displayValue = "0";
}

function handleOperator(op) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = op;
        console.log("operator", op);
        return
    }
    if (firstNum === null) {
        firstNum = value;
        console.log("first number",firstNum);
    }else if (operator){
        const result = calculate(firstNum, value, operator);
        displayValue =`${parseFloat(result.toFixed(6))}`
        firstNum = result; 
        
    }
    waitingForSecondValue = true;
    operator = op;

}

function calculate(num1, num2, operator) {
    
    if (operator === "+") {
        return num1 + num2
    }
    if (operator === "-") {
        return num1 - num2
    }
    if (operator === "*") {
        return num1 * num2
    }
    if (operator === "/") {
        return num1 / num2
    }
    return num2
}