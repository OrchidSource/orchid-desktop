import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from "../../wallet.service";

@Component({
  selector: 'app-wallet-backup-3-download',
  templateUrl: './wallet-backup-3-download.component.html',
  styleUrls: ['./wallet-backup-3-download.component.scss']
})
export class WalletBackup3DownloadComponent implements OnInit {

  constructor(private router: Router, private walletService: WalletService) { }

  ngOnInit() {
  }

  done(): void {
    this.walletService.isWalletBackedUp.next(true);
    this.router.navigate(['', { outlets: { modal: null } }]);
  }
}
