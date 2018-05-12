import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-wallet-receive',
  templateUrl: './wallet-receive.component.html',
  styleUrls: ['./wallet-receive.component.scss']
})
export class WalletReceiveComponent implements OnInit {

  public walletAddress: string;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.walletAddress = this.walletService.getWalletAddress();
  }

}
