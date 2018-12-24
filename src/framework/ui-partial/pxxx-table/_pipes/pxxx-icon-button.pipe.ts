import { Pipe, PipeTransform } from '@angular/core';
import { PxxxActionEnum } from '../_enum';
import { PxxxHelpers } from '../../../helper';

@Pipe({
  name: 'pxxxTableIcon'
})
export class PxxxTableIconButtonPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!PxxxHelpers.IsDefined(value)) {
      return '';
    }

    const __forceClass = PxxxHelpers.IsNullorEmpty(value['icon'])
      ? ''
      : value['icon'];

    if (__forceClass !== '') {
      return __forceClass;
    } else {
      switch (value['action']) {
        case PxxxActionEnum.VIEW:
          return 'la-info-circle';
        case PxxxActionEnum.ADD:
          return 'la-plus-square';
        case PxxxActionEnum.CONVERT:
          return 'la-exchange';
        case PxxxActionEnum.EDIT:
          return 'la-edit';
        case PxxxActionEnum.DELETE:
          return 'la-trash';
        case PxxxActionEnum.DISABLED:
          return 'la-times-circle-o';
        case PxxxActionEnum.EXPORT:
          return 'la-plug';
        case PxxxActionEnum.APPROVE:
          return 'la-check-circle-o';
        case PxxxActionEnum.DISAPPROVE:
          return 'la-ban';
        case PxxxActionEnum.BLOCK:
          return 'la-lock';
        case PxxxActionEnum.UNBLOCK:
          return 'la-unlock-alt';
        case PxxxActionEnum.LOGCHAT:
          return 'la-comments';
        case PxxxActionEnum.LIST:
          return 'la-bars';
        case PxxxActionEnum.KEY:
          return 'la-key';
        case PxxxActionEnum.DISABLEDCHAT:
          return 'la-microphone-slash';
        case PxxxActionEnum.ENABLEDCHAT:
          return 'la-microphone';
        case PxxxActionEnum.FUNCTION:
          return 'la-wrench';
        case PxxxActionEnum.SHOPCART:
          return 'la-shopping-cart';
        default:
          return 'la-default';
      }
    }
  }
}
