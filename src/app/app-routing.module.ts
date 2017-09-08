import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MetManagerComponent } from './met-manager/met-manager.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';

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
    path: 'met-manager',
    component: MetManagerComponent,
    children: [
      {
        path: 'purchase-start',
        outlet: 'met-manager-modal',
        component: PurchaseStartComponent
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
    path: 'notifications',
    component: NotificationsComponent
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
