import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaMetricsReport } from './sla-metrics-report';

describe('SlaMetricsReport', () => {
  let component: SlaMetricsReport;
  let fixture: ComponentFixture<SlaMetricsReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaMetricsReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaMetricsReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
