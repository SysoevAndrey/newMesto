import "../pages/index.css";
import Api from "./Api.js";
import Card from "./Card.js";
import CardList from "./CardList.js";
import Popup from "./Popup.js";
import CardPopup from "./CardPopup.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";

(function () {
    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка'
    };
    console.log(NODE_ENV);
    console.log(process.env.NODE_ENV);
    const url = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort11' : 'https://praktikum.tk/cohort11';

    const formSelectors = {
        button: '.button',
        buttonActive: 'popup__button_active',
        input: '.popup__input'
    }

    const api = new Api({
        baseUrl: url,
        headers: {
            authorization: '7fe5dcae-27ca-4640-a0c2-73b577089034',
            'Content-Type': 'application/json'
        }
    });

    const addFormOpen = document.querySelector('.user-info__button');
    const editFormOpen = document.querySelector('.user-info__edit-button');
    const avatarFormOpen = document.querySelector('.user-info__photo');
    const closeAddForm = document.querySelector('.add-popup__close');
    const closeEditForm = document.querySelector('.edit-popup__close');
    const closeCardForm = document.querySelector('.card-popup__close');
    const closeAvatarForm = document.querySelector('.avatar-popup__close');
    const editNameInput = document.querySelector('.edit-popup__input_type_name');
    const editDescInput = document.querySelector('.edit-popup__input_type_desc');

    const resultName = document.querySelector('.user-info__name');
    const resultDesc = document.querySelector('.user-info__job');
    const addForm = document.querySelector('.add-popup__form');
    const editForm = document.querySelector('.edit-popup__form');
    const avatarForm = document.querySelector('.avatar-popup__form');
    const addBlock = document.querySelector('.add-popup');
    const editBlock = document.querySelector('.edit-popup');
    const avatarBlock = document.querySelector('.avatar-popup');
    const cardBlock = document.querySelector('.card-popup');
    const cardImage = cardBlock.querySelector('.card-popup__image');
    const template = document.querySelector('.template-card').content;
    const userPhoto = document.querySelector('.user-info__photo');
    let cardlist = null;
    let pageOwner = null;

    const userinfo = new UserInfo();

    const addFormValid = new FormValidator(addForm, errorMessages, formSelectors);
    const editFormValid = new FormValidator(editForm, errorMessages, formSelectors);
    const avatarFormValid = new FormValidator(avatarForm, errorMessages, formSelectors);

    api.getUserData()
        .then(data => {
            userinfo.setUserInfo(data.name, data.about);
            userinfo.updateUserInfo(resultName, resultDesc);
            userPhoto.style.backgroundImage = `url(${data.avatar})`;
            pageOwner = data._id;
        })
        .catch(err => {
            console.log(err);
        });

    api.getInitialCards()
        .then(cards => {
            cardlist = new CardList(document.querySelector('.places-list'), cards, createCard, pageOwner);
            cardlist.render();
        })
        .catch(err => {
            console.log(err);
        });

    function removeCard(id) {
        api.remove(id)
            .catch(err => {
                console.log(err);
            });
    }

    function changeLikeState(isLiked, id) {
        if (isLiked) {
            return api.setLikeState(id);
        } else {
            return api.removeLikeState(id);
        }
    }

    function createCard(name, link, likes, owner, id, pageOwner) {
        const cardObj = {
            cardPopupMethod: cardPopup.open,
            template: template,
            name: name,
            link: link,
            likes: likes,
            owner: owner,
            id: id,
            removeCardMethod: removeCard,
            changeLikeMethod: changeLikeState

        }

        const newCard = new Card(cardObj);

        return newCard.create(pageOwner);
    }

    function getUserInfo() {
        editNameInput.value = userinfo.name;
        editDescInput.value = userinfo.desc;
        editFormValid.hideErrors();

        editFormValid.setSubmitButtonState(true);
    }

    function clearAddForm() {
        addForm.reset();
        addFormValid.hideErrors();
        addFormValid.setSubmitButtonState(false);
    }

    function clearAvatarForm() {
        avatarForm.reset();
        avatarFormValid.hideErrors();
        avatarFormValid.setSubmitButtonState(false);
    }

    const addPopup = new Popup(addBlock, clearAddForm, closeAddForm, addFormOpen);

    addPopup.setEventListeners();

    const editPopup = new Popup(editBlock, getUserInfo, closeEditForm, editFormOpen);

    editPopup.setEventListeners();

    const cardPopup = new CardPopup(cardBlock, openCard, closeCardForm);

    cardPopup.setEventListeners();

    const avatarPopup = new Popup(avatarBlock, clearAvatarForm, closeAvatarForm, avatarFormOpen);

    avatarPopup.setEventListeners();

    function openCard(url) {
        cardImage.src = url;
    }

    function updateDataOnPage() {
        api.getUserData()
            .then(data => {
                userinfo.setUserInfo(data.name, data.about);
                userinfo.updateUserInfo(resultName, resultDesc);
                editPopup.close();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function updateAvatarOnPage() {
        api.getUserData()
            .then(data => {
                avatarFormOpen.style.backgroundImage = `url(${data.avatar})`;
                avatarPopup.close();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function renderLoading(form, isLoading, initialState) {
        const button = form.querySelector('.popup__button');

        if (isLoading) {
            console.log();
            button.textContent = 'Загрузка';
        } else {
            button.textContent = initialState;
        }
    }

    function sendAddForm(evt) {
        evt.preventDefault();

        renderLoading(evt.target, true, '+');

        const elements = [...evt.target.elements];
        const [name, link] = elements;

        api.addCard(name.value, link.value)
            .then(card => {
                cardlist.addCard(card.name, card.link, card.likes, card.owner._id, card._id);
                renderLoading(evt.target, false, '+');
            })
            .catch(err => {
                console.log(err);
            });

        addPopup.close();
    }

    function sendEditForm(evt) {
        evt.preventDefault();

        renderLoading(evt.target, true, 'Сохранить');


        const elements = [...evt.target.elements];
        const [name, desc] = elements;

        api.updateUserInfo(name.value, desc.value)
            .then(() => {
                updateDataOnPage();
                renderLoading(evt.target, false, 'Сохранить');
            })
            .catch(err => {
                console.log(err);
            })
    }

    function sendAvatarForm(evt) {
        evt.preventDefault();

        renderLoading(evt.target, true, 'Сохранить');

        const avatar = evt.target.elements.link.value;

        api.setNewAvatar(avatar)
            .then(() => {
                updateAvatarOnPage();
                renderLoading(evt.target, false, 'Сохранить');
            })
            .catch(err => {
                console.log(err);
            })
    }

    addForm.addEventListener('submit', sendAddForm);
    editForm.addEventListener('submit', sendEditForm);
    avatarForm.addEventListener('submit', sendAvatarForm);

    addFormValid.setEventListeners();
    editFormValid.setEventListeners();
    avatarFormValid.setEventListeners();
})();
