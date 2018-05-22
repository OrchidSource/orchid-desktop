import { Component, OnInit } from '@angular/core';
import { WalletService } from "../wallet.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  transactions: Array<object> = [];
  orcBalance: number;
  usdBalance: number;
  walletBackedUp: boolean = false;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.transactions = this.walletService.getTransactions();
    this.orcBalance = this.walletService.getOctBalance();
    this.usdBalance = this.walletService.getUSDBalance();

    this.walletBackedUp = !!window.localStorage.getItem('WALLET_BACKED_UP');
  }

  setWalletBackedUp() {
    this.walletBackedUp = true;
    !window.localStorage.setItem('WALLET_BACKED_UP', 'T');
  }

}
