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
    this.settings = {};
  }

  ngOnInit() {
    console.log('init')
  }

}
