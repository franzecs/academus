import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, FaculdadeService, UtilityService } from 'src/app/services';
import { CreateOrUpdate, Faculdade } from 'src/app/shared';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-faculdade-edit',
  templateUrl: './faculdade-edit.component.html',
  styleUrls: ['./faculdade-edit.component.css']
})
export class FaculdadeEditComponent extends CreateOrUpdate implements OnInit {

  facForm: FormGroup;
  faculdade: Faculdade;
  uploadProgress = 0;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public faculdadeService: FaculdadeService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public utilityService: UtilityService,
  ) {
    super(formBuilder, null, route);
    this.faculdade = this.faculdadeService.faculdadeTemp;
  }

  ngOnInit() {
    if (this.faculdade !== undefined) {
      this.findById();
    } else {
      this.newRegistre();
    }
  }

  findById() {
    this.facForm = this.formBuilder.group({
      $key: [this.faculdade.$key],
      nome: [this.faculdade.nome, [Validators.required, Validators.minLength(3)]],
      mantenedora: [this.faculdade.mantenedora, [Validators.required]],
      portaria: [this.faculdade.portaria, [Validators.required, Validators.minLength(6)]],
      sigla: [this.faculdade.sigla, [Validators.required, Validators.minLength(3)]],
      url_logo: [this.faculdade.url_logo],
    });
  }

  newRegistre() {
    this.facForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      mantenedora: ['', [Validators.required]],
      portaria: ['', [Validators.required, Validators.minLength(6)]],
      sigla: ['', [Validators.required, Validators.minLength(3)]],
      url_logo: [''],
    });
  }

  onSubmit(): void {
    const formFac = this.facForm.value;
    if (!formFac.$key) {
      this.faculdadeService.create(formFac)
        .then(() => {
          this.modal.showAlertSuccess('Faculdade registrada com sucesso!');
        }).catch((error) => {
          this.modal.showAlertDanger(`Erro ao registrar ${error}`);
        });
    } else {
      if (this.filePhoto) {

        this.modal.showLoading();
        const uploadTask = this.faculdadeService.uploadImg(this.filePhoto, formFac.$key);

        uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
          this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.cd.detectChanges();
        }, (error: Error) => {
          this.modal.showAlertDanger(`Erro ao realizaer upload de imagem (${error.message})`);
        });
        uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
          UploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
            formFac.url_logo = downloadURL;
            this.editFac(formFac);
          });
        });
      } else {
        this.editFac(formFac);
      }
    }
  }

  editFac(formFac) {
    const KEY = formFac.$key;
    delete formFac.$key;
    this.faculdadeService.update(KEY, formFac)
      .then(() => {
        this.modal.dismiss();
        this.modal.showAlertSuccess('Faculdade editada com sucesso!');
        this.filePhoto = undefined;
        this.faculdade.url_logo = formFac.url_logo;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      }).catch((error) => {
        this.modal.showAlertDanger(`Erro ao editar Faculdade: (${error.message})`);
      });
  }

  onPhoto(event) {
    const loading = this.modal;
    loading.showLoading();
    this.utilityService.processImage(event.target.files).pipe(take(1)).subscribe((res) => {
      this.filePhoto = res.data;
    }, err => { },
      () => { loading.dismiss(); });
  }

  return() {
    this.router.navigate(['/gip/faculdades']);
  }
}
