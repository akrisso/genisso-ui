
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminAuth } from '../../services/admin-auth';

interface Channel {
  name: string;
  icon: string;
}

interface DirectMessage {
  name: string;
  online: boolean;
}

@Component({
  selector: 'app-admin-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  providers: [SuperAdminAuth]
})
export class AdminSidebar {
  
  constructor(
    private router: Router,
    private authService: SuperAdminAuth) {
      this.getCurrentUser();
    }

  currentUserValue: any;
  readonly workspaceName = signal('GENISSO');
  readonly userName = signal('Admin User');
  
  getCurrentUser() {
    // this.currentUserValue.set(this.authService.currentUserValue?.name || 'Admin User');
  }

  readonly channels = signal<Channel[]>([
    { name: 'dashboard', icon: 'fa-solid fa-chart-line' },
    { name: 'organizations', icon: 'fa-solid fa-universal-access' },
    { name: 'calls', icon: 'fa-solid fa-phone' },
    { name: 'contacts', icon: 'fa-solid fa-address-book' },
    { name: 'reports', icon: 'fa-solid fa-file-invoice' },
    { name: 'settings', icon: 'fa-solid fa-gear' },
    { name: 'sla', icon: 'fa-solid fa-fingerprint' },
  ]);

  readonly activeChannel = signal('dashboard');

  selectChannel(channelName: string) {
    if(channelName === 'organizations') { 
      this.activeChannel.set('organizations');
      this.router.navigate([`super/admin/organizations`]);
      return;
    }

    if (channelName === 'sla') {
      channelName = 'sla';
      this.activeChannel.set('sla');
      this.router.navigate([`reports/sla-metrics`]);
    } else if (channelName === 'reports') {
      channelName = 'reports';
      this.activeChannel.set('reports');
      this.router.navigate([`reports/call-analytics`]);
    } else {
      this.activeChannel.set(channelName);
      this.router.navigate([`/${channelName}`]);
    }
    
  }

  logout() {
    // Implement logout logic here
    this.authService.logout();
    console.log('Logout clicked');
    this.router.navigate(['/super/login']);
  }
}
