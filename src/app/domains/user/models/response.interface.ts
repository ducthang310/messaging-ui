import { UserInterface } from './user.interface';
import { APIResponse } from '../../../shared/interfaces/response.interface';

export interface ResponseUser extends APIResponse {
  data: UserInterface;
}
