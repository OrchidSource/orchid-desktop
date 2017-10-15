import { Component, NgModule, OnInit } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { status } from "../app.component";

import { ConfigService } from "../config-service/config.service";

import { BrowsingLocation } from "../classes/browsing-location";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    constructor(private _config : ConfigService) {
    }

    ngOnInit() {
    }

    setSelectedBrowsingLocation(browsingLocation : BrowsingLocation) {
        this._config.selectedBrowsingLocation = browsingLocation;
    }

    selectedBrowsingLocation() : BrowsingLocation {
        console.log(this._config.selectedBrowsingLocation.mapUrl);
        return this._config.selectedBrowsingLocation;
    }

    browsingLocations() : BrowsingLocation[] {
        return this._config.browsingLocations;
    }

}
