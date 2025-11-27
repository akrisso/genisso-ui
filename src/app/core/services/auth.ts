import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  currentUser$: Observable<any> = of(null); // Placeholder for user observable
  isAuthenticated = false; // Placeholder for authentication status
}
