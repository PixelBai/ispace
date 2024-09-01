import { TestBed } from '@angular/core/testing';

import { DriveEnginService } from './drive-engin.service';

describe('DriveEnginService', () => {
  let service: DriveEnginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveEnginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
