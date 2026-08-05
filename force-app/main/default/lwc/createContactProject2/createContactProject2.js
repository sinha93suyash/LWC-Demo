import { LightningElement } from 'lwc';

export default class CreateContactProject2 extends LightningElement {
    step ="1"
    stepVal;
    handleNext(){
        this.step = 2;
        this.stepVal = this.step.toString();
        console.log('step value is',typeof(this.stepVal))
    }
}