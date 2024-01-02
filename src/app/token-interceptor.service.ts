import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.endsWith('/login') || req.url.endsWith('/register')) {
      console.log('Bypassing interceptor for login and register requests');
      // console.log(req);
      // If it's a login or register request, bypass the interceptor logic
      return next.handle(req);
    }
    let token = this.tokenService.getAuthorizationToken();
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log('Tokenized request:' + tokenizedRequest);
    return next.handle(tokenizedRequest);
  }
}
