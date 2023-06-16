export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async getId() {
        try {
            const idData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: this._headers
            });
            return idData.json();
        } catch (err) {
            console.error('Ошибка получения ID: ', err);
        }
    }

    async getCards() {
        try {
            const cardsData = await fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            });
            return cardsData.json();
        } catch (err) {
            console.error('Ошибка получения списка карточек: ', err);
        }
    }

    async postCard(cardData) {
        try {
            const newCardData = await fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardData.title,
                    link: cardData.link
                })
            });
            return newCardData.json();
        } catch (err) {
            console.error('Ошибка отправки новой карточки : ', err);
        }
    }

    async updateProfile(inputValues) {
        try {
            const newProfileData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: inputValues.title,
                    about: inputValues.caption
                })
            });
            return newProfileData.json();
        } catch (err) {
            console.error('Ошибка обновления данных профиля: ', err);
        }
    }

    async updateAvatar(inputValue) {
        try {
            const newAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: inputValue.avatar
                })
            });
            return newAvatar.json();
        } catch (err) {
            console.error('Ошибка обновления аватара: ', err);
        }
    }

    async putLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            });
            return countLike.json();
        } catch (err) {
            console.error('Ошибка сервера при постановке лайка: ', err);
        }
    }

    async deleteLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            });
            return countLike.json();
        } catch (err) {
            console.error('Ошибка сервера при удалении лайка: ', err);
        }
    }

    async deleteCard(cardId) {
        try {
            const cardDelete = await fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            });
            return cardDelete.json();
        } catch (err) {
            console.error('Ошибка удаления карточки: ', err);
        }
    }
}