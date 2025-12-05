import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationModal } from './organization-modal';

describe('OrganizationModal', () => {
  let component: OrganizationModal;
  let fixture: ComponentFixture<OrganizationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
