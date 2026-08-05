import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class PublisherComponent extends LightningElement {

    @wire(MessageContext)
    messageContext;

    sendMessage() {
        // logic to send message

        const payload = {
            message: 'Hello from Publisher!'
          
        }
        publish(this.messageContext, SAMPLEMC, payload);
    }
}