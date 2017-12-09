import { Injectable } from '@angular/core';

import { BrowsingLocation } from '../classes/browsing-location'

@Injectable()
export class ConfigService {

    constructor() {
        this._blankBrowsingLocation = new BrowsingLocation("", "");
        this._browsingLocations = [];
        this._initBrowsingLocations();
        this._connected = false;
    }

    private _connected : boolean;

    private _selectedBrowsingLocation : BrowsingLocation;

    private _blankBrowsingLocation : BrowsingLocation;

    private _browsingLocations : BrowsingLocation[];

    private _availableBrowsingLocations : any[] = [
        { nick: "any", name: "Randomly Chosen" },
        { nick: "us", name: "The United States" },
        { nick: "eu", name: "European Union", },
	{ nick: "de", name: "Germany", },
        { nick: "hkg", name: "Hong Kong", },
	{ nick: "sng", name: "Singapore", }
    ];

    private _starting_location = 0;

    private _initBrowsingLocations() {
        this._availableBrowsingLocations.forEach((bl) => {
            this._browsingLocations.push(new BrowsingLocation(bl.nick, bl.name));
        });
        this._selectedBrowsingLocation = this._browsingLocations[this._starting_location]; 
    }

    get selectedBrowsingLocation() : BrowsingLocation {
        if (this._selectedBrowsingLocation === undefined) {
            return this._blankBrowsingLocation;
        }
        return this._selectedBrowsingLocation;
    }

    get browsingLocations() : BrowsingLocation[] {
        return this._browsingLocations;
    }

    get connected() : boolean {
        return this._connected;
    }

    set selectedBrowsingLocation(browsingLocation : BrowsingLocation) {
        this._selectedBrowsingLocation = browsingLocation; 
    }

    set connected(connected : boolean) {
        this._connected = connected;
    }

}
