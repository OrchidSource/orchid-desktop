import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations'


@Component({
  selector: 'app-wallet-setup-begin',
  templateUrl: './wallet-setup-begin.component.html',
  styleUrls: ['./wallet-setup-begin.component.scss'],
  animations: [
    trigger('qrSlideOpen', [
      transition(':enter', [
        style({right: '-140px'}),
        animate("200ms ease-in", style({ right: '0px' }))
      ]),
      transition(':leave', [
        animate("200ms ease-in", style({ right: '-140px' }))
      ])
    ])
  ]
})
export class WalletSetupBeginComponent implements OnInit {

  // TODO: remove hard-coded value
  public wallet_address: String = '0x177b46f8fCf57C5CA32747ecf57ed359481b16eD';
  public showQr: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Copy the address to the clipboard
   * @return void
   */
  copyAddress() {
    var input: HTMLInputElement = document.getElementById('wallet-setup-begin-address') as HTMLInputElement;
    input.select();
    document.execCommand('Copy');
  }

  // showQR() {
  //   console.log('show QR');
  // }

  /**
   * Closes modal and navigates to the wallet page.
   * Work-around for this issue: https://github.com/angular/angular/issues/15338
   */
  navigateToWallet() {
    this.router.navigate([{ outlets: { modal: null } }])
           .then(() => this.router.navigate(['/main/wallet']));

  }

  conditionalClose($event) {
    // only close if clicking on the backdrop
    if ($event.target.classList.contains('routed-modal-container')) {
      this.router.navigate(['', {outlets: {modal: null}}]);
    }
  }

}
