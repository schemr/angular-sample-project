import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) { }
  
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
}
