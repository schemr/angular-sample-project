import { Subscription } from 'rxjs/Rx';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  constructor(private route:ActivatedRoute, 
              private recipeService: RecipeService) { }

  ngOnInit() {
    let isNew = true;
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')){
          isNew = false;
          this.recipeIndex = +params['id'];
        }else{
          isNew = true;
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
