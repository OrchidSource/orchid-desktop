import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

const SETTINGS_KEY: string = "SETTINGS_CONNECTION";

@Component({
  selector: 'app-settings-connection',
  templateUrl: './settings-connection.component.html',
  styleUrls: ['./settings-connection.component.scss']
})
export class SettingsConnectionComponent implements OnInit {

  settings: object;
  constructor() { }

  // form: FormGroup;

  settingsChanged() {
    console.log('settingsChanged');
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {

    var savedSettings = window.localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    } else {
      this.settings = {
        launch_startup: true,
        limit_connections: "browser",
        relay_node: true
      };
    }
  }

  saveSettings() {

  }

}
