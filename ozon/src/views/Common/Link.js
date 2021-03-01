export class Link {
    constructor({href = '/home',
            textContent = '',
            dataset = '',
            } = {}) {
        this.objectType = 'link';
        this.href = href;
        this.textContent = textContent;
        this.section = dataset;
    }
}
