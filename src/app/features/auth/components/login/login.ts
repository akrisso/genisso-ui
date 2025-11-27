import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login  {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(private router: Router, private snackBar: MatSnackBar, private authService: Auth) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.email && this.password && this.email === 'arindam@akrisso.com' && this.password === 'Password123') {

        this.router .navigate(['/dashboard']);
      console.log('Login submitted:', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
      // TODO: Implement your authentication logic here
      // Example: this.authService.login(this.email, this.password, this.rememberMe)
    }
  }

  onSocialLogin(provider: string): void {
    console.log(`${provider} login clicked`);
    // TODO: Implement social login logic
    // Example: this.authService.socialLogin(provider)
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page
    // Example: this.router.navigate(['/forgot-password'])
  }

  onSignUp(): void {
    console.log('Sign up clicked');
    // TODO: Navigate to sign up page
    // Example: this.router.navigate(['/signup'])
  }
}