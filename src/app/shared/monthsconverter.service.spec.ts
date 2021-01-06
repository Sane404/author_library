import { TestBed } from '@angular/core/testing';

import { MonthsconverterService } from './monthsconverter.service';

describe('MonthsconverterService', () => {
  let service: MonthsconverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsconverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
