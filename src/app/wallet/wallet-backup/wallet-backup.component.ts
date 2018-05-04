import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-backup',
  templateUrl: './wallet-backup.component.html',
  styleUrls: ['./wallet-backup.component.scss']
})
export class WalletBackupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
