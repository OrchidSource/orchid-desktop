import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
var app = (<any>window).require('electron').remote.app;

// console.log("app: ", app);
// (<any>window).testapp = app;

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
      app.chrome_variables.startChrome();
    } else
      app.chrome_variables.stopChrome();
  }
}

var status = { connected: false };
export { status };
