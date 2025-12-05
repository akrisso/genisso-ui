import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SuperAdminAuth } from '../services/admin-auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: SuperAdminAuth,
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
        return this.router.createUrlTree(['/super/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }
}


