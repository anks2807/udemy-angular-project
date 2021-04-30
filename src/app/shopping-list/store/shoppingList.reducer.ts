import { Ingredient } from '../model/ingredient.model';
import * as ShoppingListActions from './shoppingList.action';

const initialState = {
    ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomato', 1)]
};

export function shoppingListReducer (state = initialState, action: ShoppingListActions.Actions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...state.ingredients].concat(action.payload)
            }
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const modifiedIngs = [...state.ingredients];
            modifiedIngs[action.payload.index] = action.payload.ingredient;
            return {
                ...state,
                ingredients: [...modifiedIngs]
            }
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const modifiedIngs = [...state.ingredients];
            modifiedIngs.splice(action.payload.index, 1);
            return {
                ...state,
                ingredients: [...modifiedIngs]
            }
        }
        default:
            return state;
    }
}