import { Component, OnInit } from '@angular/core';

const PTYPES = {
  CREDIT_CARD: 'CREDIT_CARD',
  PAYPAL: 'PAYPAL',
  CRYPTOCURRENCY: 'CRYPTOCURRENCY'
}

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.scss'],
  host: {class: 'modal-host'}
})
export class PurchasePaymentComponent implements OnInit {

  PAYMENT_TYPES = PTYPES;
  form = {
    payment_type: PTYPES.CREDIT_CARD
  }

  constructor() { }

  ngOnInit() {
  }

}
