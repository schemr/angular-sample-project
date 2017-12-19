import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;

  constructor(private sls:ShoppingListService, 
              private route: ActivatedRoute,
              private recipesService: RecipeService,
              private router: Router,
              private store: Store<{shoppingList:{items: Ingredient[]}}>) { }

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
