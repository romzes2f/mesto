import { initialCards } from "./InitialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopupElement } from "./utils.js";
import { closePopupElement } from "./utils.js";

const popupEditProfile = document.querySelector(".popup-profile");
const popupAddPlace = document.querySelector(".popup-place");
const formEditProfile = document.querySelector(".popup-profile__form");
const formAddPlace = document.querySelector(".popup-place__form");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active',
}

const validationformEditProfile = new FormValidator(validationConfig, formEditProfile);
const validationformAddPlace = new FormValidator(validationConfig, formAddPlace);

validationformEditProfile.enableValidation();
validationformAddPlace.enableValidation();


///Popups Opening///

const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
const popupOpenButtonPlace = document.querySelector(".profile__add-button");

popupOpenButtonProfile.addEventListener('click', function () {
  validationformEditProfile.resetError();
  validationformEditProfile.disableButtonSubmit();
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopupElement(popupEditProfile);
})

popupOpenButtonPlace.addEventListener('click', function () {
  validationformAddPlace.resetError();
  validationformAddPlace.disableButtonSubmit();
  formAddPlace.reset();
  openPopupElement(popupAddPlace);
})

///Popups Closing///

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopupElement(popup));
});

const closePopupByClickOverlay = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target == evt.currentTarget) {
        closePopupElement(popup)
      };
    });
  });
}

closePopupByClickOverlay();


///Profile///

const popupFormProfile = document.querySelector(".popup-profile__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupInputName = popupFormProfile.querySelector(".popup__input_type_name");
const popupInputDescription = popupFormProfile.querySelector(".popup__input_type_description");

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopupElement(popupEditProfile);
}

popupFormProfile.addEventListener('submit', submitEditProfileForm);

///Cards///

const placeContainer = document.querySelector('.place-container');
const template = document.querySelector(".element-template").content.querySelector(".element");

function createCard(element, template) {
  const card = new Card(element, template);
  return card.generateCard();
};

initialCards.forEach((element) => {
  const cardElement = createCard(element, template);
  placeContainer.prepend(cardElement);
});

///Add Card///

const popupPlaceFormElement = document.querySelector(".popup-place__form");
const popupPlaceInputName = popupPlaceFormElement.querySelector(".popup__input_type_place");
const popupPlaceInputLink = popupPlaceFormElement.querySelector(".popup__input_type_link");

function addPlaceElement(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: popupPlaceInputName.value,
    link: popupPlaceInputLink.value,
    alt: popupPlaceInputName.value
  }, template);
  placeContainer.prepend(newCard);
  closePopupElement(popupAddPlace);
  evt.target.reset();
}

popupPlaceFormElement.addEventListener('submit', addPlaceElement);