import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@Angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { FaculdadeEditComponent, FaculdadeListComponent } from './faculdade';

@NgModule({
  declarations: [SystemComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    SystemRoutingModule
  ],
  exports: [SystemComponent]
})
export class SystemModule { }
