import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-setup-begin',
  templateUrl: './wallet-setup-begin.component.html',
  styleUrls: ['./wallet-setup-begin.component.scss']
})
export class WalletSetupBeginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
