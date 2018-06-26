import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

const LAST_LOCATION_LOCALSTORAGE_KEY = "FIRST_RUN_LAST_LOCATION";

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent {

  constructor(private router: Router) { }

  videoStopped() {
    console.log('stopped');

    setTimeout(() => {
      this.firstRunDone();
    }, 2000);
  }


  firstRunDone() {
    localStorage.setItem(LAST_LOCATION_LOCALSTORAGE_KEY, 'DONE');
    this.router.navigate(['/main/dashboard']);
  }

}
