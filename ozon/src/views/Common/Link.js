 export class Link {
    constructor({href = '/home',
                textContent = '',
                dataset = '',
                } = {}) {
        this.href = href;
        this.textContent = textContent;
        this.section = dataset;
    }

    render() {
        const template = Handlebars.compile("<a href={{hf}} data-section={{ds}}>{{tc}}</a>");
        return template({hf: this.href, tc: this.textContent, ds: this.section});
    }
}
