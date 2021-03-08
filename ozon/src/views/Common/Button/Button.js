export class Button {
    constructor({name, type, value, text} = {}) {
        this.objectType = 'button';
        this.name = name;
        this.type = type;
        this.value = value;
        this.text = text;
    }
}
