
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
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
import { AutoComplete } from 'primeng/primeng';
import { $ } from '../../../../node_modules/protractor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('AutoComplete') AutoComplete: AutoComplete;

  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public exports: any[];

  public entity: any;
  public exportDetails: any[] = [];
  public productSearch: any;
  public colorSearch: any;
  public sizeSearch: any;
  public unitSearch: any;
  public supplierSearch: any;

  public productName: any;
  public productId: any;
  public productCode: any;

  public colorName: any;
  public colorId: any;
  public colorCode: any;

  public sizeName: any;
  public sizeId: any;
  public sizeCode: any;

  public unitName: any;
  public unitId: any;

  public suggestionProduct: any;
  public suggestionColor: any;
  public suggestionSize: any;
  public suggestionUnit: any;
  public suggestionSupplier: any;

  public iID: any = 1;
  public iEdit: any = 0;
  public iEditAllow: any = 0;
  public totalAllMoney: number = 0;

  constructor(private _dataService: DataService, private _notificationService: NotificationService) {
  }
  @ViewChild('autoProduct') autoProduct: AutoComplete;
  @ViewChild('autoColor') autoColor: AutoComplete;
  @ViewChild('autoSize') autoSize: AutoComplete;
  @ViewChild('autoUnit') autoUnit: AutoComplete;
  @ViewChild('autoSupplier') autoSupplier: AutoComplete;

  filteredProductsSingle: any[];
  filteredColorsSingle: any[];
  filteredSizesSingle: any[];
  filteredUnitsSingle: any[];
  filteredSuppliersSingle: any[];

  ngOnInit() {
    this.loadDataexport();
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
    this.entity.ReferenceCode = Math.random().toString(36).substr(2, 5).toUpperCase() + Math.floor(Math.random() * 1000) + 1;
    this.entity.CreatedAt = new Date().toLocaleString("vi-VN");
    this.entity.Code = Math.floor(Math.random() * 100000) + 100;
    this.clearValueButtonAdd();
    this.modalAddEdit.show();
  }

  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/export/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.exportDetails = this.entity.exportDetails;
      this.modalAddEdit.show();
    }, error => this._dataService.handleError(error));
  }

  public saveChange(valid: boolean) {
    if (this.exportDetails.length == 0 || this.exportDetails == null)
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEEXPORTDETAIL);
    if (valid) {
      if (this.entity.exportId == undefined) {
        this._dataService.post('/api/export/add', JSON.stringify(this.entity)).subscribe((response) => {
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          this.loadDataexport();
        }, error => this._dataService.handleError(error));
      } else {
        this._dataService.post('/api/export/update', JSON.stringify(this.entity)).subscribe((response) => {
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          this.loadDataexport();
        }, error => this._dataService.handleError(error));
      }
    }
  }

  public addexportDetails() {
    var obj = this.exportDetails.filter(item => item.ProductId === this.iEdit);
    if (obj.length > 0) {
      this.productName = obj[0].ProductName == undefined ? this.productName : obj[0].ProductName;
      this.colorName = obj[0].ColorName == undefined ? this.colorName : obj[0].ColorName;
      this.sizeName = obj[0].SizeName == undefined ? this.sizeName : obj[0].SizeName;
      this.unitName = obj[0].UnitName == undefined ? this.unitName : obj[0].UnitName;
    }
    if (this.productName == undefined || this.productName == "")
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEPRODUCTNAME);
    if (this.colorName == undefined || this.colorName == "")
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGECOLORNAME);
    if (this.sizeName == undefined || this.sizeName == "")
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGESIZENAME);
    if (this.unitName == undefined || this.unitName == "")
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEUNIT);
    if (this.entity.Quantity == null)
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEQUANTITY);
    if (this.entity.Price == null)
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEPRICE);

    if (obj.length > 0) {
      var index = this.exportDetails.map(function (data) { return data.ProductId; }).indexOf(this.iEditAllow);
      this.exportDetails[index].ProductId = this.productId;
      this.exportDetails[index].ProductName = this.productName;
      this.exportDetails[index].ColorName = this.colorName;
      this.exportDetails[index].SizeName = this.sizeName;
      this.exportDetails[index].SizeCode = this.sizeCode;
      this.exportDetails[index].ColorCode = this.colorCode;
      this.exportDetails[index].SizeId = this.sizeId;
      this.exportDetails[index].UnitName = this.unitName;
      this.exportDetails[index].ColorId = this.colorId;
      this.exportDetails[index].UnitId = this.unitId;
      this.exportDetails[index].Quantity = this.entity.Quantity;
      this.exportDetails[index].Price = this.entity.Price;
      this.exportDetails[index].Total = this.entity.Total;
      this.clearValue();
    } else {
      var model = {
        ID: this.iID,
        ProductId: this.productId,
        ProductName: this.productName,
        ProductCode: this.productCode,
        ColorName: this.colorName,
        ColorId: this.colorId,
        ColorCode: this.colorCode,
        SizeName: this.sizeName,
        SizeCode: this.sizeId,
        UnitName: this.unitName,
        UnitId: this.unitId,
        Quantity: this.entity.Quantity,
        Price: this.entity.Price,
        Total: this.entity.Total,
      }
      this.exportDetails.push(model);
      this.entity.exportDetails = this.exportDetails;
      if (this.exportDetails.length > 0) {
        this.exportDetails.forEach(item => {
          this.totalAllMoney += item.Total;
        });
      }
      this.entity.TotalAllMoney = this.totalAllMoney;
      this.clearValue();
      this.iID++;
    }
  }

  clearValueButtonAdd() {
    this.exportDetails = [];
    this.suggestionSupplier = null;
    if (this.autoSupplier != undefined)
      this.autoSupplier.inputFieldValue = "";
  }

  clearValue() {
    this.suggestionProduct = null;
    this.suggestionColor = null;
    this.suggestionSize = null;
    this.suggestionUnit = null;

    if (this.autoProduct != undefined)
      this.autoProduct.inputFieldValue = "";
    if (this.autoColor != undefined)
      this.autoColor.inputFieldValue = "";
    if (this.autoSize != undefined)
      this.autoSize.inputFieldValue = "";
    if (this.autoUnit != undefined)
      this.autoUnit.inputFieldValue = "";

    this.productId = 0;
    this.productName = '';
    this.colorId = 0;
    this.colorName = '';
    this.sizeId = 0;
    this.sizeName = '';
    this.unitId = 0;
    this.unitName = '';
    this.entity.Quantity = 0;
    this.entity.Price = 0;
    this.entity.Total = 0;
  }

  public getSupplierAutocomplete(event) {
    this.entity.SupplierName = event.Name;
    this.entity.SupplierId = event.ID;
    this.entity.Address = event.Address;
  }

  public getProductAutocomplete(event) {
    this.productName = event.Name;
    this.productId = event.ProductId;
    this.productCode = event.Code;
  }

  public getColorAutocomplete(event) {
    this.colorName = event.Name;
    this.colorId = event.ID;
    this.colorCode = event.ColorCode;
  }

  public getSizeAutocomplete(event) {
    this.sizeName = event.Name;
    this.sizeId = event.ID;
    this.sizeCode = event.SizeCode;
  }

  public getUnitAutocomplete(event) {
    this.unitName = event.Name;
    this.unitId = event.UnitId;
  }

  public onKeyTotal(event) {
    this.entity.Total = (this.entity.Price) * (this.entity.Quantity);
  }

  deleteItemById(ID: any) {
    this.exportDetails = this.exportDetails.filter(item => item.ID !== ID);
  }

  editItemById(ID: any) {
    this.iEdit = 0;
    //Set value in prime autocomplete
    var arrexportDetails = this.exportDetails;
    var result = arrexportDetails.find(obj => {
      return obj.ID === ID
    });
    this.productId = result.ProductId;
    this.iEdit = result.ProductId;
    this.iEditAllow = result.ProductId;
    if (result.ProductName != undefined)
      this.autoProduct.inputFieldValue = result.ProductName;
    if (result.ColorName != undefined)
      this.autoColor.inputFieldValue = result.ColorName;
    if (result.SizeName != undefined)
      this.autoSize.inputFieldValue = result.SizeName;
    if (result.UnitName != undefined)
      this.autoUnit.inputFieldValue = result.UnitName;
    this.entity.Quantity = result.Quantity;
    this.entity.Price = result.Price;
    this.entity.Total = result.Total;
  }

  loadDataexport() {
    this._dataService.get('/api/export/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        this.exports = response.Items;
      }, error => this._dataService.handleError(error));
  }

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadDataexport();
  }

  public deleteexport(id: string) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/export/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadDataexport();
      }, error => this._dataService.handleError(error));
    });
  }
}
