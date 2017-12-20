import { Recipe } from '../recipe';
import { Ingredient } from '../../shared/ingredient';
import * as RecipeActions from './recipe.actions';
import * as AppReducer from '../../store/app.reducer';

export interface RecipeState extends AppReducer.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe('Raw beef', 'yukhoe', 'http://cfile23.uf.tistory.com/image/2670E23C517F791A188B75', [
            new Ingredient('meet', 2),
            new Ingredient('rice', 1)
        ]),
        new Recipe('bibimbap', 'korean traditional food', 'http://3.bp.blogspot.com/-ivcIFbxA2OM/TvsdLFcR8lI/AAAAAAAABOQ/Qhp6UtPIzh8/s320/Picture1%2B-%2Bjeonju.jpg', [])
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            }
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1) 
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
}