import "../pages/index.css"

import {
    validationConfig,
    userNameSelector,
    userStatusSelector,
    userAvatarSelector,
    popupProfileSelector,
    popupOpenButtonProfile,
    popupFormProfile,
    popupProfileInputName,
    popupProfileInputStatus,
    popupPlaceSelector,
    popupPlaceInputName,
    popupPlaceInputLink,
    popupOpenButtonPlace,
    popupFormPlace,
    popupFormAvatar,
    popupAvatarSelector,
    popupOpenButtonAvatar,
    avatarUrl,
    popupAvatarInput,
    cardListSelector,
    templateSelector,
    popupImageSelector,
    popupDeleteSelector
} from "../scripts/utils/Constants.js";

import { Api } from "../scripts/components/Api.js"
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithSubmitForm } from "../scripts/components/PopupWithConfirmation.js";

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization: '5e341264-ca7e-4fb2-b0c7-97939544a65a',
        'Content-Type': 'application/json'
    }
})

let userId = null;

Promise.all([
    api.receiveUserInfo(),
    api.receiveCardsInfo()
])
    .then(([info, initialCards]) => {
        userInfo.setUserInfo(info);
        userInfo.setUserAvatar(info);
        userId = info._id;
        initialCards.forEach((data) => {
            cardList.addItem(createCard(data));
        })
    })
    .catch((err) => {
        console.log(err);
    })


//Section & Card//
const popupDelete = new PopupWithSubmitForm(popupDeleteSelector, handleDeleteConfirm);
popupDelete.setEventListeners();

const createCard = (data) => {
    const card = new Card(data,
        templateSelector,
        handleCardClick,
        (id) => {
            api.likeCard(id)
                .then((data) => {
                    card.handleCardLike(data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        (id) => {
            api.deleteLike(id)
                .then((data) => {
                    card.handleCardLike(data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        () => {
            popupDelete.open(card);
        },
        userId);
    return card.generateCard();
}

function handleDeleteConfirm({ item, itemId }) {
    api.deleteCard(itemId)
        .then(() => {
            item.removeCard();
            popupDelete.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

const cardList = new Section({
    data: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, cardListSelector);
cardList.renderItems();

const handleCardClick = (name, link) => {
    popupImage.open(name, link);
}

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

///Form Validation//
const validationformEditProfile = new FormValidator(validationConfig, popupFormProfile);
const validationformAddPlace = new FormValidator(validationConfig, popupFormPlace);
const validationformEditAvatar = new FormValidator(validationConfig, popupFormAvatar);

validationformEditProfile.enableValidation();
validationformAddPlace.enableValidation();
validationformEditAvatar.enableValidation();

///Profile///
const userInfo = new UserInfo(userNameSelector, userStatusSelector, userAvatarSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileSubmit);
popupProfile.setEventListeners();

function handleProfileSubmit() {
    popupProfile.renderLoading(true)
    api.editProfileInfo({
        name: popupProfileInputName.value,
        about: popupProfileInputStatus.value
    })
        .then((data) => {
            userInfo.setUserInfo(data);
            popupProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupProfile.renderLoading(false)
        })
}

const openPopupProfile = () => {
    validationformEditProfile.resetError();
    validationformEditProfile.resetButton();
    const userData = userInfo.getUserInfo();
    popupProfileInputName.value = userData.name;
    popupProfileInputStatus.value = userData.status;
    popupProfile.open();
}

popupOpenButtonProfile.addEventListener('click', openPopupProfile);

///New Card///
const popupNewCard = new PopupWithForm(popupPlaceSelector, handleCardSubmit);
popupNewCard.setEventListeners();

function handleCardSubmit() {
    popupNewCard.renderLoading(true)
    api.createNewCard({
        name: popupPlaceInputName.value,
        link: popupPlaceInputLink.value
    })
        .then((data) => {
            cardList.addItem(createCard(data));
            popupNewCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupNewCard.renderLoading(false)
        })
}

const openPopupCard = () => {
    validationformAddPlace.resetError();
    validationformAddPlace.resetButton();
    popupNewCard.open();
}

popupOpenButtonPlace.addEventListener('click', openPopupCard)

//Profile Avatar///
const popupAvatar = new PopupWithForm(popupAvatarSelector, handleAvatarSubmit);
popupAvatar.setEventListeners();

function handleAvatarSubmit() {
    popupAvatar.renderLoading(true)
    api.changeAvatar({
        avatar: popupAvatarInput.value
    })
        .then((data) => {
            userInfo.setUserAvatar(data);
            popupAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatar.renderLoading(false)
        })
}

const openPopupAvatar = () => {
    validationformEditAvatar.resetError();
    validationformEditAvatar.resetButton();
    const userAvatar = userInfo.getUserAvatar();
    popupAvatarInput.value = userAvatar.avatar;
    popupAvatar.open();
}

popupOpenButtonAvatar.addEventListener('click', openPopupAvatar)