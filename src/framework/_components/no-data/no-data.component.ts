import { Component, OnInit, Input } from '@angular/core';
import { PxxxHelpers } from '../../helper/helpers';
import { PxxxTranslateService } from '../../translate/_service/translate.service';

@Component({
  selector: 'pxxx-no-data',
  templateUrl: './no-data.component.html',
})
export class PxxxNoDataComponent implements OnInit {
  @Input()
  message: string;
  constructor(private _translate: PxxxTranslateService) {
    if (PxxxHelpers.IsNullorEmpty(this.message)) {
      this._translate.getByName('PARTIAL.NO_DATA').subscribe(val => {
        this.message = val;
      });
    }
  }
  ngOnInit() {}
}
