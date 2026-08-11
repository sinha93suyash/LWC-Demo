import { LightningElement } from 'lwc';
import AccountPaginationControllerMthod from '@salesforce/apex/AccountPaginationController.AccountPaginationControllerMthod'
const columns = [
    { label: 'Name', fieldName: 'Name'}
    ]
export default class PaginationDemo extends LightningElement {
    totalPages =0;
    pageSize = 10;
    records=[];
    pageNumber = 1;
    columns = columns;
    displayRecords = []
    isPreviousDisabled = true;
    getAccountHandler(){
        AccountPaginationControllerMthod().then(result =>{
            this.records = result;
            console.log('records are', this.records.length)
            this.totalPages = Math.ceil(this.records.length/this.pageSize);
            this.updateRecords()
        }).catch(error=>{
            console.error(error)
        })
    }

    previousHandler(){
        if(this.pageNumber > 1){
            this.pageNumber--;
            this.updateRecords();
            
        }
    }
    nextHandler(){
        if(this.pageNumber < this.totalPages){
            this.pageNumber++;
            this.updateRecords();
            this.isPreviousDisabled = false;
            
        }
    }

    updateRecords(){
        const start = (this.pageNumber -1) * this.pageSize
        const end = start+this.pageSize;
        this.displayRecords = this.records.slice(start,end)
        console.log('records are finally', this.records)
    }
}