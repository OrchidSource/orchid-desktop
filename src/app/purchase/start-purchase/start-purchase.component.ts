import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-purchase',
  templateUrl: './start-purchase.component.html',
  styleUrls: ['./start-purchase.component.scss']
})
export class StartPurchaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log("Hi! init StartPurchaseComponent");
  }

}
