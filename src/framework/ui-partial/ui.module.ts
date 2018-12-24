import { PxxxPaggingModule } from './pxxx-pagging/pxxx-pagging.module';
import { PxxxTableModule } from './pxxx-table/pxxx-table.module';
import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { PxxxImportMatModule } from './im-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PxxxSharePartialComponentModule } from '../ui-partial/_share-partial-component.module';

@NgModule({
    declarations: [

    ],
    imports: [
        PxxxTableModule,
        PxxxImportMatModule,
        TranslateModule,
        PxxxSharePartialComponentModule
    ],
    providers: [],
    exports: [
        PxxxPaggingModule,
    ]
})
export class PxxxPartialModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: PxxxPartialModule,
          providers: [
            { provide: LOCALE_ID, useValue: 'vi' }
          ]
        };
      }

}
