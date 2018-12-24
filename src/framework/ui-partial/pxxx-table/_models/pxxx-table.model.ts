import { PxxxEventEmmiter } from '../_helpers';
import { PxxxTableSourceEnum } from '../_enum';
import { PxxxPaggingModel } from '../../pxxx-pagging/_models';

export class PxxxTableModel {
  id: string;
  apiName: string;
  type: PxxxTableSourceEnum;
  events: PxxxEventEmmiter[];
  params: any;
  data: any;
  checkColumn: boolean;
  selecteds: any[];
  columns: any;
  checkAuthentication = true;
  checkAuthorization = true;
  callback: any;
  showSort: boolean;
  showButton: boolean;
  showSelection: boolean;
  showPagging: boolean;
  pagging: PxxxPaggingModel;
  filter: string = '';

  /**
   * Show UserColumn
   */
  showUser: boolean;
  sort = {
    field: '',
    value: 'asc'
  };

  constructor() {
    this.showSort = true;
    this.showPagging = true;
    this.showButton = true;
    this.showSelection = true;
    this.showUser = true;
  }
}
