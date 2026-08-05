import { LightningElement,wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves'
import LEAVEREQUEST_OBJECT from "@salesforce/schema/LeaveRequest__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from '@salesforce/apex';
import USER_ID from '@salesforce/user/Id';
const columns = [
    { label: 'Leave Request Id', fieldName: 'Name', cellAttributes: {class : {fieldName: 'cellClass'}} },
    { label: 'From Date', fieldName: 'From_Date__c', type: 'date' , cellAttributes: {class : {fieldName: 'cellClass'}} },
    { label: 'To Date', fieldName: 'To_Date__c', type: 'date' , cellAttributes: {class : {fieldName: 'cellClass'}} },
    { label: 'Reason', fieldName: 'Reason__c' , cellAttributes: {class : {fieldName: 'cellClass'}} },
    { label: 'Status', fieldName: 'Status__c' , cellAttributes: {class : {fieldName: 'cellClass'}} },
    { label: 'Manager Comment', fieldName: 'Manager_Comment__c' , cellAttributes: {class : {fieldName: 'cellClass'}}},
    {
        type: 'button',
        typeAttributes: {
            name: 'Edit',
            title: 'Edit',
            label:'Edit',
            variant: 'border-filled',
            alternativeText: 'Edit',
            disabled: { fieldName: 'isEditDisabled' },
            cellAttributes: {class : {fieldName: 'cellClass'}}

        }
    }
];
export default class MyLeaves extends LightningElement {
    myLeaves=[]
    wiredResult;
    columns=columns;
    disabled = false;
    objectApiName = 'LeaveRequest__c'
    recordId;
    showModal = false;
    currentUserId = USER_ID
    @wire(getMyLeaves)
    wiredResult(result){
        this.wiredResult = result
        if(result.data){
            this.myLeaves = result.data.map(a=>({...a,isEditDisabled:a.Status__c!='Pending',cellClass:a.Status__c === 'Approved'? 'slds-theme_success':a.Status__c === 'Rejected' ? 'slds-theme_warning' : ''}))
            console.log('data is', result.data)
        }
        
        if(result.error){
            console.log('error message is', result.error)
        }

        
    }
    
    get noRecordsFound(){
        return this.myLeaves.length ==0
    }

    handleRowAction(event){
        console.log('hello World!!!',event)
        this.showModal = true;
        this.recordId = event.detail.row.Id
        
    }

    get ApprovedStatus(){
        return result.data.map(a=>a.status__c = 'Approved')
        console.log('disabaled value is::', this.disabled)
    }

    popUpCloseHandler(){
        this.showModal = false;
    }

    cancelHandler(){
        this.showModal = false;
    }

    successHandler(){
        this.showModal = false
        this.ShowToastEvent('Success',
    'Leave request created successfully.',
    'success')
    refreshApex(this.wiredResult)
    }

    ShowToastEvent(title,message,variant){
       const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
       })
       this.dispatchEvent(event);
    }

    handleClickAdd(){
        this.showModal = true;
        this.recordId = ''
    }

    submitHandler(event){
        event.preventDefault();
        const fields={...event.detail.fields}
        fields.Status__c = 'Pending'
        if(new Date(fields.From_Date__c) > new Date(fields.To_Date__c)){
            this.ShowToastEvent('Error','From date cannot be greater that To date','Error')
        }
        else if(new Date() >  new Date(fields.From_Date__c)){
            this.ShowToastEvent('Error','From date should not be less than today','Error')
        }
        else{
            this.refs.leaveRequestForm.submit(fields)
        }

    }
    



    



}

    
