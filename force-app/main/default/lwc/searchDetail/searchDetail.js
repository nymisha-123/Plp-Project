import { LightningElement,track,wire,api } from 'lwc';
import getData from '@salesforce/apex/orderControl.getalldata'
import ACCOUNT_OBJECT from '@salesforce/schema/OrderItem';
import a from '@salesforce/schema/OrderItem.Quantity';
import b from '@salesforce/schema/PricebookEntry.Product2Id';
import c from '@salesforce/schema/PricebookEntry.UnitPrice';
import getData1 from '@salesforce/apex/orderControl.getpb'
//import d from '@salesforce/schema/PricebookEntry.ProductName';
import PBID_FIELD from '@salesforce/schema/OrderItem.PricebookEntryId';
import getOrderList from '@salesforce/apex/orderControl.getOrderList';
import getOrder1List from '@salesforce/apex/orderControl.getOrder1List';
import getOrder2List from '@salesforce/apex/orderControl.getOrdermList';
import saveData from '@salesforce/apex/orderControl.addOrder';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class SearchDetail extends LightningElement {
    @api recordId;

    @api OrderId
    @api pricebookId
    @track order   
    ind
    recordi
    id
    up
    sVal = '';
    sVal1 = '';
    sVal2 
    open
    pro
    qua
    uni
    ab=a;
    accountObject = ACCOUNT_OBJECT;
    myFields = [a,b,c,PBID_FIELD];
    @wire (getData1)
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
    
 
    // update sVal var when input field value change
    news(event){
        this.open=false;
    }
    cancel(event){
        this.open=false;
    }

    edit(event)
    {
        this.ind=event.target.value;
       
        
        this.open=true;
        console.log(this.recordId.Name);
        console.log(this.recordId.OrderItems);
       this.id=this.order[this.ind].Id;
       this.up=this.order[this.ind].UnitPrice;
       this.recordi=this.recordId.Name;
      
     
     
    }
    handleSuccess(){
        alert("Added");
        this.open=false;
        
    }
  
    clear(event){
        this.sVal='';
        this.sVall1='';
        this.sVal2='';
        getData1()
        .then(result => {
            // set @track contacts variable with return contact list from server  
            this.order = result;
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.order = null;
        });

       console.log("this is insidee clear"+this.order);
        
        
        
        
       
    }
    idChange(event){
        this.pro=event.target.value
    }
    nameChange(event){
        this.qua=event.target.value
    }
    salChange(event){
        this.uni=event.target.value
    }
    save(event){
    
    this.s={'prod':this.pro,'quan':this.qua,'price':this.uni}
    saveData(this.s);
    location.reload();
   
    }

    updateSeachKey(event) {
        this.sVal = event.target.value;
         if (this.sVal !== '') {
           
           
            getOrderList({
                    searchKey: this.sVal
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset order var with null   
                    this.order = null;
                });
        }
        else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
      
        
    }
    updateSeach(event) {
        
        this.sVal1=event.target.value;
        if (this.sVal1 !== '') {
           
            getOrder1List({
                    searchst: this.sVal1
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset order var with null   
                    this.order = null;
                });
        }
        else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
      
    }
    updateSea(event) {
        
        this.sVal2=event.target.value;
       // alert(this.sVal2);
       if (this.sVal2 !== '') {
        alert(this.sVal2);
        getOrder2List({
                searchey: this.sVal2
            })
            .then(result => {
                // set @track contacts variable with return contact list from server  
                this.order = result;
            })
            .catch(error => {
                // display server exception in toast msg 
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                // reset order var with null   
                this.order = null;
            });
    }
    else {
        // fire toast event if input field is blank
        const event = new ShowToastEvent({
            variant: 'error',
            message: 'Search text missing..',
        });
        this.dispatchEvent(event);
    }
      
    }
 
    // call apex method on button click 
    handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if (this.sVal !== '') {
           
           // alert("this is sval"+this.sVal);
            getOrderList({
                    searchKey: this.sVal
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset order var with null   
                    this.order = null;
                });
        }
         else if (this.sVal1 !== '') {
           // alert(this.sVal1);
            getOrder1List({
                    searchst: this.sVal1
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset order var with null   
                    this.order = null;
                });
        }
         else if (this.sVal2 !== '') {
        
            getOrder2List({
                    searchey: this.sVal2
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset order var with null   
                    this.order = null;
                });
        }
        else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}

