import { Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FileUpload } from './fileupload';
import { storage } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private db: AngularFireDatabase) { }

  //private basePath = '/uploads' 
  urlFile: any
  
  pushFileToStorage(fileUpload: FileUpload, basePath: string, progress: {percentagem: number}, id:string): Promise<any>{

    return new Promise((resolve, reject) =>{
      const storageRef = storage().ref()
      const uploadTask = storageRef.child(`${basePath}/${id}`).put(fileUpload.file)
      uploadTask.on(storage.TaskEvent.STATE_CHANGED,
        (snapshot)=>{
          //em progresso
          const snap = snapshot as storage.UploadTaskSnapshot
          progress.percentagem = Math.round((snap.bytesTransferred / snap.totalBytes)*100)
        },
        (error) => {
          //falha
          console.log(error)
        },
        ()=>{
          //sucesso
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL =>{
            fileUpload.url = downloadURL
            fileUpload.name = fileUpload.file.name
            fileUpload.tipo = fileUpload.file.type
            //this.saveFileData(fileUpload,basePath, id)
            this.urlFile = fileUpload.url
            resolve(fileUpload.url)
          }) 
        }
      )
    }) 
  }

  getFileUploads(numberItems, basePath): AngularFireList<FileUpload> {
    return this.db.list(basePath, ref =>
      ref.limitToLast(numberItems));
  }
 
  deleteFileUpload(fileUpload: FileUpload, basePath) {
    this.deleteFileDatabase(fileUpload.id, basePath)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, basePath);
      })
      .catch(error => console.log(error));
  }
 
  private deleteFileDatabase(key: string,basePath) {
    return this.db.list(`${basePath}/`).remove(key);
  }
 
  private deleteFileStorage(name: string,basePath) {
    const storageRef = storage().ref();
    storageRef.child(`${basePath}/${name}`).delete();
  }
}
