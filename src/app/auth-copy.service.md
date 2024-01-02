import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/identity/login', credentials);
  }

  // Other methods like register, getToken, etc.
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Add logic to check if the token is valid (not expired)
    // For simplicity, just checking if the token exists
    return token != null;
  }

  gotoLogin() {
    // window.location.href = 'http://localhost:5000/login';

  }
}
