const popupElement = document.querySelector(".popup");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupCloseButtonElement = document.querySelector(".popup__close");

let popupFormElement = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let popupNameInput = popupFormElement.querySelector(".popup__input_type_name");
let popupDescriptionInput = popupFormElement.querySelector(".popup__input_type_description");

function show() {
    popupElement.classList.add('popup_opened');
    popupNameInput.value = profileName.textContent;
    popupDescriptionInput.value = profileDescription.textContent;
}

function close() {
    popupElement.classList.remove('popup_opened');
}

function submit(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;

    close()
}

popupOpenButtonElement.addEventListener('click', show);
popupCloseButtonElement.addEventListener('click', close);
popupFormElement.addEventListener('submit', submit);