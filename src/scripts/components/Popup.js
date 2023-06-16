export class Popup {
    constructor(popupSelector){
        this.popupSelector = popupSelector;
        this._popup = document.querySelector(this.popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) =>{
        if (evt.code === "Escape") {
            this.close();
        }
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', () => { this.close()});
        this._popup.addEventListener('click', (evt) => { if (evt.target === this._popup) {
                this.close();
            };
        });
    }
}