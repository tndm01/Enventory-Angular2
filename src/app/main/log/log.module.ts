import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LogComponent } from './log.component';
import { TranslateModule } from '@ngx-translate/core';
import { PxxxPartialModule } from '../../../framework/ui-partial/ui.module';
import { PxxxTableModule } from '../../../framework/ui-partial/pxxx-table/pxxx-table.module';

export const logRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: LogComponent }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    RouterModule.forChild(logRoutes),
    TranslateModule,
    PxxxPartialModule,
    PxxxTableModule
  ],
  declarations: [LogComponent],
  providers: [DataService]
})
export class LogModule { }

