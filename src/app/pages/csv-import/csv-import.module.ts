import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CsvImportComponent} from './csv-import.component';
import {CsvImportRoutingModule} from './csv-import.routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatButtonModule, MatCardModule, MatDialog, MatDialogModule, MatFormFieldModule, MatInputModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CsvUtilsService} from '../../providers/csv_utils/csv-utils.service';
import {ErrorDialogComponent} from '../../common/components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    CsvImportComponent,
    ErrorDialogComponent],
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
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    CsvUtilsService
  ],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class CsvImportModule { }
