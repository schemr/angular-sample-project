import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe'; 
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';

@Injectable()

export class DataStorageService{
    constructor(
        private http: Http, 
        private recipeService: RecipeService,
        private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://recipebook-3eaba.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), headers )
    }

    getRecipes(){
        const token = this.authService.getToken();
        this.http.get('https://recipebook-3eaba.firebaseio.com/recipes.json?auth=' + token)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
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