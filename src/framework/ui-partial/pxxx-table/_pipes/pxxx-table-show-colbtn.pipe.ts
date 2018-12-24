import { Pipe, PipeTransform } from '@angular/core';
import { PxxxHelpers } from '../../../helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'PxxxTableShowButtonCol'
})
export class PxxxTableShowButtonColPipe implements PipeTransform {
  transform(value: any, column?: any, index?: any): any {
    if (
      PxxxHelpers.IsDefined(value) &&
      PxxxHelpers.IsDefined(column) &&
      PxxxHelpers.IsDefined(column['functions'])
    ) {
      const _func = column['functions'][index];
      if (PxxxHelpers.IsDefined(_func) && PxxxHelpers.IsDefined(value)) {
        const _template = _func['template'];
        if (
          PxxxHelpers.IsDefined(_template) &&
          typeof _template === 'function'
        ) {
          return _template(value);
        }
        return true;
      }
    }
    return false;
  }
}
