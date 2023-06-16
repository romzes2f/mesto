export class Section {
    constructor(containerSelector, renderer) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderCard(cardData) {
        this._addItem(this._renderer(cardData));
    }

    _addItem(newCard) {
        this._container.prepend(newCard);
    }
}