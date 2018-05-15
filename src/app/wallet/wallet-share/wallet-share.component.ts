import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-wallet-share',
  templateUrl: './wallet-share.component.html',
  styleUrls: ['./wallet-share.component.scss']
})
export class WalletShareComponent implements OnInit {

  balance: number;

  constructor(private router: Router, private walletService: WalletService) { }

  ngOnInit() {
    this.balance = this.walletService.getOctBalance()
  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
