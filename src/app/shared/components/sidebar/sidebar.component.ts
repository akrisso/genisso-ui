
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Channel {
  name: string;
  icon: string;
}

interface DirectMessage {
  name: string;
  online: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class SidebarComponent {

  constructor(private router: Router) {}

  readonly workspaceName = signal('GENISSO');
  readonly userName = signal('Arindam Biswas');

  readonly channels = signal<Channel[]>([
    { name: 'dashboard', icon: 'fa-solid fa-chart-line' },
    { name: 'calls', icon: 'fa-solid fa-phone' },
    { name: 'contacts', icon: 'fa-solid fa-address-book' },
    { name: 'reports', icon: 'fa-solid fa-file-invoice' },
    { name: 'settings', icon: 'fa-solid fa-gear' },
    { name: 'sla', icon: 'fa-solid fa-fingerprint' },
  ]);

  readonly directMessages = signal<DirectMessage[]>([
    { name: 'Aarav Sharma', online: true },
    { name: 'Priya Nair', online: false },
    { name: 'Rohan Mehta', online: true },
    { name: 'Ananya Iyer', online: false },
    { name: 'Karan Singh', online: true },
    { name: 'Sneha Patel', online: true },
    { name: 'Vikram Rao', online: false },
    { name: 'Neha Gupta', online: true }
  ]);

  readonly activeChannel = signal('dashboard');

  selectChannel(channelName: string) {
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
    console.log('Logout clicked');
    this.router.navigate(['/auth/login']);
  }
}
