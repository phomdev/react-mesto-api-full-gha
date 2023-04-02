class AuthApi {
  constructor(apiAddress) {
    this._authUrl = apiAddress;
  }
  // Метод обработки ответа сервера
  _processingServerResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  // Метод верификации токена
  tokenVerification (token) {
    return fetch(`${this._authUrl}users/me`, {
      // По умолчанию fetch — это GET, можно не указывать
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${ token }`
      }
    })
      .then(this._processingServerResponse)
  }
  // Метод авторизации пользователя
  userAuthorization (password, email) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._processingServerResponse)
      .then((userData) => {
        if (userData.token) { localStorage.setItem('token', userData.token) }
      })
  }
  // Метод регистрации пользователя
  userRegistration (password, email) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._processingServerResponse)
  }
}

// Создание экземпляра класса
const apiAuth = new AuthApi('https://api.phomdev-mesto.nomoredomains.work/');
// Экспорт экземпляра класса
export default apiAuth;