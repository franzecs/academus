import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@Angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoRoutingModule } from './aluno-routing.module';

@NgModule({
  declarations: [AlunoListComponent, AlunoEditComponent],
  imports: [
    AlunoRoutingModule,
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class AlunoModule { }
