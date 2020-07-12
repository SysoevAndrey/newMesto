export default class Card {
    constructor(objCard) {
        this.name = objCard.name;
        this.link = objCard.link;
        this._template = objCard.template;
        this.cardPopup = objCard.cardPopupMethod;
        this.likes = objCard.likes;
        this.owner = objCard.owner;
        this.id = objCard.id;
        this.removeCard = objCard.removeCardMethod;
        this.changeLike = objCard.changeLikeMethod;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.create = this.create.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    like() {
        if (this.buttonLike.classList.contains('place-card__like-icon_liked')) {
            this.changeLike(false, this.id)
                .then(res => {
                    this.likeCount.textContent = res.likes.length;
                    this.buttonLike.classList.remove('place-card__like-icon_liked');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this.changeLike(true, this.id)
                .then(res => {
                    this.likeCount.textContent = res.likes.length;
                    this.buttonLike.classList.add('place-card__like-icon_liked');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    remove() {
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            this.buttonLike.removeEventListener('click', this.like);
            this.cardImage.removeEventListener('click', this.cardPopup);
            this.deleteButton.removeEventListener('click', this.remove);
            this.removeCard(this.id);
            this.cardElement.remove();
        }
    }

    create(pageOwner) {
        this.cardElement = this._template.querySelector('.place-card').cloneNode(true);

        this.cardElement.querySelector('.place-card__name').textContent = this.name;
        this.cardElement.querySelector('.place-card__image').style.backgroundImage = `url("${this.link}")`;

        this.buttonLike = this.cardElement.querySelector('.place-card__like-icon');

        if (this.likes.some(elem => elem._id === pageOwner)) {
            this.buttonLike.classList.add('place-card__like-icon_liked');
        }

        this.cardImage = this.cardElement.querySelector('.place-card__image');
        this.likeCount = this.cardElement.querySelector('.place-card__like-count');
        this.likeCount.textContent = this.likes.length;

        if (this.owner === pageOwner) {
            this.deleteButton = this.cardElement.querySelector('.place-card__delete-icon');
            this.deleteButton.style.display = 'block';
        }

        this.setEventListeners(pageOwner);

        return this.cardElement;
    }

    setEventListeners(pageOwner) {
        this.buttonLike.addEventListener('click', this.like);

        this.cardImage.addEventListener('click', this.cardPopup.bind(null, this.link));

        if (this.owner === pageOwner) {
            this.deleteButton.addEventListener('click', this.remove);
        }
    }
}