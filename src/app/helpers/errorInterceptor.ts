import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
          }
          let error;
          if (typeof err.error != undefined) {
              error = err.error;
          } else {
              error = err.statusText || err.error;
          }
          return throwError(error);
      }));
  }
}