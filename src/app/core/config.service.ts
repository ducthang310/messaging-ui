import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public baseApiUrl = '';
  public api = {
    auth: {
      login: '/auth/login'
    },
  };

  constructor() {
    this.baseApiUrl = environment.baseApiUrl;
  }

  getUrl(url: string, params?: object, version?: string | boolean): string {
    if (params) {
      Object.keys(params).forEach((key) => {
        url = url.replace(':' + key, params[key]);
      });
    }

    if (version === false) {
      return this.baseApiUrl + url;
    }

    version = version ? version : 'v1';

    return this.baseApiUrl + '/' + version  + url;
  }
}
