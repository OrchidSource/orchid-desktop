import { Component } from '@angular/core';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public orcs: number = 12.3;
  constructor() {
  }
}

// ???
var status = { connected: false };
export { status };
