import { LightningElement } from 'lwc';
import AccountCtrl from '@salesforce/apex/AccountCtrl.AccountCtrl'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class DataFromLWC extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;
    nameField = NAME_FIELD
    handleSubmit(event){
        event.preventDefault();
        console.log('event::::',event)
        const fields = event.detail.fields
        AccountCtrl({
            acc : fields
        }).then(()=>{
            console.log('success')
            this.ShowToastEvent('Success','Account created', 'success')
        }).catch(error =>{
            console.log('error');
        })
    }


    ShowToastEvent(title, message, variant){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        })
        this.dispatchEvent(event);
    }
    

}