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

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.getTransactions();
    this.orcBalance = this.walletService.getOrcBalance();
    this.usdBalance = this.walletService.getUSDBalance();
  }

  getTransactions() {
    // mock up transaction data for now

    var today = new Date();

    for (let i = 0; i < 10; i ++) {
      this.transactions.push({
        from: 'X09HS7GHFFIDXIANGIA',
        to: 'F10HW40HFFIGXIACQIA',
        status: (i % 2) ? 'sent' : 'received',
        amount: 1 + i * 10.25,
        date: new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDay() - i)
      })
    }

  }

}
