// запасной токен
// 274d7a2a-a090-4d22-b175-b723a05ebd3b

// Authorization: `Bearer ${f7e2a9df-f237-496a-af79-90aad3d71daf}`
// console.log(visitsCourgency
class Server {
  constructor() {
    this.token
  }

  getToken(login, password) {
    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: `eva.horbenko@gmail.com`, password: `1980Eva2001` })
      // body: JSON.stringify({ email: `${login}`, password: `${password}` })
    })
      .then(response => response.text())
      .then(token => this.token = token)
      // .then(token => console.log(this.token))
  }

  postVisit(objectToPost) {
    return fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${this.token}`
        'Authorization': `Bearer f7e2a9df-f237-496a-af79-90aad3d71daf`

      },
      body: JSON.stringify({
        doctor: objectToPost.doctor,
        doctorTitle: objectToPost.doctorTitle,
        firstName: objectToPost.firstName,
        fathersName: objectToPost.fathersName,
        lastName: objectToPost.lastName,
        purpose: objectToPost.purpose,
        description: objectToPost.description,
        urgency: objectToPost.urgency,
        status: objectToPost.status,
        unicValues: objectToPost.unicValues
      })
    })
      .then(response => response.json())
  }

  delete(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${this.token}`
        'Authorization': `Bearer f7e2a9df-f237-496a-af79-90aad3d71daf`
      },
    })
  }

  putCurrentDoctor(cardId, visitCurrentDoctor) {
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${this.token}`
        'Authorization': `Bearer f7e2a9df-f237-496a-af79-90aad3d71daf`

      },
      body: JSON.stringify({
        doctor: visitCurrentDoctor.doctor,
        doctorTitle: visitCurrentDoctor.doctorTitle,
        firstName: visitCurrentDoctor.firstName,
        fathersName: visitCurrentDoctor.fathersName,
        lastName: visitCurrentDoctor.lastName,
        purpose: visitCurrentDoctor.purpose,
        description: visitCurrentDoctor.description,
        urgency: visitCurrentDoctor.urgency,
        unicValues: visitCurrentDoctor.unicValues,
        status: visitCurrentDoctor.status
      })
    })
      .then(response => response.json())
      // .then(response => console.log(response))
  }

  getAllVisits() {            // Получение всех созданных карточек
    return fetch('https://ajax.test-danit.com/api/v2/cards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${this.token}`
        'Authorization': `Bearer f7e2a9df-f237-496a-af79-90aad3d71daf`
      }
    })
      .then(response => response.json())
  }

  getCurrenVisits(cardId) {   // Получение одной конкретной карточки
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${this.token}`
        'Authorization': `Bearer f7e2a9df-f237-496a-af79-90aad3d71daf`
      }
    })
      .then(response => response.json())
  }
}

let server = new Server()

// server.getToken()