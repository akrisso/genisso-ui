import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user && this.authService.isAuthenticated;
        
        if (isAuthenticated) {
          // Check for role-based access if specified in route data
          const requiredRoles = route.data['roles'] as Array<string> | undefined;
          
          if (requiredRoles && user) {
            const hasRequiredRole = requiredRoles.includes(user.role);
            
            if (!hasRequiredRole) {
              // User doesn't have required role, redirect to unauthorized page
              return this.router.createUrlTree(['/unauthorized']);
            }
          }
          
          return true;
        }
        
        // Not authenticated, redirect to login with return URL
        return this.router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }
}

/**
 * Role Guard - Protects routes based on user roles
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as Array<string>;
    
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/auth/login']);
        }
        
        if (requiredRoles && !requiredRoles.includes(user.role)) {
          return this.router.createUrlTree(['/unauthorized']);
        }
        
        return true;
      })
    );
  }
}

/**
 * Guest Guard - Prevents authenticated users from accessing auth pages
 */
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && this.authService.isAuthenticated) {
          // User is already authenticated, redirect to dashboard
          return this.router.createUrlTree(['/dashboard']);
        }
        
        return true;
      })
    );
  }
}