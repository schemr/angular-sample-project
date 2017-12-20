import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipes/recipe'; 
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';

@Injectable()

export class DataStorageService{
    constructor(
        private httpClient: HttpClient, 
        private recipeService: RecipeService){}

    storeRecipes(){
        const req = new HttpRequest('PUT', 'https://recipebook-3eaba.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
        return this.httpClient.request(req);
    }

    getRecipes(){
        this.httpClient.get<Recipe[]>('https://recipebook-3eaba.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
            .map(
                (recipes) => {
                    for (let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            )
    }

}