import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import chromeManager from './classes/chromeManager';

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
    var cm = new chromeManager();

    if (this.connected) {
      cm.startChrome();
    } else
      cm.stopChrome();
  }
}

var status = { connected: false };
export { status };

