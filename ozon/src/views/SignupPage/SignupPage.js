import {BasePage} from "../BasePage.js";

export class SignupPage extends BasePage {
    #parent;
    #data;

    constructor(parent) {
        super ();
        this.#parent = parent;
        this.#data = {};
    }

    get data() {
        return this.#data;
    }

    set data(data) {
        this.#data = data;
    }

    render = () => {
        const form = document.createElement('form');

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'Емайл';
        emailInput.placeholder = 'email';

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'Пароль';
        passwordInput.placeholder = 'password';

        const ageInput = document.createElement('input');
        ageInput.type = 'number';
        ageInput.name = 'Возраст';
        ageInput.placeholder = 'age';

        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = 'Зарегистрироваться!';

        const back = document.createElement('a');
        back.href = '/menu';
        back.textContent = 'Назад';
        back.dataset.section = 'menu';

        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(ageInput);
        form.appendChild(submitBtn);
        form.appendChild(back);

        return form;
    }
}