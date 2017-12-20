import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient';

export interface State {
    ingredients: Ingredient[],
    selectedIngredient: Ingredient,
    selectedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatos', 10)
    ],
    selectedIngredient: null,
    selectedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.selectedIngredientIndex];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const oldIngredients = [...state.ingredients];
            oldIngredients[state.selectedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients: oldIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: -1
            }
        case ShoppingListActions.DELETE_INGREDIENTS:
            const ingredients = [...state.ingredients];
            ingredients.splice(state.selectedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredients,
                selectedIngredient: null,
                selectedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDIT:
            const editIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                selectedIngredient: editIngredient,
                selectedIngredientIndex: action.payload
            }
        case ShoppingListActions.END_EDIT:
            return {
                ...state,
                selectedIngredient: null,
                selectedIngredientIndex: -1
            }
        default:
            return state;
    }
}