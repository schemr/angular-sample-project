import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import { Observable } from 'rxjs/Observable'; 

import * as AppReducer from '../../store/app.reducer';
import * as AuthReducer from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthReducer.State>;
  constructor(private store: Store<AppReducer.AppState>) { }
  
  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  onStore(){
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetch(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }
}
