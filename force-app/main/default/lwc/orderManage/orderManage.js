import { LightningElement,wire,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Order';
//import NAME_FIELD from '@salesforce/schema/Order.Account.Name';
import NAME_FIELD from '@salesforce/schema/Order.AccountId';
import b from '@salesforce/schema/Order.EffectiveDate';
import c from '@salesforce/schema/Order.ContractId';
import d from '@salesforce/schema/Order.Type';
import e from '@salesforce/schema/Order.Status';
import f from '@salesforce/schema/Order.ShippingAddress';
import g from '@salesforce/schema/Order.Description';
import h from '@salesforce/schema/Order.Name';

import xy from '@salesforce/schema/Order.BillingCity'
//import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

/**
 * Creates Account records.
 */
export default class AccountCreator extends LightningElement {
    f
    open=true
     @api recordId;
    @api objectApiName;
    edit(event){
        this.c=true;
    }
    
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD , xy,b,c,d,e,f,g,h];
    create(event){
        this.f=true;

    }
    clear(event){
        this.open = false;
    }
    
    handleAccountCreated(){
        // Run code when account is created.
        this.open=false
    }
}
