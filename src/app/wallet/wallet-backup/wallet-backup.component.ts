import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-backup',
  templateUrl: './wallet-backup.component.html',
  styleUrls: ['./wallet-backup.component.scss']
})
export class WalletBackupComponent {

  public password: String = '';

  constructor(private router: Router) { }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }
}
