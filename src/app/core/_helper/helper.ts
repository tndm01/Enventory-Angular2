import * as moment from 'moment';
import * as $ from 'jquery';


declare const swal: any;
declare const App: any;
declare const toastr: any;
declare var jQuery: any;

export class Helpers {
  constructor(

  ) {}

  public static isNullOrEmpty(obj) {
    if (obj === undefined || obj == null) {
      return true;
    } else {
      if (typeof obj === 'string') {
        if (obj !== '') {
          return false;
        }
      }
    }

    return false;
  }

  public static isNullOrUndefined(obj) {
    return obj === undefined || obj == null;
  }


  public static SwalError(title, message) {
    swal(title, message, 'error');
  }

  public static ToastSuccess(title, message) {
    toastr['success'](message, title);
  }

  public static formatLocalDate(_value, format?: string, isUTC?: boolean) {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const _date = isUTC ? moment.utc(_value) : moment(_value);

    if (!moment.isMoment(_date)) {
      return '';
    }

    return _date.format(
      format == null || format === undefined ? 'DD/MM/YYYY HH:mm' : format
    );
  }

  public static convertDateFromUTC(_value, format?: string): string {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const _date = moment(_value);
    if (!moment.isMoment(_date)) {
      return '';
    }

    const __format = format ? format : 'YYYY-MM-DD';
    return _date.format(__format);
  }
  public static convertDateToUTC(
    _value,
    format?: string,
    formatConvert?: string
  ): string {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const __format =
      format == null || format === undefined ? format : 'DD/MM/YYYY';
    const _date = moment(_value, __format);

    if (!moment.isMoment(_date)) {
      return '';
    }

    const __formatConvert =
      formatConvert == null || formatConvert === undefined
        ? 'x'
        : formatConvert;
    return _date.format(__formatConvert);
  }

  public static convertToUTCfromDate(_value, formatConvert?: string): string {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const _date = moment(_value);

    if (!moment.isMoment(_date)) {
      return '';
    }

    const __formatConvert =
      formatConvert == null || formatConvert === undefined
        ? 'x'
        : formatConvert;
    return _date.format(__formatConvert);
  }

  public static getTimeFromString(_value, format?: string, retFormat?: string) {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const __format = format ? format : 'HH:mm';
    const _date = moment.utc(_value, __format);

    if (!moment.isMoment(_date)) {
      return '';
    }

    return _date.format(
      retFormat == null || retFormat === undefined ? 'HH' : retFormat
    );
  }

  public static getHourFormat(hour: number, minute: number) {
    let text = '';
    text =
      (hour < 10 ? '0' + hour : hour) +
      ':' +
      (minute < 10 ? '0' + minute : minute);

    return text;
  }

  public static getFromUnix(_value, retFormat?: string, isUTC: boolean = true) {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    let _date = moment.unix(_value);

    if (isUTC) {
      _date = _date.utc();
    }

    if (!moment.isMoment(_date)) {
      return '';
    }

    return _date.format(
      retFormat == null || retFormat === undefined
        ? 'DD/MM/YYYY HH:mm'
        : retFormat
    );
  }

  public static getUnixfromDate(_value, format?: string, isUTC?: boolean) {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const _date = isUTC
      ? moment.utc(
          _value,
          format == null || format === undefined ? 'DD/MM/YYYY HH:mm' : format
        )
      : moment(
          _value,
          format == null || format === undefined ? 'DD/MM/YYYY HH:mm' : format
        );

    if (!moment.isMoment(_date)) {
      return '';
    }

    return _date.unix();
  }

  public static getUnixfromDateToMilisecond(
    _value,
    format?: string,
    isUTC?: boolean
  ) {
    if (_value === '' || _value === null || _value === undefined) {
      return '';
    }
    const _date = isUTC
      ? moment.utc(
          _value,
          format == null || format === undefined ? 'DD/MM/YYYY HH:mm' : format
        )
      : moment(
          _value,
          format == null || format === undefined ? 'DD/MM/YYYY HH:mm' : format
        );

    if (!moment.isMoment(_date)) {
      return '';
    }

    return _date.valueOf();
  }

  public static GroupBy(_list: any[], _key: string) {
    const groupedObj = _list.reduce((prev, cur) => {
      if (!prev[cur[_key]]) {
        prev[cur[_key]] = [cur];
      } else {
        prev[cur[_key]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({
      key,
      value: groupedObj[key]
    }));
  }

  public static focusInputbyId(_id) {
    document.getElementById(_id).focus();
  }

  static loadStyles(tag, src) {
    if (Array.isArray(src)) {
      $.each(src, function(k, s) {
        $(tag).append(
          $('<link/>')
            .attr('href', s)
            .attr('rel', 'stylesheet')
            .attr('type', 'text/css')
        );
      });
    } else {
      $(tag).append(
        $('<link/>')
          .attr('href', src)
          .attr('rel', 'stylesheet')
          .attr('type', 'text/css')
      );
    }
  }

  static unwrapTag(element) {
    $(element)
      .removeAttr('appunwraptag')
      .unwrap();
  }

  public static convertDateNowtoString(
    count?: number,
    format?: string,
    type?: string
  ) {
    const _tmp = moment();
    const units: moment.unitOfTime.DurationConstructor = !Helpers.isNullOrUndefined(
      type
    )
      ? <moment.unitOfTime.DurationConstructor>type
      : 'day';

    if (count != null && count !== undefined) {
      _tmp.add(units, count);
    }
    return _tmp.format(
      !Helpers.isNullOrUndefined(format) ? format : 'DD-MM-YYYY'
    );
  }

  /**
   * Breadcrumbs markup
   * @param breadcrumbs
   */
  static setBreadcrumbs(breadcrumbs) {
    if (breadcrumbs) {
      $('.m-subheader__title').addClass('m-subheader__title--separator');
    }

    let ul = $('.m-subheader__breadcrumbs');

    if ($(ul).length === 0) {
      ul = $('<ul/>')
        .addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
        .append(
          $('<li/>')
            .addClass('m-nav__item')
            .append(
              $('<a/>')
                .addClass('m-nav__link m-nav__link--icon')
                .append($('<i/>').addClass('m-nav__link-icon la la-home'))
            )
        );
    }

    $(ul)
      .find('li:not(:first-child)')
      .remove();
    $.each(breadcrumbs, function(k, v) {
      const li = $('<li/>')
        .addClass('m-nav__item')
        .append(
          $('<a/>')
            .addClass('m-nav__link m-nav__link--icon')
            .attr('routerLink', v.href)
            .attr('title', v.title)
            .append(
              $('<span/>')
                .addClass('m-nav__link-text')
                .text(v.text)
            )
        );
      $(ul)
        .append(
          $('<li/>')
            .addClass('m-nav__separator')
            .text('-')
        )
        .append(li);
    });
    $('.m-subheader .m-stack__item:first-child').append(ul);
  }

  static setLoading(enable) {
    const body = $('body');
    if (enable) {
      $(body).addClass('m-page--loading-non-block');
    } else {
      $(body).removeClass('m-page--loading-non-block');
    }
  }

  static bodyClass(strClass) {
    $('body').attr('class', strClass);
  }

  public static openModalById(_id) {
    if (jQuery('#' + _id).length > 0) {
      const _tmp = <any>jQuery('#' + _id);
      _tmp.modal('show');
    }
  }

  public static toggleModalById(_id) {
    if (jQuery('#' + _id).length > 0) {
      const _tmp = <any>jQuery('#' + _id);
      _tmp.modal('toggle');
    }
  }

  public static generateRandomCode() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public static removeCookie(cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
