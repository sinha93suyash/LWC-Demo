import { LightningElement, api } from 'lwc';

export default class MealTileComponent extends LightningElement {
    @api meal;
    
    handleClick(){
        let myCustomEvent = new CustomEvent('recepie',{detail:this.meal.idMeal})
        this.dispatchEvent(myCustomEvent);
    }
}