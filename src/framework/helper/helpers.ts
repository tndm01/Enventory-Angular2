import { PxxxEnum } from '../enum/index';

declare const swal: any;
declare const toastr: any;

export class PxxxHelpers {
  public static Project() {
    return PxxxEnum.Project;
  }

  public static IsDefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null;
  }

  public static IsNullorEmpty<T>(value: T | undefined | null): value is T {
    if (
      value === undefined ||
      value == null ||
      (typeof value === 'string' && value.length === 0)
    ) {
      return true;
    }
    return false;
  }

  public static FormatNumber(value) {
    if (value === undefined || value == null) {
      return '---';
    }
    value = value.toString().replace(/\$|\,/g, '');
    if (isNaN(value)) {
      value = '0';
    }

    const sign = value == (value = Math.abs(value));
    value = Math.floor(value * 100 + 0.50000000001);
    value = Math.floor(value / 100).toString();

    for (let i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++) {
      value =
        value.substring(0, value.length - (4 * i + 3)) +
        '.' +
        value.substring(value.length - (4 * i + 3));
    }

    return (sign ? '' : '-') + value;
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

  /**
   * String.Format as C# {0}, {1}, {2}=> text
   */
  public static FormatString(_str: string, _values: string[]): string {
    let _result = _str;

    for (let i = 0; i < _values.length; i++) {
      _result = _result.replace(new RegExp('\\{' + i + '\\}', 'g'), _values[i]);
    }

    return _result;
  }

  public static RandomCode() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public static UnsignedVNText(_text: string) {
    const signedChars =
      'àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ';
    const unsignedChars =
      'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY';
    const pattern = new RegExp('[' + signedChars + ']', 'g');
    const output = _text.replace(pattern, function(m, key, value) {
      return unsignedChars.charAt(signedChars.indexOf(m));
    });
    return output;
  }

  // static setLoading(enable) {
  //   const body = $('body');
  //   if (enable) {
  //     $(body).addClass('m-page--loading-non-block');
  //   } else {
  //     $(body).removeClass('m-page--loading-non-block');
  //   }
  // }

  static showLoading(enable: boolean) {
    const __id = 'main-app-loading';
    const __ele = document.getElementById(__id);
    const __cls = 'hidden';
    if (this.IsDefined(__ele)) {
      if (enable) {
        __ele.classList.remove(__cls);
      } else {
        __ele.classList.add(__cls);
      }
    }
  }

  public static SwalError(title, message) {
    swal(title, message, 'error');
  }

  public static ToastSuccess(title, message) {
    toastr['success'](message, title);
  }

  public static ToastError(title, message) {
    toastr['error'](message, title);
  }

  public static FocusInputbyId(_id) {
    document.getElementById(_id).focus();
  }
  public static GetValuebyId(_id) {
    const _element = document.getElementById(_id) as HTMLInputElement;
    if (PxxxHelpers.IsDefined(_element)) {
      return _element.value;
    }
    return '';
  }

  public static GetElementById(_id: string): HTMLElement {
    return document.getElementById(_id);
  }

  public static GetElementByName(_name: string, _getSingle?: boolean): any {
    const _elements = document.getElementsByName(_name);
    if (this.IsDefined(_getSingle) && _getSingle && _elements.length > 0) {
      return _elements[0];
    }
    return _elements;
  }

  public static GetFSChartDefault() {
    return JSON.parse(JSON.stringify(PxxxEnum.FusionChartDefault));
  }

  public static CopyToClipboard(value) {
    const _id = PxxxHelpers.RandomCode();
    const el = document.createElement('textarea') as HTMLTextAreaElement;
    el.value = value;
    el.id = _id;
    // el.setAttribute('readonly', '');
    // el.style.position = 'fixed';
    // el.style.zIndex = '90000';
    // el.style.width = '450px';
    // el.style.height = '250px';
    document.body.appendChild(el);

    const c = document.getElementById(_id) as HTMLTextAreaElement;
    c.focus();
    c.select();
    if (document.execCommand('copy')) {
      PxxxHelpers.ToastSuccess('', 'Copied ' + value);
    }
    document.body.removeChild(el);
  }

  /**
   * Substring a string with length and append ...
   * @example: subStringSmarter(item.newS_DESC, 110, ' ')
   */
  public static SubStringSmarter(str, length, substr) {
    if (str.length > length) {
      str = str.substr(0, length);
      const t = str.replace(/^\s+|\s+$/g, '').lastIndexOf(substr);
      if (t < str.length) {
        str = str.substr(0, t) + '...';
      }
    }
    return str;
  }
}
