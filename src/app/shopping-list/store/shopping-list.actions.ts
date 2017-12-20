import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const END_EDIT = 'END_EDIT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENTS;
    constructor(public payload: {ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number){}
}

export class EndEdit implements Action {
    readonly type = END_EDIT;
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | EndEdit ;