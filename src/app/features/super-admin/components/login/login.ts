import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginCredentials, SuperAdminAuth } from '../../services/admin-auth';
import { BehaviorSubject } from 'rxjs';

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
  providers: [SuperAdminAuth],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login  {
  email: string = 'subramanya@akrisso.com';
  password: string = 'StrongPassword@0';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  private loginErrorSubject = new BehaviorSubject<{isError: boolean; message: string}>({isError: false, message: ''});
  loginError$ = this.loginErrorSubject.asObservable();
  loginError: string = '';
  isLoginError: boolean = false;
  isLoading: boolean = false; 

  constructor(
    private router: Router, 
    private snackBar: MatSnackBar, 
    private authService: SuperAdminAuth 
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    console.log('Form submitted', { email: this.email, password: this.password });
    
    if (this.email && this.password) {
      console.log('Credentials are valid, attempting login...');
      
      this.isLoading = true;
      this.isLoginError = false;
      
      const loginCredentials: LoginCredentials = {
        email: this.email,  
        password: this.password,
        rememberMe: this.rememberMe
      };

      console.log('Calling authService.login...');
      
      this.authService.login(loginCredentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.isLoading = false;
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.isLoginError = false;
          this.loginError = '';
          this.router.navigateByUrl('/super/admin/landing');
        },
        error: (err) => { 
          console.log('Login error occurred', err);
          this.isLoading = false;
          this.isLoginError = true;
          this.loginError = err.error?.message || err || 'Unknown error';
          console.log('Setting snackbar with error:', this.loginError);
          this.snackBar.open(`Login failed: ${this.loginError}`, 'Close', { duration: 5000 });
        },
        complete: () => {
          console.log('Login observable completed');
          this.isLoading = false;
        }
      });
    } else {
      console.log('Form invalid - missing email or password');
      this.snackBar.open('Please enter both email and password', 'Close', { duration: 3000 });
    }
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page
    // Example: this.router.navigate(['/forgot-password'])
  }

}