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
    this.getTransactions();
    this.orcBalance = this.walletService.getOctBalance();
    this.usdBalance = this.walletService.getUSDBalance();
    // todo: set backed up state;
  }

  getTransactions(): object[] {
    // mock up transaction data for now
    return this.walletService.getTransactions();
  }

}
