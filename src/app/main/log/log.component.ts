import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SystemConstants } from '../../core/common/system.contants';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private _dataService: DataService) { }
  public listLog: any[];
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public baseFolder: String = SystemConstants.BASE_API;

  ngOnInit() {
    this.loadDataLog();
  }

  public loadDataLog() {
    this._dataService.get('/api/log/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        console
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        this.listLog = response.Items;
      });
  }

}
