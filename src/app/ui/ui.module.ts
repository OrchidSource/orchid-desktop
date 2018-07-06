/**
 * Module that contains user interface things
 *
 * TODO: move all of this to the OrcuiModule
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WalletQrComponent } from './wallet-qr/wallet-qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [WalletQrComponent],
  exports: [WalletQrComponent]
})
export class UiModule { }
