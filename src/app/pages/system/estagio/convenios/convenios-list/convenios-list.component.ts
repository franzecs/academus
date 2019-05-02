import { Convenio } from './../../../../../shared/models/convenio.model';
import { Component, OnInit } from '@angular/core';

import { PageList } from 'src/app/shared';


@Component({
  selector: 'app-convenios-list',
  templateUrl: './convenios-list.component.html',
  styleUrls: ['./convenios-list.component.css']
})
export class ConveniosListComponent extends PageList implements OnInit {

  convenios: Convenio[];

  constructor(

  ) {
    super();
  }

  ngOnInit() {
  }

  getList() {

  }

}
