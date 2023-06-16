import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__photo');
        this._showImageDescription = this._popup.querySelector('.popup__title');
    }

    open = (item) => {
        this._popupImage.src = item.src;
        this._popupImage.alt = item.alt;
        this._showImageDescription.textContent = item.alt;
        super.open();
    }
}