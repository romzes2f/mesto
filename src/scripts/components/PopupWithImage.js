import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._popupTitle = this._popup.querySelector('.popup__place');
    }

    open(imageTitle, imageUrl) {
        this._popupPhoto.src = imageUrl;
        this._popupPhoto.alt = imageTitle;
        this._popupTitle.textContent = imageTitle;
        super.open();
    }
}