import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxxxTableComponent } from './pxxx-table.component';
import {
  PxxxTableHtmlParserPipe,
  PxxxTableIconButtonPipe,
  PxxxTriggerShowButtonPipe,
  PxxxBtnClassDefaultPipe,
  PxxxTableShowButtonColPipe
} from './_pipes';
import { PxxxPaggingModule } from '../pxxx-pagging/pxxx-pagging.module';
import { PxxxImportMatModule } from '../im-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PxxxSharePartialComponentModule } from '../_share-partial-component.module';

@NgModule({
  imports: [
    CommonModule,
    PxxxPaggingModule,
    PxxxImportMatModule,
    TranslateModule,
    PxxxSharePartialComponentModule
  ],
  declarations: [
    PxxxTableComponent,
    PxxxTableHtmlParserPipe,
    PxxxTableIconButtonPipe,
    PxxxTriggerShowButtonPipe,
    PxxxTableShowButtonColPipe,
    PxxxBtnClassDefaultPipe
  ],
  exports: [PxxxTableComponent]
})
export class PxxxTableModule {}
