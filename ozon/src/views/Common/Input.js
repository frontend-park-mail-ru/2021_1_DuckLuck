export class Input {
    constructor({type = 'text',
                name = '',
                placeholder='',
                value = ''} = {}) {
        this.name = name
        this.type = type
        this.placeholder = placeholder
        this.value = value
    }

    render() {
        const template = Handlebars.compile("<input type={{t}} name={{n}} placeholder={{ph}} value={{v}}>")
        return template({t: this.type, n: this.name, ph: this.placeholder, v: this.value})
    }
}
