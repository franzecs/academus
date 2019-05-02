import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OpcaoMenu, ModalMessage } from 'src/app/components';
import { UserService, AuthService } from 'src/app/services';
import { User } from 'src/app/shared';
import { CloudMessageService } from 'src/app/services/cloud-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  static auths = [];
  menus: OpcaoMenu[] = [];
  currentUser: User;
  id: string;
  @ViewChild(ModalMessage) modal: ModalMessage;

  message;

  constructor(
    public authService: AuthService,
    private cMessagingService: CloudMessageService,
    public userService: UserService,
    private router: Router,
  ) {
    authService.aFAuth.authState
      .pipe().subscribe((authUser: firebase.User) => {
        if (authUser) {
          router.navigate(['/']);
          userService.currentUser
            .valueChanges().subscribe((user: User) => {
              this.currentUser = user;
            });
        } else {
          router.navigate(['login']);
        }
      });
  }

  ngOnInit() {
    this.cMessagingService.getPermission();
    this.cMessagingService.receiveMessage()
    this.cMessagingService.currentMessage.subscribe((message) => {
      this.message = message;
      this.modal.showAlertInfo(this.message.notification.title);
    });

    this.authService.getCurrentUser()
      .then((id) => {
        this.changeMenu(id);
      });
  }

  changeMenu(id) {
    const perfis = [];
    this.userService.get(id).valueChanges()
      .subscribe((response) => {
        HomeComponent.auths = response.auth;
        perfis.push(response.auth);
        if (perfis[0].includes(1)) {
          for (const op of this.menuAluno()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(2)) {
          for (const op of this.menuFuncionario()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(3)) {
          for (const op of this.menuProfessor()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(4)) {
          for (const op of this.menuAdm()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(5)) {
          for (const op of this.menuEstagio()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(6)) {
          for (const op of this.menuAtend()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(7)) {
          for (const op of this.menuCoord()) {
            this.menus.push(op);
          }
        }
        if (perfis[0].includes(8)) {
          for (const op of this.menuNpj()) {
            this.menus.push(op);
          }
        }
      });
  }

  menuAluno(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Perfil', 'fas fa-id-card', 'dark', '/gip/alunos/profile'),
      new OpcaoMenu('Estágios', 'fas fa-briefcase', 'primary', ''),
    ];
  }

  menuFuncionario(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Perfil', 'fas fa-id-card', 'dark', '/gip/funcionarios/profile'),
    ];
  }

  menuProfessor(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Perfil', 'fas fa-id-card', 'dark', '/gip/professores/profile'),
      new OpcaoMenu('Horários', 'fa fa-product-hunt', 'warning', ''),
      new OpcaoMenu('Ementas', 'fa fa-product-hunt', 'success', ''),
      new OpcaoMenu('Formulários e Modelos', 'fa fa-product-hunt', 'primary', ''),
    ];
  }

  menuAdm(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Alunos', 'fas fa-user-graduate', 'warning', ''),
      new OpcaoMenu('Cursos', 'fas fa-book-open', 'primary', '/gip/cursos'),
      new OpcaoMenu('Faculdades', 'fas fa-archway', 'success', '/gip/faculdades'),
      new OpcaoMenu('Funcionarios', 'fas fa-user-friends', 'info', '/gip/funcionarios'),
      new OpcaoMenu('Professores', 'fas fa-user-tie', 'danger', '/gip/professores'),
      new OpcaoMenu('Usuários', 'fas fa-user-cog', 'secondary', '/registers/signup'),

    ];
  }

  menuEstagio(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Alunos Estágio', 'fas fa-users-cog', 'primary', '/pilates/instrutores'),
      new OpcaoMenu('Professores', 'fas fa-user-tie', 'danger', '/gip/professores'),
      new OpcaoMenu('Unidades de Estágio', 'fas fa-building', 'warning', '/registers/signup'),
    ];
  }

  menuAtend(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Professores', 'fas fa-user-tie', 'danger', '/gip/professores'),
      new OpcaoMenu('Protocolo', 'fas fa-invoice', 'warning', ''),
    ];
  }

  menuCoord(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Professores', 'fas fa-user-tie', 'danger', '/gip/professores'),
      new OpcaoMenu('Cursos', 'fas fa-book-open', 'primary', '/gip/cursos'),
      new OpcaoMenu('Horários', 'fas fa-chalkboard-teacher', 'danger', ''),
    ];
  }
  menuNpj(): OpcaoMenu[] {
    return [
      new OpcaoMenu('Estagio NPJ', 'fas fa-landmark', 'danger', ''),
    ];
  }
}
