import {Component, OnInit, ViewChild} from '@angular/core';
import {BackbaseCSVRecord} from '../../common/models/csv.model';
import {environment} from '../../../environments/environment';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator, Sort} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {CsvUtilsService} from '../../providers/csv_utils/csv-utils.service';

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
  public issueCountFilter: FormControl;
  public filterActive = false;

  constructor(public csvUtilsService: CsvUtilsService) {
  }

  ngOnInit() {
    this.issueCountFilter = new FormControl('', [Validators.pattern('^([0-9]*)|([0-9]*\\s-\\s[0-9]*)$')]);

    this.csvUtilsService.headersRowObservable.subscribe((headersRow) => {
      this.headersRow = headersRow;
    });
    this.csvUtilsService.csvRecordsObservable.subscribe(records => {
      this.records = records;
      this.sortedRecords = records;
      this.currentSelectionOfRecords = this.records.slice(0, environment.tableConfiguration.pageSize - 1);
    }, error => console.log(error));
  }

  uploadListener($event: any): void {
    const files = $event.srcElement.files;

    if (this.csvUtilsService.isValidCSVFile(files[0])) {

      const input = $event.target;

      this.csvUtilsService.processCSVFile(input);
    } else {
        alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  sortData(sort: Sort) {
    this.paginator.pageIndex = 0;
    const data = this.filterActive ? this.sortedRecords.slice() : this.records.slice();
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

  filterRecords() {
    this.filterActive = true;
    if (this.issueCountFilter.invalid) {
      // handle error
    } else {
      this.paginator.pageIndex = 0;
      const filterValue = this.issueCountFilter.value
        .split('-')
        .map(entry => entry.trim());
      switch (filterValue.length) {
        case 1:
          this.sortedRecords = this.records.filter(record => record.issueCount === filterValue[0]);
          break;
        case 2:
          this.sortedRecords = this.records.filter(record => record.issueCount >= filterValue[0]
                                                                          && record.issueCount <= filterValue[1]);
          break;
        default:
          break;
      }
      this.currentSelectionOfRecords = this.sortedRecords.slice(0, environment.tableConfiguration.pageSize - 1);
    }

  }

  resetFilterRecords() {
    this.filterActive = false;
    this.paginator.pageIndex = 0;
    this.sortedRecords = this.records;
    this.currentSelectionOfRecords = this.sortedRecords.slice(0, environment.tableConfiguration.pageSize - 1);
  }
}

