import { TestBed } from '@angular/core/testing';

import { AuthstatusService } from './authstatus.service';

describe('AuthstatusService', () => {
  let service: AuthstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
