import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe'; 

@Injectable()

export class DataStorageService{
    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipes(){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://recipebook-3eaba.firebaseio.com/recipes.json', this.recipeService.getRecipes(), headers )
    }

    getRecipes(){
        this.http.get('https://recipebook-3eaba.firebaseio.com/recipes.json')
            .subscribe(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    this.recipeService.setRecipes(recipes);
                }
            )
    }

}