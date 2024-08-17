import { TestBed } from '@angular/core/testing';

import { WindowsManagerService } from './windows-manager.service';

describe('WindowsManagerService', () => {
  let service: WindowsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
