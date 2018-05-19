import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImportComponent } from './import.component';
import { AutoCompleteModule } from 'primeng/primeng';

export const importRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ImportComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    AutoCompleteModule,
    RouterModule.forChild(importRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [ImportComponent]
})
export class ImportModule { }
