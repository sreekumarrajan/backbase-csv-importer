import { Injectable } from '@angular/core';
import {BackbaseCSVRecord} from '../../common/models/csv.model';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilsService {

  constructor() { }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(this.formatHeaders(headers[j]));
    }
    return headerArray;
  }

  formatHeaders(headerField: string) {
    return headerField;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
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
}
