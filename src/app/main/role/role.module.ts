import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleComponent } from './role.component';

const roleRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRouter)
  ],
  declarations: [RoleComponent],
  providers: [DataService, NotificationService]
})
export class RoleModule { }
