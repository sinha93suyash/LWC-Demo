import { LightningElement,wire } from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList'
export default class ApexWireDemo extends LightningElement {
@wire(getAccountList)
    accounts
}