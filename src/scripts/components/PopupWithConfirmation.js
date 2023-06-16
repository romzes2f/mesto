import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._domElement, this._item);
        });
    }

    open(domElement, item) {
        super.open();
        this._domElement = domElement; 
        this._item = item;
    }
}