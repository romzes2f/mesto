import "../pages/index.css";

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
  popupDeleteSelector,
} from "../scripts/utils/constants.js";

import { Api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithSubmitForm } from "../scripts/components/PopupWithConfirmation.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "5e341264-ca7e-4fb2-b0c7-97939544a65a",
    "Content-Type": "application/json",
  },
});

let userId = null;

Promise.all([api.receiveUserInfo(), api.receiveCardsInfo()])
  .then(([info, initialCards]) => {
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(info);
    userId = info._id;
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//Section & Card//
const popupDelete = new PopupWithSubmitForm(popupDeleteSelector, handleDeleteConfirm);
popupDelete.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    data,
    templateSelector,
    handleCardClick,
    (id) => {
      api
        .likeCard(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api
        .deleteLike(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    () => {
      popupDelete.open(card);
    },
    userId
  );
  return card.generateCard();
};

function handleDeleteConfirm({ item, itemId }) {
  api
    .deleteCard(itemId)
    .then(() => {
      item.removeCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const cardsSection = new Section((item) => {
  const cardElement = createCard(item);
  cardsSection.prependItem(cardElement);
}, cardListSelector);

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

///Form Validation//
const validationFormEditProfile = new FormValidator(validationConfig, popupFormProfile);
const validationFormAddPlace = new FormValidator(validationConfig, popupFormPlace);
const validationFormEditAvatar = new FormValidator(validationConfig, popupFormAvatar);

validationFormEditProfile.enableValidation();
validationFormAddPlace.enableValidation();
validationFormEditAvatar.enableValidation();

///Profile///
const userInfo = new UserInfo(userNameSelector, userStatusSelector, userAvatarSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileSubmit);
popupProfile.setEventListeners();

function handleProfileSubmit(formData) {
  popupProfile.renderLoading(true);

  const updatedData = {
    name: formData.nameInput,
    about: formData.descriptionInput,
  };

  api
    .editProfileInfo(updatedData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
}

const openPopupProfile = () => {
  validationFormEditProfile.resetError();
  validationFormEditProfile.resetButton();
  const userData = userInfo.getUserInfo();
  popupProfileInputName.value = userData.name;
  popupProfileInputStatus.value = userData.status;
  popupProfile.open();
};

popupOpenButtonProfile.addEventListener("click", openPopupProfile);

///New Card///
const popupNewCard = new PopupWithForm(popupPlaceSelector, handleCardSubmit);
popupNewCard.setEventListeners();

function handleCardSubmit(formData) {
  popupNewCard.renderLoading(true);

  const updatedData = {
    name: formData.placeInput,
    link: formData.linkInput,
  };

  api
    .createNewCard(updatedData)
    .then((data) => {
      cardsSection.prependItem(createCard(data));
      popupNewCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewCard.renderLoading(false);
    });
}

const openPopupCard = () => {
  validationFormAddPlace.resetError();
  validationFormAddPlace.resetButton();
  popupNewCard.open();
};

popupOpenButtonPlace.addEventListener("click", openPopupCard);

//Profile Avatar///
const popupAvatar = new PopupWithForm(popupAvatarSelector, handleAvatarSubmit);
popupAvatar.setEventListeners();

function handleAvatarSubmit(formData) {
  popupAvatar.renderLoading(true);

  const updatedData = {
    avatar: formData.avatarInput,
  };

  api
    .changeAvatar(updatedData)
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

const openPopupAvatar = () => {
  validationFormEditAvatar.resetError();
  validationFormEditAvatar.resetButton();
  const userAvatar = userInfo.getUserAvatar();
  popupAvatarInput.value = userAvatar.avatar;
  popupAvatar.open();
};

popupOpenButtonAvatar.addEventListener("click", openPopupAvatar);
