import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ExportComponent } from './export.component';
import { AutoCompleteModule } from 'primeng/primeng';

export const exportRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ExportComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    AutoCompleteModule,
    RouterModule.forChild(exportRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [ExportComponent]
})
export class ExportModule { }
