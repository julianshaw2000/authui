import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './auth.service';
// import { TokenService } from '../auth.service'; // Adjust the import path as needed

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the TokenService
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and set the new header in one step
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // Send the cloned request with the new header to the next handler
    return next.handle(authReq);
  }
}
