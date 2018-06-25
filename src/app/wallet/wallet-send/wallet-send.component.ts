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
  sendErrorMessage: string;

  public sendForm: FormGroup;

  ethCompatibleOk: boolean = false;
  notCoinbaseOk: boolean = false;

  ngOnInit() {
    this.octBalance = this.walletService.getOctBalance();
    this.sendAmount = this.octBalance;
    this.sendAmountDollars = this.walletService.octInDollars(this.octBalance);

    this.sendForm = new FormGroup({
      sendAmountOct: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]),
      // TODO: validate that the user has enough OCT to send
      sendAmountNative: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]),
      ercAddress: new FormControl('', [Validators.required, Validators.pattern(/^0x[0-9a-z]{40}$/i)]),
      ethCompatibleOk: new FormControl(false, [Validators.requiredTrue]),
      notCoinbaseOk: new FormControl(false, [Validators.requiredTrue])
    });

    var that = this;

    this.sendForm.get('sendAmountOct').valueChanges.subscribe(val => {
      var value = Number(val);
      if (!value) {
        value = 0;
      } else {
        value = Math.round(this.walletService.dollarsInOct(value) * 100) / 100;
      }
      that.sendForm.get('sendAmountNative').setValue(value, { emitEvent: false });
    });

    this.sendForm.get('sendAmountNative').valueChanges.subscribe(val => {
      var value: number = Number(val);
      if (!value) {
        value = 0;
      } else {
        value = Math.round(this.walletService.octInDollars(value) * 100) / 100;
      }
      that.sendForm.get('sendAmountOct').setValue(value, { emitEvent: false });
    });
  }

  submit(): void {
    this.walletService.sendOct(this.sendForm.value.sendAmountOct, this.sendForm.value.ercAddress)
      .then(() => {
        this.router.navigate(['', { outlets: { modal: null } }]);
      })
      .catch((error) => {
        this.sendErrorMessage = error;
      })

  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', { outlets: { modal: null } }]);
    }
  }

}
