// Объект для передачи(получения) данных на сервер(сервера)
const apiFindings = {
  link: 'https://api.phomdev-mesto.nomoredomains.work/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
}
// Экспортируем объект в index.js
export default apiFindings;