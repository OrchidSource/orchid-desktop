import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-connection',
  templateUrl: './settings-connection.component.html',
  styleUrls: ['./settings-connection.component.scss']
})
export class SettingsConnectionComponent implements OnInit {

  settings: object = {};

  constructor() { }

  ngOnInit() {
  }

}
