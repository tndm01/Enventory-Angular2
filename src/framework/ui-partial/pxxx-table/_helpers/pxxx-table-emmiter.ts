import { PxxxHelpers } from '../../../helper/helpers';
import { PxxxActionEnum } from '../_enum';

export class PxxxEventEmmiter {
  // Type of action
  action: number;
  // Title of action
  title: string;
  // Show Icon only, not display text
  showIconOnly: boolean;
  // Class of icon
  icon: string;
  // Class of button
  class: string;
  // customs style css
  style: string;
  // Template to display data
  template: any;
  // Force action to dropdown button
  forceInDrop: boolean;
  // Default Value
  defaultOptions: any = {
    action: 0,
    title: '',
    showIconOnly: true,
    icon: null,
    class: null,
    style: null,
    template: null,
    forceInDrop: false
  };

  // #region Contructor
  constructor(_action: {
    action?: number;
    title?: string;
    icon?: string;
    class?: string;
    style?: string;
    showIconOnly?: boolean;
    template?: any;
  });
  constructor(_action?: any);
  constructor(_action?: number, _title?: any);
  constructor(_action?: number, _title?: string, _showIconOnly?: any);
  constructor(
    _action?: number,
    _title?: string,
    _showIconOnly?: boolean,
    _template?: any
  );
  constructor(
    _action?: any,
    _title?: any,
    _showIconOnly?: any,
    _template?: any,
    _forceInDrop?: boolean
  ) {
    let options: any = this.defaultOptions;

    if (typeof _action === 'object') {
      options = Object.assign(this.defaultOptions, _action);
    } else {
      if (typeof _action === 'function') {
        options.template = _action;
      } else if (typeof _title === 'function') {
        options.action = _action || options.action;
        options.template = _title;
      } else if (typeof _showIconOnly === 'function') {
        options.action = _action || options.action;
        options.title = _title || options.title;
        options.template = _showIconOnly;
      } else {
        options.action = _action || options.action;
        options.title = _title || options.title;
        options.showIconOnly = _showIconOnly || options.showIconOnly;
        options.template = _template || options.template;
      }
    }

    this.action = options.action;
    this.title = options.title;
    this.showIconOnly = options.showIconOnly;

    this.icon = options.icon;
    this.class = options.class;
    this.style = options.style;

    this.template = options.template;

    this.forceInDrop = PxxxHelpers.IsDefined(_forceInDrop)
      ? _forceInDrop
      : false;
  }
  // #endregion

  getColorStatus(_action?: number) {
    if (this.class) {
      return this.class;
    }
    _action = _action || this.action;
    if (!PxxxHelpers.IsDefined(_action)) {
      return '';
    }
    switch (_action) {
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
      case PxxxActionEnum.DISABLEDCHAT:
        return 'btn-metal';
      case PxxxActionEnum.ENABLEDCHAT:
        return 'btn-accent';
      case PxxxActionEnum.FUNCTION:
        return 'btn-accent';
        case PxxxActionEnum.SHOPCART:
        return 'btn-accent';
      default:
        return 'btn-default';
    }
  }

  getActionIcon(_action?: number) {
    if (this.icon) {
      return this.icon;
    }
    _action = _action || this.action;
    if (!PxxxHelpers.IsDefined(_action)) {
      return '';
    }
    switch (_action) {
      case PxxxActionEnum.VIEW:
        return 'la-info-circle';
      case PxxxActionEnum.ADD:
        return 'la-plus-circle';
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

  getShowIconOnly(_showIconOnly?: boolean) {
    _showIconOnly = _showIconOnly || this.showIconOnly;
    return _showIconOnly ? 'm-btn--icon-only' : '';
  }

  getAction(_action?: number, _title?: string, _showIconOnly?: boolean) {
    _action = _action || this.action;
    _showIconOnly = _showIconOnly || this.showIconOnly;
    _title = _title || this.title;
    const style = this.style || null;

    const __showIconClass = this.getShowIconOnly(_showIconOnly);
    const __colorStatus = this.getColorStatus(_action);
    const __style = style ? ' style="' + this.style + '"' : '';
    const __actionIcon = this.getActionIcon(_action);
    const __spanTitle = _showIconOnly ? '' : `<span>${_title}</span>\n`;

    return `<span class="m-demo__preview m-demo__preview--btn">
                <a href="javascript:void(0);"
                   data-action="${_action}"
                   class="btn m-btn m-btn--square m-btn--icon Pxxx-btn-action ${__showIconClass} ${__colorStatus}"
                   ${__style}
                   title="${_title}"
                   data-toggle="m-tooltip" data-content="${_title}">
                   <i class="la ${__actionIcon}"></i> ${__spanTitle}
                </a>
            </span>`;
  }
}
