import { LightningElement,wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.email';
export default class WireService extends LightningElement {
    userId = ID
    //005VA00000fwEDXYA2
    userDetail
    @wire(getRecord, {recordId: '005VA00000fwEDXYA2', fields:[NAME_FIELD, EMAIL_FIELD]})
    userDetailHandler({data,error}){
        if(data){
            this.userDetail = data.fields;
            console.log('userDetailValue is'+this.userDetail);
        }
        if(error){
            console.error(error)
        }
    }

    @wire(getRecord, {recordId: '005VA00000fwEDXYA2', fields:[NAME_FIELD, EMAIL_FIELD]})
    userDetailProperty
}