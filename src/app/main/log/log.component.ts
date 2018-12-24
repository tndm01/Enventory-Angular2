import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SystemConstants } from '../../core/common/system.contants';
import { PxxxTableModel } from '../../../framework/ui-partial/pxxx-table/_models';
import { PxxxPaggingModel } from '../../../framework/ui-partial/pxxx-pagging/_models';
import { Helpers } from '../../core/_helper/helper';
import { PxxxEventEmmiter } from '../../../framework/ui-partial/pxxx-table/_helpers';
import { PxxxActionEnum } from '../../../framework/ui-partial/pxxx-table/_enum';
import { AuthenService } from '../../core/services/authen.service';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent
  implements OnInit, AfterViewInit {
  @ViewChild('pxxxTable')

  public _lstLog: any[];
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public baseFolder: String = SystemConstants.BASE_API;
  pxxxTableModel = new PxxxTableModel();
  pxxxPaggingModel = new PxxxPaggingModel();
  translate: any;

  constructor(
    private _dataService: DataService,
    public _authenService: AuthenService
    ) { }

  ngOnInit() {
    this.loadDataLog();
  }

  ngAfterViewInit(): void {

  }

  public loadDataLog() {
    this._dataService.get('/api/log/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        this._lstLog = response.Items;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadDataLog();
  }
}
