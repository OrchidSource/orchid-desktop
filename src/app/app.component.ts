import { AfterContentInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WalletService } from "./wallet.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DemoWarningService } from './demo/demo-warning.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnInit {

  public octBalanceSubject: BehaviorSubject<number>;

  constructor(private demoWarningService: DemoWarningService, private walletService: WalletService) {
  }

  ngOnInit() {
    this.octBalanceSubject = this.walletService.octBalanceBehaviorSubject;
  }
  ngAfterContentInit() {
    setTimeout(() => {
      if (window.document.body.clientWidth > 500) {
        this.demoWarningService.showWarning();
      }
    }, 1)
  }
}

// ???
var status = { connected: false };
export { status };
