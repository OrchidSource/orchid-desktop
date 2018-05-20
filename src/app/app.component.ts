import { Component, OnInit } from '@angular/core';
import { WalletService } from "./wallet.service";
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public octBalanceSubject: BehaviorSubject<number>;

  constructor(private walletService: WalletService, private ngbTooltipConfig: NgbTooltipConfig ) {
    // Uncomment to keep the tooltip open to make make styling the tooltips easier
    // ngbTooltipConfig.triggers = 'click';
    ngbTooltipConfig.container = 'body';
  }

  ngOnInit() {
    this.octBalanceSubject = this.walletService.octBalanceBehaviorSubject;
  }
}

// ???
var status = { connected: false };
export { status };
