import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnInit {
  item: Ingredient;
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
  }
  onSubmit(ingredient: Ingredient){
    if(!this.isAdd){
      // Edit
    }else{
      this.item = new Ingredient(ingredient.name, ingredient.amount);
      this.sls.addItem(this.item);
    }
  }
}
