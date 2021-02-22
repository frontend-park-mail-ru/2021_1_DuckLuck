import {BasePage} from "../BasePage.js";

export class ProfilePage extends BasePage {
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
        const {age, score, images} = this.data;
        const span = document.createElement('span');
        span.textContent = `Мне ${age} и я крутой на ${score} очков`;
        span.classList.add('profile_text');
        this.#parent.appendChild(span);

        const back = document.createElement('a');
        back.href = '/menu';
        back.textContent = 'Назад';
        back.dataset.section = 'menu';

        this.#parent.appendChild(back);

        if (images && Array.isArray(images)) {
            const div = document.createElement('div');
            this.#parent.appendChild(div);

            images.forEach((imageSrc) => {
                div.innerHTML += `<img src="${imageSrc}" />`;
            });
        }
    }
}