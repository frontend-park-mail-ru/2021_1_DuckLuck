import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input.js";
import {Link} from "../Common/Link.js";

export class SignupPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const form = document.createElement('form');

        let objectsToRender = [
            new Input({type: 'email', name: "Email", placeholder: 'email'}),
            new Input({type: 'password', name: 'Pass', placeholder: 'password'}),
            new Input({type: 'number', name: 'Age', placeholder: 'age'}),
            new Input({type: 'submit', value: 'Зарегестрироваться!'}),
            new Link({href: '/home', textContent: 'Главная страница', dataset: 'home'})
        ]

        form.innerHTML = ''
        objectsToRender.forEach((object) => {
            form.innerHTML += object.render()
        })

        // form.innerHTML =
        //     renderInput({type: 'email', name: 'Емайл', placeholder: 'email'}) +
        //     renderInput({type: 'password', name: 'Пароль', placeholder: 'password'}) +
        //     renderInput({type: 'number', name: 'Возраст', placeholder: 'age'})

        // const emailInput = document.createElement('input');
        // emailInput.type = 'email';
        // emailInput.name = 'Емайл';
        // emailInput.placeholder = 'email';
        //
        // const passwordInput = document.createElement('input');
        // passwordInput.type = 'password';
        // passwordInput.name = 'Пароль';
        // passwordInput.placeholder = 'password';
        //
        // const ageInput = document.createElement('input');
        // ageInput.type = 'number';
        // ageInput.name = 'Возраст';
        // ageInput.placeholder = 'age';

        // const submitBtn = document.createElement('input');
        // submitBtn.type = 'submit';
        // submitBtn.value = 'Зарегистрироваться!';

        // const back = document.createElement('a');
        // back.href = '/home';
        // back.textContent = 'Главная страница';
        // back.dataset.section = 'home';

        // form.appendChild(emailInput);
        // form.appendChild(passwordInput);
        // form.appendChild(ageInput);
        // form.appendChild(submitBtn);
        // form.appendChild(back);
        this._parent.appendChild(form);

        return form;
    }
}