import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { storage } from 'firebase';

import { BaseService } from './base.service';
import { Faculdade } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class FaculdadeService extends BaseService {

  faculdadeRef: AngularFireList<Faculdade>;
  faculdadeTemp: Faculdade;

  constructor(
    public db: AngularFireDatabase,
  ) {
    super();
    this.faculdadeRef = db.list<Faculdade>(`faculdades`);
  }

  create(faculdade: Faculdade): Promise<any> {
    return Promise.resolve(this.faculdadeRef
      .push(faculdade));
  }

  update(key: string, value: any): Promise<any> {
    return this.faculdadeRef.update(key, value)
      .catch(error => this.handleObservableError(error));
  }

  delete(key: string): Promise<void> {
    return this.faculdadeRef.remove(key)
      .catch(error => this.handlePromiseError(error));
  }

  getPageList(numberItems, startKey?): AngularFireList<Faculdade> {
    return this.db.list(`/faculdades`,
      (ref: firebase.database.Reference) => ref.orderByChild('nome')
        .startAt(startKey)
        .limitToFirst(numberItems + 1)
    );
  }

  getOnlyList(): AngularFireList<Faculdade> {
    return this.db.list(`/faculdades`,
      (ref: firebase.database.Reference) => ref.orderByChild('nome')
    );
  }

  getObject(id: string) {
    return this.db.object<Faculdade>(`/faculdades/${id}`);
  }

  uploadImg(file: File, id: string): storage.UploadTask {
    return storage().ref().child(`/logos/${id}`).put(file);
  }
}
