import { LightningElement, api} from 'lwc';

export default class IndexList extends LightningElement {
    @api index;

    get position() {
        return this.index + 1;
    }
}