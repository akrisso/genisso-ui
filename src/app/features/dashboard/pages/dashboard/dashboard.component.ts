
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { MetricCardComponent } from '../metric-card/metric-card.component';
import { RecentCallsComponent } from '../recent-calls/recent-calls.component';
import { AiAssistantComponent } from '../ai-assistant/ai-assistant.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardHeaderComponent,
    MetricCardComponent,
    RecentCallsComponent,
    AiAssistantComponent
  ]
})
export class DashboardComponent {}
