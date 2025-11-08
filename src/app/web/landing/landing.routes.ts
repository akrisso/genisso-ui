// landing.routes.ts
import { Routes } from '@angular/router';
import { Landing } from './landing';

export const landingRoutes: Routes = [
  {
    path: '',
    // component: Landing
    loadComponent: () => import('./landing').then(c => c.Landing)
  }
];