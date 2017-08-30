import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MetManagerComponent } from './met-manager/met-manager.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpComponent } from './help/help.component';
import { StartPurchaseComponent } from './purchase/start-purchase/start-purchase.component';

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
  // Maybe these purchase modal routes should go in their own file?
  //
  {
    path: 'startpurchase',
    outlet: 'modal',
    component: StartPurchaseComponent
  },
  {
    path: 'met-manager',
    component: MetManagerComponent
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
