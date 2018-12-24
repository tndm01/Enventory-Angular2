import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { PxxxPaggingModel } from './_models';
import { PxxxHelpers } from '../../helper';
import { PxxxPaggingDefaultEnum } from './_enum';

@Component({
  selector: 'pxxx-pagging',
  templateUrl: './pxxx-pagging.component.html'
})
export class PxxxPaggingComponent implements OnChanges {
  @Input()
  pagging: PxxxPaggingModel;

  @Output()
  paggingEvent = new EventEmitter<PxxxPaggingModel>();

  PAGGING_MAX_ITEM = PxxxPaggingDefaultEnum.PAGGING_MAX_ITEM;
  listPages = [];
  display = '';
  constructor() {
    this.pagging = PxxxHelpers.IsDefined(this.pagging)
      ? this.pagging
      : new PxxxPaggingModel(
          PxxxPaggingDefaultEnum.PAGE_INDEX,
          PxxxPaggingDefaultEnum.PAGE_SIZE,
          PxxxPaggingDefaultEnum.TOTAL_RECORD,
          PxxxPaggingDefaultEnum.TOTAL_PAGE
        );

    this.setPagging();
  }

  ngOnChanges() {
    this.updateTotalPage();
    this.createListPage();

    this.setPagging();
  }

  /**
   * Raise event when change page size of select
   */
  changeSize() {
    this.pagging.PageIndex = 1;

    if (
      this.pagging.PageSize < PxxxPaggingDefaultEnum.MIN_PAGE_SIZE ||
      this.pagging.PageSize > PxxxPaggingDefaultEnum.MAX_PAGE_SIZE
    ) {
      this.pagging.PageSize =
        Math.abs(
          PxxxPaggingDefaultEnum.MIN_PAGE_SIZE - this.pagging.PageSize
        ) >
        Math.abs(PxxxPaggingDefaultEnum.MAX_PAGE_SIZE - this.pagging.PageSize)
          ? PxxxPaggingDefaultEnum.MAX_PAGE_SIZE
          : PxxxPaggingDefaultEnum.MIN_PAGE_SIZE;
    }
    this.changeData();
  }

  /**
   * Raise event when change page in list
   */
  changePage(__page) {
    const __tmp = this.pagging.PageIndex.toString();
    if (__page <= this.pagging.total_page && __page >= 1) {
      this.pagging.PageIndex = __page;
    } else {
      this.pagging.PageIndex = __page < 1 ? 1 : this.pagging.total_page;
    }
    if (__tmp !== this.pagging.PageIndex.toString() || __tmp === __page) {
      this.changeData();
    }
  }

  /**
   * Create number[] is list of page
   */
  createListPage() {
    const _start =
      this.pagging.PageIndex > 1 ||
      this.pagging.PageIndex - this.PAGGING_MAX_ITEM > 1
        ? this.pagging.PageIndex - 1
        : 1;

    const _lst = [_start];
    for (let i = _start + 1; i < _start + this.PAGGING_MAX_ITEM; i++) {
      if (i <= this.pagging.total_page) {
        _lst.push(i);
      }
    }
    this.listPages = _lst;
  }

  /**
   * Caculator total page
   */
  updateTotalPage() {
    this.pagging.calcTotalPage();
  }
  changeData() {
    this.paggingEvent.emit(this.pagging);
  }
  setPagging(_pagging?) {
    this.pagging = PxxxHelpers.IsDefined(_pagging) ? _pagging : this.pagging;
    this.updateTotalPage();
    this.createListPage();

    const __fromRecord =
      (this.pagging.PageIndex - 1) * this.pagging.PageSize + 1;
    const __toRecord =
      this.pagging.PageIndex * this.pagging.PageSize >
      this.pagging.total_record
        ? this.pagging.total_record
        : this.pagging.PageIndex * this.pagging.PageSize;

    this.display = `${__fromRecord} - ${__toRecord} / ${
      this.pagging.total_record
    } dòng`;
  }
}
