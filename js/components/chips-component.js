import DomHandler from '../dom-handler.js';

export default class ChipsComponent {

    constructor(chipsInputID, chipsListId) {
        this.chipsItems = [];
        this.dom = new DomHandler();
        this.chipsInputEle = this.dom.getElement(chipsInputID)
        this.chipsEle = this.dom.getElement(chipsListId);

        this.listenForChipChange();
    }

    listenForChipChange() {
        this.dom.registerEvent(this.chipsInputEle, 'blur', (event) => {
            this.makeChipsArray();
        });
    }

    makeChipsArray(seperator = ',') {

        this.chipsItems = this.chipsInputEle.value.split(seperator) || [];
        this.chipsEle.innerHTML = "";

        for (let i = this.chipsEle.children.length; i < this.chipsItems.length; i++) {
            if (this.chipsItems[i].trim() !== "") {
                const li = this.makeChip(this.chipsItems[i].trim(), i);
                li.append(this.makeChipCloseBtn(i));
                this.chipsEle.append(li);
            }
        }
    }

    makeChip(value, i) {
        const li = this.dom.createElement('li');
        li.textContent = value;
        li.classList.add('chips');
        return li;
    }

    makeChipCloseBtn(i) {
        const closeBtn = this.dom.createElement('button');
        closeBtn.id = i;
        closeBtn.textContent = 'X';

        this.dom.registerEvent(closeBtn, 'click', (event) => {
            event.preventDefault();
            this.chipsItems.splice(parseInt(event.target.id), 1);
            event.target.parentElement.remove()
            this.chipsInputEle.value = this.chipsItems.toString();
        });

        return closeBtn;
    }


}