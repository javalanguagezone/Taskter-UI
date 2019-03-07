import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;

    if (this.authService.isLoggedIn()) {
      const token = this.authService.getAuthorizationHeaderValue();
      requestToForward = req.clone({ setHeaders: { Authorization: token } });
    }

    return next.handle(requestToForward);
  }
}
