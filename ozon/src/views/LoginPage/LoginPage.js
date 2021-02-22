import {BasePage} from "../BasePage.js";

export class LoginPage extends BasePage {
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

        const submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = 'Авторизироваться!';

        const back = document.createElement('a');
        back.href = '/menu';
        back.textContent = 'Назад';
        back.dataset.section = 'menu';

        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(submitBtn);
        form.appendChild(back);

        return form;
    }
}