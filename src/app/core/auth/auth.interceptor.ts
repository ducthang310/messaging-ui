import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/browser';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + accessToken)
      });

      return next.handle(cloned).pipe(tap(() => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/login']);
          }
          this.log(req);
        }, () => {
          this.log(req);
        }
      ));
    } else {
      return next.handle(req);
    }
  }

  log(req: HttpRequest<any>): void {
    try {
      if (-1 < ['PATCH', 'PUT', 'POST', 'DELETE'].indexOf(req.method)) {
        const data = {
          env: environment.name,
          userId: this.authService.getUserId(), userName: this.authService.getUserName(),
        };
        Sentry.captureMessage(JSON.stringify(data), Severity.Info);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
