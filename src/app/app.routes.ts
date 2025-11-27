// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { PublicLayout } from './features/web/layouts/public-layout/public-layout';
import { DashboardLayout } from './features/dashboard/layouts/dashboard-layout/dashboard-layout';

// Guards
// import { AuthGuard } from './core/guards/auth.guard';
// import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public web routes
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/web/web.module').then(m => m.WebModule)
      }
    ]
  },

  // Authentication routes
  {
    path: 'auth',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
      }
    ]
  },

  // Protected application routes
  {
    path: '',
    component: DashboardLayout,
    // canActivate: [AuthGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
      },

      // Contacts
    //   {
    //     path: 'contacts',
    //     loadChildren: () => import('./features/contacts/contacts-module').then(m => m.ContactsModule)
    //   },

      // Calls
    //   {
    //     path: 'calls',
    //     loadChildren: () => import('./features/calls/calls-module').then(m => m.CallsModule)
    //   },

      // Messages
    //   {
    //     path: 'messages',
    //     loadChildren: () => import('./modules/messages/messages.module').then(m => m.MessagesModule)
    //   },

      // Analytics
    //   {
    //     path: 'analytics',
    //     loadChildren: () => import('./modules/analytics/analytics.module').then(m => m.AnalyticsModule),
    //     // canActivate: [RoleGuard],
    //     data: { roles: ['admin', 'manager'] }
    //   },

      // Settings
    //   {
    //     path: 'settings',
    //     loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    //   },
    {
      path: 'reports',
      loadChildren: () => import('./features/reports/reports-module').then(m => m.ReportsModule)
    },

      // Redirect empty path to dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // 404 Not Found
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    enableTracing: false, // Set to true for debugging
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }