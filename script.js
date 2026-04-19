// Calculator Logic
let displayValue = "0";

function updateDisplay() {
    document.getElementById("result").innerText = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === "0" && value !== ".") {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = "0";
    document.getElementById("history").innerText = "";
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
    updateDisplay();
}

function calculate() {
    try {
        // Sanitize input: replace visual operators with JS operators
        let expression = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
        let res = eval(expression);
        
        document.getElementById("history").innerText = displayValue;
        displayValue = Number.isInteger(res) ? res.toString() : res.toFixed(4).replace(/\.?0+$/, "");
        updateDisplay();
    } catch {
        displayValue = "Error";
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

// Currency Converter Logic (Static rates)
const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    BDT: 115.0,
    INR: 83.3
};

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    if (amount === "" || amount < 0) {
        document.getElementById("convertedValue").innerText = "0.00";
        return;
    }

    // Calculation: (Amount / FromRate) * ToRate
    const result = (amount / rates[from]) * rates[to];
    document.getElementById("convertedValue").innerText = result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " " + to;
}

// Initialize converter on load
document.addEventListener("DOMContentLoaded", convertCurrency);
  
