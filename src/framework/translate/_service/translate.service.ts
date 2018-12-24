import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PxxxTranslateService {
  constructor(private _trans: TranslateService) {}
  getByName(name: string | Array<string>): Observable<string> {
    return this._trans.get(name);
  }

  getByCode(code: number): Observable<string> {
    return this._trans.get('API_CODE.' + code.toString());
  }
}
