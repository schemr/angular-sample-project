import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCFIl7LQsIVirfWz5_eEy0iMg2qRkvz1AQ",
      authDomain: "recipebook-3eaba.firebaseapp.com"
    })
  }
}
