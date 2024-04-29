class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getToken(jwt) {
    this._headers.authorization = `Bearer ${jwt}`;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards(headers = this._headers) {
    return fetch(`${this._url}/cards`, {
      headers: headers,
    }).then(this._getResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  setUserData(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(profileData),
    }).then(this._getResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(link),
    }).then(this._getResponse);
  }

  changeLikeCardStatus(card, likeStatus) {
    this._status = likeStatus
      ? this.putLikeCard(card)
      : this.deleteLikeCard(card);
    return this._status;
  }
}

export const configApi = new Api({
  url: "https://mesto.api.sdlmdev.site",
  headers: {
    "Content-Type": "application/json",
  },
});
