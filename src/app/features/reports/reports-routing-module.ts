import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallAnalyticsReport } from './call-analytics-report/call-analytics-report';
import { AgentPerformanceReport } from './agent-performance-report/agent-performance-report';
import { CallQualityReport } from './call-quality-report/call-quality-report';
import { SLAMetricsReport } from './sla-metrics-report/sla-metrics-report';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    children: [
       { path: '', redirectTo: 'call-analytics', pathMatch: 'full' },
      {
        path: 'call-analytics',
        component: CallAnalyticsReport,
        title: 'Call Analytics Report'
      },
      {
        path: 'agent-performance',
        component: AgentPerformanceReport,
        title: 'Agent Performance Report'
      },
      {
        path: 'call-quality',
        component: CallQualityReport,
        title: 'Call Quality Report'
      },
      {
        path: 'sla-metrics',
        component: SLAMetricsReport,
        title: 'SLA Metrics Report'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(REPORTS_ROUTES)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
