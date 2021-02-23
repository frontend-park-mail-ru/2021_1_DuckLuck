import {BasePage} from "../BasePage.js";

export class LoginPage extends BasePage {
    constructor(parent) {
        super(parent);
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
        back.href = '/home';
        back.textContent = 'Главная страница';
        back.dataset.section = 'home';

        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(submitBtn);
        form.appendChild(back);

        return form;
    }
}