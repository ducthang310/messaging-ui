import { Action } from '@ngrx/store';
import { DeviceMode } from '../../shared/interfaces/common.interface';

export enum AppActionTypes {
  SET_AUTHENTICATION_STATUS = '[App] Set authentication status',
  LOAD_LOGGED_USER_PROFILE = '[User] Load Logged User Profile',
  LOAD_LOGGED_USER_PROFILE_FAIL = '[User] Load Logged User Profile Fail',
  LOAD_LOGGED_USER_PROFILE_SUCCESS = '[User] Load Logged User Profile Success',
  LOG_OUT = '[App] Log out',

  SET_DEVICE_MODE = '[App] Set device mode',
}

export class SetAuthenticationStatus implements Action {
  readonly type = AppActionTypes.SET_AUTHENTICATION_STATUS;

  constructor(public payload: boolean) {
  }
}

export class LoadLoggedUserProfile implements Action {
  readonly type = AppActionTypes.LOAD_LOGGED_USER_PROFILE;
}

export class LoadLoggedUserProfileFail implements Action {
  readonly type = AppActionTypes.LOAD_LOGGED_USER_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadLoggedUserProfileSuccess implements Action {
  readonly type = AppActionTypes.LOAD_LOGGED_USER_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LogOut implements Action {
  readonly type = AppActionTypes.LOG_OUT;

  constructor(public payload: any) {
  }
}

export class SetDeviceMode implements Action {
  readonly type = AppActionTypes.SET_DEVICE_MODE;

  constructor(public payload: DeviceMode) {
  }
}

// action types
export type AppActions =
  | SetAuthenticationStatus
  | LoadLoggedUserProfile
  | LoadLoggedUserProfileFail
  | LoadLoggedUserProfileSuccess
  | LogOut
  | SetDeviceMode
  ;
