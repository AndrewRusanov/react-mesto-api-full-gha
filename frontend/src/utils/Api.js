class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  // универсальный метод для получения результата запроса
  _getResponse = respone => {
    return respone.ok ? respone.json() : Promise.reject(`Ошибка: ${respone.status}`);
  };

  // Загрузка информации о пользователе с сервера
  getUserInformation() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Загрузак карточек с сервера
  getCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Редактирование профиля
  editUserInformation({ name, about }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    }).then(res => this._getResponse(res));
  }

  // Добавление новой карточки
  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }).then(res => this._getResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Постановка лайка
  _addLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => this._getResponse(res));
  }

  // Удаление лайка
  _deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then(res => this._getResponse(res));
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
});
