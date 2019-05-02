import { HomeComponent } from './../../../layout/home/home.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { CreateOrUpdate, Curso, Professor } from 'src/app/shared';
import { AuthService, CursoService, UtilityService, ProfessorService } from 'src/app/services';
import { CheckboxItem } from 'src/app/components';
import { Listas } from 'src/app/shared/models/ENUMS/listas';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.css']
})
export class ProfessorEditComponent extends CreateOrUpdate implements OnInit {

  professorForm: FormGroup;
  professor: Professor;
  cursos: Curso[];
  uploadProgress = 0;
  private filePhoto: File;

  auths = [];
  authorization: any[] = [];
  userAuth = new Array<CheckboxItem>();

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public cursoService: CursoService,
    public formBuilder: FormBuilder,
    public professorService: ProfessorService,
    public route: ActivatedRoute,
    public router: Router,
    public utilityService: UtilityService,
  ) {
    super(formBuilder, null, route);
    this.professor = this.professorService.professorTemp;

    this.cursoService.mapListKeys<Curso>(this.cursoService.getOnlyList())
      .subscribe((cursos) => {
        this.cursos = cursos;
      });
  }

  ngOnInit() {
    if (this.professor !== undefined) {
      this.auths = HomeComponent.auths;
      this.findById();
    } else {
      this.newRegistre();
    }
  }

  findById() {

    this.userAuth = Listas._AUTHORIZATION.map(x => {
      if (this.professor.auth.includes(x.cod)) {
        this.authorization.push(x.cod);
        return new CheckboxItem(x.cod, x.perfil, true);
      } else {
        return new CheckboxItem(x.cod, x.perfil, false);
      }
    });

    this.onRolesChange(this.authorization);

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
      lattes: [this.professor.lattes]
    });
  }

  newRegistre() {
    this.professorForm = this.formBuilder.group({
      identificador: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: [''],
      email2: [''],
      fixo: [''],
      celular: [''],
      outro: [''],
      endereco: [''],
      cpf: [''],
      rg: [''],
      graduacao: [''],
      titulacao: [''],
      area: [''],
      tipo: ['professor'],
      photo: [''],
      lattes: [''],
    });
  }

  onSubmit(): void {
    const formProfessor = this.professorForm.value;
    if (!formProfessor.$key) {
      this.professorService.create(formProfessor)
        .then(() => {
          this.modal.showAlertSuccess('Professor(a) registrado(a) com sucesso!');
        }).catch((error) => {
          this.modal.showAlertDanger(`Erro ao registrar ${error}`);
        });
    } else {
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
  }

  edit(formProfessor) {
    const KEY = formProfessor.$key;
    delete formProfessor.$key;
    formProfessor.auth = this.authorization;
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

  onRolesChange(value) {
    this.authorization = value;
  }

  return() {
    this.router.navigate(['/gip/professores']);
  }
}
