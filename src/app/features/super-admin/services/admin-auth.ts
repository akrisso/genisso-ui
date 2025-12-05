import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { config, ConfigKeys } from '../config/config';

export interface SuperAdmin {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'super_admin';
}

export interface AuthResponse {
  data: {
    token: string;
    user: SuperAdmin;
    refreshToken: string;
    accessToken: string;
    expiresIn: number;
  };
  message: string;
  status: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuth {
  private readonly ADMIN_AUTH_URL = config[ConfigKeys.ADMIN_AUTH_URL]
  private API_URL = config[ConfigKeys.ADMIN_URL];
  private currentUserSubject: BehaviorSubject<SuperAdmin | null>;
  public currentUser$: Observable<SuperAdmin | null>;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<SuperAdmin | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user value
   */
  public get currentUserValue(): SuperAdmin | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  public get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Login user
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.ADMIN_AUTH_URL}`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response, credentials.rememberMe)),
        catchError(this.handleError)
      );
  }

  /**
   * Register new user
   */
  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');

    // Clear session storage
    sessionStorage.removeItem('authToken');

    // Clear timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    // Update subject
    this.currentUserSubject.next(null);

    // Navigate to login
    this.router.navigate(['/super/login']);
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Update user profile
   */
  updateProfile(userData: Partial<SuperAdmin>): Observable<SuperAdmin> {
    return this.http.patch<SuperAdmin>(`${this.API_URL}/profile`, userData)
      .pipe(
        tap(user => {
          this.updateStoredUser(user);
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Reset password request
   */
  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  /**
   * Reset password with token
   */
  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/reset-password`, {
      token,
      password: newPassword
    }).pipe(catchError(this.handleError));
  }

  /**
   * Verify email with token
   */
  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/verify-email`, { token })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle authentication response
   */
  private handleAuthResponse(response: AuthResponse, rememberMe: boolean = false): void {
    const { accessToken, refreshToken, user, expiresIn } = response.data;

    // Store tokens
    if (rememberMe) {
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    // Store user
    this.updateStoredUser(user);

    // Update subject
    this.currentUserSubject.next(user);

    // Set auto-logout timer
    this.setLogoutTimer(accessToken, expiresIn);
  }

  /**
   * Set automatic logout timer based on token expiration
   */
  private setLogoutTimer(token: string, expiresIn: number): void {
    try {
      const expiresInMs = expiresIn * 1000 - Date.now();

      if (expiresInMs > 0) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.refreshToken().subscribe({
            error: () => this.logout()
          });
        }, expiresInMs - 60000); // Refresh 1 minute before expiration
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }

  /**
   * Get stored user from localStorage
   */
  private getStoredUser(): SuperAdmin | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Update stored user in localStorage
   */
  private updateStoredUser(user: SuperAdmin): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    // Handle different error types
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      // Network error
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.status === 401) {
      errorMessage = error.error?.message || 'Invalid credentials';
    } else if (error.status === 404) {
      errorMessage = error.error?.message || 'Service not found';
    } else if (error.status >= 500) {
      errorMessage = error.error?.message || 'Server error. Please try again later.';
    } else {
      // Other server-side errors
      errorMessage = error.error?.message || error.message || errorMessage;
    }

    console.error('Auth error:', error);



    return throwError(() => new Error(errorMessage));
  }

}
