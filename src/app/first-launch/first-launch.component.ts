import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemoWarningService } from '../demo/demo-warning.service';
import { Subscription } from 'rxjs/Subscription';

const LAST_LOCATION_LOCALSTORAGE_KEY = "FIRST_RUN_LAST_LOCATION";

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent implements OnInit {

  @ViewChild('videoElement') videoElement;
  private demoWarningSubscription: Subscription;

  constructor(private demoWarningService: DemoWarningService, private router: Router) {
  }

  ngOnInit() {
    // I don't get why this "that" is necessary
    var that = this;
    this.demoWarningSubscription = this.demoWarningService.warningDismissed.subscribe(val => {
      if (val) {
        that.videoElement.nativeElement.play();
        that.videoElement;
        that.demoWarningSubscription.unsubscribe();
      }
    });
  }

  videoStopped() {

    setTimeout(() => {
      this.firstRunDone();
    }, 2000);
  }

  firstRunDone() {
    localStorage.setItem(LAST_LOCATION_LOCALSTORAGE_KEY, 'DONE');
    this.router.navigate(['/main/dashboard']);
  }

}
