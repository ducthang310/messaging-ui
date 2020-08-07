import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  ModalConfirmComponent, LoadingComponent, LogoComponent
];

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class UiModule { }
