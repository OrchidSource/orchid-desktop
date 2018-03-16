/**
 * Service for doing things with the orchid protocol
 */
import { Injectable } from '@angular/core';
import { BrowsingLocation } from "../classes/browsing-location";
import { Observable } from 'rxjs/Observable';


// Allows us to run UI in browser
// TODO: use injection to inject a mock service when running in the browser
if ((<any>window).require) {
  var app = (<any>window).require('electron').remote.app;
  var ipcRenderer = (<any>window).require('electron').ipcRenderer;
}

@Injectable()
export class OrchidNetService {

  /**
   * observable that fires true when the connection is started, and false
    when the connection has been disconnected
   */
  public connected: Observable<boolean>;

  constructor() {

    this.connected = new Observable(observer => {
      if ((<any>window).require) {
        var app = (<any>window).require('electron').remote.app;
        ipcRenderer.on('connected', () => {
          observer.next(true);
        });
        ipcRenderer.on('disconnected', () => {
          observer.next(false);
        });
      }

    })

  }

  /**
   * Sets the browsing location
   */
  setBrowsingLocation(browsingLocation: BrowsingLocation) {
    app.chrome_vars.startNetwork(browsingLocation.nick.toUpperCase());
  }

  /**
   * Starts the chrome browser
   */
  startChrome() {
    console.log('TODO: resurrect startChrome');
    if ((<any>window).require) {
      app.chrome_vars.startChrome();
    }
  }

  /**
   * Stops the chrome browser
   */
  stopChrome() {
    app.chrome_vars.stopChrome();
  }

}
