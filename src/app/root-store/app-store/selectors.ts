import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { LoggedUserState, State } from './state';

export const getAppState: MemoizedSelector<object, State> = createFeatureSelector<State>('appReducers');

export const getAuthenticationStatus = createSelector(
  getAppState,
  (state: State) => {
    return state && state.isAuthenticated;
  }
);

export const getLoggedUser = createSelector(
  getAppState,
  (state: State) => state.loggedUser
);

export const getProfileOfLoggedUser = createSelector(
  getAppState,
  (state: State) => {
    if (state && state.loggedUser && state.loggedUser.profile) {
      return state.loggedUser.profile;
    } else {
      return null;
    }
  }
);

const getProfileLoadingState = (state: LoggedUserState) => state.loadingProfile;
const getProfileLoadedState = (state: LoggedUserState) => state.loadedProfile;

export const getProfileLoaded = createSelector(
  getLoggedUser,
  getProfileLoadedState
);

export const getProfileLoading = createSelector(
  getLoggedUser,
  getProfileLoadingState
);

export const getDeviceMode = createSelector(
  getAppState,
  (state: State) => state.deviceMode
);
