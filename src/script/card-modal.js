class CardModal extends Modal {
    constructor (prefixElement) {
        super(prefixElement)
        this.patientInputs = document.querySelector('.variable-inputs')
    }

    choseDoctor() {
        const patientBlock = document.querySelector('.patient')

        patientBlock.appendChild(this.patientInputs)

        if (doctorSelector.value === 'cardiologist') {
            this.patientInputs.innerHTML = `<input class="modal-input сard-input pressure" placeholder="обычное давление">
                                            <input class="modal-input сard-input body-mass-index" placeholder="индекс массы тела">
                                            <input type="number" class="modal-input сard-input age" placeholder="возраст">
                                            <div class="diseases-collection">
                                                <span class="input-disease__wrapper">
                                                    <input class="modal-input сard-input diseases" placeholder="перенесенные заболевания CCC">
                                                    <i class="remove-diseases-icon fas fa-backspace"></i>
                                                </span>
                                                <button class="add-diseases-btn"> <i class="add-diseases-icon fas fa-plus"></i> </button>
                                            </div>`
            this.addDiseases()
            document.querySelector('.diseases-collection').addEventListener('click', event => this.removeDiseases(event))
        } else if (doctorSelector.value === 'dentist') {
            this.patientInputs.innerHTML = ` <input type="date" class="modal-input сard-input last-visit" placeholder="дата последнего посещения">`
        } else if (doctorSelector.value === 'therapist') {
            this.patientInputs.innerHTML = ` <input  type="number" class="modal-input сard-input age" placeholder="возраст">`
        }
    }

    addDiseases () {
        const addDiseasesBtn = document.querySelector('.add-diseases-btn')
        addDiseasesBtn.addEventListener('click', () => {
            const diseasesCollection = document.querySelector('.diseases-collection')
            const newDisease = document.createElement('span')
            newDisease.classList.add('input-disease__wrapper')
            newDisease.innerHTML = `
                <input class="modal-input сard-input diseases" placeholder="перенесенные заболевания CCC">
                <i class="remove-diseases-icon fas fa-backspace"></i>`
            diseasesCollection.appendChild(newDisease)
            this.patientInputs.scrollTo({
                top: 1000,
                behavior: 'smooth'
            })
        })
    }

    removeDiseases (event) {
        let target = event.target
        if (target.classList.contains('remove-diseases-icon') && document.querySelectorAll('.input-disease__wrapper').length > 1) {
            target.closest('.input-disease__wrapper').remove()
        }
    }
}

let cardModal = new CardModal('card')

const openVisitModalBtn = document.querySelector('.js-card-toggle-button')
openVisitModalBtn.addEventListener('click', event => {
    cardModal.toggleModal(event, 'card')
    validator.emptyFieldsMessage.style.display = "none"
    loginModal.inputsCollection.forEach(inputElem => {
        inputElem.style.border = "none"
        inputElem.value = ''
        inputElem.selectedIndex = 0
    }) 
    document.querySelector('.variable-inputs').innerHTML = ''
})

const modalVisitElement = document.querySelector(`.js-card-modal-wrapper`)
modalVisitElement.addEventListener('click', event => cardModal.toggleModal(event, 'card'))


const doctorSelector = document.querySelector('.js-doctor-select')
doctorSelector.addEventListener('change', cardModal.choseDoctor.bind(cardModal))
