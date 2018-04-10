import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserComponent } from './user.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';

export const userRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    MultiselectDropdownModule,
    Daterangepicker,
    RouterModule.forChild(userRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [UserComponent],
  providers: [DataService, NotificationService, UploadService]
})
export class UserModule { }
