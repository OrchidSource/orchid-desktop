import { Component, OnInit } from '@angular/core';

import * as currency_codes from "currency-codes";


@Component({
  selector: 'app-settings-wallet',
  templateUrl: './settings-wallet.component.html',
  styleUrls: ['./settings-wallet.component.scss']
})
export class SettingsWalletComponent implements OnInit {

  settings: object = {
    currency: 'USD'
  };

  currencies: string[];

  constructor() { }

  ngOnInit() {
    this.currencies = currency_codes.codes();
  }

}
