import { TestBed } from '@angular/core/testing';

import { CsvUtilsService } from './csv-utils.service';

describe('CsvUtilsService', () => {
  let service: CsvUtilsService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(CsvUtilsService);
    expect(service).toBeTruthy();
  });

  describe('getDataRecordsArrayFromCSVFile', () => {
    it('should return the correct CSV Array', () => {
      const csvRecordsArray = ['headers', 'Sreekumar,Rajan,3,19880419'];

      const result = service.getDataRecordsArrayFromCSVFile(csvRecordsArray, 4);
      expect(result.length).toEqual(1);
      expect(result[0].firstName).toEqual('Sreekumar');
    });
  });
});
