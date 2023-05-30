export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
]

export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__description';

export const popupProfileSelector = '.popup-profile';
export const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
export const popupFormProfile = document.querySelector(".popup-profile__form");
export const popupProfileInputName = popupFormProfile.querySelector('.popup__input_type_name');
export const popupProfileInputDescription = popupFormProfile.querySelector('.popup__input_type_description');

export const popupPlaceSelector = '.popup-place';
export const popupOpenButtonPlace = document.querySelector(".profile__add-button");
export const popupFormPlace = document.querySelector(".popup-place__form");
export const popupPlaceInputName = popupFormPlace.querySelector('.popup__input_type_place');
export const popupPlaceInputLink = popupFormPlace.querySelector('.popup__input_type_link');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_active',
}

export const cardListSelector = '.place-container';
export const templateSelector = '.element-template';
export const popupImageSelector = '.popup-image';

