import { RecipeService } from './recipes/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }
  onStore(){
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }
  onFetch(){

  }
}
