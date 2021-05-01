import { Ingredient } from '../model/ingredient.model';
import * as ShoppingListActions from './shoppingList.action';

export interface AppState {
    shoppingList: IngredientState
}

export interface IngredientState {
    ingredients: Ingredient[];
    editIngredient: Ingredient;
    editIndex: number;
}
const initialState: IngredientState = {
    ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomato', 1)],
    editIndex: -1,
    editIngredient: null
};

export function shoppingListReducer (state = initialState, action: ShoppingListActions.Actions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                editIndex: -1,
                editIngredient: null
            }
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...state.ingredients].concat(action.payload),
                editIndex: -1,
                editIngredient: null
            }
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const modifiedIngs = [...state.ingredients];
            modifiedIngs[action.payload.index] = action.payload.ingredient;
            return {
                ...state,
                ingredients: [...modifiedIngs],
                editIndex: -1,
                editIngredient: null
            }
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const modifiedIngs = [...state.ingredients];
            modifiedIngs.splice(action.payload.index, 1);
            return {
                ...state,
                ingredients: [...modifiedIngs],
                editIndex: -1,
                editIngredient: null
            }
        }
        case ShoppingListActions.START_EDIT: {
            return {
                ...state,
                ingredients: [...state.ingredients],
                editIndex: action.payload.editIndex,
                editIngredient: {...state.ingredients[action.payload.editIndex]}
            }
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                ingredients: [...state.ingredients],
                editIndex: -1,
                editIngredient: null
            }
        }
        default:
            return state;
    }
}