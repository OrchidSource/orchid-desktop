import { Component, NgModule, OnInit, ChangeDetectorRef } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { status } from "../app.component";
import { ConfigService } from "../config-service/config.service";
import { BrowsingLocation } from "../classes/browsing-location";
import { OrchidNetService } from "../orchid-net/orchid-net.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    public connected: boolean = false;
    timer: NodeJS.Timer = null;
    public time_connected: number = 0;
    time: Date = new Date(0,0,0,0,0,0,0);
    selectedBrowsingLocation: BrowsingLocation;

    constructor(private _config : ConfigService, private changeDetector: ChangeDetectorRef, private orchidNetService : OrchidNetService) {
      this.connected = false;
    }

    ngOnInit() {

      this.orchidNetService.connected.subscribe((isConnected: boolean) => {
        if (isConnected) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      });

      this.selectedBrowsingLocation = BrowsingLocation.getLocations().find(bl => {
        return bl.code == this._config.selectedBrowsingLocation;
      })

    }

    startTimer() {
      this.connected = true;
      this.changeDetector.detectChanges();
      this.timer = setInterval(() => {
        this.time_connected += 1000;
        this.time = new Date(0,0,0,0,0,0,this.time_connected);
        this.changeDetector.detectChanges();
      }, 1000);
    }

    stopTimer() {
      this.connected = false;
      this.changeDetector.detectChanges();
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    setSelectedBrowsingLocation(browsingLocation : BrowsingLocation) {
      this.selectedBrowsingLocation = browsingLocation;
      // this._config.selectedBrowsingLocation = browsingLocation.code;
      console.log("BrowsingLocation := ", browsingLocation);
      this.orchidNetService.setBrowsingLocation(browsingLocation);
    }

    browsingLocations() : BrowsingLocation[] {
        return BrowsingLocation.getLocations();
    }
}
