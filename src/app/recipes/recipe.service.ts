import { Ingredient } from '../shared/ingredient';
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

  constructor() { }

  getRecipes(){
    return this.recipes;
  }

}