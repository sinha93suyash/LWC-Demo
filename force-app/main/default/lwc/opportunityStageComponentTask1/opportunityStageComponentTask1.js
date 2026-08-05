import { LightningElement, wire } from 'lwc';
import { getObjectInfo,getPicklistValues  } from "lightning/uiObjectInfoApi";
import OPPORTUNITY from '@salesforce/schema/Opportunity';
import STAGE_NAME from '@salesforce/schema/Opportunity.StageName';
import getOppstage from '@salesforce/apex/OppStage.getOppstage'
const columns = [
    { label: 'Opportunity Name', fieldName: 'Name',sortable:true,sortDirection:'desc' },
    { label: 'Stage', fieldName: 'StageName',sortable:true,sortDirection:'desc' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    
];
export default class OpportunityStageComponentTask1 extends LightningElement {
    StageOptions = [];
    selectedStage;
    closeBoolean = false;
    sortBy = 'Amount'
    sortDirection = 'desc'
    columns = columns.slice(0,3);

    @wire(getObjectInfo,{objectApiName:OPPORTUNITY})
    objectInfo


    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_NAME })
    picklistResults({data,error}){
        if(data){
           console.log('data is:::::::::',data)
           this.StageOptions = data.values.map(currItem => ({label:currItem.label, value:currItem.value}))
           console.log('data is',typeof(this.StageOptions))
           this.StageOptions= [{ label: 'All Stages', value: 'All Stages' },...this.StageOptions]
        }
        if(error){
            console.error('error is', error)
        }
    }

    handleChange(event){
        this.selectedStage = event.target.value;
        console.log('selectedStage is', this.selectedStage)

    }

    handleCheckbox(event){
        this.closeBoolean = event.target.checked;
        if(this.closeBoolean){
            console.log('should show 4');
            this.columns = columns.slice(0,4)
        }
        else{
            console.log('should show 3');
            this.columns = columns.slice(0,3)
        }
        
        console.log('closeBoolean is', this.closeBoolean);
    }

    @wire(getOppstage, { stageName: '$selectedStage', sortBy: '$sortBy', sortDirection:'$sortDirection' })
    opportunities;

    handleSort(event){
        console.log('event detail',event.detail)
        this.sortBy = event.detail.fieldName
        this.sortDirection = event.detail.sortDirection
    }

    

    

    


}