import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient';
import { Observable } from 'rxjs/Observable';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as AppReducer from '../store/app.reducer';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  items: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.items = this.store.select('shoppingList')
  }
  onEditItem(index: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
