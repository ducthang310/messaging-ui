import { Component, ViewChild } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-auth-logout',
  template: '',
  styleUrls: []
})
export class LogoutComponent {
  email: string;
  password: string;
  submitted: boolean;
  loading: boolean;

  @ViewChild('mainForm') mainForm: AbstractControlDirective;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
