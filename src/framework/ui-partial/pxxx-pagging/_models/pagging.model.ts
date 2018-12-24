import { PxxxPaggingDefaultEnum } from '../_enum';

export class PxxxPaggingModel {
  PageIndex: number;
  PageSize: number;
  total_page: number;
  total_record: number;

  constructor(
    __page?: number,
    __PageSize?: number,
    __total_record?: number,
    __total_page?: number,
  ) {
    this.PageIndex =
      __page == null || __page === undefined
        ? PxxxPaggingDefaultEnum.PAGE_INDEX
        : __page;
    this.PageSize =
      __PageSize == null || __PageSize === undefined
        ? PxxxPaggingDefaultEnum.PAGE_SIZE
        : __PageSize;
    this.total_record =
      __total_record == null || __total_record === undefined
        ? PxxxPaggingDefaultEnum.TOTAL_RECORD
        : __total_record;

    this.calcTotalPage();
  }

  calcTotalPage() {
    this.total_page = Math.ceil(
      this.total_record / (this.PageSize === 0 ? 1 : this.PageSize)
    );
  }

  toShort() {
    return {
      pi: this.PageIndex,
      pz: this.PageSize
    };
  }
}
