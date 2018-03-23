import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent implements OnInit {

  public page: number = 1;
  constructor() { }

  ngOnInit() {
  }

}
