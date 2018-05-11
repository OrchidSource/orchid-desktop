import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletSetupBeginComponent } from './wallet/wallet-setup-begin/wallet-setup-begin.component';
import { WalletBackupComponent } from './wallet/wallet-backup/wallet-backup.component';
import { WalletSendComponent } from './wallet/wallet-send/wallet-send.component';
import { WalletShareComponent } from './wallet/wallet-share/wallet-share.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PurchaseHowToComponent } from './purchase/purchase-how-to/purchase-how-to.component';
import { SellHowToComponent } from './sell/sell-how-to/sell-how-to.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FirstLaunchComponent } from './first-launch/first-launch.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainNavigationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
    ]
  },
  {
    path: 'first-launch',
    component: FirstLaunchComponent
  },
  {
    path: 'wallet-setup-begin',
    component: WalletSetupBeginComponent,
    outlet: 'modal'
  },
  {
    path: 'wallet-backup',
    component: WalletBackupComponent,
    outlet: 'modal'
  },
  {
    path: 'wallet-send',
    component: WalletSendComponent,
    outlet: 'modal'
  },
  {
    path: 'wallet-share',
    component: WalletShareComponent,
    outlet: 'modal'
  },
  {
    path: '**',
    redirectTo: 'main/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
