import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Raw beef', 'yukhoe', 'http://cfile23.uf.tistory.com/image/2670E23C517F791A188B75', []),
    new Recipe('bibimbap', 'korean traditional food', 'http://3.bp.blogspot.com/-ivcIFbxA2OM/TvsdLFcR8lI/AAAAAAAABOQ/Qhp6UtPIzh8/s320/Picture1%2B-%2Bjeonju.jpg', [])
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe)
  }
}
