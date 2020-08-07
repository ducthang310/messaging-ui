import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as Sentry from '@sentry/browser';
import { environment } from '../../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: Error | HttpErrorResponse): void {
    console.log(error);
    if (environment.sentryDns) {
      // Send error to Sentry
      Sentry.captureException(error);
    }

    throw error;
  }
}
