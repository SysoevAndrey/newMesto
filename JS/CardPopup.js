import Popup from "./Popup.js";
export default class CardPopup extends Popup {
    constructor(popup, preparation, closeButton, openButton) {
        super(popup, preparation, closeButton, openButton = null);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open(url, evt) {
        if (evt.target.classList.contains('place-card__image')) {
            this.preparation(url);
            this.popup.classList.add('popup_is-opened');
        }
    }

    setEventListeners() {
        this.closeButton.addEventListener('click', this.close);
    }
}