///Forms Validation///

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_invalid', ///красная полоска///
    errorClass: 'popup__error_active',    ///ошибка под полем ввода///
}

const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        setEventListeners(formElement, rest)
    })
}


const setEventListeners = (formElement, {inputSelector, submitButton, ...rest}) => {
    const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const formButton = formElement.querySelector(submitButton);
    disableButtonSubmit(formButton, rest);
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkValidityInput(formElement, input, rest);
            if (hasInvalidInput(formInputs)) {
                disableButtonSubmit(formButton, rest);
            }
            else {
                enableButtonSubmit(formButton, rest);
            }
        });
    });
}

const checkValidityInput = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    } else {
        showInputError(formElement, inputElement, errorClass, inputErrorClass);
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

const showInputError = (formElement, input, errorClass, inputErrorClass) => {
    const inputName = input.getAttribute('name');
    const errorElement = formElement.querySelector(`#${inputName}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

const hideInputError = (formElement, input, errorClass, inputErrorClass) => {
    const inputName = input.getAttribute('name');
    const errorElement = formElement.querySelector(`#${inputName}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    input.classList.remove(inputErrorClass);
}

enableValidation(config);

const resetError = (formElement) => {
    formElement.querySelectorAll(config.inputSelector).forEach((input) => {
        if (!input.validity.valid) {
            hideInputError(formElement, input, config.errorClass, config.inputErrorClass);
        }        
    });
}

const resetButton = (formElement) => {
    const buttonElement = formElement.querySelector(config.submitButton);
    disableButtonSubmit(formElement, buttonElement, config);
}