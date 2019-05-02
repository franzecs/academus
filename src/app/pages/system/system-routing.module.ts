import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';

import { FaculdadeEditComponent, FaculdadeListComponent } from './faculdade';

const routes: Routes = [
  {
    path: '', component: SystemComponent,
    children: [
      { path: 'alunos', loadChildren: './aluno/aluno.module#AlunoModule'},
      { path: 'cursos', loadChildren: './curso/curso.module#CursoModule' },
      { path: 'faculdades', loadChildren: './faculdade/faculdade.module#FaculdadeModule'},
      { path: 'funcionarios', loadChildren: './funcionario/funcionario.module#FuncionarioModule'},
      { path: 'professores', loadChildren: './professor/professor.module#ProfessorModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
