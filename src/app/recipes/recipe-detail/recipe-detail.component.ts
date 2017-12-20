import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as AppReducer from '../../store/app.reducer';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipeService,
              private router: Router,
              private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipesService.getRecipe(this.recipeIndex);
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
    this.recipesService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }
  onAddToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.selectedRecipe.ingredients))
  }
}
