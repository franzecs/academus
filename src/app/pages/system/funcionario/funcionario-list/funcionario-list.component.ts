import { Component, OnInit } from '@angular/core';

import * as ARR from 'lodash';

import { PageList, Funcionario } from 'src/app/shared';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { AuthService } from 'src/app/services';
import { AlertTypes } from 'src/app/components';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent extends PageList implements OnInit {

  funcionarios: Funcionario[];
  id: string;

  constructor(
    public authService: AuthService,
    public funcionarioService: FuncionarioService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.getList();
  }

  getList(Key?) {
    this.funcionarioService.mapListKeys<Funcionario>(this.funcionarioService.getPageList(this.numberItems, Key))
      .subscribe((funcionarios) => {
        this.funcionarios = ARR.slice(funcionarios, 0, this.numberItems);
        this.nextKey = ARR.get(funcionarios[this.numberItems], 'name');
      });
  }

  onNext() {
    this.prevKeys.push(ARR.first(this.funcionarios)['name']);
    this.getList(this.nextKey);
  }

  onPrev() {
    const prevKey = ARR.last(this.prevKeys);
    this.prevKeys = ARR.dropRight(this.prevKeys);
    this.getList(prevKey);
  }

  openModalDelete(id, nome, usuario) {
    this.id = id;
    this.openModal(`Deseja deletar ${usuario}: ${nome}`, AlertTypes.DELETE);
  }

  deletar(evento) {
    if (evento === true) {
      this.funcionarioService.delete(this.id)
        .then(() => {
          this.modal.showAlertSuccess('Funcionario deletado com sucesso!');
        }).catch((err) => {
          this.modal.showAlertDanger(`Falha ao deletar!! (${err})`);
        });
    }
  }

  sendEmailRedifinePassword(email: string) {
    this.authService.sendEmailRedifinePassword(email)
      .then(() => {
        this.modal.showAlertInfo(`Enviado com sucesso, verique o seu e-mail(${email})`);
      })
      .catch((erro) => {
        this.modal.showAlertDanger(`Erro ao enviar e-mail (${erro})`);
      });
  }

  goToDetails(funcionario?: Funcionario) {
    this.funcionarioService.funcionarioTemp = funcionario;
    this.router.navigate(['gip/funcionarios/details']);
  }
}
