import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet-backup-password-confirm',
  templateUrl: './wallet-backup-password-confirm.component.html',
  styleUrls: ['./wallet-backup-password-confirm.component.scss']
})
export class WalletBackupPasswordConfirmComponent implements OnInit {

  public walletConfirmForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.walletConfirmForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    
  }

}
