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
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('AutoComplete') AutoComplete: AutoComplete;

  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public imports: any[];

  public entity: any;
  public importDetails: any[] = [];
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
    this.loadDataImport();
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
    this._dataService.get('/api/import/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.importDetails = this.entity.ImportDetails;
      this.modalAddEdit.show();
    }, error => this._dataService.handleError(error));
  }

  public saveChange(valid: boolean) {
    if (this.importDetails.length == 0 || this.importDetails == null)
      return this._notificationService.printWarningMessage(MessageContstants.MESSAGEIMPORTDETAIL);
    if (valid) {
      if (this.entity.ImportId == undefined) {
        this._dataService.post('/api/import/add', JSON.stringify(this.entity)).subscribe((response) => {
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          this.loadDataImport();
        }, error => this._dataService.handleError(error));
      } else {
        this._dataService.post('/api/import/update', JSON.stringify(this.entity)).subscribe((response) => {
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          this.loadDataImport();
        }, error => this._dataService.handleError(error));
      }
    }
  }

  public addImportDetails() {
    var obj = this.importDetails.filter(item => item.ProductId === this.iEdit);
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
      var index = this.importDetails.map(function (data) { return data.ProductId; }).indexOf(this.iEditAllow);
      this.importDetails[index].ProductId = this.productId;
      this.importDetails[index].ProductName = this.productName;
      this.importDetails[index].ColorName = this.colorName;
      this.importDetails[index].SizeName = this.sizeName;
      this.importDetails[index].SizeCode = this.sizeCode;
      this.importDetails[index].ColorCode = this.colorCode;
      this.importDetails[index].SizeId = this.sizeId;
      this.importDetails[index].UnitName = this.unitName;
      this.importDetails[index].ColorId = this.colorId;
      this.importDetails[index].UnitId = this.unitId;
      this.importDetails[index].Quantity = this.entity.Quantity;
      this.importDetails[index].Price = this.entity.Price;
      this.importDetails[index].Total = this.entity.Total;
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
      this.importDetails.push(model);
      this.entity.ImportDetails = this.importDetails;
      if (this.importDetails.length > 0) {
        this.importDetails.forEach(item => {
          this.totalAllMoney += item.Total;
        });
      }
      this.entity.TotalAllMoney = this.totalAllMoney;
      this.clearValue();
      this.iID++;
    }
  }

  clearValueButtonAdd() {
    this.importDetails = [];
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
    this.importDetails = this.importDetails.filter(item => item.ID !== ID);
  }

  editItemById(ID: any) {
    this.iEdit = 0;
    //Set value in prime autocomplete
    var arrImportDetails = this.importDetails;
    var result = arrImportDetails.find(obj => {
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

  loadDataImport() {
    this._dataService.get('/api/import/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
        this.imports = response.Items;
      }, error => this._dataService.handleError(error));
  }

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadDataImport();
  }

  public deleteImport(id: string) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/import/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadDataImport();
      }, error => this._dataService.handleError(error));
    });
  }
}
