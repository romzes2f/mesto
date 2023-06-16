// Подключение файлов стилей и скриптов

import './index.css';

import { validationConfig } from "../scripts/utils/constants.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { Api } from '../scripts/components/Api.js';

// Ищем кнопки открытия попапов

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupAvatarOpenButton = document.querySelector('.profile__avatar-edit');

// Запускаем валидацию

const popupProfileFormValidator = new FormValidator(validationConfig, '.popup-profile__form');
const popupCardFormValidator = new FormValidator(validationConfig, '.popup-place__form');
const popupAvatarFormValidator = new FormValidator(validationConfig, '.popup-avatar__form');

popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

// Загружаем начальные данные с API

const api = new Api( {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization: '5e341264-ca7e-4fb2-b0c7-97939544a65a',
        'Content-Type': 'application/json' 
    }
});

let myId = {}; // Создаем объект для данных профиля

Promise.all([
    api.getCards(), // Запрашиваем массив карточек с сервера
    api.getId() // Запрашиваем данные юзера
])
.then(([cards, user]) => {
    myId = user; // наполняем объект свойствами
    cards.reverse().forEach((card) => cardsList.renderCard(card));
    userInfo.setUserInfo(user);
})

// Создаем экземпляры классов

const popupDelete = new PopupWithConfirmation('.popup-delete', async (cardElement, card) => {
    await api.deleteCard(card._id);
    cardElement.deleteCard();
    popupDelete.close();
});

const popupImage = new PopupWithImage('.popup-image');

const cardObj = { // объект с параметрами создания экземпляров класса Card 
    templateSelector: 'element',
    openDeletePopup: popupDelete,
    handleCardClick: (card) => { // Функция открытия фото в попапе
            popupImage.open(card);
        },
    handleLike: async (notLiked, card) => { // Функция клика по лайкам
        try {
            if(notLiked) {
                return await api.putLike(card._id);
            } else {
                return await api.deleteLike(card._id);
            }
        } catch(err) {
            console.log(err);
        }
    }
}

const cardsList = new Section('.elements', (cardItem) => {
    const newCard = new Card(cardItem, myId, cardObj);
    return newCard.createCard();
});

const userInfo = new UserInfo( { 
    titleSelector: '.profile__name', 
    captionSelector: '.profile__description', 
    avatarSelector: '.profile__avatar' 
} )

const popupProfile = new PopupWithForm('.popup-profile', async (inputValues) => {
    const info = await api.updateProfile(inputValues);
    userInfo.setUserInfo(info);
}, () => popupProfileFormValidator.checkValidityError());

const popupCard = new PopupWithForm('.popup-place', async (inputValues) => {
    const card = await api.postCard(inputValues);
    cardsList.renderCard(card);
}, () => popupCardFormValidator.checkValidityError());

const popupAvatar = new PopupWithForm('.popup-avatar', async (inputValue) => {
    const info = await api.updateAvatar(inputValue);
    userInfo.setAvatar(info.avatar);
}, () => popupAvatarFormValidator.checkValidityError());

// Добавляем слушатели

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

function handlePopupProfile() { // Обрабатываем открытие попапа профиля
    popupProfileFormValidator.setButtonDisabled(); 
    popupProfile.setInputValues(userInfo.getUserInfo());
    popupProfile.open();
}

function handlePopupCard() { // Обрабатываем открытие попапа карточки
    popupCardFormValidator.setButtonDisabled();
    popupCard.open();
}

function handlePopupAvatar() { // Обрабатываем открытие попапа с аватаром
    popupAvatarFormValidator.setButtonDisabled();
    popupAvatar.open()
}
// Добавляем обработчики открытия попапов

popupProfileOpenButton.addEventListener('click', handlePopupProfile);
popupCardOpenButton.addEventListener('click', handlePopupCard);
popupAvatarOpenButton.addEventListener('click', handlePopupAvatar);