const toggleElement = function(selector, state) {
    const element = document.querySelector(selector)
    element.classList.add(state)
}

const renderLogo = async () => {
    toggleElement('.js-logo', 'preloader__logo--active')
    
    await wait(1000)
    toggleElement('.js-preloader-title', 'preloader__title--active')

    await wait(2000)
    toggleElement('.js-preloader', 'preloader--disabled')

    await wait(3000)
    toggleElement('.js-preloader', 'preloader--none')
}

document.addEventListener("DOMContentLoaded", renderLogo)