class Visit {
    constructor(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status) {
        this.doctor = doctor
        this.doctorTitle = doctorTitle
        this.firstName = firstName
        this.fathersName = fathersName
        this.lastName = lastName
        this.purpose = purpose
        this.description = description
        this.urgency = urgency
        this.id = id
        this.status = status

        this.card = document.createElement('div')
        this.fullInfoModal = document.querySelector('.full-card')
    }

    createVisit() {
        const root = document.querySelector('.root')
        this.card.id = this.id

        this.card.classList.add('card', this.doctor, this.status)
        this.card.innerHTML = ` <h2 class="card__title ${this.doctor}__title">${this.doctorTitle}</h2>
                                <h3 class="card__subtitle ${this.doctor}__subtitle">Пациент</h3>
                                <div class="card__content-wrapper ${this.doctor}__wrapper">
                                    <h3 class="client-name ${this.doctor}__client-name">${this.lastName} ${this.firstName[0]}. ${this.fathersName[0]}.</h3>
                                    <h4 class="card__content-title">Цель визита:</h4>
                                    <span class="card__content-text">${this.purpose}</span>
                                    <div class="circles-container">
                                        <h4 class="card__content-title inline-title">Срочность визита:</h4>
                                        <div class="urgency-circle regular"></div>
                                        <div class="urgency-circle priority"></div>
                                        <div class="urgency-circle urgent"></div>
                                    </div>
                                </div>
                                <div class="card__buttons-wrapper">
                                    <button class="card__button card__visite-done-button">V</button>
                                    <button class="button card__button card__info-button js-full-visit-info-toggle-button">i</button>
                                    <button class="card__button card__delete-visite-button">X</button>
                                </div>`
        
        const circle = this.card.querySelector(`.${this.urgency}`)

        circle.classList.add(`${this.urgency}--active`)

        root.prepend(this.card)

        const deleteBtn = this.card.querySelector('.card__delete-visite-button')
        deleteBtn.addEventListener('click', visitsCollection.removeVisit.bind(visitsCollection, this.id, this.card))

        const setDoneVisitBtn = this.card.querySelector('.card__visite-done-button')
        setDoneVisitBtn.addEventListener('click', visitsCollection.checkVisitAsDone.bind(visitsCollection, this.id, this.card))
    }

    addInfoModal() {
        this.fullInfoModal.id = this.id  
        this.fullInfoModal.innerHTML = `
                                    <div class="full-card__content-wrapper full-card__${this.doctor}-border">
                                        <div class="full-card__buttons-wrapper">
                                            <button class="full-card__button js-full-visit-info-toggle-button">Закрыть</button>
                                            <button class="full-card__button js-edit-btn full-card__button-down">Изменить</button>
                                        </div>
                                        <h2 class="full-card__title full-card__${this.doctor}-bg">${this.doctorTitle} </h2>
                                        <h3 class="full-card__subtitle">Пациент</h3>
                                        <h3 class="full-card__content-title full-card__${this.doctor}    -border-bottom">Полные данные</h3>
                                        <h3 class="full-card__client-name full-card__${this.doctor}-bg">${this.lastName} ${this.firstName} ${this.fathersName}</h3>
                                        <div class="full-card__info-container">
                                            <div class="full-card__info-wrapper">
                                                <h4 class="full-card__info-title">Цель визита:</h4>
                                                <span class="full-card__info-text">${this.purpose}</span>
                                                <h4 class="full-card__info-title">Краткое описание визита:</h4>
                                                <span class="full-card__info-text">${this.description}</span>
                                            </div>
                                            <div class="full-card__info-wrapper js-info">
                                            </div>
                                        </div>
                                   </div>
        `
    }
}