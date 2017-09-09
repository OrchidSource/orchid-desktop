import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ChartJS from 'chart.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetManagerComponent } from './met-manager/met-manager.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PopoverModule } from 'ng2-pop-over';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HelpComponent,
    MetManagerComponent,
    NotificationsComponent,
    PurchasePaymentComponent,
    PurchaseConfirmationComponent,
    PurchaseStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
    PopoverModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
function MyCtrl($scope) {

    $scope.myvalue = false;

    $scope.showAlert = function(){
      $scope.myvalue = true;
    };
}
