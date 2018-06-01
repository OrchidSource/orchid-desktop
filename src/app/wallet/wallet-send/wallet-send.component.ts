import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  public sendForm: FormGroup;

  ethCompatibleOk: boolean = false;
  notCoinbaseOk: boolean = false;

  ngOnInit() {
    this.octBalance = this.walletService.getOctBalance();
    this.sendAmount = this.octBalance;
    this.sendAmountDollars = this.walletService.octInDollars(this.octBalance);

    this.sendForm = new FormGroup({
      sendAmountOct: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]),
      sendAmountNative: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]),
      ercAddress: new FormControl('', [Validators.required, Validators.pattern(/^0x.+$/)]), // TODO: add better ERC20 format validation
      // add the checkboxes; They need to be made to accept FormControls
    });

    var that = this;

    this.sendForm.get('sendAmountOct').valueChanges.subscribe(val => {
      var value = Number(val);
      if (!value) {
        value = 0;
      } else {
        value = Math.round(this.walletService.dollarsInOct(value) * 100) / 100;
      }
      that.sendForm.get('sendAmountNative').setValue(value, {emitEvent: false});
    });

    this.sendForm.get('sendAmountNative').valueChanges.subscribe(val => {
      var value: number = Number(val);
      if (!value) {
        value = 0;
      } else {
        value = Math.round(this.walletService.octInDollars(value) * 100) / 100;
      }
      that.sendForm.get('sendAmountOct').setValue(value, {emitEvent: false});
    });
  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
