class LoginModal extends Modal {
    constructor (prefixElement) {
        super(prefixElement)
        this.token = undefined
        this.root = document.querySelector('.root')
        this.logoutBtn = document.querySelector('.logout-button')
        this.filterWrapper = document.querySelector('.filter-bg-wrapper')
        this.cardButton = document.querySelector('.card-button')
        this.messageContainer = document.querySelector('.massage-container')
        this.modalLoginWrapper = document.querySelector(".js-login-modal-wrapper")
        this.inputLogin = document.querySelector('.modal-input-login')
        this.loginBtn = document.querySelector(".js-login-toggle-button")
        this.inputPassword = document.querySelector('.modal-input-password')
        this.passwordIcon = document.querySelector('.toggle-password-icon')
        this.authBtn = document.querySelector(".autorise-btn")
        this.loginImput = document.querySelector(".modal-input-login")
        this.validateLogin(this.authBtn, "click")
        this.notRegistered = document.querySelector(".not-registered")
        this.closeEye()
        this.togglePassword()
        this.logOut()
        this.renderPage()
    }
    renderPage() {
        if(window.localStorage.getItem('token')) {
            this.logoutBtn.style.display = "inline-block"
            this.cardButton.style.display = "inline-block"
            this.filterWrapper.style.display = "block"
            this.root.style.display = "flex"
            this.messageContainer.style.display = "none"
            this.modalLoginWrapper.style.display = "none"
            this.loginBtn.style.display = "none"
        }
    }
    getToken() {
        fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: `${this.inputLogin.value}`, password: `${this.inputPassword.value}` }),
        })
        .then((response)=> {
            if (response.status == 200) {
                console.log(response.status)
                console.log("response")
                return response
            }
            else {
               throw new Error(response.status)
            }
        })
        .then(response => response.text())
        .then(token => {
            this.token = token
            window.localStorage.setItem(
                'token',
                token = this.token
            )
            console.log(token)
            this.renderPage()
        })
        .catch(error => {
            console.log(error + " - you aren't registered yet!")
            this.notRegistered.style.display = "block"
        });
    }
    validateLogin(listener, event) {
        listener.addEventListener(event, () => {
            this.inputLogin.style.border = "none"
            this.inputPassword.style.border = "none"
            const blankFields = validator.validate(".modal-input-bracket", this.inputPassword)
            if(blankFields.length == 0) {   
                this.getToken()
            }
            else {
                blankFields.forEach(elem => {
                    elem.style.border = "1px solid red"
                })
            }
        })
    }
    logOut() {
        this.logoutBtn.addEventListener('click', ()=> {
            window.localStorage.removeItem("token")
            location.reload()
        })
    }
    closeEye() {
        this.loginBtn.addEventListener('click', ()=> {
            if (this.modalElement.classList.contains('hidden')) {
                this.passwordIcon.classList.remove('far', 'fa-eye')
                this.passwordIcon.classList.add('fas', 'fa-eye-slash')
                this.inputPassword.type = 'password'
            } 
        })
    }
    togglePassword () {
        this.passwordIcon.addEventListener("click", ()=> {
            this.inputPassword.type === 'password' ? this.inputPassword.type = 'text' : this.inputPassword.type = 'password'
            this.passwordIcon.classList.toggle('far')
            this.passwordIcon.classList.toggle('fa-eye')
            this.passwordIcon.classList.toggle('fas')
            this.passwordIcon.classList.toggle('fa-eye-slash')
        })
    }
}
let loginModal = new LoginModal('login')

const openLoginModalBtn = document.querySelector('.login-button')
openLoginModalBtn.addEventListener('click', event => {
    loginModal.toggleModal(event, 'login')
    validator.passwordInputBracket.style.display = "none"
    validator.loginInputBracket.style.display = "none"
})

const modalLoginElement = document.querySelector(`.js-login-modal-wrapper`)
modalLoginElement.addEventListener('click', event => loginModal.toggleModal(event, 'login'))
