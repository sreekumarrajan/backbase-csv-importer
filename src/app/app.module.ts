import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CsvImportComponent } from './pages/csv-import/csv-import.component';
import {CsvImportModule} from './pages/csv-import/csv-import.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from './common/components/error-dialog/error-dialog.component';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CsvImportModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
