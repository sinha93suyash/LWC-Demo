import { LightningElement } from 'lwc';
import RETURNACCOUNT from '@salesforce/apex/AccountCtrl.returnAccount' 
const COLS =[
    {label:"Name", fieldName:"Name"},
    {label:"Phone", fieldName:"Phone"},
    {label:"Rating", fieldName:"Rating"},
    {label:"Industry", fieldName:"Industry"}
]
export default class GetAccount extends LightningElement {
    accName;
    accData = []
    timerId;
    len = false;
    columns = COLS;
    rowDetail;
    handleChange(event){
        
        window.clearTimeout(this.timerId);
        this.accName = event.target.value;
        this.timerId = setTimeout(()=>{
            this.accHandler();
        },1000)
    }
    accHandler(){
        RETURNACCOUNT({accName:this.accName})
        .then(result =>{
            this.accData = result
            console.log('data is:::',this.accData.length)
            if(this.accData.length>0){
                this.len = true
            }
        })
        .catch(error =>{
            console.error(error)
        })

    }

    getSelectedName(event){
        console.log('row Detail', event.detail.selectedRows[0].Name)
        this.rowDetail = event.detail.selectedRows[0]
        const accountSelectedEvent = new CustomEvent('accountselected',{
            detail: this.rowDetail
        })
        this.dispatchEvent(accountSelectedEvent);
    }
}