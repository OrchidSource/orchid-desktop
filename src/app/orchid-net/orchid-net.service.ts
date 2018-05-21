/**
 * Service for doing things with the orchid protocol
 */
import { Injectable } from '@angular/core';
import { BrowsingLocation } from "../classes/browsing-location";
import { Observable } from 'rxjs/Observable';

const MOCK_START_TIME: string =  'MOCK_START_TIME';
const MOCK_CONNECTION_STATUS: string = 'MOCK_CONNECTION_STATUS';


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
  public connectedObservable: Observable<boolean>;
  public isConnected: boolean  = false;

  /**
   * Time the current connection started
   */
  public connectionStartTime: number  = null;

  constructor() {

    var start_time = window.localStorage.getItem(MOCK_START_TIME);
    var connected = window.localStorage.getItem(MOCK_CONNECTION_STATUS);
    if (start_time && connected) {
      this.connectionStartTime = Number(start_time);
      this.isConnected = true;
    }

    this.connectedObservable = new Observable(observer => {
      if ((<any>window).require) {

        if (this.isConnected) {
          observer.next(true);
        }

        var app = (<any>window).require('electron').remote.app;
        ipcRenderer.on('connected', () => {
          this.connectionStartTime = Date.now();
          window.localStorage.setItem(MOCK_START_TIME, String(this.connectionStartTime));
          window.localStorage.setItem(MOCK_CONNECTION_STATUS, 'T');
          this.isConnected = true;
          observer.next(true);
        });
        ipcRenderer.on('disconnected', () => {
          this.connectionStartTime = null;
          this.isConnected = false;
          window.localStorage.removeItem(MOCK_START_TIME);
          window.localStorage.removeItem(MOCK_CONNECTION_STATUS);
          observer.next(false);
        });
      }
    })
  }

  /**
   * Sets the browsing location
   */
  setBrowsingLocation(browsingLocation: BrowsingLocation) {
    app.chrome_vars.startNetwork(browsingLocation.code.toUpperCase());
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

  startNetwork() {
      app.chrome_vars.startNetwork();
  }

  stopNetwork() {
    app.chrome_vars.stopNetwork();
  }

  /**
   * Stops the chrome browser
   */
  stopChrome() {
    app.chrome_vars.stopChrome();
  }

}
