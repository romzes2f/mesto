import { Popup } from "./Popup.js";

export class PopupWithSubmitForm extends Popup {
    constructor(popupSelector, handleDeleteConfirm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleDeleteConfirm = handleDeleteConfirm;
    }

    setSubmitAction(func) {
        this.func = func;
    }

    open(item) {
        super.open(); 

        this._item = item; 
        this._itemId = item.getId(); 
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleDeleteConfirm({ item: this._item, itemId: this._itemId });
        });
    }
}