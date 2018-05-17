import { Component, OnInit } from '@angular/core';

const SETTINGS_KEY: string = "SETTINGS_CONNECTION";

@Component({
  selector: 'app-settings-connection',
  templateUrl: './settings-connection.component.html',
  styleUrls: ['./settings-connection.component.scss']
})
export class SettingsConnectionComponent implements OnInit {

  settings: object;
  constructor() { }

  settingsChanged() {
    console.log('settingsChanged');
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings () {

    var savedSettings = window.localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    } else {
      this.settings = {
        LIMIT_CONNECTIONS: "browser",
        RELAY_NODE: true
      };
    }
  }

  saveSettings() {

  }

}
