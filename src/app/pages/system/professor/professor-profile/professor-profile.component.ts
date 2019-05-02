import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { ModalMessage } from 'src/app/components';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { Professor, Curso } from 'src/app/shared';
import { AuthService, ProfessorService, UtilityService, CursoService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {

  @ViewChild(ModalMessage) modal: ModalMessage;
  professorForm: FormGroup;
  professor: Professor;
  uploadProgress = 0;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public cursoService: CursoService,
    public formBuilder: FormBuilder,
    public professorService: ProfessorService,
    public route: ActivatedRoute,
    public router: Router,
    public utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .then((id) => {
        this.getObject(id);
        console.log('id:', id);
      });
  }

  getObject(id: string) {
    this.professorService.mapObjectKey<Professor>(this.professorService.getObject(id))
      .subscribe((resp) => {
        console.log(resp);
        this.professor = resp;
        console.log(this.professor);
        this.makerForm();
      });
  }

  makerForm() {
    this.professorForm = this.formBuilder.group({
      $key: [this.professor.$key],
      identificador: [this.professor.identificador],
      name: [this.professor.name, [Validators.required, Validators.minLength(3)]],
      username: [this.professor.username],
      email: [this.professor.email],
      email2: [this.professor.email2],
      fixo: [this.professor.fixo],
      celular: [this.professor.celular],
      outro: [this.professor.outro],
      endereco: [this.professor.endereco],
      cpf: [this.professor.cpf],
      rg: [this.professor.rg],
      graduacao: [this.professor.graduacao],
      titulacao: [this.professor.titulacao],
      area: [this.professor.area],
      tipo: [this.professor.tipo],
      photo: [this.professor.photo],
      lattes: [this.professor.lattes],
      auth: [this.professor.auth],
    });
  }

  onSubmit(): void {
    const formProfessor = this.professorForm.value;

    if (this.filePhoto) {

      this.modal.showLoading('Aguarde upload...');

      const uploadTask = this.professorService.uploadImg(this.filePhoto, formProfessor.$key);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.cd.detectChanges();
      }, (error: Error) => {
        this.modal.showAlertDanger(`Erro ao realizaer upload de imagem (${error.message})`);
      });
      uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
        UploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
          formProfessor.photo = downloadURL;
          this.edit(formProfessor);
        });
      });
    } else {
      this.edit(formProfessor);
    }
  }

  edit(formProfessor) {
    const KEY = formProfessor.$key;
    delete formProfessor.$key;
    this.professorService.update(KEY, formProfessor)
      .then(() => {
        this.modal.dismiss();
        this.modal.showAlertSuccess('Professor(a) editado(a) com sucesso!');
        this.filePhoto = undefined;
        this.professor.photo = formProfessor.photo;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      }).catch((error) => {
        this.modal.showAlertDanger(`Erro ao editar Curso: (${error})`);
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

  redefinePassword(newPassword: string) {
    this.authService.redefinePassword(newPassword)
      .then(() => {
        this.modal.showAlertSuccess('Senha alterada com sucesso. Você será redirecionado para a página de login');
        this.authService.logout();
      }).catch((error) => {
        this.modal.showAlertDanger(`Erro ao tentar modificar a Senha. Tente novamente mais tarde (${error})`);
      });
  }

  redefineEmail(email: string) {
    this.professor.email = email;
    this.makerForm();
    this.authService.redefineEmail(email)
      .then(() => {
        this.onSubmit();
        this.modal.showAlertSuccess('E-mail alterada com sucesso. Você será redirecionado para a página de login');
        this.authService.logout();
      }).catch(() => {
        this.modal.showAlertDanger(`Erro ao tentar modificar o e-mail. Tente novamente mais tarde`);
      });
  }
}
