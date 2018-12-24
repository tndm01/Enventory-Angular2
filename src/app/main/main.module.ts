import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { SignalrService } from '../core/services/signalr.service';
import { PxxxPartialModule } from '../../framework/ui-partial/ui.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(mainRoutes),
    PxxxPartialModule,
    TranslateModule
  ],
  declarations: [
    MainComponent, 
    SidebarMenuComponent, 
    TopMenuComponent
  ],
  providers:
    [
      UtilityService,
      AuthenService,
      SignalrService
    ],
})
export class MainModule { }
