document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  if (isNumberKey(key)) {
    handleInput(key);
  } else if (isEnterKey(key)) {
    handleEquals();
  } else if (isBackspaceKey(key)) {
    handleBackspace();
  } else if (isOperatorKey(key)) {
    handleOperatorInput(key);
  } else if (isEscapeKey(key)) {
    clearAll();
  }
}

function isNumberKey(key) {
  return !isNaN(key);
}

function isEnterKey(key) {
  return key === 'Enter';
}

function isBackspaceKey(key) {
  return key === 'Backspace';
}

function isOperatorKey(key) {
  return ['+', '-', '*', '/'].includes(key);
}

function isEscapeKey(key) {
  return key === 'Escape';
}

function handleInput(number) {
  currentInput = currentInput === '0' ? number : currentInput + number;
  updateDisplay(currentInput);
}

function handleEquals() {
  if (operator && previousInput) {
    currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
    resetOperatorAndPreviousInput();
    updateDisplay(currentInput);
  }
}

function handleBackspace() {
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay(currentInput);
}

function handleOperatorInput(op) {
  if (currentInput !== '0') {
    if (operator) {
      handleEquals();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
  }
}

function resetOperatorAndPreviousInput() {
  operator = '';
  previousInput = '';
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  updateDisplay(currentInput);
}