import * as shoppingListModule from '../shopping-list/store/shopping-list.reducer';
import * as authModule from '../auth/store/auth.reducer';

export interface AppState {
    shoppingList: shoppingListModule.State,
    auth: authModule.State
}
