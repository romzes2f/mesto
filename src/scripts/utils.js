export const popupImage = document.querySelector(".popup-image");

export const openPopupElement = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', _closePopupWithEsc);
}

export const closePopupElement = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _closePopupWithEsc);
}

const _closePopupWithEsc = (evt) => {
    if (evt.code == "Escape") {
        const activePopup = document.querySelector('.popup_opened')
        if (activePopup) {
            closePopupElement(activePopup)
        }
    }
};
