import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as AppReducer from '../../store/app.reducer';
import { Ingredient } from '../../shared/ingredient';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if(data.selectedIngredientIndex > -1){
            this.editedItem = data.selectedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }else{
            this.editMode = false;
          }
        }
      )
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.EndEdit())
    this.subscription.unsubscribe();
  }
}
