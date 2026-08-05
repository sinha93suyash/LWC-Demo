import { LightningElement,api } from 'lwc';

export default class LoadMealResult extends LightningElement {
    @api mealResult=[];
    selectedMeal;
    showModal =false
    get MealResult(){
        return this.mealResult?.length > 0;
    }
    recepieHandler(event){
        let selectedMealId = event.detail;
        console.log('selected Meal is', selectedMealId)
        this.selectedMeal = this.mealResult.find(currItem => currItem.idMeal == selectedMealId)
        console.log('selected Meal::::', this.selectedMeal)
        this.showModal = true;
    }

    closeHandler(){
        this.showModal = false;
    }
}