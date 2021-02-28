import {Base} from "./Base.js"

export class Link extends Base {
    constructor({href = '/home',
            textContent = '',
            dataset = '',
            } = {}) {
        super({})
        this.href = href;
        this.textContent = textContent;
        this.section = dataset;
    }

    render() {
        const template = Handlebars.compile("<a href={{hf}} data-section={{ds}}>{{tc}}</a>");
        return template({hf: this.href, tc: this.textContent, ds: this.section});
    }
}
