import {BasePage} from "../BasePage.js";

export class ProfilePage extends BasePage {
    constructor(parent) {
        super(parent);
    }

    render = () => {
        const {age, score, images} = this.data;
        const span = document.createElement('span');
        span.textContent = `Мне ${age} и я крутой на ${score} очков`;
        span.classList.add('profile_text');
        this._parent.appendChild(span);

        const back = document.createElement('a');
        back.href = '/home';
        back.textContent = 'Главная страница';
        back.dataset.section = 'home';

        this._parent.appendChild(back);

        if (images && Array.isArray(images)) {
            const div = document.createElement('div');
            this._parent.appendChild(div);

            images.forEach((imageSrc) => {
                div.innerHTML += `<img src="${imageSrc}" />`;
            });
        }
    }
}