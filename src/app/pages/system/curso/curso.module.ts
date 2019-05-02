import { ReactiveFormsModule, FormsModule } from '@Angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoRoutingModule } from './curso-routing.module';

@NgModule({
  declarations: [CursoEditComponent, CursoListComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ComponentsModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
