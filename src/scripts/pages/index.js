import {
  initialCards,
  validationConfig,
  userNameSelector,
  userDescriptionSelector,
  popupProfileSelector,
  popupOpenButtonProfile,
  popupFormProfile,
  popupProfileInputName,
  popupProfileInputDescription,
  popupPlaceSelector,
  popupOpenButtonPlace,
  popupFormPlace,
  popupPlaceInputName,
  popupPlaceInputLink,
  cardListSelector,
  templateSelector,
  popupImageSelector
} from "../utils/Constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
/*import '../../pages/index.css';*/


//Section и Card//

const сreateCard = ({ name, link }) => {
  const card = new Card({ name, link }, templateSelector, (name, link) => { popupImage.open(name, link) });
  return card.generateCard();
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = сreateCard(item);
    cardList.addItem(cardElement);
  }
}, cardListSelector);
cardList.renderItems();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const validationformEditProfile = new FormValidator(validationConfig, popupFormProfile);
const validationformAddPlace = new FormValidator(validationConfig, popupFormPlace);

validationformEditProfile.enableValidation();
validationformAddPlace.enableValidation();

const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);

const editUserInfo = (data) => {
  userInfo.setUserInfo(data);
}

const popupProfile = new PopupWithForm(popupProfileSelector, editUserInfo);
popupProfile.setEventListeners();

const editProfile = () => {
  validationformEditProfile.resetError();
  const { name, description } = userInfo.getUserInfo();
  popupProfileInputName.value = name;
  popupProfileInputDescription.value = description;
  popupProfile.open();
}

popupOpenButtonProfile.addEventListener('click', editProfile);

const addNewCard = (data) => {
  const newCardElement = сreateCard({
    name: data.placeInput,
    link: data.linkInput
  });
  cardList.addItem(newCardElement);
}

const popupNewCard = new PopupWithForm(popupPlaceSelector, addNewCard);
popupNewCard.setEventListeners();

const addCard = () => {
  validationformAddPlace.resetError();
  popupNewCard.open();
}

popupOpenButtonPlace.addEventListener('click', addCard)
