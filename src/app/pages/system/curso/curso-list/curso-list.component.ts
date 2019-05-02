import { FaculdadeService } from './../../../../services/faculdade.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageList, Curso, Faculdade } from 'src/app/shared';
import { CursoService } from 'src/app/services';
import { AlertTypes } from 'src/app/components';
import { take } from 'rxjs/operators';

import * as ARR from 'lodash';
@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent extends PageList implements OnInit {

  cursos: any;
  length: number;
  id: string;

  constructor(
    public cursoService: CursoService,
    public faculdadeService: FaculdadeService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.getList();
  }

  getList(Key?) {
    this.cursoService.getOnlyList().valueChanges().subscribe((t) => {
      this.length = t.length;
    });
    this.cursoService.mapListKeys<Curso>(this.cursoService.getPageList(this.numberItems, Key))
      .subscribe((cursos) => {
        this.cursos = ARR.slice(cursos, 0, this.numberItems);
        this.nextKey = ARR.get(cursos[this.numberItems], 'nome');
        for (const curso of this.cursos) {
          this.faculdadeService.getObject(curso.faculdadeId).valueChanges()
            .subscribe((faculdadeS) => {
              curso.faculdade = faculdadeS.sigla;
            });
        }
      });
  }

  onNext() {
    this.prevKeys.push(ARR.first(this.cursos)['nome']);
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
      this.cursoService.delete(this.id)
        .then(() => {
          this.modal.showAlertSuccess('Curso deletada com sucesso!');
        }).catch((err) => {
          this.modal.showAlertDanger(`Falha ao deletar!! (${err})`);
        });
    }
  }

  goToDetails(curso?: Curso) {
    this.cursoService.cursoTemp = curso;
    this.router.navigate(['/gip/cursos/details']);
  }
}
