import { TranslateService } from '@ngx-translate/core';

export interface TranslateHelper {
  getLang(): string;
  setLang(_lang: string): void;
}

class Helper implements TranslateHelper {
  constructor(private _translate: TranslateService) {}

  getLang(): string {
    return this._translate.getDefaultLang();
  }

  setLang(_lang: string): void {
    this._translate.setDefaultLang(_lang);
  }
}
