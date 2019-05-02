import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { Router } from '@angular/router';

import { AuthService, FuncionarioService, UtilityService } from 'src/app/services';
import { Funcionario } from 'src/app/shared';
import { ModalMessage } from 'src/app/components';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-funcionario-profile',
  templateUrl: './funcionario-profile.component.html',
  styleUrls: ['./funcionario-profile.component.css']
})
export class FuncionarioProfileComponent implements OnInit {

  @ViewChild(ModalMessage) modal: ModalMessage;
  funcionarioForm: FormGroup;
  funcionario: Funcionario;
  uploadProgress = 0;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    public funcionarioService: FuncionarioService,
    public utilityService: UtilityService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .then((id) => {
        this.getObject(id);
      });
  }

  getObject(id: string) {
    this.funcionarioService.mapObjectKey<Funcionario>(this.funcionarioService.getObject(id))
      .subscribe((resp) => {
        this.funcionario = resp;
        this.makerForm();
      });
  }

  makerForm() {
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

  onSubmit(): void {
    const formFuncionario = this.funcionarioForm.value;

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

  edit(formFuncionario) {
    const KEY = formFuncionario.$key;
    delete formFuncionario.$key;
    this.funcionarioService.update(KEY, formFuncionario)
      .then(() => {
        this.modal.dismiss();
        this.modal.showAlertSuccess('Dados editados com sucesso!');
        this.filePhoto = undefined;
        this.funcionario.photo = formFuncionario.photo;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      }).catch((error) => {
        this.modal.showAlertDanger(`Erro ao editar dados: (${error})`);
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
    this.funcionario.email = email;
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
