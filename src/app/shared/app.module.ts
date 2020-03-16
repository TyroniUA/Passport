import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { AuthService } from "./services/auth.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDi72UHYkqOud6fmoeyXpP-BO1AOmp3XnM",
    authDomain: "authtest-94965.firebaseapp.com",
    databaseURL: "https://authtest-94965.firebaseio.com",
    projectId: "authtest-94965",
    storageBucket: "authtest-94965.appspot.com",
    messagingSenderId: "250168156795",
    appId: "1:250168156795:web:dde58658c077eba54e38de"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule,
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
