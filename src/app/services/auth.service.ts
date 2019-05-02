import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { BaseService } from './base.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    public aFAuth: AngularFireAuth,
  ) {
    super();
  }

  createAuthUser(user: { email: string, password: string }): Promise<any> {
    return this.aFAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: { email: string, password: string }): Promise<any> {
    return this.aFAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState) => {
        return authState != null;
      }).catch(this.handlePromiseError);
  }

  sendEmailRedifinePassword(email: string) {
    return this.aFAuth.auth.sendPasswordResetEmail(email);
  }

  redefinePassword(newPassword: string) {
    return this.aFAuth.auth.currentUser.updatePassword(newPassword)
      .catch(this.handlePromiseError);
  }

  redefineEmail(email: string) {// o usuário precisa estar conectado.
    return this.aFAuth.auth.currentUser.updateEmail(email)
    .catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    return this.aFAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.aFAuth
        .authState
        .pipe(take(1))
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });

  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.aFAuth
        .authState
        .pipe(take(1))
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(authUser.uid) : reject('');
        });
    });
  }
}
