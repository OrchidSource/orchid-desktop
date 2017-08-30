import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-start',
  templateUrl: './purchase-start.component.html',
  styleUrls: ['./purchase-start.component.scss']
})
export class PurchaseStartComponent implements OnInit {

  number_tokens_options: number[] = [1000, 5000, 10000, 50000];
  bandwidth_options: number[] = [5, 10, 25, 50];
  // token_purchase_cart: Object = { tokens: 1000, bandwidth: 5 };
  token_purchase_cart = { tokens: 1000, bandwidth: 5 };


  constructor() {
  }

  ngOnInit() {
    console.log("Hi! init StartPurchaseComponent");
  }

  /**
   * Call to close the modal
   */
  close() {
    debugger;
  }

  calculate_cost() {
    return this.token_purchase_cart.tokens * this.token_purchase_cart.bandwidth / 100;
  }


}
