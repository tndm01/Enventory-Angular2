import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.contants';
import { SystemConstants } from '../../core/common/system.contants';
import { DataService } from '../../core/services/data.service';
import { UploadService } from '../../core/services/upload.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { AuthenService } from '../../core/services/authen.service';
import { UtilityService } from '../../core/services/utility.service';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('avatar') avatar;

  public myRoles: string[] = [];
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public baseFolder: String = SystemConstants.BASE_API;

  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService,
    public _authencationService: AuthenService,
    private _utilityService:UtilityService  ) { 
      if(_authencationService.checkAccess('USER')==false){
        this._utilityService.navigateToLogin();
      }
    }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        this.users = response.Items;
      });
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.myRoles = [];
        this.myRoles = this.entity.Roles;
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format("DD/MM/YYYY");
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

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  saveChange(valid: boolean) {
    if (valid) {
      this.entity.Roles = this.myRoles;
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Avatar = imageUrl;
          }).then(() => {
            this.saveData();
          });
      }
      else {
        this.saveData();
      }
    }
  }

  saveData() {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    } else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  public deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      }, error => this._dataService.handleError(error));
    });
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value
  }

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format("DD/MM/YYYY");
  }
}
