import { Component, OnInit } from '@angular/core';

// Seems like there should be a better way to include npm modules
export declare let require: any;
const currency_codes_data = require('currency-codes/data');

@Component({
  selector: 'app-settings-wallet',
  templateUrl: './settings-wallet.component.html',
  styleUrls: ['./settings-wallet.component.scss']
})
export class SettingsWalletComponent implements OnInit {

  settings: object = {
    currency: 'USD'
  };

  currencies: object[];

  constructor() { }

  ngOnInit() {
    this.currencies = currency_codes_data;
  }

}
