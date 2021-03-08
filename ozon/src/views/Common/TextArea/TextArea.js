export class TextArea {
    constructor(
        {
            name,
            rows,
            cols,
        } = {}) {
        this.objectType = 'textarea';
        this.name = name;
        this.rows = rows;
        this.cols = cols;
    }
}