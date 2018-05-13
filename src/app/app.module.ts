import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Chart from 'chart.js';
// import * as currency_codes from 'currency-codes';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PurchaseHowToComponent } from './purchase/purchase-how-to/purchase-how-to.component';
import { SellHowToComponent } from './sell/sell-how-to/sell-how-to.component';

import { ConfigService } from "./config-service/config.service";
import { WalletService } from "./wallet.service";
import { InternationalizationService } from "./internationalization-service/internationalization.service";
import { OrchidNetService } from "./orchid-net/orchid-net.service";

import { PopoverModule } from 'ng2-pop-over';
import { NgIf } from '@angular/common';
import { WalletComponent } from './wallet/wallet.component';
import { WalletSetupBeginComponent } from './wallet/wallet-setup-begin/wallet-setup-begin.component';
import { UiModule } from './ui/ui.module';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FirstLaunchComponent } from './first-launch/first-launch.component';
import { WalletBackupComponent } from './wallet/wallet-backup/wallet-backup.component';
import { WalletSendComponent } from './wallet/wallet-send/wallet-send.component';
import { WalletShareComponent } from './wallet/wallet-share/wallet-share.component';
import { WalletReceiveComponent } from './wallet/wallet-receive/wallet-receive.component';
import { SettingsLayoutComponent } from './settings/settings-layout/settings-layout.component';
import { SettingsConnectionComponent } from './settings/settings-connection/settings-connection.component';
import { SettingsWalletComponent } from './settings/settings-wallet/settings-wallet.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';

// Indicates where the translation files live
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/translations/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PurchasePaymentComponent,
    PurchaseConfirmationComponent,
    PurchaseHowToComponent,
    SellHowToComponent,
    PurchaseStartComponent,
    WalletComponent,
    MainNavigationComponent,
    FirstLaunchComponent,
    WalletSetupBeginComponent,
    WalletBackupComponent,
    WalletSendComponent,
    WalletShareComponent,
    WalletReceiveComponent,
    SettingsLayoutComponent,
    SettingsConnectionComponent,
    SettingsWalletComponent,
    SettingsAdvancedComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    PopoverModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    UiModule
  ],
  providers: [
    ConfigService,
    InternationalizationService,
    OrchidNetService,
    WalletService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
