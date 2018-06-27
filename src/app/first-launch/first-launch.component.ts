import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const LAST_LOCATION_LOCALSTORAGE_KEY = "FIRST_RUN_LAST_LOCATION";

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent implements OnInit {

  constructor(private router: Router) { }

  // app: any = null;

  ngOnInit() {
    // if ((<any>window).require) {
    //   this.app = (<any>window).require('electron').remote.app;
    // }
    //
    // if (this.app) {
    //   this.app.win_maximize();
    // }

  }

  videoStopped() {
    console.log('stopped');

    setTimeout(() => {
      this.firstRunDone();
    }, 2000);
  }

  firstRunDone() {
    localStorage.setItem(LAST_LOCATION_LOCALSTORAGE_KEY, 'DONE');
    // if (this.app) {
    //   this.app.win_setDefaultSize();
    // }
    this.router.navigate(['/main/dashboard']);
  }

}
