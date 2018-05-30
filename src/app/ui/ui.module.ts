/**
 * Module that contains user interface things
 *
 * TODO: move all of this to the OrcuiModule
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToggleComponent } from './toggle/toggle.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { WalletQrComponent } from './wallet-qr/wallet-qr.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RadioComponent, ToggleComponent, WorldMapComponent, WalletQrComponent],
  exports: [RadioComponent, ToggleComponent, WorldMapComponent, WalletQrComponent]
})
export class UiModule { }
