import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { PxxxTableModel } from './_models';
import {
  PxxxTableSourceEnum,
  PxxxTableConfig
} from './_enum';
import { PxxxHelpers } from '../../helper/helpers';

import { Router } from '@angular/router';
import { PxxxPaggingModel } from '../pxxx-pagging/_models';
import { PxxxPaggingComponent } from '../pxxx-pagging/pxxx-pagging.component';
import { DataService } from '../../../app/core/services/data.service';

declare const mApp: any;
declare const $: any;

@Component({
  selector: 'pxxx-table',
  templateUrl: './pxxx-table.component.html'
})
export class PxxxTableComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('pxxxPagging')
  childPagging: PxxxPaggingComponent;
  @Input()
  data = new PxxxTableModel();
  @Output()
  callback = new EventEmitter();
  @Output()
  callback_column = new EventEmitter();
  @Output()
  done = new EventEmitter();

  datatable: any;
  id: string;
  totalRow: any[] = [];

  list: any[];
  pagging = new PxxxPaggingModel();
  MAX_BUTTON_IN_ROW = PxxxTableConfig.MAX_BUTTON_IN_ROW;

  constructor(
    private cdRef: ChangeDetectorRef,
    private _router: Router,
    private _dataService: DataService
  ) { }
  ngOnInit() {
    // PxxxScriptLoadHelper.loadScript('body', 'assets/app/js/ngx-table2.js');
  }
  ngAfterViewInit() {
    this.init();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (PxxxHelpers.IsDefined(this.datatable)) {
      this.datatable.destroy();
    }
  }

  init() {
    this.getData();

    if (PxxxHelpers.IsDefined(this.data.pagging)) {
      this.pagging = this.data.pagging;
    }

    this.init_sort();
  }

  init_sort() {
    if (
      PxxxHelpers.IsDefined(this.data.columns) &&
      this.data.columns.length > 0
    ) {
      // set default for each column before set from table
      this.data.columns.forEach(col => {
        col.sorting = 'asc';
        col.sort_clicked = false;
      });
    }
  }


  /**
   * Run when header having sort is click
   */
  sortTable(column) {
    if (this.data.showSort) {
      if (
        PxxxHelpers.IsDefined(column) &&
        column.hasOwnProperty('sortable') &&
        column['sortable'] === true &&
        !PxxxHelpers.IsNullorEmpty(column['sorting'])
      ) {
        column['sort_clicked'] = true;
        column['sorting'] = column['sorting'] === 'asc' ? 'desc' : 'asc';
        this.data.sort = {
          field: column['field'],
          value: column['sorting']
        };

        this.refresh();
      }
    }
  }

  onPageChange(_event: PxxxPaggingModel) {
    this.pagging = _event;
    this.getData();
  }
  resetPagging(_data: any) {
    if (PxxxHelpers.IsDefined(_data)) {
      this.pagging.total_record = PxxxHelpers.IsDefined(_data.TotalRows)
        ? _data.TotalRows
        : 0;
    } else {
      this.pagging = new PxxxPaggingModel();
    }
    if (PxxxHelpers.IsDefined(this.childPagging)) {
      this.childPagging.setPagging(this.pagging);
    }
  }

  /**
   * Get Data from api or using local data by resource enum
   */
  getData() {
    switch (this.data.type) {
      case PxxxTableSourceEnum.Local:
        break;
      default:
        this.getDataRemote();
        break;
    }
  }
  getDataRemote() {
    debugger
    let _linkUse = this.data.apiName;
    // let __obj = this._session.getDefaultObj(_linkUse);
    //   __obj.pz = this.pagging.page_size;
    //   __obj.pi = this.pagging.page_index;
    //   __obj.so = this.data.sort.value;
    //   __obj.sb = this.data.sort.field;
    //   __obj = Object.assign(__obj, this.data.params);

    this._dataService.get('/api/' + _linkUse + '/getall?page=' + this.pagging.PageIndex + '&pageSize=' + this.pagging.PageSize + '&filter=' + this.data.filter)
      .subscribe((response: any) => {
          this.list = response.Items;
          this.list = this.addRowButton(this.list);
          this.resetPagging(response);
      }, error => this._dataService.handleError(error));
    // this._http.postData(__obj, {
    //   success: (res: any) => {
    //     if (res.co === PxxxEnum.API_RESULT.NoData) {
    //       this.list = [];
    //       this.resetPagging(null);
    //     } else {
    //       this.list = res.dt.obj;
    //       this.list = this.addRowButton(this.list);
    //       this.resetPagging(res.dt);
    //     }

    //     /**
    //      * This code using jquery
    //      */
    //     // this.initSub();

    //     this.initTotal();

    //     this.done.emit(true);
    //   },
    //   error: error => { },
    //   complete: () => { },
    //   begin: () => { }
    // });
  }

  /**
   * Init total row in bottom of table
   * Use header with total: true, check data is number to total
   */
  initTotal() {
    this.totalRow = [];
    if (
      this.data.hasOwnProperty('columns') &&
      PxxxHelpers.IsDefined(this.data.columns) &&
      Array.isArray(this.data.columns)
    ) {
      this.data.columns.forEach((column, _index) => {
        // List of map value
        const _lst = this.list.map(t => t[column.field]);

        if (_lst.length > 0) {
          // Total all value
          const _sum = _lst.reduce((a, b) => {
            return a + b;
          });

          const avg = Math.floor(_sum / _lst.length);

          if (column.hasOwnProperty('total') && column.total) {
            if (PxxxHelpers.IsDefined(_lst)) {
              this.totalRow.push(PxxxHelpers.FormatNumber(_sum));
            } else {
              this.totalRow.push('');
            }
          }

          if (column.hasOwnProperty('average') && column.average) {
            this.totalRow[_index] =
              this.totalRow[_index] +
              ' (Avg: ' +
              PxxxHelpers.FormatNumber(avg) +
              ')';
          }
        } else {
          this.totalRow.push('');
        }
      });
    }
  }

  /**
   * Refresh table
   * @param customFilter pass new param to table
   */
  refresh(customFilter?: any) {
    if (PxxxHelpers.IsDefined(customFilter)) {
      const _tmp = Object.assign(this.data.params, customFilter);

      this.data.params = _tmp;
    }

    this.getData();
  }

  /**
   * Callback with type of action
   * @param _type Type of button
   * @param _data Data of row to call with action
   */
  reCall(_type, _data) {
    if (_data) {
      _data.__typeOfAction = _type;
      this.callback.emit(_data);
    }
  }

  /**
   * Callback with type of action in each column
   * @param _type Type of button
   * @param _data Data of row to call with action
   * @param _indexOfColumn Index of column in list
   */
  reCall_OnColumn(_type, _data, _indexOfColumn) {
    if (_data) {
      _data.__typeOfAction = _type;
      _data.__indexOfColumn = _indexOfColumn;
      this.callback_column.emit(_data);
    }
  }

  // #region Row in toogle
  /**
   * Get button for each row data
   * Having use permisson + row data + events header
   * @param row Row in record
   * @param type 1: get Actions in normal, 2: get Action in dropdowns
   */
  getButtonsInRow(
    row: any
  ): {
      Buttons: any[];
      ButtonInDrop: any[];
    } {
    const _res = {
      Buttons: [],
      ButtonInDrop: []
    };
    /**
     * button show in normal
     */
    if (
      row.hasOwnProperty('Actions') &&
      PxxxHelpers.IsDefined(row.Actions) &&
      PxxxHelpers.IsDefined(this.data['events'])
    ) {
      row.Actions.forEach((_act, _index) => {
        /**
         * Check button from the list
         */
        const __buttons = this.data.events.filter(t => t.action === _act);
        /**
         * Check button from perssmion
         */

        if (__buttons.length > 0) {
          if (__buttons[0].forceInDrop || _index > this.MAX_BUTTON_IN_ROW) {
            _res.ButtonInDrop.push(__buttons[0]);
          } else {
            _res.Buttons.push(__buttons[0]);
          }
        }
      });
    }
    return _res;
  }
  addRowButton(_list: any[]): any[] {
    if (_list.length > 0) {
      _list.forEach(
        val => (val = Object.assign(val, this.getButtonsInRow(val)))
      );
    }
    return _list;
  }

  toggleRowButton(__rowIndex) {
    const _ele = document.getElementById('toggleBtns__' + __rowIndex);

    if (PxxxHelpers.IsDefined(_ele)) {
      if (_ele.style.display === 'none') {
        _ele.style.display = 'block';
      } else {
        _ele.style.display = 'none';
      }
    }
  }
  // #endregion
}
