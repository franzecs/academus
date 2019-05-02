import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@Angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';

@NgModule({
  declarations: [ProfessorListComponent, ProfessorEditComponent, ProfessorProfileComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProfessorRoutingModule
  ]
})
export class ProfessorModule { }
