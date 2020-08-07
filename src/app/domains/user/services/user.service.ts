import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ResponseUser, ResponseUserSummary } from '../models/response.interface';
import {ConfigService} from '../../../core/config.service';
import {delay} from 'rxjs/operators';
import {FakerService} from '../../../core/auth/faker.service';
import {AuthService} from '../../../core/auth/auth.service';
import {ResponseAuth} from '../../auth/auth.interface';
import {RequestParamsToProfile, RequestParamsToRegister} from '../models/request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private cfs: ConfigService,
    private faker: FakerService,
    private authService: AuthService
  ) {
  }

  getLoggedUserInformation(): Observable<ResponseUser> {
    if (environment.mockData) {
      const userId = Number(this.authService.getUserId());
      const user = this.faker.getUserById(userId);
      return of({data: user}).pipe(delay(696));
    } else {
      return this.http.get<ResponseUser>(this.cfs.getUrl(this.cfs.api.user.me));
    }

  }

  getUserGeolocation(): Observable<any> {
    if (navigator.geolocation) {
      return new Observable((observer) => {
        let watchId: number;

        // Simple geolocation API check provides values to publish
        if ('geolocation' in navigator) {
          watchId = navigator.geolocation.watchPosition((position: Position) => {
            observer.next(position);
            observer.unsubscribe();
          }, (error: PositionError) => {
            observer.error(error);
          });
        } else {
          observer.error('Geolocation not available');
        }

        // When the consumer unsubscribes, clean up data ready for next subscription.
        return {
          unsubscribe() {
            navigator.geolocation.clearWatch(watchId);
          }
        };
      });
    } else {
      return throwError({message: 'Geolocation is not supported by this browser.'});
    }
  }

  register(data: RequestParamsToRegister): Observable<ResponseAuth> {
    if (environment.mockData) {
      const existedUser = this.faker.getUserByEmail(data.email);
      if (existedUser) {
        return throwError({message: 'The email address is already registered'}).pipe(delay(696));
      }

      const newUser = this.faker.addUser(data);
      const token = this.faker.createJwtTokenByUserData(newUser);
      const responseData = {
        data: {
          refresh_token: token,
          access_token: token,
          token_type: 'Bearer',
          expires_in: 36000
        },
        message: 'Registered successfully'
      };
      return of(responseData).pipe(delay(696));
    } else {
      return this.http.post<ResponseAuth>(this.cfs.getUrl(this.cfs.api.user.register), data);
    }

  }

  update(data: RequestParamsToProfile): Observable<any> {
    return this.http.patch<any>(this.cfs.getUrl(this.cfs.api.user.update), data);
    if (environment.mockData) {
      const responseData = {
        data: {},
        message: 'Registered successfully'
      };
      return of(responseData).pipe(delay(696));
    } else {
      return this.http.post<any>(this.cfs.getUrl(this.cfs.api.user.update), data);
    }

  }

  getUserData(params): Observable<ResponseUser> {
    const userId = Number(this.authService.getUserId());
    if (environment.mockData) {
      const user = this.faker.getUserById(userId);
      return of({data: user}).pipe(delay(696));
    } else {
      return this.http.get<ResponseUser>(this.cfs.getUrl(this.cfs.api.user.find, {id: userId}), {params} as object);
    }
  }

  uploadAvatar(data: FormData): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(this.cfs.getUrl(this.cfs.api.user.uploadAvatar), data);
  }

  getSummary(): Observable<ResponseUserSummary> {
    if (environment.mockData) {
      const data = {
        bookings: 15,
        availability: 40,
        earnings: 1200,
        potential_earnings_this_month: 4000
      };
      return of({data}).pipe(delay(696));
    } else {
      return this.http.get<ResponseUserSummary>(this.cfs.getUrl(this.cfs.api.user.summary));
    }
  }
}
