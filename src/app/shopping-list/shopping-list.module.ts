import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from '../dropdown.directive';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations:[
        ShoppingListComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        DropdownDirective
    ]
})

export class ShoppingListModule{}