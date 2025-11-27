import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

interface CallAnalytics {
  date: string;
  totalCalls: number;
  inboundCalls: number;
  outboundCalls: number;
  missedCalls: number;
  averageDuration: string;
  totalDuration: string;
  answerRate: number;
}

@Component({
  selector: 'app-call-analytics-report',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './call-analytics-report.html',
  styleUrl: './call-analytics-report.scss',
})
export class CallAnalyticsReport {
  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate: Date = new Date();
  reportType: string = 'daily';

  displayedColumns: string[] = [
    'date',
    'totalCalls',
    'inboundCalls',
    'outboundCalls',
    'missedCalls',
    'averageDuration',
    'totalDuration',
    'answerRate'
  ];

  analyticsData: CallAnalytics[] = [];

  summary = {
    totalCalls: 0,
    answered: 0,
    missed: 0,
    avgDuration: '0:00'
  };

  ngOnInit() {
    this.generateReport();
  }

  generateReport() {
    // Mock service call
    this.analyticsData = this.getMockAnalyticsData();
    this.calculateSummary();
  }

  private getMockAnalyticsData(): CallAnalytics[] {
    return [
      {
        date: '2025-11-20',
        totalCalls: 245,
        inboundCalls: 156,
        outboundCalls: 89,
        missedCalls: 23,
        averageDuration: '4:32',
        totalDuration: '18h 32m',
        answerRate: 90.6
      },
      {
        date: '2025-11-21',
        totalCalls: 289,
        inboundCalls: 178,
        outboundCalls: 111,
        missedCalls: 31,
        averageDuration: '5:18',
        totalDuration: '25h 31m',
        answerRate: 89.3
      },
      {
        date: '2025-11-22',
        totalCalls: 312,
        inboundCalls: 201,
        outboundCalls: 111,
        missedCalls: 19,
        averageDuration: '4:45',
        totalDuration: '24h 42m',
        answerRate: 93.9
      },
      {
        date: '2025-11-23',
        totalCalls: 198,
        inboundCalls: 123,
        outboundCalls: 75,
        missedCalls: 28,
        averageDuration: '3:56',
        totalDuration: '13h 01m',
        answerRate: 85.9
      },
      {
        date: '2025-11-24',
        totalCalls: 267,
        inboundCalls: 167,
        outboundCalls: 100,
        missedCalls: 22,
        averageDuration: '5:02',
        totalDuration: '22h 28m',
        answerRate: 91.8
      }
    ];
  }

  private calculateSummary() {
    this.summary.totalCalls = this.analyticsData.reduce((sum, item) => sum + item.totalCalls, 0);
    this.summary.missed = this.analyticsData.reduce((sum, item) => sum + item.missedCalls, 0);
    this.summary.answered = this.summary.totalCalls - this.summary.missed;

    const avgRate = this.analyticsData.reduce((sum, item) => sum + item.answerRate, 0) / this.analyticsData.length;
    this.summary.avgDuration = this.analyticsData.length > 0 ? this.analyticsData[0].averageDuration : '0:00';
  }

  getAnswerRateClass(rate: number): string {
    if (rate >= 90) return 'text-green-600 font-semibold';
    if (rate >= 80) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  }

  exportReport() {
    const csv = this.convertToCSV(this.analyticsData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `call-analytics-${new Date().toISOString()}.csv`;
    a.click();
  }

  private convertToCSV(data: CallAnalytics[]): string {
    const headers = this.displayedColumns.join(',');
    const rows = data.map(row =>
      `${row.date},${row.totalCalls},${row.inboundCalls},${row.outboundCalls},${row.missedCalls},${row.averageDuration},${row.totalDuration},${row.answerRate}`
    );
    return [headers, ...rows].join('\n');
  }
}