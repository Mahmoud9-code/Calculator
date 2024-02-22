const toggleElement = document.querySelector('.themes__toggle');

const toggleDarkTheme = () => {
    toggleElement.classList.toggle('themes__toggle--isActive');
};

const toggleThemeWithEnter = (event) => {
    if (event.key === "Enter") {
        toggleDarkTheme();
    };
};

toggleElement.addEventListener('click', toggleDarkTheme);
toggleElement.addEventListener('keydown', toggleThemeWithEnter);
// Logic for clac
let storedNumber = '';
let currentNumber = '';
let operation = '';

let resultElement = document.querySelector('.calc__result');
const keysButtons = document.querySelectorAll('[data-type]');

const updateScreen = (value) => {
    resultElement.innerText = !value ? "0" : value;
}
const resetButtonEvent = () => {
    storedNumber = '';
    currentNumber = '';
    operation = '';

    updateScreen(currentNumber);
};

const deleteButtonEvent = () => {
    if (!currentNumber|| currentNumber === '0') {
        return;
    }else if (currentNumber.length == 1) {
        currentNumber = '';
    } else {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    }
    console.log(0)
    updateScreen(currentNumber);
};

const operationButtonValue = (operationValue) => {
    if (!currentNumber && !storedNumber) {
        return;
    }
    if (currentNumber && !storedNumber) {
        storedNumber = currentNumber;
        currentNumber = '';
        operation = operationValue;
    }else if (storedNumber) {
        operation = operationValue;
    }else if (currentNumber) {
        executedOperation();
    }
}
const executedOperation = () => {
    switch(operation) {
        case'+':
        storedNumber = +storedNumber + +currentNumber;
        currentNumber = '';
        updateScreen(storedNumber);
        break;
        case'*':
        storedNumber = +storedNumber * +currentNumber;
        currentNumber = '';
        updateScreen(storedNumber);
        break;
        case'/':
        storedNumber = +storedNumber / +currentNumber;
        currentNumber = '';
        updateScreen(storedNumber);
        break;
        case'-':
        storedNumber = +storedNumber - +currentNumber;
        currentNumber = '';
        updateScreen(storedNumber);
        break;
        default:
            
    }
}
const buttonElemntHandel = (value) => {
    if (value === '.' && currentNumber.includes('.')) {
        return;
    }
    if (value === '0' && !currentNumber) {
        return;
    }
    currentNumber += value;
    updateScreen(currentNumber);
};
keysButtons.forEach(function (ele) {
    ele.addEventListener('click', () => {
        const type = ele.dataset.type;
        if (type === 'number') {
            buttonElemntHandel(ele.dataset.value)
        }else if (type === 'operation') {
            switch(ele.dataset.value) {
                case'c':
                resetButtonEvent();
                break;
                case'Backspace':
                deleteButtonEvent();
                break;
                case'Enter':
                executedOperation();
                break;
                default:
                    operationButtonValue(ele.dataset.value);

            };
        };
    });
});

const buttonsNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const buttonsOperations = ['/', '*', '-', '+'];
const allButtonEvents = [...buttonsNumber, ...buttonsOperations, 'c', 'Backspace', 'Enter'];

window.addEventListener('keydown', (event) => {
    keyBoardWithHover(event.key)
});

const keyBoardWithHover = (key) => {
    if (buttonsNumber.includes(key)) {
        buttonElemntHandel(key);
    }else if (buttonsOperations.includes(key)) {
        operationButtonValue(key)
    }else if (key === 'Backspace') {
        deleteButtonEvent();
    }else if(key === 'Enter') {
        executedOperation();
    }else if(key === 'c') {
        resetButtonEvent();
    }

    if(allButtonEvents.includes(key)) {
        const element = document.querySelector(`[data-value='${key}']`);

        element.classList.add('hover');
        element.click();
        setTimeout(() => element.classList.remove('hover'),100);
    }
}