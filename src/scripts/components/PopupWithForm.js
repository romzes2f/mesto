import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._button = this._popup.querySelector('.popup__save');
        this._buttonDefault = this._button.textContent;
    }

    _getInputValues() {
        const data = {};
        this._inputs.forEach(input => {
            data[input.name] = input.value;
        });
        return data;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Сохранение...';
        } else {
            this._button.textContent = this._buttonDefault;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }
}