import { LightningElement } from 'lwc';
import getAccountByIndustry from '@salesforce/apex/accountController.getAccountByIndustry'
export default class ApexImperativeWithParameters extends LightningElement {
    searchKey='';
    accounts
    timer
    handleChange(event){
        window.clearTimeout(this.timer)
        this.searchKey = event.target.value
        this.timer = setTimeout(() => {
            this.callApex()
        }, 1000);
    }

    callApex(){
         getAccountByIndustry({indKey: this.searchKey})
        .then(result =>{
            console.log('Account Data', JSON.stringify(result))
            this.accounts = result
        }).catch(error =>{
            console.error(error)
        })
    }
}