import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterState, StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot({routerState: RouterState.Minimal}),
    StoreModule.forFeature('routerReducer', routerReducer)
  ]
})
export class RouterStoreModule { }
