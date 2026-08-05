import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import CONTACT from '@salesforce/schema/contact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateRecordDemo extends LightningElement {
    formFields={}
    changeHandler(event){
        const {name, value} = event.target;
       this.formFields[name]=value
        console.log('Name is:::'+ this.formFields)
    }
    saveHandler(){
        const recordInput = {apiName: CONTACT.objectApiName, fields: this.formFields}
        console.log('recordInput is::::'+recordInput.fields)
        createRecord(recordInput).then(result=>{
            this.ShowToastEvent('success creating record', `record created successfully $result.id`, 'success')
            this.template.querySelector('form.createForm').reset()
            this.formFields={}
        }).catch(error =>{
            this.ShowToastEvent('Error creating record', error.body.message, 'error')
        })
    }

    ShowToastEvent(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant,
        }))
    }

}