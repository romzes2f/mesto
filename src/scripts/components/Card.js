export class Card {
    constructor(cardItem, myId, cardObj) {
        this._card = cardItem;
        this._myId = myId._id;
        this._templateSelector = cardObj.templateSelector;
        this._openDeletePopup = cardObj.openDeletePopup;
        this._handleCardClick = cardObj.handleCardClick;
        this._handleLike = cardObj.handleLike;
    }

    _cloneTemplate() {
        return document
        .getElementById(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _toggleLike = () => {
        this._like.classList.contains('element__react_active')
        ? this._removeLike()
        : this._addLike();
    }

    async _addLike() {
        try {
            const newCard = await this._handleLike(true, this._card);
            this._like.classList.add('element__react_active');
            this._likesCount.textContent = newCard.likes.length;
        } catch(err) {
            console.error('Ошибка постановки лайка: ', err);
        }
    }

    async _removeLike() {
        try {
            const newCard = await this._handleLike(false, this._card);
            this._like.classList.remove('element__react_active');
            this._likesCount.textContent = newCard.likes.length;
        } catch(err) {
            console.error('Ошибка удаления лайка: ', err);
        }
    }

    _checkLikeCount() {
        this._likes = this._card.likes;
        this._likes.forEach(likeOwner => {
            this._checkLikeStatus(likeOwner);
        }); 
        this._likesCount = this._clone.querySelector('.element__react-count');
        this._likesCount.textContent = this._likes.length;
    }

    _checkLikeStatus(likeOwner) {
        if(likeOwner._id === this._myId) {
            this._like.classList.add('element__react_active');
        }
    }

    _checkCardOwnerId() {
        this._myId === this._card.owner._id
        ? this._trash.style = 'display: block' 
        : this._trash.style = 'display: none';
    }

    deleteCard() {
        this._clone.remove();
        this._clone = null;
    }

    _handleDeleteCard = () => {
        this._openDeletePopup.open(this, this._card);
    }

    _setEventListeners() {
        this._like = this._clone.querySelector('.element__react');
        this._trash = this._clone.querySelector('.element__remove');

        this._like.addEventListener('click', this._toggleLike);
        this._trash.addEventListener('click', this._handleDeleteCard);
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardImage));
    }

    createCard() {
        this._clone = this._cloneTemplate();

        this._cardImage = this._clone.querySelector('.element__photo');
        this._cardTitle = this._clone.querySelector('.element__title');

        this._cardImage.src = this._card.link;
        this._cardImage.alt = this._card.name;
        this._cardTitle.textContent = this._card.name;

        this._setEventListeners();

        this._checkCardOwnerId();
        this._checkLikeCount();

        return this._clone;
    }
}