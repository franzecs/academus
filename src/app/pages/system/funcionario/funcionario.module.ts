import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@Angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { FuncionarioEditComponent } from './funcionario-edit/funcionario-edit.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioProfileComponent } from './funcionario-profile/funcionario-profile.component';

@NgModule({
  declarations: [FuncionarioEditComponent, FuncionarioListComponent, FuncionarioProfileComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FuncionarioRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FuncionarioModule { }
