export default class Api {
    constructor(options) {
        this.options = options;
        this.getUserData = this.getUserData.bind(this);
        this.getInitialCards = this.getInitialCards.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.addCard = this.addCard.bind(this);
        this.remove = this.remove.bind(this);
        this.setLikeState = this.setLikeState.bind(this);
        this.removeLikeState = this.removeLikeState.bind(this);
        this.setNewAvatar = this.setNewAvatar.bind(this);
    }


    /*REVIEW2. Правильно, что Вы написали инструкцию return перед fetch в методах Api, нужно возвращать всю конструкцию с fetch и then,
    которая сразу и выполняется и возвращает потом промис (я Вам забыла return написать в образце( ).
    */

    getUserData() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: {
                authorization: this.options.headers.authorization
            }
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            });
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: {
                authorization: this.options.headers.authorization
            }
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            });
    }

    updateUserInfo(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
            });
    }

    addCard(name, link) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            });
    }

    remove(id) {
        return fetch(`${this.options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            }
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
            });
    }

    setLikeState(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            });
    }

    removeLikeState(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            });
    }

    setNewAvatar(link) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `${link}`
            })
          })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
            });
    }
}