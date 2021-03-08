export class BasePage {

    _parent;
    _data;

    constructor(parent) {

        this._parent = parent;
        this._data = {};

    }

    get data() {

        return this._data;

    }

    set data(data) {

        this._data = data;

    }

}
