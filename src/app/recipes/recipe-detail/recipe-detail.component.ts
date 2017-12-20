import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeReducer from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  recipeState: Observable<RecipeReducer.State>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipeReducer.RecipeState>) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = params['id'];
        this.recipeState = this.store.select('recipes');
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onEdit(){
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }
  onDelete(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeIndex))
    this.router.navigate(['/recipes']);
  }
  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: RecipeReducer.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.recipeIndex].ingredients))
      })
  }
}
