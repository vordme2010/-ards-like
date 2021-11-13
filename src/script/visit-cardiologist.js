class VisitCardiologist extends Visit {

    constructor(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, age, pressure, bodyMassIndex, diseases) {
        super(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status)
        this.age = age
        this.pressure = pressure
        this.bodyMassIndex = bodyMassIndex
        this.diseases = diseases
    }

    addFullInfo() {
        this.addInfoModal()
        const div = this.fullInfoModal.querySelector('.js-info')
        
        div.innerHTML = `
                        <h4 class="full-card__info-title">Возраст:</h4>
                        <span class="full-card__info-text">${this.age}</span><br/>
                        <h4 class="full-card__info-title">Давление:</h4>
                        <span class="full-card__info-text">${this.pressure}</span><br/>
                        <h4 class="full-card__info-title">Индекс массы тела:</h4>
                        <span class="full-card__info-text">${this.bodyMassIndex}</span><br/>
                        <ul class="full-card__info-title">Заболевания сердечно-сосудистой системы:</ul>
        `
        
        const ul = div.querySelector('ul')
        this.diseases.forEach(diseas => {
            const li = document.createElement('li')
            li.classList.add('full-card__list-item')
            li.innerHTML = diseas
            ul.appendChild(li)
        })

        const editBtn = this.fullInfoModal.querySelector('.js-edit-btn')
        editBtn.addEventListener('click', this.editVisit.bind(this))
        // editBtn.addEventListener('click', this.saveChanges.bind(this, purpose, description))
    }

    showFullInfo() {
        const infoButton = this.card.querySelector('.js-full-visit-info-toggle-button')
        infoButton.addEventListener('click', event => fullVisitInfoModal.toggleModal(event, 'full-visit-info'))

        infoButton.addEventListener('click', this.addFullInfo.bind(this))
    }

    editVisit() {
        const infoContainer = this.fullInfoModal.querySelector('.full-card__info-container')
        infoContainer.innerHTML = `
                                    <div class="full-card__info-wrapper">
                                        <h4 class="full-card__info-title">Цель визита:</h4>
                                        <input value="${this.purpose}" type="text" class="modal-input purpose js-purpose-edit-input edit-input" placeholder="Изменить цель">
                                        <h4 class="full-card__info-title">Краткое описание визита:</h4>
                                        <textarea style="resize: none;" class="modal-input description js-description-edit-input edit-input" placeholder="Изменить описание визита" rows="3">${this.description}</textarea>
                                     </div>
                                    <div class="full-card__info-wrapper js-info">
                                        <input value="${this.pressure}" class="modal-input pressure js-pressure-edit-input edit-input" placeholder="обычное давление">
                                        <input value="${this.bodyMassIndex}" class="modal-input body-mass-index js-body-mass-index-edit-input edit-input" placeholder="индекс массы тела">
                                        <input value="${this.age}" class="modal-input age js-age-edit-input edit-input" placeholder="возраст">
                                        <div class="diseases-collection">
                                            <button class="add-diseases-btn"> <i class="add-diseases-icon fas fa-plus"></i> </button>
                                        </div>
                                        <div class="full-card__save-btn-wrapper">
                                            <button class="full-card__button js-save-btn full-card__button-save js-full-visit-info-toggle-button">Сохранить</button>
                                        </div>
                                    </div>
        `

        this.diseases.forEach(disease => {
            this.addDiseases(disease)
        })

        const addDiseasesBtn = infoContainer.querySelector('.add-diseases-btn')
        addDiseasesBtn.addEventListener('click', () => this.addDiseases(''))

        document.querySelector('.diseases-collection').addEventListener('click', event => cardModal.removeDiseases(event))

        const saveChangesBtn = document.querySelector('.js-save-btn')
        saveChangesBtn.addEventListener('click', this.takeChangedValues.bind(this))
    }

    addDiseases(disease) {
        const diseasesCollection = document.querySelector('.diseases-collection')

        const inputDiseaseWrapper = document.createElement('span')
        inputDiseaseWrapper.classList.add('input-disease__wrapper')
        inputDiseaseWrapper.innerHTML = `
            <span class="input-disease__wrapper">
                <input value="${disease}" class="js-diseases-edit-input modal-input diseases edit-input" placeholder="перенесенные заболевания CCC">
                <i class="remove-diseases-icon fas fa-backspace"></i>
            </span>`
        diseasesCollection.appendChild(inputDiseaseWrapper)
    }
    
    takeChangedValues() {
        const purpose = document.querySelector('.js-purpose-edit-input').value
        const description = document.querySelector('.js-description-edit-input').value
        const age = document.querySelector('.js-age-edit-input').value
        const pressure = document.querySelector('.js-pressure-edit-input').value
        const bodyMassIndex = document.querySelector('.js-body-mass-index-edit-input').value
        const diseases = []
        document.querySelectorAll('.js-diseases-edit-input').forEach(disease => diseases.push(disease.value))
        
        let unicValues = {}
        unicValues = { age, pressure, bodyMassIndex, diseases }

        const newObject = {doctor: this.doctor, doctorTitle: this.doctorTitle, firstName: this.firstName, fathersName: this.fathersName, lastName: this.lastName, purpose, description, urgency: this.urgency, id: this.id, status: this.status, unicValues}

        visitsCollection.saveChanges(newObject, this.id, this.card)
    }
}