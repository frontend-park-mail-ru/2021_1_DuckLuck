import {BasePage} from "../BasePage.js";

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const span = document.createElement('span');
        span.classList.add('profile_text');
        span.id = 'user_data';
        this._parent.appendChild(span);

        const back = document.createElement('a');
        back.href = '/home';
        back.textContent = 'Главная страница';
        back.dataset.section = 'home';

        this._parent.appendChild(back);
    }

    renderData = () => {
        const {age, score, images} = this.data;
        const span = document.getElementById('user_data');
        span.textContent = `Мне ${age} и я крутой на ${score} очков`;
    }
}