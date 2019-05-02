import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { AuthService, UserService } from 'src/app/services';
import { Aluno, CreateOrUpdate, Funcionario, Professor,  User } from 'src/app/shared';
import { CheckboxItem } from 'src/app/components';
import { Listas } from './../../../shared/models/ENUMS/listas';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends CreateOrUpdate implements OnInit {

  signupForm: FormGroup;
  authorization: any[] = [];
  userAuth = new Array<CheckboxItem>();

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
  ) {
    super(formBuilder, null, null);

    this.userAuth = Listas._AUTHORIZATION.map(x => new CheckboxItem(x.cod, x.perfil));

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  onSubmit(): void {

    const formUser = this.signupForm.value;
    const username: string = formUser.username;

    this.userService.userExist(username).pipe(take(1))
      .subscribe((userExist: boolean) => {
        if (!userExist) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState) => {

            delete formUser.password;
            formUser.auth = this.authorization;
            const uuid = authState.user.uid;

            this.userService.create(this.userConstructor(formUser), uuid)
              .then(() => {
                this.router.navigate(['/']);
              }).catch((error: any) => {
                this.modal.showAlertDanger(error);
              });
          }).catch((error: any) => {
            this.modal.showAlertDanger(error);
          });

        } else {
          this.modal.showAlertDanger(`O username ${username} já está sendo usado em outra conta!`);
        }
      });
  }

  userConstructor(formUser: any): User {
    if (formUser.tipo === 'administrador') {
      const funcionario = new Funcionario(formUser.name, formUser.username, formUser.email, formUser.tipo, formUser.auth);
      return funcionario;
    }
    if (formUser.tipo === 'aluno') {
      const aluno = new Aluno(formUser.name, formUser.username, formUser.email, formUser.tipo, formUser.auth);
      return aluno;
    }
    if (formUser.tipo === 'funcionario') {
      const funcionario = new Funcionario(formUser.name, formUser.username, formUser.email, formUser.tipo, formUser.auth);
      return funcionario;
    }
    if (formUser.tipo === 'professor') {
      const professor = new Professor(formUser.name, formUser.username, formUser.email, formUser.tipo, formUser.auth);
      return professor;
    }
  }

  onRolesChange(value) {
    this.authorization = value;
  }
}
