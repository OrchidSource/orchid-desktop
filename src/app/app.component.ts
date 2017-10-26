import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
title = 'app';
}

var status = {
  connected: false
};

export { status };
