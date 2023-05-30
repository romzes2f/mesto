export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._image = data.link;
        this._alt = data.name;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector(".element").cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__react');
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._alt;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();
        return this._element;
    }

    _getLike() {
        this._likeButton.classList.toggle('element__react_active');
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
        this._likeButton = null;
        this._cardImage = null;
    }

    _expandImage() {
        this._handleCardClick(this._name, this._image);
    }


    _setEventListeners() {
        this._likeButton.addEventListener('click', () => { this._getLike() });
        this._element.querySelector('.element__remove').addEventListener('click', () => { this._removeCard() });
        this._cardImage.addEventListener('click', () => { this._expandImage() });
    }
}