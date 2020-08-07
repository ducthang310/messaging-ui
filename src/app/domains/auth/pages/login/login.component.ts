import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControlDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseHelperService } from '../../../../shared/helpers/response-helper.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted: boolean;
  loading: boolean;

  @ViewChild('mainForm') mainForm: AbstractControlDirective;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private responseHelper: ResponseHelperService
  ) { }

  login(): void {
    this.submitted = true;
    if (this.mainForm.invalid) {
      this.toastr.error('Please check required fields.');
      return;
    }

    this.loading = true;
    this.authService.login({
      email: this.email,
      password: this.password
    })
      .subscribe(res => {
        this.authService.storeTokensAndPermissions(res);
        this.router.navigate(['/']);
      }, errorResponse => {
        this.responseHelper.showErrorMessages(errorResponse);
        this.loading = false;
      }, () => {
        this.loading = false;
      });

  }

  checkInputError(input: AbstractControlDirective): boolean {
    return input.invalid && (input.dirty || input.touched || this.submitted);
  }

  ngOnInit(): void {
  }

}
