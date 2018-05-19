import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SizeComponent } from './size.component';

export const sizeRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SizeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    PaginationModule,
    RouterModule.forChild(sizeRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [SizeComponent]
})
export class SizeModule { }
