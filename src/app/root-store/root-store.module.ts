import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { AppStoreModule } from './app-store';
import { RouterStoreModule } from './router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

/**
 * Ngrx-localStorage
 * Want to store State of other Modules in localstorage (app-store, route-store,...)
 * just need to add its reducerKey to the array: keys: ['bookingReducers', 'appReducers']
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: [], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    CommonModule,

    AppStoreModule,
    RouterStoreModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([])
  ],
  declarations: []
})
export class RootStoreModule {
}
