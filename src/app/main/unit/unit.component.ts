import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.contants';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public units: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/unit/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.pageIndex = response.PageIndex;
        this.units = response.Items;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }

  public showEdit(id: any) {
    this._dataService.get('/api/unit/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.modalAddEdit.show();
    }, error => this._dataService.handleError(error));
  }

  saveData(valid: boolean) {
    if (valid) {
      if (this.entity.UnitId == undefined) {
        this._dataService.post('/api/unit/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        });
      }
      else {
        this._dataService.put('/api/unit/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
    }
  }

  public deleteItem(id:string){
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,()=>{
      this._dataService.delete('/api/unit/delete','id',id).subscribe((response:any)=>{
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      },error => this._dataService.handleError(error));
    });
  }
}     