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
import { Ng2AutoCompleteComponent } from 'ng2-auto-complete';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public entity: any;
  public entityDetail: any;
  public productSearch: any;
  public colorSearch: any;
  public sizeSearch: any;
  public unitSearch: any;

  constructor(private _dataService: DataService) { }

  filteredProductsSingle: any[];
  filteredColorsSingle: any[];
  filteredSizesSingle: any[];
  filteredUnitsSingle: any[];

  ngOnInit() {
  }

  filterProductSingle(event) {
    let query = event.query;
    this._dataService.get('/api/product/SearchProductByKey?code=' + query).subscribe((response: any[]) => {
      this.productSearch = response;
      this.filteredProductsSingle = this.productSearch;
    });
  }

  filterColorSingle(event) {
    let query = event.query;
    this._dataService.get('/api/color/SearchColorByKey?code=' + query).subscribe((response: any[]) => {
      this.colorSearch = response;
      this.filteredColorsSingle = this.colorSearch;
    });
  }

  filterSizeSingle(event) {
    let query = event.query;
    this._dataService.get('/api/size/SearchSizeByKey?code=' + query).subscribe((response: any[]) => {
      this.sizeSearch = response;
      this.filteredSizesSingle = this.sizeSearch;
    });
  }
  
  filterUnitSingle(event) {
    let query = event.query;
    this._dataService.get('/api/unit/SearchUnitByKey?code=' + query).subscribe((response: any[]) => {
      this.unitSearch = response;
      this.filteredUnitsSingle = this.unitSearch;
    });
  }

  showAddModal(id: number) {
    this.entity = {};
    this.modalAddEdit.show();
  }

}
