import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './settings-advanced.component.html',
  styleUrls: ['./settings-advanced.component.scss']
})
export class SettingsAdvancedComponent implements OnInit {

  settings: object = {
    PRICE_GB_USED: 0.569,
    PRICE_GB_SHARED: 0.769
  };

  constructor(private walletService: WalletService) { }

  ngOnInit() {
  }

  setSellingPriceForMe():void {
    console.log('TODO: setSellingPriceForMe()');
  }

  setBuyingPriceForMe():void {
    console.log('TODO: setBuyingPriceForMe()');
  }

  orcToUSD(orc: number): number {
    return this.walletService.orcToUSD(orc);
  }

}
