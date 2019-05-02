import { AlertTypes } from './../../../../components/modal-util/modal-message.component';
import { FaculdadeService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { PageList } from 'src/app/shared/abstract/list.component';
import { Faculdade } from 'src/app/shared';
import { Router } from '@angular/router';

import * as ARR from 'lodash';

@Component({
  selector: 'app-faculdade-list',
  templateUrl: './faculdade-list.component.html',
  styleUrls: ['./faculdade-list.component.css']
})
export class FaculdadeListComponent extends PageList implements OnInit {

  faculdades: Faculdade[];
  id: string;

  constructor(
    public faculdadeService: FaculdadeService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.getList();
  }

  getList(key?) {
    this.faculdadeService.mapListKeys<Faculdade>(this.faculdadeService.getPageList(this.numberItems, key))
      .subscribe((faculdades) => {
        this.faculdades = ARR.slice(faculdades, 0, this.numberItems);
        this.nextKey = ARR.get(faculdades[this.numberItems], 'nome');
      });
  }

  openModalDelete(id, nome, usuario) {
    this.id = id;
    this.openModal(`Deseja deletar ${usuario}: ${nome}`, AlertTypes.DELETE);
  }

  deletar(evento) {
    if (evento === true) {
      this.faculdadeService.delete(this.id)
        .then(() => {
          this.modal.showAlertSuccess('Faculdade deletada com sucesso!');
        }).catch((err) => {
          this.modal.showAlertDanger(`Falha ao deletar!! (${err})`);
        });
    }
  }

  goToDetails(faculdade?: Faculdade) {
    this.faculdadeService.faculdadeTemp = faculdade;
    this.router.navigate(['gip/faculdades/details']);
  }
}
