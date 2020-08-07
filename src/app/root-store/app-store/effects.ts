import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import * as appActions from './actions';
import { Store } from '@ngrx/store';
import { UserService } from '../../domains/user/services/user.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private userService: UserService,
  ) {
  }

  @Effect()
  loadProfileOfLoggedUser$ = this.actions$
    .pipe(
      ofType(appActions.AppActionTypes.LOAD_LOGGED_USER_PROFILE),
      mergeMap(() => {
        return this.userService.getLoggedUserInformation()
          .pipe(
            map(res => {
                return new appActions.LoadLoggedUserProfileSuccess(res.data);
              }
            ),
            catchError(error => of(new appActions.LoadLoggedUserProfileFail(error)))
          );
      })
    );
}
