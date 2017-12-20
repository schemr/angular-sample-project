import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as RecipeReducer from '../store/recipe.reducer';


@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeReducer.State> 

  //@Output() recipeSelected = new EventEmitter<Recipe>();
  constructor(private store: Store<RecipeReducer.RecipeState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes')
  }
}
