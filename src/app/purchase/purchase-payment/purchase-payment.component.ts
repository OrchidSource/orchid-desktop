import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PurchaseCart } from '../purchase-cart';

// TODO: we've got enums now; use those
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
  token_purchase_cart = PurchaseCart;

  payment_form: FormGroup;

  constructor() {
    this.build_form();
  }

  requiredFactory = function(payment_type: string) {
    return function(control: AbstractControl) {
      debugger;
      return payment_type === this.payment_form.get('payment_type') && control.value.length === 0 ? {er: 'required'} : null;
    }
  }

  build_form() {
    this.payment_form = new FormGroup({
      'credit_card_name': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD)),
      'payment_type': new FormControl(PTYPES.CREDIT_CARD)
    });
  }

  ngOnInit() {

  }

}
