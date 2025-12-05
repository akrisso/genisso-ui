import { TestBed } from '@angular/core/testing';

import { SuperAdminAuth } from './admin-auth';

describe('SuperAdminAuth', () => {
  let service: SuperAdminAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
