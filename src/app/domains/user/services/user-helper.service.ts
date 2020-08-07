import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {

  constructor(
  ) { }

  isProvider(user: UserInterface): boolean {
    return !!user.is_provider;
  }

  getNameAndAddress(user: UserInterface): string {
    const temp = [];
    if (user && user.user_information) {
      temp.push(user.user_information.first_name);
      if (user.user_information.short_address) {
        temp.push(user.user_information.short_address);
      }
    }
    return temp.join(', ');
  }
}
