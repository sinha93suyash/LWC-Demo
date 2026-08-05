import { LightningElement } from 'lwc';
import MEAL from "@salesforce/resourceUrl/Meal";
export default class MealSearch extends LightningElement {
    Meal = MEAL;
    searchMeal
    changeHandler(event){
        this.searchMeal = event.target.value
        console.log(this.searchMeal)
    }

    handleClick(event){
        const sendEvent = new CustomEvent("searchmeal",{detail:this.searchMeal})
        this.dispatchEvent(sendEvent);
    }
}