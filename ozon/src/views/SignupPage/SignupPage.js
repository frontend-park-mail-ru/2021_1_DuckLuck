import {BasePage} from "../BasePage.js";
import {Input} from "../Common/Input.js";
import {Link} from "../Common/Link.js";

export class SignupPage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const form = document.createElement('form');

        const objectsToRender = [
            new Input({type: 'email', name: "Email", placeholder: 'email'}),
            new Input({type: 'password', name: 'Pass', placeholder: 'password'}),
            new Input({type: 'number', name: 'Age', placeholder: 'age'}),
            new Input({type: 'submit', value: 'Зарегестрироваться!'}),
            new Link({href: '/home', textContent: 'Главная страница', dataset: 'home'})
        ]

        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
        });

        const template = Handlebars.compile('<form>\n' +
            '{{#each objects}}\n' +
                '{{#ifEquals this.objectType "input"}}\n' +
                    '<input type={{this.type}} name={{this.name}} placeholder={{this.placeholder}} value={{this.value}}>\n' +
                '{{/ifEquals}}' +
                '{{#ifEquals this.objectType "link"}}\n' +
                    '<a href={{this.href}} data-section={{this.section}}>{{this.textContent}}</a>\n' +
                '{{/ifEquals}}' +
            '{{/each}}\n' +
            '</form>'
        )
        form.innerHTML = template({objects: objectsToRender})

        this._parent.appendChild(form);

        return form;
    }
}