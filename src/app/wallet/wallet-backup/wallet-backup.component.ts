import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-wallet-backup',
  templateUrl: './wallet-backup.component.html',
  styleUrls: ['./wallet-backup.component.scss']
})
export class WalletBackupComponent implements OnInit {

  public minUsernameLength: number = 8;
  public minPasswordLength: number = 8;
  public walletSetupBeginForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {

    this.walletSetupBeginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(this.minUsernameLength)]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)])
    });

  }

  walletSetupBeginSubmit() {
  }

  /**
   * TODO: this gets reused; generalize
   * @param  $event [description]
   * @return        [description]
   */
  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
