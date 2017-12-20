import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AppReducer from '../store/app.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppReducer.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: AuthReducer.State) => {
                const reqCopied = req.clone({params: req.params.set('auth', authState.token)})
                return next.handle(reqCopied);
            })
    }
}