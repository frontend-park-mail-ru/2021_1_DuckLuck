export class Link {
    constructor({href, name, type} = {}) {
        this.objectType = 'link';
        this.href = href;
        this.name = name;
        this.type = type;
    }
}
