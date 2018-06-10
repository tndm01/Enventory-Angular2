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
  public detailImports: any[] = [];
  public productSearch: any;
  public colorSearch: any;
  public sizeSearch: any;
  public unitSearch: any;
  public supplierSearch: any;
  public productName: any;
  public productId: any;
  public colorName: any;
  public colorId: any;
  public sizeName: any;
  public sizeId: any;
  public unitName: any;
  public unitId: any;
  public supplierName: any;
  public supplierId: any;
  public test:string = '';

  constructor(private _dataService: DataService) { }

  filteredProductsSingle: any[];
  filteredColorsSingle: any[];
  filteredSizesSingle: any[];
  filteredUnitsSingle: any[];
  filteredSuppliersSingle: any[];

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

  filterSupplierSingle(event) {
    let query = event.query;
    this._dataService.get('/api/supplier/SearchSupplierByKey?code=' + query).subscribe((response: any[]) => {
      this.supplierSearch = response;
      this.filteredSuppliersSingle = this.supplierSearch;
    });
  }

  showAddModal(id: number) {
    this.entity = {};
    this.modalAddEdit.show();
  }

  public saveChange(valid: boolean) {
    if(this.detailImports.length != 0){
      console.log("2", this.entity);
    }
  }

  public addImportDetails() {
    var model = {
      ProductId: this.productId,
      ProductName: this.productName,
      ColorName: this.colorName,
      ColorId: this.colorId,
      SizeName: this.sizeName,
      SizeCode: this.sizeId,
      UnitName: this.unitName,
      UnitId: this.unitId,
      Quantity: this.entity.Quantity,
      Price: this.entity.Price,
      Total: this.entity.Total
    }
    this.detailImports.push(model);
    this.entity.DetailImports = this.detailImports;
  }

  public getSupplierAutocomplete(event) {
    this.supplierName = event.Name;
    this.supplierId = event.ID;
  }

  public getProductAutocomplete(event) {
    this.productName = event.Name;
    this.productId = event.ProductId;
  }

  public getColorAutocomplete(event) {
    this.colorName = event.Name;
    this.colorId = event.ID;
  }

  public getSizeAutocomplete(event) {
    this.sizeName = event.Name;
    this.sizeId = event.ID;
  }

  public getUnitAutocomplete(event) {
    this.unitName = event.Name;
    this.unitId = event.UnitId;
  }
}
