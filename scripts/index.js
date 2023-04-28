///Popups//

const popupEditProfile = document.querySelector(".popup-profile");
const popupAddPlace = document.querySelector(".popup-place");
const popupEnlargeImage = document.querySelector(".popup-image");
const formEditProfile = document.querySelector(".popup-profile__form");
const formAddPlace = document.querySelector(".popup-place__form");

///Popups - Open (close) functions///

const openPopupElement = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEsc);
}

const closePopupElement = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEsc);
}

///Popups - Open Buttons///

const popupOpenButtonProfile = document.querySelector(".profile__edit-button");
const popupOpenButtonPlace = document.querySelector(".profile__add-button");
const popupOpenButtonImage = document.querySelector(".element__photo");

popupOpenButtonProfile.addEventListener('click', function() {
    resetError(formEditProfile);
    resetButton(formEditProfile);
    popupInputName.value = profileName.textContent;
    profileDescription.value = profileDescription.textContent;
    openPopupElement(popupEditProfile);
})

popupOpenButtonPlace.addEventListener('click', function () {  
    resetError(formAddPlace);
    resetButton(formAddPlace);
    formAddPlace.reset();
    openPopupElement(popupAddPlace);
})

///Popups - Close Buttons///

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopupElement(popup));
});

const closePopupWithEsc = (evt) => {
    if (evt.code == "Escape") {
        const activePopup = document.querySelector('.popup_opened')
        if (activePopup) {
            closePopupElement(activePopup)
        }
    }
};

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

closePopupByClickOverlay()

///Popup - Profile///

const popupFormProfile = document.querySelector(".popup-profile__form");

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupInputName = popupFormProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupFormProfile.querySelector('.popup__input_type_description');

function submitEditProfileForm(evt){
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopupElement(popupEditProfile);
}

popupFormProfile.addEventListener('submit', submitEditProfileForm);

///Grid Template///
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
    }
  ];

const placeContainer = document.querySelector(".place-container");
const placeTemplate = document.querySelector(".element-template").content;
const popupPlacePhoto =popupEnlargeImage.querySelector(".popup__photo");
const popupPlaceTitle = popupEnlargeImage.querySelector(".popup__place");

///Render InitialCards///

function renderInitialCards(item) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    const titleElement = placeElement.querySelector('.element__title');
    titleElement.textContent = item.name;
    const photoElement = placeElement.querySelector('.element__photo');
    photoElement.src = item.link;
    photoElement.alt = item.name;
    const elementLikeReact = placeElement.querySelector('.element__react');
    const removeElement = placeElement.querySelector('.element__remove');

    elementLikeReact.addEventListener('click', () => {
        elementLikeReact.classList.toggle('element__react_active')
    });

    removeElement.addEventListener('click', () => {
        placeElement.remove();
    });

    photoElement.addEventListener('click', () => {
        openPopupElement(popupEnlargeImage);
        popupPlacePhoto.src = photoElement.src;
        popupPlaceTitle.textContent = titleElement.textContent;
        popupPlacePhoto.alt = titleElement.textContent;
    });

    return placeElement;
};

initialCards.forEach(element => {
    const initialCard = renderInitialCards(element);
    placeContainer.append(initialCard);
});

const popupPlaceFormElement = document.querySelector(".popup-place__form");
const popupPlaceInputName = popupPlaceFormElement.querySelector('.popup__input_type_place');
const popupPlaceInputLink = popupPlaceFormElement.querySelector('.popup__input_type_link');

///Add New Card//

function addCard(evt) {
    evt.preventDefault();
    const newCard = renderInitialCards({
    name: popupPlaceInputName.value,
    link: popupPlaceInputLink.value
    })
    placeContainer.prepend(newCard);
    closePopupElement(popupAddPlace);
    /*evt.target.reset();*/
}

popupPlaceFormElement.addEventListener('submit', addCard);