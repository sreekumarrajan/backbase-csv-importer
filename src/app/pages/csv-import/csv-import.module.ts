import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CsvImportComponent} from './csv-import.component';
import {CsvImportRoutingModule} from './csv-import.routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CsvUtilsService} from '../../providers/csv_utils/csv-utils.service';

@NgModule({
  declarations: [CsvImportComponent],
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
  ]
})
export class CsvImportModule { }
