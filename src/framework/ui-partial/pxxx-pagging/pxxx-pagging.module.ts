import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxxxPaggingComponent } from './pxxx-pagging.component';
import { FormsModule } from '@angular/forms';
import { PxxxImportMatModule } from '../im-material.module';

@NgModule({
  imports: [CommonModule, FormsModule, PxxxImportMatModule],
  declarations: [PxxxPaggingComponent],
  exports: [PxxxPaggingComponent]
})
export class PxxxPaggingModule {}
