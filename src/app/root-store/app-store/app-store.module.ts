import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('appReducers', appReducers),
    EffectsModule.forFeature([AppEffects]),
  ]
})
export class AppStoreModule { }

