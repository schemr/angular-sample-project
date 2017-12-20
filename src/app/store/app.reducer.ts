import { ActionReducerMap } from '@ngrx/store';

import * as ShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';

export interface AppState {
    shoppingList: ShoppingListReducer.State,
    auth: AuthReducer.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.shoppingListReducer,
    auth: AuthReducer.authReducer
}