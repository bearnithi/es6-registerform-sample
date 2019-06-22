import DomHandler from './dom-handler.js';
import Validation from './validation.js';

import ChipsComponent from './components/chips-component.js';
import AddressComponent from './components/address-component.js';
import CountryStateCityComponent from './components/country-state-city-component.js';
import ProfilePicComponent from './components/profile-pic-component.js';
import RangeComponent from './components/range-component.js';

export default class RegisterForm {
    constructor() {
        

        this.dom = new DomHandler();
        this.validators = new Validation();

        this.getFormElements();
        this.setMockData();

        this.interestsChips = new ChipsComponent('interests', 'chips');
        this.addressComponent = new AddressComponent('address', this.address);
        this.countryStateComponent = new CountryStateCityComponent('country', 'state', '', this.country);
        this.profilePicComponent = new ProfilePicComponent('uploadProfilePic', 'profileImg');
        this.ageComponent = new RangeComponent('age', 'ageValue', {
            min: 18,
            max: 100,
            value: 20
        });

        this.initValidation();
        this.registerListeners();
    }

    setMockData() {
        this.address = {
            'Select': '',
            'Home': ['Address 1', 'Address 2'],
            'Company': ['Company Address 1', 'Company Address 2']
        };

        this.country = {
            'Select': [],
            'USA': ['Alaska', 'New York', 'Alabama'],
            'India': ['Tamil Nadu', 'Kerala', 'Karnataka', 'New Delhi']
        };
    }

    getFormElements() {
        this.registerBtn = this.dom.getElement('registerBtn');

        this.formContainer = this.dom.getElement('formContainer');
        this.formEle = this.dom.getElement('registerForm');
        this.submitBtn = this.dom.getElement('submit');

        this.firstNameEle = this.dom.getElement('firstname');
        this.lastNameEle = this.dom.getElement('lastname');
        this.telEle = this.dom.getElement('tel');

        this.profileInfo = this.dom.getElement('profileInfo');
        this.editProfileBtn = this.dom.getElement('editProfile');
        this.editPhotoEle = this.dom.getElement('editPhoto');
    }

    initValidation() {

        this.dom.registerEvent(this.firstNameEle, 'keypress', (event) => {
            this.validators.allowOnlyString(event);
        });

        this.dom.registerEvent(this.lastNameEle, 'keypress', (event) => {
            this.validators.allowOnlyString(event);
        });

        this.dom.registerEvent(this.telEle, 'keypress', (event) => {
            this.validators.allowOnlyNumber(event);
        });
    }


    registerListeners() {
        this.dom.registerEvent(this.registerBtn, 'click', (event) => {
            this.dom.show(this.formContainer);
            this.dom.hide(this.registerBtn.parentNode);
        });


        this.dom.registerEvent(this.formEle, 'submit', (event) => {
            event.preventDefault();
            this.validateForm();
        });

        this.dom.registerEvent(this.editProfileBtn, 'click', (event) => {
            this.dom.hide(this.profileInfo);
            this.dom.hide(this.editProfileBtn);
            this.dom.show(this.formEle);
        });

        this.dom.registerEvent(this.editPhotoEle, 'click', (event) => {
            this.profilePicComponent.profilePicInputEle.click();
        })

    }

    validateForm() {
        if (!this.formEle.checkValidity()) {
            return false;
        }

        const formFields = this.formEle.elements;

        this.profileInfo.innerHTML = `
            I am <span class="highlight">Mr. ${formFields.firstname.value} ${formFields.lastname.value}</span>
             and I am above <span class="highlight">${formFields.age.value} years</span> and you can send your emails
            to  <a href="mailto:${formFields.email.value}" class="highlight">${formFields.email.value}</a>. 
            I lives in the state of  <span class="highlight">${formFields.state.value}</span>.
             I likes to  <span class="highlight">${formFields.interests.value}</span>. And Please
            send me the news letters. Please reach out to me on my phone <span class="highlight">${formFields.tel.value}</span>.
        `
        this.dom.show(this.profileInfo);
        this.dom.show(this.editProfileBtn);
        this.dom.show(this.editPhotoEle);
        this.dom.hide(this.formEle);
    }



}