import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaculdadeRoutingModule } from './faculdade-routing.module';
import { FaculdadeListComponent } from './faculdade-list/faculdade-list.component';
import { FaculdadeEditComponent } from './faculdade-edit/faculdade-edit.component';
import { ReactiveFormsModule } from '@Angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [FaculdadeListComponent, FaculdadeEditComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    FaculdadeRoutingModule
  ]
})
export class FaculdadeModule { }
