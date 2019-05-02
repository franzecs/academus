import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { storage } from 'firebase';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { BaseService } from './base.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(
    public aFAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) {
    super();
    this.listAuthState();
  }

  private listAuthState(): void {
    this.aFAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          // console.log('Auth state alterado!', authUser.uid);
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          this.setUsers(authUser.uid);
        }
      });
  }

  setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    ).pipe(
      map((users: User[]) => {
        return users.filter((user: User) => user.$key !== uidToExclude);
      }));
  }

  create(user: User, uuid: string) {
    this.db.object(`/users/ctrl/${uuid}`).set({tipo: user.tipo, auth: user.auth});
    return   this.db.object(`/users/${user.tipo}/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }


  edit(user: { name: string, username: string, photo: string }): Promise<any> {
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  userExist(username: string): Observable<boolean> {
    return this.db.list<User>('/users', (ref: firebase.database.Reference) =>
      ref.orderByChild('name').equalTo(username))
      .valueChanges()
      .pipe(
        map((users: User[]) => {
          return users.length > 0;
        }),
        catchError(this.handleObservableError)
      );
  }

  get(userId: string): AngularFireObject<User> {
    return this.db.object(`/users/ctrl/${userId}`);
  }

  uploadPhoto(file: File, userId: string): storage.UploadTask {
    return storage().ref().child(`/users/${userId}`).put(file);
  }
}
