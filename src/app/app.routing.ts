import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './auth/signup/signup.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'signup', component: SignupComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}