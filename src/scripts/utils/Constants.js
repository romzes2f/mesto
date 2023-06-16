///Константы профиля////
export const userNameSelector = '.profile__name';
export const userStatusSelector = '.profile__description';
export const userAvatarSelector = '.profile__avatar';

///Константы попапа профиля////
export const popupProfileSelector = '.popup-profile';
export const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
export const popupFormProfile = document.querySelector(".popup-profile__form");
export const popupProfileInputName = popupFormProfile.querySelector('.popup__input_type_name');
export const popupProfileInputStatus = popupFormProfile.querySelector('.popup__input_type_description');

///Константы попапа карточки////
export const popupPlaceSelector = '.popup-place';
export const popupOpenButtonPlace = document.querySelector(".profile__add-button");
export const popupFormPlace = document.querySelector(".popup-place__form");
export const popupPlaceInputName = popupFormPlace.querySelector('.popup__input_type_place');
export const popupPlaceInputLink = popupFormPlace.querySelector('.popup__input_type_link');

///Константы попапа аватара////
export const popupFormAvatar = document.querySelector(".popup-avatar__form");
export const popupAvatarSelector = '.popup-avatar';
export const popupOpenButtonAvatar = document.querySelector(".profile__avatar-edit");
export const avatarUrl = document.querySelector(".profile__avatar");
export const popupAvatarInput = document.querySelector(".popup__input_type_avatar");

///Константы валидации////
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_active',    
}

///Константы карточек////
export const cardListSelector = '.place-container';
export const templateSelector = '.element-template';
export const popupImageSelector = '.popup-image';
export const popupDeleteSelector = '.popup-delete';