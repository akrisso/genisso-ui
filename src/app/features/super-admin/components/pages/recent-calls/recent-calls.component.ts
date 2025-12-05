
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Call {
  id: number;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration: string;
}

@Component({
  selector: 'app-admin-recent-calls',
  templateUrl: './recent-calls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRecentCallsComponent {
  readonly calls = signal<Call[]>([
    { id: 1, name: 'Aarav Sharma', number: '+91 981****67', type: 'incoming', time: '10:45 AM', duration: '5m 12s' },
{ id: 2, name: 'Priya Nair', number: '+91 982****43', type: 'missed', time: '10:30 AM', duration: '0m 0s' },
{ id: 3, name: 'Internal Transfer', number: 'ext. 203', type: 'outgoing', time: '10:22 AM', duration: '12m 3s' },
{ id: 4, name: 'Rohan Mehta', number: '+91 983****78', type: 'incoming', time: '9:58 AM', duration: '2m 45s' },
{ id: 5, name: 'Support Inquiry', number: '+91 984****32', type: 'incoming', time: '9:41 AM', duration: '8m 30s' },
{ id: 6, name: 'Sneha Patel', number: '+91 985****89', type: 'outgoing', time: '9:30 AM', duration: '1m 15s' },
{ id: 7, name: 'Aarav Sharma', number: '+91 981****67', type: 'incoming', time: '10:45 AM', duration: '5m 12s' },
  ]);

  getCallIcon(type: Call['type']): string {
    switch (type) {
      case 'incoming': return 'fa-arrow-down-long text-green-500';
      case 'outgoing': return 'fa-arrow-up-long text-blue-500';
      case 'missed': return 'fa-phone-slash text-red-500';
      default: return '';
    }
  }
}
