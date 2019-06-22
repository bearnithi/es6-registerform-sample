import DomHandler from '../dom-handler.js';

export default class AddressComponent {

    constructor(addressEleID, addressData) {
        this.dom = new DomHandler();
        this.addressEle = this.dom.getElement(addressEleID);
        this.addresses = addressData;
        
        this.getSubAddressEle();
        this.bindData();

        this.listenForAddressChange();
    }

    bindData() {
        this.dom.bindSelectControls(this.addressEle, this.addresses);
    }

    listenForAddressChange() {
        
        this.dom.registerEvent(this.addressEle, 'change', (event) => {
            this.toggleAddress(event);
         })
    }

    getSubAddressEle() {
        Object.keys(this.addresses).forEach((subAddressGroupID) => {
            if (subAddressGroupID.toLowerCase() !== 'select') {
                this[`${subAddressGroupID}Ele`] = this.dom.getElement(subAddressGroupID);
            }
        });
    }

    toggleAddress(event) {
        const selectedAddress = event.target.value;

        for (let key in this.addresses) {
            if (key.toLowerCase() !== 'select') {
                if (key.toLowerCase() === selectedAddress.toLowerCase()) {
                    this[`${key}Ele`].classList.remove('hide');
                } else {
                    this[`${key}Ele`].classList.add('hide');
                }
            }
        }
    }



}