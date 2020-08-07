import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface FieldErrors {
  [key: string]: string[];
}

interface ErrorData {
  data: FieldErrors;
  message: string;
  success: boolean;
}

interface ReadableErrorMessage {
  title: string;
  details: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ResponseHelperService {
  constructor(
    private toast: ToastrService) {
  }

  getErrorMessages(errorResponse: HttpErrorResponse, resource?: string): ReadableErrorMessage {
    let errors: ReadableErrorMessage;

    errors = this.parseErrorMessageFromResponse(errorResponse);

    if (!errors.title && (!errors.details || !errors.details.length)) {
      errors.title = errorResponse.message;
    }

    return errors;
  }

  parseErrorMessageFromResponse(errorResponse: HttpErrorResponse, resource?: string): ReadableErrorMessage {
    const details: string[] = [];
    let title: string;

    try {
      if (errorResponse.error) {
        const errorObject: ErrorData = errorResponse.error;
        title = errorObject.message ? errorObject.message : `${resource}: ${errorResponse.statusText}`;

        if (errorObject.data) {
          try {
            for (const [key, texts] of Object.entries(errorObject.data)) {
              if (Array.isArray(texts)) {
                texts.map(txt => {
                  details.push(key + ': ' + txt);
                });
              }
            }
          } catch (e) {
            //
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return {title, details};
  }

  showErrorMessages(errorResponse: HttpErrorResponse, resource?: string): void {
    const errors = this.getErrorMessages(errorResponse, resource);
    if (!errors.details || !errors.details.length) {
      this.toast.error(errors.title);
    } else {
      const txt = errors.details.join('<br>');
      this.toast.error(txt, errors.title, {enableHtml: true});
    }
  }
}
