class Validator {
    constructor() {
        this.emptyFieldsMessage = document.querySelector(".empty-fields-message")
        this.passwordInputBracket = document.querySelector(".password-input-bracket")
        this.loginInputBracket = document.querySelector(".login-input-bracket")
    }
    validate(inputsElem, passwordInput) {
        const inputs = document.querySelectorAll(inputsElem)  
        const result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const blankFields = []
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("focusin", ()=> {
                inputs[i].style.border = "none"
                loginModal.notRegistered.style.display = "none"
                    if(inputs[i] == passwordInput) {
                        this.passwordInputBracket.style.display = "none"
                    }
                    else if (inputs[i] != passwordInput){
                        this.loginInputBracket.style.display = "none"
                    }
            })
            inputs[i].addEventListener("focusout", ()=> {
                if(inputs[i].value == 0 || inputs[i].value == "choose" || inputs[i].value < 0) {
                    inputs[i].style.border = "1px solid red"
                    if(inputs[i] == passwordInput) {
                        this.passwordInputBracket.style.display = "block"
                        this.passwordInputBracket.innerHTML = "вы не ввели свой пароль !"
                    }
                    else {
                        this.loginInputBracket.style.display = "block"
                        this.loginInputBracket.innerHTML = "вы не ввели свой логин !"
                    }
                }
                else if(!result.test(inputs[i].value) && inputs[i].value != 0 &&inputs[i] != passwordInput && inputs[i] == loginModal.inputLogin) {
                    inputs[i].style.border = "1px solid red"
                    this.loginInputBracket.style.display = "block"
                    this.loginInputBracket.innerHTML = "вы ввели логин неправильно!"
                }
                else {
                    inputs[i].style.border = "none"
                    if(inputs[i] == passwordInput) {
                        this.passwordInputBracket.style.display = "none"
                    }
                    else {
                        this.loginInputBracket.style.display = "none"
                    }
                }
            })
            if(inputs[i].value == 0 || inputs[i].value == "choose") {
                this.emptyFieldsMessage.style.display = "block"
                blankFields.push(inputs[i])
                if(inputs[i] == passwordInput) {
                    this.passwordInputBracket.style.display = "block"
                    this.passwordInputBracket.innerHTML = "вы не ввели свой пароль !"
                }
                else {
                    this.loginInputBracket.style.display = "block"
                    this.loginInputBracket.innerHTML = "вы не ввели свой логин !"
                }
            }
            else if(inputs[i].type == "number" && inputs[i].value < 0) {
                blankFields.push(inputs[i])
                this.emptyFieldsMessage.style.display = "block"
            }
            else if(inputs[i] != passwordInput && !result.test(inputs[i].value) && inputs[i].value == 0) {
                    inputs[i].style.border = "1px solid red"
                    blankFields.push(inputs[i])
                    this.loginInputBracket.style.display = "block"
                    this.loginInputBracket.innerHTML = "неправильный логин !"
            }
            else if(!result.test(inputs[i].value) && inputs[i].value != 0 &&inputs[i] != passwordInput && inputs[i] == loginModal.inputLogin) {
                inputs[i].style.border = "1px solid red"
                blankFields.push(inputs[i])
                this.loginInputBracket.style.display = "block"
                this.loginInputBracket.innerHTML = "вы ввели логин неправильно!"
            }
        }
        return blankFields 
    }
}
const validator = new Validator