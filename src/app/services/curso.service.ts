import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { storage } from 'firebase';

import { BaseService } from './base.service';
import { Curso, Document } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends BaseService {

  cursoRef: AngularFireList<Curso> = null;
  cursoTemp: Curso;
  path = `/cursos`;

  constructor(
    public db: AngularFireDatabase,
  ) {
    super();
    this.cursoRef = db.list(this.path);
  }

  create(curso: Curso): Promise<any> {
    return Promise.resolve(this.cursoRef
      .push(curso));
  }

  update(key: string, value: any): Promise<any> {
    return this.cursoRef.update(key, value)
      .catch(error => this.handleObservableError(error));
  }

  delete(key: string): Promise<void> {
    return this.cursoRef.remove(key)
      .catch(error => this.handlePromiseError(error));
  }

  getPageList(numberItems, startKey?): AngularFireList<Curso> {
    return this.db.list(`/cursos`,
    (ref: firebase.database.Reference) => ref.orderByChild('nome')
      .startAt(startKey)
      .limitToFirst(numberItems + 1)
    );
  }

  getOnlyList(): AngularFireList<Curso> {
    return this.db.list(`/cursos`,
    (ref: firebase.database.Reference) => ref.orderByChild('nome')
    );
  }

  getObject(id: string) {
    return this.db.object<Curso>(`/cursos/${id}`);
  }

  uploadImg(file: File, id: string): storage.UploadTask {
    return storage().ref().child(`/logos/${id}`).put(file);
  }

  saveDoc(doc: {description: string, url: string}, cursoId: string): Promise<any> {
    return Promise.resolve(this.db.list(`/curseDetails/${cursoId}/documents`)
      .push(doc)).catch(error => this.handleObservableError(error));
  }

  getdocs(cursoId: string): AngularFireList<Document> {
    return this.db.list(`/curseDetails/${cursoId}/documents`,
    (ref: firebase.database.Reference) => ref.orderByChild('description')
    );
  }

  deleteDoc(key: string, cursoId: string): Promise<void> {
    return this.db.list(`/curseDetails/${cursoId}/documents`).remove(key)
      .catch(error => this.handlePromiseError(error));
  }



}
