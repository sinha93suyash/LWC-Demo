import { LightningElement,wire } from 'lwc';
import { getListRecordsByName } from 'lightning/uiListsApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { updateRecord } from 'lightning/uiRecordApi';
const COLS=[
    {label:'Id', fieldName:'Id'},
    {label:'Name', fieldName:'Name'},
    {label:'Title', fieldName:'Title'},
    {label:'Phone', fieldName:'Phone', editable: true},
    {label:'Email', fieldName:'Email',  editable: true}
]
export default class UpdateRecordApapter extends LightningElement {
        draftValues=[]
        contacts=[]
        columns = COLS;
        @wire(getListRecordsByName, {objectApiName:CONTACT_OBJECT.objectApiName, listViewApiName:"Test"})
        listViewHandler({data,error}){
            console.log('coming till here',data)
            console.log('Object API Name:', CONTACT_OBJECT.objectApiName);
            if(data){
                console.log(data)
                /* this.contacts = data.records.records.map(item=>{
                    return {
                        "Id": this.getValue(item, 'Id'),
                        "Name": this.getValue(item, 'Name'),
                        "Title": this.getValue(item, 'Title'),
                        "Phone": this.getValue(item, 'Phone'),
                        "Email": this.getValue(item, 'Email')
                    }
                }) */
            }
            if(error){
                console.log('Error coming')
                console.log(error)
            }
        }

        getValue(data,field){
            return data.fields[field].value
        }

        handleSave(event){
            console.log(event);
        }
    

}