import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  // private apiBaseUrl = 'http://localhost:5127/api';
  private apiBaseUrl = 'https://localhost:7108';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTest(): Observable<any> {
    return this.http.get<string>(this.apiBaseUrl);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    console.log('credentials', credentials);
    return this.http.post<any>(`${this.apiBaseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Update this line according to the actual structure of your response
          const authToken = response.accessToken || response.data?.accessToken;
          if (authToken) {
            // console.log('authToken', authToken);
            this.tokenService.setAuthorizationToken(authToken);
          } else {

            console.log('authToken', 'not found >>');
            // Handle the absence of a token, maybe throw an error or log it
          }
        }),
        catchError(error => { // Handle the error response
          console.error(error);
          return (error);
        })
      );
  }


  register(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/register`, data);
  }

  logout(): void {
    this.tokenService.clearAuthorizationToken();
    // Handle other logout logic like navigating to the login page
  }
}
