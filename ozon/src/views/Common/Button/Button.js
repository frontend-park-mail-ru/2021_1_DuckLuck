export class Button {
    constructor(
        {
            name,
            type,
            value,
        } = {}
    ) {
        this.objectType = 'button';
        this.name = name;
        this.type = type;
        this.value = value;
    }
}
