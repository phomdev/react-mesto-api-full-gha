// Объект для передачи(получения) данных на сервер(сервера)
const apiFindings = {
  link: 'http://localhost:3000/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
}
// Экспортируем объект в index.js
export default apiFindings;