import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing-module';
import { MaterialModule } from '../../shared/material.module';
import { AdminDashboardLayout } from './components/layouts/admin-dashboard-layout/admin-dashboard-layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MaterialModule,
    AdminDashboardLayout
  ]
})
export class SuperAdminModule { }
