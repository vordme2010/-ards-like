class Modal {
    constructor (prefixElement) {
        this.prefixElement = prefixElement
        this.openModalBtn = document.querySelector(`.${prefixElement}-button`)
        this.modalElement = document.querySelector(`.js-${prefixElement}-modal-wrapper`)
        this.inputsCollection = document.querySelectorAll('.modal-input')
    }

    toggleModal (event, prefixElement) {
        const target = event.target
        if (target.classList.contains(`js-${prefixElement}-modal-wrapper`) || target.closest(`.js-${prefixElement}-toggle-button`)) {
            this.modalElement.classList.toggle('hidden')
        }
        if (this.modalElement.classList.contains('hidden')) {
            this.cleanInputs()
        }
    }

    cleanInputs() {
        
        this.inputsCollection.forEach(inputElem => {
            inputElem.value = ''
            inputElem.selectedIndex = 0
            inputElem.style.border = "none"
        })
        if (this.prefixElement === 'card') {
            document.querySelector('.variable-inputs').innerHTML = ''
        }
        if (this.prefixElement === 'full-visit-info') {
            document.querySelector('.full-card').innerHTML = ''
        }
    }
}
