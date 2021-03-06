import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.contants';
import { UrlConstants } from '../core/common/url.contants';
import { UtilityService } from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';
import {LoggedInUser} from '../core/domain/loggedin.user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public baseFolder: string = SystemConstants.BASE_API;
  public user: LoggedInUser;
  constructor(private utilityService: UtilityService,private authenService : AuthenService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

  logout(){
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }

}
