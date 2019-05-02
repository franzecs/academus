import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@Angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MenuComponent } from './menu/menu.component';
import { LowerDirective } from './directives/lowercase.directive';
import { UpperDirective } from './directives/uppercase.directive';
import { ModalMessage } from './modal-util/modal-message.component';
import { MyPipe } from './pipes/upperCase.pipes';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { IkMaskDirective } from './directives/ik-mask.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadComponent } from './upload/upload.component';
import { DiaSemana } from './pipes/diaSemana.pipes';
import { Mes } from './pipes/mes.pipes';
import { IkInputGroupComponent } from './ik-input-group/ik-input-group.component';
import { FaculdadeSigla } from './pipes/faculdade.pipe';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CustomModal } from './modal-util/custom-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [],
  declarations: [LoadingSpinnerComponent, MenuComponent, UploadComponent, DiaSemana, Mes,
                 LowerDirective, UpperDirective, ModalMessage, MyPipe, FaculdadeSigla,
                 CheckboxGroupComponent, IkMaskDirective, PaginationComponent, IkInputGroupComponent,
                  ProgressBarComponent, CustomModal],
  exports: [LoadingSpinnerComponent, MenuComponent, FormsModule, CheckboxGroupComponent, DiaSemana, Mes,
              PaginationComponent, UploadComponent, LowerDirective, UpperDirective, FaculdadeSigla,
              ModalMessage, MyPipe, IkMaskDirective, IkInputGroupComponent, ProgressBarComponent, CustomModal],
})
export class ComponentsModule { }
