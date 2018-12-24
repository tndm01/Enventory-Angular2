import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxxxImportMatModule } from './im-material.module';
import { PxxxNoDataComponent } from '../_components/no-data/no-data.component';

@NgModule({
  imports: [CommonModule, PxxxImportMatModule],
  declarations: [
    PxxxNoDataComponent
  ],
  exports: [
    PxxxNoDataComponent
  ]
})
export class PxxxSharePartialComponentModule {}
