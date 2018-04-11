import { Injectable } from '@angular/core';

import { BrowsingLocation } from '../classes/browsing-location'

@Injectable()
export class ConfigService {

    constructor() {
        this._connected = false;
    }

    private _connected : boolean;


    // two-letter country code
    // TODO: don't hard-code
    private _selectedBrowsingLocation : string = 'US';

    get selectedBrowsingLocation() {
      return this._selectedBrowsingLocation;
    }

    private _starting_location =  0;


    get connected() : boolean {
        return this._connected;
    }

    set selectedBrowsingLocation(browsingLocation : string) {
        this._selectedBrowsingLocation = browsingLocation;
    }

    set connected(connected : boolean) {
        this._connected = connected;
    }

}
