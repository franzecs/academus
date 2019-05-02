import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaculdadeListComponent, FaculdadeEditComponent } from '.';

const faculdadeRoutes: Routes = [
  {path: '', component: FaculdadeListComponent},
  {path: 'details', component: FaculdadeEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(faculdadeRoutes)],
  exports: [RouterModule]
})
export class FaculdadeRoutingModule { }
