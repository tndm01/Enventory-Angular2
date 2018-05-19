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
  public product:any;

  constructor(private _dataService: DataService) { }

  filteredCountriesSingle: any[];
  filteredProductsSingle: any[];

  BOOKS: any[] = [
    { 'id': 1, 'store_id': 1, 'Name': 'Áo thun nam tay dài' },
    { 'id': 2, 'store_id': 1, 'Name': 'Áo thun nam tay ngắn ' },
    { 'id': 3, 'store_id': 2, 'Name': 'Virgin Islands, British' },
    { 'id': 4, 'store_id': 2, 'Name': 'Venezuela' }
  ];

  ngOnInit() {
  }

  filterCountrySingle(event) {
    let query = event.query;
    this.filteredCountriesSingle = this.BOOKS.filter(x => x.Name.includes(query));
  }

  filterProductSingle(event) {
    let query = event.query;
    this._dataService.get('/api/product/SearchProductByKey?code=' + query).subscribe((response:any[]) => {
      this.productSearch = response;
      this.filteredProductsSingle = this.productSearch;
    });
  }
  
  showAddModal(id: number) {
    this.entity = {};
    this.modalAddEdit.show();
  }

}
