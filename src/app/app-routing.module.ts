import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { WalletComponent } from './wallet/wallet.component';
import { MetManagerComponent } from './met-manager/met-manager.component';
import { HelpComponent } from './help/help.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PurchaseHowToComponent } from './purchase/purchase-how-to/purchase-how-to.component';
import { SellHowToComponent } from './sell/sell-how-to/sell-how-to.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
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
  {
    path: 'met-manager',
    component: MetManagerComponent,
    children: [
      {
        path: 'purchase-start',
        outlet: 'met-manager-modal',
        component: PurchaseStartComponent
      },
      {
        path: 'purchase-how-to',
        outlet: 'met-manager-modal',
        component: PurchaseHowToComponent
      },
      {
        path: 'sell-how-to',
        outlet: 'met-manager-modal',
        component: SellHowToComponent
      },
      {
        path: 'purchase-payment',
        outlet: 'met-manager-modal',
        component: PurchasePaymentComponent
      },
      {
        path: 'purchase-confirmation',
        outlet: 'met-manager-modal',
        component: PurchaseConfirmationComponent
      }
    ]
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
