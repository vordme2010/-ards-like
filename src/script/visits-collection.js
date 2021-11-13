class VisitsCollection {
    constructor() {
        this.visitsList = []
        this.addVisitBtn = document.querySelector('.add-visit-btn')
        this.modalCardWrapper = document.querySelector(".js-card-modal-wrapper")
        this.statusFilter = document.querySelector(".filter-status")
        this.urgencyFilter = document.querySelector(".filter-urgency")
        this.nameFilter = document.querySelector(".filter-name")
        this.filters = document.querySelectorAll(".filter-area")
        this.filterStatus()
        this.filterUrgency()
        this.filterName()
    }
    filter() {
        this.visitsList.forEach(elem => {
            if(elem.doctor != "choose") {
                const id = elem.id.toString()
                document.getElementById(id).style.display = "block"
                if(elem.status != this.statusFilter.value && this.statusFilter.value != "all") {
                    const idAdd = elem.id.toString()
                    document.getElementById(idAdd).classList.add("filtered")
                }
                else if(elem.urgency != this.urgencyFilter.value && this.urgencyFilter.value != "all") {
                    const idAdd = elem.id.toString()
                    document.getElementById(idAdd).classList.add("filtered")
                }
                else if(elem.firstName.indexOf(this.nameFilter.value) == -1  && this.nameFilter.value != 0) {
                    const idAdd = elem.id.toString()
                    document.getElementById(idAdd).classList.add("filtered")
                }
                else {
                    const idRemove = elem.id.toString()
                    document.getElementById(idRemove).classList.remove("filtered")
                }
                if(document.getElementById(id).classList.contains("filtered")) {
                    document.getElementById(id).style.display = "none"
                }
            }
        })
    }
    filterStatus() {
        this.statusFilter.addEventListener("change", (event)=> {
           this.filter()
            
        })
    }
    filterUrgency() {
        this.urgencyFilter.addEventListener("change", ()=> {
            this.filter()
        })
    }
    filterName() {
        this.nameFilter.addEventListener("input", ()=> {
           this.filter()
        })
    }
    async getVisits() {
        const visits = await server.getAllVisits()
        visits.forEach((visit) => {
            this.renderVisit(visit)
            this.visitsList.push(visit)
        })
    }
            
    async addVisit() {
        const blankFields = validator.validate(".сard-input")
        if(blankFields.length == 0) {
            const doctor = document.querySelector('.js-doctor-select').value
            const firstNameUnCase = document.querySelector('.js-first-name-input').value
            const firstName = firstNameUnCase.slice(0, 1).toUpperCase() + firstNameUnCase.slice(1).toLowerCase()
            const fathersNameUnCase = document.querySelector('.js-father-name-input').value
            const fathersName = fathersNameUnCase.slice(0, 1).toUpperCase() + fathersNameUnCase.slice(1).toLowerCase()
            const lastNameUnCase = document.querySelector('.js-last-name-input').value
            const lastName = lastNameUnCase.slice(0, 1).toUpperCase() + lastNameUnCase.slice(1).toLowerCase()
            const purpose = document.querySelector('.js-purpose-input').value
            const description = document.querySelector('.js-description-input').value
            const urgency = document.querySelector('.js-urgency-input').value
            const status = 'active'
            let unicValues = {}

            let age = null
            let lastVisit = null
            let pressure = null
            let bodyMassIndex = null

            let doctorTitle = null
            if (doctor === 'therapist') {
                doctorTitle = 'Терапевт'
                age = document.querySelector('.age').value
                unicValues.age = age
            } else if (doctor === 'dentist') {
                doctorTitle = 'Стоматолог'
                lastVisit = document.querySelector('.last-visit').value
                unicValues.lastVisit = lastVisit
            } else if (doctor === 'cardiologist') {
                doctorTitle = 'Кардиолог'
                age = document.querySelector('.age').value
                pressure = document.querySelector('.pressure').value
                bodyMassIndex = document.querySelector('.body-mass-index').value

                const diseases = []
                document.querySelectorAll('.diseases').forEach(disease => diseases.push(disease.value))
                unicValues = { age, pressure, bodyMassIndex, diseases }
            }

            const objectToPost = {doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, status, unicValues}
            const responseObject = await server.postVisit(objectToPost)

            this.renderVisit(responseObject)
            this.visitsList.push(responseObject)   
            this.modalCardWrapper.classList.add('hidden')  
        } 
        else {
            blankFields.forEach(elem => {
                elem.style.border = "1px solid red"
            })
        }
    }
    renderVisit(responseObject) {

        if (responseObject.doctor === 'therapist') {
            const { doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, unicValues: {age} } = responseObject
            const visitTherapist = new VisitTherapist(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, age)
            visitTherapist.createVisit()
            visitTherapist.showFullInfo()
        }

        if (responseObject.doctor === 'dentist') {
            const { doctor, doctorTitle, firstName, fathersName, lastName, purpose, urgency, description, id, status, unicValues:  {lastVisit}  } = responseObject
            const visitDentist = new VisitDentist(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, lastVisit)
            visitDentist.createVisit()
            visitDentist.showFullInfo()
        }

        if (responseObject.doctor ===  'cardiologist') {
            const { doctor, doctorTitle, firstName, fathersName, lastName, purpose, urgency, description, id, status, unicValues: { age, pressure, bodyMassIndex, diseases } } = responseObject
            const visitCardiologist = new VisitCardiologist(doctor, doctorTitle, firstName, fathersName, lastName, purpose, description, urgency, id, status, age, pressure, bodyMassIndex, diseases)
            visitCardiologist.createVisit()
            visitCardiologist.showFullInfo()
        }
    }

    removeVisit(id, card) {
        server.delete(id)
        this.visitsList.forEach(visit => {
            if (visit.id === id) {
                this.visitsList.splice(this.visitsList.indexOf(visit), 1)
            }
        })
        card.remove()
    }

    async saveChanges(newObject, id, card) {
        await server.putCurrentDoctor(newObject.id, newObject);

        this.visitsList.forEach(object => {
            if (object.id === id) {
                this.visitsList.splice(this.visitsList.indexOf(object), 1, newObject)
            }
        })

        card.remove()
        this.renderVisit(newObject)
    }

    async checkVisitAsDone(id, card) {
        let response = await server.getCurrenVisits(id)
        card.classList.remove(response.status)
        response.status = 'done'
        card.classList.add(response.status)

        await server.putCurrentDoctor(id, response);

        this.visitsList.forEach(visit => {
            if (visit.id === id) {
                this.visitsList.splice(this.visitsList.indexOf(visit), 1, response)
            }
        })
    }
}

const visitsCollection = new VisitsCollection

visitsCollection.getVisits()

const addVisitBtn = document.querySelector('.add-visit-btn')

addVisitBtn.addEventListener('click', visitsCollection.addVisit.bind(visitsCollection))

const fullVisitInfoElement = document.querySelector('.js-full-visit-info-modal-wrapper')
fullVisitInfoElement.addEventListener('click', event => fullVisitInfoModal.toggleModal(event, 'full-visit-info'))


