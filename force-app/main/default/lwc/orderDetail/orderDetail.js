import { LightningElement,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getallodata'
import delData from '@salesforce/apex/orderControl.del';
import ACCOUNT_OBJECT from '@salesforce/schema/OrderItem';
import { deleteRecord } from 'lightning/uiRecordApi';
import getall from '@salesforce/apex/orderControl.getalldata';

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
 
export default class OrderDetail extends LightningElement {
    or1
    order1
   order
   ind
   open
   up
   oid
   id
   quan
   c
   accountObject = ACCOUNT_OBJECT;
   recordId
   x=true
    @wire (getData)

    getApexData({error,data}){
        if(data){
            this.order=data;
            console.log(data);
        }
        if(error)
        {
            console.log('error in fetching data');
        }
        
    }
    
    can(event){
        this.open=false;
    }
    
    edit(event){
        this.ind=event.target.value

        this.open=true;
        this.recordId=this.order[this.ind].Id;
        this.x=true;
        this.id=this.order[this.ind].PricebookEntryId;
       this.up=this.order[this.ind].UnitPrice;
       this.oid=this.order[this.ind].OrderId;
       this.quan=this.order[this.ind].Quantity;
        

    }
    dele(event){
        this.ind=event.target.value;
        this.recordId=this.order[this.ind].Id;
        alert("record id"+this.recordId)
        deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is  Deleted',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error While Deleting record',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
            location.reload();
    }
  
}