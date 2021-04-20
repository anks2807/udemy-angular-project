import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

export class ShoppingService {
    ingredientSelected: Subject<number> = new Subject();
    constructor() {}
    ingredients: Ingredient[] = [
        {
            amount: 1,
            name: 'Apple'
        },
        {
            amount: 5,
            name: 'Tomato'
        }
    ];
    getShoppingList() {
        return this.ingredients.slice();
    }
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients.splice(index, 1, ingredient);
    }

    selectIngredient(index: number) {
        this.ingredientSelected.next(index);
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    deleteIngrdient(index: number) {
        this.ingredients.splice(index, 1);
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ins => this.addIngredient(ins));
    }
}
