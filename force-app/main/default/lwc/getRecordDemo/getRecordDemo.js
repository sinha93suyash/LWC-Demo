import { LightningElement,wire,api } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi'
import ACCOUNT_NAME from '@salesforce/schema/Account.Name'
import ACCOUNT_ANNUALREVENUE from '@salesforce/schema/Account.AnnualRevenue'
import ACCOUNT_Phone from '@salesforce/schema/Account.phone'
export default class GetRecordDemo extends LightningElement {
    @api recordId
    AnnualRev
    NameVal
    @wire(getRecord,{recordId: '$recordId', fields:[ACCOUNT_NAME, ACCOUNT_ANNUALREVENUE]})
    getFieldValue({data,error}){
        if(data){
            console.log(data)
            this.AnnualRev = data.fields.AnnualRevenue.value;
            //console.log(AnnualRev)
            this.NameVal = data.fields.Name.value
            //console.log(Name)
        }
        if(error){
            console.error(error)
        }
    }

    /* @wire(getFieldValue, {field:ACCOUNT_Phone })
    getFieldVal({data})
    if(data){
        console.log(data)
    } */
}/*  */