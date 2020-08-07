import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { TOKEN_NAME } from './core/constants';
import { AppComponent } from './app.component';
import { IndexComponent } from './app-components/layout/index/index.component';
import { AppErrorHandler } from './core/app.error-handler';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthGuard } from './core/auth/auth.guard';
import { HeaderComponent } from './app-components/layout/header/header.component';
import { FooterComponent } from './app-components/layout/footer/footer.component';
import { UiModule } from './shared/ui/ui.module';

@NgModule({
  declarations: [
    AppComponent, IndexComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule, // required animations module
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(TOKEN_NAME);
        }
      }
    }),
    UiModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard, AuthInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
