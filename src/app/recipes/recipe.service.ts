import { Ingredient } from '../shared/ingredient';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Raw beef', 'yukhoe', 'http://cfile23.uf.tistory.com/image/2670E23C517F791A188B75', [
      new Ingredient('meet', 2),
      new Ingredient('rice', 1)
    ]),
    new Recipe('bibimbap', 'korean traditional food', 'http://3.bp.blogspot.com/-ivcIFbxA2OM/TvsdLFcR8lI/AAAAAAAABOQ/Qhp6UtPIzh8/s320/Picture1%2B-%2Bjeonju.jpg', [])
  ];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes;
  }
  getRecipe(id: number){
    return this.recipes[id];
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }
  editRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}