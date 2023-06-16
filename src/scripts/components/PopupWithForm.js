import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit, handleClose) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._handleClose = handleClose;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__close');
    }

    _getInputValues() {
        const inputValues = {}
        this._inputsList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setInputValues(info) {
        this._inputsList.forEach((input) => {
            input.value = info[input.name];
        });
        return this._inputValues;
    }

    async _handlePopupSubmit(evt) {
        evt.preventDefault();
        const originalText = this._submitButton.textContent;

        try {
            this._submitButton.textContent = 'Сохранение...';
            await this._handleFormSubmit(this._getInputValues());
            this.close();
        } catch (err) {
            console.log(err);
        } finally {
            this._submitButton.textContent = originalText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._handlePopupSubmit(evt));
    }

    close() {
        super.close();
        this._handleClose();
        this._form.reset();
    }
}