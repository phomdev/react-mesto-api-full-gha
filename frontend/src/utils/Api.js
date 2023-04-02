class Api {
  constructor(apiAddress) {
    this._link = apiAddress;
  }
  // Метод обработки ответа сервера
  _processingServerResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  // Метод инициализации карточек с сервера
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  // Метод добавления новой карточки на сервер
  addNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ name, link }),
    })
    .then(this._processingServerResponse)
  }
  // Метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  // Метод получения данных пользователя с сервера
  getUserData() {
    return fetch(`${this._link}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  // Метод отправки данных пользователя на сервер
  sendUserData(userName, userAbout) {
    return fetch(`${this._link}users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ name: userName, about: userAbout }),
    })
    .then(this._processingServerResponse)
  }
  // Метод отправки данных о новом аватаре на сервер
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
    .then(this._processingServerResponse)
  }
  // Метод обработки лайков карточки
  changeLikeCardStatus(cardId, isLiked) {
    const methodUsed = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: methodUsed,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
}

// Создание экземпляра класса
const apiConnect = new Api('https://api.phomdev-mesto.nomoredomains.work/');
// Экспорт экземпляра класса
export default apiConnect;