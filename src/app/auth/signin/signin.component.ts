import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AppReducer from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'rb-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
  }
  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password:password}));
  }
}
