import { DeviceMode } from '../../shared/interfaces/common.interface';
import { UserInterface } from '../../domains/user/models/user.interface';

export interface State {
  isAuthenticated?: boolean;
  loggedUser: LoggedUserState;
  deviceMode: DeviceMode;
}

export interface LoggedUserState {
  profile: UserInterface;
  loadedProfile: boolean;
  loadingProfile: boolean;
}

export const initialLoggedUserState: LoggedUserState = {
  profile: null,
  loadedProfile: false,
  loadingProfile: false,
};

export const initialState: State = {
  isAuthenticated: null,
  loggedUser: initialLoggedUserState,
  deviceMode: DeviceMode.desktop
};
