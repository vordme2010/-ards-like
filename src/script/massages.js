
const showMassages = async () => {
    const massages = document.querySelectorAll('.js-massage')
    await wait(5000)
    massages[0].classList.add('massage--active')

    await wait(2000)
    massages[1].classList.add('massage--active')
}

showMassages()

const hideMassages = () => {
    const massagesWrapper = document.querySelector('.massage-container')
    massagesWrapper.style.display = 'none'
}

/* MASSAGES HIDES BY addVisitBtn IN visit-modal.js FILE */