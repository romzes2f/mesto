import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._popupTitul = this._popup.querySelector('.popup__place');
    }

    open(imageTitul, imageUrl) {
        this._popupPhoto.src = imageUrl;
        this._popupPhoto.alt = imageTitul;
        this._popupTitul.textContent = imageTitul;
        super.open();
    }
}