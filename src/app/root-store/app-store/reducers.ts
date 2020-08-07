import { AppActions, AppActionTypes } from './actions';
import { State, initialLoggedUserState, initialState, LoggedUserState } from './state';


export const appReducers = (
  state = initialState,
  action: AppActions
): State => {
  switch (action.type) {
    case AppActionTypes.SET_AUTHENTICATION_STATUS: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }

    case AppActionTypes.LOAD_LOGGED_USER_PROFILE: {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          loadingProfile: true
        },
      };
    }

    case AppActionTypes.LOAD_LOGGED_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          profile: action.payload,
          loadingProfile: false,
          loadedProfile: true
        },
      };
    }

    case AppActionTypes.LOAD_LOGGED_USER_PROFILE_FAIL: {
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          loadingProfile: false,
          loadedProfile: true
        },
      };
    }

    case AppActionTypes.SET_DEVICE_MODE: {
      return {
        ...state,
        deviceMode: action.payload
      };
    }

    case AppActionTypes.LOG_OUT: {
      state.loggedUser = initialLoggedUserState;
      return {
        ...state
      };
    }
  }

  return state;
};
