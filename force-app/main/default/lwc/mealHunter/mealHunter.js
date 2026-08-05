import { LightningElement } from 'lwc';

export default class MealHunter extends LightningElement {
    searchResult

    async mealSearchHandler(event){
        let searchMeal = event.detail;
        console.log('value of search meal is:::', searchMeal);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
        let data = await response.json();
        console.log('Meals Data', data.meals);
        this.searchResult = data.meals;
    }
}