import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { storage } from 'firebase';

import { BaseService } from './base.service';
import { Professor, ProfessorBrief } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends BaseService {

  professorRef: AngularFireList<Professor> = null;
  professorTemp: Professor;
  path = `/users/professor`;

  constructor(
    public db: AngularFireDatabase,
  ) {
    super();
    this.professorRef = db.list(this.path);
  }

  create(professor: Professor): Promise<any> {
    return Promise.resolve(this.professorRef
      .push(professor));
  }

  update(key: string, value: any): Promise<any> {
    this.db.list(`/users/ctrl`).update(key, {auth: value.auth});
    return this.professorRef.update(key, value)
      .catch(error => this.handleObservableError(error));
  }

  delete(key: string): Promise<void> {
    return this.professorRef.remove(key)
      .catch(error => this.handlePromiseError(error));
  }

  getPageList(numberItems, startKey?): AngularFireList<Professor> {
    return this.db.list(`/users/professor`,
    (ref: firebase.database.Reference) => ref.orderByChild('name')
      .startAt(startKey)
      .limitToFirst(numberItems + 1)
    );
  }

  getOnlyList(): AngularFireList<Professor> {
    return this.db.list(`/users/professor`,
    (ref: firebase.database.Reference) => ref.orderByChild('name')
    );
  }

  getObject(id: string) {
    return this.db.object<Professor>(`/users/professor/${id}`);
  }

  uploadImg(file: File, id: string): storage.UploadTask {
    return storage().ref().child(`/perfis/${id}`).put(file);
  }

  saveTeacherCurse(professor: ProfessorBrief, cursoId: string): Promise<any> {
    const key = professor.$key;
    delete professor.$key;

    return Promise.resolve(this.db.object<ProfessorBrief>(`/curseDetails/${cursoId}/teachers/${key}`)
      .set(professor)).catch(error => this.handleObservableError(error));
  }

  getTeachersCurse(cursoId) {
    return this.db.list<ProfessorBrief>(`/curseDetails/${cursoId}/teachers`,
    ref => ref.orderByChild('nome'));
  }

  deleteTeacherCurse(key: string, cursoId: string): Promise<void> {
    return this.db.list(`/curseDetails/${cursoId}/teachers`).remove(key)
      .catch(error => this.handlePromiseError(error));
  }
}
