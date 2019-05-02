import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { storage } from 'firebase';

import { Funcionario } from '../shared/models/funcionario.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends BaseService {

  funcionarioRef: AngularFireList<Funcionario> = null;
  funcionarioTemp: Funcionario;
  path = `/users/funcionario`;

  constructor(
    public db: AngularFireDatabase,
  ) {
    super();
    this.funcionarioRef = db.list(this.path);
  }

  create(funcionario: Funcionario): Promise<any> {
    return Promise.resolve(this.funcionarioRef
      .push(funcionario));
  }

  update(key: string, value: any): Promise<any> {
    this.db.list(`/users/ctrl`).update(key, {auth: value.auth});
    return this.funcionarioRef.update(key, value)
      .catch(error => this.handleObservableError(error));
  }

  delete(key: string): Promise<void> {
    return this.funcionarioRef.remove(key)
      .catch(error => this.handlePromiseError(error));
  }

  getPageList(numberItems, startKey?): AngularFireList<Funcionario> {
    return this.db.list(`/users/funcionario`,
    (ref: firebase.database.Reference) => ref.orderByChild('name')
      .startAt(startKey)
      .limitToFirst(numberItems + 1)
    );
  }

  getOnlyList(): AngularFireList<Funcionario> {
    return this.db.list(`/users/funcionario`,
    (ref: firebase.database.Reference) => ref.orderByChild('name')
    );
  }

  getObject(id: string) {
    return this.db.object<Funcionario>(`/users/funcionario/${id}`);
  }

  uploadImg(file: File, id: string): storage.UploadTask {
    return storage().ref().child(`/perfis/${id}`).put(file);
  }
}
