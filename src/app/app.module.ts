import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetManagerComponent } from './met-manager/met-manager.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PurchaseHowToComponent } from './purchase/purchase-how-to/purchase-how-to.component';
import { SellHowToComponent } from './sell/sell-how-to/sell-how-to.component';

import { ConfigService } from "./config-service/config.service"
import { InternationalizationService } from "./internationalization-service/internationalization.service"

import { PopoverModule } from 'ng2-pop-over';
import { NgIf } from '@angular/common';

// Indicates where the translation files live
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/translations/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HelpComponent,
    MetManagerComponent,
    AboutComponent,
    PurchasePaymentComponent,
    PurchaseConfirmationComponent,
    PurchaseHowToComponent,
    SellHowToComponent,
    PurchaseStartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    PopoverModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ConfigService, InternationalizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// function MyCtrl($scope) {
//
//     $scope.myvalue = false;
//     $scope.showAlert = function(){
//       $scope.myvalue = true;
//     };
// }
