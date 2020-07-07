export default class Popup {
    constructor(popup, preparation, closeButton, openButton = null) {
        this.popup = popup;
        this.closeButton = closeButton;
        this.openButton = openButton;
        this.preparation = preparation;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open() {
        if (document.querySelector('.popup_is-opened') === null) {
            this.preparation();
            this.popup.classList.add('popup_is-opened');
        }
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }

    setEventListeners() {
        this.openButton.addEventListener('click', this.open);
        this.closeButton.addEventListener('click', this.close);
    }
}
