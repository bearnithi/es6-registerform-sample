export default class Validation {
    constructor() {

    }

    allowOnlyString(e) {
        const pattern = /[a-zA-Z.'\s]$/;
        this.preventKeyPress(pattern, e);
    }

    allowOnlyNumber(e) {
        const pattern = /[0-9]/;
        this.preventKeyPress(pattern, e);
    }

    preventKeyPress(pattern, e) {
        const inputChar = String.fromCharCode(e.charCode);

        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }


}