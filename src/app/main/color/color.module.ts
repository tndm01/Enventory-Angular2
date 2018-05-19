import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { UploadService } from '../../core/services/upload.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorComponent } from './color.component';

export const colorRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ColorComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    PaginationModule,
    RouterModule.forChild(colorRoutes),
    ModalModule.forRoot(),
  ],
  declarations: [ColorComponent],
  providers: [DataService]
})
export class ColorModule { }
