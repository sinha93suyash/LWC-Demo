import { LightningElement, wire } from 'lwc';

import {
    subscribe,
    MessageContext
} from 'lightning/messageService';

import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class SubscriberComponent extends LightningElement {

    receivedMessage = 'No message yet';

    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {

        if (this.subscription) {
            return;
        }

        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC,
            (message) => {
                this.handleMessage(message);
            }
        );
    }

    handleMessage(message) {
        this.receivedMessage = message.message;
    }
}