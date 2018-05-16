import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, Routes, RouterModule, RouterStateSnapshot } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsLayoutComponent } from './settings/settings-layout/settings-layout.component';
import { SettingsConnectionComponent } from './settings/settings-connection/settings-connection.component';
import { SettingsWalletComponent } from './settings/settings-wallet/settings-wallet.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletSetupBeginComponent } from './wallet/wallet-setup-begin/wallet-setup-begin.component';
import { WalletBackupComponent } from './wallet/wallet-backup/wallet-backup.component';
import { WalletSendComponent } from './wallet/wallet-send/wallet-send.component';
import { WalletShareComponent } from './wallet/wallet-share/wallet-share.component';
import { WalletReceiveComponent } from './wallet/wallet-receive/wallet-receive.component';
import { PurchaseStartComponent } from './purchase/purchase-start/purchase-start.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseConfirmationComponent } from './purchase/purchase-confirmation/purchase-confirmation.component';
import { PurchaseHowToComponent } from './purchase/purchase-how-to/purchase-how-to.component';
import { SellHowToComponent } from './sell/sell-how-to/sell-how-to.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FirstLaunchComponent } from './first-launch/first-launch.component';
import { FirstRunGuardService } from './first-run-guard.service';


/**
 * CanActivate to determine whether to show the first-launch screens
 */
//  @Injectable({
//     providedIn: 'root'
//  })
// class FirstRunService implements CanActivate {
//
//   constructor(
//     private router: Router
//   ) {}
//
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     console.log('firstRun?????')
//     /* TODO: use proper settings location */
//     const  firstRunRan = window.localStorage.getItem('FIRST_RUN_RAN');
//     if (firstRunRan) {
//       return true;
//     } else {
//       this.router.navigate(['/first-launch']);
//       return false;
//     }
//   }
// }

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
        component: DashboardComponent,
        canActivate: [FirstRunGuardService]
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'settings',
        component: SettingsLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'connection',
            pathMatch: 'full'
          },
          {
            path: 'connection',
            component: SettingsConnectionComponent
          },
          {
            path: 'wallet',
            component: SettingsWalletComponent
          },
          {
            path: 'advanced',
            component: SettingsAdvancedComponent
            }
        ]
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
    path: 'wallet-receive',
    component: WalletReceiveComponent,
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
