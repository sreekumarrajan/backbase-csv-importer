import {Component, OnInit, ViewChild} from '@angular/core';
import {BackbaseCSVRecord} from '../../common/models/csv.model';
import {environment} from '../../../environments/environment';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, Sort} from '@angular/material';

@Component({
  selector: 'backbase-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss']
})
export class CsvImportComponent implements OnInit {

  public records: BackbaseCSVRecord[] = [];
  public sortedRecords: BackbaseCSVRecord[] = [];
  public currentSelectionOfRecords: BackbaseCSVRecord[] = [];
  @ViewChild('csvReader') csvReader: any;
  public headersRow: string[] = [];
  public displayedColumns: string[] = ['firstName', 'surName', 'issueCount', 'dateOfBirth'];
  public pageSize: number = environment.tableConfiguration.pageSize;
  @ViewChild('paginator') paginator: MatPaginator;

  ngOnInit() {
  }

  uploadListener($event: any): void {
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        this.headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headersRow.length);
        this.sortedRecords = this.records;
        this.currentSelectionOfRecords = this.records.slice(0, environment.tableConfiguration.pageSize - 1);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
        alert('Please import valid .csv file.');
      this.fileReset();
    }
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

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  sortData(sort: Sort) {
    this.paginator.pageIndex = 0;
    const data = this.records.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedRecords = data;
      this.currentSelectionOfRecords = this.sortedRecords.slice(0, environment.tableConfiguration.pageSize - 1);
      return;
    }

    this.sortedRecords = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
        case 'surName': return this.compare(a.surName, b.surName, isAsc);
        case 'issueCount': return this.compare(a.issueCount, b.issueCount, isAsc);
        case 'dateOfBirth': return this.compare(new Date(a.dateOfBirth), new Date(b.dateOfBirth), isAsc);

        default: return 0;
      }
    });
    this.currentSelectionOfRecords = this.sortedRecords.slice(0, environment.tableConfiguration.pageSize - 1);
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPagination(event: PageEvent) {
    const startingOffset = this.paginator.pageIndex * environment.tableConfiguration.pageSize;
    const endingOffset = startingOffset + environment.tableConfiguration.pageSize - 1;
    // reset sorted data
    this.currentSelectionOfRecords = this.sortedRecords.slice(startingOffset, endingOffset);
  }
}

