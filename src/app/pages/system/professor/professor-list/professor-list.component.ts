import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertTypes } from 'src/app/components';
import { ProfessorService, AuthService } from 'src/app/services';
import { PageList, Professor } from 'src/app/shared';

import * as ARR from 'lodash';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent extends PageList implements OnInit {

  professores: Professor[];
  id: string;

  constructor(
    public authService: AuthService,
    public professorService: ProfessorService,
    public router: Router,
  ) {
    super();
   }

  ngOnInit() {
    this.getList();
  }

  getList(Key?) {
    this.professorService.mapListKeys<Professor>(this.professorService.getPageList(this.numberItems, Key))
      .subscribe((professores) => {
        this.professores = ARR.slice(professores, 0, this.numberItems);
        this.nextKey = ARR.get(professores[this.numberItems], 'name');
      });
  }

  onNext() {
    this.prevKeys.push(ARR.first(this.professores)['name']);
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
      this.professorService.delete(this.id)
      .then(() => {
        this.modal.showAlertSuccess('Professor deletado com sucesso!');
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

  goToDetails(professor?: Professor) {
     this.professorService.professorTemp = professor;
    this.router.navigate(['gip/professores/details']);
  }

}

