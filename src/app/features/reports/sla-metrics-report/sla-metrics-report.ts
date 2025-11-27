// sla-metrics-report.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

interface SLAMetrics {
  date: string;
  totalCalls: number;
  withinSLA: number;
  breachedSLA: number;
  slaCompliance: number;
  averageWaitTime: string;
  abandonedCalls: number;
  serviceLevel: number;
}

@Component({
  selector: 'app-sla-metrics-report',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './sla-metrics-report.html',
  styleUrls: ['./sla-metrics-report.scss'],
})
export class SLAMetricsReport implements OnInit {
  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate: Date = new Date();

  displayedColumns: string[] = [
    'date',
    'totalCalls',
    'withinSLA',
    'breachedSLA',
    'slaCompliance',
    'averageWaitTime',
    'abandonedCalls',
    'serviceLevel'
  ];

  slaMetrics: SLAMetrics[] = [];

  summary = {
    avgCompliance: 0,
    avgWaitTime: '0:00',
    avgServiceLevel: 0,
    totalAbandoned: 0,
    abandonRate: 0,
    totalWithinSLA: 0,
    totalBreached: 0,
    totalCalls: 0
  };

  ngOnInit() {
    this.generateReport();
  }

  generateReport() {
    this.slaMetrics = this.getMockSLAData();
    this.calculateSummary();
  }

  private getMockSLAData(): SLAMetrics[] {
    return [
      {
        date: '2025-11-20',
        totalCalls: 245,
        withinSLA: 223,
        breachedSLA: 22,
        slaCompliance: 91.0,
        averageWaitTime: '1:23',
        abandonedCalls: 12,
        serviceLevel: 89.2
      },
      {
        date: '2025-11-21',
        totalCalls: 289,
        withinSLA: 264,
        breachedSLA: 25,
        slaCompliance: 91.3,
        averageWaitTime: '1:18',
        abandonedCalls: 15,
        serviceLevel: 90.1
      },
      {
        date: '2025-11-22',
        totalCalls: 312,
        withinSLA: 291,
        breachedSLA: 21,
        slaCompliance: 93.3,
        averageWaitTime: '1:12',
        abandonedCalls: 9,
        serviceLevel: 92.5
      },
      {
        date: '2025-11-23',
        totalCalls: 198,
        withinSLA: 172,
        breachedSLA: 26,
        slaCompliance: 86.9,
        averageWaitTime: '1:45',
        abandonedCalls: 18,
        serviceLevel: 84.3
      },
      {
        date: '2025-11-24',
        totalCalls: 267,
        withinSLA: 246,
        breachedSLA: 21,
        slaCompliance: 92.1,
        averageWaitTime: '1:15',
        abandonedCalls: 11,
        serviceLevel: 90.8
      }
    ];
  }

  private calculateSummary() {
    const totalCalls = this.slaMetrics.reduce((sum, item) => sum + item.totalCalls, 0);
    const totalWithinSLA = this.slaMetrics.reduce((sum, item) => sum + item.withinSLA, 0);
    const totalBreached = this.slaMetrics.reduce((sum, item) => sum + item.breachedSLA, 0);
    const totalAbandoned = this.slaMetrics.reduce((sum, item) => sum + item.abandonedCalls, 0);

    this.summary.totalCalls = totalCalls;
    this.summary.totalWithinSLA = totalWithinSLA;
    this.summary.totalBreached = totalBreached;
    this.summary.totalAbandoned = totalAbandoned;
    this.summary.avgCompliance = Math.round(
      this.slaMetrics.reduce((sum, item) => sum + item.slaCompliance, 0) / this.slaMetrics.length
    );
    this.summary.avgServiceLevel = Math.round(
      this.slaMetrics.reduce((sum, item) => sum + item.serviceLevel, 0) / this.slaMetrics.length
    );
    this.summary.avgWaitTime = '1:21';
    this.summary.abandonRate = parseFloat(((totalAbandoned / totalCalls) * 100).toFixed(1));
  }

  getComplianceBarClass(value: number): string {
    if (value >= 90) return 'compliance-high';
    if (value >= 80) return 'compliance-medium';
    return 'compliance-low';
  }

  getComplianceTextClass(value: number): string {
    if (value >= 90) return 'text-green-600';
    if (value >= 80) return 'text-yellow-600';
    return 'text-red-600';
  }

  getWaitTimeClass(time: string): string {
    const minutes = parseInt(time.split(':')[0]);
    if (minutes < 2) return 'text-green-600 font-semibold';
    if (minutes < 3) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  }

  getServiceLevelClass(value: number): string {
    if (value >= 85) return 'text-green-600';
    if (value >= 75) return 'text-yellow-600';
    return 'text-red-600';
  }

  exportReport() {
    const csv = this.convertToCSV(this.slaMetrics);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sla-metrics-${new Date().toISOString()}.csv`;
    a.click();
  }

  private convertToCSV(data: SLAMetrics[]): string {
    const headers = this.displayedColumns.join(',');
    const rows = data.map(row =>
      `${row.date},${row.totalCalls},${row.withinSLA},${row.breachedSLA},${row.slaCompliance},${row.averageWaitTime},${row.abandonedCalls},${row.serviceLevel}`
    );
    return [headers, ...rows].join('\n');
  }
}