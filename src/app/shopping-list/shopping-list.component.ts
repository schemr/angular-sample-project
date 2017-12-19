import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient'
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  items: Observable<{items: Ingredient[]}>;

  constructor(private sls: ShoppingListService, private store: Store<{shoppingList:{items: Ingredient[]}}>) { }

  ngOnInit() {
    this.items = this.store.select('shoppingList')
  }
  onEditItem(index: number){
    this.sls.startedEditing.next(index);
  }
}
