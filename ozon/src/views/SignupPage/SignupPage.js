import {BasePage} from '../BasePage.js';
import {Input} from '../Common/Input.js';
import {Link} from '../Common/Link.js';

import signupTemplate from './SignupPage.hbs';

/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This is a description of the MyClass class.
 */
export class SignupPage extends BasePage {
    /**
     *
     * @param {Object} parent parents object
     */
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const form = document.createElement('form');

        const objectsToRender = [
            new Input({
                type: 'email',
                name: 'Email',
                placeholder: 'email'},
            ),
            new Input({
                type: 'password',
                name: 'Pass',
                placeholder: 'password'},
            ),
            new Input({
                type: 'number',
                name: 'Age',
                placeholder: 'age'},
            ),
            new Input({
                type: 'submit',
                value: 'Зарегестрироваться!'},
            ),
            new Link({
                href: '/home',
                textContent: 'Главная страница',
                dataset: 'home'},
            ),
        ];

        form.innerHTML = signupTemplate({objects: objectsToRender});

        this._parent.appendChild(form);

        return form;
    }
}
