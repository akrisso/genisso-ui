import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAnalyticsReport } from './call-analytics-report';

describe('CallAnalyticsReport', () => {
  let component: CallAnalyticsReport;
  let fixture: ComponentFixture<CallAnalyticsReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallAnalyticsReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallAnalyticsReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
