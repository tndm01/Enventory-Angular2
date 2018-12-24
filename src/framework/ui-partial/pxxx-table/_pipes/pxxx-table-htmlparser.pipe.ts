import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { PxxxHelpers } from '../../../helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PxxxStyleEnum } from '../_enum';
import { DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'PxxxTableHtmlParser'
})
export class PxxxTableHtmlParserPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: any, column?: any, index?: any): SafeHtml {
    let safeHtml: SafeHtml = this._sanitizer.bypassSecurityTrustHtml('');
    let str: any = '';

    if (PxxxHelpers.IsDefined(value) && PxxxHelpers.IsDefined(column)) {
      const { template } = column;

      if (!value) {
        return safeHtml;
      }

      if (PxxxHelpers.IsDefined(template) && typeof template === 'function') {
        str = template(value);

        if (
          typeof str === 'object' &&
          str.constructor.name === 'SafeHtmlImpl'
        ) {
          return str;
        }
      } else {
        str = this.getDataByType(column, value);
      }
    }
    safeHtml = this._sanitizer.bypassSecurityTrustHtml(str);
    return safeHtml;
  }

  checkType(value, field) {
    if (!isNaN(field) && value[field] !== undefined && value[field] != null) {
      const _type = typeof value[field];
      switch (_type) {
        case 'number':
          return 1; // number
        case 'string':
          if (
            this.replaceVersion(value[field].toString()).match(
              /\.(jpeg|jpg|gif|png)$/
            ) != null
          ) {
            return 3;
          }
          return 2; // string
      }
    }
  }

  getDataByType(item, row) {
    const __data = row[item.field];
    let _text = row[item.field];
    item.textAlign = item.textAlign || 'left';
    switch (item.type) {
      case PxxxStyleEnum.IMAGE:
        return `<div class="ngx-table-img"><img src='${__data}'/></div>`;
      case PxxxStyleEnum.DATETIME:
        item.textAlign = item.textAlign || 'right';
        _text =
          DatePipe.prototype.transform(__data, 'mediumTime', null, 'vi') +
          ' ' +
          DatePipe.prototype.transform(__data, 'shortDate', null, 'vi');
        break;
      case PxxxStyleEnum.DATE:
        item.textAlign = item.textAlign || 'right';
        _text = DatePipe.prototype.transform(__data, 'shortDate', null, 'vi');
        break;
      case PxxxStyleEnum.NUMBER:
        item.textAlign = 'right';
        // _text = DecimalPipe.prototype.transform(__data, '1.0-0', 'vi');
        _text = PxxxHelpers.FormatNumber(__data);
        break;
      case PxxxStyleEnum.NUMBER_DECIMAL:
        item.textAlign = 'right';
        _text = DecimalPipe.prototype.transform(__data, '1.2-2', 'vi');
        break;
      default:
        break;
    }
    // return `${__data}`;
    return `<div class="pxxx-table-text" style="text-align: ${
      item.textAlign
    }">${_text}</div>`;
  }

  replaceVersion(_link: string) {
    if (_link.indexOf('?v=') > -1) {
      return _link.slice(0, _link.indexOf('?'));
    }
    return _link;
  }
}
