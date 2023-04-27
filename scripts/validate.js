///Forms Validation///

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_active',    
}

const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        });
        setEventListeners(formElement, rest)
    })
}

const setEventListeners = (formElement, {inputSelector, submitButton, ...rest}) => {
    const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const formButton = formElement.querySelector(submitButton);
    disableButtonSubmit(formButton, rest);
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkValidityInput(input, rest);
            if (hasInvalidInput(formInputs)) {
                disableButtonSubmit(formButton, rest);
            }
            else {
                enableButtonSubmit(formButton, rest);
            }
        });
    });
}

const checkValidityInput = (inputElement, {inputErrorClass, errorClass}) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorClass);
        disableInputError(inputElement, inputErrorClass);
    } else {
        showInputError(inputElement, errorClass);
        enableInputError(inputElement, inputErrorClass);
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some(inputElement => !inputElement.validity.valid)
  }

  const disableButtonSubmit = (button, {inactiveButtonClass}) => {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
}

const enableButtonSubmit = (button, {inactiveButtonClass}) => {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
}

const enableInputError = (input, inputErrorClass) => {
    input.classList.add(inputErrorClass);
}

const disableInputError = (input, inputErrorClass) => {
    input.classList.remove(inputErrorClass);
}

const showInputError = (input, errorClass) => {
    const inputName = input.getAttribute('name');
    const errorElement = document.getElementById(`${inputName}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (input, errorClass) => {
    const inputName = input.getAttribute('name');
    const errorElement = document.getElementById(`${inputName}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

enableValidation(config);

const resetError = (formElement) => {
    formElement.querySelectorAll(config.inputSelector).forEach((input) => {
        if (!input.validity.valid) {
            hideInputError(input, config.errorClass);
            disableInputError(input, config.inputErrorClass);
        }        
    });
}

const resetButton = (formElement) => {
    const buttonElement = formElement.querySelector(config.submitButton);
    disableButtonSubmit(buttonElement, config);
}