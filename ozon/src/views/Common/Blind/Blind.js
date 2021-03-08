import BlindTemplate from "./Blind.hbs"

export class Blind {
    constructor() {
        this.objectType = 'blind';
    };

    getHtmlString = () => {
        return BlindTemplate({});
    };
}
