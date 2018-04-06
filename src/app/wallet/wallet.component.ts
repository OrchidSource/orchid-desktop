import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  transactions: Array<object> = [];
  constructor() {}

  ngOnInit() {
    this.getTransactions();
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
