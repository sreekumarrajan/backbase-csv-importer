import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/csv-import',
    pathMatch: 'full'
  },
  {
    path: 'csv-import',
    loadChildren: () => import('./pages/csv-import/csv-import.module').then(m => {
      console.log('loading me');
      return m.CsvImportModule;
    })
  },
  {
    path: '**',
    redirectTo: '/csv-import'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
