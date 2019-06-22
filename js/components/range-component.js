import DomHandler from '../dom-handler.js';

export default class RangeComponent {
    constructor(rangeEleID, rangeValueEleID, {min = 0, max = 100, value = 20}) {
        this.dom = new DomHandler();
        this.rangeEle = this.dom.getElement(rangeEleID);
        this.rangeValueEle = this.dom.getElement(rangeValueEleID);

        this.minValue = min;
        this.maxValue = max;
        this.value = value;
        this.rangeValueEle.textContent = value;

        this.listenForRangeChange();
    }   

    set value(rangeValue) {
        this.rangeEle.value = rangeValue;
    }

    set minValue(minValue) {
        this.min = minValue;
        this.rangeEle.setAttribute('min', this.min);
    }

    set maxValue(maxValue) {
        this.max = maxValue;
        this.rangeEle.setAttribute('max', this.max);
    }

    listenForRangeChange() {
        this.dom.registerEvent(this.rangeEle, 'change', (event) => {
            this.rangeValueEle.textContent = event.target.value;
        });
    }
}