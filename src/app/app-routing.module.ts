import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}