import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CsvImportComponent} from './csv-import.component';
import {CsvImportRoutingModule} from './csv-import.routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

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
    MatButtonModule
  ]
})
export class CsvImportModule { }
