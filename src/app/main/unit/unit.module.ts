import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UnitComponent } from './unit.component';

export const unitRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UnitComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    PaginationModule,
    RouterModule.forChild(unitRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [UnitComponent]
})
export class UnitModule { }
