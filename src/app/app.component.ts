import { Component, OnInit } from '@angular/core';
import { WalletService } from "./wallet.service";

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public orcBalance: number;
  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.orcBalance = this.walletService.getOrcBalance();
  }
}

// ???
var status = { connected: false };
export { status };
