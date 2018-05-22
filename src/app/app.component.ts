import { AfterContentInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WalletService } from "./wallet.service";
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnInit {
  @ViewChild('noticeModal') noticeModal: TemplateRef<any>;

  public octBalanceSubject: BehaviorSubject<number>;

  constructor(private walletService: WalletService, private ngbTooltipConfig: NgbTooltipConfig, private modalService: NgbModal) {
    // Uncomment to keep the tooltip open to make make styling the tooltips easier
    // ngbTooltipConfig.triggers = 'click';
    ngbTooltipConfig.container = 'body';
  }

  ngOnInit() {
    this.octBalanceSubject = this.walletService.octBalanceBehaviorSubject;
  }
  ngAfterContentInit() {
    setTimeout(() => {
      if (window.document.body.clientWidth > 500) {
        this.modalService.open(this.noticeModal, { centered: true, size: 'lg' });
      }
    }, 1)
  }
}

// ???
var status = { connected: false };
export { status };
