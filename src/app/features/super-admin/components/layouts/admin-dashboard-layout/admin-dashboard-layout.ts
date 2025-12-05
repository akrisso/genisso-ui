import { Component } from '@angular/core';
import { AppRoutingModule } from "../../../../../app.routes";
import { AdminSidebar } from '../../sidebar/sidebar';
import { Router, RouterModule } from '@angular/router';
import { AdminHeader } from '../../pages/admin-header/admin-header';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [
    RouterModule,
    AdminSidebar,
    AdminHeader
  ],
  templateUrl: './admin-dashboard-layout.html',
  styleUrl: './admin-dashboard-layout.scss',
})
export class AdminDashboardLayout {
  constructor() {
    console.log('Admin Dashboard Layout Loaded');
  }
}
