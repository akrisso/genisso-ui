import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { AdminDashboardLayout } from './components/layouts/admin-dashboard-layout/admin-dashboard-layout';
import { AdminDashboard } from './components/pages/dashboard/dashboard';
import { AdminAuthGuard } from './guards/admin-auth-guard';
import { OrganizationMain } from './components/pages/organizations/organization-main/organization-main';

const superAdminRoutes: Routes = [
  {
    path: '',
    // canActivate: [GuestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot-password', component: ForgotPassword },
      
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    data: { roles: ['super_admin'] },
    component: AdminDashboardLayout,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path : 'organizations', component: OrganizationMain },
      { path: 'landing', component: AdminDashboard }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(superAdminRoutes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
