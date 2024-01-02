import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authToken: string | null = null;

  constructor() { }

  // Function to set the token, usually called after successful login
  setAuthorizationToken(token: string): void {
    this.authToken = token;
    // You might want to store the token in localStorage or sessionStorage as well
    localStorage.setItem('authToken', token);
  }

  // Function to get the token
  getAuthorizationToken(): string {
    // If the token is in memory, use it; otherwise, try to get it from storage
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken') || '';
    }
    return this.authToken;
  }

  // Function to clear the token, usually called on logout
  clearAuthorizationToken(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  // Function to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAuthorizationToken();
  }
}
