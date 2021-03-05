export class Button {
    constructor(
        {
            accesskey,
            autofocus,
            disabled,
            form,
            formaction,
            formenctype,
            formmethod,
            formnovalidate,
            formtarget,
            name,
            type,
            value,
            parent
        } = {}
    ) {
        this.objectType = 'button';
        this.accesskey = accesskey;
        this.autofocus = autofocus;
        this.disabled = disabled;
        this.form = form;
        this.formaction = formaction;
        this.formenctype = formenctype;
        this.formmethod = formmethod;
        this.formnovalidate = formnovalidate;
        this.formtarget = formtarget;
        this.name = name;
        this.type = type;
        this.value = value;
        this.parent = parent
    }
}
