import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as _ from 'lodash';
import { loginService } from '../services/login.service';
import { environment } from '../../environments/environment';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  apiUrl = environment.apiUrl;

  constructor(
    public inj: Injector,
    private router: Router,
    private loginServe: loginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginServe.getAuthToken();
    // Clone the request to add the new header.
    if (authToken) {
      req = req.clone({
        setHeaders: {
          'x-access-token': authToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: any, caught: any) => {
        this.handleAuthError(error);
        return throwError(error);
      }) as any
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      if (err.url !== this.apiUrl + "/auth/login") {
        this.router.navigate([`login`]);
      }
      // navigate/delete cookies or whatever
      /* if you've caught / handled the error, you don't want to rethrow
      it unless you also want downstream consumers to have to handle it as well.*/
      return throwError(err.message);
    }
    return throwError(err);
  }
}
