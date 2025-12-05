
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminMetricCardComponent } from '../metric-card/metric-card.component';
import { AdminRecentCallsComponent} from '../recent-calls/recent-calls.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdminMetricCardComponent,  
    AdminRecentCallsComponent
  ]
})
export class AdminDashboard {
  constructor() {
  }
}
