import { LightningElement,api,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getonedata';
import ACCOUNT_OBJECT from '@salesforce/schema/Order';


export default class EditDetail extends LightningElement {
    @api recordId;
    open=true
    ed
    order
    oid
    oname
    accId
    x=0
    am
    con
    sta
    accountobject=ACCOUNT_OBJECT;

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
    can(event){
        this.open=false;
    }
    edit(event){
    this.oid=this.order[this.x].Id;
    this.oname=this.order[this.x].Name;
    this.accid=this.order[this.x].AccountId;
    this.ed=this.order[this.x].EffectiveDate;
    this.am=this.order[this.x].TotalAmount;
    this.con=this.order[this.x].ContractId;
    this.sta=this.order[this.x].Status;
}
handleSuccess(){
    alert("Updated");
    this.open=false;
}
    // connectedCallback() {
    // this.oid=this.order[this.x].Id;
    // this.oname=this.order[this.x].Name;
    // this.accid=this.order[this.x].AccountId;
    //   }

}