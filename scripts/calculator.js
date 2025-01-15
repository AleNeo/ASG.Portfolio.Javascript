const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';

// Update window display
const updateDisplay = (value) => {
  display.textContent = value;
};

// Reset all
const clearAll = () => {
  currentInput = '0';
  previousInput = '';
  operator = '';
  updateDisplay(currentInput);
};

// Handle button clicks
const handleButtonClick = (value) => {
  switch (value) {
    case 'C':
      clearAll();
      break;
    case 'CE':
      clearCurrentEntry();
      break;
    case '=':
      handleEquals();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperatorInput(value);
      break;
    case 'del':
      handleDelete();
      break;
    default:
      handleNumberInput(value);
      break;
  }
};

// Handle backspace
const handleDelete = () => {
    currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay(currentInput);
}

// Clear current entry
const clearCurrentEntry = () => {
  currentInput = '0';
  updateDisplay(currentInput);
};

// Handle number input
const handleNumberInput = (number) => {
  currentInput = currentInput === '0' ? number : currentInput + number;
  updateDisplay(currentInput);
};

// Handle operator input
const handleOperatorInput = (op) => {
  if (currentInput !== '0') {
    if (operator) {
      handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
  }
};

// Handle equals
const handleEquals = () => {
  if (operator && previousInput) {
    currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
  }
};

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleButtonClick(value);
  });
});
