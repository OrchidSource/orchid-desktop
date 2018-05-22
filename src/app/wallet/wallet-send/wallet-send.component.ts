import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from "../../wallet.service";

@Component({
  selector: 'app-wallet-send',
  templateUrl: './wallet-send.component.html',
  styleUrls: ['./wallet-send.component.scss']
})
export class WalletSendComponent implements OnInit {

  constructor(private router: Router, private walletService: WalletService) { }

  octBalance: number;
  sendAmount: number;
  sendAmountDollars: number;

  ngOnInit() {
    this.octBalance = this.walletService.getOctBalance();
    this.sendAmount = this.octBalance;
    this.sendAmountDollars = this.walletService.octInDollars(this.octBalance);
  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
