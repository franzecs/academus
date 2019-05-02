import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckboxItem } from 'src/app/components';
import { AuthService, FuncionarioService, UtilityService } from 'src/app/services';
import { CreateOrUpdate, Funcionario } from 'src/app/shared';

import { take } from 'rxjs/operators';
import { Listas } from 'src/app/shared/models/ENUMS/listas';

@Component({
  selector: 'app-funcionario-edit',
  templateUrl: './funcionario-edit.component.html',
  styleUrls: ['./funcionario-edit.component.css']
})
export class FuncionarioEditComponent extends CreateOrUpdate implements OnInit {

  funcionarioForm: FormGroup;
  funcionario: Funcionario;
  uploadProgress = 0;
  private filePhoto: File;

  authorization: any[] = [];
  userAuth = new Array<CheckboxItem>();

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    public funcionarioService: FuncionarioService,
    public route: ActivatedRoute,
    public router: Router,
    public utilityService: UtilityService,
  ) {
    super(formBuilder, null, route);
    this.userAuth = Listas._AUTHORIZATION.map(x => new CheckboxItem(x.cod, x.perfil));

    this.funcionario = this.funcionarioService.funcionarioTemp;
  }

  ngOnInit() {
    if (this.funcionario !== undefined) {
      this.findById();
    } else {
      this.newRegistre();
    }
  }

  findById() {

    this.userAuth = Listas._AUTHORIZATION.map(x => {
      if (this.funcionario.auth.includes(x.cod)) {
        this.authorization.push(x.cod);
        return new CheckboxItem(x.cod, x.perfil, true);
      } else {
        return new CheckboxItem(x.cod, x.perfil, false);
      }
    });

    this.onRolesChange(this.authorization);

    this.funcionarioForm = this.formBuilder.group({
      $key: [this.funcionario.$key],
      identificador: [this.funcionario.identificador],
      celular: [this.funcionario.celular],
      endereco: [this.funcionario.endereco],
      photo: [this.funcionario.photo],
      setor: [this.funcionario.setor],
      name: [this.funcionario.name, [Validators.required, Validators.minLength(3)]],
      username: [this.funcionario.username],
      email: [this.funcionario.email],
      tipo: [this.funcionario.tipo],
      auth: [this.funcionario.auth],
    });
  }

  newRegistre() {
    this.funcionarioForm = this.formBuilder.group({
      identificador: [''],
      celular: [''],
      endereco: [''],
      photo: [''],
      setor: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: [''],
      tipo: [''],
      auth: [''],
    });
  }

  onSubmit(): void {
    const formFuncionario = this.funcionarioForm.value;
    if (!formFuncionario.$key) {
      this.funcionarioService.create(formFuncionario)
        .then(() => {
          this.modal.showAlertSuccess('Funcionario(a) registrado(a) com sucesso!');
        }).catch((error) => {
          this.modal.showAlertDanger(`Erro ao registrar ${error}`);
        });
    } else {
      if (this.filePhoto) {

        this.modal.showLoading('Aguarde upload...');

        const uploadTask = this.funcionarioService.uploadImg(this.filePhoto, formFuncionario.$key);

        uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
          this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.cd.detectChanges();
        }, (error: Error) => {
          this.modal.showAlertDanger(`Erro ao realizaer upload de imagem (${error.message})`);
        });
        uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
          UploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
            formFuncionario.photo = downloadURL;
            this.edit(formFuncionario);
          });
        });
      } else {
        this.edit(formFuncionario);
      }
    }
  }

  edit(formFuncionario) {
    const KEY = formFuncionario.$key;
    delete formFuncionario.$key;
    formFuncionario.auth = this.authorization;
    this.funcionarioService.update(KEY, formFuncionario)
      .then(() => {
        this.modal.dismiss();
        this.modal.showAlertSuccess('Funcionario(a) editado(a) com sucesso!');
        this.filePhoto = undefined;
        this.funcionario.photo = formFuncionario.photo;
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
    this.router.navigate(['/gip/funcionarios']);
  }
}
