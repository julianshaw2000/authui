import { Component } from '@angular/core';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';
// import { IdentityService } from './api.service'; // Adjust the import path as needed

@Component({
  selector: 'app-auth',
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input type="email" [(ngModel)]="loginData.email" name="email" placeholder="Email">

       <input type="password" [(ngModel)]="loginData.password" name="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>

    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <input type="email" [(ngModel)]="registerData.email" name="email" placeholder="Email">
       <input type="password" [(ngModel)]="registerData.password" name="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
  `
})
export class AuthComponent {
  loginData = { email: '', password: '' };
  registerData = { email: '', password: '' };

  constructor(private identityService: IdentityService, private router: Router) { }

  login(): void {
    this.identityService.login(this.loginData).subscribe(
      response => {
        console.log('Login successful', response);
        // Handle successful login, like redirecting to a dashboard
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        // Handle login error
      }
    );
  }

  register(): void {
    this.identityService.register(this.registerData).subscribe(
      response => {
        console.log('Registration successful', response);
        // Handle successful registration
      },
      error => {
        console.error('Registration failed', error);
        // Handle registration error
      }
    );
  }
}
