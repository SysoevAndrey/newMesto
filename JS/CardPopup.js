class CardPopup extends Popup {    open = (url, evt) => {
        if (evt.target.classList.contains('place-card__image')) {
            this.preparation(url);
            this.popup.classList.add('popup_is-opened');
        }
    }

    setEventListeners = () => {
        this.closeButton.addEventListener('click', this.close);
    }
}