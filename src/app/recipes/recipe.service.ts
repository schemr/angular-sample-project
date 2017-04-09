import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient';
import { Headers, Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import 'rxjs/Rx';

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
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }
  editRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipebook-3eaba.firebaseio.com/recipes.json', body, {headers: headers})
  }
  fetchData(){
    return this.http.get('https://recipebook-3eaba.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.next(this.recipes.slice());
        }
      )
  }
}