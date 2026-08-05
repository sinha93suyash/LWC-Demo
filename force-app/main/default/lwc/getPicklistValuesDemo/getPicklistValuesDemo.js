import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT from '@salesforce/schema/Account'
import Industry from '@salesforce/schema/Account.Industry';
import Type from '@salesforce/schema/Account.Type';

export default class GetPicklistValuesDemo extends LightningElement {
    
    industryOptions = [];
    selectedValue;
    ratingOptions;
    ratingVal;


    @wire(getObjectInfo, {objectApiName: ACCOUNT})
    accountProperty;


    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT, recordTypeId:'$accountProperty.data.defaultRecordTypeId'})
    getAllVal({data,error}){
        if(data){
            console.log(data)
            this.ratingOptions = this.getAllPickListVal(data.picklistFieldValues.Rating)
        }
        if(error){
            console.error(error);
        }
    }

    getAllPickListVal(data){
        return data.values.map(item=>({"label": item.label, "value": item.value}))
    }

    onRatingChange(event){
        this.ratingVal = event.detail.value
    }










    @wire(getPicklistValues, {recordTypeId: '$accountProperty.data.defaultRecordTypeId', fieldApiName:Industry})
    IndustryPickList({data,error}){
        if(data){
            console.log('values::::::::::::::'+data.values)
            this.industryOptions = [...this.generatePicklist(data)]
            console.log('value for this'+this.industryOptions);
        }
        if(error){
            console.error(error)
        }
    }

    /* get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    } */

    generatePicklist(data){
        return data.values.map(item=>({label:item.label, value:item.value}))
        console.log('heyyyyyyy'+data.values.map(item=>({label:item.label, value:item.value})))
    }

    handleChange(event) {
        this.selectedValue = event.detail.value;
    }
    typeVal=[]
    selectedType;

    @wire(getPicklistValues, {recordTypeId: '$accountProperty.data.defaultRecordTypeId', fieldApiName:Type})
    typePicklist({data,error}){
        if(data){
            console.log('Type::::'+data)
            this.typeVal = [...this.generatePicklist(data)]
            //console.log('value for this'+this.industryOptions);
        }
        if(error){
            console.error(error)
        }
    }

    onPicklistHandleChange(event) {
        this.selectedType = event.detail.value;
    }
}