class CardList {
    constructor(container, initialCards, createCard, pageOwner) {
        this.container = container;
        this.initialCards = initialCards;
        this.createCard = createCard;
        this.pageOwner = pageOwner;
    }

    addCard = (name, link, likes, owner, id) => {
        this.newCard = this.createCard(name, link, likes, owner, id, this.pageOwner);

        this.container.appendChild(this.newCard);
    }

    render = () => {
        this.initialCards.forEach((card) => {
            this.addCard(card.name, card.link, card.likes, card.owner._id, card._id);
        });
    }
}