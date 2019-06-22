import DomHandler from '../dom-handler.js';

export default class CountryStateCityComponent {
    constructor(countryID, stateID, cityID, cscdata) {
        this.dom = new DomHandler();
        this.countryEle = this.dom.getElement(countryID);
        this.stateEle = this.dom.getElement(stateID);
        this.cityEle = this.dom.getElement(cityID);
        this.cscdata = cscdata;

        this.bindData();
        this.listenStateChange();
    }



    bindData() {
        this.dom.bindSelectControls(this.countryEle, this.cscdata);
    }

    listenStateChange() {
        this.dom.registerEvent(this.countryEle, 'change', (event) => {
            this.setStateByCountry(event)
        });
    }


    setStateByCountry(event) {
        const selectedCountry = event.target.value;
        this.dom.bindSelectControls(this.stateEle, this.cscdata[selectedCountry]);
    }

}