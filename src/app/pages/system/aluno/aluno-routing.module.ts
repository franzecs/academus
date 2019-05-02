import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';

const alunosRoutes: Routes = [
  {path: '', component: AlunoListComponent},
  {path: 'details', component: AlunoEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
