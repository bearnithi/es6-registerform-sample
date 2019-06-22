import DomHandler from '../dom-handler.js';

export default class ProfilePicComponent {
    constructor(profilePicID, previewID) {
        this.dom = new DomHandler();
        this.profilePicInputEle = this.dom.getElement(profilePicID);
        this.profilePreviewEle = this.dom.getElement(previewID);

        this.listenForProfilePicChange();
    }

    listenForProfilePicChange() {
        this.dom.registerEvent(this.profilePicInputEle, 'change', (event) => {
            this.showProfilePicPreview();
        });
    }

    showProfilePicPreview() {
        if (this.profilePicInputEle.files && this.profilePicInputEle.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                this.profilePreviewEle.setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(this.profilePicInputEle.files[0]);
        }
    }
}