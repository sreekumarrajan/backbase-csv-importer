import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvImportComponent } from './csv-import.component';
import {CsvUtilsService} from '../../providers/csv_utils/csv-utils.service';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import {CsvImportRoutingModule} from './csv-import.routing.module';
import {BackbaseCSVRecord} from '../../common/models/csv.model';

describe('CsvImportComponent', () => {
  let component: CsvImportComponent;
  let fixture: ComponentFixture<CsvImportComponent>;
  let csvUtilsServiceInstance: CsvUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvImportComponent ],
      imports: [
        CommonModule,
        CsvImportRoutingModule,
        MatPaginatorModule,
        CdkTableModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        CsvUtilsService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(CsvImportComponent);
    component = fixture.debugElement.componentInstance;
    csvUtilsServiceInstance = TestBed.get(CsvUtilsService);
  }));

  describe('ngOnInit', () => {

    beforeEach(async(() => {
      component.ngOnInit();
    }));

    it('should subscribe to headers row and csv records row from the utils service', () => {
      component.csvUtilsService.headersRowSubject.next(['something']);
      component.csvUtilsService.csvRecordsSubject.next([new BackbaseCSVRecord()]);
      fixture.whenStable()
        .then(() => {
          expect(component.headersRow).toEqual(['something']);
          expect(component.csvFileSelected).toBeTruthy();
          expect(component.records.length).toEqual(1);
        });
    });
  });

  describe('uploadListener', () => {
    beforeEach(() => {
      spyOn(csvUtilsServiceInstance, 'isValidCSVFile').and.returnValue(true);
      spyOn(csvUtilsServiceInstance, 'processCSVFile').and.returnValue(true);
    });

    it('should call process CSV File from utils', () => {
      component.uploadListener({'srcElement':  {
        'files': ['1']
        }});
      expect(csvUtilsServiceInstance.processCSVFile).toHaveBeenCalled();
    });
  });
});
