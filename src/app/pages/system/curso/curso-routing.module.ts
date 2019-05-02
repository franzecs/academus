import { CursoListComponent } from './curso-list/curso-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoEditComponent } from '.';

const cursoRoutes: Routes = [
  {path: '', component: CursoListComponent},
  {path: 'details', component: CursoEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cursoRoutes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
