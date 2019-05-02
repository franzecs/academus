import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';

const professorRoutes: Routes = [
  {path: '', component: ProfessorListComponent},
  {path: 'details', component: ProfessorEditComponent},
  {path: 'profile', component: ProfessorProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(professorRoutes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
