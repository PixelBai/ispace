import { TestBed } from '@angular/core/testing';

import { FileSvcService } from './file-svc.service';

describe('FileSvcService', () => {
  let service: FileSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
