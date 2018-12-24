import { Pipe, PipeTransform } from '@angular/core';
import { PxxxHelpers } from '../../../helper/helpers';
import { PxxxActionEnum } from '../_enum';

@Pipe({
  name: 'pxxxBtnClassDefault'
})
export class PxxxBtnClassDefaultPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (!PxxxHelpers.IsDefined(value)) {
      return '';
    }

    switch (value) {
      case PxxxActionEnum.VIEW:
        return 'btn-primary';
      case PxxxActionEnum.ADD:
        return 'btn-success';
      case PxxxActionEnum.CONVERT:
        return 'btn-accent';
      case PxxxActionEnum.EDIT:
        return 'btn-primary';
      case PxxxActionEnum.DELETE:
        return 'btn-danger';
      case PxxxActionEnum.DISABLED:
        return 'btn-metal';
      case PxxxActionEnum.EXPORT:
        return 'btn-plug';
      case PxxxActionEnum.APPROVE:
        return 'btn-success';
      case PxxxActionEnum.DISAPPROVE:
        return 'btn-metal';
      case PxxxActionEnum.BLOCK:
        return 'btn-metal';
      case PxxxActionEnum.UNBLOCK:
        return 'btn-accent';
      case PxxxActionEnum.LOGCHAT:
        return 'btn-default';
      case PxxxActionEnum.KEY:
        return 'btn-warning';
      default:
        return 'btn-default';
    }
  }
}
