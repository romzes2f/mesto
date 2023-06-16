export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    receiveUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkingResponse);
    }

    receiveCardsInfo() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._checkingResponse);
    }

    editProfileInfo(info) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(info)
        })
            .then(this._checkingResponse);
    }

    createNewCard(info) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(info)
        })
            .then(this._checkingResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkingResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkingResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkingResponse);
    }

    changeAvatar(info) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(info)
        })
            .then(this._checkingResponse);
    }

    _checkingResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}  