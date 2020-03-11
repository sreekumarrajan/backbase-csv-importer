import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CsvImportComponent} from './csv-import.component';
import {CsvImportRoutingModule} from './csv-import.routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [CsvImportComponent],
  imports: [
    CommonModule,
    CsvImportRoutingModule,
    MatPaginatorModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule
  ]
})
export class CsvImportModule { }
