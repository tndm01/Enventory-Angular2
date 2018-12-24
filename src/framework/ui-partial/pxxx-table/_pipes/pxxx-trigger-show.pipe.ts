import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pxxxTableShowButton'
})
export class PxxxTriggerShowButtonPipe implements PipeTransform {
  transform(value: any, model?: any, args?: any): any {
    if (value === undefined || value === null || value === '') {
      return true;
    }

    // const _value = value;
    // const _tempValue = value;
    let isTrue = true;
    let property = value;

    if (value.indexOf('!') > -1) {
      isTrue = false;
      property = value.replace('!', '');
    }

    if (
      model.hasOwnProperty(property) &&
      typeof model[property] === 'boolean'
    ) {
      return isTrue ? model[property] : !model[property];
    }

    return false;
  }
}
