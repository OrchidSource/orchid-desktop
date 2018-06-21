import { Component, OnInit } from '@angular/core';
import { WalletService } from "../wallet.service";
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: [
    trigger('walletBackupSlideClosed', [
      transition(
        ':enter',
        [
          style({
            'transform': 'translateX(100%)'
          }),
          animate('400ms ease-out')
        ]
      ),
      transition(
        ':leave',
        [
          animate('400ms ease-out', style({ transform: 'translateX(100%)' }))
        ]
      )
    ])
  ]
})
export class WalletComponent implements OnInit {

  transactions: Array<object> = [];
  orcBalance: number;
  usdBalance: number;
  walletBackedUp: boolean = false;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.transactions = this.walletService.getTransactions();
    this.orcBalance = this.walletService.getOctBalance();
    this.usdBalance = this.walletService.getUSDBalance();

    this.walletBackedUp = !!window.localStorage.getItem('WALLET_BACKED_UP');
  }

  setWalletBackedUp() {
    this.walletBackedUp = true;
    window.localStorage.setItem('WALLET_BACKED_UP', 'T');
  }

}
