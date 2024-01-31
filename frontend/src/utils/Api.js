class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._token = headers['authorization'];
    this.headers = headers;
  }

  // универсальный метод для получения результата запроса
  _getResponse = respone => {
    return respone.ok ? respone.json() : Promise.reject(`Ошибка: ${respone.status}`);
  };

  // Загрузка информации о пользователе с сервера
  getUserInformation() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Загрузак карточек с сервера
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Редактирование профиля
  editUserInformation({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    }).then(res => this._getResponse(res));
  }

  // Добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }).then(res => this._getResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Постановка лайка
  _addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Удаление лайка
  _deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  //Метод выбора поставить лайк или снять
  likeCard({ cardId, isLiked }) {
    return isLiked ? this._deleteLike(cardId) : this._addLike(cardId);
  }

  //Обновление аватара пользователя
  editAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => this._getResponse(res));
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto.rusanov.nomoredomainsmonster.ru/',
  headers: {
    authorization: 'd686f3c3-25e3-4358-9762-4cd086d00e0f',
    'Content-Type': 'application/json'
  }
});
