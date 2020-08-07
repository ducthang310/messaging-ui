import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from '../config.service';
import {
  AppJwtToken,
  LoginData,
  ResponseAuth
} from './interfaces';
import { TOKEN_NAME, USER_PERMISSION_NAME } from './constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private cfs: ConfigService,
  ) {
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or false
    let valid = false;

    try {
      valid = !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      valid = false;
    }

    return valid;
  }

  login(data: LoginData): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.cfs.getUrl(this.cfs.api.auth.login), data);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USER_PERMISSION_NAME);
  }

  storeTokensAndPermissions(res: ResponseAuth): void {
    this.setToken(res.data.access_token);
  }

  parseToken(): AppJwtToken {
    const token = this.getToken();
    const payload = this.jwtHelper.decodeToken(token);
    return payload as AppJwtToken;
  }

  getUserId(): number {
    const payload = this.parseToken();

    return payload.user_id;
  }

  getUserName(): string {
    const payload = this.parseToken();

    return payload.username;
  }
}
