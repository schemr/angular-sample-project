import { Ingredient } from '../shared/ingredient';
import { Headers, Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Raw beef', 'yukhoe', 'http://cfile23.uf.tistory.com/image/2670E23C517F791A188B75', [
      new Ingredient('meet', 2),
      new Ingredient('rice', 1)
    ]),
    new Recipe('bibimbap', 'korean traditional food', 'http://3.bp.blogspot.com/-ivcIFbxA2OM/TvsdLFcR8lI/AAAAAAAABOQ/Qhp6UtPIzh8/s320/Picture1%2B-%2Bjeonju.jpg', [])
  ];

  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes;
  }
  getRecipe(id: number){
    return this.recipes[id];
  }
  deleteRecipe(recipe: Recipe){
    return this.recipes.splice(this.recipes.indexOf(recipe), 1)
  }
  addRecipe(recipe: Recipe){
    return this.recipes.push(recipe);
  }
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }
  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://recipebook-3eaba.firebaseio.com/recipes.json', body, {headers: headers})
  }
  fetchData(){

  }
}