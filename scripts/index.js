///Popups - Profile, Place, Image///
const popupEditProfile = document.querySelector(".popup-profile");
const popupAddPlace = document.querySelector(".popup-place");
const popupEnlargeImage = document.querySelector(".popup-image");

///Функция - Открыть окно///
const openPopupElement = function (popup) {
    popup.classList.add('popup_opened');
}

///Функция - Закрыть окно///
const closePopupElement = function (popup) {
    popup.classList.remove('popup_opened');
}

///Buttons - Открыть окно///
const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
const popupOpenButtonPlace = document.querySelector(".profile__add-button");
const popupOpenButtonImage = document.querySelector(".element__photo");

popupOpenButtonProfile.addEventListener('click', function() {
    openPopupElement(popupEditProfile);
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
})

popupOpenButtonPlace.addEventListener('click', function() {
    openPopupElement(popupAddPlace);
    popupPlaceInputName.value = '';
    popupPlaceInputLink.value = '';
})

///Buttons - Закрыть окно///
const popupCloseButtonProfile = document.querySelector(".popup-profile__close");
const popupCloseButtonPlace = document.querySelector(".popup-place__close");
const popupCloseButtonImage = document.querySelector(".popup-image__close");

///Events///
popupCloseButtonProfile.addEventListener('click', function() {
    closePopupElement(popupEditProfile);
})

popupCloseButtonPlace.addEventListener('click', function() {
    closePopupElement(popupAddPlace);
})

popupCloseButtonImage.addEventListener('click', function() {
    closePopupElement(popupEnlargeImage);
})

///Профиль///
const popupFormProfile = document.querySelector(".popup-profile__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupInputName = popupFormProfile.querySelector(".popup__input_type_name");
const popupInputDescription = popupFormProfile.querySelector(".popup__input_type_description");

///Профиль - Submit///
function EditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopupElement(popupEditProfile);
}

popupFormProfile.addEventListener('submit', EditProfile);

///Grid Template///
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const placeContainer = document.querySelector(".place-container");
const placeTemplate = document.querySelector(".element-template").content;
const popupPlacePhoto =popupEnlargeImage.querySelector(".popup__photo");
const popupPlaceTitle = popupEnlargeImage.querySelector(".popup__place");

///InitialCards///
function renderInitialCards(item) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const titleElement = placeElement.querySelector('.element__name');
    titleElement.textContent = item.name;
    const photoElement = placeElement.querySelector('.element__photo');
    photoElement.src = item.link;
    const reactElement = placeElement.querySelector('.element__react');
    const removeElement = placeElement.querySelector('.element__remove');

    reactElement.addEventListener('click', () => {
        reactElement.classList.toggle('element__react_active')
    });

    removeElement.addEventListener('click', () => {
        placeElement.remove();
    });

    photoElement.addEventListener('click', () => {
        openPopupElement(popupEnlargeImage);
        popupPlacePhoto.src = photoElement.src;
        popupPlaceTitle.textContent = titleElement.textContent;
    });

    return placeElement;
};

///Функция///
initialCards.forEach(element => {
    const initialCard = renderInitialCards(element);
    placeContainer.append(initialCard);
});

const popupPlaceFormElement = document.querySelector(".popup-place__form");
const popupPlaceInputName = popupPlaceFormElement.querySelector('.popup__input_type_place');
const popupPlaceInputLink = popupPlaceFormElement.querySelector('.popup__input_type_link');

///Функция///
function addCard(evt) {
    evt.preventDefault();
    const newCard = renderInitialCards({
    name: popupPlaceInputName.value,
    link: popupPlaceInputLink.value
    })
    placeContainer.prepend(newCard);
    closePopupElement(popupAddPlace);
    evt.target.reset();
}

popupPlaceFormElement.addEventListener('submit', addCard);