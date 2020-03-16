import { Injectable } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {Component, NgZone} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router,  
    public ngZone: NgZone 
  ) {  

    //Сохранить дату и сбросить если юзер вышел
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  
  
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log('trigger')
          this.router.navigate(['dashboard']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  


  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Пароль сброшен, проверьте почту.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Проверка вышел ли юзер или нет
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }


  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
         console.log('google trigger')
          this.router.navigate(['dashboard']);
        })
     
    }).catch((error) => {
      window.alert(error)
    })
  }




 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}

