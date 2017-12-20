import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RecipeReducer from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm : FormGroup;
  id: number;
  editMode = false;

  private subscription: Subscription;
  private isNew = true;
  private recipeIndex: number;
  constructor(private route:ActivatedRoute, 
              private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<RecipeReducer.RecipeState>) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, updatedRecipe: newRecipe}))
    }else{
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe))
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddItem(name: string, amount: number){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.get(
      'ingredients')).removeAt(index);
  }

  private navigateBack(){
    this.router.navigate(['../']);
  }

  private initForm(){
    let recipeName = '';
    let recipeImage = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(this.editMode){
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: RecipeReducer.State) => {
          const recipe = recipeState.recipes[this.id]
          recipeName = recipe.name;
          recipeImage = recipe.imagePath;
          recipeContent = recipe.description;
          if( recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        })
    }

    this.recipeForm = this.formBuilder.group({
        name: [recipeName, Validators.required],
        imagePath: [recipeImage, Validators.required],
        description: [recipeContent, Validators.required],
        ingredients: recipeIngredients
      });
  }

}
