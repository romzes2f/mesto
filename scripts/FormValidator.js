export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButton = config.submitButton;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(this._submitButton);
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _setEventListeners() {
    this._disableButtonSubmit(this._submitButton);
    this._formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkValidityInput(input);
        if (this._hasInvalidInput(this._formInputs)) {
          this._disableButtonSubmit(this._submitButton);
        }
        else {
          this._enableButtonSubmit(this._submitButton);
        }
      });
    });
  }

  _checkValidityInput = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hasInvalidInput() {
    return this._formInputs.some(inputElement => !inputElement.validity.valid)
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.getElementById(`${inputElement.getAttribute('name')}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.getAttribute('name')}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _disableButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButtonSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetError() {
    this._formElement.querySelectorAll(this._inputSelector).forEach((input) => {
      if (!input.validity.valid) {
        this._hideInputError(input);
      }
    });
  }

  resetButton() {
    this._disableButtonSubmit(this._buttonElement);
  }
}