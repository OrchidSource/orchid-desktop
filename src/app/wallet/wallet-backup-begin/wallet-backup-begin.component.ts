import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet-backup-begin',
  templateUrl: './wallet-backup-begin.component.html',
  styleUrls: ['./wallet-backup-begin.component.scss'],
  host: { class: 'routed-modal divided-dialog' }
})
export class WalletBackupBeginComponent implements OnInit {

  public minUsernameLength: number = 8;
  public minPasswordLength: number = 8;
  public walletBackupBeginForm: FormGroup;

  @Input() password:string;
  @Output() passwordChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

    this.walletBackupBeginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(this.minUsernameLength)]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)])
    });

  }


  walletSetupBeginSubmit() {

    this.passwordChange.emit(this.walletBackupBeginForm.value.password)
  }

}
