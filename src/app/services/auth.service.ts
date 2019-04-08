import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_: any;

  userSubject = new BehaviorSubject(null);
  user = this.userSubject.asObservable();



  constructor(
    public afAuth: AngularFireAuth
  ) { 
    this.afAuth.user.subscribe(user => {
      this.user_ = user
      this.userSubject.next(user);
    })
  }

  tryLogin(credentials) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }



  tryGoogleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  sendPasswordResetEmail(emailAddress) {
    this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }
}
