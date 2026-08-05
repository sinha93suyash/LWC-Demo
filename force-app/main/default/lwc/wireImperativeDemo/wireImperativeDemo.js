import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList';
export default class WireImperativeDemo extends LightningElement {
    accounts;
    handleChange(){
        getAccountList().then(result =>{
            this.accounts = result;
        console.log('accounts data is', this.accounts)
        }).catch(error =>{
            console.error(error)
        })
    }
}