class VisitTherapist extends Visit {
    constructor(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, age) {
        super(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status)
        this.age = age
    }

    addFullInfo() {
        this.addInfoModal()
        const div = this.fullInfoModal.querySelector('.js-info')
        
        div.innerHTML = `
        <h4 class="full-card__info-title">Возраст:</h4>
        <span class="full-card__info-text">${this.age}</span>
        `
        
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
                                        <input value="${this.purpose}" type="text" class="modal-input purpose js-purpose-edit-input edit-input" placeholder="Изменить цель визита">
                                        <h4 class="full-card__info-title">Краткое описание визита:</h4>
                                        <textarea style="resize: none;" class="modal-input description js-description-edit-input edit-input" placeholder="Изменить описание визита" rows="3">${this.description}</textarea>
                                     </div>
                                    <div class="full-card__info-wrapper js-info">
                                        <h4 class="full-card__info-title">Возраст:</h4>
                                        <input value="${this.age}" class="modal-input age js-age-edit-input edit-input" placeholder="Изменить возраст">
                                        <div class="full-card__save-btn-wrapper">
                                            <button class="full-card__button js-save-btn full-card__button-save js-full-visit-info-toggle-button">Сохранить</button>
                                        </div>
                                    </div>
        `
        const saveChangesBtn = document.querySelector('.js-save-btn')
        saveChangesBtn.addEventListener('click', this.takeChangedValues.bind(this))
    }

    takeChangedValues() {
        const purpose = document.querySelector('.js-purpose-edit-input').value
        const description = document.querySelector('.js-description-edit-input').value
        const age = document.querySelector('.js-age-edit-input').value
        const unicValues = {}
        unicValues.age = age

        const newObject = {doctor: this.doctor, doctorTitle: this.doctorTitle, firstName: this.firstName, fathersName: this.fathersName, lastName: this.lastName, purpose, description, urgency: this.urgency, id: this.id, status: this.status, unicValues}

        visitsCollection.saveChanges(newObject, this.id, this.card)
    }
}