import { Injectable } from '@angular/core';
import {BackbaseCSVRecord} from '../../common/models/csv.model';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilsService {

  public headersRowSubject: Subject<string[]>;
  public csvRecordsSubject: Subject<BackbaseCSVRecord[]>;
  public headersRowObservable: Observable<string[]>;
  public csvRecordsObservable: Observable<BackbaseCSVRecord[]>;

  constructor() {
    this.headersRowSubject = new Subject();
    this.csvRecordsSubject = new Subject();
    this.headersRowObservable = this.headersRowSubject.asObservable();
    this.csvRecordsObservable = this.csvRecordsSubject.asObservable();
  }

  isValidCSVFile(file: any): boolean {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any): string[] {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray: string[] = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(this.formatHeaders(headers[j]));
    }
    return headerArray;
  }

  formatHeaders(headerField: string): string {
    return headerField;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): BackbaseCSVRecord[] {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length === headerLength) {
        const csvRecord: BackbaseCSVRecord = new BackbaseCSVRecord();
        csvRecord.firstName = currentRecord[0].trim();
        csvRecord.surName = currentRecord[1].trim();
        csvRecord.issueCount = currentRecord[2].trim();
        csvRecord.dateOfBirth = currentRecord[3].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  processCSVFile(input): void {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = () => {
      const csvData = reader.result;
      const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

      const headersRow = this.getHeaderArray(csvRecordsArray);
      this.headersRowSubject.next(headersRow);
      const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      this.csvRecordsSubject.next(records);
    };

    reader.onerror = () => {
     this.csvRecordsSubject.error('Something went wrong while reading the file');
    };
  }
}
