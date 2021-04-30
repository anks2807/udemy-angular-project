import { Ingredient } from '../model/ingredient.model';
import * as ShoppingListActions from './shoppingList.action';

const initialState = {
    ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomato', 1)]
};

export function shoppingListReducer (state, action: ShoppingListActions.AddIngredientAction) {
    state = initialState;
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        default:
            return state;
    }
}