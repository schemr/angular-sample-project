import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes.module';
import { AppRoutingModule } from './app.routing';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RecipesModule,
    SharedModule,
    ShoppingListModule
  ],
  providers: [RecipeService, ShoppingListService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
