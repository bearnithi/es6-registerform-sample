export default class DomHandler {
    constructor() {

    }

    registerEvent(element, eventType, eventHandler) {
        element.addEventListener(eventType, eventHandler);
    }

    removeEvent(element, eventType) {
        element.removeEventListener(type);
    }

    getElement(elementID) {
        return document.getElementById(elementID);
    }

    createElement(elementName) {
        return document.createElement(elementName);
    }

    addClass(element, className) {
        element.classList.add(className);
    }

    removeClass(element, className) {
        element.classList.remove(className);
    }

    show(element) {
        this.removeClass(element,'hide');
    }

    hide(element) {
        this.addClass(element,'hide');
    }

    bindSelectControls(selectEle, values) {
        this.clearOptions(selectEle);

        if (Array.isArray(values)) {
            values.forEach((value) => {
                this.bindOptions(selectEle, value);
            });
        } else {
            for (let value in values) {
                this.bindOptions(selectEle, value)
            }
        }
    }

    bindOptions(selectEle, value) {
        const option = this.createElement('option')
        option.value = value;
        option.text = value;
        selectEle.append(option);
    }

    clearOptions(selectEle) {
        selectEle.innerHTML = "";
    }
}