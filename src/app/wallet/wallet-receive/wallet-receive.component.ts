import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-receive',
  templateUrl: './wallet-receive.component.html',
  styleUrls: ['./wallet-receive.component.scss']
})
export class WalletReceiveComponent implements OnInit {

  public walletAddress: string;

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit() {
    this.walletAddress = this.walletService.getWalletAddress();
  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
