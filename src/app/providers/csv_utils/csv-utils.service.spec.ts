import { TestBed } from '@angular/core/testing';

import { CsvUtilsService } from './csv-utils.service';

describe('CsvUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvUtilsService = TestBed.get(CsvUtilsService);
    expect(service).toBeTruthy();
  });
});
