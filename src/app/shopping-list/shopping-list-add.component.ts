import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    if(changes.item.currentValue === null){
      this.isAdd = true;
      this.item = {name:null, amount:null};
    }else{
      this.isAdd = false;
    }
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
