/**
 * Component that contains user interface things
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToggleComponent } from './toggle/toggle.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { WalletQrComponent } from './wallet-qr/wallet-qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ToggleComponent, WorldMapComponent, WalletQrComponent],
  exports: [ToggleComponent, WorldMapComponent, WalletQrComponent]
})
export class UiModule { }
