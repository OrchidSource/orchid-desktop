import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
var app = require('electron').remote.app;

console.log("app: ", app);

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  connected = false;

  toggleOnOff() {
    console.log("Value of connected: ", this.connected);
    this.connected = !this.connected;
    console.log("Value of connected now: ", this.connected);

    if (this.connected) {
      app.startChrome();
    } else
      app.stopChrome();
  }
}

var status = { connected: false };
export { status };

