import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './settings-advanced.component.html',
  styleUrls: ['./settings-advanced.component.scss']
})
export class SettingsAdvancedComponent implements OnInit {

  settings: object = {
    PRICE_GB_USED: 0.569423,
    PRICE_GB_SHARED: 0.76942
  };

  constructor() { }

  ngOnInit() {
  }

}
