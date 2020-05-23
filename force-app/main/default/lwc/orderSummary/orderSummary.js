import { LightningElement,api,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getonedata';
import submitForApproval from '@salesforce/apex/orderControl.submitForApproval';
import ACCOUNT_OBJECT from '@salesforce/schema/OrderItem';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class OrderSummary extends LightningElement {
    @api recordId;
    y=this.recordId;
    order
    open
    ind
    id
    up
    quan
    ab="modal-content-id-2"
    o
    oid
    ab
    a
    x
    y
    or1
    ox
    accountObject = ACCOUNT_OBJECT;
    recordi
    @wire (getData,{x:'$recordId'})
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
    ed(event){
        this.o=true;
    }
     can(event){
             this.open=false;
         }
         handleSuccess(){
             alert("updated");
             this.open=false;
             location.reload();
         }
     
     edit(event){
         this.x=event.target.name;
      
         alert(this.x);
         this.y=event.target.value;
         alert(this.y);
         
     
         this.open=true;
         this.recordi=this.order[this.x].OrderItems[this.y].Id;
         
         this.id=this.order[this.x].OrderItems[this.y].PricebookEntryId;
        this.up=this.order[this.x].OrderItems[this.y].UnitPrice;
        this.oid=this.order[this.x].OrderItems[this.y].OrderId;
        this.quan=this.order[this.x].OrderItems[this.y].Quantity;
         
     }
     dele(event){
         this.x=event.target.name;
         this.y=event.target.value;
         this.recordId=this.order[this.x].OrderItems[this.y].Id;;
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
     del(event){
        this.x=event.target.value;
        
        this.recordId=this.order[this.x].Id;
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
     
     conf(event){
         this.ind=event.target.value;
         alert(this.ind);
         this.or1=this.order[this.ind].Id;
         this.ab=this.order[this.ind].TotalAmount;
         alert(this.or1);
         if(this.ab>0){
         if (window.confirm("Do you want to Confirm Order?")) { 
         
             y=submitForApproval({'o':this.or1});
             alert(this.y);
             console.log(y)
            alert("approval sent");// it will submit the form
         }else{
         alert("Your order Amount  is less than 100000,It is comfirmed!");
         }
     }
     else{
         alert("Please add some products to your cart!!");
     }
     }
  

}