import { Component, Input, OnInit } from '@angular/core';

/**
 * Component for showing a wallet's QR code.
 *
 * To use:
 *   <ui-wallet-qr [walletAddress]="wallet_address"></ui-wallet-qr>
 */
@Component({
  selector: 'ui-wallet-qr',
  templateUrl: './wallet-qr.component.html',
  styleUrls: ['./wallet-qr.component.scss']
})
export class WalletQrComponent implements OnInit {

  @Input() walletAddress: string;
  constructor() { }

  ngOnInit() {
    if (!this.walletAddress) {
      console.warn('ui-wallet-qr: missing walletAddress argument');
    }
    console.warn("TODO: wallet-qr not yet implemented");
  }

}
