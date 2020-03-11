import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CsvImportComponent} from './csv-import.component';

const routes: Routes = [
  {
    path: '',
    component: CsvImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvImportRoutingModule { }
