import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: object;

  constructor() {
    console.log('todo: get settings');
    this.settings = {
      LAUNCH_STARTUP: true,
      CONNECT_ON_STARTUP: false
    };
  }

  ngOnInit() {
    console.log('init')
  }

}
