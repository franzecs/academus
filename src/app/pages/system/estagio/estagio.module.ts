import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstagioRoutingModule } from './estagio-routing.module';
import { ConveniosListComponent } from './convenios/convenios-list/convenios-list.component';
import { ConveniosEditComponent } from './convenios/convenios-edit/convenios-edit.component';

@NgModule({
  declarations: [ConveniosListComponent, ConveniosEditComponent],
  imports: [
    CommonModule,
    EstagioRoutingModule
  ]
})
export class EstagioModule { }
