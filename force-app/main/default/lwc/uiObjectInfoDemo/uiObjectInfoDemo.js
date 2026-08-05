import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INFO from '@salesforce/schema/Account'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
export default class UiObjectInfoDemo extends LightningElement {
    defaultRecordTypeId;
    @wire(getObjectInfo,{objectApiName:ACCOUNT_INFO})
    objectInfoHandler;

    objectApiNames = [OPPORTUNITY_OBJECT, ACCOUNT_INFO]
    ObjectInfos;
    @wire(getObjectInfos,{objectApiNames:'$objectApiNames'})
    getObjectInfosHandler({data}){
        if(data){
            console.log('Hello')
            console.log(data)
            this.ObjectInfos = data;
            console.log('heyyy'+ this.ObjectInfos);
        }
    }
    
}