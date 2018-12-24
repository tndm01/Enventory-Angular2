//#region Import
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslateService,
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import { PxxxTranslateService } from './_service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { PxxxEnum } from '../enum';
import { PxxxHelpers } from '../helper/helpers';
//#endregion

export const pxxxLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(
    http,
    PxxxEnum.Config.TRANS_URL,
    PxxxEnum.Config.TRANS_EXTENSION
  );
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: pxxxLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PxxxTranslateService],
  declarations: [],
  exports: [TranslateModule]
})
export class PxxxTranslateModule {
  constructor(private translate: TranslateService) {
    this.translate.use('vi');
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PxxxTranslateModule,
      providers: [TranslateService]
    };
  }
}
