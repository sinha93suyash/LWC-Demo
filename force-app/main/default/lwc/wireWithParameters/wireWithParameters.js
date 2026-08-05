import { LightningElement, wire } from 'lwc';
import getAccountListByName from '@salesforce/apex/accountController.getAccountListByName';

export default class WireWithParameters extends LightningElement {

    Name = '';
    accounts = []
    
    @wire(getAccountListByName, {name:'$Name'})
    filterAcc({data,error}) {

        if(data){
            console.log('Data:', typeof(data));
            
            
            this.accounts = data
        }

        if(error){
            console.error(error);
        }
    }

    handleChange(event){
        this.Name = event.target.value;
        console.log('Search Name:', this.Name);
    }
}