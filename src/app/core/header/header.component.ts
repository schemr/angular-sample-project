import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }
  
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
