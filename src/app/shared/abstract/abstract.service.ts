import { Response } from '@angular/http';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { storage } from 'firebase';

const extractError = (error: Response | any): string => {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
      errMsg = error.message ? error.message : error.toString();
  }
  // console.error(errMsg);
  return errMsg;
};

export abstract class AbstractService<T> {


  private objectRef: AngularFireList<T> = null;
  private path;
  public objectTemp: T;

  constructor(
    public db: AngularFireDatabase,
    public p: string
  ) {
    this.path = p;
    this.objectRef = db.list(this.path);
  }

  create(object: T): Promise<any> {
    return Promise.resolve(this.objectRef
      .push(object));
  }

  update(key: string, value: any): Promise<any> {
    return this.objectRef.update(key, value)
      .catch(error => this.handleObservableError(error));
  }

  delete(key: string): Promise<void> {
    return this.objectRef.remove(key)
      .catch(error => this.handlePromiseError(error));
  }

  getPageList(order: string, numberItems, startKey?): AngularFireList<T> {
    return this.db.list(this.path,
    (ref: firebase.database.Reference) => ref.orderByChild(order)
      .startAt(startKey)
      .limitToFirst(numberItems + 1)
    );
  }

  getOnlyList(order: string): AngularFireList<T> {
    return this.db.list(this.path,
    (ref: firebase.database.Reference) => ref.orderByChild(order)
    );
  }

  getObject(id: string) {
    return this.db.object<T>(`${this.path}/${id}`);
  }

  uploadImg(file: File, id: string, path: string): storage.UploadTask {
    return storage().ref().child(`/${path}/${id}`).put(file);
  }

  deleteImg(id: string, path: string) {
    return storage().ref().child(`/${path}/${id}`).delete();
  }

  protected handlePromiseError(error: Response | any): Promise<any> {
      return Promise.reject(extractError(error));
  }

  protected handleObservableError(error: Response | any): Observable<any> {
      return Observable.throw(extractError(error));
  }

  // tslint:disable-next-line:no-shadowed-variable
  mapListKeys<T>(list: AngularFireList<T>): Observable<T[]> {
      return list
          .snapshotChanges().pipe(
              map(actions => actions.map(action => ({ $key: action.key, ...action.payload.val() }))));
  }

  // tslint:disable-next-line:no-shadowed-variable
  mapObjectKey<T>(object: AngularFireObject<T>): Observable<T> {
      return object
        .snapshotChanges()
        .pipe(
          map(action => ({ $key: action.key, ...action.payload.val() }))
        );
  }
}
