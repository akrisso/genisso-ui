import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPerformanceReport } from './agent-performance-report';

describe('AgentPerformanceReport', () => {
  let component: AgentPerformanceReport;
  let fixture: ComponentFixture<AgentPerformanceReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPerformanceReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
