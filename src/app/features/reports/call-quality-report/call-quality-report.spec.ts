import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallQualityReport } from './call-quality-report';

describe('CallQualityReport', () => {
  let component: CallQualityReport;
  let fixture: ComponentFixture<CallQualityReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallQualityReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallQualityReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
