import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { FuncionarioEditComponent } from './funcionario-edit/funcionario-edit.component';
import { FuncionarioProfileComponent } from './funcionario-profile/funcionario-profile.component';

const funcionariosRoutes: Routes = [
  {path: '', component: FuncionarioListComponent},
  {path: 'details', component: FuncionarioEditComponent},
  {path: 'profile', component: FuncionarioProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(funcionariosRoutes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
