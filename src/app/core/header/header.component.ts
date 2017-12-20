import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import { Observable } from 'rxjs/Observable'; 

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import * as AppReducer from '../../store/app.reducer';
import * as AuthReducer from '../../auth/store/auth.reducer';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthReducer.State>;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<AppReducer.AppState>) { }
  
  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  onStore(){
    this.dataStorageService.storeRecipes()
      .subscribe(
        data => console.log(data),
        error => console.error(error)
    );
  }
  onFetch(){
    this.dataStorageService.getRecipes();
  }
  onLogout(){
    this.authService.logout();
  }
}
