import { Component, HostListener, OnInit } from '@angular/core';

enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.page < 3) {
      this.page++;
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.page > 1) {
      this.page--;
    }
  }

}
