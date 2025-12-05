import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMain } from './organization-main';

describe('OrganizationMain', () => {
  let component: OrganizationMain;
  let fixture: ComponentFixture<OrganizationMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
