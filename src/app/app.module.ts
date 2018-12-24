import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './core/guards/authen.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PxxxTranslateModule } from '../framework/translate/translate.module';
import { PxxxImportMatModule } from '../framework/ui-partial/im-material.module';
import { PxxxPartialModule } from '../framework/ui-partial/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    PxxxTranslateModule.forRoot(),
    PxxxImportMatModule,
    HttpClientModule,
    PxxxPartialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
